import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import z from "zod";
import { FaUser, FaEnvelope, FaLock, FaCalendarAlt } from "react-icons/fa";
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import { useMutation } from "@tanstack/react-query";
import handleRegister from "../../API/SignupApi/SignupApi";
import { useState } from "react";
import { FaRegEye, FaRegEyeSlash } from "react-icons/fa";
import Alert from "../../components/Alert/Alert";
function Registration() {
  const navigate = useNavigate();
  const [isShown, setIsShown] = useState({
    password: false,
    rePassword: false,
  });

  const { mutate, isPending } = useMutation({
    mutationFn: (values) => handleRegister(values),
    onSuccess: (data) => {
      showAlert(data.message, "Success", "success");
      setTimeout(() => {
        navigate("/auth/login");
      }, 2000);
    },

    onError: (error) => {
      const errorMessage = error.response?.data?.error || "Registration failed";
      showAlert(errorMessage, "Error", "error");
    },
  });

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
          "Password must be at least 8 characters long, one uppercase letter, one lowercase letter, one number, and one special character"
        ),
      rePassword: z
        .string()
        .regex(
          /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/,
          "Password must match "
        ),
      dateOfBirth: z
        .string()
        .regex(/^\d{4}-\d{2}-\d{2}$/, "Invalid date format")
        .nonempty("Date of birth is required")
        .refine((date) => {
          const inputDate = new Date(date);
          const today = new Date();
          let userAge = today.getFullYear() - inputDate.getFullYear();
          const month = today.getMonth() - inputDate.getMonth();
          const day = today.getDate() - inputDate.getDate();
          if (month < 0 || (month === 0 && day < 0)) {
            userAge--;
          }
          return userAge >= 18;
        }, "You must be at least 18 years old"),
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
    formState: { errors, touchedFields },
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
    Alert(condition, message, icon);
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
      type: isShown.password ? "text" : "password",
      icon: <FaLock />,
      id: "password",
      label: "Enter your password",
      status: isShown.password ? <FaRegEye /> : <FaRegEyeSlash />,
    },
    {
      type: isShown.rePassword ? "text" : "password",
      icon: <FaLock />,
      id: "rePassword",
      label: "Confirm your password",
      status: isShown.rePassword ? <FaRegEye /> : <FaRegEyeSlash />,
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

  function handleShowPassword(id) {
    setIsShown((prev) => ({ ...prev, [id]: !prev[id] }));
  }
  return (
    <form
      onSubmit={handleSubmit(mutate)}
      className="w-full sm:max-w-[600px] mt-5  p-8 rounded-2xl card-enhanced glass-effect animate-fade-in relative z-10"
    >
      {/* Header */}
      <div className="text-center mb-8">
        <div className="w-16 h-16 rounded-full gradient-primary mx-auto mb-6 shadow-elegant animate-pulse-glow flex items-center justify-center">
          <span className="text-2xl">🌟</span>
        </div>
        <h2 className="text-3xl font-bold text-foreground mb-2">
          Join SocialHub
        </h2>
        <p className="text-muted-foreground">
          Create your account and connect with others
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
                <span className="text-muted-foreground mr-3">{input.icon}</span>
                {(input.id === "password" || input.id === "rePassword") && (
                  <button
                    onClick={() => handleShowPassword(input.id)}
                    className="text-muted-foreground absolute right-6  cursor-pointer"
                  >
                    {input.status}
                  </button>
                )}
                <input
                  className="w-full bg-transparent border-none outline-none text-foreground placeholder-muted-foreground"
                  type={input.type}
                  id={input.id}
                  placeholder={input.label}
                  {...register(input.id)}
                />
              </div>
              {errors[input.id] && touchedFields[input.id] && (
                <p className="mt-2 text-xs text-destructive animate-slide-up">
                  {errors[input.id].message}
                </p>
              )}
            </div>
          </div>
        ))}
      </div>

      {/* Gender */}
      <div className="space-y-3 mb-8">
        <label className="block text-sm font-medium text-foreground">
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
                className="block py-3 text-center rounded-xl border-2 border-border cursor-pointer text-muted-foreground hover:border-primary/50 hover:bg-primary/5 transition-all duration-300 peer-checked:border-primary peer-checked:bg-primary peer-checked:text-primary-foreground font-medium"
              >
                {option.label}
              </label>
            </div>
          ))}
        </div>
        {errors.gender && (
          <p className="mt-2 text-xs text-destructive animate-slide-up">
            {errors.gender.message}
          </p>
        )}
      </div>

      {/* Button */}
      <button
        className="w-full py-3 flex cursor-pointer items-center justify-center gap-2 gradient-primary text-primary-foreground font-semibold rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 btn-glow disabled:opacity-50 disabled:cursor-not-allowed mb-6"
        type="submit"
        disabled={isPending}
      >
        {isPending ? (
          <>
            <AiOutlineLoading3Quarters className="w-5 h-5 animate-spin" />
            Creating account...
          </>
        ) : (
          "Create Account"
        )}
      </button>

      {/* Footer */}
      <p className="text-sm text-center text-muted-foreground">
        Already have an account?{" "}
        <Link
          to={"/auth/login"}
          className="text-primary hover:underline font-medium transition-colors duration-300"
        >
          Sign in
        </Link>
      </p>
    </form>
  );
}

export default Registration;
