import React, { useContext } from "react";
import { CiCalendar } from "react-icons/ci";
import { UserContext } from "../../Context/UserContext";
import { useForm } from "react-hook-form";
import axios from "axios";
import Swal from "sweetalert2";
import { AiOutlineLoading3Quarters } from "react-icons/ai";

function EditProfile() {
  const { userData, getUserData } = useContext(UserContext);

  const date = new Date(userData?.createdAt).toLocaleString("en-US", {
    month: "long",
    year: "numeric",
    timeZone: "UTC",
  });

  const { register, formState: { isSubmitting } } = useForm();

  async function uploadImage(formData) {
    if (!formData.photo || !formData.photo[0]) return;

    try {
      const uploadFormData = new FormData();
      uploadFormData.append("photo", formData.photo[0]);

      const { data } = await axios.put(
        "https://linked-posts.routemisr.com/users/upload-photo",
        uploadFormData,
        {
          headers: {
            token: localStorage.getItem("token"),
          },
        }
      );

      if (data.message === "success") {
        getUserData();
        Swal.fire({
          title: "Success",
          text: "Profile photo updated!",
          icon: "success",
          confirmButtonText: "OK",
          background: 'var(--color-card)',
          color: 'var(--color-card-foreground)',
        });
      }
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Upload Failed",
        text: error.message,
        confirmButtonText: "OK",
        background: 'var(--color-card)',
        color: 'var(--color-card-foreground)',
      });
    }
  }

  const handleFileChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      const formData = { photo: e.target.files };
      uploadImage(formData);
    }
  };

  return (
    <div className="mx-auto mb-10 gradient-primary text-primary-foreground rounded-2xl shadow-lg p-6 relative overflow-hidden">
      {/* Edit Profile button */}
      <label
        htmlFor="edit-profile"
        className="absolute top-4 right-4 bg-black/60 backdrop-blur-md cursor-pointer hover:bg-black/80 px-4 py-1.5 rounded-lg text-sm font-medium shadow-md transition"
      >
        Edit Photo
        {isSubmitting && <AiOutlineLoading3Quarters className="animate-spin inline-block ml-2" />}
      </label>

      <input
        {...register("photo")}
        type="file"
        id="edit-profile"
        className="hidden"
        accept="image/*"
        onChange={handleFileChange}
      />

      {/* Avatar + Info */}
      <div className="flex items-center gap-4">
        <div className="relative">
          <img
            src={userData?.photo || "https://i.pravatar.cc/100"}
            alt="profile"
            className="w-20 h-20 object-cover rounded-full border-4 border-white shadow-md"
          />
          {isSubmitting && (
            <div className="absolute inset-0 flex items-center justify-center bg-black/40 rounded-full">
              <AiOutlineLoading3Quarters className="text-white text-2xl animate-spin" />
            </div>
          )}
        </div>

        <div>
          <h2 className="text-xl font-bold">{userData?.name || "User"}</h2>
          <p className="text-sm text-primary-foreground/80">{userData?.email || "user@example.com"}</p>
        </div>
      </div>

      {/* Joined Date */}
      <div className="flex items-center gap-2 mt-6 text-primary-foreground/90">
        <CiCalendar size={18} />
        <span className="text-sm">Joined {date}</span>
      </div>
    </div>
  );
}

export default EditProfile;