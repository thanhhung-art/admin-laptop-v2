"use client";
import UserOrders from "@/components/profile/orders";
import EyeSlashIcon from "@/icons/EyeSlashIcon";
import EysIcon from "@/icons/EysIcon";
import { Fetch, getUser } from "@/lib/axios";
import { IOrder } from "@/types/order";
import { useMutation, useQuery } from "@tanstack/react-query";
import { AxiosResponse } from "axios";
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
  const getOrders = useQuery<AxiosResponse<{ data: IOrder[], msg: string }>>(
    ["getUserOrders", id],
    () => {
      return Fetch(
        `/orders/${id}/?phone=${data?.data.phone}&email=${data?.data.email}` as unknown as {
          data: IOrder[];
          msg: string;
        }
      );
    },
    {
      enabled: !!data?.data,
    }
  );
  
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
      return AES.decrypt(data.data.password, pass_secret).toString(enc.Utf8);
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
        password:
          refs["password"].current.value !== passwordDecrypt
            ? AES.encrypt(refs["password"].current.value, pass_secret)
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

      if (canUpdate && temp) canUpdate && updateProfileMutation.mutate(temp);
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
      <main className="">
        <section className="mx-auto pt-10 max-w-6xl">
          <form onSubmit={handleSubmit} className="bg-white p-10 rounded-lg">
            <section className="">
              <h2 className="text-5xl text-center">{data.data.username}</h2>
            </section>
            <section className="flex flex-col gap-3">
              {[
                "email",
                "phone",
                "username",
                "password",
                "address",
                "address2",
              ].map((key: string) => {
                return (
                  <section key={key} className="">
                    <label htmlFor={key} className="mr-2 font-bold">
                      {key === "username"
                        ? "Name"
                        : key[0].toUpperCase() + key.slice(1)}
                      :
                    </label>
                    <div className="relative">
                      <input
                        id={key}
                        type={key === "password" ? typePassword : "text"}
                        placeholder={key}
                        defaultValue={
                          key === "password"
                            ? (passwordDecrypt as string)
                            : (data.data[
                                key as keyof typeof data.data
                              ] as string)
                        }
                        ref={refs[key as keyof typeof refs]}
                        className="border-b border-b-slate-300 p-2 w-full outline-none rounded-md"
                      />
                      {key === "password" && (
                        <span
                          onClick={handleTypePassword}
                          className="absolute top-1/2 right-5 -translate-y-1/2 cursor-pointer"
                        >
                          {typePassword === "password" ? (
                            <EysIcon />
                          ) : (
                            <EyeSlashIcon />
                          )}
                        </span>
                      )}
                    </div>
                  </section>
                );
              })}
            </section>
            <section className="mt-4 mb-5">
              <button className="float-right bg-blue-500 rounded-md text-white px-3 py-1">
                update profile
              </button>
            </section>
          </form>
        </section>
        <section className="mx-auto pt-10 max-w-6xl">
          <UserOrders orders={getOrders.data?.data.data} />
        </section>
      </main>
    </>
  );
};

export default Profile;
