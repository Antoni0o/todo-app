import { useRouter } from "next/router";
import { createContext, useEffect, useState } from "react";

import { api } from "../api";
import AuxProps from "../types/AuxProps";
import { User } from "../types/User";

type AuthContextData = {
  signed: boolean;
  user: User | null;
  error: string | null;
  signIn: (email: string, password: string) => Promise<void>;
  signOut: () => void;
};

type AuthResponse = {
  authentication: {
    user: {
      id: string;
      name: string;
      email: string;
      avatar_url: string;
    };
    token: string;
  };
};

export const AuthContext = createContext({} as AuthContextData);

export function AuthProvider(props: AuxProps) {
  const router = useRouter();
  const [user, setUser] = useState<User | null>(null);
  const [error, setError] = useState<string | null>(null);

  async function signIn(email: string, password: string) {
    await api
      .post<AuthResponse>("/user/login", {
        email,
        password,
      })
      .then((res) => {
        const { user, token } = res.data.authentication;

        localStorage.setItem("@todoapp:token", token);
        localStorage.setItem("@todoapp:user", JSON.stringify(user));

        api.defaults.headers.common.Authorization = `Bearer ${token}`;

        setUser(user);

        router.push("/home");
      })
      .catch((err) => {
        setError(err.response.data.message);
      });
  }

  function signOut() {
    router.push("/");

    setUser(null);

    localStorage.removeItem("@todoapp:token");
    localStorage.removeItem("@todoapp:user");
  }

  useEffect(() => {
    const storagedToken = localStorage.getItem("@todoapp:token");
    const storagedUser = localStorage.getItem("@todoapp:user");

    if (storagedToken && storagedUser) {
      setUser(JSON.parse(storagedUser));
      api.defaults.headers.common.Authorization = `Bearer ${storagedToken}`;
    }
  }, []);

  return (
    <AuthContext.Provider
      value={{ signed: Boolean(user), user, error, signIn, signOut }}
    >
      {props.children}
    </AuthContext.Provider>
  );
}
