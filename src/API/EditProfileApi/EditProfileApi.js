import axios from "axios";

async function uploadImage(formData) {
    if (!formData.photo || !formData.photo[0]) return;

    const uploadFormData = new FormData();
    uploadFormData.append("photo", formData.photo[0]);

    const {data} = await axios.put(
      "https://linked-posts.routemisr.com/users/upload-photo",
      uploadFormData,
      {
        headers: {
          token: localStorage.getItem("token"),
        },
      }
    );
    return data
  }
  export default uploadImage