import { zodResolver } from "@hookform/resolvers/zod";
import axios from "axios";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import z from "zod";
import Swal from "sweetalert2";
import { FaEnvelope, FaLock } from "react-icons/fa";
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import { useContext } from "react";
import { UserContext } from "../../Context/UserContext";

function Login() {
  const navigate = useNavigate();
  const { getUserData } = useContext(UserContext);

  const schema = z.object({
    email: z.string().email("Invalid email address"),
    password: z
      .string()
      .regex(
        /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/,
        "Password must be at least 8 characters long and contain at least one uppercase letter, one lowercase letter, one number, and one special character"
      ),
  });

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting, touchedFields },
  } = useForm({
    defaultValues: {
      email: "",
      password: "",
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

  async function handleLogin(values) {
    try {
      const { data } = await axios.post(
        "https://linked-posts.routemisr.com/users/signin",
        values
      );
      if (data.message === "success") {
        showAlert(data.message, "Success", "success");
        localStorage.setItem("token", data.token);
        getUserData(); // Assuming getUserData is defined in UserContext
        setTimeout(() => {
          navigate("/");
        }, 2000);
        
      }
    } catch (error) {
      const errorMessage = error.response?.data?.error || "Login failed";
      showAlert(errorMessage, "Error", "error");
    }
  }

  const formInputs = [
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
  ];

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-purple-600 via-purple-700 to-pink-500 px-4">
      <form
        onSubmit={handleSubmit(handleLogin)}
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

        {/* Button */}
        <button
          className="w-full py-3 flex items-center justify-center gap-2 bg-gradient-to-r from-purple-600 to-pink-500 text-white font-semibold rounded-lg shadow-lg hover:opacity-90 transition-all cursor-pointer duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
          type="submit"
          disabled={isSubmitting}
        >
          {isSubmitting ? (
            <>
              <AiOutlineLoading3Quarters className="w-5 h-5 animate-spin" />
              Login...
            </>
          ) : (
            "Login"
          )}
        </button>

        {/* Footer */}
        <p className="text-sm text-center text-gray-400">
          Don't have an account?{" "}
          <Link to={"/signup"} className="text-purple-400 hover:underline">
            Sign up
          </Link>
        </p>
      </form>
    </div>
  );
}

export default Login;
