import React, { useContext, useRef } from "react";
import { CiCalendar } from "react-icons/ci";
import { UserContext } from "../../Context/UserContext";
import Swal from "sweetalert2";
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import Avatar from "../../assets/vecteezy_3d-cartoon-man-with-glasses-and-beard-illustration_51767450.png";
import { FaUserEdit } from "react-icons/fa";
import { BsCake2 } from "react-icons/bs";
import { IoShareOutline } from "react-icons/io5";
import { useMutation } from "@tanstack/react-query";
import uploadImage from "../../API/EditProfileApi/EditProfileApi";

function EditProfile({ postsLength, refetch: getUserPosts }) {
  const { userData, refetch } = useContext(UserContext);

  const photoRef = useRef(null);

  const date = new Date(userData?.createdAt).toLocaleString("en-US", {
    month: "long",
    year: "numeric",
    timeZone: "UTC",
  });

  const dateOfBirth = new Date(userData?.dateOfBirth).toLocaleString("en-US", {
    month: "long",
    year: "numeric",
    timeZone: "UTC",
  });

  const { isPending, mutate: updatePhoto } = useMutation({
    mutationFn: (formData) => uploadImage(formData),
    onSuccess: (data) => {
      refetch();
      getUserPosts();
      Swal.fire({
        title: "Success",
        text: data.message,
        icon: "success",
        confirmButtonText: "OK",
        background: "var(--color-card)",
        color: "var(--color-card-foreground)",
        customClass: {
          popup: "card-enhanced",
        },
      });
    },

    onError: (error) => {
      Swal.fire({
        icon: "error",
        title: "Upload Failed",
        text: error.message,
        confirmButtonText: "OK",
        background: "var(--color-card)",
        color: "var(--color-card-foreground)",
        customClass: {
          popup: "card-enhanced",
        },
      });
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

      <div className="flex justify-between ">
        {/* Avatar + Info */}
        <div className="flex items-center gap-6 relative z-10">
          <div className="relative">
            <div className="w-24 h-24 rounded-full p-1 gradient-primary shadow-elegant">
              <img
                src={userData?.photo || Avatar}
                alt="profile"
                className="w-full h-full object-cover rounded-full border-4 border-card shadow-md ring-4 ring-primary ring-offset-2 ring-offset-background flex-shrink-0 overflow-hidden gradient-primary   transition-all duration-300 group-hover:ring-primary-glow"
              />
            </div>
            {isPending && (
              <div className="absolute inset-0 flex items-center justify-center bg-background/80 backdrop-blur-sm rounded-full"></div>
            )}

            {/* Online Status Indicator */}
            <div className="absolute bottom-3 right-0 w-5 h-5 bg-accent rounded-full border-2 border-card shadow-lg animate-pulse-glow"></div>
          </div>

          <div className="flex-1">
            <h2 className="text-2xl font-bold text-foreground mb-2">
              {userData?.name || "User"}
            </h2>
            <p className="text-muted-foreground mb-3">
              {userData?.email || "user@example.com"}
            </p>
          </div>
        </div>

        {/* Edit Profile button */}
        <label
          htmlFor="edit-profile"
          className=" w-fit h-fit bg-card/80 backdrop-blur-md cursor-pointer hover:bg-card/90 px-4 py-2 rounded-xl text-sm font-medium   shadow-md transition-all duration-300 interactive-hover border border-border/30"
        >
          <span className="flex items-center cursor-pointer gap-2">
            <>
              {isPending ? (
                <AiOutlineLoading3Quarters className="animate-spin" size={16} />
              ) : (
                <>
                  <FaUserEdit /> Edit Photo
                </>
              )}
            </>
          </span>

          <input
            type="file"
            id="edit-profile"
            ref={photoRef}
            className="sr-only"
            onChange={handleFileChange}
          />
        </label>
      </div>

      {/* Profile Stats (Optional) */}
      <div className="mt-8 pt-6 border-t border-border/30 relative z-10">
        <div className="flex items-center justify-around gap-4">
          {/* Joined Date */}
          <div className="flex items-center gap-2 text-muted-foreground">
            <CiCalendar size={18} className="text-primary" />
            <span className="text-sm font-medium">Joined {date}</span>
          </div>

          <div className="flex items-center gap-2 text-muted-foreground">
            <BsCake2 size={18} className="text-primary" />
            <span className="text-sm font-medium">
              Birth Day: {dateOfBirth}
            </span>
          </div>

          <div className="flex items-center gap-2 text-muted-foreground">
            <IoShareOutline size={20} className="text-primary" />
            <span className="text-sm font-medium">Posts: {postsLength}</span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default EditProfile;
