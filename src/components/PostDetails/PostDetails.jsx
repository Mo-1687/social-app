import axios from "axios";
import { useParams } from "react-router-dom";
import Post from "../Post/Post";
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import Comments from "../Comments/Comments";
import AddComment from "../AddComment/AddComment";
import { useQuery } from "@tanstack/react-query";
import Swal from "sweetalert2";
import { Helmet } from "react-helmet";

function PostDetails() {
  const { id } = useParams();

  async function getPostDetails() {
    return await axios.get(`https://linked-posts.routemisr.com/posts/${id}`, {
      headers: {
        token: localStorage.getItem("token"),
      },
    });
  }

  const { data, isLoading, isError, error, refetch } = useQuery({
    queryKey: ["post", id],
    queryFn: getPostDetails,
    retry: 3,
    retryDelay: 3000,
  });

  if (isError) {
    Swal.fire({
      title: "Error",
      text: error.response.data.error,
      icon: "error",
      confirmButtonText: "OK",
    });
  }

  const post = data?.data?.post;

  if (isLoading) {
    return (
      <div className="absolute top-1/2 left-1/2 transform  -translate-y-1/2">
        <AiOutlineLoading3Quarters
          className="loading loading-spinner w-20 h-20"
          size={40}
        />
      </div>
    );
  }

  return (
    <>
    {post && (
      <Helmet><title>Post: {post.body}</title></Helmet>
    )}
      {post && <Post post={post} isHome={false} />}
      <AddComment postId={post._id} refetch={refetch} />
      {post &&
      post.comments.length > 0 &&
      post.comments &&
      post.comments.length > 0 ? (
        <h1 className="my-5 text-xl font-bold">
          Comments: {post.comments.length}
        </h1>
      ) : (
        <h1 className="my-5 text-xl font-bold">No Comments</h1>
      )}

      {post && post.comments.length > 0 && post.comments && (
        <Comments comments={post.comments} refetch={refetch} />
      )}
    </>
  );
}

export default PostDetails;
