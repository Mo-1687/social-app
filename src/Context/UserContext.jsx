import axios from "axios";
import { createContext, useEffect, useState } from "react";

export const UserContext = createContext({});

export default function UserContextProvider({ children }) {
  const [userData, setUserData] = useState(null);

  const [theme, setTheme] = useState(localStorage.getItem("theme") || "light");

  

  async function getUserData() {

    try {
      const {data} = await axios.get("https://linked-posts.routemisr.com/users/profile-data", {
        headers: {
          token: localStorage.getItem("token"),
        }
      })
      setUserData(data.user);
    } catch (error) {
      console.log(error);
      
    }
  }

  useEffect(() => {
    if(localStorage.getItem("token")){
      getUserData();
    }
  }, [])

  return (
    <UserContext.Provider value={{ userData, setUserData, getUserData, theme, setTheme }}>
      <div data-theme={theme}>
        {children}
      </div>
    </UserContext.Provider>
  );
}
