import { useState } from "react";
import { ImageInput } from "../components/ImageInput";
import { ColorCanvas } from "../components/ColorCanvas";

function App() {
  // State to hold the loaded image data
  const [imageDataUrl, setImageDataUrl] = useState<string | null>(null);
  // State to hold the last picked color for display
  const [pickedColor, setPickedColor] = useState<string | null>(null);

  // Debug logging
  console.log("App render - imageDataUrl:", imageDataUrl ? "loaded" : "null");
  console.log("App render - pickedColor:", pickedColor);

  const handleImageSelect = (dataUrl: string) => {
    console.log("Image selected in App component");
    setImageDataUrl(dataUrl);
  };

  return (
    <main className="py-2 px-3 bg-vscode text-vscode font-vscode h-full overflow-y-auto">
      {/* Show the image input component only if no image is loaded */}
      {!imageDataUrl && <ImageInput onImageSelect={handleImageSelect} />}

      {/* Show the canvas only after an image is loaded */}
      {imageDataUrl && (
        <ColorCanvas
          imageDataUrl={imageDataUrl}
          onColorSelect={setPickedColor}
        />
      )}

      {/* Show the picked color's info */}
      {pickedColor && (
        <div className="mt-5 flex items-center font-mono text-lg">
          <div
            className="w-6 h-6 border border-vscode mr-3"
            style={{ backgroundColor: pickedColor }}
          />
          <span className="text-vscode">{pickedColor}</span>
        </div>
      )}
    </main>
  );
}

export default App;
