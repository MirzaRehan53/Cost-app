import React from "react";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { FiEye, FiEyeOff } from "react-icons/fi";

const schema = yup
  .object({
    fullName: yup.string().required("Full name is required"),
    username: yup.string().required("Username is required"),
    email: yup
      .string()
      .email("Invalid email format")
      .required("Email is required"),
    companyName: yup.string().required("Company name is required"),
    password: yup
      .string()
      .min(8, "Password must be at least 8 characters")
      .required("Password is required"),
    confirmPassword: yup
      .string()
      .oneOf([yup.ref("password")], "Passwords must match")
      .required("Please confirm your password"),
    terms: yup
      .boolean()
      .oneOf([true], "You must accept the terms and conditions"),
  })
  .required();

export default function SignUp() {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  const onSubmit = (data) => {
    console.log(data);
    // Add your sign up logic here
    navigate("/verify");
  };

  return (
    <div className="h-dvh max-w-6xl py-10  mx-auto">
      <div className="flex flex-row h-full border border-darkBlue rounded-[20px]">
        {/* Left side - Welcome message */}
        <div className="w-1/2 bg-transparent overflow-hidden  h-full relative rounded-l-[18px]">
          <div
            className="absolute  h-[1067.83px]  w-[858px] top-[-300.96px] right-[130.16px]   rotate-[20.96deg]"
            style={{ background: "rgba(113, 131, 154, 1)" }}
          ></div>
          <div className="hidden md:flex  h-full items-center relative justify-center p-40 ">
            <div>
              <div className="text-white w-full relative right-14">
                <h1 className="text-4xl font-bold mb-4 uppercase">Sign up</h1>
                <p className="text-base">
                  Please sign up with your personal information.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Right side - Form */}
        <div className="w-full md:w-1/2 px-32 flex items-center justify-center">
          <div className="w-full max-w-md">
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
              <div className="form-group">
                <input
                  {...register("fullName")}
                  type="text"
                  placeholder="Full name"
                  className="form-input"
                />
                <label className="form-label text-xs font-normal">
                  Full name
                </label>
                {errors.fullName && (
                  <p className="text-red-500 text-sm mt-1">
                    {errors.fullName.message}
                  </p>
                )}
              </div>

              <div className="form-group">
                <input
                  {...register("username")}
                  type="text"
                  placeholder="Username"
                  className="form-input"
                />
                <label className="form-label text-xs font-normal">
                  Username
                </label>
                {errors.username && (
                  <p className="text-red-500 text-sm mt-1">
                    {errors.username.message}
                  </p>
                )}
              </div>

              <div className="form-group">
                <input
                  {...register("email")}
                  type="email"
                  placeholder="Email"
                  className="form-input"
                />
                <label className="form-label text-xs font-normal">Email</label>
                {errors.email && (
                  <p className="text-red-500 text-sm mt-1">
                    {errors.email.message}
                  </p>
                )}
              </div>

              <div className="form-group">
                <input
                  {...register("companyName")}
                  type="text"
                  placeholder="Company name"
                  className="form-input"
                />
                <label className="form-label text-xs font-normal">
                  Company name
                </label>
                {errors.companyName && (
                  <p className="text-red-500 text-sm mt-1">
                    {errors.companyName.message}
                  </p>
                )}
              </div>

              <div className="form-group">
                <input
                  {...register("password")}
                  type={showPassword ? "text" : "password"}
                  placeholder="Password"
                  className="form-input pr-10"
                />
                <label className="form-label text-xs font-normal">
                  Password
                </label>
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-0 top-2 text-gray-500"
                >
                  {showPassword ? <FiEyeOff size={20} /> : <FiEye size={20} />}
                </button>
                {errors.password && (
                  <p className="text-red-500 text-sm mt-1">
                    {errors.password.message}
                  </p>
                )}
              </div>

              <div className="form-group">
                <input
                  {...register("confirmPassword")}
                  type={showConfirmPassword ? "text" : "password"}
                  placeholder="Confirm Password"
                  className="form-input pr-10"
                />
                <label className="form-label text-xs font-normal">
                  Confirm Password
                </label>
                <button
                  type="button"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  className="absolute right-0 top-2 text-gray-500"
                >
                  {showConfirmPassword ? (
                    <FiEyeOff size={20} />
                  ) : (
                    <FiEye size={20} />
                  )}
                </button>
                {errors.confirmPassword && (
                  <p className="text-red-500 text-sm mt-1">
                    {errors.confirmPassword.message}
                  </p>
                )}
              </div>

              <div className="flex items-center">
                <input
                  {...register("terms")}
                  type="checkbox"
                  id="terms"
                  className="mr-2"
                />
                <label htmlFor="terms" className="text-xs ">
                  I Agree to Terms and Conditions
                </label>
              </div>
              {errors.terms && (
                <p className="text-red-500 text-sm">{errors.terms.message}</p>
              )}

              <button
                type="submit"
                className="w-full bg-primary hover:bg-primary-dark text-white py-1.5 rounded-lg transition duration-200"
              >
                Sign up
              </button>

              <p className="text-center text-xs">
                Already have an account?{" "}
                <Link
                  to="/login"
                  className="text-primary font-semibold hover:text-primary-dark"
                >
                  Sign in
                </Link>
              </p>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
