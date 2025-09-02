import axios from "axios";

async function handleLogin(values) {
    const { data } = await axios.post(
      "https://linked-posts.routemisr.com/users/signin",
      values
    );
    return data;
  }
  export default handleLogin
