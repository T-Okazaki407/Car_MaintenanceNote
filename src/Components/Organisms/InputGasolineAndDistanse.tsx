import {
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  TextField,
  DialogActions,
  InputAdornment,
} from "@mui/material";
import { useEffect, useState } from "react";
import db, { auth } from "../../firebase";
import { useNavigate } from "react-router-dom";
import { onAuthStateChanged } from "firebase/auth";
import {
  setDoc,
  doc,
  collection,
  addDoc,
  getDoc,
  query,
  where,
  updateDoc,
} from "firebase/firestore";
import useHistory from "../../Hooks/useHistory";
import useData from "../../Hooks/useData";

export const InputGasolineAndDistanse = (props: any) => {
  const { historyAction, setHistoryAction } = props;
  const { getDataAction, setGetDataAction } = props;
  const navigate = useNavigate();
  const [startdistance, setStartdistance] = useState<number>();
  const [open, setOpen] = useState(false);
  const [date, setDate] = useState("");
  const [gasoline, setGasoline] = useState<number>();
  const [resentGasoline, setResentGasoline] = useState<number>();
  const [distance, setDistance] = useState<number>();
  const [uid, setUid] = useState("");

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        setUid(user.uid);
        setDate(formatday);
        console.log(formatday);
      }
    });
  }, [open]);

  const today = new Date();
  const todaynumber = `${today.getTime()}`;
  const formatday = `${today.getFullYear()}年${
    today.getMonth() + 1
  }月${today.getDate()}日`;

  const handleClickOpen = async () => {
    const docSnap = await getDoc(doc(db, "data", uid));
    if (docSnap.exists()) {
      setResentGasoline(docSnap.data().totalgasoline);
      console.log(resentGasoline);
    } else {
      console.log("No such document");
    }
    setOpen(true);
  };

  const handleClose = async () => {
    setOpen(false);
  };

  const handleAdd = async () => {
    if (auth.currentUser !== null) {
      if (gasoline && distance && resentGasoline !== undefined) {
        const snapShot = await addDoc(collection(db, "consumptionhistory"), {
          date: date,
          gasoline: gasoline,
          distance: distance,
          uid: uid,
          timestamp: todaynumber,
        });
        const addDistance = await updateDoc(doc(db, "data", uid), {
          totaldistance: distance,
          totalgasoline: resentGasoline + gasoline,
        });

        console.log(addDistance);
        console.log(snapShot);
        if (snapShot) {
          setHistoryAction(true);
          setGetDataAction(true);
          console.log("成功");
        } else {
          console.log("失敗");
        }
        setOpen(false);
      } else {
        alert("全ての欄を記入してください。");
        console.log(gasoline, distance, resentGasoline);
      }
    }
  };

  return (
    <div>
      <Button
        fullWidth
        variant="contained"
        sx={{ mt: 0, mb: 0 }}
        onClick={handleClickOpen}
        size="large"
      >
        給油したらタップ！
      </Button>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle color="#5aff19">情報入力</DialogTitle>
        <DialogContent>
          <DialogContentText>
            今回給油したガソリンの量と、現在の自車のODOメーターの値を入力してください。
          </DialogContentText>
          <TextField
            autoFocus
            margin="dense"
            id="name"
            label="ガソリンの量"
            type="number"
            fullWidth
            variant="standard"
            InputProps={{
              endAdornment: <InputAdornment position="end">L</InputAdornment>,
            }}
            onChange={(e) => {
              setGasoline(Number(e.target.value));
            }}
          />
          <TextField
            autoFocus
            margin="dense"
            id="name"
            label="ODOメーターの値"
            type="number"
            fullWidth
            variant="standard"
            InputProps={{
              endAdornment: <InputAdornment position="end">km</InputAdornment>,
            }}
            onChange={(e) => {
              setDistance(Number(e.target.value));
            }}
          />
        </DialogContent>
        <DialogActions>
          <Button color="error" onClick={handleClose}>
            キャンセル
          </Button>
          <Button onClick={handleAdd}>登録</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};
