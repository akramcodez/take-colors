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
      if (!context) return;

      const image = new Image();
      image.onload = () => {
        // Set canvas size to match image, but with reasonable max dimensions
        const maxWidth = 400;
        const maxHeight = 300;
        let { width, height } = image;

        if (width > maxWidth) {
          height = (height * maxWidth) / width;
          width = maxWidth;
        }
        if (height > maxHeight) {
          width = (width * maxHeight) / height;
          height = maxHeight;
        }

        canvas.width = width;
        canvas.height = height;
        canvas.style.width = `${width}px`;
        canvas.style.height = `${height}px`;

        context.clearRect(0, 0, width, height);
        context.drawImage(image, 0, 0, width, height);
      };
      image.onerror = (error) => {
        console.error("Error loading image:", error);
      };
      image.src = imageDataUrl;
    }
  }, [imageDataUrl]);

  // This function handles the click event on the canvas
  const handleCanvasClick = (e: React.MouseEvent<HTMLCanvasElement>) => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const rect = canvas.getBoundingClientRect();
    const scaleX = canvas.width / rect.width;
    const scaleY = canvas.height / rect.height;

    const x = Math.floor((e.clientX - rect.left) * scaleX);
    const y = Math.floor((e.clientY - rect.top) * scaleY);

    const context = canvas.getContext("2d");
    if (!context) return;

    const pixel = context.getImageData(x, y, 1, 1).data; // Get color data for one pixel

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

      const colorHex = hex.toUpperCase();
      console.log(`Picked color: ${colorHex} at position (${x}, ${y})`);
      onColorSelect(colorHex);

      // Send the color to the extension backend to be inserted
      vscode.postMessage({
        command: "insertColor",
        text: colorHex,
      });
    }
  };

  if (!imageDataUrl) return null; // Don't show the canvas if there's no image

  return (
    <div style={{ marginTop: "1rem" }}>
      <canvas
        ref={canvasRef}
        onClick={handleCanvasClick}
        style={{
          cursor: "crosshair",
          maxWidth: "100%",
          border: "1px solid var(--vscode-editorWidget-border)",
          display: "block",
        }}
      />
    </div>
  );
};
