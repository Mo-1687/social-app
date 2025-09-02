import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Layout from "./Pages/Layout/MainLayout/Layout";
import Profile from "./Pages/Profile/Profile";
import Home from "./Pages/Home/Home";
import Login from "./Pages/Login/Login";
import Registration from "./Pages/Registration/Registration";
import NotFound from "./Pages/NotFound/NotFound";
import ProtectRoute from "./components/ProtectRoute/ProtectRoute";
import PostDetails from "./Pages/PostDetails/PostDetails";
import UserContextProvider from "./Context/UserContext";
import EditProfile from "./components/EditProfile/EditProfile";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import Auth from "./Pages/Layout/Auth/Auth";

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
    {
      path: "/auth",
      element: <Auth />,
      children: [
        { path: "login", element: <Login /> },
        { path: "signup", element: <Registration /> },
      ],
    },

    { path: "*", element: <NotFound /> },
  ]);

  const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        retry: 3,
        retryDelay: 1000,
        gcTime: 5000,
        staleTime: 3000,
      },
    },
  });

  return (
    <>
      <QueryClientProvider client={queryClient}>
        <UserContextProvider>
          <RouterProvider router={route} />
        </UserContextProvider>
        <ReactQueryDevtools />
      </QueryClientProvider>
    </>
  );
}

export default App;
