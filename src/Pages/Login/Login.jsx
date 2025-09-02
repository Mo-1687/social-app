import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import z from "zod";
import Swal from "sweetalert2";
import { FaEnvelope, FaLock } from "react-icons/fa";
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import { useContext, useState } from "react";
import { UserContext } from "../../Context/UserContext";
import { useMutation } from "@tanstack/react-query";
import handleLogin from "../../API/LoginApi/LoginApi";
import { FaRegEye, FaRegEyeSlash } from "react-icons/fa";

function Login() {
  const navigate = useNavigate();
  const { refetch } = useContext(UserContext);
  const [isShown, setIsShown] = useState(false);

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
    formState: { errors, touchedFields },
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
      background: "var(--color-card)",
      color: "var(--color-card-foreground)",
      customClass: {
        popup: "card-enhanced",
      },
    });
  }

  const { mutate, isPending } = useMutation({
    mutationFn: (values) => handleLogin(values),
    mutationKey: ["login"],
    onSuccess: (data) => {
      showAlert(data.message, "Success", "success");
      localStorage.setItem("token", data.token);
      refetch();
      setTimeout(() => {
        navigate("/");
      }, 2000);
    },
    onError: (error) => {
      const errorMessage = error.response?.data?.error || "Login failed";
      showAlert(errorMessage, "Error", "error");
    },
  });

  const formInputs = [
    {
      type: "email",
      icon: <FaEnvelope />,
      id: "email",
      label: "Enter your email",
    },
    {
      type: isShown ? "text" : "password",
      icon: <FaLock />,
      id: "password",
      label: "Enter your password",
      status: isShown ? <FaRegEye /> : <FaRegEyeSlash />,
    },
  ];

  function handleShowPassword() {
    setIsShown((prev) => !prev);
  }
  return (
    <form
      onSubmit={handleSubmit(mutate)}
      className="w-full sm:max-w-[600px] p-8 rounded-2xl card-enhanced glass-effect animate-fade-in relative z-10"
    >
      {/* Header */}
      <div className="text-center mb-8">
        <div className="w-16 h-16 rounded-full gradient-primary mx-auto mb-6 shadow-elegant animate-pulse-glow flex items-center justify-center">
          <span className="text-2xl">🚀</span>
        </div>
        <h2 className="text-3xl font-bold text-foreground mb-2">
          Welcome Back
        </h2>
        <p className="text-muted-foreground">
          Sign in to your SocialHub account
        </p>
      </div>

      {/* Inputs */}
      <div className="space-y-6 mb-8">
        {formInputs.map((input) => (
          <div key={input.id} className="space-y-2">
            <label
              htmlFor={input.id}
              className="block text-sm font-medium text-foreground"
            >
              {input.label}
            </label>
            <div className="relative">
              <div className="flex items-center border-2 border-border rounded-xl bg-card/50 px-4 py-3 focus-within:ring-2 focus-within:ring-primary focus-within:border-primary transition-all duration-300 hover:border-primary/50">
                {(input.id === "password" || input.id === "rePassword") && (
                  <button
                    onClick={() => handleShowPassword()}
                    className="text-muted-foreground absolute right-6  cursor-pointer"
                  >
                    {input.status}
                  </button>
                )}
                <span className="text-muted-foreground mr-3">{input.icon}</span>
                <input
                  className="w-full bg-transparent border-none outline-none text-foreground placeholder-muted-foreground"
                  type={input.type}
                  id={input.id}
                  placeholder={input.label}
                  {...register(input.id)}
                />
              </div>
              {errors[input.id] && touchedFields[input.id] && (
                <p className="mt-2 text-xs text-destructive animate-slide-up ">
                  {errors[input.id].message}
                </p>
              )}
            </div>
          </div>
        ))}
      </div>

      {/* Button */}
      <button
        className="w-full py-3 flex items-center justify-center gap-2 gradient-primary text-primary-foreground font-semibold rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 cursor-pointer btn-glow disabled:opacity-50 disabled:cursor-not-allowed mb-6"
        type="submit"
        disabled={isPending}
      >
        {isPending ? (
          <>
            <AiOutlineLoading3Quarters className="w-5 h-5 animate-spin" />
            Signing in...
          </>
        ) : (
          "Sign In"
        )}
      </button>

      {/* Footer */}
      <p className="text-sm text-center text-muted-foreground">
        Don't have an account?{" "}
        <Link
          to={"/auth/signup"}
          className="text-primary hover:underline font-medium transition-colors duration-300"
        >
          Sign up
        </Link>
      </p>
    </form>
  );
}

export default Login;
