import React, { useEffect, useState } from "react";
import TimeCounter from "./TimeCounter";
import { useRecoilValue, useRecoilState } from "recoil";
import {
  accountState,
  projectState,
  web3State,
  whitelistContractState,
  whitelistState,
} from "../../recoil/atoms";
import { Button } from "react-bootstrap";
import WhitelistList from "./WhitelistList";

const Whitelist = () => {
  const {
    whitelistStart,
    whitelistEnd,
    _id: id,
    whitelistAddress,
    whitelistAbi,
  } = useRecoilValue(projectState);
  const web3Api = useRecoilValue(web3State);
  const [whitelist, setWhitelist] = useRecoilState(whitelistState);
  const [whitelistIsLoading, setWhitelistIsloading] = useState(false);
  const [joiningIsLoading, setJoiningIsLoading] = useState(false);
  const account = useRecoilValue(accountState);
  const [whitelistContract, setWhitelistContract] = useRecoilState(
    whitelistContractState
  );

  async function getWhitelist() {
    setWhitelist((prevState) => {
      return { ...prevState, isLoading: true };
    });
    const whitelistContractAdd = new web3Api.web3.eth.Contract(
      JSON.parse(whitelistAbi),
      whitelistAddress
    );
    setWhitelistContract(whitelistContract);
    try {
      const whitelist = await whitelistContractAdd.methods
        .getWhitelist()
        .call();
      setWhitelist({ whitelist, isLoading: false });
    } catch (error) {
      setWhitelist((prevState) => {
        return { ...prevState, isLoading: false };
      });
    }
  }

  useEffect(() => {
    if (new Date().getTime() >= new Date(whitelistStart).getTime()) {
      getWhitelist();
    }
  }, []);

  const clickHandler = async () => {
    setJoiningIsLoading(true);
    if (
      new Date().getTime() >= new Date(whitelistStart).getTime() &&
      new Date().getTime() < new Date(whitelistEnd).getTime()
    ) {
      const whitelistContractAdd = new web3Api.web3.eth.Contract(
        JSON.parse(whitelistAbi),
        whitelistAddress
      );
      try {
        await whitelistContractAdd.methods
          .joinWhitelist()
          .send({ from: account });
        setJoiningIsLoading(false);

        getWhitelist();
      } catch (error) {
        console.log(error);
        setJoiningIsLoading(false);
      }
    }
  };
  return (
    <section className="w-100 mx-center mb-2 p-3 border border-primary rounded bg-light  ">
      {new Date().getTime() < new Date(whitelistStart).getTime() && (
        <div className="w-100">
          <h1 className="h3 text-center pt-3">Whitelist comming soon !</h1>{" "}
          <TimeCounter date={whitelistStart} />
        </div>
      )}
      {new Date().getTime() >= new Date(whitelistStart).getTime() &&
        whitelist.isLoading && (
          <span className="text-center h5  ">Loading..</span>
        )}
      {new Date().getTime() >= new Date(whitelistStart).getTime() &&
        new Date().getTime() < new Date(whitelistEnd).getTime() &&
        !whitelist.isLoading &&
        whitelist.whitelist &&
        whitelist.whitelist.includes(account) && (
          <h1 className="h5 text-center ">Your are whitelisted</h1>
        )}
      {new Date().getTime() >= new Date(whitelistStart).getTime() &&
        new Date().getTime() < new Date(whitelistEnd).getTime() &&
        !whitelist.isLoading &&
        whitelist.whitelist &&
        !whitelist.whitelist.includes(account) && (
          <div className="w-100">
            <h1 className="h5 text-center pt-3 mb-3">
              Whitelist is open, join it now !
            </h1>{" "}
            <Button
              variant="primary"
              onClick={clickHandler}
              className="d-block mx-auto my-3"
              disabled={joiningIsLoading}
            >
              {joiningIsLoading ? "Loading..." : "Join whitelist"}
            </Button>
          </div>
        )}
      {new Date().getTime() >= new Date(whitelistStart).getTime() &&
        whitelist.whitelist &&
        !whitelist.isLoading && (
          <WhitelistList whitelist={whitelist.whitelist} />
        )}
      {new Date().getTime() >= new Date(whitelistStart).getTime() &&
        new Date().getTime() < new Date(whitelistEnd).getTime() &&
        whitelist &&
        !whitelist.isLoading && (
          <div className="mt-3">
            <p className="h5 text-center "> Whitelist window will close in :</p>
            <TimeCounter date={whitelistEnd} />
          </div>
        )}
    </section>
  );
};

export default Whitelist;
