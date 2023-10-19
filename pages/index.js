import axios from "axios";
import toast, { Toaster } from "react-hot-toast";
import { useEffect, useState } from "react";

export default function Home() {
  const [user, serUser] = useState("");
  const [loading, serLoading] = useState(false);
  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    serLoading(true);
    try {
      const users = await axios.get(
        "https://jsonplaceholder.typicode.com/users"
      );
      serLoading(false);
      console.log(users.data);
      serUser(users.data);
    } catch (error) {
      toast.error("Faild to Fetch User Data.");
      serLoading(false);
      console.log(error);
    } finally {
      serLoading(false);
    }
  };

  return (
    <main className=" px-10 md:px-5">
      <div className="flex justify-center items-center w-full min-h-screen">
        <div>
          {user &&
            user.map((data) => (
              <div
                className="flex justify-between px-3 py-2 border border-gray-200"
                key={data.id}
              >
                <p className="px-2 w-[200px]">{data.name}</p>
                <p className="px-2 w-[300px]">{data.email}</p>
                <p className="px-2 w-[300px]">{data.phone}</p>
                <p className="px-2 w-[200px]">{data.address?.city}</p>
                <div className="px-2 w-[200px] flex gap-2">
                  <button
                    type="button"
                    className="px-2 py-1 border border-gray-200 rounded-md bg-red-500 text-white"
                  >
                    Delete
                  </button>
                  <button
                    type="button"
                    className="px-2 py-1 border border-gray-200 rounded-md bg-blue-800 text-white"
                  >
                    Update
                  </button>
                </div>
              </div>
            ))}
        </div>
      </div>
      <Toaster position="top-right" reverseOrder={false} />
    </main>
  );
}
