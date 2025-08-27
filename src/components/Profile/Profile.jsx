import EditProfile from "../EditProfile/EditProfile";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import Post from "../Post/Post";
import Swal from "sweetalert2";
import AddPost from "../AddPost/AddPost";
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import { useContext } from "react";
import { UserContext } from "../../Context/UserContext";
import Skeleton from "../Skeleton/Skeleton";
import { Helmet } from "react-helmet";

function Profile() {
  const postsPerPage = 30;

  const { userData } = useContext(UserContext);
  // Get user posts
  const { data, isLoading, isError, error, refetch } = useQuery({
    queryFn: getUserPosts,
    queryKey: ["user-posts", userData?._id],
  });

  if (isError) {
    Swal.fire({
      title: "Error",
      text: error.response.data.error,
      icon: "error",
      confirmButtonText: "OK",
    });
  }

  if (isLoading) {
    return (
      <div className="flex items-center justify-center flex-col w-full h-full gap-10">
        {Array.from({ length: data?.data?.posts.length > 5 ? data?.data?.posts.length : 5 }).map((_, index) => (
          <Skeleton key={index} />
        ))}
      </div>
    );
  }
  async function getUserPosts() {
    return await axios.get(
      `https://linked-posts.routemisr.com/users/${userData?._id}/posts?limit=${postsPerPage}`,
      {
        headers: {
          token: localStorage.getItem("token"),
        },
      }
    );
  }

  return (
    <>
    <Helmet>
      <title>Profile</title>
    </Helmet>
      <EditProfile />

      <div className="space-y-6 mb-8">
        <AddPost refetch={refetch} type={"post"} />
        {data?.data?.posts.length > 0 ? (
          data?.data?.posts.map((post) => (
            <Post key={post._id} post={post} isHome={true} refetch={refetch} />
          ))
        ) : (
          <h1 className="my-5 text-xl font-bold">No Posts</h1>
        )}
      </div>
    </>
  );
}

export default Profile;
