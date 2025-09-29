import { Route, Routes } from "react-router-dom";
import Home from "./pages/Home/Home";
import Registration from "./pages/Registration";
import Login from "./pages/Login/Login";
import Rankings from "./pages/Rankings";
import Profile from "./pages/Profile";
import Developers from "./pages/Developers";
import Passing from "./pages/Passing";
import QualifyingResults from "./pages/QualifyingResults";
import AboutOlympiad from "./pages/AboutOlympiad/AboutOlympiad";
import Consent from "./pages/Consent";
import Admin from "./pages/Admin";
import Partners from "./pages/Partners";
import Archive from "./pages/Archive";
import NotFound from "./pages/NotFound";
import OlympiadProfile from "./pages/OlympiadProfile";

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/registration" element={<Registration />} />
        <Route path="/login" element={<Login />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/ranking" element={<Rankings />} />
        <Route path="/qualification" element={<QualifyingResults />} />
        <Route path="/developers" element={<Developers />} />
        <Route path="/passing" element={<Passing />} />
        <Route path="/about" element={<AboutOlympiad />} />
        <Route path="/consent" element={<Consent />} />
        <Route path="/partners" element={<Partners />} />
        <Route path="/admin" element={<Admin />} />
        <Route path="/archive" element={<Archive />} />
        <Route path="/olympiad" element={<OlympiadProfile />} />
        <Route path="/*" element={<NotFound />} />
      </Routes>
    </>
  );
}

export default App;
