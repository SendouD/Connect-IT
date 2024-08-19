// src/FileUpload.js

import React, { useState } from 'react';
import axios from 'axios';
import { useAccount } from 'wagmi';
import { useReadContract, useWriteContract } from 'wagmi';
import { abi } from '../../artifacts/contracts/DocumentVerify.sol/DocumentVerify.json';
import { useEffect } from 'react';
import { BigNumberish } from 'ethers';
import { useWatchContractEvent } from 'wagmi'

const FileUpload = () => {
  const [file, setFile] = useState(null);
  const [fileName, setFileName] = useState("No image selected");
  const { address } = useAccount();
  const { writeContract } = useWriteContract();

  useWatchContractEvent({
    address: '0xe7f1725E7734CE288F8367e1Bb143E90bb3F0512',
    abi,
    eventName: 'docadded',
    onLogs(logs) {
      console.log('New logs!', logs)
    },
  })

  const handleSubmit = async (e:any) => {
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
        const addimagehash =  () => { 
            try {
               writeContract({
                abi,
                address: '0xe7f1725E7734CE288F8367e1Bb143E90bb3F0512',
                functionName: 'add',
                args: [
                    ImgHash,
                    '0xf39fd6e51aad88f6f4ce6ab8827279cfffb92266',
                  ],
              });
              // Optionally update UI or fetch latest value
            } catch (err) {
              console.error(err);
            }
          };
        addimagehash();
        alert("Successfully Image Uploaded");
        setFileName("No image selected");
        setFile(null);
      } catch (e) {
        console.error("Error uploading image to Pinata:", e);
        alert("Unable to upload image to Pinata");
      }
    }
  };

  const retrieveFile = (e:any) => {
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
        <br />  
        <button type="submit" className="upload" disabled={!file}>
          Upload File
        </button>
      </form>
    </div>
  );
};

export default FileUpload;