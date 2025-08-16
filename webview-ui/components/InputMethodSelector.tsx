import React, { useState } from "react";
import { CustomSelect } from "./CustomSelect";

interface InputMethodSelectorProps {
  onMethodChange: (method: string) => void;
}

export const InputMethodSelector: React.FC<InputMethodSelectorProps> = ({
  onMethodChange,
}) => {
  const [selectedMethod, setSelectedMethod] = useState("Picture Upload");

  const methods = [
    { value: "Picture Upload", label: "Picture Upload" },
    { value: "Drag & Drop", label: "Drag & Drop" },
    { value: "Url Input", label: "Url Input" },
  ];

  const handleMethodChange = (method: string) => {
    setSelectedMethod(method);
    onMethodChange(method);
  };

  return (
    <div className="mb-4">
      <CustomSelect
        value={selectedMethod}
        options={methods}
        onChange={handleMethodChange}
        className="rounded"
      />
    </div>
  );
};
