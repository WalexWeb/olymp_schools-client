import { Route, Routes } from "react-router-dom";
import Registration from "./pages/Registration";
import StartPage from "./pages/Home";

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<StartPage />} />
        <Route path="/registration" element={<Registration />} />
      </Routes>
    </>
  );
}

export default App;
