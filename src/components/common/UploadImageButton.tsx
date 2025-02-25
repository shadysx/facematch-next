"use client";

import { useRef } from "react";

interface ImageUploadButtonProps {
  onImageSelected: (file: File) => void;
  isLoading?: boolean;
}

export default function ImageUploadButton({
  onImageSelected,
  isLoading = false,
}: ImageUploadButtonProps) {
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    onImageSelected(file);
  };

  const handleButtonClick = () => {
    fileInputRef.current?.click();
  };

  return (
    <div className="flex flex-col items-center space-y-4">
      <button
        onClick={handleButtonClick}
        disabled={isLoading}
        className="bg-blue-500 hover:bg-blue-600 text-white font-medium py-2 px-4 rounded disabled:opacity-50"
        type="button"
      >
        {isLoading ? "Loading..." : "Select an image"}
      </button>

      {/* Hidden file input */}
      <input
        type="file"
        ref={fileInputRef}
        onChange={handleFileChange}
        accept="image/*"
        className="hidden"
      />
    </div>
  );
}
