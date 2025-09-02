import axios from "axios";

async function getUserPosts(userId) {
  return await axios.get(
    `https://linked-posts.routemisr.com/users/${userId}/posts`,
    {
      headers: {
        token: localStorage.getItem("token"),
      },
    }
  );
}

export default getUserPosts