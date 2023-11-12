"use client";
import EyeSlashIcon from "@/icons/EyeSlashIcon";
import EysIcon from "@/icons/EysIcon";
import UserIcon from "@/icons/UserIcon";
import { Fetch, getUser } from "@/lib/axios";
import { useMutation, useQuery } from "@tanstack/react-query";
import { AES, enc } from "crypto-js";
import { FormEvent, createRef, useMemo, useState } from "react";

interface IUpdateUser {
  email?: string;
  username?: string;
  phone?: string;
  address?: string;
  address2?: string;
}

interface IProps {
  id: string;
}

const pass_secret = process.env.NEXT_PUBLIC_PASS_SECRET || "";

const Profile = ({ id }: IProps) => {
  const { data, isLoading, isError } = useQuery(["getUser"], () => getUser(id));
  const [typePassword, setTypePassword] = useState("password");
  const refs = {
    email: createRef<HTMLInputElement>(),
    phone: createRef<HTMLInputElement>(),
    username: createRef<HTMLInputElement>(),
    password: createRef<HTMLInputElement>(),
    address: createRef<HTMLInputElement>(),
    address2: createRef<HTMLInputElement>(),
  };

  const updateProfileMutation = useMutation((body: IUpdateUser) => {
    // remove empty values
    const temp = {} as IUpdateUser;
    for (let key in body) {
      const field = key as keyof typeof body;
      if (body[field] !== "") {
        temp[field] = body[field];
      }
    }
    return Fetch.put("/users/" + data?.data._id, temp);
  });

  const passwordDecrypt = useMemo(() => {
    if (data) {
      return AES.decrypt(data.data.password, pass_secret).toString(enc.Utf8)
    }
    return "";
  }, [data]);

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (
      refs["email"].current &&
      refs["username"].current &&
      refs["phone"].current &&
      refs["password"].current &&
      refs["address"].current &&
      refs["address2"].current &&
      data?.data
    ) {
      let canUpdate = false;
      const temp = {
        emai:
          refs["email"].current.value !== data.data.email
            ? refs["email"].current.value
            : "",
        username:
          refs["username"].current.value !== data.data.username
            ? refs["username"].current.value
            : "",
        phone:
          refs["phone"].current.value !== data.data.phone
            ? refs["phone"].current.value
            : "",
        address:
          refs["address"].current.value !== data.data.address
            ? refs["address"].current.value
            : "",
        address2Ref:
          refs["address2"].current.value !== data.data.address2
            ? refs["address2"].current.value
            : "",
      };

      for (let key in temp) {
        const field = key as keyof typeof temp;
        if (temp[field] !== "") {
          canUpdate = true;
          break;
        }
      }
      canUpdate && updateProfileMutation.mutate(temp);
      canUpdate = false;
    }
  };

  const handleTypePassword = () => {
    setTypePassword(typePassword === "password" ? "text" : "password");
  };

  if (isLoading) {
    return <div>loading</div>;
  }

  if (isError) return <div>error</div>;

  return (
    <>
      <main className="mx-auto pt-10 max-w-6xl">
        <form
          onSubmit={handleSubmit}
          className="m-auto bg-white p-10 rounded-lg"
        >
          <section className="">
            <div className="m-auto w-fit bg-slate-400 rounded-full">
              <UserIcon w={140} h={140} />
            </div>
          </section>
          {[
            "email",
            "phone",
            "username",
            "password",
            "address",
            "address2",
          ].map((key: string) => {
            return (
              <section key={key} className="w-fit">
                <label htmlFor={key} className="mr-2">
                  {key === "username"
                    ? "Name"
                    : key[0].toUpperCase() + key.slice(1)}
                  :
                </label>
                <input
                  id={key}
                  type={key === "password" ? typePassword : "text"}
                  placeholder={key}
                  defaultValue={
                    key === "password"
                      ? (passwordDecrypt as string)
                      : (data.data[key as keyof typeof data.data] as string)
                  }
                  ref={refs[key as keyof typeof refs]}
                  className="w-32"
                />
                {key === "password" && (
                  <span
                    onClick={handleTypePassword}
                    className="float-right cursor-pointer"
                  >
                    {typePassword === 'password' ? <EysIcon /> : <EyeSlashIcon />}
                  </span>
                )}
              </section>
            );
          })}
          <section className="mb-2">
            <button className="float-right bg-blue-500 rounded-md text-white px-3 py-1">
              update profile
            </button>
          </section>
        </form>
      </main>
    </>
  );
};

export default Profile;
