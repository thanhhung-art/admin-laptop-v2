"use client";

import { Fetch } from "@/lib/axios";
import { useMutation } from "@tanstack/react-query";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { FormEvent, createRef, useState } from "react";

interface ILoginData {
  email: string;
  password: string;
}

const Login = () => {
  const emailRef = createRef<HTMLInputElement>();
  const passwordRef = createRef<HTMLInputElement>();
  const [errors, setErrors] = useState({
    email: "",
    password: "",
  });
  const router = useRouter();

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
      router.push("/");
    },
  });

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (emailRef.current && passwordRef.current) {
      loginMutation.mutate({
        email: emailRef.current.value,
        password: passwordRef.current.value,
      });
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
                  Sign In
                </h3>
                <p className="mb-4 text-grey-700">
                  Enter your email and password
                </p>
                <a className="flex items-center justify-center w-full py-4 mb-6 text-sm font-medium transition duration-300 rounded-2xl text-grey-900 bg-grey-300 hover:bg-grey-400 focus:ring-4 focus:ring-grey-300">
                  <Image
                    className="h-5 mr-2"
                    src="https://raw.githubusercontent.com/Loopple/loopple-public-assets/main/motion-tailwind/img/logos/logo-google.png"
                    alt="google image"
                    width={18}
                    height={18}
                  />
                  Sign in with Google
                </a>
                <div className="flex items-center mb-3">
                  <hr className="h-0 border-b border-solid border-grey-500 grow" />
                  <p className="mx-4 text-grey-600">or</p>
                  <hr className="h-0 border-b border-solid border-grey-500 grow" />
                </div>
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
                    className="flex items-center w-full px-5 py-4 mr-2 text-sm font-medium outline-none focus:bg-grey-400 placeholder:text-grey-700 bg-grey-200 text-dark-grey-900 rounded-2xl shadow-inner"
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
                <div className="flex flex-row justify-between mb-8">
                  <label className="relative inline-flex items-center mr-3 cursor-pointer select-none">
                    <input
                      type="checkbox"
                      className="w-4 h-4 rounded"
                      name="save-user"
                    />
                    <span className="ml-3 text-sm font-normal text-grey-900">
                      Keep me logged in
                    </span>
                  </label>
                  <a className="mr-4 text-sm font-medium text-purple-blue-500">
                    Forget password?
                  </a>
                </div>
                <button
                  type="submit"
                  className="w-full px-6 py-5 mb-5 text-sm font-bold leading-none text-white transition duration-300 md:w-96 rounded-2xl hover:bg-purple-blue-600 focus:ring-4 focus:ring-purple-blue-100 bg-blue-500"
                >
                  Sign In
                </button>
                <p className="text-sm leading-relaxed text-grey-900">
                  Not registered yet?{" "}
                  <Link href="/register">
                    <span className="font-bold text-grey-700">
                      Create an Account
                    </span>
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

export default Login;
