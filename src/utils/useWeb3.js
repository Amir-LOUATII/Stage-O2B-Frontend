import Web3 from "web3";
import { existingWalletState, web3State } from "../recoil/atoms";
import { useSetRecoilState, useRecoilValue } from "recoil";
function useWeb3() {
  const existingWallet = useRecoilValue(existingWalletState);
  const setExistingWallet = useSetRecoilState(existingWalletState);
  const setWeb3 = useSetRecoilState(web3State);
  async function checkExistingWallet() {
    if (!window.ethereum && !window.ethereum.isMetaMask) {
      setExistingWallet(false);
    } else {
      setExistingWallet(true);
      const web3 = new Web3(window.ethereum);
      setWeb3(web3);
    }
  }
  async function connectWallet() {
    try {
      // open metamask to connect
      await window.ethereum.request({ method: "eth_requestAccounts" });
    } catch (error) {
      window.location.reload();
      console.log(error.message);
    }
  }

  return { checkExistingWallet, connectWallet };
}
export default useWeb3;
