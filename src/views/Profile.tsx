"use client";
import Navbar from "@/components/navbar/Navbar";
import { getUser } from "@/lib/axios";
import { useQuery } from "@tanstack/react-query";

const Profile = () => {
  const { data } = useQuery(
    ["getUser"],
    () => getUser(localStorage.getItem("user_id") || ""),
    {
      enabled: !!localStorage.getItem("user_id"),
    }
  );

  if (!data) {
    return <div>error</div>;
  }

  return (
    <>
      <Navbar />
      <main className="px-24 pt-10">
        <form action="" className="m-auto bg-white p-10 rounded-lg">
          <section className="">
            <div className="w-32 h-32 rounded-full bg-sky-500 m-auto"></div>
          </section>
          <section>
            <label htmlFor="email">Email: </label>
            <input id="email" type="text" placeholder="email" defaultValue={data.data.email} />
          </section>
          <section>
            <label htmlFor="name">Name: </label>
            <input id="name" type="text" placeholder="Name" defaultValue={data.data.username} />
          </section>
          <section>
            <label htmlFor="password">Password: </label>
            <input id="password" type="password" placeholder="Password" defaultValue={data.data.password} />
          </section>
        </form>
      </main>
    </>
  );
};

export default Profile;
