import { useState } from "react";
import { ImageInput } from "../components/ImageInput";
import { DragDropInput } from "../components/DragDropInput";
import { UrlInput } from "../components/UrlInput";
import { InputMethodSelector } from "../components/InputMethodSelector";
// import { ColorCanvas } from "../components/ColorCanvas";

function App() {
  const [imageDataUrl, setImageDataUrl] = useState<string | null>(null);
  // const [pickedColor, setPickedColor] = useState<string | null>(null);
  const [inputMethod, setInputMethod] = useState<string>("Picture Upload");

  const handleImageSelect = (dataUrl: string) => {
    setImageDataUrl(dataUrl);
  };

  const handleMethodChange = (method: string) => {
    setInputMethod(method);
  };

  const renderInputComponent = () => {
    switch (inputMethod) {
      case "Picture Upload":
        return <ImageInput onImageSelect={handleImageSelect} />;
      case "Drag & Drop":
        return <DragDropInput onImageSelect={handleImageSelect} />;
      case "Url Input":
        return <UrlInput onImageSelect={handleImageSelect} />;
      default:
        return <ImageInput onImageSelect={handleImageSelect} />;
    }
  };

  return (
    <main className="py-2 px-3 bg-vscode text-vscode font-vscode h-full overflow-y-auto">
      {!imageDataUrl && (
        <div>
          <InputMethodSelector onMethodChange={handleMethodChange} />
          {renderInputComponent()}
        </div>
      )}

      {/* {imageDataUrl && (
        <ColorCanvas
          imageDataUrl={imageDataUrl}
          onColorSelect={setPickedColor}
        />
      )}

      {pickedColor && (
        <div className="mt-5 flex items-center font-mono text-lg">
          <div
            className="w-6 h-6 border border-vscode mr-3"
            style={{ backgroundColor: pickedColor }}
          />
          <span className="text-vscode">{pickedColor}</span>
        </div>
      )} */}
    </main>
  );
}

export default App;
