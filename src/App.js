import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import "./App.css";
import Login from "./Pages/Public/LoginPage/Login";
import Signup from "./Pages/Public/SignUp/Signup";
import Dashboard from "./Pages/Private/Dashboard/Dashboard";
import ForgotPassword from "./Pages/Public/ForgotPassword/ForgotPassword";
import ResetPassword from "./Pages/Public/ResetPassword/ResetPassword";
import OTP from "./Pages/Public/OTP/Otp";
import Roster from "./Components/Dashboard/Roster/roster";
import DugoutLineup from "./Components/Dashboard/DugOutLineUp/dugOutLineup";
import UmpireLineUp from "./Components/Dashboard/UmpireLineUp/umpireLineup";
import BPSchedule from "./Components/Dashboard/BPSSchedule/BPSchedule";
import Configuration from "./Components/Dashboard/Configuration/configuration";
import CssBaseline from "@mui/material/CssBaseline";
import { MuiThemeProvider, createTheme } from "@material-ui/core/styles";
import { SnackbarProvider } from "notistack";

const theme = createTheme({
  palette: {
    secondary: {
      main: "#ff0000",
    },
    primary: {
      main: "#00ff00",
    },
  },
});

function App() {
  return (
    <div className="App">
      <SnackbarProvider>
        <MuiThemeProvider theme={theme}>
          <CssBaseline />
          <Router>
            <Routes>
              <Route path="/dashboard" element={<Dashboard />}>
                <Route path="roster" element={<Roster />}></Route>
                <Route path="dugout" element={<DugoutLineup />}></Route>
                <Route path="umpire" element={<UmpireLineUp />}></Route>
                <Route path="bpschedule" element={<BPSchedule />}></Route>
                <Route path="settings" element={<Configuration />}></Route>
              </Route>
              <Route path="/" element={<Login />} />
              <Route path="/signup" element={<Signup />} />
              <Route path="/forgot-password" element={<ForgotPassword />} />
              <Route path="/reset-password" element={<ResetPassword />} />
              <Route path="/otp" element={<OTP />} />
            </Routes>
          </Router>
        </MuiThemeProvider>
      </SnackbarProvider>
    </div>
  );
}

export default App;
