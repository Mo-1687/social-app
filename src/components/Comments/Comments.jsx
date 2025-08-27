import { useContext } from "react";
import { UserContext } from "../../Context/UserContext";
import { FaEllipsisH, FaRegTrashAlt } from "react-icons/fa";
import axios from "axios";
import { useMutation } from "@tanstack/react-query";
import Swal from "sweetalert2";

function Comments({ comments, isHome, refetch }) {
  const { userData } = useContext(UserContext);
  function getDate(date) {
    return `${new Date(date).toLocaleDateString()} ${new Date(
      date
    ).toLocaleTimeString()}`;
  }

  const { mutate } = useMutation({
    mutationFn: (commentId) => deleteComment(commentId),
    onSuccess: (data) => {
      Swal.fire({
        title: "Success",
        text: data.data.message,
        icon: "success",
        confirmButtonText: "OK",
      });

      setTimeout(() => {
        refetch();
      }, 1000);
    },

    onError: (error) => {
      Swal.fire({
        title: "Error",
        text: error.response.data.error,
        icon: "error",
        confirmButtonText: "OK",
      });
    },
  });
  async function deleteComment(commentId) {
    return await axios.delete(
      `https://linked-posts.routemisr.com/comments/${commentId}`,
      {
        headers: {
          token: localStorage.getItem("token"),
        },
      }
    );
  }

  function isInvalidPhoto(photo) {
    if (photo.endsWith("undefined")) {
      return "https://i.pravatar.cc/100";
    } else {
      return photo;
    }
  }

  const displayedComments = isHome ? comments.slice(0, 1) : comments;

  return (
    <>
      {displayedComments.length > 0 &&
        displayedComments.map((comment) => (
          <div
            key={comment._id}
            className="mt-6 p-4 bg-background/50 rounded-xl backdrop-blur-sm border border-border/30"
          >
            <div className="flex items-start space-x-3">
              <img
                src={isInvalidPhoto(comment.commentCreator.photo)}
                alt={comment.commentCreator.name}
                className="w-8 h-8 rounded-full object-cove"
              />

              <div className="flex-1">
                <div className="flex items-center space-x-2 mb-1">
                  <span className="font-medium text-foreground text-sm">
                    {comment.commentCreator.name}
                  </span>
                  <span className="text-xs text-muted-foreground">
                    {getDate(comment.createdAt)}
                  </span>
                </div>
                <p className="text-sm text-foreground/80">{comment.content}</p>
              </div>
            </div>

            {userData._id === comment.commentCreator._id && (
              <div className="dropdown dropdown-bottom dropdown-end text-muted-foreground hover:text-foreground hover:bg-accent/80 rounded-full h-8 w-8 p-0">
                <div tabIndex={0} role="button" className="btn m-1">
                  <FaEllipsisH />
                </div>
                <ul
                  tabIndex={0}
                  className="w-48 bg-card/95 backdrop-blur-xl border-border/50 shadow-elegant"
                >
                  <li>
                    <button
                      className="text-destructive hover:bg-destructive/10 hover:text-destructive transition-colors cursor-pointer"
                      onClick={() => mutate(comment._id)}
                    >
                      <FaRegTrashAlt />
                      Delete
                    </button>
                  </li>
                </ul>
              </div>
            )}
          </div>
        ))}
    </>
  );
}

export default Comments;
