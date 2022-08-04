import React, { useEffect, useState } from "react";
import { Button, Card } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import addZero from "../../utils/timeAddZero";
import classes from "./project.module.css";
import { accountState, existingWalletState } from "../../recoil/atoms";
import { useRecoilValue } from "recoil";
import NotAuthorized from "./NotAuthorized";
import { FiEdit2 } from "react-icons/fi";
import { admin } from "../../data/admin";

const Project = ({
  name,
  teamOfProject: team,
  state,
  _id: id,
  idoStart,
  whitelistStart,
  whitelistEnd,
  idoEnd,
  tokenName,
  tokenSymbol,
  etherscanLink,
  whitePaperLink,
  totalSupply,
  tokensToSell,
}) => {
  const navigate = useNavigate();
  const account = useRecoilValue(accountState);
  const [modalShow, setModalShow] = useState(false);
  const exisitingWallet = useRecoilValue(existingWalletState);
  const clickHandler = () => {
    if (account) {
      navigate(`/project/${id}`);
    } else {
      setModalShow(true);
    }
  };
  return (
    <>
      <Card style={{ width: "100%" }}>
        <Card.Header
          className="position-relative d-flex justify-content-between align-items-center"
          style={{ height: "40px" }}
        >
          <small
            className={
              state === "whitelist soon"
                ? `${classes.tag}   rounded ms-auto bg-secondary text-white`
                : state === "whitelist window opened"
                ? `${classes.tag}  rounded bg-info ms-auto text-light `
                : state === "IDO comming soon"
                ? `${classes.tag} ${classes["upcomming-ido"]} rounded bg-primary text-white ms-auto `
                : state === "IDO in progress"
                ? `${classes.tag}  rounded ms-auto bg-success text-light`
                : `${classes.tag}  rounded ms-auto bg-danger text-light`
            }
          >
            {state}
          </small>
        </Card.Header>
        <Card.Body>
          <Card.Title className="text-capitalize">{name}</Card.Title>
          <Card.Text className="mb-1">
            <span className="d-inline-block fw-bold my-1">Owner:</span>
            <span className="d-inline-block ms-1">{team}</span>
          </Card.Text>

          <Card.Text className="my-1 text-muted">
            <span className="d-iniline-block me-2 text-dark fw-bold">
              Token:
            </span>
            <a
              href={etherscanLink}
              className="text-dark"
              rel="noreferrer"
              target="_blank"
            >
              {tokenName}
            </a>{" "}
            {` "${tokenSymbol}"`}
          </Card.Text>
          <Card.Text className="my-1 text-muted">
            <span className="d-iniline-block me-2 text-dark fw-bold">
              Total supply:
            </span>
            <span>{totalSupply}</span>
          </Card.Text>
          <Card.Text className="my-1 text-muted">
            <span className="d-iniline-block me-2 text-dark fw-bold">
              Tokens to sell in the IDO::
            </span>
            <span>{tokensToSell}</span>
          </Card.Text>
          <Card.Text className="my-1 text-muted">
            <span className="d-iniline-block me-2 text-dark fw-bold">
              Whitepaper:
            </span>
            <a href={whitePaperLink} target="_blank" rel="noreferrer">
              whitepaper
            </a>
          </Card.Text>
          <Card.Text>
            <span className="fw-bold">Whitelist application:</span>
            <span className="d-inline-block ms-2">{`${addZero(
              new Date(whitelistStart).getDate()
            )}/${addZero(new Date(whitelistStart).getMonth() + 1)}/${new Date(
              whitelistStart
            ).getFullYear()} ${addZero(
              new Date(whitelistStart).getHours()
            )}:${addZero(new Date(whitelistStart).getMinutes())} - ${addZero(
              new Date(whitelistEnd).getDate()
            )}/${addZero(new Date(whitelistEnd).getMonth() + 1)}/${new Date(
              whitelistEnd
            ).getFullYear()} ${addZero(
              new Date(whitelistEnd).getHours()
            )}:${addZero(new Date(whitelistEnd).getMinutes())}`}</span>
          </Card.Text>
          <Card.Text>
            <span className="fw-bold">IDO:</span>
            <span className="d-inline-block ms-2">{`${addZero(
              new Date(idoStart).getDate()
            )}/${addZero(new Date(idoStart).getMonth() + 1)}/${addZero(
              new Date(idoStart).getFullYear()
            )} ${addZero(new Date(idoStart).getHours())}:${addZero(
              new Date(idoStart).getMinutes()
            )} -${addZero(new Date(idoEnd).getDate())}/${addZero(
              new Date(idoEnd).getMonth() + 1
            )}/${new Date(idoEnd).getFullYear()} ${addZero(
              new Date(idoEnd).getHours()
            )}:${addZero(new Date(idoEnd).getMinutes())} `}</span>
          </Card.Text>
        </Card.Body>
        <Card.Footer>
          <Button
            className="btn-sm d-block mx-auto"
            variant="outline-primary"
            onClick={clickHandler}
          >
            Details
          </Button>
        </Card.Footer>
      </Card>
      <NotAuthorized show={modalShow} onHide={() => setModalShow(false)} />
    </>
  );
};

export default Project;
