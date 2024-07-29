import axios from "axios";
import { useCallback, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Outlet, useLocation, useNavigate } from "react-router-dom";
import { logout, setOnlineUser, setUser, setSocketConnectionStatus } from "../redux/userSlice";
import Sidebar from "../components/Sidebar";
import logo from "../assets/logo.png";
import { useSocket } from "../contexts/useSocket";

const Home = () => {
  const user = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const { socket } = useSocket();

  console.log("user", user);

  const fetchUserDetails = useCallback(async () => {
    try {
      const URL = `${import.meta.env.VITE_BACKEND_URL}/api/user-details`;
      const response = await axios({
        url: URL,
        withCredentials: true,
      });

      dispatch(setUser(response.data.data));

      if (response.data.data.logout) {
        dispatch(logout());
        navigate("/email");
      }
      console.log("Current User details", response);
    } catch (error) {
      console.log("error", error);
    }
  }, [dispatch, navigate]);


  useEffect(() => {
    fetchUserDetails();
  }, [fetchUserDetails]);

  /*Socket connection*/
  useEffect(() => {
    if (socket) {
      socket.on("onlineUser", (data) => {
        console.log("onlineUser", data);
        dispatch(setOnlineUser(data));
      });

      socket.on("connect", () => {
        dispatch(setSocketConnectionStatus(true));
      });

      socket.on("disconnect", () => {
        dispatch(setSocketConnectionStatus(false));
      });
    }
  }, [socket, dispatch]);

  const basePath = location.pathname === "/";
  return (
    <div className="grid lg:grid-cols-[300px,1fr] h-screen max-h-screen">
      <section className={`bg-white ${!basePath && "hidden"} lg:block`}>
        <Sidebar />
      </section>

      {/*Message Component*/}
      <section className={`${basePath && "hidden"}`}>
        <Outlet />
      </section>
      
      <div className={`justify-center items-center flex-col gap-4 
        hidden ${!basePath ? "hidden" : "lg:flex"}`}>
        <div>
          <img src={logo} width={200} alt="logo" />
          <p className="text-4xl mt-5 flex justify-center items-center font-bold">
            Telegram
          </p>
        </div>
        
        <p className="text-xl mt-2 text-slate-700">
          Select user to send message
        </p>
      </div>
    </div>
  );
};

export default Home;
