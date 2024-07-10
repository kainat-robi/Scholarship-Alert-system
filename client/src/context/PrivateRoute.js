import  {  useEffect} from "react";
//import { UserContext } from "./auth";
// import { Outlet } from "react-router-dom";

const PrivateRoute = ({ component: Component, ...rest }) => {
  //const [ok] = useState(false);
  //  const {
  //    loggedIn,
  //    setLoggedIn,
  //    user,
  //    setUser,
  //    adminLoggedIn,
  //    setAdminLoggedIn,
  //  } = useContext(UserContext);

  useEffect(() => {
    const authCheck = async () => {
      // Place your authentication logic here
    };

    authCheck(); // Call authCheck function

  }, []);

  //return ok ? <Outlet /> : 'spinner';
};

export default PrivateRoute;
