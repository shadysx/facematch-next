"use client";

import { useRef } from "react";
import { Button } from "../ui/button";

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
      <Button onClick={handleButtonClick} disabled={isLoading} type="button">
        {isLoading ? "Loading..." : "Select an image"}
      </Button>

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
