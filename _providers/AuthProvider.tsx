"use client";
import { useRouter } from "next/navigation";
import {
  createContext,
  PropsWithChildren,
  useContext,
  useEffect,
  useState,
} from "react";
import { api, setAuthToken } from "../axios";
import { toast } from "sonner";

type User = {
  id: number;
  username: string;
  email: string;
  image: string;
  profile: {
    id: number;
    about: string;
    avatarImage: string;
    name: string;
    socialMediaURL: string;
    backgroundImage: string;
  };
  bankCard: { id: number };
  donations: {
    id: number;
    amount: number;
    specialMessage: string;
    sender: User;
  }[];
};

type AuthContextType = {
  user?: User;
  signIn: (email: string, password: string) => Promise<void>;
  signUp: (email: string, password: string, username: string) => Promise<void>;
  signOut: () => Promise<void>;
  setUser: (user?: User) => void;
  getUser: () => Promise<void>;
};
const AuthContext = createContext({} as AuthContextType);
export const AuthProvider = ({ children }: PropsWithChildren) => {
  const [user, setUser] = useState<User>();
  const router = useRouter();
  console.log(user);
  const signIn = async (email: string, password: string) => {
    try {
      const { data } = await api.post(`/auth/sign-in`, {
        email,
        password,
      });
      localStorage.setItem("token", data.token);
      setAuthToken(data.token);
      setUser(data.user);
      router.push("/create-profile");
    } catch (error) {
      toast.error("Failed to log in");
    }
  };
  const signUp = async (username: string, email: string, password: string) => {
    try {
      const { data } = await api.post(`/auth/sign-up`, {
        username,
        email,
        password,
      });
      localStorage.setItem("token", data.token);
      setUser(data.user);
      router.push("/sign-in");
    } catch (error) {
      toast.error("Failed to create account.");
    }
  };

  const signOut = async () => {
    localStorage.removeItem("token");
    setUser(undefined);
    router.push("/");
  };

  const getUser = async () => {
    const token = localStorage.getItem("token");
    if (!token) return;

    setAuthToken(token);

    try {
      const { data } = await api.get(`/auth/me`);
      setUser(data);
    } catch (error: any) {
      console.error(error);
      if (error.response?.status === 401) {
        localStorage.removeItem("token");
        setUser(undefined);
      }
    }
  };

  useEffect(() => {
    getUser();
  }, []);
  return (
    <AuthContext.Provider
      value={{ user, signIn, signOut, signUp, setUser, getUser }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
