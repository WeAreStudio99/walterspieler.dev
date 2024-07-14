"use client";

import {
  Detection,
  FaceDetector,
  FilesetResolver,
} from "@mediapipe/tasks-vision";
import * as tf from "@tensorflow/tfjs";
import { FC, useEffect, useRef, useState } from "react";

const initializeFaceDetection = async () => {
  try {
    const vision = await FilesetResolver.forVisionTasks(
      "/models/mediapipe/wasm",
    );

    const faceDetector = await FaceDetector.createFromOptions(vision, {
      baseOptions: {
        modelAssetPath: "/models/mediapipe/blaze_face_short_range.tflite",
      },
      runningMode: "VIDEO",
    });

    return faceDetector;
  } catch (error) {
    console.error("Error initializing hand detection:", error);
  }
};

const LabPage: FC = () => {
  const webcamRef = useRef<HTMLVideoElement>(null);
  const drawingCanvasRef = useRef<HTMLCanvasElement>(null);

  const [binocularModel, setBinocularModel] = useState<tf.LayersModel>();
  const [isBinocularModelLoading, setIsBinocularModelLoading] =
    useState<boolean>(true);

  const [faceDetector, setFaceDetector] = useState<FaceDetector>();
  const [isFaceDetectorLoading, setIsFaceDetectorLoading] =
    useState<boolean>(true);

  const [binocularProbabilities, setBinocularProbabilities] = useState<
    { id: number; probability: number }[]
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
    if (!faceDetector) {
      return;
    }

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

      const currentFaceIds = new Set<number>();

      detections.forEach((detection, idx) => {
        if (!detection.boundingBox) return;

        const { originX, originY, width, height } = detection.boundingBox;

        currentFaceIds.add(idx);

        const tempCanvas = document.createElement("canvas");
        const tempCtx = tempCanvas.getContext("2d", {
          willReadFrequently: true,
        });

        tempCanvas.width = width;
        tempCanvas.height = height;

        tempCtx!.drawImage(
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

        const face = tempCtx!.getImageData(0, 0, width, height);

        const faceTensor = tf.browser.fromPixels(face);
        const resizedFaceTensor = tf.image.resizeBilinear(
          faceTensor,
          [128, 128],
        );
        const normalizedFaceTensor = resizedFaceTensor.div(tf.scalar(255));

        const prediction = binocularModel.predict(
          normalizedFaceTensor.expandDims(0),
        ) as tf.Tensor;
        const probability = 1 - prediction.dataSync()[0];

        setBinocularProbabilities((prevProbabilities) => [
          ...prevProbabilities.filter((prob) => prob.id !== idx),
          { id: idx, probability },
        ]);

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

        detection.keypoints.forEach((keypoint) => {
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
      setBinocularProbabilities((prevProbabilities) =>
        prevProbabilities.filter((prob) => currentFaceIds.has(prob.id)),
      );
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
  }, [binocularModel, binocularProbabilities, faceDetector]);

  useEffect(() => {
    const video = webcamRef.current;
    const canvas = drawingCanvasRef.current;

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

        window.addEventListener("resize", adjustCanvasSize);
      })
      .catch((err) => {
        console.error(`An error occurred: ${err}`);
      });

    return () => {
      window.removeEventListener("resize", adjustCanvasSize);
      video.removeEventListener("loadedmetadata", adjustCanvasSize);
    };
  }, []);

  return (
    <>
      {isBinocularModelLoading ? <p>Loading model...</p> : null}
      <div className="relative flex h-full w-full items-center justify-center">
        <div className="absolute right-0 top-0">
          {binocularProbabilities.map((prob) => (
            <p key={prob.id}>
              Face {prob.id + 1} : {(prob.probability * 100).toFixed(2)}
            </p>
          ))}
        </div>
        <video
          className="absolute left-1/2 top-1/2 max-h-full max-w-full -translate-x-1/2 -translate-y-1/2 transform"
          ref={webcamRef}
        />
        <canvas
          className="absolute left-1/2 top-1/2 max-h-full max-w-full -translate-x-1/2 -translate-y-1/2 transform"
          ref={drawingCanvasRef}
        />
      </div>
    </>
  );
};

export default LabPage;
