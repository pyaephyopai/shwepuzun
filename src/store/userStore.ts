import { create } from "zustand";
import { devtools, persist } from "zustand/middleware";
import { logOut } from "../api/auth/auth";

interface User {
  id: number;
  name: string;
  email: string;
  address: string;
  phone: string;
  region: string;
}

interface UserStore {
  logInUser: boolean;
  userData: User | undefined;
  token: string;
  role: string;

  setLogInUser: (logInUser: boolean) => void;
  setUserData: (user: User) => void;
  setRole: (role: string) => void;
  setToken: (token: string) => void;

  logOut: () => void;
}

export const userStore = create<UserStore>()(
  devtools(
    persist<UserStore>(
      (set) => ({
        logInUser: false,
        userData: undefined,
        token: "",
        role: "",
        setLogInUser: (logInUser: boolean) => set({ logInUser: logInUser }),
        setUserData: (user: User) => set({ userData: user }),
        setRole: (role: string) => set({ role: role }),
        setToken: (token: string) => set({ token: token }),

        logOut: async () => {
          await logOut().then((response) => {
            if (response.data.code === 200) {
              set(() => ({
                logInUser: false,
                userData: undefined,
                token: "",
                role: "",
              }));
            }
          });
        },
      }),
      {
        name: "userStore",
      }
    )
  )
);
