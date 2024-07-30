"use client";

import {
  Detection,
  FaceDetector,
  FilesetResolver,
} from "@mediapipe/tasks-vision";
import * as tf from "@tensorflow/tfjs";
import { FC, useEffect, useRef, useState } from "react";

import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import { cn } from "@/lib/utils";

const initializeFaceDetection = async () => {
  try {
    const vision = await FilesetResolver.forVisionTasks(
      "/models/mediapipe/wasm",
    );

    const faceDetector = await FaceDetector.createFromOptions(vision, {
      baseOptions: {
        modelAssetPath: "/models/mediapipe/blaze_face_short_range.tflite",
        delegate: "GPU",
      },
      runningMode: "VIDEO",
    });

    return faceDetector;
  } catch (err) {
    console.error("Error initializing hand detection:", err);
  }
};

const BinocularMLPage: FC = () => {
  const webcamRef = useRef<HTMLVideoElement>(null);
  const drawingCanvasRef = useRef<HTMLCanvasElement>(null);

  const video = webcamRef.current;
  const canvas = drawingCanvasRef.current;

  const [isCameraAuthorized, setIsCameraAuthorized] = useState<boolean>(false);
  const [availableCameraDevices, setAvailableCameraDevices] = useState<
    MediaDeviceInfo[]
  >([]);
  const [selectedCameraDevice, setSelectedCameraDevice] =
    useState<MediaDeviceInfo | null>(null);
  const [binocularModel, setBinocularModel] = useState<tf.LayersModel>();
  const [isBinocularModelLoading, setIsBinocularModelLoading] =
    useState<boolean>(true);
  const [faceDetector, setFaceDetector] = useState<FaceDetector>();
  const [isFaceDetectorLoading, setIsFaceDetectorLoading] =
    useState<boolean>(true);
  const [binocularProbabilities, setBinocularProbabilities] = useState<
    {
      id: number;
      probabilities: {
        probability: number;
        date: Date;
      }[];
    }[]
  >([]);

  useEffect(() => {
    tf.loadLayersModel("/models/binocular_ml/model.json")
      .then((model) => {
        setBinocularModel(model);
        setIsBinocularModelLoading(false);
        console.log("Binocular model initialized");
      })
      .catch((err) => {
        console.error("Failed to load model:", err);
      });

    initializeFaceDetection()
      .then((detector) => {
        if (detector) {
          setFaceDetector(detector);
          setIsFaceDetectorLoading(false);
          console.log("Face detector initialized");
        }
      })
      .catch((err) => {
        console.error("Error initializing face detector:", err);
      });
  }, []);

  useEffect(() => {
    let frameId: number;
    const drawingCtx = drawingCanvasRef.current?.getContext("2d");

    const drawDetections = (
      detections: Detection[],
      video: HTMLVideoElement,
    ) => {
      if (!drawingCtx || !binocularModel) return;

      drawingCtx.clearRect(
        0,
        0,
        drawingCtx.canvas.width,
        drawingCtx.canvas.height,
      );

      const scaleX = drawingCtx.canvas.width / video.videoWidth;
      const scaleY = drawingCtx.canvas.height / video.videoHeight;

      const currentFaceProbabilities: { id: number; probability: number }[] =
        [];

      detections.forEach((face, idx) => {
        if (!face.boundingBox) return;

        const { originX, originY, width, height } = face.boundingBox;

        const temporaryCanvas = document.createElement("canvas");
        const temporaryCtx = temporaryCanvas.getContext("2d", {
          willReadFrequently: true,
        });

        temporaryCanvas.width = width;
        temporaryCanvas.height = height;

        temporaryCtx!.drawImage(
          video,
          originX,
          originY,
          width,
          height,
          0,
          0,
          width,
          height,
        );

        const faceImg = temporaryCtx!.getImageData(0, 0, width, height);

        const faceTensor = tf.browser.fromPixels(faceImg);
        const resizedFaceTensor = tf.image.resizeBilinear(
          faceTensor,
          [128, 128],
        );
        const normalizedFaceTensor = resizedFaceTensor.div(tf.scalar(255));

        const prediction = binocularModel.predict(
          normalizedFaceTensor.expandDims(0),
        ) as tf.Tensor;
        const probability = 1 - prediction.dataSync()[0];

        currentFaceProbabilities.push({ id: idx, probability });

        drawingCtx.font = "16px __Space_Grotesk_587f35";
        drawingCtx.fillStyle = probability < 0.5 ? "#ff0000" : "#29cca4";
        drawingCtx.fillText(
          `${(probability * 100).toFixed(4)}%`,
          originX * scaleX,
          (originY + height + 15) * scaleY,
        );
        drawingCtx.fillText(
          `Face ${idx + 1}`,
          originX * scaleX,
          (originY - 5) * scaleY,
        );

        drawingCtx.strokeStyle = probability < 0.5 ? "#ff0000" : "#29cca4";
        drawingCtx.fillStyle = probability < 0.5 ? "#ff00004f" : "#29cca44f";
        drawingCtx.lineWidth = 2;
        drawingCtx.beginPath();
        drawingCtx.roundRect(
          originX * scaleX,
          originY * scaleY,
          width * scaleX,
          height * scaleY,
          8,
        );
        drawingCtx.stroke();
        drawingCtx.fill();

        face.keypoints.forEach((keypoint) => {
          drawingCtx.fillStyle = "#29cca4";
          drawingCtx.beginPath();
          drawingCtx.arc(
            keypoint.x * drawingCtx.canvas.width,
            keypoint.y * drawingCtx.canvas.height,
            2,
            0,
            2 * Math.PI,
          );
          drawingCtx.fill();
        });

        tf.dispose([faceTensor, resizedFaceTensor, normalizedFaceTensor]);
      });

      // setBinocularProbabilities((prevProbabilities) => {
      //   const updatedProbabilities = [...prevProbabilities];

      //   currentFaceProbabilities.forEach(({ id, probability }) => {
      //     const faceProb = updatedProbabilities.find((fp) => fp.id === id);
      //     if (faceProb) {
      //       faceProb.probabilities.push({ probability, date: new Date() });
      //     } else {
      //       updatedProbabilities.push({
      //         id,
      //         probabilities: [{ probability, date: new Date() }],
      //       });
      //     }
      //   });

      //   return updatedProbabilities;
      // });
    };

    const processFrame = async () => {
      if (webcamRef.current && faceDetector) {
        if (
          webcamRef.current.readyState === webcamRef.current.HAVE_ENOUGH_DATA
        ) {
          const faceDetection = faceDetector.detectForVideo(
            webcamRef.current,
            performance.now(),
          );

          drawDetections(faceDetection.detections, webcamRef.current);
        }
      }

      frameId = requestAnimationFrame(processFrame);
    };

    frameId = requestAnimationFrame(processFrame);

    return () => {
      cancelAnimationFrame(frameId);
    };
  }, [binocularModel, faceDetector]);

  useEffect(() => {
    if (!video || !canvas) {
      return;
    }

    const adjustCanvasSize = () => {
      canvas.width = video.clientWidth;
      canvas.height = video.clientHeight;
    };

    navigator.mediaDevices
      .getUserMedia({ video: true })
      .then((stream) => {
        video.srcObject = stream;

        video.addEventListener("loadedmetadata", () => {
          adjustCanvasSize();
          video.play();
        });

        setIsCameraAuthorized(true);

        window.addEventListener("resize", adjustCanvasSize);
      })
      .catch((err) => {
        console.error(`An error occurred: ${err}`);
        setIsCameraAuthorized(false);
      });

    return () => {
      window.removeEventListener("resize", adjustCanvasSize);
      video.removeEventListener("loadedmetadata", adjustCanvasSize);
    };
  }, [canvas, video]);

  useEffect(() => {
    navigator.mediaDevices
      .enumerateDevices()
      .then((devices) => {
        const videoDevices = devices.filter(
          (device) => device.kind === "videoinput",
        );
        setAvailableCameraDevices(videoDevices);
        if (videoDevices.length > 0) {
          setSelectedCameraDevice(videoDevices[0]);
          console.log("Selected camera device:", videoDevices);
        }
      })
      .catch((err) => console.error("Error enumerating devices:", err));
  }, [isCameraAuthorized]);

  const handleCameraChange = (deviceId: string) => {
    const device = availableCameraDevices.find(
      (device) => device.deviceId === deviceId,
    );

    if (!device) return;

    setSelectedCameraDevice(device);

    const videoTrack = (
      webcamRef.current?.srcObject as MediaStream
    ).getVideoTracks()[0];
    navigator.mediaDevices
      .getUserMedia({
        video: { deviceId: { exact: device.deviceId } },
      })
      .then((stream) => {
        videoTrack.stop();
        webcamRef.current!.srcObject = stream;
      })
      .catch((err) => console.error("Error switching camera:", err));
  };

  return (
    <div className={cn("z-0 flex h-screen w-full flex-col md:h-full lg:pl-72")}>
      {(isBinocularModelLoading || isFaceDetectorLoading) && (
        <div
          className={cn(
            "hidden h-full w-full items-center justify-center lg:flex",
          )}
        >
          <span
            className={cn(
              "inline-flex animate-text-gradient bg-gradient-to-r from-stone-400 via-metal to-stone-400 bg-[200%_auto] bg-clip-text text-center text-3xl font-bold text-transparent md:pl-72",
            )}
          >
            Loading ML models...
          </span>
        </div>
      )}
      {!isCameraAuthorized &&
        !isBinocularModelLoading &&
        !isFaceDetectorLoading && (
          <div
            className={cn(
              "absolute left-1/2 top-1/2 z-10 flex h-60 w-96 -translate-x-1/2 -translate-y-1/2 transform flex-col items-center justify-center rounded-lg border border-grey bg-chinese-black p-5",
            )}
          >
            <span className="mb-4">Camera not available or not authorized</span>
            <Button onClick={() => window.location.reload()}>Reload</Button>
          </div>
        )}
      <div
        className={cn(
          "relative flex h-full w-full items-center justify-center",
          isBinocularModelLoading ||
            isFaceDetectorLoading ||
            !isCameraAuthorized
            ? "hidden"
            : "flex",
        )}
      >
        <video
          autoPlay
          className={cn(
            "absolute left-1/2 top-1/2 w-11/12 -translate-x-1/2 -translate-y-1/2 transform rounded-lg border-2 border-grey bg-chinese-black md:w-3/4 md:max-w-[1000px]",
          )}
          muted
          playsInline
          ref={webcamRef}
        />

        <canvas
          className={cn(
            "absolute left-1/2 top-1/2 max-h-full max-w-full -translate-x-1/2 -translate-y-1/2 transform",
          )}
          ref={drawingCanvasRef}
        />
        {isCameraAuthorized && availableCameraDevices.length && (
          <div
            className={cn(
              "absolute bottom-0 left-1/2 -translate-x-1/2 -translate-y-1/2 transform",
            )}
          >
            <Select
              onValueChange={handleCameraChange}
              value={selectedCameraDevice?.deviceId}
            >
              <SelectTrigger>
                <SelectValue placeholder="Select a camera" />
              </SelectTrigger>
              <SelectContent align="center">
                <SelectGroup>
                  <SelectLabel>Cameras</SelectLabel>
                  {availableCameraDevices.map((camera) => {
                    if (!camera.deviceId) {
                      return;
                    }
                    return (
                      <SelectItem key={camera.deviceId} value={camera.deviceId}>
                        {camera.label || `Camera ${camera.deviceId}`}
                      </SelectItem>
                    );
                  })}
                </SelectGroup>
              </SelectContent>
            </Select>
            <div className="mt-4 w-full text-center text-white">
              All data is processed locally.
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default BinocularMLPage;
