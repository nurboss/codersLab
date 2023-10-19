import axios from "axios";
import toast, { Toaster } from "react-hot-toast";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import UserCard from "@/components/UserCard";

export default function Home() {
  const router = useRouter();
  const [user, serUser] = useState([]);
  const [allUser, serAllUser] = useState([]);
  const [loading, serLoading] = useState(false);
  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    serLoading(true);
    try {
      const users = await axios.get("http://localhost:5000/todo");
      serLoading(false);
      console.log(users.data.result);
      serUser(users.data.result);
      serAllUser(users.data.result);
    } catch (error) {
      toast.error("Faild to Fetch User Data.");
      serLoading(false);
      console.log(error);
    } finally {
      serLoading(false);
    }
  };

  const postUsers = async () => {
    const userData = {
      name: "nur",
      email: "nur@gmail.com",
      phone: "01912345677",
      typeofUser: "student",
      address: "ctg",
    };
    serLoading(true);
    try {
      const users = await axios.post("http://localhost:5000/todo", userData);
      serLoading(false);
      console.log(users.data);
      toast.success("Successfully!");
      fetchUsers();
    } catch (error) {
      toast.error("Faild to Fetch User Data.");
      serLoading(false);
      console.log(error);
    } finally {
      serLoading(false);
    }
  };

  const deleteUsers = async (id, e) => {
    e.stopPropagation();
    serLoading(true);
    try {
      const data = await axios.delete(`http://localhost:5000/todo/${id}`);
      if (data?.status === 200) {
        toast.success("Successfully Deleted!");
        fetchUsers();
        // serUser((user) => user.filter((data) => data.id !== id));
      }
    } catch (error) {
      toast.error("Faild To Delete User.");
      console.log(error);
    }
  };

  const updateUser = async (id, e) => {
    e.stopPropagation();
    const userData = {
      name: "Coders Lab",
      email: "coderslab@gmail.com",
      phone: "01912345677",
      typeofUser: "company",
      address: "ctg, Agrabd",
    };
    serLoading(true);
    try {
      const users = await axios.patch(
        `http://localhost:5000/todo/${id}`,
        userData
      );
      serLoading(false);
      console.log(users.data);
      toast.success("Successfully!");
      fetchUsers();
    } catch (error) {
      toast.error("Faild to Fetch User Data.");
      serLoading(false);
      console.log(error.response.data);
    } finally {
      serLoading(false);
    }
  };
  console.log(user);
  const student = () => {
    const data = allUser.filter((data) => data.typeofUser === "student");
    console.log(data);
    serUser(data);
  };
  const company = () => {
    const data = allUser.filter((data) => data.typeofUser === "company");
    serUser(data);
  };
  const all = () => {
    serUser(allUser);
  };

  return (
    <main className=" px-10 md:px-5">
      <div className="flex flex-col justify-center items-center w-full min-h-screen cursor-pointer">
        <div>
          <button
            type="button"
            onClick={student}
            className="px-2 mb-10 py-1 border border-gray-200 rounded-md bg-green-600 text-white"
          >
            Student
          </button>
          <button
            type="button"
            onClick={company}
            className="px-2 mb-10 py-1 border border-gray-200 rounded-md bg-green-600 text-white"
          >
            Company
          </button>
          <button
            type="button"
            onClick={all}
            className="px-2 mb-10 py-1 border border-gray-200 rounded-md bg-green-600 text-white"
          >
            All
          </button>
          <button
            type="button"
            onClick={postUsers}
            className="px-2 mb-10 py-1 border border-gray-200 rounded-md bg-purple-800 text-white"
          >
            Add User
          </button>
        </div>
        <div>
          {user &&
            user.map((data) => (
              <UserCard
                key={data._id}
                data={data}
                deleteUsers={deleteUsers}
                updateUser={updateUser}
              />
            ))}
        </div>
      </div>
      <Toaster position="top-right" reverseOrder={false} />
    </main>
  );
}
