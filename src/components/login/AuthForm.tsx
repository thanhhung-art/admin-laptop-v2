"use client";
import Link from "next/link";
import React, { useRef, useState } from "react";

interface IType {
  type: "login" | "register";
}

const AuthForm = ({ type }: IType) => {
  const emailRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);
  const nameRef = useRef<HTMLInputElement>(null);
  const passwordAgainRef = useRef<HTMLInputElement>(null);
  const saveMeRef = useRef<HTMLInputElement>(null);
  const [errors, setErrors] = useState({
    email: "",
    username: "",
    password: "",
    passwordAgain: "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
  };

  return (
    <div className="flex justify-center items-center min-h-screen">
      <div>
        <h2 className="text-center pb-8 text-3xl rounded-3xl">
          {type === "login" ? "Login" : "Register"}
        </h2>
        <form
          onSubmit={handleSubmit}
          className="border-2 flex flex-col gap-4 p-8 shadow-lg rounded-xl"
        >
          <div className="flex flex-col">
            <input
              className="text-md p-2 outline-none border border-slate-300 rounded w-72"
              id="email"
              type="email"
              placeholder="email"
              ref={emailRef}
            />
            {errors.email && (
              <label htmlFor="email" className="text-red-500 text-sm pl-2">
                error will be here
              </label>
            )}
          </div>

          {type === "register" && (
            <div className="flex flex-col">
              <input
                className="text-md p-2 outline-none border border-slate-300 rounded w-72"
                id="name"
                type="text"
                placeholder="username"
                ref={nameRef}
              />
              {errors.username && (
                <label htmlFor="name" className="text-red-500 text-sm pl-2">
                  error will be here
                </label>
              )}
            </div>
          )}

          <div className={`${type === "login" && "pb-16"} flex flex-col`}>
            <input
              className="text-md p-2 outline-none w-72 border border-slate-300"
              id="password"
              type="password"
              placeholder="password"
              ref={passwordRef}
            />
            {errors.password && (
              <label htmlFor="password" className="text-red-500 text-sm pl-2">
                error will be here
              </label>
            )}
          </div>

          {type === "register" && (
            <div className="pb-16 flex flex-col">
              <input
                className="text-md p-2 outline-none w-72 border border-slate-300"
                id="passwordAgain"
                type="password"
                placeholder="password again"
                ref={passwordAgainRef}
              />
              {errors.username && (
                <label
                  htmlFor="passwrodAgain"
                  className="text-red-500 text-sm pl-2"
                >
                  error will be here
                </label>
              )}
            </div>
          )}

          <div className="flex items-center gap-2">
            <input type="checkbox" className="w-4 h-4" ref={saveMeRef} />
            <label htmlFor="checkbox" className="text-sm text-gray-500">
              save me on this browser
            </label>
          </div>

          <section>
            <div>
              <button
                type="submit"
                className="w-full px-4 py-2 rounded text-sm border shadow-md float-right bg-sky-600 text-white transform active:scale-95"
              >
                submit
              </button>
            </div>

            {type === "login" && <p className="text-center text-sm text-gray-500">or</p>}

            {type === "login" && (
              <div>
                <button className="w-full px-4 py-2 rounded text-sm border shadow-md float-right bg-red-500 text-white transform active:scale-95">
                  login with google
                </button>
              </div>
            )}
          </section>

          <div>
            {type === "login" && (
              <span className="text-sm text-gray-600">
                does have an account?{" "}
                <Link href="/register" className="text-blue-500 text-md">
                  register
                </Link>
              </span>
            )}
            {type === "register" && (
              <span className="text-sm text-gray-600">
                you have an account?{" "}
                <Link href="/login" className="text-blue-500 text-md">
                  login
                </Link>
              </span>
            )}
          </div>
        </form>
      </div>
    </div>
  );
};

export default AuthForm;
