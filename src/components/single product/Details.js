import React from "react";
import { Card } from "react-bootstrap";
import numberWithCommas from "../../utils/numberWithComma";
import classes from "../projects/project.module.css";
import addZero from "../../utils/timeAddZero";
import { useRecoilValue } from "recoil";
import { projectState } from "../../recoil/atoms";
const Details = () => {
  const {
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
    tokensToSell,
    minInvestment,
    maxInvestment,
    tokenPrice,
    totalSupply,
    whitePaperLink,
    etherscanLink,
  } = useRecoilValue(projectState);
  return (
    <Card className="w-100 mb-3 border-primary">
      <Card.Header className="position-relative" style={{ height: "40px" }}>
        <small
          className={
            state === "whitelist soon"
              ? `${classes.tag}   rounded ms-auto bg-secondary text-white  text-capitalize`
              : state === "whitelist window opened"
              ? `${classes.tag}  rounded bg-info ms-auto text-light  text-capitalize`
              : state === "IDO comming soon"
              ? `${classes.tag} ${classes["upcomming-ido"]} rounded bg-primary text-white ms-auto  text-capitalize`
              : state === "IDO in progress"
              ? `${classes.tag}  rounded ms-auto bg-success text-light text-capitalize`
              : `${classes.tag}  rounded ms-auto bg-danger text-light text-capitalize`
          }
        >
          {state}
        </small>
      </Card.Header>
      <Card.Body>
        <Card.Text className=" mb-1 mt-3">
          <span className="fw-bold me-1 d-inline-block">Project Name:</span>
          <span>{name}</span>
        </Card.Text>
        <Card.Text className=" mb-1 text-capitalize">
          <span className="fw-bold me-1 d-inline-block">Project Team:</span>{" "}
          <span>{team}</span>
        </Card.Text>
        <Card.Text className=" mb-1">
          <span className="fw-bold me-1 d-inline-block">Token: </span>{" "}
          <span>
            {" "}
            <a
              href={etherscanLink}
              target={"_blank"}
              className="text-dark d-inline-block me-2<"
            >
              {tokenName}
            </a>
            {`"${tokenSymbol}"`}
          </span>
        </Card.Text>
        <Card.Text className=" mb-1">
          <span className="fw-bold me-1 d-inline-block">Total Supply: </span>{" "}
          <span>{totalSupply}</span>
        </Card.Text>
        <Card.Text className=" mb-1">
          <span className="fw-bold me-1 d-inline-block">Whitepaper: </span>{" "}
          <a href={whitePaperLink} target="_blank">
            go to whitepaper
          </a>
        </Card.Text>
        <Card.Text className=" mb-1">
          <span className="fw-bold me-1 d-inline-block">Token price: </span>{" "}
          <span>{`${numberWithCommas(tokenPrice)} O2B`}</span>
        </Card.Text>
        <Card.Text className=" mb-1">
          <span className="fw-bold me-1 d-inline-block">Tokens To Sell: </span>{" "}
          <span>{`${numberWithCommas(tokensToSell)} ${tokenSymbol}`}</span>
        </Card.Text>
        <Card.Text className=" mb-1">
          <span className="fw-bold me-1 d-inline-block">
            Minimum investment in O2B:{" "}
          </span>{" "}
          <span>{`${numberWithCommas(minInvestment * tokenPrice)} O2B`}</span>
        </Card.Text>
        <Card.Text className=" mb-1">
          <span className="fw-bold me-1 d-inline-block">
            {`Minimum inevtement in ${tokenSymbol}`}:{" "}
          </span>{" "}
          <span>{`${numberWithCommas(minInvestment)} ${tokenSymbol}`}</span>
        </Card.Text>
        <Card.Text className=" mb-1">
          <span className="fw-bold me-1 d-inline-block">
            Maximum investment in O2B:{" "}
          </span>{" "}
          <span>{`${numberWithCommas(maxInvestment * tokenPrice)} O2B`}</span>
        </Card.Text>
        <Card.Text className=" mb-1">
          <span className="fw-bold me-1 d-inline-block">
            {`Maximum inevtement in ${tokenSymbol}`}:{" "}
          </span>{" "}
          <span>{`${numberWithCommas(maxInvestment)} ${tokenSymbol}`}</span>
        </Card.Text>
        <Card.Text className="mb-1">
          <span className="fw-bold">Whitelist application:</span>
          <span className="d-block ">{`${addZero(
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
          )}:${addZero(new Date(whitelistEnd).getMinutes())}  `}</span>
        </Card.Text>
        <Card.Text>
          <span className="fw-bold">IDO:</span>
          <span className="d-block ">{`${addZero(
            new Date(idoStart).getDate()
          )}/${addZero(new Date(idoStart).getMonth() + 1)}/${addZero(
            new Date(idoStart).getFullYear()
          )} ${addZero(new Date(idoStart).getHours())}:${addZero(
            new Date(idoStart).getMinutes()
          )} -${addZero(new Date(idoEnd).getDate())}/${addZero(
            new Date(idoEnd).getMonth() + 1
          )}/${new Date(idoEnd).getFullYear()}  ${addZero(
            new Date(idoEnd).getHours()
          )}:${addZero(new Date(idoEnd).getMinutes())}   `}</span>
        </Card.Text>
      </Card.Body>
    </Card>
  );
};

export default Details;
