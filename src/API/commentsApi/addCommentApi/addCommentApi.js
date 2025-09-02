import axios from "axios";

async function createComment(postId, comment) {
     return await axios.post(
       "https://linked-posts.routemisr.com/comments",
       {
         content: comment,
         post: postId,
       },
       {
         headers: {
           token: localStorage.getItem("token"),
         },
       }
     );
}
export default createComment