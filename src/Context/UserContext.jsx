import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { createContext, useEffect, useState } from "react";

export const UserContext = createContext({});

export default function UserContextProvider({ children }) {
  const [userData, setUserData] = useState(null);

  const [theme, setTheme] = useState(localStorage.getItem("theme") || "light");

  const { data, refetch } = useQuery({
    queryFn: () => {
      const token = localStorage.getItem("token");
      if (!token) {
        return null;
      }else{
        return getUserData()
      }
    },
    queryKey: ["user-data"],
    enabled: !!localStorage.getItem("token"),
  });

  function handleThemeChange(){
    const newTheme = theme === "light" ? "dark" : "light"
    setTheme(newTheme)
    localStorage.setItem("theme", newTheme)
  }
  async function getUserData() {
    return await axios.get(
      "https://linked-posts.routemisr.com/users/profile-data",
      {
        headers: {
          token: localStorage.getItem("token"),
        },
      }
    );
  }

  

  useEffect(() => {
    if (data) {
      setUserData(data.data.user);
    }
  }, [data]);

  return (
    <UserContext.Provider value={{ userData, setUserData, refetch, theme, setTheme, handleThemeChange }}>
      <div data-theme={theme}>{children}</div>
    </UserContext.Provider>
  );
}
