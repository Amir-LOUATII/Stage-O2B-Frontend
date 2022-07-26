import React from "react";
import { Button, Container } from "react-bootstrap";
import { Link } from "react-router-dom";

const ErrorPage = () => {
  return (
    <section className="min-vh-100 d-flex justify-content-center align-items-center pt-5 pb-3">
      <Container className="h-100">
        <h1 className="text-center">404 </h1>
        <h1 className="h5 text-center">Can't find this page !</h1>
        <Button className="btn-sm btn-primary d-block mx-auto mt-3">
          <Link to={"/"} className="text-decoration-none text-light">
            Back Home
          </Link>
        </Button>
      </Container>
    </section>
  );
};

export default ErrorPage;
