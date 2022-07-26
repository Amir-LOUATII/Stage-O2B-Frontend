import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import "bootstrap/dist/css/bootstrap.min.css";
import Projects from "./pages/Projects";
import AddProject from "./pages/AddProject";
import About from "./pages/About";
import Header from "./components/Header";
import ErrorPage from "./pages/ErrorPage";
import SingleProductPage from "./pages/SingleProductPage";
import WalletMsg from "./components/WalletMsg";

function App() {
  return (
    <>
      <WalletMsg />
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/projects" element={<Projects />} />
        <Route path="/addproject" element={<AddProject />} />
        <Route path="/project/:id" element={<SingleProductPage />} />
        <Route path="*" element={<ErrorPage />} />
      </Routes>
    </>
  );
}

export default App;
