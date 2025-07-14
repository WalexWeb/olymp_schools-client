import { Route, Routes } from "react-router-dom";
import Home from "./pages/Home/Home";
import Registration from "./pages/Registration";
import Login from "./pages/Login/Login";
import Rankings from "./pages/Rankings";
import Profile from "./pages/Profile";
import Olympiads from "./pages/Olympiads";
import Developers from "./pages/Developers";
import Passing from "./pages/Passing";
import QualifyingResults from "./pages/QualifyingResults";

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/registration" element={<Registration />} />
        <Route path="/login" element={<Login />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/olympiads" element={<Olympiads />} />
        <Route path="/ranking" element={<Rankings />} />
        <Route path="/qualification" element={<QualifyingResults />} />
        <Route path="/developers" element={<Developers />} />
        <Route path="/passing" element={<Passing />} />
      </Routes>
    </>
  );
}

export default App;
