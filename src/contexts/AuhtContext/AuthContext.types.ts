import { ReactNode } from "react";

export namespace AuthContextTypes {
  export type Props = {
    children: ReactNode;
  };

  export type Context = {
    userId: string;
    username: string;
    setUsername: (username: string) => void;
  };
}
