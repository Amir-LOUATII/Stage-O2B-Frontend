import { useEffect } from "react";
import { accountState } from "../recoil/atoms";
import { useSetRecoilState } from "recoil";

const useAccount = (web3) => {
  const setAccount = useSetRecoilState(accountState);
  const getAccount = async () => {
    if (web3) {
      const accounts = await web3.eth.getAccounts();
      setAccount(accounts[0]);
    }
  };
  useEffect(() => {
    getAccount();
  }, [web3]);

  useEffect(() => {
    if (window.ethereum) {
      window.ethereum.on("accountsChanged", async () => {
        window.location.reload();
        getAccount();
      });
      window.ethereum.on("chainChanged", (chainId) => {
        window.location.reload();
        getAccount();
      });
    }
  }, []);
};

export default useAccount;
