import React from "react";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { FiEye, FiEyeOff } from "react-icons/fi";

const schema = yup
  .object({
    email: yup
      .string()
      .email("Invalid email format")
      .required("Email is required"),
  })
  .required();

export default function ForgotPassword() {
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
    // Add your password reset logic here
    navigate("/");
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
                <h1 className="text-4xl font-bold mb-4 uppercase">Verify!</h1>
                <p className="text-base">
                  To keep connected with us please verify your account.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Right side - Form */}
        <div className="w-full md:w-1/2 p-32 flex items-center justify-center">
          <div className="w-full max-w-lg">
            <h2 className="text-3xl font-bold w-full mb-2">Set new Password</h2>
            <p className="text-gray-500 text-xs mb-14">
              Your new password must be different to previously used passwords.
            </p>

            <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
              <div className="form-group mb-10">
                <input
                  {...register("newPassword")}
                  type="email"
                  placeholder="Enter your email"
                  className="form-input "
                />
                <label className="form-label">Email</label>

                {errors.email && (
                  <p className="text-red-500 text-sm mt-1">
                    {errors.email.message}
                  </p>
                )}
              </div>
              <Link to={"/reset-password"}>
                <button
                  type="submit"
                  className="w-full bg-primary hover:bg-primary-dark text-white py-3 rounded-lg transition duration-200"
                >
                  Reset Password
                </button>
              </Link>

              <div className="text-center">
                <Link
                  to="/login"
                  className="text-primary hover:text-primary-dark flex items-center justify-center"
                >
                  <span className="mr-2">←</span> Back to Sign in
                </Link>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
