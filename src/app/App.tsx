import { Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import Registration from "./pages/Registration";
import Login from "./pages/Login";
import News from "./pages/News";
import Rankings from "./pages/Rankings";
import Profile from "./pages/Profile";
import Olympiads from "./pages/Olympiads";
import Settings from "./pages/Settings";

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/registration" element={<Registration />} />
        <Route path="/login" element={<Login />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/olympiads" element={<Olympiads />} />
        <Route path="/news" element={<News />} />
        <Route path="/ranking" element={<Rankings />} />
        <Route path="/settings" element={<Settings />} />
      </Routes>
    </>
  );
}

export default App;
