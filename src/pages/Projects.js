import React, { useEffect } from "react";
import useHttp from "../hooks/useHttp.";
import { useRecoilState, useRecoilValue } from "recoil";
import {
  filterCategoriesState,
  filteredProjectsState,
  projectsState,
} from "../recoil/atoms";
import { Col, Container, Row } from "react-bootstrap";
import Project from "../components/projects/Project";
import Filter from "../components/projects/Filter";

const Projects = () => {
  const [projects, setProjects] = useRecoilState(projectsState);
  const [categories, setCategories] = useRecoilState(filterCategoriesState);
  const filteredProjects = useRecoilValue(filteredProjectsState);
  const { isPending, success, sendRequest, error } = useHttp();

  useEffect(() => {
    sendRequest({ url: "http://localhost:5000/api/v1/projects" }, (data) => {
      setProjects(data.projects);
      setCategories([
        "All",
        ...new Set(data.projects.map((project) => project.state)),
      ]);
    });
  }, [sendRequest, setProjects]);
  return (
    <section className="pt-5 pb-3">
      <Container className="pt-3 min-vh-100 pt-4">
        <h1 className="text-center text-muted text-bold mb-3">All projects</h1>
        {isPending && (
          <div className="w-100 h-100 d-flex justify-content-center align-items-center">
            <h1 className="h3">Loading...</h1>
          </div>
        )}
        {error && (
          <div className="w-100 h-100">
            <h1 className="h3">{error}</h1>
          </div>
        )}
        {projects[0] && success && <Filter />}
        {filteredProjects[0] && success && (
          <Row className="gy-4">
            {filteredProjects.map((project) => {
              return (
                <Col sm={6} lg={6} xl={4} key={project["_id"]}>
                  <Project {...project} />
                </Col>
              );
            })}
          </Row>
        )}
        {!filteredProjects.length && success && (
          <h1 className="text-center text-dark h3">There is no projects yet</h1>
        )}
      </Container>
    </section>
  );
};

export default Projects;
