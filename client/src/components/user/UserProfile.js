import React, { useState, useEffect } from "react";
import axios from "axios";

const UserProfile = () => {
  const [userProfile, setUserProfile] = useState(null);

  useEffect(() => {
    getUserProfile();
  }, []);

  const getUserProfile = async () => {
    try {
      const token = localStorage.getItem("token");
      console.log("Token:", token); // Check if token exists

      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };
      console.log("Config:", config); // Check if config is correct

      const { data } = await axios.get(
        "http://localhost:8080/profile",
        config
      );
      console.log("Response Data:", data); // Check the response data
      setUserProfile(data.user);
    } catch (error) {
      console.log(error);
      alert("Something went wrong");
    }
  };

  return (
    <div style={{marginTop:"80px", padding:"50px 100px "}}>
      {userProfile && (
        <>
          <h2>User Profile</h2>
          <p>Name: {userProfile.name}</p>
          <p>Email: {userProfile.email}</p>
        </>
      )}
    </div>
  );
};

export default UserProfile;

