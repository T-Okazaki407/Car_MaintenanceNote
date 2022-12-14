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

const useOilData = (
  oilDataAction: boolean,
  setOilDataAction: Dispatch<SetStateAction<boolean>>
) => {
  const [uid, setUid] = useState("");
  const [oilData, setOilData] = useState<any>([]);

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        setUid(user.uid);
        if (oilDataAction == true) {
          console.log("動いてる");
          const getData = async () => {
            const docSnap = await getDoc(doc(db, "data", uid));
            setOilData(docSnap.data());
            console.log("成功");
            setOilDataAction(false);
          };
          getData();
        }
      }
    });
  }, [oilDataAction]);

  return oilData;
};

export default useOilData;
