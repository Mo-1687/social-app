import { useContext, useState } from "react";
import { LuSend } from "react-icons/lu";
import { UserContext } from "../../Context/UserContext";
import { useMutation } from "@tanstack/react-query";
import Swal from "sweetalert2";
import createComment from "../../API/commentsApi/addCommentApi/addCommentApi";
import Avatar from "../Avatar/Avatar";

function AddComment({ postId, refetch }) {
  const { userData } = useContext(UserContext);

  const [comment, setComment] = useState("");

  const {
    data,
    mutate: sendComment,
    isPending,
  } = useMutation({
    mutationFn: (e) => {
      e.preventDefault();
      return createComment(postId, comment);
    },
    mutationKey: ["comment", postId],
    onSuccess: () => {
      Swal.fire({
        title: "Success",
        text: data?.data?.message,
        icon: "success",
        confirmButtonText: "OK",
        background: "var(--color-card)",
        color: "var(--color-card-foreground)",
        customClass: {
          popup: "card-enhanced",
        },
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
        background: "var(--color-card)",
        color: "var(--color-card-foreground)",
        customClass: {
          popup: "card-enhanced",
        },
      });
    },
  });

  const isDisabled = isPending || comment.length > 500 || comment.length === 0;

  return (
    <form onSubmit={(e) => sendComment(e)} className="animate-fade-in group">
      <div className="card-enhanced glass-effect border border-border/30 shadow-elegant rounded-xl p-4 ">
        <div className="flex items-start gap-4">
          {/* Avatar */}
          <Avatar photo={userData?.photo} name={userData?.name} id={userData?._id} />

          {/* Comment Input */}
          <div className="flex-1 space-y-3">
            <textarea
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              placeholder="Write a comment..."
              className="w-full bg-card/50 text-foreground placeholder-muted-foreground rounded-xl border-2 border-border p-3 resize-none focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary transition-all duration-300"
              rows={3}
            />

            {/* Character Count & Submit Button */}
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span
                  className={`text-xs font-medium ${
                    comment.length > 450
                      ? "text-destructive"
                      : "text-muted-foreground"
                  }`}
                >
                  {comment.length}/500
                </span>
                {comment.length > 450 && (
                  <span className="text-xs text-destructive">
                    Character limit approaching!
                  </span>
                )}
              </div>

              <button
                type="submit"
                className={`flex items-center cursor-pointer gap-2 px-6 py-2.5 rounded-xl font-medium transition-all duration-300 ${
                  isDisabled
                    ? "opacity-50 cursor-not-allowed bg-muted text-muted-foreground"
                    : "gradient-primary text-primary-foreground shadow-lg hover:shadow-xl btn-glow interactive-hover"
                }`}
                disabled={isDisabled}
              >
                <LuSend size={16} />
                {isPending ? "Posting..." : "Comment"}
              </button>
            </div>
          </div>
        </div>
      </div>
    </form>
  );
}

export default AddComment;
