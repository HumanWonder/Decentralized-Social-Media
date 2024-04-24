import React, { useState, useEffect } from "react";
import Web3 from "web3";
import smartContractABI from "../abi/abiFile.json";


function LikeSystem({ block }) {
  const [UserHasLike, setUserHasLike] = useState();

    useEffect(() => {
        const fetchLike = async () => {
            const accounts = await window.ethereum.request({ method: "eth_requestAccounts" });
            const account = accounts[0];
          const web3 = new Web3(window.ethereum);
          const contractAddress = "0x49c3c05a0ec5e1B487c338ff579eD136590269a8";
          const contractInstance = new web3.eth.Contract(
            smartContractABI,
            contractAddress
          );
    
          const hasLike = await contractInstance.methods.hasLiked(block.UUID, account).call();
          setUserHasLike(hasLike)
        };
        fetchLike();
      }, []); 

      function UserLike(params) {
        
      }

      function UserRemoveLike(params) {
        
      }

    return (
    <>
        {UserHasLike ? (
            <div className="col px-1 d-flex align-items-center mt-2">
                <button className="btn btn-outline-primary" onClick={UserRemoveLike}>
                    <i className="fa-solid fa-thumbs-up" aria-hidden="true"/>&nbsp;
                    {block.likes.length !== "" ? 0 : block.likes.length} J'aime
                </button>
            </div>
        ) : (
            <div className="col px-1 d-flex align-items-center mt-2">
                <button class="btn btn-light LikeButtonInfo" onClick={UserLike}>
                    <i class="fa-regular fa-thumbs-up" aria-hidden="true"/>&nbsp;
                    {block.likes.length !== "" ? 0 : block.likes.length} Aimer ?
                </button>
            </div>
        )}
    </>
  );
}

export default LikeSystem;
