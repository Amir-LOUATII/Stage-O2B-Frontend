import React, { useEffect } from "react";
import { Button, Card } from "react-bootstrap";
import { Link } from "react-router-dom";

import classes from "./project.module.css";

const Project = ({
  name,
  teamOfProject: team,
  state,
  description,
  _id: id,
  idoStart,
  whitelistStart,
  whitelistEnd,
  idoEnd,
  tokenName,
}) => {
  return (
    <Card style={{ width: "100%" }}>
      <Card.Header className="position-relative" style={{ height: "40px" }}>
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
          <span className="d-inline-block h5 my-1">Owner:</span>
          <span className="d-inline-block ms-1">{team}</span>
        </Card.Text>
        <Card.Text className="my-1 text-muted">{description}</Card.Text>
        <Card.Text className="my-1 text-muted">
          <span className="d-iniline-block me-2 text-dark fw-bold">
            Token Name:
          </span>
          {tokenName}
        </Card.Text>
        <Card.Text>
          <span className="fw-bold">Whitelist application:</span>
          <span className="d-inline-block ms-2">{`${new Date(
            whitelistStart
          ).getDate()}/${new Date(whitelistStart).getMonth() + 1}/${new Date(
            whitelistStart
          ).getFullYear()}-${new Date(whitelistEnd).getDate()}/${
            new Date(whitelistEnd).getMonth() + 1
          }/${new Date(whitelistEnd).getFullYear()}  `}</span>
        </Card.Text>
        <Card.Text>
          <span className="fw-bold">Whitelist application:</span>
          <span className="d-inline-block ms-2">{`${new Date(
            idoStart.toString()
          ).getDate()}/${new Date(idoStart).getMonth() + 1}/${new Date(
            idoStart
          ).getFullYear()}-${new Date(idoEnd).getDate()}/${
            new Date(idoEnd).getMonth() + 1
          }/${new Date(idoEnd).getFullYear()}  `}</span>
        </Card.Text>
      </Card.Body>
      <Card.Footer>
        <Button className="btn-sm d-block mx-auto" variant="putline-primary">
          <Link to={`/project/${id}`}>Details</Link>
        </Button>
      </Card.Footer>
    </Card>
  );
};

export default Project;
