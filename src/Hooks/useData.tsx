import { Dispatch, SetStateAction, useEffect, useState } from "react";
import {
  setDoc,
  doc,
  collection,
  addDoc,
  getDoc,
  query,
  where,
} from "firebase/firestore";
import { onAuthStateChanged } from "firebase/auth";
import db, { auth } from "../firebase";
import useAuth from "./useAuth";

const useData = (
  getDataAction: boolean,
  setGetDataAction: Dispatch<SetStateAction<boolean>>
) => {
  const [uid, setUid] = useState("");
  const [data, setData] = useState<any>([]);

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        setUid(user.uid);

        if (getDataAction == true) {
          const getData = async () => {
            const docSnap = await getDoc(doc(db, "data", uid));
            setData(docSnap.data());
            setGetDataAction(false);
            console.log("成功");
          };
          getData();
        }
      }
    });
  }, [getDataAction]);

  return data;
};

export default useData;
