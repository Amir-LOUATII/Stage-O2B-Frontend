import React, { useEffect, useState } from "react";
import { Button, Form, Modal } from "react-bootstrap";
import { useRecoilValue } from "recoil";
import {
  accountState,
  idoContractState,
  platformTokenContractState,
  projectState,
  web3State,
} from "../../recoil/atoms";

const IdoForm = (props) => {
  //onhimde function
  const { onHide } = props;
  //project details
  const { minInvestment, maxInvestment, tokenSymbol, tokenPrice, idoAddress } =
    useRecoilValue(projectState);

  const account = useRecoilValue(accountState);
  //web3library
  const web3Api = useRecoilValue(web3State);
  //contracts
  const platformTokenContract = useRecoilValue(platformTokenContractState);
  const idoContract = useRecoilValue(idoContractState);
  //form states
  const [participationValue, setParticipationValue] = useState(
    parseFloat(minInvestment)
  );
  const [participationInO2b, setParticipationInO2b] = useState(
    parseFloat(minInvestment) * parseFloat(tokenPrice)
  );
  const [participationOnProjectToken, setParticipationOnProjectToken] =
    useState(parseFloat(minInvestment));

  //Request States
  const [success, setSuccess] = useState(null);
  const [isLoading, setIsLoading] = useState(null);
  const [error, setError] = useState("");

  const submitHandler = async (e) => {
    setError("");
    setSuccess(null);
    setIsLoading(true);
    e.preventDefault();
    const decimals = await platformTokenContract.methods.decimals().call();
    //converting decimals to a big number
    const decimalsBN = web3Api.web3.utils.toBN(decimals);
    //converting price to a be number
    const tokenPriceBN = web3Api.web3.utils.toBN(tokenPrice);
    //conver token ammount to a big number
    const amountBN = web3Api.web3.utils.toBN(participationValue);
    //converting amount to approve to a big number
    const amountHex =
      "0x" +
      amountBN
        .mul(tokenPriceBN)
        .mul(web3Api.web3.utils.toBN(10).pow(decimalsBN))
        .toString("hex");
    try {
      const allowed = await platformTokenContract.methods
        .allowance(account, idoAddress)
        .call();
      if (allowed / 10 ** decimals < participationValue) {
        await platformTokenContract.methods
          .approve(idoAddress, amountHex)
          .send({ from: account });
      }

      const result = await idoContract.methods
        .participate(participationValue)
        .send({ from: account });
      setIsLoading(false);
      if (result) {
        setSuccess("Operation successed please check your wallet ");
      }
    } catch (error) {
      console.log(error);
      setIsLoading(false);
      setSuccess(null);

      if (error.code == 4001) {
        setError("Please approve the transaction to buy tokens");
      } else {
        setError("Sorry something want wrong,please try later");
      }
    }
  };
  useEffect(() => {
    let timer;
    if (success) {
      console.log(success);
      timer = setTimeout(() => {
        window.location.reload();
      }, 2500);
    }

    return () => {
      clearInterval(timer);
    };
  }, [success]);
  return (
    <Modal
      {...props}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header closeButton>
        <Modal.Title
          id="contained-modal-title-vcenter "
          className="text-center w-100"
        >
          Participate to the IDO
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          <Form.Text className="text-danger mb-3">
            {`Note: The minimum acceptable investment is ${minInvestment} ${tokenSymbol} (${
              minInvestment * tokenPrice
            } O2B) and the maximum acceptable investment is ${maxInvestment} ${tokenSymbol} (${
              maxInvestment * tokenPrice
            } O2B)`}{" "}
          </Form.Text>
          <Form.Text className="text-center d-block ">
            Your account balance is:{" "}
            <span className="d-inline-block border rounded border-dark p-1 me-2 text-dark">
              {props.balance}
            </span>
            O2B
          </Form.Text>
          <Form.Group className="mb-3 mt-3">
            <Form.Label className="h5">
              {`Particpation in ${tokenSymbol}`}{" "}
            </Form.Label>
            <Form.Control
              type="number"
              value={participationOnProjectToken}
              onChange={(e) => {
                let { min, max, value } = e.currentTarget;
                if (value.length != 0 && parseFloat(value) < min) {
                  value = min;
                }
                if (value.length != 0 && parseFloat(value) > max) {
                  value = max;
                }
                setParticipationOnProjectToken(parseFloat(value));
                setParticipationInO2b(
                  parseFloat(value) * parseFloat(tokenPrice)
                );
                setParticipationValue(parseFloat(value));
              }}
              min={minInvestment}
              max={maxInvestment}
              onBlur={(e) => {
                let { min, value } = e.currentTarget;
                if (value.length == 0) {
                  value = min;
                }

                setParticipationOnProjectToken(parseFloat(value));
                setParticipationInO2b(
                  parseFloat(value) * parseFloat(tokenPrice)
                );
                setParticipationValue(parseFloat(value));
              }}
            />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label className="h5">{`Particpation in O2B`} </Form.Label>
            <Form.Control
              type="number"
              value={participationInO2b}
              onChange={(e) => {
                let { min, max, value } = e.currentTarget;
                if (value.length != 0 && parseFloat(value) < min) {
                  value = min;
                }
                if (value.length != 0 && parseFloat(value) > max) {
                  value = max;
                }
                setParticipationOnProjectToken(
                  parseFloat(value) / parseFloat(tokenPrice)
                );
                setParticipationInO2b(parseFloat(value));
                setParticipationValue(
                  parseFloat(value) / parseFloat(tokenPrice)
                );
              }}
              min={parseFloat(minInvestment) / parseFloat(tokenPrice)}
              max={parseFloat(maxInvestment) / parseFloat(tokenPrice)}
              onBlur={(e) => {
                let { min, value } = e.currentTarget;
                if (value.length == 0) {
                  value = min;
                }

                setParticipationOnProjectToken(
                  parseFloat(value) / parseFloat(tokenPrice)
                );
                setParticipationInO2b(parseFloat(value));
                setParticipationValue(
                  parseFloat(value) / parseFloat(tokenPrice)
                );
              }}
            />
          </Form.Group>
          {isLoading && (
            <p className="text-center ">Operation can takes few seconds...</p>
          )}
          {error && <p className=" text-center text-danger my-3">{error}</p>}
          {success && (
            <p className="text-center text-success my-3">{success}</p>
          )}
          <div className="ms-auto w-100 d-flex justify-content-end">
            <Button
              onClick={() => {
                setError("null");
                onHide();
              }}
              className="d-inline-block me-2 ms-auto"
              variant="outline-primary"
            >
              Close
            </Button>
            <Button
              onClick={submitHandler}
              type="submit"
              className="d-inline-block ms-2"
              disabled={isLoading}
            >
              {isLoading ? "Loading..." : "Confirm"}
            </Button>
          </div>
        </Form>
      </Modal.Body>
    </Modal>
  );
};

export default IdoForm;
