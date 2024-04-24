async function ImageSendToApi(imgName, imgData64, Date) {
    let Image = {};
    Image.Name = imgName;
    Image.Data = imgData64;
    // Image.Date = Date
    // console.log(JSON.stringify(Image))
console.log("salut");

    try {
        const response = await send(Image); 
        console.log(response);
        return response;
    } catch (error) {
        console.error(error);
        throw error;
    }
}

async function send(Image) {
    try {
        const response = await fetch("http://81.168.126.146:5050/api", {
            method: "POST",
            body: JSON.stringify(Image)
        });
        const json = await response.json();
        console.log(json);
        return json;
    } catch (error) {
        console.error(error);
        throw error;
    }
}

export default ImageSendToApi;
