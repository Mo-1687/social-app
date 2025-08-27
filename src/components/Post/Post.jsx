import { useContext } from "react";
import { Link } from "react-router-dom";
import { FaRegComment } from "react-icons/fa";

import { UserContext } from "../../Context/UserContext";
import Comments from "../Comments/Comments";
import PostOptions from "../PostOptions/PostOptions";
import AddComment from "../AddComment/AddComment";

function Post({ post, isHome, refetch }) {
  const {
    _id,
    body,
    image,
    user: { name, photo, _id: userId } = {},
    createdAt,
    comments = [],
  } = post || {};

  const { userData } = useContext(UserContext);
  const isOwnPost = userData?._id === userId;

  // ✅ Fallback photo handler
  function getValidPhoto(photo) {
    if (!photo || photo.endsWith("undefined")) {
      return "https://i.pravatar.cc/100"; // random avatar
    }
    return photo;
  }

  // ✅ Cleaner date format
  function getDate(date) {
    return new Date(date).toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  }

  return (
    <>
      {post && (
        <div className="bg-background shadow-xl backdrop-blur-md hover:shadow-2xl transition-all duration-500 animate-fade-in p-8 rounded-2xl border border-border/40 group">
          {/* Header */}
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center space-x-4 hover:opacity-90 transition-opacity group">
              <img
                src={getValidPhoto(photo)}
                alt={name || "User"}
                className="w-12 h-12 rounded-full object-cover ring-2 ring-primary/20 group-hover:ring-primary/40 transition-all duration-300"
              />
              <div>
                <p className="font-semibold text-foreground group-hover:text-primary transition-colors duration-300">
                  {name || "User"}
                </p>
                <p className="text-xs text-muted-foreground">
                  {getDate(createdAt)}
                </p>
              </div>
            </div>
            {isOwnPost && (
              <PostOptions
                postId={_id}
                body={body}
                postImage={image}
                refetch={refetch}
              />
            )}
          </div>

          {/* Content */}
          <Link to={`/postdetails/${_id}`} className="block">
            <p className="text-foreground/90 mb-6 leading-relaxed text-base">
              {body || (
                <span className="italic text-muted-foreground">No caption</span>
              )}
            </p>

            {image && (
              <div className="mb-6 rounded-2xl overflow-hidden shadow-md relative group/image">
                <img
                  src={image}
                  alt="Post content"
                  loading="lazy"
                  className="w-full h-72 object-cover group-hover/image:scale-105 transition-transform duration-700 animate-fade-in"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover/image:opacity-100 transition-opacity duration-300"></div>
              </div>
            )}
          </Link>

          {/* Actions */}
          {isHome && (
            <div className="border-t border-border/40 mt-4">
              <Link
                to={`/postdetails/${_id}`}
                className="flex items-center space-x-3 text-muted-foreground hover:text-comment group transition-all duration-300 px-4 py-2 rounded-lg hover:bg-comment/5"
              >
                <FaRegComment size={20} />
                <span className="text-sm font-semibold">
                  {`${comments.length} Comment${
                    comments.length !== 1 ? "s" : ""
                  }`}
                </span>
              </Link>
            </div>
          )}

          {/* Comments Preview (Home: 1 only / Details: all) */}
          {isHome ? (
            <Comments comments={comments.slice(0, 1)} isHome={true} />
          ) : (
            <Comments comments={comments} />
          )}
          <AddComment postId={_id} refetch={refetch} />
        </div>
      )}
    </>
  );
}

export default Post;
