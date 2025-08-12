import React, { useRef } from "react";

interface ImageInputProps {
  onImageSelect: (imageDataUrl: string) => void;
}

export const ImageInput: React.FC<ImageInputProps> = ({ onImageSelect }) => {
  const fileInputRef = useRef<HTMLInputElement>(null);

  // This function reads a file and converts it to a Data URL
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

  const handleClick = () => {
    fileInputRef.current?.click();
  };

  return (
    <div
      className="border-2 border-dashed border-vscode p-8 text-center cursor-pointer mb-5 rounded transition-colors hover:border-opacity-70 hover:bg-opacity-10 bg-transparent text-vscode"
      onClick={handleClick}
    >
      <div className="space-y-2">
        <p className="text-vscode font-medium">Click to select an image file</p>
        <p className="text-vscode text-sm opacity-70">
          Supports JPG, PNG, GIF, WebP formats
        </p>
      </div>
      <input
        type="file"
        ref={fileInputRef}
        onChange={(e) => e.target.files && handleFileChange(e.target.files[0])}
        accept="image/*"
        className="hidden"
      />
    </div>
  );
};
