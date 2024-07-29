import { createContext, useState, useEffect } from 'react';
import io from 'socket.io-client';

export const SocketContext = createContext(null);

export const SocketProvider = ({ children, token }) => {
    const [socket, setSocket] = useState(null);

    useEffect(() => {
        if (token) {
            const newSocket = io(import.meta.env.VITE_BACKEND_URL, {
                auth: { token },
            });
            setSocket(newSocket);

            return () => {
                newSocket.disconnect();
            };
        }
    }, [token]);

    return (
        <SocketContext.Provider value={{ socket }}>
            {children}
        </SocketContext.Provider>
    );
};
