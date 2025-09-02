import { useContext } from "react";
import { UserContext } from "../../Context/UserContext";
import { FaEllipsisH, FaRegTrashAlt } from "react-icons/fa";
import { useMutation } from "@tanstack/react-query";
import deleteComment from "../../API/commentsApi/addCommentApi/deleteComment";
import Avatar from "../Avatar/Avatar";
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import Alert from "../Alert/Alert";

function Comments({ comments, isHome, refetch }) {
  const { userData } = useContext(UserContext);

  const { mutate, isPending } = useMutation({
    mutationFn: (commentId) => deleteComment(commentId),
    onSuccess: (data) => {
      const message = data?.data?.message;
      Alert("Success", message, "success");
      
      setTimeout(() => {
        refetch();
      }, 1000);
    },

    onError: (error) => {
      const message = error.response.data.error;
      Alert("Error", message, "error");
    },
  });

  function getDate(date) {
    return new Date(date).toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  }

  const displayedComments = isHome ? comments.slice(0, 1) : comments;

  return (
    <div className="space-y-4">
      {displayedComments.length > 0 &&
        displayedComments.map((comment, index) => (
          <div
            key={comment._id}
            className="p-4 bg-card/50 rounded-xl backdrop-blur-sm border border-border/30 group animate-fade-in interactive-hover"
            style={{ animationDelay: `${index * 50}ms` }}
          >
            <div className="flex items-start gap-3">
              {/* User Avatar */}
              <Avatar
                photo={comment.commentCreator.photo}
                name={comment.commentCreator.name}
                id={comment.commentCreator._id}
              />

              {/* Comment Content */}
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 mb-2">
                  <span className="font-semibold text-foreground text-sm">
                    {comment.commentCreator.name}
                  </span>
                  <span className="text-xs text-muted-foreground bg-muted/50 px-2 py-1 rounded-full">
                    {getDate(comment.createdAt)}
                  </span>
                </div>
                <p className="text-sm text-foreground/90 leading-relaxed">
                  {comment.content}
                </p>
              </div>

              {/* Comment Actions */}
              {userData._id === comment.commentCreator._id && (
                <div className="relative flex-shrink-0">
                  <div className="dropdown dropdown-bottom  dropdown-end">
                    <button
                      tabIndex={0}
                      className="p-2 text-muted-foreground cursor-pointer hover:text-foreground hover:bg-muted/50 rounded-full transition-all duration-300 interactive-hover"
                    >
                      <FaEllipsisH size={14} />
                    </button>
                    <ul
                      tabIndex={0}
                      className="dropdown-content menu p-2 shadow-elegant bg-card/95 backdrop-blur-xl border border-border/50 rounded-xl min-w-[160px] z-50"
                    >
                      <li>
                        <button
                          className="flex items-center gap-2 text-destructive hover:bg-destructive/10 hover:text-destructive transition-all duration-300 cursor-pointer px-3 py-2 rounded-lg"
                          onClick={() => mutate(comment._id)}
                        >
                          {isPending ? (
                            <AiOutlineLoading3Quarters
                              className="animate-spin"
                              size={16}
                            />
                          ) : (
                            <FaRegTrashAlt size={14} />
                          )}
                          Delete
                        </button>
                      </li>
                    </ul>
                  </div>
                </div>
              )}
            </div>
          </div>
        ))}
    </div>
  );
}

export default Comments;
