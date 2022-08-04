import React, { useEffect, useState } from "react";
import TimeCounter from "./TimeCounter";
import { useRecoilValue, useRecoilState, useSetRecoilState } from "recoil";
import {
  accountState,
  idoContractState,
  platformTokenContractState,
  projectState,
  web3State,
  whitelistState,
} from "../../recoil/atoms";
import Progress from "./Progress";
import { Button } from "react-bootstrap";
import IdoForm from "./IdoForm";

const Ido = () => {
  const {
    idoStart,
    idoEnd,
    idoAbi,
    idoAddress,
    tokensToSell,
    platformToken,
    platformTokenAbi,
    tokenSymbol,
  } = useRecoilValue(projectState);
  const account = useRecoilValue(accountState);
  const web3Api = useRecoilValue(web3State);
  const [participated, setParticipated] = useState(null);
  const [raisedAmount, setRaisedAmount] = useState(null);
  const [notSelledTokens, setNotSelledTokens] = useState();
  const [idoIsLoading, setIdoIsLoading] = useState(null);
  const [modalShow, setModalShow] = useState(false);
  const [currentUserBalance, setCurrentUserBalance] = useState(null);
  const [idoContract, setIdoContract] = useRecoilState(idoContractState);
  const setPlatformContract = useSetRecoilState(platformTokenContractState);
  const whitelist = useRecoilValue(whitelistState);

  useEffect(() => {
    const getData = async () => {
      //start loading
      setIdoIsLoading(true);
      //get ido contract address
      try {
        const idoContractAddress = new web3Api.web3.eth.Contract(
          JSON.parse(idoAbi),
          idoAddress
        );
        setIdoContract(idoContractAddress);
        //get ido contract
        const platformTokenContract = new web3Api.web3.eth.Contract(
          JSON.parse(platformTokenAbi),
          platformToken
        );
        setPlatformContract(platformTokenContract);
        const participation = await idoContractAddress.methods
          .participants(account)
          .call();

        participation != 0
          ? setParticipated(participation)
          : setParticipated(0);

        const selledTokens = await idoContractAddress.methods
          .selledTokens()
          .call();

        const notSelledTokens = await idoContractAddress.methods
          .notSelledTokens()
          .call();
        const balance = await platformTokenContract.methods
          .balanceOf(account)
          .call();
        const decimals = await platformTokenContract.methods.decimals().call();
        setCurrentUserBalance(balance / 10 ** decimals);
        setRaisedAmount(selledTokens);
        setNotSelledTokens(notSelledTokens);
        setIdoIsLoading(false);
      } catch (error) {
        setIdoIsLoading(false);
        console.log(error);
      }
    };
    if (new Date().getTime() >= new Date(idoStart).getTime()) {
      getData();
    }
  }, []);

  return (
    <section className="w-100 mx-center mb-2 p-3 bg-light w-100 border border-primary rounded">
      {(idoIsLoading || whitelist.isLoading) && (
        <h1 className="h5 text-center"> Loading...</h1>
      )}
      {new Date().getTime() < new Date(idoStart).getTime() &&
        !(idoIsLoading || whitelist.isLoading) && (
          <div className="">
            <h1 className="h3 text-center pt-3">IDO comming soon !</h1>{" "}
            <small className="text-danger my-1 text-center d-block">
              Don't forget to join whitelist, only whitelisted user could
              participate to the IDO!
            </small>
            <TimeCounter date={idoStart} />
          </div>
        )}
      {new Date().getTime() >= new Date(idoStart).getTime() &&
        new Date().getTime() < new Date(idoEnd).getTime() &&
        !idoIsLoading && (
          <>
            <div>
              {" "}
              {whitelist.whitelist &&
                !whitelist.whitelist.includes(account) && (
                  <h1 className="h5 text-center ">
                    Only whitelisted users can particpate to the IDO!
                  </h1>
                )}
              <h1 className="h5 text-center pt-3">IDO in progress !</h1>
              {whitelist.whitelist &&
                whitelist.whitelist.includes(account) &&
                participated == 0 && (
                  <>
                    <Button
                      variant="primary"
                      className="d-block mx-auto"
                      onClick={() => setModalShow(true)}
                    >
                      Participate
                    </Button>
                    <IdoForm
                      show={modalShow}
                      onHide={() => setModalShow(false)}
                      balance={currentUserBalance}
                    />
                  </>
                )}
              {whitelist.whitelist &&
                whitelist.whitelist.includes(account) &&
                participated != 0 && (
                  <p className=" text-center text-muted my-3">
                    {` You have participated to the ido,you have bought ${participated} ${tokenSymbol}`}
                  </p>
                )}
              <Progress
                selledAmount={raisedAmount}
                tokensToSell={tokensToSell}
              />
            </div>
          </>
        )}
      {new Date().getTime() >= new Date(idoStart).getTime() &&
        new Date().getTime() < new Date(idoEnd).getTime() &&
        !idoIsLoading && (
          <div className="mt-3">
            <p className="h5 text-center "> IDO will close in :</p>
            <TimeCounter date={idoEnd} />
          </div>
        )}
      {new Date().getTime() > new Date(idoEnd).getTime() &&
        !idoIsLoading &&
        !whitelist.isLoading && (
          <>
            <h1 className="h2 text-center">IDO is finished</h1>
            <p>{`The raised amount is ${raisedAmount} O2B`}</p>
          </>
        )}
    </section>
  );
};

export default Ido;
