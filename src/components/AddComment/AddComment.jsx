import { useContext, useState } from "react";
import { LuSend } from "react-icons/lu";
import { UserContext } from "../../Context/UserContext";
import axios from "axios";
import { useMutation } from "@tanstack/react-query";
import Swal from "sweetalert2";

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
      return sendData();
    },
    mutationKey: ["comment", postId],
    onSuccess: () => {
      Swal.fire({
        title: "Success",
        text: data?.data?.message,
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

  async function sendData() {
    return await axios.post(
      "https://linked-posts.routemisr.com/comments",
      {
        content: comment,
        post: postId,
      },
      {
        headers: {
          token: localStorage.getItem("token"),
        },
      }
    );
  }

  const isDisabled = isPending || comment.length > 500 || comment.length === 0;
  return (
    <form onSubmit={(e) => sendComment(e)}>
      <div className="glass-effect border border-gray-800 shadow-xl rounded-xl p-2 my-3  w-full max-w-[40rem] mx-auto flex flex-col gap-3">
        <div className="flex items-start gap-3">
          {/* Avatar */}
          <img
            src={userData?.photo || "https://i.pravatar.cc/50"}
            alt="user"
            className="w-10 h-10 object-cover rounded-full border border-gray-700"
          />

          {/* Comment Input */}
          <textarea
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            placeholder="Write a comment..."
            className="flex-1 bg-background text-gray-200 placeholder-gray-400 rounded-lg border border-gray-700 p-3 resize-none focus:outline-none focus:ring-2 focus:ring-purple-500"
            rows={3}
          />
        </div>

        {/* Submit Button */}
        <div className="flex items-center gap-3 justify-end">
          <p>{comment.length}/500</p>
          <button
            type="submit"
            className={`flex items-center gap-2 px-4 py-2  rounded-lg bg-gradient-to-r from-purple-600 to-purple-700 text-white ${
              isDisabled
                ? "opacity-50 cursor-not-allowed"
                : "cursor-pointer hover:opacity-90 transition"
            }  font-medium `}
            disabled={isDisabled}
          >
            <LuSend size={16} />
            Comment
          </button>
        </div>
      </div>
    </form>
  );
}

export default AddComment;
