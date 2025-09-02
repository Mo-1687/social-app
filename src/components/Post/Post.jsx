import { useContext } from "react";
import { Link } from "react-router-dom";
import { FaRegComment } from "react-icons/fa";

import { UserContext } from "../../Context/UserContext";
import Comments from "../Comments/Comments";
import PostOptions from "../PostOptions/PostOptions";
import Avatar from "../Avatar/Avatar";
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

  //   date format
  function getDate(date) {
    return new Date(date).toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  }

  // New Posts
  function isNewPost() {
    if (new Date() - new Date(createdAt) < 24 * 60 * 60 * 1000) {
      return true;
    } else {
      return false;
    }
  }

  return (
    <>
      {post && (
        <article className="card-enhanced bg-post-bg glass-effect interactive-hover animate-fade-in p-6 rounded-2xl border border-border/30 group relative overflow-hidden">
          {/* Decorative Background Elements */}
          <div className="absolute inset-0 bg-gradient-primary/2 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>

          {/* Header */}
          <header className="flex items-center justify-between mb-6 relative z-10">
            <div className="flex items-center space-x-4 ">
              <Avatar photo={photo} name={name} id={userId} />

              <div className="min-w-0 flex-1">
                <h3 className="font-semibold text-foreground  transition-all duration-300 truncate text-lg">
                  {name || "Anonymous User"}
                </h3>
                <time className="text-xs text-muted-foreground font-medium bg-muted/50 px-2 py-1 rounded-full">
                  {getDate(createdAt)}
                </time>
              </div>
            </div>

            {isOwnPost && (
              <div className=" transition-all duration-300 transform group-hover:scale-105">
                <PostOptions
                  postId={_id}
                  body={body}
                  postImage={image}
                  refetch={refetch}
                />
              </div>
            )}
          </header>

          {/* Content */}
          <Link
            to={`/postdetails/${_id}`}
            className="block group/content relative "
          >
            {/* Post Text */}
            {body ? (
              <div className="mb-6">
                <p className="text-foreground/90 leading-relaxed text-base group-hover/content:text-foreground transition-all duration-300 group-hover/content:font-medium">
                  {body}
                </p>
              </div>
            ) : (
              <div className="mb-6 p-6 rounded-xl bg-muted/30 border-2 border-dashed border-muted-foreground/20 text-center">
                <div className="w-12 h-12 mx-auto mb-3 rounded-full bg-muted/50 flex items-center justify-center">
                  <span className="text-2xl">💭</span>
                </div>
                <p className="italic text-muted-foreground font-medium">
                  No caption provided
                </p>
              </div>
            )}

            {/* Post Image */}
            {image && (
              <div className="mb-6 rounded-xl overflow-hidden shadow-card  group/image bg-muted/20">
                <img
                  src={image}
                  alt="Post content"
                  loading="lazy"
                  className="w-full  object-cover group-hover/image:scale-105 transition-transform duration-700 "
                />
              </div>
            )}
          </Link>

          {/* Actions Bar */}
          {isHome && (
            <div className="border-t border-border/30 pt-4 -mb-2 relative ">
              <Link
                to={`/postdetails/${_id}`}
                className=" inline-flex items-center space-x-3 text-muted-foreground hover:text-comment group/action transition-all duration-500 px-4 py-3 rounded-xl hover:bg-comment/10 w-full interactive-hover"
              >
                <FaRegComment
                  size={18}
                  className="group-hover/action:scale-105 transition-transform duration-500"
                />

                <span className="text-sm font-semibold group-hover/action:font-bold transition-all duration-300">
                  {comments.length === 0
                    ? "Be the first to comment"
                    : `${comments.length} Comment${
                        comments.length !== 1 ? "s" : ""
                      }`}
                </span>

                <svg
                  className="w-4 h-4 ml-auto opacity-0 group-hover/action:opacity-100 group-hover/action:translate-x-1 transition-all duration-300"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 5l7 7-7 7"
                  />
                </svg>
              </Link>
            </div>
          )}

          {/* Comments Section */}
          {isHome && (
            <div className="mt-4 relative z-10">
              <Comments comments={comments} isHome={true} />
            </div>
          )}

          {/* Decorative Elements */}
          <div className="absolute top-0 left-0 w-full h-1 bg-gradient-primary opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>

          {/* Engagement Indicator */}
          {comments.length > 10 && (
            <div className="absolute top-4 right-4 px-3 py-1.5 bg-gradient-accent text-foreground text-sm rounded-full font-bold shadow-elegant animate-pulse-glow z-20">
              🔥 Hot Post
            </div>
          )}

          {/* New Post Indicator */}
          {isNewPost() && (
            <div className="absolute top-2 right-4 px-3 py-1.5 bg-gradient-secondary text-foreground text-xs rounded-full font-bold shadow-elegant z-20">
              ✨ New
            </div>
          )}
        </article>
      )}
    </>
  );
}

export default Post;
