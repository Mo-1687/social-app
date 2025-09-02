import axios from "axios";

async function handleRegister(values) {
    const { data } = await axios.post(
      "https://linked-posts.routemisr.com/users/signup",
      values
    );

    return data
    
}

export default handleRegister