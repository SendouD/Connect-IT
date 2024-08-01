import { useEffect, useState } from "react";
import { ethers } from "ethers";
import config from "./config.json";

import DocumentVerify from "./abis/DocumentVerify.json";
import "./index.css";
import FileUpload from "./FileUpload"; 
import FileRetrieve from "./FileRetrieve";
function App() {
  
  const [Imghash, setImghash] = useState(null);
  const [tokenID, setTokenID] = useState(null);

  const [provider, setProvider] = useState(null);
  const [account, setAccount] = useState(null);
  
  const [docverifyDAPP, setdocverifyDAPP] = useState(null);
  
  // const handleIncrement = async() => {
  //   const signer = await provider.getSigner()
  //   let transaction = await docverifyDAPP.connect(signer).increament()
  //   let receipt = await transaction.wait()
  //   setCounter(receipt.events[0].args[0].toNumber());
  // };

  // const handleDecrement = async() => {
  //   const signer = await provider.getSigner()
  //   let transaction = await docverifyDAPP.connect(signer).decrement()
  //   let receipt = await transaction.wait()
  //   setCounter(receipt.events[0].args[0].toNumber());
  // };

  const addimagehash = async() => {
    const signer = await provider.getSigner()
    const validAddress = "0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266";
    let transaction = await docverifyDAPP.connect(signer).add(Imghash,validAddress);
    let receipt = await transaction.wait()
    console.log(receipt.events[0].args[0].toNumber());
  };

  const getdocbytokenID = async() => {
    const signer = await provider.getSigner()
    let transaction = await docverifyDAPP.connect(signer).getDocument(parseInt(tokenID));
    
    console.log(transaction);
  };
  const Verifydocument = async() => {
    const signer = await provider.getSigner()
    let transaction = await docverifyDAPP.connect(signer).verifyDocument(Imghash);
    console.log(transaction);
    
  };

  async function loadBlockchainData() {
    //get provider eg:metamask,rainbow
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    setProvider(provider);
    //get network ethereum solana localhost
    const network = await provider.getNetwork();
    //get contract 
    const docverifyDAPP  = new ethers.Contract(config[network.chainId].DocumentVerify.address, DocumentVerify, provider)
    setdocverifyDAPP(docverifyDAPP)

    
    window.ethereum.on("accountsChanged", async () => {
      loadAccount();
    });
  }
  async function loadAccount() {

    const accounts = await window.ethereum.request({
      method: "eth_requestAccounts",
    });
    const account = ethers.utils.getAddress(accounts[0]);
    setAccount(account);
  }
  useEffect(() => {
    loadBlockchainData();
    loadAccount();
  }, []);
  return (
    <div>
      <div style={{ display: "flex", justifyContent: "center" }}>
        <table>
       
         
         
          <tr>
            {" "}
            <td></td>
            <td>
            <input
                type="text"
                value={Imghash}
                onChange={(e) => setImghash(e.target.value)}
              />
              <button onClick={Verifydocument}>Verify Document </button>
            </td>
          </tr>
        </table>
      </div>
      
      <FileUpload provider={provider} docverifyDAPP={docverifyDAPP}></FileUpload>
      <br />
      <FileRetrieve provider={provider} docverifyDAPP={docverifyDAPP} />

      
    </div>
  );
}

export default App;