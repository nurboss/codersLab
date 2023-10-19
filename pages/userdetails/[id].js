import axios from "axios";
import toast, { Toaster } from "react-hot-toast";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";

const userdetails = () => {
  const router = useRouter();
  const userId = router?.query?.id;
  const [userDetails, serUserDetails] = useState(null);
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
        `https://jsonplaceholder.typicode.com/users/${userId}`
      );
      serLoading(false);
      console.log(users.data);
      serUserDetails(users.data);
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
              Name : <span>{userDetails?.username}</span>
            </p>
            <p>
              phone : <span>{userDetails?.phone}</span>
            </p>
            <p>
              Email : <span>{userDetails?.email}</span>
            </p>

            <p>
              City : <span>{userDetails?.address?.city}</span>
            </p>
          </div>
        )}
      </div>
      <Toaster position="top-right" reverseOrder={false} />
    </div>
  );
};

export default userdetails;
