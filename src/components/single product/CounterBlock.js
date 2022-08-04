import React from "react";
import classes from "./CounterBlock.module.css";
import addZero from "../../utils/timeAddZero";

const CounterBlock = ({ name, data }) => {
  return (
    <div className={`${classes.block} rounded p-1 me-3 mt-3`}>
      <div className={`${classes.data} text-center fw-bold`}>
        {" "}
        {addZero(data)}
      </div>
      <div className={`${classes.name} text-dark fw-bold text-center`}>
        {name}
      </div>
    </div>
  );
};

export default CounterBlock;
