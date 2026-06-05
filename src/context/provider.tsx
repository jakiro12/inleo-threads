import {
  createContext,
  useContext,
  useEffect,
  useState,
  type ReactNode,
} from "react";
import { loginWithKeychain } from "../components/login-extension";

type AuthContextType = {
  username: string;
  setUsername: (username: string) => void;
  isAuthenticated: boolean;
  login: (username: string) => Promise<boolean>;
  logout: () => void;
};

export const UserContext =
  createContext<AuthContextType | undefined>(
    undefined
  );

export const UserProvider = ({
  children,
}: {
  children: ReactNode;
}) => {
  const [username, setUsernameState] =
    useState("");

  const [isAuthenticated, setIsAuthenticated] =
    useState(false);

  useEffect(() => {
    const savedUser =
      localStorage.getItem("hive_username");

    if (savedUser) {
      setUsernameState(savedUser);
      setIsAuthenticated(true);
    }
  }, []);

  const setUsername = (username: string) => {
    setUsernameState(username);
  };

 const login = async (
  username: string
): Promise<boolean> => {
  const success =
    await loginWithKeychain(username);

  if (!success) {
    return false;
  }

  setUsernameState(username);
  setIsAuthenticated(true);

  localStorage.setItem(
    "hive_username",
    username
  );

  return true;
};

  const logout = () => {
    localStorage.removeItem(
      "hive_username"
    );

    setUsernameState("");
    setIsAuthenticated(false);
  };

  return (
    <UserContext.Provider
      value={{
        username,
        setUsername,
        isAuthenticated,
        login,
        logout,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => {
  const context =
    useContext(UserContext);

  if (!context) {
    throw new Error(
      "useUser debe utilizarse dentro de UserProvider"
    );
  }

  return context;
};