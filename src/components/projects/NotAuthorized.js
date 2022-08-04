import React from "react";
import { Button, Modal } from "react-bootstrap";
import { useRecoilValue } from "recoil";
import useWeb3 from "../../hooks/useWeb3";
import { existingWalletState } from "../../recoil/atoms";

const NotAuthorized = (props) => {
  const existingWallet = useRecoilValue(existingWalletState);
  const { connectWallet } = useWeb3();
  return (
    <Modal
      {...props}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Body>
        {existingWallet
          ? "Only connected users can't access project details"
          : "Please install metamask and connect your account"}
      </Modal.Body>
      <Modal.Footer>
        <Button onClick={props.onHide} variant="outline-primary">
          close
        </Button>
        {existingWallet && (
          <Button
            onClick={() => {
              connectWallet();
              props.onHide();
            }}
          >
            Connect Wallet
          </Button>
        )}
        {!existingWallet && (
          <Button onClick={props.onHide}>
            <a
              className="text-light text-decoration-none"
              href="https://metamask.io/"
              target="_blank"
              rel="noreferrer"
            >
              Install metamask
            </a>
          </Button>
        )}
      </Modal.Footer>
    </Modal>
  );
};

export default NotAuthorized;
