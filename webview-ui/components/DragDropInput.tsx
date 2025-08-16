import React, { useState, useRef, useEffect } from "react";

interface DragDropInputProps {
  onImageSelect: (imageDataUrl: string) => void;
}

export const DragDropInput: React.FC<DragDropInputProps> = ({
  onImageSelect,
}) => {
  const [isDragOver, setIsDragOver] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const [containerHeight, setContainerHeight] = useState(140);
  const dragCounter = useRef(0);

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

  const onDragEnter = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    dragCounter.current++;

    if (e.dataTransfer.items && e.dataTransfer.items.length > 0) {
      setIsDragOver(true);
    }
  };

  const onDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    dragCounter.current--;

    if (dragCounter.current === 0) {
      setIsDragOver(false);
    }
  };

  const onDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();

    if (e.dataTransfer.dropEffect) {
      e.dataTransfer.dropEffect = "copy";
    }
  };

  const onDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();

    dragCounter.current = 0;
    setIsDragOver(false);

    const files = e.dataTransfer.files;
    console.log("Files dropped:", files.length);

    if (files.length > 0) {
      const file = files[0];
      console.log("Processing file:", file.name, file.type);

      if (file.type.startsWith("image/")) {
        handleFileChange(file);
      } else {
        console.warn("Invalid file type. Please select an image file.");
      }
    }
  };

  return (
    <div
      ref={containerRef}
      className={`w-full border-2 border-dashed text-center rounded transition-all duration-300 ease-out mb-4 ${
        isDragOver
          ? "border-blue-400 bg-blue-500 bg-opacity-10 border-solid"
          : "border-vscode bg-transparent hover:border-opacity-70"
      } text-vscode`}
      onDragEnter={onDragEnter}
      onDragLeave={onDragLeave}
      onDragOver={onDragOver}
      onDrop={onDrop}
      style={{
        height: `${containerHeight}px`,
        minHeight: "120px",
        maxHeight: "260px",
      }}
    >
      <div className="h-full flex flex-col items-center justify-center px-4 space-y-2">
        <p className="text-sm text-vscode font-medium transition-colors duration-300">
          {isDragOver ? "Drop the image here!" : "Drag and drop an image here"}
        </p>
      </div>
    </div>
  );
};
