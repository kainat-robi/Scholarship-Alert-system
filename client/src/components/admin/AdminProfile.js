import React, { useState, useEffect } from "react";
import axios from "axios";

const AdminProfile = () => {
  const [adminProfile, setAdminProfile] = useState(null);

  useEffect(() => {
    getAdminProfile();
  }, []);

  const getAdminProfile = async () => {
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
        "http://localhost:8080/adminProfile",
        config
      );
      console.log("Response Data:", data); // Check the response data
      setAdminProfile(data.admin);
    } catch (error) {
      console.log(error);
      alert("Something went wrong");
    }
  };

  return (
    <div style={{marginTop:"80px", padding:"50px 100px "}}>
      {adminProfile && (
        <>
          <h2>Admin Profile</h2>
          {/* <p>Name: {adminProfile.name}</p> */}
          <p>Email: {adminProfile.email}</p>
        </>
      )}
    </div>
  );
};

export default AdminProfile;
