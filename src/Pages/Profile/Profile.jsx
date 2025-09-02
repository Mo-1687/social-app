import EditProfile from "../../components/EditProfile/EditProfile";
import { useQuery } from "@tanstack/react-query";
import Post from "../../components/Post/Post";
import Swal from "sweetalert2";
import AddPost from "../../components/AddPost/AddPost";
import { useContext } from "react";
import { UserContext } from "../../Context/UserContext";
import Skeleton from "../../components/Skeleton/Skeleton";
import getUserPosts from "../../API/Profile/ProfileApi";
import NotFound from "../NotFound/NotFound";

function Profile() {
  const { userData } = useContext(UserContext);
  const userId = userData?._id;

  // Get user posts
  const { data, isLoading, isError, error, refetch } = useQuery({
    queryFn: () => getUserPosts(userId),
    queryKey: ["user-posts", userId],
  });

  if (isError) {
    const errorMessage = error?.response?.data?.error || "Something went wrong";
    Swal.fire({
      title: "Error",
      text: errorMessage,
      icon: "error",
      confirmButtonText: "OK",
      background: "var(--color-card)",
      color: "var(--color-card-foreground)",
      customClass: {
        popup: "card-enhanced",
      },
    });
  }

  if (isLoading) {
    return (
      <div className="container-responsive py-6">
        <div className="space-y-6">
          {Array.from({
            length: data?.data?.posts.length > 5 ? data?.data?.posts.length : 5,
          }).map((_, index) => (
            <div
              key={index}
              className="animate-fade-in"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <Skeleton />
            </div>
          ))}
        </div>
      </div>
    );
  }

  // Not Auth
  if (!data) {
    return <NotFound />;
  }

  const posts = data?.data?.posts;
  const postsLength = posts?.length || "0";
  return (
    <div className="container-responsive py-6">
      {/* Profile Header Section */}
      <div className="mb-8 animate-fade-in">
        <EditProfile postsLength={postsLength} refetch={refetch} />
      </div>

      {/* Error State */}
      {isError ? (
        <div className="card-enhanced p-8 text-center animate-slide-up">
          <div className=" mx-auto">
            <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-gradient-accent flex items-center justify-center">
              <svg
                className="w-8 h-8 text-foreground"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z"
                />
              </svg>
            </div>

            <h3 className="text-xl font-semibold text-foreground mb-2">
              Oops! Something went wrong
            </h3>

            <p className="text-muted-foreground mb-6">
              {error?.response?.data?.error ||
                "We couldn't load the posts. Please try again."}
            </p>

            <button
              onClick={() => refetch()}
              className="gradient-primary mx-auto text-primary-foreground py-2.5 px-6 rounded-xl font-semibold shadow-lg transition-all duration-300 flex items-center gap-2 cursor-pointer min-w-[100px] justify-center btn-glow hover:shadow-xl active:scale-95"
            >
              <svg
                className="w-4 h-4 inline-block mr-2"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"
                />
              </svg>
              Try Again
            </button>
          </div>
        </div>
      ) : (
        <>
          {/* Posts Section */}
          <div className="space-y-6">
            {/* Create Post */}
            <div
              className="animate-fade-in"
              style={{ animationDelay: "100ms" }}
            >
              <AddPost refetch={refetch} type={"post"} />
            </div>

            {/* Posts List */}
            {posts?.length > 0 ? (
              <div className="space-y-6">
                {posts?.map((post, index) => (
                  <div
                    key={post._id}
                    className="animate-slide-up interactive-hover"
                    style={{ animationDelay: `${index * 50}ms` }}
                  >
                    <Post
                      key={post._id}
                      post={post}
                      isHome={true}
                      refetch={refetch}
                    />
                  </div>
                ))}
              </div>
            ) : (
              <div className="card-enhanced glass-effect p-12 text-center animate-fade-in">
                <div className="">
                  <div className="w-20 h-20 mx-auto mb-6 rounded-full bg-gradient-secondary flex items-center justify-center">
                    <svg
                      className="w-10 h-10 text-muted-foreground"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={1.5}
                        d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9.5a2 2 0 00-2-2h-2m-13-1V6a2 2 0 012-2h2.5"
                      />
                    </svg>
                  </div>

                  <h3 className="text-xl font-semibold text-foreground mb-2">
                    No posts yet
                  </h3>

                  <p className="text-muted-foreground mb-6">
                    Start sharing your thoughts and experiences with the
                    community!
                  </p>

                  <button
                    onClick={() =>
                      window.scrollTo({ top: 0, behavior: "smooth" })
                    }
                    className="btn-glow interactive-hover px-6 py-2 rounded-lg font-medium text-white bg-gradient-primary hover:shadow-lg transition-all duration-300"
                  >
                    Create First Post
                  </button>
                </div>
              </div>
            )}
          </div>
        </>
      )}
    </div>
  );
}

export default Profile;
