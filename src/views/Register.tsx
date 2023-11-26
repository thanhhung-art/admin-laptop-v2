"use client";

import { Fetch } from "@/lib/axios";
import { useMutation, QueryClient } from "@tanstack/react-query";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { FormEvent, createRef, useMemo, useState } from "react";

interface ILoginData {
  email: string;
  password: string;
}

const Register = () => {
  const emailRef = createRef<HTMLInputElement>();
  const passwordRef = createRef<HTMLInputElement>();
  const usernameRef = createRef<HTMLInputElement>();
  const confirmPasswordRef = createRef<HTMLInputElement>();
  const [errors, setErrors] = useState({
    email: "",
    password: "",
    username: "",
    confirmPassword: "",
  });
  const router = useRouter();
  //const queryClientLocal = useMemo(() => queryClient(), [])

  const loginMutation = useMutation({
    mutationFn: (loginData: ILoginData) => {
      return Fetch.post("/auth/login", loginData);
    },
    onError(
      error: { response: { data: { message: string } } },
      variables,
      context
    ) {
      console.log(error.response.data.message);
      if (error.response.data.message === "Invalid password") {
        errors.password = error.response.data.message;
        setErrors({ ...errors });
        return;
      }
      setErrors({ ...errors });
    },
    onSuccess(res: { data: { data: { _id: string } } }, variables, context) {
      //queryClientLocal.prefetchQuery(['getUser'], () => getUser(res.data.data._id))
      router.push("/");
    },
  });

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // if (emailRef.current && passwordRef.current) {
    //   loginMutation.mutate({
    //     email: emailRef.current.value,
    //     password: passwordRef.current.value,
    //   });
    // }
  };

  const handleMatchPassword = () => {
    if (passwordRef.current && confirmPasswordRef.current) {
      if (confirmPasswordRef.current.value === "") {
        setErrors({ ...errors, confirmPassword: "" });
        return;
      }

      if (passwordRef.current.value === confirmPasswordRef.current.value) {
        setErrors({ ...errors, confirmPassword: "" });
        return;
      }
      setErrors({ ...errors, confirmPassword: "password does not match" });
    }
  };

  return (
    <section className="max-w-xl h-screen flex justify-center items-center mx-auto">
      <div className="container flex flex-col mx-auto bg-white rounded-lg pt-12 my-5">
        <div className="flex justify-center w-full h-full my-auto xl:gap-14 lg:justify-normal md:gap-5 draggable">
          <div className="flex items-center justify-center w-full lg:p-12">
            <div className="flex items-center xl:p-10">
              <form
                className="flex flex-col w-full h-full pb-6 text-center bg-white rounded-3xl"
                onSubmit={handleSubmit}
              >
                <h3 className="mb-3 text-4xl font-extrabold text-dark-grey-900">
                  Sign Up
                </h3>

                <label
                  htmlFor="email"
                  className="mb-2 text-sm text-start text-grey-900"
                >
                  Email*
                </label>
                <div className="mb-5 flex flex-col">
                  <input
                    id="email"
                    type="email"
                    name="email"
                    ref={emailRef}
                    required
                    placeholder="Enter an email"
                    className=" w-full px-5 py-4 mr-2 text-sm font-medium outline-none focus:bg-grey-400 placeholder:text-grey-700 bg-grey-200 text-dark-grey-900 rounded-2xl shadow-inner"
                    onFocus={() => {
                      setErrors({ ...errors, email: "" });
                    }}
                    onBlur={() => {
                      setErrors({ ...errors, email: "" });
                    }}
                  />
                  <span className="text-red-500 text-[12px] w-full text-left h-2">
                    {errors.email}
                  </span>
                </div>

                <label
                  htmlFor="username"
                  className="mb-2 text-sm text-start text-grey-900"
                >
                  Username*
                </label>
                <div className="mb-5 flex flex-col">
                  <input
                    id="username"
                    type="text"
                    name="username"
                    ref={usernameRef}
                    required
                    placeholder="Enter a username"
                    className=" w-full px-5 py-4 mr-2 text-sm font-medium outline-none focus:bg-grey-400 placeholder:text-grey-700 bg-grey-200 text-dark-grey-900 rounded-2xl shadow-inner"
                    onFocus={() => {
                      setErrors({ ...errors, username: "" });
                    }}
                    onBlur={() => {
                      setErrors({ ...errors, username: "" });
                    }}
                  />
                  <span className="text-red-500 text-[12px] w-full text-left h-2">
                    {errors.username}
                  </span>
                </div>

                <label
                  htmlFor="password"
                  className="mb-2 text-sm text-start text-grey-900"
                >
                  Password*
                </label>
                <div className="mb-3 flex flex-col">
                  <input
                    id="password"
                    type="password"
                    name="password"
                    required
                    ref={passwordRef}
                    placeholder="Enter a password"
                    className={`flex items-center w-full px-5 py-4 mr-2 text-sm font-medium outline-none focus:bg-grey-400 placeholder:text-grey-700 bg-grey-200 text-dark-grey-900 rounded-2xl shadow-inner`}
                    onFocus={() => {
                      setErrors({ ...errors, password: "" });
                    }}
                    onBlur={() => {
                      setErrors({ ...errors, password: "" });
                    }}
                  />
                  <span className="text-[12px] text-red-500 text-left h-4">
                    {errors.password}
                  </span>
                </div>

                <label
                  htmlFor="confirmPassword"
                  className="mb-2 text-sm text-start text-grey-900"
                >
                  Confirm Password*
                </label>
                <div className="mb-3 flex flex-col">
                  <input
                    id="confirmPassword"
                    type="password"
                    name="confirmPassword"
                    required
                    ref={confirmPasswordRef}
                    placeholder="Enter a password"
                    className={`flex items-center w-full px-5 py-4 mr-2 text-sm font-medium outline-none focus:bg-grey-400 placeholder:text-grey-700 bg-grey-200 text-dark-grey-900 rounded-2xl shadow-inner`}
                    onFocus={() => {
                      setErrors({ ...errors, password: "" });
                    }}
                    onBlur={() => {
                      setErrors({ ...errors, password: "" });
                    }}
                    onChange={handleMatchPassword}
                  />
                  <span className="text-[12px] text-red-500 text-left h-4">
                    {errors.confirmPassword}
                  </span>
                </div>

                <button
                  type="submit"
                  className="w-full px-6 py-5 mb-5 text-sm font-bold leading-none text-white transition duration-300 md:w-96 rounded-2xl hover:bg-purple-blue-600 focus:ring-4 focus:ring-purple-blue-100 bg-blue-500"
                >
                  Sign Up
                </button>
                <p className="text-sm leading-relaxed text-grey-900">
                  Have an account?{" "}
                  <Link href="/login">
                    <span className="font-bold text-grey-700">Login</span>
                  </Link>
                </p>
              </form>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Register;
