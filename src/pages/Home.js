import React from "react";
import { Button, Container } from "react-bootstrap";
import { Link } from "react-router-dom";

const Home = () => {
  return (
    <section className="d-flex justify-content-center align-items-center min-vh-100">
      <Container className="container-lg">
        {" "}
        <h1 className="fs-bold">
          Welcome to <span className="text-primary">O2B</span> Launchpad
        </h1>
        <p>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Magnam
          laboriosam quaerat, ipsum maiores non ipsam? Fugiat alias adipisci
          tempora maiores expedita delectus vitae, magni labore eius, non vel
          repudiandae voluptate.
        </p>
        <Button className="d-block mt-5 mx-auto btn btn-primary">
          <Link to={"/projects"} className="text-decoration-none text-light">
            All Projects
          </Link>
        </Button>
      </Container>
    </section>
  );
};

export default Home;
