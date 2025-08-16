import React, { useRef, useEffect, useState } from "react";

interface ImageInputProps {
  onImageSelect: (imageDataUrl: string) => void;
}

export const ImageInput: React.FC<ImageInputProps> = ({ onImageSelect }) => {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [containerHeight, setContainerHeight] = useState(140);

  useEffect(() => {
    const updateHeight = () => {
      if (containerRef.current) {
        const width = containerRef.current.offsetWidth;
        const calculatedHeight = width * 0.5;
        const newHeight = Math.max(120, Math.min(calculatedHeight, 260));
        setContainerHeight(newHeight);
      }
    };

    updateHeight();

    const resizeObserver = new ResizeObserver(() => {
      requestAnimationFrame(updateHeight);
    });

    if (containerRef.current) {
      resizeObserver.observe(containerRef.current);
    }

    return () => {
      resizeObserver.disconnect();
    };
  }, []);

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
      ref={containerRef}
      className="w-full border-2 border-dashed border-vscode text-center cursor-pointer mb-4 rounded bg-transparent text-vscode transition-all duration-300 ease-out hover:border-opacity-70 hover:bg-opacity-5"
      onClick={handleClick}
      style={{
        height: `${containerHeight}px`,
        minHeight: "120px",
        maxHeight: "260px",
      }}
    >
      <div className="h-full flex flex-col items-center justify-center px-4">
        <p className="text-sm text-vscode font-medium transition-colors duration-300">
          Click to select an image file
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
