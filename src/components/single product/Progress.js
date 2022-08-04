import React from "react";
import classes from "./Progress.module.css";

const Progress = ({ tokensToSell, selledAmount }) => {
  return (
    <div>
      <div className="d-flex justify-content-between align-items-center">
        <span className="d-block ms-auto w-100">
          {`${((parseFloat(selledAmount) / tokensToSell) * 100)
            .toFixed(3)
            .toString()}%`}
        </span>
        <span className="d-flex justify-content-end">
          {`${selledAmount}/${tokensToSell}`}
        </span>
      </div>
      <div className={`${classes.empty} mb-3 mt-1 mx-auto`}>
        <div
          className={`${classes.gradient}`}
          style={{
            width: `${(parseFloat(selledAmount) / tokensToSell) * 100}%`,
          }}
        ></div>
      </div>
    </div>
  );
};

export default Progress;
