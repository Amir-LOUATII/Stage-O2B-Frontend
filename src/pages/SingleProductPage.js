import React from "react";
import { Container } from "react-bootstrap";
import { useParams } from "react-router-dom";

const SingleProductPage = () => {
  const { id } = useParams();

  return (
    <section className="min-vh-100 pt-5">
      <Container className="py-3">{id}</Container>
    </section>
  );
};

export default SingleProductPage;
