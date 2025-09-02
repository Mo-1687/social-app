import React, { useContext, useRef } from "react";
import { CiCalendar } from "react-icons/ci";
import { UserContext } from "../../Context/UserContext";
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import { FaUserEdit } from "react-icons/fa";
import { BsCake2 } from "react-icons/bs";
import { IoShareOutline } from "react-icons/io5";
import { useMutation } from "@tanstack/react-query";
import uploadImage from "../../API/EditProfileApi/EditProfileApi";
import Avatar from "../Avatar/Avatar";
import Alert from "../Alert/Alert";

function EditProfile({ postsLength, refetch: getUserPosts }) {
  const { userData, refetch } = useContext(UserContext);

  const photoRef = useRef(null);

  function cleanDate(date) {
    return new Date(date).toLocaleString("en-US", {
      month: "short",
      year: "numeric",
      timeZone: "UTC",
    });
  }

  const { isPending, mutate: updatePhoto } = useMutation({
    mutationFn: (formData) => uploadImage(formData),
    onSuccess: (data) => {
      refetch();
      getUserPosts();
      const message = data?.message;
      Alert("Success", message, "success");
    },
    onError: (error) => {
      const message = error.response.data.error;
      Alert("Error", message, "error");
    },

  });

  const handleFileChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      const formData = { photo: e.target.files };
      updatePhoto(formData);
    }
  };

  return (
    <div className="card-enhanced glass-effect p-8 rounded-2xl shadow-elegant relative overflow-hidden animate-fade-in group">
      {/* Decorative Background */}
      <div className="absolute inset-0 bg-gradient-primary/5"></div>

      <div className=" relative  ">
        {/* Avatar + Info */}
        <div className="flex items-center gap-4 mt-8 md:mt-0 relative z-10">
          <div className="flex-shrink-0 w-15 h-15 ">
            <Avatar
              photo={userData?.photo}
              name={userData?.name}
              id={userData?._id}
              isPending={isPending}
            />
          </div>

          <div className="flex-1">
            <h2 className=" font-bold text-foreground ">
              {userData?.name || "User"}
            </h2>
            <p className="text-xs sm:text-sm text-muted-foreground mb-3">
              {userData?.email || "user@example.com"}
            </p>
          </div>
        </div>
      </div>

      {/* Edit Profile button */}
      <label
        htmlFor="edit-profile"
        className=" w-fit h-fit absolute top-3 md-top-3 right-3 bg-card/80 backdrop-blur-md cursor-pointer hover:bg-card/90 px-4 py-2 rounded-xl text-sm font-medium    shadow-sm transition-all duration-300 interactive-hover border border-border/30"
      >
        <span className="flex items-center cursor-pointer gap-2">
          {isPending ? (
            <AiOutlineLoading3Quarters className="animate-spin" size={16} />
          ) : (
            <>
              <FaUserEdit /> Edit Photo
            </>
          )}
        </span>

        <input
          type="file"
          id="edit-profile"
          ref={photoRef}
          className="sr-only"
          onChange={handleFileChange}
        />
      </label>

      {/* Profile Stats (Optional) */}
      <div className="mt-8 pt-6 border-t border-border/30 relative z-10">
        <div className="flex items-center text-[9px] sm:text-sm justify-between md:justify-around gap-2 md:gap-4">
          {/* Joined Date */}
          <div className="flex items-center gap-2 text-muted-foreground">
            <CiCalendar size={18} className="text-primary" />
            <span className="font-medium">
              Joined: {cleanDate(userData?.createdAt)}
            </span>
          </div>

          <div className="flex items-center gap-2 text-muted-foreground">
            <BsCake2 size={18} className="text-primary" />
            <span className="font-medium">
              Born in: {cleanDate(userData?.dateOfBirth)}
            </span>
          </div>

          <div className="flex items-center gap-2 text-muted-foreground">
            <IoShareOutline size={20} className="text-primary" />
            <span className="font-medium">Posts: {postsLength}</span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default EditProfile;
