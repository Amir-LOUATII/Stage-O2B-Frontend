import React from "react";
import { Card } from "react-bootstrap";

const Description = ({ description }) => {
  return (
    <Card className="w-100 border-primary">
      <Card.Body>{description}</Card.Body>
    </Card>
  );
};

export default Description;
