import axios from "axios";

async function updatePost(formData, postId) {
    return await axios.put(
        `https://linked-posts.routemisr.com/posts/${postId}`,
        formData,
        { headers: { token: localStorage.getItem("token") } }
      );
}
export default updatePost