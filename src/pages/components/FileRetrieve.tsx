'use client'

import React, { useEffect, useState } from 'react';
import { useAccount } from 'wagmi';
import { abi } from '../../artifacts/contracts/DocumentVerify.sol/DocumentVerify.json';
import { useReadContract } from 'wagmi';

const FileRetrieve = () => {
  const [tokenId, setTokenId] = useState("");
  const [imgUrl, setImgUrl] = useState("");
  const { address } = useAccount();

  const { data, isError, error, isLoading } = useReadContract({
    abi,
    address: '0xe7f1725E7734CE288F8367e1Bb143E90bb3F0512',
    account:address,
    functionName: 'getDocument',
    args: [tokenId],
    query: {
      enabled: Boolean(tokenId),
    }
  });
  useEffect(()=>{

    setTokenId("");


  },[imgUrl])
 
  
  const handleRetrieve = () => {
    const imgUrl = `https://gateway.pinata.cloud/ipfs/${data}`;
    console.log(imgUrl);
    setImgUrl(imgUrl);   
  };

  return (
    <div className="retrieve-container">
      <input
        type="text"
        placeholder="Enter Token ID"
        value={tokenId}
        onChange={(e) => setTokenId(e.target.value)}
        className="token-input"
      />
      <button onClick={handleRetrieve} className="retrieve-button" disabled={isLoading}>
        {isLoading ? 'Retrieving...' : 'Retrieve File'}
      </button>

      {isError && (
        <div className="error-message">
          Error: {error?.message || "An unexpected error occurred."}
        </div>
      )}

      {imgUrl && (
        <div className="image-container">
          <img
            src={imgUrl}
            alt="Retrieved from IPFS"
            className="retrieved-image"
          />
        </div>
      )}
    </div>
    
  );
};

export default FileRetrieve;
