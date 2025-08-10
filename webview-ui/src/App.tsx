import { useState } from "react";
import { ImageInput } from "../components/ImageInput";
import { ColorCanvas } from "../components/ColorCanvas";
import "./App.css";

function App() {
  // State to hold the loaded image data
  const [imageDataUrl, setImageDataUrl] = useState<string | null>(null);
  // State to hold the last picked color for display
  const [pickedColor, setPickedColor] = useState<string | null>(null);

  return (
    <main>
      <h1>Take Colors</h1>

      {/* Show the image input component only if no image is loaded */}
      {!imageDataUrl && <ImageInput onImageSelect={setImageDataUrl} />}

      {/* Show the canvas only after an image is loaded */}
      <ColorCanvas imageDataUrl={imageDataUrl} onColorSelect={setPickedColor} />

      {/* Show the picked color's info */}
      {pickedColor && (
        <div className="color-display">
          <div
            className="color-swatch"
            style={{ backgroundColor: pickedColor }}
          />
          <span>{pickedColor}</span>
        </div>
      )}
    </main>
  );
}

export default App;
