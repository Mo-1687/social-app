import axios from "axios";

async function deleteComment(commentId) {
    return await axios.delete(
      `https://linked-posts.routemisr.com/comments/${commentId}`,
      {
        headers: {
          token: localStorage.getItem("token"),
        },
      }
    );
  }
  
  export default deleteComment