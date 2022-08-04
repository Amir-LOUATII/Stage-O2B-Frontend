import Web3 from "web3";
import { account, existingWalletState, web3State } from "../recoil/atoms";
import { useSetRecoilState, useRecoilValue, useRecoilState } from "recoil";
import { useEffect } from "react";
import detectEthereumProvider from "@metamask/detect-provider";
function useWeb3() {
  const existingWallet = useRecoilValue(existingWalletState);
  const setExistingWallet = useSetRecoilState(existingWalletState);
  const [web3, setWeb3] = useRecoilState(web3State);

  //check if letamask is installekd
  useEffect(() => {
    async function loadProvider() {
      const provider = await detectEthereumProvider();
      if (provider) {
        const web3 = new Web3(provider);
        setExistingWallet(true);
        setWeb3((prevState) => ({
          ...prevState,
          web3,
          provider,
          isLoading: false,
        }));
      } else {
        setExistingWallet(false);
        setWeb3((prevState) => ({
          ...prevState,
          isInitialised: true,
          isLoading: false,
        }));
      }
    }
    loadProvider();
  }, []);

  async function connectWallet() {
    if (web3.provider) {
      try {
        // open metamask to connect
        await web3.provider.request({ method: "eth_requestAccounts" });
      } catch (error) {
        window.location.reload();
        console.log(error.message);
      }
    }
  }

  return { connectWallet };
}
export default useWeb3;
