const uploadFile = async (file) => {
  const CLOUD_NAME = "dsbgq7vwh";
  const PRESET_NAME = "chat-app-file";
  const api = `https://api.cloudinary.com/v1_1/${CLOUD_NAME}/image/upload`;

  const formData = new FormData();
  formData.append("file", file);
  formData.append("upload_preset", PRESET_NAME);

  const response = await fetch(api, {
    method: "post",
    body: formData,
  });

  const responseData = await response.json();
  return responseData;
};

export default uploadFile;
