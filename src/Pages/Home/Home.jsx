import { useEffect, useState } from "react";
import Post from "../../components/Post/Post";
import AddPost from "../../components/AddPost/AddPost";
import { useQuery } from "@tanstack/react-query";
import Pagination from "../../components/Pagination/Pagination";
import Skeleton from "../../components/Skeleton/Skeleton";
import getAllPosts from "../../API/HomeApi/HomeApi";

function Home() {
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPosts, setTotalPosts] = useState(0);
  const postsPerPage = 30;

  const { data, isError, error, isLoading, refetch } = useQuery({
    queryFn: (postsPerPage, currentPage) =>
      getAllPosts(postsPerPage, currentPage),
    queryKey: ["posts", currentPage],
    retry: 3,
    retryDelay: 3000,
  });

  const postList = data?.data?.posts || [];

  useEffect(() => {
    if (data?.data?.paginationInfo?.total) {
      setTotalPosts(data.data.paginationInfo.total);
    }
  }, [data]);

  return (
    <div className="min-h-screen  container-responsive bg-gradient-subtle py-6 space-y-8 ">
      {/* Header  */}
      {/* Header */}
      <div className="flex flex-col mb-8 sm:mb-10 lg:mb-12 text-center px-4 sm:px-0">
        <div className="relative">
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold gradient-text mb-4 sm:mb-6 tracking-tight">
            Your Feed
          </h1>
          <div className="absolute -top-1 -left-1 sm:-top-2 sm:-left-2 w-8 h-8 sm:w-12 sm:h-12 bg-primary/20 rounded-full blur-xl"></div>
          <div className="absolute -top-2 -right-2 sm:-top-4 sm:-right-4 w-6 h-6 sm:w-8 sm:h-8 bg-accent/30 rounded-full blur-lg"></div>
        </div>
        <p className="text-muted-foreground text-base font-bold sm:text-lg lg:text-2xl leading-relaxed">
          Discover what's happening in your network
        </p>
      </div>

      {/* Create Post Section */}
      <AddPost type="post" refetch={refetch} className="animate-fade-in" />

      {/* Error State */}
      {isError && (
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
      )}

      {/* Posts Content */}
      {isLoading
        ? // Loading Skeletons
          Array.from({ length: 5 }).map((_, i) => (
            <Skeleton
              key={i}
              className="animate-fade-in"
              style={{ animationDelay: `${i * 100}ms` }}
            />
          ))
        : postList.length > 0 &&
          // Posts List
          postList.map((post) => (
            <Post key={post._id} post={post} isHome={true} refetch={refetch} />
          ))}

      {/* Pagination */}
      {!isLoading && postList.length > 0 && (
        <Pagination
          setCurrentPage={setCurrentPage}
          totalPosts={totalPosts}
          currentPage={currentPage}
          isLoading={isLoading}
          postsPerPage={postsPerPage}
          className="animate-fade-in"
        />
      )}

      {/* Loading Overlay for Page Changes */}
      {isLoading && currentPage > 1 && (
        <div className="fixed inset-0 bg-background/50 backdrop-blur-sm flex items-center justify-center z-50">
          <div className="card-enhanced p-6 flex items-center space-x-3">
            <div className="animate-pulse-glow w-8 h-8 rounded-full bg-gradient-primary flex items-center justify-center">
              <svg
                className="w-4 h-4 text-white animate-spin"
                fill="none"
                viewBox="0 0 24 24"
              >
                <circle
                  className="opacity-25"
                  cx="12"
                  cy="12"
                  r="10"
                  stroke="currentColor"
                  strokeWidth="4"
                />
                <path
                  className="opacity-75"
                  fill="currentColor"
                  d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                />
              </svg>
            </div>
            <span className="text-foreground font-medium">
              Loading posts...
            </span>
          </div>
        </div>
      )}
    </div>
  );
}

export default Home;
