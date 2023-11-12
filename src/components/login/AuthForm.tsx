"use client";
import { Fetch, getUser } from "@/lib/axios";
import { isPasswordStrong } from "@/utils/checkPasswordStrong";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import Link from "next/link";
import React, {
  ChangeEvent,
  FormEvent,
  useEffect,
  useRef,
  useState,
} from "react";
import { useRouter } from "next/navigation";

interface IType {
  type: "login" | "register";
}

interface IAuthData {
  email: string;
  username?: string;
  password: string;
  passwordAgain?: string;
}

const AuthForm = ({ type }: IType) => {
  const queryClient = useQueryClient();
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
  const [canSubmit, setCanSubmit] = useState(false);
  const router = useRouter()

  const authMutation = useMutation(
    (data: IAuthData) => {
      return Fetch.post(
        type === "login" ? "/auth/login" : "/auth/register",
        data
      );
    },
    {
      async onSuccess(e) {
        await queryClient.prefetchQuery(['getUser'], () => getUser(e.data.data._id));
        localStorage.setItem('user_id', e.data.data._id);
        router.push("/");
      },
      onError(res: { response: { data: { message: string }}}) {
        const msg = res.response.data.message;

        if (msg === 'Email not found') {  
          return setErrors({ ...errors, email: msg });
        }
        
        if (msg === 'Invalid password') {
          return setErrors({ ...errors, password: msg });
        }
      },
    }
  );

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (type === "login") {
      if (emailRef.current && passwordRef.current)
        authMutation.mutate({
          email: emailRef.current?.value,
          password: passwordRef.current?.value,
        });
      return;
    }

    if (emailRef.current && passwordRef.current && nameRef.current) {
      authMutation.mutate({
        username: nameRef.current.value,
        email: emailRef.current.value,
        password: passwordRef.current.value,
      });
    }
  };

  const handlePasswordStrong = (e: ChangeEvent<HTMLInputElement>) => {
    if (type === "login") {
      if (emailRef.current?.value !== "" && passwordRef.current?.value !== "") {
        return setCanSubmit(true);
      }
      return setCanSubmit(false);
    }

    if (
      passwordRef.current?.value === "" ||
      isPasswordStrong(e.target.value) === ""
    ) {
      return setErrors({ ...errors, password: "" });
    }

    if (isPasswordStrong(e.target.value))
      return setErrors({
        ...errors,
        password: isPasswordStrong(e.target.value),
      });
  };

  const handleIsPassworkMatches = (e: ChangeEvent<HTMLInputElement>) => {
    if (
      emailRef.current &&
      passwordRef.current &&
      nameRef.current &&
      passwordAgainRef.current
    ) {
      if (e.target.value === "" || e.target.value === passwordRef.current.value)
        return setErrors({ ...errors, passwordAgain: "" });

      if (e.target.value !== passwordRef.current.value)
        return setErrors({
          ...errors,
          passwordAgain: "password doesn't matches",
        });
    }
  };

  useEffect(() => {
    if (type === "login") {
      if (emailRef.current?.value !== "" && passwordRef.current?.value !== "") {
        return setCanSubmit(true);
      } else return setCanSubmit(false);
    }

    if (
      emailRef.current?.value !== "" &&
      passwordRef.current?.value !== "" &&
      nameRef.current?.value !== "" &&
      passwordAgainRef.current?.value !== "" &&
      !errors.passwordAgain
    ) {
      setCanSubmit(true);
    } else setCanSubmit(false);
  }, [
    type,
    emailRef.current?.value,
    passwordRef.current?.value,
    nameRef.current?.value,
    passwordAgainRef.current?.value,
    errors.passwordAgain,
  ]);

  return (
    <div className="flex justify-center items-center min-h-screen">
      <div>
        <h2 className="text-center pb-8 text-3xl rounded-3xl text-white">
          {type === "login" ? "Login" : "Register"}
        </h2>
        <form
          onSubmit={handleSubmit}
          className="border flex flex-col gap-4 p-8 shadow-md rounded-xl bg-white"
        >
          <div className="flex flex-col">
            <input
              className="text-md p-2 outline-none border border-slate-300 rounded w-72"
              id="email"
              name="email"
              type="email"
              placeholder="email"
              ref={emailRef}
              onFocus={() => setErrors({ ...errors, email: "" })}
            />
            {errors.email && (
              <label htmlFor="email" className="text-red-500 text-sm pl-2">
                {errors.email}
              </label>
            )}
          </div>

          {type === "register" && (
            <div className="flex flex-col">
              <input
                className="text-md p-2 outline-none border border-slate-300 rounded w-72"
                id="name"
                name="name"
                type="text"
                placeholder="username"
                ref={nameRef}
              />
              {errors.username && (
                <label htmlFor="name" className="text-red-500 text-sm pl-2">
                  {errors.username}
                </label>
              )}
            </div>
          )}

          <div className={`${type === "login" && "pb-16"} flex flex-col`}>
            <input
              className="text-md p-2 outline-none w-72 border border-slate-300"
              id="password"
              name="password"
              type="password"
              placeholder="password"
              ref={passwordRef}
              onChange={handlePasswordStrong}
              onFocus={() => setErrors({ ...errors, password: "" })}
            />
            {errors.password && (
              <label
                htmlFor="password"
                className="text-red-500 text-sm pl-2 max-w-[290px]"
              >
                {errors.password}
              </label>
            )}
          </div>

          {type === "register" && (
            <div className="pb-16 flex flex-col">
              <input
                className="text-md p-2 outline-none w-72 border border-slate-300"
                id="passwordAgain"
                name="passwordAgain"
                type="password"
                placeholder="password again"
                ref={passwordAgainRef}
                onChange={handleIsPassworkMatches}
              />
              {errors.passwordAgain && (
                <label
                  htmlFor="passwrodAgain"
                  className="text-red-500 text-sm pl-2"
                >
                  {errors.passwordAgain}
                </label>
              )}
            </div>
          )}

          <div className="flex items-center gap-2">
            <input
              id="checkbox"
              name="checkbox"
              type="checkbox"
              className="w-4 h-4"
              ref={saveMeRef}
            />
            <label htmlFor="checkbox" className="text-sm text-gray-500">
              save me on this browser
            </label>
          </div>

          <section>
            <div>
              <button
                type="submit"
                className={`w-full px-4 py-2 rounded text-sm border shadow-md float-right ${
                  !canSubmit ? "bg-gray-400" : "bg-sky-600"
                } text-white transform active:scale-95`}
                disabled={!canSubmit}
              >
                submit
              </button>
            </div>

            {type === "login" && (
              <p className="text-center text-sm text-gray-500">or</p>
            )}

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
