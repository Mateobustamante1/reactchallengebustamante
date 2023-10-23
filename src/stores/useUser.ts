import { create } from "zustand";
import { persist } from "zustand/middleware";
interface UserProps {
  name: string;
  setName: (name: string) => void;
}

export const useUser = create(
  persist<UserProps>(
    (set) => ({
      name: "",
      setName: (name) => set(() => ({ name })),
    }),
    { name: "user-storage" }
  )
);
