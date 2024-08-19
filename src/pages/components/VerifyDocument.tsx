 // src/FileUpload.js

import React, { useState } from 'react';
import axios from 'axios';
import { useAccount } from 'wagmi';
import { useReadContract, useWriteContract } from 'wagmi';
import { abi } from '../../artifacts/contracts/DocumentVerify.sol/DocumentVerify.json';
import { useEffect } from 'react';
import { BigNumberish } from 'ethers';
import { useWatchContractEvent } from 'wagmi'

const VerifyDocument = () => {
  const [file, setFile] = useState(null);
  const [fileName, setFileName] = useState("No image selected");
  const { address } = useAccount();
  const[ImgHash,setImghash]=useState("");
  const [vs, setVs] = useState<boolean | null>(null); 
  const { writeContract } = useWriteContract();
  const [load,setLoad]=useState(false);



  const handleSubmit = async (e:any) => {
    e.preventDefault();
    if (file) {
      try {
        const formData = new FormData();
        formData.append("file", file);
        setLoad(true);

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
        setLoad(false);

        const ImgHash = resFile.data.IpfsHash;
        const dataAdded=resFile.data.Timestamp;
        setImghash(ImgHash)
        console.log(ImgHash);

       
        
        setFileName("No image selected");
        setFile(null);
      } catch (e) {
        console.error("Error uploading image to Pinata:", e);
        alert("Unable to upload image to Pinata");
      }
    }
  };
  const { data, isError, error, isLoading } = useReadContract({
    abi,
    address: '0xe7f1725E7734CE288F8367e1Bb143E90bb3F0512',
    functionName: 'verifyDocument',
    args: [ImgHash],
    query: {
      enabled: Boolean(ImgHash),
    }
  });
  const delfile=async ()=>{
    try {
      const response = await axios({
        method: 'delete',
        url: `https://api.pinata.cloud/pinning/unpin/${ImgHash}`,
        headers: {
          pinata_api_key: '19f1bbf42a0d752714df',
          pinata_secret_api_key: '2bedd564990e87e6d46fedfb8261b27a3d1de197aba5b44e83c6d7699aa87a88',
        },
      });

      if (response.status === 200) {
       console.log("file is not verified")
      } else {
        console.error('Failed to delete file:', response.data);
      }
    } catch (error) {
      console.error('Error deleting file from Pinata:', error);
    }
  }
  useEffect(() => {
    if (data !== undefined) {
      // Assuming data is a boolean, otherwise adjust the type assertion
      setVs(data as boolean);
    }
    if(!data){
      delfile();

      
    }
  }, [data]);

 
  console.log(data)

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
        <button type="submit" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded" disabled={!file||isLoading} onClick={handleSubmit}>
        {load ? 'Loading...' : 'Upload the file to verify'}
         </button>
      </form>
      
      <p>Status  {vs?"true":"false"}</p>
    </div>
  );
};

export default VerifyDocument;