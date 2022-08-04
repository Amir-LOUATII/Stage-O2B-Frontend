import React from "react";
import { existingWalletState, web3State } from "../recoil/atoms";
import { useRecoilValue } from "recoil";
import useWeb3 from "../hooks/useWeb3";
import { useEffect } from "react";
import classes from "./Header.module.css";
const WalletMsg = () => {
  const existingWallet = useRecoilValue(existingWalletState);
  const web3Api = useRecoilValue(web3State);
  useWeb3();

  return (
    <section className={` ${classes.header} w-100 position-fixed top-0 left-0`}>
      {!existingWallet && !web3Api.isLoading && (
        <div
          className="text-center w-100"
          style={{ height: "30px", backgroundColor: "#5c99f3" }}
        >
          <span className="d-inline-block me-1">Please install </span>
          <a
            href="https://metamask.io/"
            target="_blank"
            rel="noreferrer"
            className="text-dark fw-bold"
          >
            Metamask
          </a>
        </div>
      )}
    </section>
  );
};

export default WalletMsg;
