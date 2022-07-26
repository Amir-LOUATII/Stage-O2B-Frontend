import React from "react";
import { Navbar, Container, Nav, Button } from "react-bootstrap";
import { Link, NavLink } from "react-router-dom";
import { useRecoilValue } from "recoil";
import { existingWalletState } from "../recoil/atoms";
import classes from "./Header.module.css";
const Header = () => {
  const existingWallet = useRecoilValue(existingWalletState);
  return (
    <Navbar
      variant="light"
      expand={"md"}
      collapseOnSelect={true}
      className={
        !existingWallet
          ? ` shadow-sm position-fixed ${classes["header-msg"]} left-0 w-100 mx-auto bg-light`
          : ` shadow-sm position-fixed top-0 left-0 w-100 mx-auto bg-light`
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
                <Nav.Link as={NavLink} to="/projects" eventKey={2}>
                  Projects
                </Nav.Link>
                <Nav.Link as={NavLink} to="/addproject" eventKey={2}>
                  Add project
                </Nav.Link>
              </>
            }
          </Nav>
        </Navbar.Collapse>
        <Button className={`btn btn-primary  btn-sm d-block `}>
          Connect Wallet
        </Button>
      </Container>
    </Navbar>
  );
};

export default Header;
