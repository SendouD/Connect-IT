// src/FileUpload.js

import React, { useState } from 'react';
import axios from 'axios';

const FileUpload = ({ provider, docverifyDAPP }) => {
  const [file, setFile] = useState(null);
  const [fileName, setFileName] = useState("No image selected");

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (file) {
      try {
        const formData = new FormData();
        formData.append("file", file);

        const resFile = await axios({
          method: "post",
          url: "https://api.pinata.cloud/pinning/pinFileToIPFS",
          data: formData,
          headers: {
            pinata_api_key: `19f1bbf42a0d752714df`,
            pinata_secret_api_key: `2bedd564990e87e6d46fedfb8261b27a3d1de197aba5b44e83c6d7699aa87a88`,
            "Content-Type": "multipart/form-data",
          },
        });

        const ImgHash = resFile.data.IpfsHash;
        const dataAdded=resFile.data.Timestamp;
        console.log(dataAdded);
        console.log(ImgHash);

        // Call addimagehash function after successful image upload
        const addimagehash = async () => {
          try {
            const signer = await provider.getSigner();
            const validAddress = "0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266";
            let transaction = await docverifyDAPP.connect(signer).add(ImgHash, validAddress);
            let receipt = await transaction.wait();
            console.log(receipt.events[0].args[1].toNumber());
            alert("Successfully added image hash to blockchain");
          } catch (error) {
            console.error("Error adding image hash to blockchain:", error);
            alert("Unable to add image hash to blockchain");
          }
        };

        await addimagehash();

        alert("Successfully Image Uploaded");
        setFileName("No image selected");
        setFile(null);
      } catch (e) {
        console.error("Error uploading image to Pinata:", e);
        alert("Unable to upload image to Pinata");
      }
    }
  };

  const retrieveFile = (e) => {
    const data = e.target.files[0];
    if (data) {
      setFile(data);
      setFileName(data.name);
    }
  };

  return (
    <div className="top">
      <form className="form" onSubmit={handleSubmit}>
        <label htmlFor="file-upload" className="choose">
          Choose Image
        </label>
        <input
          type="file"
          id="file-upload"
          name="data"
          onChange={retrieveFile}
        />
        <span className="textArea">Image: {fileName}</span>
        <button type="submit" className="upload" disabled={!file}>
          Upload File
        </button>
      </form>
    </div>
  );
};

export default FileUpload;
