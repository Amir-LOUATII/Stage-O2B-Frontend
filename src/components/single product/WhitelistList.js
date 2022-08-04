import React from "react";
import classes from "./WhitelistList.module.css";
const WhitelistList = ({ whitelist }) => {
  return (
    <div>
      <p className="text-center text-muted h5 text-capitalize">
        {" "}
        whitelisted address ({whitelist.length})
      </p>
      <div className={`${classes.list} p-2`}>
        {whitelist.length != 0 &&
          whitelist.map((address) => (
            <article
              className="mb-3 bg-white p-1 rounded mb-3"
              key={address}
            >{`${address}`}</article>
          ))}
        {!whitelist.length && (
          <p className=" text-muted p-1">
            There is no address in this project whitelist
          </p>
        )}
      </div>
    </div>
  );
};

export default WhitelistList;
