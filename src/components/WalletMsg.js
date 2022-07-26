import React from "react";
import { existingWalletState } from "../recoil/atoms";
import { useRecoilValue } from "recoil";
import { Container } from "react-bootstrap";
import useWeb3 from "../utils/useWeb3";
import { useEffect } from "react";
const WalletMsg = () => {
  const existingWallet = useRecoilValue(existingWalletState);
  const { checkExistingWallet } = useWeb3();
  useEffect(() => {
    checkExistingWallet();
  }, []);
  return (
    <section className="w-100 position-fixed top-0 left-0">
      {!existingWallet && (
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
