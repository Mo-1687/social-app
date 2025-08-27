import { useEffect, useState } from "react";
import Post from "../Post/Post";
import axios from "axios";
import AddPost from "../AddPost/AddPost";
import { useQuery } from "@tanstack/react-query";
import Pagination from "../Pagination/Pagination";
import Skeleton from "../Skeleton/Skeleton";
import { Helmet } from "react-helmet";

function Home() {
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPosts, setTotalPosts] = useState(0);
  const postsPerPage = 30;

  async function getAllPosts() {
    return await axios.get(
      `https://linked-posts.routemisr.com/posts?limit=${postsPerPage}&sort=-createdAt&page=${currentPage}`,
      {
        headers: {
          token: localStorage.getItem("token"),
        },
      }
    );
  }

  const { data, isError, error, isLoading, refetch } = useQuery({
    queryFn: getAllPosts,
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
    <div>
      <Helmet>
        <title>Home</title>
      </Helmet>
      {/* Create Post */}
      <AddPost type="post" refetch={refetch} />

      {/* Error State */}
      {isError && (
        <div className="text-center py-8">
          <p className="text-red-500 mb-4">
            {error?.response?.data?.error || "Something went wrong"}
          </p>
          <button
            onClick={() => refetch()}
            className="btn bg-gradient-to-r from-[#e47bf9] to-[#8236ed] text-white"
          >
            Retry
          </button>
        </div>
      )}

      {/* Loading or Posts */}
      <div className="space-y-6 mb-8">
        {isLoading ? (
          Array.from({ length: 5 }).map((_, i) => <Skeleton key={i} />)
        ) : postList.length > 0 ? (
          postList.map((post) => (
            <Post key={post._id} post={post} isHome={true} refetch={refetch} />
          ))
        ) : (
          <div className="text-center py-8 text-gray-400">
            <p>No posts available</p>
          </div>
        )}
      </div>

      {/* Pagination */}
      {!isLoading && (
        <Pagination
          setCurrentPage={setCurrentPage}
          totalPosts={totalPosts}
          currentPage={currentPage}
          isLoading={isLoading}
          postsPerPage={postsPerPage}
        />
      )}
    </div>
  );
}

export default Home;
