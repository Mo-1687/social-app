import axios from "axios";

async function getAllPosts(postsPerPage, currentPage) {
  return await axios.get(
    `https://linked-posts.routemisr.com/posts?limit=${postsPerPage}&sort=-createdAt&page=${currentPage}`,
    {
      headers: {
        token: localStorage.getItem("token"),
      },
    }
  );
}

export default getAllPosts 
