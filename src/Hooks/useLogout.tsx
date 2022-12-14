import { signOut } from "firebase/auth";
import { auth } from "../firebase";

export const useLogout = () => {
  const logout = () => {
    signOut(auth)
      .then(() => {
        console.log("Sign-out successful.");
      })
      .catch((err: { message: any }) => {
        console.log(err.message);
      });
  };

  return { logout };
};
