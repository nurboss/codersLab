import { useRouter } from "next/router";
import React from "react";

const UserCard = ({ data, deleteUsers, updateUser }) => {
  const router = useRouter();
  return (
    <div
      onClick={() => {
        router.push({
          pathname: `/userdetails/${data._id}`,
        });
      }}
      className="flex justify-between px-3 py-2 border border-gray-200"
      key={data.id}
    >
      <p className="px-2 w-[200px]">{data.name}</p>
      <p className="px-2 w-[300px]">{data.email}</p>
      <p className="px-2 w-[300px]">{data.phone}</p>
      <p className="px-2 w-[200px]">{data.address?.city}</p>
      <div className="px-2 w-[200px] flex gap-2">
        <button
          onClick={(e) => deleteUsers(data._id, e)}
          type="button"
          className="px-2 py-1 border border-gray-200 rounded-md bg-red-500 text-white"
        >
          Delete
        </button>
        <button
          onClick={(e) => updateUser(data._id, e)}
          type="button"
          className="px-2 py-1 border border-gray-200 rounded-md bg-blue-800 text-white"
        >
          Update
        </button>
      </div>
    </div>
  );
};

export default UserCard;
