import React from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { useEffect, useRef } from "react";

export default function OTPVerification() {
  const navigate = useNavigate();
  const { register, handleSubmit, setValue } = useForm({
    defaultValues: {
      otp: ["", "", "", ""],
    },
  });

  const inputRefs = [useRef(), useRef(), useRef(), useRef()];

  const onSubmit = (data) => {
    console.log(data.otp.join(""));
    // Add your OTP verification logic here
    navigate("/");
  };

  const handleKeyDown = (index, e) => {
    if (e.key === "Backspace" && !e.target.value && index > 0) {
      inputRefs[index - 1].current.focus();
    }
  };

  const handleInput = (index, e) => {
    const value = e.target.value;
    if (value.length === 1 && index < 3) {
      inputRefs[index + 1].current.focus();
    }
  };

  return (
    <div className="min-h-screen flex">
      {/* Left side - Message */}
      <div className="hidden md:flex md:w-1/2 bg-primary items-center justify-center p-40">
        <div className="text-white max-w-md">
          <h1 className="text-4xl font-bold mb-4">Verify!</h1>
          <p className="text-lg">
            To keep connected with us please verify your account.
          </p>
        </div>
      </div>

      {/* Right side - Form */}
      <div className="w-full md:w-1/2 p-40 flex items-center justify-center">
        <div className="w-full max-w-md">
          <h2 className="text-3xl font-bold mb-2">Account Verification</h2>
          <p className="text-gray-500 mb-8">
            Enter the code we sent to your email address to verify your account.
          </p>

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
            <div className="flex justify-center space-x-4">
              {[0, 1, 2, 3].map((index) => (
                <input
                  key={index}
                  {...register(`otp.${index}`)}
                  type="text"
                  maxLength="1"
                  ref={inputRefs[index]}
                  className="otp-input"
                  onKeyDown={(e) => handleKeyDown(index, e)}
                  onInput={(e) => handleInput(index, e)}
                />
              ))}
            </div>

            <button
              type="submit"
              className="w-full bg-primary hover:bg-primary-dark text-white py-3 rounded-lg transition duration-200"
            >
              Confirm
            </button>

            <p className="text-center">
              Didn't receive the code?{" "}
              <button
                type="button"
                className="text-primary hover:text-primary-dark"
                onClick={() => console.log("Resend code")}
              >
                Resend code
              </button>
            </p>
          </form>
        </div>
      </div>
    </div>
  );
}
