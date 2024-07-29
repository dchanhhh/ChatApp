import { Outlet } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import { useSelector } from "react-redux";
import { SocketProvider } from './contexts/SocketContext';
import "./App.css";

function App() {
  const token = useSelector((state) => state.user.token);

  return (
    <SocketProvider token={token}>
      <>
        <Toaster />
        <main>
          <Outlet />
        </main>
      </>
    </SocketProvider>
  );
}

export default App;
