import axios from "axios";
import toast, { Toaster } from "react-hot-toast";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";

const userdetails = () => {
  const router = useRouter();
  const userId = router?.query?.id;
  const [userDetails, serUserDetails] = useState({});
  const [loading, serLoading] = useState(false);

  useEffect(() => {
    if (userId) {
      fetchUsersDetails();
    }
  }, [userId]);

  const fetchUsersDetails = async () => {
    serLoading(true);
    try {
      const users = await axios.get(
        `https://servercoderslab.vercel.app/todo/${userId}`
      );
      serLoading(false);
      console.log(users.data.result[0]);
      serUserDetails(users.data.result[0]);
    } catch (error) {
      toast.error("Faild to Fetch User Data.");
      serLoading(false);
      console.log(error);
    } finally {
      serLoading(false);
    }
  };
  return (
    <div>
      <div className="flex justify-center items-center h-screen">
        {userDetails && (
          <div className="text-xl">
            <p>
              Name : <span>{userDetails?.name}</span>
            </p>
            <p>
              phone : <span>{userDetails?.phone}</span>
            </p>
            <p>
              Email : <span>{userDetails?.email}</span>
            </p>

            <p>
              City : <span>{userDetails?.address}</span>
            </p>
          </div>
        )}
      </div>
      <Toaster position="top-right" reverseOrder={false} />
    </div>
  );
};

export default userdetails;
