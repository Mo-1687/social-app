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
        <div
          tabIndex={0}
          role="button"
          className="cursor-pointer rounded-full py-1 px-2 hover:bg-[#B874FB] hover:text-white transition-all duration-200 m-1"
          aria-label="Post options menu"
        >
          <FaEllipsis />
        </div>
        <ul
          tabIndex={0}
          className="dropdown-content menu bg-base-100 rounded-box z-1 w-52 p-2 shadow-sm"
          role="menu"
        >
          <li role="menuitem">
            <button
              className="hover:bg-[#B874FB] hover:text-white rounded-xl"
              onClick={handleEditClick}
              aria-label={`Edit post ${postId}`}
            >
              <FaRegEdit />
              Edit
            </button>
          </li>
          <li role="menuitem">
            <button
              className="hover:bg-[#B874FB] hover:text-white text-red-600 rounded-xl"
              onClick={() => mutate()}
              aria-label={`Delete post ${postId}`}
            >
              <FaRegTrashAlt />
              Delete
            </button>
          </li>
        </ul>
      </div>

      <dialog
        id={`edit_modal_${postId}`}
        className="modal"
        aria-labelledby={`edit_modal_title_${postId}`}
        aria-describedby={`edit_modal_desc_${postId}`}
      >
        <div className="modal-box">
          <h2
            id={`edit_modal_title_${postId}`}
            className="font-bold text-lg mb-4"
          >
            Edit Post
          </h2>
          <div id={`edit_modal_desc_${postId}`} className="sr-only">
            Modal to edit your post content
          </div>

          <AddPost
            type={"update"}
            postId={postId}
            body={body}
            refetch={refetch}
          />

          <form method="dialog">
            <button className="btn mt-4" aria-label="Close edit modal">
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
