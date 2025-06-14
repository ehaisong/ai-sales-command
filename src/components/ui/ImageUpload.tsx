
import React, { useRef } from "react";

interface ImageUploadProps {
  value: string | null;
  onChange: (img: string | null) => void;
}

const ImageUpload: React.FC<ImageUploadProps> = ({ value, onChange }) => {
  const fileRef = useRef<HTMLInputElement>(null);

  function handleFile(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (evt) => {
      if (typeof evt.target?.result === "string") {
        onChange(evt.target.result);
      }
    };
    reader.readAsDataURL(file);
  }

  return (
    <div>
      <div
        className="w-20 h-20 rounded-full bg-gray-100 shadow flex justify-center items-center overflow-hidden cursor-pointer relative group"
        onClick={() => fileRef.current?.click()}
      >
        {value ? (
          <img src={value} alt="avatar" className="w-full h-full object-cover" />
        ) : (
          <span className="text-3xl text-gray-400">+</span>
        )}
        <input
          ref={fileRef}
          type="file"
          accept="image/*"
          className="hidden"
          onChange={handleFile}
        />
        <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-20 transition" />
      </div>
    </div>
  );
};

export default ImageUpload;
