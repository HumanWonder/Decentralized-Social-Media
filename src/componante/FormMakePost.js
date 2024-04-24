import React, { useState, useEffect } from "react";
import { v4 as uuidv4 } from "uuid";
import ImageSendToApi from "../utils/ImgToApi";
import Web3 from "web3";
import smartContractABI from "../abi/abiFile.json";


const FormMakePost = ({ onSubmit }) => {
  const [postTitle, setPostTitle] = useState("");
  const [postText, setPostText] = useState("");
  const [base64Img, setBase64Img] = useState("");
  const [fileName, setFileName] = useState("");
  const [imgUrl, setImgUrl] = useState("");

  const web3 = new Web3(window.ethereum);
  const contractAddress = "0x49c3c05a0ec5e1B487c338ff579eD136590269a8";
  const contractInstance = new web3.eth.Contract(smartContractABI, contractAddress);

  const handleSubmit = (e) => {
    e.preventDefault();

    const uuid = uuidv4();
    const date = new Date().toLocaleDateString('fr-FR');

    if (fileName !== '') {
      ImageSendToApi(fileName, base64Img, date)
        .then((response) => {
          handleImageUpload(response, uuid);
    
          handleFormSubmit(uuid, response);
        })
        .catch((error) => {
          console.error("Error sending image:", error);
        });
    } else {
      handleFormSubmit(uuid, null);
    }
  };

  const handleImageUpload = (response, uuid) => {
    if (response['Error']) {
      let error = response['Error'];
      console.error("Error sending image: ", error);
      alert("Error sending image: ", error);
      return;
    }
    
    setImgUrl(response['Link']);
    
  };

  const handleFormSubmit = async (uuid, response) => {
    let imgLink = response !== null ? response['Link'] : "";
    const formData = {
      uuid: uuid,
      postTitle: postTitle,
      postText: postText,
      postImg: base64Img,
      imgUrl: imgLink
    };
    console.log("Form data: ", formData);
    console.log(fileName);
    try {
      const accounts = await window.ethereum.request({ method: "eth_requestAccounts" });
      const account = accounts[0];

      console.log("account: ", account)
      console.log("postTitle: ", postTitle)
      console.log("postText: ", postText)
      console.log("imgUrl: ", imgUrl)

      /**
       * @param {author} address
       * @param {title} string
       * @param {content} string
       * @param {link} string
       * @param {isParents} bool
       * @param {parentUUID} uint
       */
      await contractInstance.methods.newBlock(account, postTitle, postText, imgLink, false, 0).send({
        from: account,
      });

    } catch (error) {
      console.error("Error interacting with smart contract:", error);
    } finally {
      resetForm();
    }
    onSubmit(formData);
  };

  const resetForm = () => {
    setPostTitle("");
    setPostText("");
    setBase64Img("");
    setFileName("");
    setImgUrl("");
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];

    if (file) {
      const allowedTypes = ["image/jpeg", "image/png"];

      if (!allowedTypes.includes(file.type)) {
        alert("Veuillez sélectionner un fichier image valide (JPEG, PNG).");
        e.target.value = null;
        return;
      }

      const maxSize = 2 * 1024 * 1024;

      if (file.size > maxSize) {
        alert(`La taille du fichier dépasse la limite de ${maxSize / 1024 / 1024} Mo.`);
        e.target.value = null;
        return;
      }

      const uuid = uuidv4();
      setFileName(`${uuid}.${file.type.slice(6)}`);

      const reader = new FileReader();
      reader.onloadend = () => {
        setBase64Img(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  useEffect(() => {
    console.log("Image URL:", imgUrl);
    setImgUrl(imgUrl)
  }, [imgUrl]);

  return (
    <form onSubmit={handleSubmit}>
      <div className="mb-3">
        <label htmlFor="postTitle" className="form-label">
          Title*:
        </label>
        <input
          type="text"
          className="form-control"
          id="postTitle"
          name="postTitle"
          value={postTitle}
          onChange={(e) => setPostTitle(e.target.value)}
          required
        />
      </div>
      <div className="mb-3">
        <label htmlFor="postText" className="form-label">
          Text*:
        </label>
        <textarea
          className="form-control"
          id="postText"
          name="postText"
          value={postText}
          onChange={(e) => setPostText(e.target.value)}
          required
        ></textarea>
      </div>
      <div>
        <label htmlFor="formFile" className="form-label">
          Default file input example
        </label>
        <input
          className="form-control"
          type="file"
          id="formFile"
          onChange={handleFileChange}
        />
      </div>
      <div id="help" className="form-text mb-3">
        Les champs avec une * sont requis
      </div>

      <button type="submit" className="btn btn-primary">
        Submit
      </button>
    </form>
  );
};

export default FormMakePost;