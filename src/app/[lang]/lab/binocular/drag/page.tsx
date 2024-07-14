"use client";

import {
  Detection,
  FaceDetector,
  FilesetResolver,
} from "@mediapipe/tasks-vision";
import * as tf from "@tensorflow/tfjs";
import clsx from "clsx";
import { FC, useEffect, useRef, useState } from "react";

const initializeHandDetection = async () => {
  try {
    const vision = await FilesetResolver.forVisionTasks(
      "https://cdn.jsdelivr.net/npm/@mediapipe/tasks-vision@latest/wasm",
    );

    const faceDetector = await FaceDetector.createFromOptions(vision, {
      baseOptions: {
        delegate: "GPU",
        modelAssetPath: "/models/mediapipe/blaze_face_short_range.tflite",
      },
      runningMode: "IMAGE",
    });

    return faceDetector;
  } catch (error) {
    console.error("Error initializing hand detection:", error);
  }
};

const LabPage: FC = () => {
  const processingCanvasRef = useRef<HTMLCanvasElement>(null);
  const drawingCanvasRef = useRef<HTMLCanvasElement>(null);

  const [binocularModel, setBinocularModel] = useState<tf.LayersModel>();
  const [loadingModel, setLoadingModel] = useState<boolean>(true);
  const [faceDetector, setFaceDetector] = useState<FaceDetector>();
  const [binocularProbabilities, setBinocularProbabilities] = useState<
    { id: number; probability: number }[]
  >([]);

  useEffect(() => {
    tf.loadLayersModel("/models/binocular_ml/model.json")
      .then((model) => {
        setBinocularModel(model);
        setLoadingModel(false);
        console.log("Binocular model loaded.");
      })
      .catch((err) => {
        console.error("Failed to load model:", err);
      });

    initializeHandDetection()
      .then((detector) => {
        if (detector) {
          setFaceDetector(detector);
          console.log("Face detector initialized");
        }
      })
      .catch((err) => {
        console.error("Error initializing face detector:", err);
      });
  }, []);

  const handleImageUpload = async (
    event: React.ChangeEvent<HTMLInputElement>,
  ) => {
    if (event.target.files && event.target.files[0]) {
      const file = event.target.files[0];
      const img = new Image();
      img.src = URL.createObjectURL(file);

      img.onload = async () => {
        const drawingCanvas = drawingCanvasRef.current;
        const processingCanvas = processingCanvasRef.current;

        if (!drawingCanvas || !processingCanvas) return;

        const drawingCtx = drawingCanvas.getContext("2d");
        const processingCtx = processingCanvas.getContext("2d");

        if (!drawingCtx || !processingCtx) return;

        drawingCanvas.width = img.width;
        drawingCanvas.height = img.height;
        processingCanvas.width = img.width;
        processingCanvas.height = img.height;

        drawingCtx.drawImage(img, 0, 0, img.width, img.height);
        processingCtx.drawImage(img, 0, 0, img.width, img.height);

        const imageBitmap = await createImageBitmap(img);

        if (!faceDetector) return;

        const detections = faceDetector.detect(imageBitmap);

        drawDetections(detections.detections, img);
      };
    }
  };

  const drawDetections = (detections: Detection[], img: HTMLImageElement) => {
    const drawingCanvas = drawingCanvasRef.current;
    const processingCanvas = processingCanvasRef.current;

    if (!drawingCanvas || !processingCanvas) return;

    const drawingCtx = drawingCanvas.getContext("2d");
    const processingCtx = processingCanvas.getContext("2d");

    if (!drawingCtx || !processingCtx) return;

    drawingCtx.clearRect(0, 0, drawingCanvas.width, drawingCanvas.height);

    const scaleX = drawingCanvas.width / img.width;
    const scaleY = drawingCanvas.height / img.height;

    detections.forEach((detection, idx) => {
      drawingCtx.strokeStyle = "#29cca4";
      drawingCtx.lineWidth = 2;

      if (!detection.boundingBox) return;

      const { originX, originY, width, height } = detection.boundingBox;

      processingCanvas.width = width;
      processingCanvas.height = height;

      processingCtx.drawImage(
        img,
        originX,
        originY,
        width,
        height,
        0,
        0,
        width,
        height,
      );

      const face = processingCtx.getImageData(
        0,
        0,
        processingCanvas.width,
        processingCanvas.height,
      );

      const faceTensor = tf.browser.fromPixels(face);
      const resizedFaceTensor = tf.image.resizeBilinear(faceTensor, [128, 128]);
      const normalizedFaceTensor = resizedFaceTensor.div(tf.scalar(255));

      if (!binocularModel) {
        return;
      }

      const prediction = binocularModel.predict(
        normalizedFaceTensor.expandDims(0),
      ) as tf.Tensor;

      const probability = prediction.dataSync()[0] * 100;
      setBinocularProbabilities((prevProbabilities) => [
        ...prevProbabilities.filter((prob) => prob.id !== idx),
        { id: idx, probability },
      ]);

      drawingCtx.beginPath();
      drawingCtx.lineWidth = 2;
      drawingCtx.fillStyle = "#29cca44f";
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
    });
  };

  return (
    <>
      {loadingModel ? <p>Loading model...</p> : null}
      <div className="relative flex h-full w-full items-center justify-center">
        <div className="absolute right-0 top-0">
          {binocularProbabilities.map((prob) => (
            <p
              className={clsx(`text-lg`, {
                "text-green-500": prob.probability < 0.5,
                "text-red-500": prob.probability >= 0.5,
              })}
              key={prob.id}
            >{`Face ${prob.id + 1}: ${prob.probability}`}</p>
          ))}
        </div>
        <input
          accept="image/*"
          className="absolute left-0 top-0 z-20"
          onChange={handleImageUpload}
          type="file"
        />
        <canvas
          className="absolute left-0 right-0 z-10 mx-auto text-center"
          height="800"
          ref={drawingCanvasRef}
          width="1200"
        />
        <canvas
          className="absolute left-0 top-0 z-10 mx-auto text-center"
          ref={processingCanvasRef}
        />
      </div>
    </>
  );
};

export default LabPage;
