import React, { useRef, useEffect } from "react";
import vscode from "../src/vscode";

interface ColorCanvasProps {
  imageDataUrl: string | null;
  onColorSelect: (hex: string) => void;
}

export const ColorCanvas: React.FC<ColorCanvasProps> = ({
  imageDataUrl,
  onColorSelect,
}) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  // This hook redraws the image on the canvas whenever a new image is selected
  useEffect(() => {
    if (imageDataUrl && canvasRef.current) {
      const canvas = canvasRef.current;
      const context = canvas.getContext("2d");
      const image = new Image();
      image.onload = () => {
        canvas.width = image.width;
        canvas.height = image.height;
        context?.drawImage(image, 0, 0, image.width, image.height);
      };
      image.src = imageDataUrl;
    }
  }, [imageDataUrl]);

  // This function handles the click event on the canvas
  const handleCanvasClick = (e: React.MouseEvent<HTMLCanvasElement>) => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const rect = canvas.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const context = canvas.getContext("2d");
    const pixel = context?.getImageData(x, y, 1, 1).data; // Get color data for one pixel

    if (pixel) {
      // Convert the color data [R, G, B] to a HEX string
      const hex = `#${(
        (1 << 24) +
        (pixel[0] << 16) +
        (pixel[1] << 8) +
        pixel[2]
      )
        .toString(16)
        .slice(1)}`;
      onColorSelect(hex.toUpperCase());

      // Send the color to the extension backend to be inserted
      vscode.postMessage({
        command: "insertColor",
        text: hex.toUpperCase(),
      });
    }
  };

  if (!imageDataUrl) return null; // Don't show the canvas if there's no image

  return (
    <canvas
      ref={canvasRef}
      onClick={handleCanvasClick}
      style={{ cursor: "crosshair", maxWidth: "100%" }}
    />
  );
};
