import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Layout from "./components/Layout/Layout";
import Profile from "./components/Profile/Profile";
import Home from "./components/Home/Home";
import Login from "./components/Login/Login";
import Registration from "./components/Registration/Registration";
import NotFound from "./components/NotFound/NotFound";
import ProtectRoute from "./components/ProtectRoute/ProtectRoute";
import PostDetails from "./components/PostDetails/PostDetails";
import UserContextProvider from "./Context/UserContext";
import EditProfile from "./components/EditProfile/EditProfile";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { Offline } from "react-detect-offline";
import Swal from "sweetalert2";

function App() {
  const route = createBrowserRouter([
    {
      path: "/",
      element: (
        <ProtectRoute>
          <Layout />
        </ProtectRoute>
      ),
      children: [
        { index: true, element: <Home /> },
        { path: "profile", element: <Profile /> },
        { path: "editprofile", element: <EditProfile /> },
        { path: "postdetails/:id", element: <PostDetails /> },
      ],
    },
    { path: "/login", element: <Login /> },
    { path: "/signup", element: <Registration /> },
    { path: "*", element: <NotFound /> },
  ]);

  const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        retry: 3,
        retryDelay: 2000,
        gcTime: 5000,
        staleTime: 3000,
      },
    },
  });

  return (
    <>
      <QueryClientProvider client={queryClient}>
        <Offline>
          {Swal.fire({
            title: "Error",
            text: "You are offline",
            icon: "error",
            confirmButtonText: "OK",
            
          })}
        </Offline>
        <UserContextProvider>
          <RouterProvider router={route} />
        </UserContextProvider>
        <ReactQueryDevtools />
      </QueryClientProvider>
    </>
  );
}

export default App;
