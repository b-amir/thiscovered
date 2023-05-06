/* eslint-disable @typescript-eslint/prefer-optional-chain */
import React, { useState } from "react";

interface IProps {
  setImageUrl: React.Dispatch<React.SetStateAction<string>>;
  resetImagePosition: () => void;
}
const UploadImage: React.FC<IProps> = ({ setImageUrl, resetImagePosition }) => {
  const [uploadedImage, setUploadedImage] = useState<File | null>(null);

  return (
    <div>
      <p className="custom-file-upload-label">Select from device</p>
      <div className="custom-file-row">
        <label
          htmlFor="file-upload"
          className="custom-file-upload upload-label secondary-button">
          Choose file
          <input
            id="file-upload"
            type="file"
            name="myImage"
            onChange={(event) => {
              if (event.target.files != null && event.target.files[0] != null) {
                setUploadedImage(event.target.files[0]);
                setImageUrl(URL.createObjectURL(event.target.files[0]));
                resetImagePosition();
              }
            }}
          />{" "}
        </label>

        {uploadedImage != null && (
          <button
            className="upload-remove"
            onClick={() => {
              setUploadedImage(null);
              setImageUrl("");
            }}>
            ✕ Remove
          </button>
        )}
      </div>
    </div>
  );
};

export default UploadImage;
