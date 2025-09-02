import { useContext, useRef } from "react";
import { MdOutlineAddPhotoAlternate } from "react-icons/md";
import { UserContext } from "../../Context/UserContext";
import { useForm } from "react-hook-form";
import { useMutation } from "@tanstack/react-query";
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import createPostApi from "../../API/postApi/createPostApi/createPostApi";
import updatePost from "../../API/postApi/updatePostApi/updatePostApi";
import Avatar from "../Avatar/Avatar";
import Alert from "../Alert/Alert";

function AddPost({ type, postId, refetch }) {
  const { userData } = useContext(UserContext);

  const inputFile = useRef(null);
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const { mutate: submitPost, isPending } = useMutation({
    mutationFn: (formData) => requestType(formData),
    onSuccess: (data) => {
      reset();
      if (inputFile.current.files[0]) {
        inputFile.current.value = "";
      }
      const message = data?.data?.message;
      Alert("Success", message, "success");

      setTimeout(() => {
        refetch();
      }, 2000);
    },
    onError: (error) => {
      const message = error.response?.data?.error;
      Alert("Error", message, "error");
    },
  });

  async function requestType(formData) {
    if (type === "post") {
      return createPostApi(formData);
    } else {
      return updatePost(formData, postId);
    }
  }

  function handlePost(values) {
    if (!values.body?.trim()) return;

    const formData = new FormData();
    if (inputFile.current.files[0]) {
      formData.append("image", inputFile.current.files[0]);
    }
    formData.append("body", values.body);
    submitPost(formData);
  }

  return (
    <div className="mb-8 bg-post-bg card-enhanced group glass-effect interactive-hover animate-fade-in p-6 rounded-2xl  border-2 border-border/30  overflow-hidden">
      <form onSubmit={handleSubmit(handlePost)}>
        {/* Avatar + Textarea */}
        <div className="flex mb-6 gap-4">
          <Avatar
            photo={userData?.photo}
            name={userData?.name}
            id={userData?._id}
          />

          <div className="flex-1">
            <textarea
              {...register("body", {
                required: "Please write something before posting",
                minLength: { value: 1, message: "Post cannot be empty" },
              })}
              className={`w-full p-6 text-sm border-2  border-accent-foreground  bg-card text-card-foreground rounded-xl resize-none placeholder-muted-foreground transition-all duration-300 ${
                errors.body
                  ? "border-destructive focus:border-destructive focus:ring-destructive"
                  : "  outline-none focus:outline-none focus:ring-1 focus:ring-purple-500"
              }`}
              placeholder="What's on your mind?"
              rows="4"
            />
            {errors.body && (
              <p className="text-destructive text-xs mt-1 animate-slide-up">
                {errors.body.message}
              </p>
            )}
          </div>
        </div>

        {/* Actions */}
        <div className="flex justify-between items-center">
          <div className="flex items-center gap-3">
            <label
              htmlFor="postImage"
              className="relative flex items-center px-4 py-2.5 rounded-xl cursor-pointer text-muted-foreground bg-muted hover:bg-hover-bg hover:text-primary transition-all duration-300 interactive-hover group"
            >
              <MdOutlineAddPhotoAlternate
                className="mr-2 group-hover:scale-110 transition-transform"
                size={20}
              />
              <span className="text-sm font-medium">Photo</span>
              <input
                type="file"
                ref={inputFile}
                name="postImage"
                id="postImage"
                accept="image/*"
                className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
              />
            </label>

            {inputFile.current?.files[0] && (
              <span className="text-xs text-primary animate-slide-up">
                Image selected: {inputFile.current.files[0].name}
              </span>
            )}
          </div>

          <button
            type="submit"
            disabled={isPending}
            className={`gradient-primary text-primary-foreground py-2.5 px-6 rounded-xl font-semibold shadow-lg transition-all duration-300 flex items-center gap-2 cursor-pointer min-w-[100px] justify-center ${
              isPending
                ? "opacity-70 cursor-not-allowed"
                : "btn-glow hover:shadow-xl active:scale-95"
            }`}
          >
            {isPending ? (
              <AiOutlineLoading3Quarters size={18} className="animate-spin" />
            ) : (
              <>
                {postId ? "Update" : "Post"}
                {!postId && <span className="ml-1">✨</span>}
              </>
            )}
          </button>
        </div>
      </form>
    </div>
  );
}

export default AddPost;
