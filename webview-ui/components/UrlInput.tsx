import React, { useState } from "react";

interface UrlInputProps {
  onImageSelect: (imageDataUrl: string) => void;
}

export const UrlInput: React.FC<UrlInputProps> = ({ onImageSelect }) => {
  const [url, setUrl] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  const handleUrlSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!url.trim()) return;

    setIsLoading(true);
    setError("");

    try {
      // Create a new image element to test if URL is valid
      const img = new Image();
      img.crossOrigin = "anonymous";

      img.onload = () => {
        // Create canvas to convert image to data URL
        const canvas = document.createElement("canvas");
        const ctx = canvas.getContext("2d");

        canvas.width = img.naturalWidth;
        canvas.height = img.naturalHeight;

        ctx?.drawImage(img, 0, 0);

        try {
          const dataUrl = canvas.toDataURL();
          onImageSelect(dataUrl);
          setUrl("");
        } catch {
          setError("Unable to process image from this URL");
        }
        setIsLoading(false);
      };

      img.onerror = () => {
        setError("Failed to load image from URL");
        setIsLoading(false);
      };

      img.src = url;
    } catch {
      setError("Invalid URL");
      setIsLoading(false);
    }
  };

  return (
    <div className="space-y-3">
      <div className="border-2 border-dashed border-vscode p-8 text-center rounded bg-vscode">
        <div className="space-y-4">
          <div className="text-2xl">🌐</div>
          <p className="text-vscode font-medium">
            Paste a URL to an online image
          </p>
          <p className="text-vscode text-sm opacity-70">
            or a Figma/Canva share link
          </p>
        </div>
      </div>

      <form onSubmit={handleUrlSubmit} className="space-y-2">
        <input
          type="url"
          value={url}
          onChange={(e) => setUrl(e.target.value)}
          placeholder="https://example.com/image.jpg"
          className="w-full px-3 py-2 text-sm bg-vscode border border-vscode text-vscode rounded focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
          disabled={isLoading}
        />

        <button
          type="submit"
          disabled={!url.trim() || isLoading}
          className="w-full px-3 py-2 text-sm bg-blue-600 text-white rounded hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {isLoading ? "Loading..." : "Load Image"}
        </button>

        {error && <p className="text-red-400 text-xs">{error}</p>}
      </form>
    </div>
  );
};
