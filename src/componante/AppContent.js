import React, { useEffect, useState } from "react";
import "../static/css/AppContent.css";
import Web3 from "web3";
import smartContractABI from "../abi/abiFile.json";
import { generateAvatarURL } from '@cfx-kit/wallet-avatar'
import LikeSystem from "./LikeSystem";

const AppContent = () => {
  const [allBlocks, setAllBlocks] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      
      const web3 = new Web3(window.ethereum);
      const contractAddress = "0x49c3c05a0ec5e1B487c338ff579eD136590269a8";
      const contractInstance = new web3.eth.Contract(
        smartContractABI,
        contractAddress
      );

      const blocks = await contractInstance.methods.getAllBlocks().call();
      setAllBlocks(blocks);
    };

    fetchData();
  }, []); 

  function masquerAdresse(auteurAdresse) {
    if (auteurAdresse.length < 10) {
      return "Adresse invalide";
    }
  
    const debut = auteurAdresse.slice(0, 8);
    const fin = auteurAdresse.slice(-8);
  
    return `${debut}......${fin}`;
  }
  

  console.log(allBlocks)

  return (
    <div className="d-flex flex-wrap mx-auto gap-3">
      <div className="card col-md-7 mx-4">
        
         {/* //! début de post */}
         {allBlocks.toReversed().map((block, index) => (
        <div className="card-body d-flex flex-wrap border-bottom" id="post" data-id={block.UUID}>
          <div className="text-center col-md-2 mx-auto" id="avatar-div">
            <img
              src={generateAvatarURL(block.author)}
              id="avatar"
              className="rounded-circle mb-3"
              alt="Avatar"
            />
            <h5 className="mb-2">
              <p>{masquerAdresse(block.author)}</p>
            </h5>
          </div>
          <div className="col-md-10">
            <h5 className="card-title">{block.title}</h5>
            <p className="card-text">
              {block.content}
            </p>
            <div className="col-md-4">
              {block.link && (
                <img
                src={"http://81.168.126.146:5050" + block.link}
                className="img-fluid img-thumbnail"
                id="imagePost"
                alt="imagePost"
                />
                )}
            </div>
              <LikeSystem block={block} />
          </div>
        </div> 
         ))}
      </div>
      <div className="col-md-4 mx-4" id="rules">
        <div className="card">
          <div className="card-body">
            <div className="accordion accordion-flush" id="accordionFlushExample">
              <div className="accordion-item">
                <h2 className="accordion-header">
                  <button
                    className="accordion-button collapsed"
                    type="button"
                    data-bs-toggle="collapse"
                    data-bs-target="#flush-collapseOne"
                    aria-expanded="false"
                    aria-controls="flush-collapseOne"
                  >
                    La règle #1
                  </button>
                </h2>
                <div
                  id="flush-collapseOne"
                  className="accordion-collapse collapse"
                  data-bs-parent="#accordionFlushExample"
                >
                  <div className="accordion-body">J'ai</div>
                </div>
              </div>
              <div className="accordion-item">
                <h2 className="accordion-header">
                  <button
                    className="accordion-button collapsed"
                    type="button"
                    data-bs-toggle="collapse"
                    data-bs-target="#flush-collapseTwo"
                    aria-expanded="false"
                    aria-controls="flush-collapseTwo"
                  >
                    La règle #2
                  </button>
                </h2>
                <div
                  id="flush-collapseTwo"
                  className="accordion-collapse collapse"
                  data-bs-parent="#accordionFlushExample"
                >
                  <div className="accordion-body">Pas</div>
                </div>
              </div>
              <div className="accordion-item">
                <h2 className="accordion-header">
                  <button
                    className="accordion-button collapsed"
                    type="button"
                    data-bs-toggle="collapse"
                    data-bs-target="#flush-collapseThree"
                    aria-expanded="false"
                    aria-controls="flush-collapseThree"
                  >
                    La règle #3
                  </button>
                </h2>
                <div
                  id="flush-collapseThree"
                  className="accordion-collapse collapse"
                  data-bs-parent="#accordionFlushExample"
                >
                  <div className="accordion-body">D'idée</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AppContent;
