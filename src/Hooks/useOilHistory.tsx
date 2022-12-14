import { Dispatch, SetStateAction, useEffect, useState } from "react";
import {
  collection,
  getDocs,
  where,
  query,
  orderBy,
  limit,
} from "firebase/firestore";
import { onAuthStateChanged } from "firebase/auth";
import db, { auth } from "../firebase";
import useAuth from "./useAuth";

const useOilHistory = (
  oilHistoryAction: boolean,
  setOilHistoryAction: Dispatch<SetStateAction<boolean>>
) => {
  const [uid, setUid] = useState("");
  const [oilHistory, setOilHistory] = useState<any[]>([]);

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        setUid(user.uid);

        if (oilHistoryAction == true) {
          const getOilHistory = async () => {
            const snapShot = await getDocs(
              query(collection(db, "engineoilhistory"), where("uid", "==", uid))
            );
            setOilHistory(
              snapShot.docs
                .map((doc) => ({
                  ...doc.data(),
                  timestamp: doc.data().timestamp,
                  id: doc.id,
                }))
                .sort((a, b) => b.timestamp - a.timestamp)
            );

            setOilHistoryAction(false);
          };
          getOilHistory();
        } else {
        }
      }
    });
  }, [oilHistoryAction]);

  return oilHistory;
};

export default useOilHistory;
