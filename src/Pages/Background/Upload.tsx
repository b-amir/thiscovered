/* eslint-disable @typescript-eslint/prefer-optional-chain */
import React, { useState } from "react";

interface IProps {
  setImageUrl: React.Dispatch<React.SetStateAction<string>>;
}
const UploadImage: React.FC<IProps> = ({ setImageUrl }) => {
  const [uploadedImage, setUploadedImage] = useState<File | null>(null);

  return (
    <div>
      <p className="custom-file-upload-label">Select from device</p>
      <div className="custom-file-row">
        <label
          htmlFor="file-upload"
          className="custom-file-upload upload_label secondary-button">
          Choose file
          <input
            id="file-upload"
            type="file"
            name="myImage"
            onChange={(event) => {
              // console.log(event.target.files[0]);
              if (event.target.files != null && event.target.files[0] != null) {
                setUploadedImage(event.target.files[0]);
                setImageUrl(URL.createObjectURL(event.target.files[0]));
                // setImageUrl(URL.createObjectURL(uploadedImage));
              }
            }}
          />{" "}
        </label>

        {uploadedImage != null && (
          <button
            className="upload_remove"
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
