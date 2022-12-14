import { TextField } from "@mui/material";
type propType = {
  email: string;
  setEmail: React.Dispatch<React.SetStateAction<string>>;
};

export const EmailInput = (props: propType) => {
  const { email, setEmail } = props;
  return (
    <div>
      <TextField
        margin="normal"
        required
        fullWidth
        id="email"
        label="メールアドレス"
        name="email"
        autoComplete="email"
        autoFocus
        value={email}
        onChange={(e) => {
          setEmail(e.target.value);
        }}
      />
    </div>
  );
};
