// src/FileRetrieve.js

import React, { useState } from 'react';

const FileRetrieve = ({ provider, docverifyDAPP }) => {
  const [tokenId, setTokenId] = useState("");
  const [imgUrl, setImgUrl] = useState("");

  const handleRetrieve = async () => {
    if (!tokenId) {
      alert("Please enter a token ID");
      return;
    }

    try {
      const signer = await provider.getSigner();
      const document = await docverifyDAPP.connect(signer).getDocument(parseInt(tokenId));
      const imgUrl = `https://gateway.pinata.cloud/ipfs/${document.hash}`;
      setImgUrl(imgUrl);
      console.log(imgUrl);
    } catch (error) {
        if (error.data && error.data.message) {
            // Extract revert reason
            const reason = error.data.message.replace('Error: ', '');
            console.log(reason);
          } else {
            console.log("An unexpected error occurred.");
          }
          console.error("Error retrieving document from blockchain:", error);
    }
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
      <button onClick={handleRetrieve} className="retrieve-button">
        Retrieve File
      </button>
      
        <div className="image-container">
          <img
            src={imgUrl}
            alt="Retrieved from IPFS"
            className="retrieved-image"
            // onError={(e) => {
            //   e.target.onerror = null;
            //   e.target.alt = "Error loading image";
            // }}
          />
        </div>
      
    </div>
  );
};

export default FileRetrieve;
