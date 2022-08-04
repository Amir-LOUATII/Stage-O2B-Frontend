import React from "react";
import { Link } from "react-router-dom";
const Name = ({ name }) => {
  return (
    <section className="pt-5 display-6 container-lg">
      <Link to={"/projects"} className="text-decoration-none text-dark">
        Projects{" "}
      </Link>
      /<span className="text-primary">{name}</span>
    </section>
  );
};

export default Name;
