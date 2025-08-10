import React, { useRef } from "react";

interface ImageInputProps {
  onImageSelect: (imageDataUrl: string) => void;
}

export const ImageInput: React.FC<ImageInputProps> = ({ onImageSelect }) => {
  const fileInputRef = useRef<HTMLInputElement>(null);

  // This function reads a file and converts it to a Data URL
  const handleFileChange = (file: File) => {
    const reader = new FileReader();
    reader.onload = (e) => {
      onImageSelect(e.target?.result as string);
    };
    reader.readAsDataURL(file);
  };

  // Event handlers for drag & drop
  const onDragOver = (e: React.DragEvent) => e.preventDefault();
  const onDrop = (e: React.DragEvent) => {
    e.preventDefault();
    const file = e.dataTransfer.files[0];
    if (file && file.type.startsWith("image/")) {
      handleFileChange(file);
    }
  };

  return (
    <div
      className="dropzone"
      onDragOver={onDragOver}
      onDrop={onDrop}
      onClick={() => fileInputRef.current?.click()}
    >
      <p>Drag & Drop an image here, or click to select a file</p>
      <input
        type="file"
        ref={fileInputRef}
        onChange={(e) => e.target.files && handleFileChange(e.target.files[0])}
        accept="image/*"
        style={{ display: "none" }}
      />
    </div>
  );
};
