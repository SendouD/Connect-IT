import CertificateRegistry from "./artifacts/contracts/CertificateRegistry.sol/CertificateRegistry.json";
import { useState, useEffect } from "react";
import { ethers } from "ethers";
import FileUpload from "./components/FileUpload";
import Header from "./components/Header";
import Main from "./components/Main";

import "./App.css";

function App() {
  const [account, setAccount] = useState("");
  const [contract, setContract] = useState(null);
  const [provider, setProvider] = useState(null);

  useEffect(() => {
    // Wrap your code in an async function so you can use the 'await' keyword
    const initialize = async () => {
      try {
        // Check if MetaMask is installed and connected
        if (window.ethereum) {
          const provider = new ethers.providers.Web3Provider(window.ethereum);
          await window.ethereum.request({ method: "eth_requestAccounts" }); // Request user's accounts

          const signer = provider.getSigner();
          const address = await signer.getAddress();
          console.log(address);

          // Create a contract instance
          const contractAddress = "0x5fbdb2315678afecb367f032d93f642f64180aa3";
          const contract = new ethers.Contract(
            contractAddress,
            CertificateRegistry.abi,
            signer
          );
          console.log(contract);

          // Set state variables
          setAccount(address);
          setContract(contract);
          setProvider(signer);
        } else {
          alert("MetaMask is not installed or not connected.");
        }
      } catch (error) {
        console.error("Error initializing:", error);
      }
    };

    initialize();
  }, []);

  return (
    <>
      <div style={{ backgroundColor: "#023047", height: "70px" }}>
        <Header />
      </div>
      <div style={{ backgroundColor: "#8ecae6" }}></div>

      <div style={{ backgroundColor: "#8ecae6", display: "flex", flexDirection: "column", alignItems: "center" }}>
        <p className="mt-5 ml-3 text-dark font-weight-bold account-info">
          {account ? (
            <span className="text-dark">
              <span className="text-black font-weight-bold" style={{fontSize:"25px"}}>Wallet Connected     </span>
              <span className="account-number">   {account}</span>
            </span>
          ) : (
            "NOT CONNECTED"
          )}
        </p>

        <div className="mt-3">
          <FileUpload account={account} provider={provider} contract={contract} />
        </div>
        <Main />
      </div>
    </>
  );
}

export default App;
