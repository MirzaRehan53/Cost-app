import React from "react";
import { useState } from "react";

import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { FiEye, FiEyeOff } from "react-icons/fi";

const schema = yup
  .object({
    username: yup.string().required("Username is required"),
    password: yup.string().required("Password is required"),
  })
  .required();

export default function SignIn() {
  const [showPassword, setShowPassword] = useState(false);
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
  };

  return (
    <div className="h-dvh max-w-6xl py-10  mx-auto">
      {/* Left side - Form */}
      <div className="flex flex-row h-full border border-darkBlue rounded-[20px]">
        <div className="w-full md:w-1/2 p-40  flex items-center justify-center">
          <div className="w-full max-w-md">
            <h2 className="text-3xl font-bold mb-2">Sign in</h2>
            <p className="text-gray-500 text-sm mb-8">
              Please sign in with your personal login information.
            </p>

            <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
              <div className="form-group">
                <input
                  {...register("username")}
                  type="text"
                  placeholder="Username"
                  className="form-input"
                />
                <label className="form-label">Username</label>
                {errors.username && (
                  <p className="text-red-500 text-sm mt-1">
                    {errors.username.message}
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
                <label className="form-label">Password</label>
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-0 top-2 text-gray-500"
                >
                  {showPassword ? <FiEye size={20} /> : <FiEyeOff size={20} />}
                </button>
                {errors.password && (
                  <p className="text-red-500 text-sm mt-1">
                    {errors.password.message}
                  </p>
                )}
              </div>

              <div className="text-right">
                <Link
                  to="/forgot-password"
                  className="text-primary hover:text-primary-dark"
                >
                  Forgot Password?
                </Link>
              </div>

              <button
                type="submit"
                className="w-full bg-primary hover:bg-primary-dark text-white py-3 rounded-lg transition duration-200"
              >
                Sign in
              </button>

              <p className="text-center">
                Don't have an account?{" "}
                <Link
                  to="/signup"
                  className="text-primary hover:text-primary-dark"
                >
                  Sign up
                </Link>
              </p>
            </form>
          </div>
        </div>
        <div className="w-1/2 bg-transparent overflow-hidden  h-full relative rounded-r-[18px]">
          <div
            className="absolute  h-[1067.83px]  w-[858px] top-[-300.96px] left-[120.16px]   rotate-[-200.96deg]"
            style={{ background: "rgba(113, 131, 154, 1)" }}
          ></div>
          <div className="hidden md:flex  h-full items-center relative justify-center p-40 ">
            <div>
              <div className="text-white w-full ml-10">
                <h1 className="text-4xl font-bold mb-4">WELCOME Back!</h1>
                <p className="text-lg">
                  Please sign in with your personal login information.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
