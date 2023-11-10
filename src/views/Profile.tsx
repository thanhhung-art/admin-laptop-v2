"use client";
import UserIcon from "@/icons/UserIcon";
import { getUser } from "@/lib/axios";
import { useQuery } from "@tanstack/react-query";

interface IProps {
  id: string;
}

const Profile = ({ id }: IProps) => {
  const { data, isLoading, isError } = useQuery(["getUser"], () => getUser(id));

  if (isLoading) {
    return <div>loading</div>;
  }

  if (isError) return <div>error</div>

  return (
    <>
      <main className="mx-auto pt-10 max-w-6xl">
        <form action="" className="m-auto bg-white p-10 rounded-lg">
          <section className="">
            <div className="m-auto w-fit bg-slate-400 rounded-full">
              <UserIcon w={140} h={140} />
            </div>
          </section>
          <section>
            <label htmlFor="email">Email: </label>
            <input
              id="email"
              type="text"
              placeholder="email"
              defaultValue={data.data.email}
            />
          </section>
          <section>
            <label htmlFor="phone">Phone: </label>
            <input
              id="phone"
              type="text"
              placeholder="phone"
              defaultValue={data.data.phone || ""}
            />
          </section>
          <section>
            <label htmlFor="name">Name: </label>
            <input
              id="name"
              type="text"
              placeholder="Name"
              defaultValue={data.data.username}
            />
          </section>
          <section>
            <label htmlFor="password">Password: </label>
            <input
              id="password"
              type="password"
              placeholder="Password"
              defaultValue={data.data.password}
            />
          </section>
          <section>
            <label htmlFor="address">Address: </label>
            <input
              id="address"
              type="text"
              placeholder="Address"
              defaultValue={""}
            />
          </section>
          <section>
            <label htmlFor="address2">Address 2: </label>
            <input
              id="address2"
              type="text"
              placeholder="Address 2"
              defaultValue={""}
            />
          </section>
        </form>
      </main>
    </>
  );
};

export default Profile;
