import React, { useEffect } from "react";
import { Button, ButtonGroup } from "react-bootstrap";
import { useRecoilState, useRecoilValue, useSetRecoilState } from "recoil";
import {
  filteredProjectsState,
  filterTermState,
  projectsState,
  filterCategoriesState,
} from "../../recoil/atoms";

const Filter = () => {
  const categories = useRecoilValue(filterCategoriesState);
  const projects = useRecoilValue(projectsState);
  const [filterTerm, setFilterTerm] = useRecoilState(filterTermState);
  const setFiltredProjects = useSetRecoilState(filteredProjectsState);

  useEffect(() => {
    if (filterTerm.toLowerCase() === "all") {
      setFiltredProjects(projects);
    } else {
      setFiltredProjects(
        projects.filter(
          (project) => project.state.toLowerCase() === filterTerm.toLowerCase()
        )
      );
    }
  }, [filterTerm]);

  return (
    <div className="w-100">
      {categories.length && (
        <ButtonGroup className="my-3 w-100 d-block mx-auto">
          {categories.map((cat) => {
            return (
              <Button
                data-filter={cat}
                className="btn-sm btn text-capitalize mb-1"
                variant="outline-primary"
                active={filterTerm.toLowerCase() === cat.toLowerCase()}
                key={cat}
                onClick={(e) => setFilterTerm(e.currentTarget.dataset.filter)}
              >
                {cat}
              </Button>
            );
          })}
        </ButtonGroup>
      )}
    </div>
  );
};

export default Filter;
