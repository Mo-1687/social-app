import axios from "axios";
import Swal from "sweetalert2";

import { FaEllipsis } from "react-icons/fa6";
import { FaRegEdit, FaRegTrashAlt } from "react-icons/fa";
import AddPost from "../AddPost/AddPost";
import { useMutation } from "@tanstack/react-query";

function PostOptions({ postId, body, refetch }) {
  const { mutate } = useMutation({
    mutationFn: () => deletePost(),
    onSuccess: (data) => {
      Swal.fire({
        title: "Success",
        text: data.data.message,
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
      }, 2000);
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

  async function deletePost() {
    return await axios.delete(
      `https://linked-posts.routemisr.com/posts/${postId}`,
      {
        headers: {
          token: localStorage.getItem("token"),
        },
      }
    );
  }

  const handleEditClick = () => {
    const modal = document.getElementById(`edit_modal_${postId}`);
    if (modal) {
      modal.showModal();

      // Fix aria-hidden issue by ensuring modal content is accessible
      setTimeout(() => {
        const modalBox = modal.querySelector(".modal-box");
        if (modalBox) {
          modalBox.removeAttribute("aria-hidden");
          // Focus the first focusable element
          const firstInput = modalBox.querySelector("textarea, input, button");
          if (firstInput) {
            firstInput.focus();
          }
        }
      }, 100);
    }
  };

  return (
    <>
      <div className="dropdown dropdown-end">
        <button
          tabIndex={0}
          className="cursor-pointer rounded-full p-2 hover:bg-primary/20 hover:text-primary transition-all duration-300 interactive-hover"
          aria-label="Post options menu"
        >
          <FaEllipsis size={16} />
        </button>
        <ul
          tabIndex={0}
          className="dropdown-content menu  backdrop-blur-3xl glass-effect border border-border/50 rounded-xl z-50 w-52 p-2 shadow-elegant"
          role="menu"
        >
          <li role="menuitem">
            <button
              className="flex items-center gap-3 w-full px-4 py-3 text-left hover:bg-primary/10 hover:text-primary rounded-lg transition-all duration-300 font-medium"
              onClick={handleEditClick}
              aria-label={`Edit post ${postId}`}
            >
              <FaRegEdit size={16} />
              Edit Post
            </button>
          </li>
          <li role="menuitem">
            <button
              className="flex items-center gap-3 w-full px-4 py-3 text-left hover:bg-destructive/10 hover:text-destructive rounded-lg transition-all duration-300 font-medium"
              onClick={() => mutate()}
              aria-label={`Delete post ${postId}`}
            >
              <FaRegTrashAlt size={16} />
              Delete Post
            </button>
          </li>
        </ul>
      </div>

      <dialog
        id={`edit_modal_${postId}`}
        className="modal "
        aria-labelledby={`edit_modal_title_${postId}`}
        aria-describedby={`edit_modal_desc_${postId}`}
      >
        <div className="modal-box card-enhanced glass-effect ">
          <div className="flex items-center justify-between mb-6">
            <h2
              id={`edit_modal_title_${postId}`}
              className="text-2xl font-bold text-foreground"
            >
              ✏️ Edit Post
            </h2>
            <div className="w-8 h-8 rounded-full bg-gradient-primary flex items-center justify-center">
              <span className="text-white text-sm">📝</span>
            </div>
          </div>

          <div id={`edit_modal_desc_${postId}`} className="sr-only">
            Modal to edit your post content
          </div>

          <AddPost
            type={"update"}
            postId={postId}
            body={body}
            refetch={refetch}
          />

          <form method="dialog" className="mt-6">
            <button
              className="w-full py-3 px-6 bg-muted text-muted-foreground rounded-xl font-medium hover:bg-muted/80 transition-all duration-300 interactive-hover"
              aria-label="Close edit modal"
            >
              Close
            </button>
          </form>
        </div>

        {/* Click outside to close */}
        <form method="dialog" className="modal-backdrop">
          <button aria-label="Close modal by clicking backdrop">close</button>
        </form>
      </dialog>
    </>
  );
}

export default PostOptions;
