import {
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  TextField,
  DialogActions,
  InputAdornment,
  MenuItem,
  Select,
  FormControl,
  InputLabel,
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
  updateDoc,
  getDoc,
  query,
  where,
} from "firebase/firestore";
import useOilHistory from "../../Hooks/useOilHistory";

export const InputChangeEngineOil = (props: any) => {
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);
  const [date, setDate] = useState("");
  const [element, setElement] = useState("");
  const [distance, setDistance] = useState<number>();
  const [uid, setUid] = useState("");
  const { oilHistoryAction, setOilHistoryAction } = props;
  const { getDataAction, setGetDataAction } = props;

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user !== null) {
        setUid(user.uid);
        setDate(formatday);
      }
    });
  }, [open]);

  const today = new Date();
  const todaynumber = `${today.getTime()}`;
  const formatday = `${today.getFullYear()}年${
    today.getMonth() + 1
  }月${today.getDate()}日`;

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleAdd = async () => {
    if (auth.currentUser !== null) {
      if (element !== "" && distance !== undefined) {
        const addDistance = await updateDoc(doc(db, "data", uid), {
          lastoilchange: distance,
          lastoilchangedate: today,
          totaldistance: distance,
        });
        const oilSnapshot = await addDoc(collection(db, "engineoilhistory"), {
          date: date,
          element: element,
          distance: distance,
          uid: uid,
          timestamp: todaynumber,
        });
        console.log(addDistance);
        console.log(oilSnapshot);
        setOilHistoryAction(true);
        setGetDataAction(true);
        if (oilSnapshot) {
          console.log("成功");
        } else {
          console.log("失敗");
        }
        setOpen(false);
      } else {
        alert("全ての欄を記入してください。");
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
        オイル交換したらタップ！
      </Button>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle color="#5aff19">情報入力</DialogTitle>
        <DialogContent>
          <DialogContentText>
            エレメント交換を行ったかを選択し、現在の自車のODOメーターの値を入力してください。
          </DialogContentText>
          <FormControl variant="standard" fullWidth>
            <InputLabel>エレメント交換</InputLabel>
            <Select
              labelId="demo-simple-select-standard-label"
              id="demo-simple-select-standard"
              value={element}
              label="Age"
              onChange={(e) => {
                setElement(e.target.value);
              }}
            >
              <MenuItem value={""}>選択してください</MenuItem>
              <MenuItem value={"交換"}>交換した</MenuItem>
              <MenuItem value={"未交換"}>交換してない</MenuItem>
            </Select>
          </FormControl>
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
