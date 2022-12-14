import { Dispatch, SetStateAction, useEffect, useState } from "react";
import { collection, getDocs, where, query } from "firebase/firestore";
import { onAuthStateChanged } from "firebase/auth";
import db, { auth } from "../firebase";
import useAuth from "./useAuth";

const useHistory = (
  historyAction: boolean,
  setHistoryAction: Dispatch<SetStateAction<boolean>>
) => {
  const [uid, setUid] = useState("");
  const [history, setHistory] = useState<any[]>([]);

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        setUid(user.uid);
        console.log(uid);
        if (historyAction == true) {
          const getHistory = async () => {
            const q = query(
              collection(db, "consumptionhistory"),
              where("uid", "==", uid)
            );
            const snapShot = await getDocs(q);

            setHistory(
              snapShot.docs
                .map((doc) => ({
                  ...doc.data(),
                  timestamp: doc.data().timestamp,
                  id: doc.id,
                }))
                .sort((a, b) => b.timestamp - a.timestamp)
            );
            setHistoryAction(false);
            console.log("成功");
          };
          getHistory();
        } else {
          console.log("失敗");
        }
      }
    });
  }, [historyAction]);

  return history;
};

export default useHistory;
