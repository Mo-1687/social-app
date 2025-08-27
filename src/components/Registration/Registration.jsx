import { zodResolver } from "@hookform/resolvers/zod";
import axios from "axios";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import z from "zod";
import Swal from "sweetalert2";
import { FaUser, FaEnvelope, FaLock, FaCalendarAlt } from "react-icons/fa";
import { AiOutlineLoading3Quarters } from "react-icons/ai";

function Registration() {
  const navigate = useNavigate();

  const schema = z
    .object({
      name: z
        .string()
        .min(2, "Name must be at least 2 characters long")
        .max(20, "Name must be between 2 and 20 characters"),
      email: z.string().email("Invalid email address"),
      password: z
        .string()
        .regex(
          /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/,
          "Password must be at least 8 characters long and contain at least one uppercase letter, one lowercase letter, one number, and one special character"
        ),
      rePassword: z
        .string()
        .regex(
          /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/,
          "Password must be at least 8 characters long and contain at least one uppercase letter, one lowercase letter, one number, and one special character"
        ),
      dateOfBirth: z
        .string()
        .regex(/^\d{4}-\d{2}-\d{2}$/, "Invalid date format")
        .refine((date) => {
          const inputDate = new Date(date);
          const minDate = new Date(1900, 0, 1);
          const today = new Date();
          return inputDate >= minDate && inputDate <= today;
        }, "Date must be between 1900 and today"),
      gender: z.enum(["male", "female"], {
        errorMap: () => ({ message: "Gender is required" }),
      }),
    })
    .refine((data) => data.password === data.rePassword, {
      path: ["confirmPassword"],
      message: "Passwords must match",
    });

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting, touchedFields },
  } = useForm({
    defaultValues: {
      name: "",
      email: "",
      password: "",
      rePassword: "",
      dateOfBirth: "",
      gender: "male",
    },
    resolver: zodResolver(schema),
    mode: "onBlur",
  });

  function showAlert(message, condition, icon) {
    return Swal.fire({
      title: condition,
      text: message,
      icon: icon,
      confirmButtonText: "OK",
    });
  }

  async function handleRegister(values) {
    try {
      const { data } = await axios.post(
        "https://linked-posts.routemisr.com/users/signup",
        values
      );
      if (data.message === "success") {
        showAlert(data.message, "Success", "success");
        setTimeout(() => {
          navigate("/login");
        }, 2000);
      }
    } catch (error) {
      console.log(error);

      const errorMessage = error.response?.data?.error || "Registration failed";
      showAlert(errorMessage, "Error", "error");
    }
  }

  const formInputs = [
    { type: "text", icon: <FaUser />, id: "name", label: "Enter your name" },
    {
      type: "email",
      icon: <FaEnvelope />,
      id: "email",
      label: "Enter your email",
    },
    {
      type: "password",
      icon: <FaLock />,
      id: "password",
      label: "Enter your password",
    },
    {
      type: "password",
      icon: <FaLock />,
      id: "rePassword",
      label: "Confirm your password",
    },
    {
      type: "date",
      icon: <FaCalendarAlt />,
      id: "dateOfBirth",
      label: "Enter your date of birth",
    },
  ];

  const genderOptions = [
    { value: "male", label: "Male" },
    { value: "female", label: "Female" },
  ];

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-purple-600 via-purple-700 to-pink-500 px-4">
      <form
        onSubmit={handleSubmit(handleRegister)}
        className="w-full max-w-md p-8 rounded-2xl bg-gradient-to-b from-gray-900 to-gray-800 shadow-2xl space-y-6"
      >
        {/* Header */}
        <div className="text-center">
          <div className="w-14 h-14 rounded-full bg-gradient-to-r from-blue-400 to-purple-400 mx-auto mb-4 shadow-lg"></div>
          <h2 className="text-2xl font-bold text-white">Join SocialHub</h2>
          <p className="text-sm text-gray-400 mt-1">
            Create your account and connect with others
          </p>
        </div>

        {/* Inputs */}
        {formInputs.map((input) => (
          <div key={input.id} className="space-y-1">
            <label
              htmlFor={input.id}
              className="block text-sm font-medium text-gray-200"
            >
              {input.label}
            </label>
            <div className="flex items-center border border-gray-700 rounded-lg bg-black/60 px-3 py-2 focus-within:ring-2 focus-within:ring-purple-500 transition-all">
              <span className="text-gray-400">{input.icon}</span>
              <input
                className="w-full bg-transparent border-none outline-none px-3 py-2 text-white placeholder-gray-400"
                type={input.type}
                id={input.id}
                placeholder={input.label}
                {...register(input.id)}
              />
            </div>
            {errors[input.id] && touchedFields[input.id] && (
              <p className="mt-1 text-xs text-red-400">
                {errors[input.id].message}
              </p>
            )}
          </div>
        ))}

        {/* Gender */}
        <div className="space-y-1">
          <label className="block text-sm font-medium text-gray-200">
            Gender
          </label>
          <div className="flex gap-3">
            {genderOptions.map((option) => (
              <div key={option.value} className="flex-1">
                <input
                  type="radio"
                  value={option.value}
                  id={option.value}
                  {...register("gender")}
                  className="hidden peer"
                />
                <label
                  htmlFor={option.value}
                  className="block py-2 text-center rounded-md border border-gray-600 cursor-pointer text-gray-200 hover:bg-purple-700 transition-all peer-checked:bg-purple-600 peer-checked:text-white"
                >
                  {option.label}
                </label>
              </div>
            ))}
          </div>
          {errors.gender && (
            <p className="mt-1 text-xs text-red-400">{errors.gender.message}</p>
          )}
        </div>

        {/* Button */}
        <button
          className="w-full py-3 flex cursor-pointer items-center justify-center gap-2 bg-gradient-to-r from-purple-600 to-pink-500 text-white font-semibold rounded-lg shadow-lg hover:opacity-90 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
          type="submit"
          disabled={isSubmitting}
        >
          {isSubmitting ? (
            <>
              <AiOutlineLoading3Quarters className="w-5 h-5 animate-spin" />
              Submitting...
            </>
          ) : (
            "Sign Up"
          )}
        </button>

        {/* Footer */}
        <p className="text-sm text-center text-gray-400">
          Already have an account?{" "}
          <Link to={"/login"} className="text-purple-400 hover:underline">
            Sign in
          </Link>
        </p>
      </form>
    </div>
  );
}

export default Registration;
