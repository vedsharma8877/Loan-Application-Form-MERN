import {
  Typography, CssBaseline, Switch
} from "@mui/material";
import {ThemeProvider, createTheme} from "@mui/material/styles"
import {useState} from "react";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Navigate from "./components/navigate"
import Form from "./components/form"
import UserDetails from "./components/userDetails"
import { BrowserRouter as Router, Route, Routes} from "react-router-dom";
toast.configure();

const light = {
  palette: {
    mode: "light",
  },
};
const dark = {
  palette: {
    mode: "dark",
  },
};
  const App = () => {
    const [isDarkTheme, setIsDarkTheme] = useState(false);

    const changeTheme = () => {
      setIsDarkTheme(!isDarkTheme);
    };

  return (
    <ThemeProvider theme={isDarkTheme ? createTheme(dark) : createTheme(light)}>
    <CssBaseline />
    <div>
    <Switch checked={isDarkTheme} onChange={changeTheme} />
    <Routes>
    <Route path="/" element={<Navigate />}>
    </Route>
      <Route path="form" element={<Form />}>
      </Route>
      <Route path="user" element={<UserDetails />}>
      </Route>
    </Routes>
    <Typography variant="body1">
      Dark Mode is {isDarkTheme ? "On" : "Off"}
    </Typography>
    </div>
    </ThemeProvider>
  );
};

export default App;
