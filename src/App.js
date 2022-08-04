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
import { accountState, web3State } from "./recoil/atoms";
import { useRecoilValue } from "recoil";
import { admin } from "./data/admin";
import useAccount from "./hooks/useAccount";

function App() {
  const web3 = useRecoilValue(web3State);
  const account = useRecoilValue(accountState);
  useAccount(web3.web3);
  return (
    <>
      <WalletMsg />
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/projects" element={<Projects />} />
        <Route
          path="/addproject"
          element={
            account &&
            web3.web3 &&
            admin[web3.web3.utils.keccak256(account)] ? (
              <AddProject />
            ) : (
              <Home />
            )
          }
        />
        <Route
          path="/project/:id"
          element={account ? <SingleProductPage /> : <Home />}
        />
        <Route path="*" element={<ErrorPage />} />
      </Routes>
    </>
  );
}

export default App;
