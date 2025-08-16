import React, { useState } from "react";

interface DragDropInputProps {
  onImageSelect: (imageDataUrl: string) => void;
}

export const DragDropInput: React.FC<DragDropInputProps> = ({
  onImageSelect,
}) => {
  const [isDragOver, setIsDragOver] = useState(false);

  const handleFileChange = (file: File) => {
    console.log("File selected:", file.name, file.type);
    const reader = new FileReader();
    reader.onload = (e) => {
      console.log("File loaded successfully");
      onImageSelect(e.target?.result as string);
    };
    reader.onerror = (e) => {
      console.error("Error reading file:", e);
    };
    reader.readAsDataURL(file);
  };

  const onDragEnter = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragOver(true);
  };

  const onDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragOver(false);
  };

  const onDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
  };

  const onDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragOver(false);

    const files = e.dataTransfer.files;
    if (files.length > 0) {
      const file = files[0];
      if (file.type.startsWith("image/")) {
        handleFileChange(file);
      }
    }
  };

  return (
    <div
      className={`border-2 border-dashed p-8 text-center rounded transition-colors ${
        isDragOver
          ? "border-blue-400 bg-blue-500 bg-opacity-10"
          : "border-vscode hover:border-opacity-70"
      } bg-vscode text-vscode`}
      onDragEnter={onDragEnter}
      onDragLeave={onDragLeave}
      onDragOver={onDragOver}
      onDrop={onDrop}
    >
      <div className="space-y-2">
        <div className="text-2xl">📁</div>
        <p className="text-vscode font-medium">
          {isDragOver ? "Drop the image here!" : "Drag and drop an image here"}
        </p>
        <p className="text-vscode text-sm opacity-70">
          Supports JPG, PNG, GIF, WebP formats
        </p>
      </div>
    </div>
  );
};
