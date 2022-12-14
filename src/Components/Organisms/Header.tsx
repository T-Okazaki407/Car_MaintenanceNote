import {
  Toolbar,
  IconButton,
  Typography,
  Drawer,
  List,
  Box,
  ListItemButton,
  ListItemText,
} from "@mui/material";
import AppBar from "@mui/material/AppBar";
import MenuIcon from "@mui/icons-material/Menu";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useLogout } from "../../Hooks/useLogout";

export const Header: React.FC = () => {
  const navigate = useNavigate();
  const [state, setState] = useState({
    left: false,
  });
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [open, setOpen] = useState(false);
  const { logout } = useLogout();

  const toggleDrawer =
    (left: "left", open: boolean) =>
    (event: React.KeyboardEvent | React.MouseEvent) => {
      if (
        event.type === "keydown" &&
        ((event as React.KeyboardEvent).key === "Tab" ||
          (event as React.KeyboardEvent).key === "Shift")
      ) {
        return;
      }

      setState({ ...state, [left]: open });
    };

  const handleLogout = () => {
    logout();
    setOpen(true);
    setAnchorEl(null);
    setTimeout(() => {
      navigate("/");
    }, 2000);
  };

  return (
    <AppBar position="static">
      <Toolbar>
        {(["left"] as const).map((left) => (
          <React.Fragment key={left}>
            <IconButton
              size="large"
              edge="start"
              color="inherit"
              aria-label="menu"
              sx={{ mr: 2 }}
              onClick={toggleDrawer(left, true)}
            >
              <MenuIcon />
            </IconButton>
            <Drawer
              anchor={left}
              open={state[left]}
              onClose={toggleDrawer(left, false)}
            >
              <Box>
                <List>
                  <ListItemButton
                    onClick={() => {
                      navigate("/MainMenu");
                    }}
                  >
                    <ListItemText
                      primaryTypographyProps={{
                        color: "#5aff19",
                        fontWeight: "medium",
                        variant: "body2",
                      }}
                    >
                      メインメニュー
                    </ListItemText>
                  </ListItemButton>
                  <ListItemButton
                    onClick={() => {
                      navigate("/Consumption");
                    }}
                  >
                    <ListItemText
                      primaryTypographyProps={{
                        color: "#5aff19",
                        fontWeight: "medium",
                        variant: "body2",
                      }}
                    >
                      燃費
                    </ListItemText>
                  </ListItemButton>
                  <ListItemButton
                    onClick={() => {
                      navigate("/EngineOil");
                    }}
                  >
                    <ListItemText
                      primaryTypographyProps={{
                        color: "#5aff19",
                        fontWeight: "medium",
                        variant: "body2",
                      }}
                    >
                      エンジンオイル
                    </ListItemText>
                  </ListItemButton>
                  <ListItemButton onClick={handleLogout}>
                    <ListItemText
                      primaryTypographyProps={{
                        color: "#ff",
                        fontWeight: "medium",
                        variant: "body2",
                      }}
                    >
                      ログアウト
                    </ListItemText>
                  </ListItemButton>
                </List>
              </Box>
            </Drawer>
          </React.Fragment>
        ))}
        <Typography
          variant="h6"
          component="div"
          sx={{ flexGrow: 1 }}
          color="#5aff19"
          align="center"
        >
          車のメンテナンスノート（仮）
        </Typography>
        {/* <Button color="inherit">設定</Button> */}
      </Toolbar>
    </AppBar>
  );
};
