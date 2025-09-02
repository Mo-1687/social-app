import axios from "axios";

async function getPostDetails(id) {
  return await axios.get(`https://linked-posts.routemisr.com/posts/${id}`, {
    headers: {
      token: localStorage.getItem("token"),
    },
  });
}

export default getPostDetails