import React, { useEffect, useState } from "react";
import { Row } from "react-bootstrap";
import { Col } from "react-bootstrap";
import { Container } from "react-bootstrap";
import { useParams } from "react-router-dom";
import Description from "../components/single product/Description";
import Details from "../components/single product/Details";
import Ido from "../components/single product/Ido";
import Name from "../components/single product/Name";
import TimeCounter from "../components/single product/TimeCounter";
import Whitelist from "../components/single product/Whitelist";
import UseHttp from "../hooks/useHttp.";
import ErrorPage from "../pages/ErrorPage";
import { useRecoilState } from "recoil";
import { projectState } from "../recoil/atoms";

const SingleProductPage = () => {
  const { id } = useParams();
  const { isPending, success, sendRequest, error } = UseHttp();
  const [project, setProject] = useRecoilState(projectState);

  useEffect(() => {
    sendRequest(
      { url: `http://localhost:5000/api/v1/projects/${id}` },
      (data) => {
        setProject(data.project);
      }
    );
  }, [id]);

  if (isPending) {
    return (
      <Container className="min-vh-100 d-flex justify-content-center align-items-center">
        {<h1 className="text-center">Loading...</h1>}
      </Container>
    );
  }
  if (error) {
    return <ErrorPage />;
  }
  if (success && project) {
    return (
      <section className="pt-3">
        <Name name={project.name} />
        <Container
          fuild="lg"
          className="py-3 h-100  justify-content-center align-items-center  min-vh-100 pt-3 "
        >
          <Row className=" h-100 w-100">
            <Col
              md={12}
              xl={5}
              className=" d-flex justify-content-evenly align-items-center flex-column"
            >
              <Details />
              <Description description={project.description} />
            </Col>
            <Col md={12} xl={7} className="pt-3">
              <Whitelist />
              <Ido />
            </Col>
          </Row>
        </Container>
      </section>
    );
  }
  return <></>;
};

export default SingleProductPage;
