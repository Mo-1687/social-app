import axios from "axios";

async function createPostApi(formData) {
  return await axios.post(
    "https://linked-posts.routemisr.com/posts",
    formData,
    { headers: { token: localStorage.getItem("token") } }
  );
}

export default createPostApi
