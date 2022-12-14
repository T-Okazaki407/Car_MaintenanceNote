import { Dispatch, SetStateAction, useEffect, useState } from "react";
import { collection, getDocs, where, query } from "firebase/firestore";
import { onAuthStateChanged } from "firebase/auth";
import db, { auth } from "../firebase";

const useAuth = (
  authAction: boolean,
  setAuthAction: Dispatch<SetStateAction<boolean>>
) => {
  const [uid, setUid] = useState("");
  useEffect(() => {
    if (authAction == true) {
      onAuthStateChanged(auth, (user) => {
        if (user !== null) {
          setUid(user.uid);
          console.log(uid);
        }
      });
      setAuthAction(false);
    }
  }, [authAction]);
  return auth;
};

export default useAuth;
