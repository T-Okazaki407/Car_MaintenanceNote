import { TextField } from "@mui/material";
type propType = {
  password: string;
  setPassword: React.Dispatch<React.SetStateAction<string>>;
};

export const PasswordInput = (props: propType) => {
  const { password, setPassword } = props;
  return (
    <div>
      <TextField
        margin="normal"
        required
        fullWidth
        name="password"
        label="パスワード"
        type="password"
        id="password"
        autoComplete="current-password"
        value={password}
        onChange={(e) => {
          setPassword(e.target.value);
        }}
      />
    </div>
  );
};
