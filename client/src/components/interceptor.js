import  { useEffect } from "react";
import axios from "axios";

const Intercept = () => {
  useEffect(() => {
    const token = localStorage.getItem("token");
    axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
  }, []);

  return null;
};

export default Intercept;
