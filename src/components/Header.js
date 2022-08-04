import React from "react";
import { Navbar, Container, Nav, Button, Tooltip } from "react-bootstrap";
import { Link, NavLink } from "react-router-dom";
import { useRecoilValue } from "recoil";
import { accountState, existingWalletState, web3State } from "../recoil/atoms";
import useWeb3 from "../hooks/useWeb3";
import classes from "./Header.module.css";
import useAccount from "../hooks/useAccount";
import { OverlayTrigger } from "react-bootstrap";
import { admin } from "../data/admin";
const Header = () => {
  const account = useRecoilValue(accountState);
  const existingWallet = useRecoilValue(existingWalletState);
  const { connectWallet } = useWeb3();
  const web3 = useRecoilValue(web3State);

  useAccount(web3.web3);
  const renderTooltip = (props) => (
    <Tooltip id="button-tooltip" {...props} className={classes.tooltip}>
      {account}
    </Tooltip>
  );

  return (
    <Navbar
      variant="light"
      expand={"md"}
      collapseOnSelect={true}
      className={
        !existingWallet
          ? ` shadow-sm position-fixed ${classes["header-msg"]}  ${classes.header} left-0 w-100 mx-auto bg-light`
          : ` shadow-sm position-fixed top-0 left-0 w-100 mx-auto bg-light ${classes.header} `
      }
    >
      <Container className="position-relative">
        <Navbar.Brand as={Link} to="/" className="fw-bold ">
          O<span className="text-primary">2</span>B
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="responsive-navbar-nav " />
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="ms-auto text-center w-auto" navbarScroll>
            {
              <>
                <Nav.Link as={NavLink} to="/" eventKey={4}>
                  Home
                </Nav.Link>
                <Nav.Link as={NavLink} to="/about" eventKey={1}>
                  About
                </Nav.Link>
                {account &&
                  web3.web3 &&
                  admin[web3.web3.utils.keccak256(account)] && (
                    <Nav.Link as={NavLink} to="/addproject" eventKey={2}>
                      Add project
                    </Nav.Link>
                  )}
                <Nav.Link as={NavLink} to="/projects" eventKey={2}>
                  Projects
                </Nav.Link>
              </>
            }
          </Nav>
        </Navbar.Collapse>
        {!web3.isLoading && web3.web3 && !account && existingWallet && (
          <Button
            className={`btn btn-primary  btn-sm d-block `}
            onClick={connectWallet}
          >
            Connect Wallet
          </Button>
        )}{" "}
        {!web3.isLoading && account && (
          <Navbar.Text className="ms-3 border p-1 rounded border-dark">
            <span className="text-primary">Connected as :</span>{" "}
            <OverlayTrigger
              placement="left"
              delay={{ show: 250, hide: 400 }}
              overlay={renderTooltip}
            >
              <span className="d-inine-block p-1">
                {account.slice(0, 8)}...
              </span>
            </OverlayTrigger>
          </Navbar.Text>
        )}
      </Container>
    </Navbar>
  );
};

export default Header;
