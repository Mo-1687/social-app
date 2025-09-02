import { useParams } from "react-router-dom";
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import Comments from "../../components/Comments/Comments";
import AddComment from "../../components/AddComment/AddComment";
import { useQuery } from "@tanstack/react-query";
import Swal from "sweetalert2";
import getPostDetails from "../../API/postApi/PostDetailsApi/DetalisApi";
import NotFound from "../NotFound/NotFound";
import Post from "../../components/Post/Post";

function PostDetails() {
  const { id } = useParams();

  const { data, isLoading, isError, error, refetch } = useQuery({
    queryKey: ["post", id],
    queryFn: () => getPostDetails(id),
    retry: 3,
    retryDelay: 3000,
  });

  if (isError) {
    Swal.fire({
      title: "Error",
      text: error?.response?.data?.error,
      icon: "error",
      confirmButtonText: "OK",
      background: "var(--color-card)",
      color: "var(--color-card-foreground)",
      customClass: {
        popup: "card-enhanced",
      },
    });
  }

  const post = data?.data?.post;

  // Loading State
  if (isLoading) {
    return (
      <div className="container-responsive py-6">
        <div className="flex items-center justify-center min-h-[400px]">
          <div className="card-enhanced p-8 rounded-2xl text-center animate-fade-in">
            <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-gradient-primary flex items-center justify-center animate-pulse-glow">
              <AiOutlineLoading3Quarters className="text-white text-2xl animate-spin" />
            </div>
            <p className="text-muted-foreground font-medium">
              Loading post details...
            </p>
          </div>
        </div>
      </div>
    );
  }
  // Wrong Id
  if (!data) {
    return <NotFound />;
  }

  return (
    <div className="container-responsive py-6 space-y-6">
      {/* Post Content */}
      {post && (
        <div className="animate-fade-in">
          <Post post={post} isHome={false} refetch={refetch} />
        </div>
      )}

      {/* Add Comment Section */}
      <div className="animate-fade-in" style={{ animationDelay: "100ms" }}>
        <AddComment postId={post?._id} refetch={refetch} />
      </div>

      {/* Comments Section */}
      <div className="animate-fade-in" style={{ animationDelay: "200ms" }}>
        {post && post.comments && post.comments.length > 0 ? (
          <div className="card-enhanced p-6 rounded-2xl">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-8 h-8 rounded-full bg-gradient-primary flex items-center justify-center">
                <span className="text-white text-2xl font-bold">💬</span>
              </div>
              <h2 className="text-xl font-bold text-foreground">
                Comments ({post.comments.length})
              </h2>
            </div>
            <Comments comments={post.comments} refetch={refetch} />
          </div>
        ) : (
          <div className="card-enhanced p-8 text-center rounded-2xl animate-fade-in">
            <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-gradient-secondary flex items-center justify-center">
              <span className="text-2xl">💭</span>
            </div>
            <h3 className="text-lg font-semibold text-foreground mb-2">
              No comments yet
            </h3>
            <p className="text-muted-foreground">
              Be the first to share your thoughts on this post!
            </p>
          </div>
        )}
      </div>
    </div>
  );
}

export default PostDetails;
