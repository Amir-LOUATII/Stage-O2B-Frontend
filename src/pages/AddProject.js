import React, { useEffect, useState } from "react";
import { Button, Form } from "react-bootstrap";
import UseHttp from "../hooks/useHttp.";
import { useNavigate } from "react-router-dom";
import DateTimePicker from "react-datetime-picker";
import { useRecoilValue } from "recoil";
import { accountState, web3State } from "../recoil/atoms";
import { isURL } from "validator";
const AddProject = () => {
  const [name, setName] = useState("");
  const [team, setTeam] = useState("");
  const [description, setDescription] = useState("");
  const [tokenName, setTokenName] = useState("");
  const [tokenSymbol, setTokenSymbol] = useState("");
  const [tokensToSell, setTokensToSell] = useState("");
  const [tokenPrice, setTokenPrice] = useState("");
  const [tokenAbi, setTokenAbi] = useState("");
  const [tokenAddress, setTokenAddress] = useState("");
  const [whitelistAddress, setWhitelistAddress] = useState("");
  const [whitelistAbi, setWhitelistAbi] = useState("");
  const [whitelistStart, setWhitelistStart] = useState("");
  const [whitelistEnd, setWhitelistEnd] = useState("");
  const [idoAddress, setIdoAddress] = useState("");
  const [idoStart, setIdoStart] = useState("");
  const [idoEnd, setIdoEnd] = useState("");
  const [idoAbi, setIdoAbi] = useState("");
  const [error, setError] = useState("");
  const [successMsg, setSuccessMsg] = useState("");
  const [etherscanLink, setEtherscanLink] = useState("");
  const [whitePaperLink, setWhitePaperLink] = useState("");
  const [totalSupply, setTotalSupply] = useState("");
  const [minInvestment, setMinInvestment] = useState("");
  const [maxInvestment, setMaxInvestment] = useState("");

  const account = useRecoilValue(accountState);
  const web3Api = useRecoilValue(web3State);
  const { isPending, sendRequest, error: requestError, success } = UseHttp();

  const navigate = useNavigate();
  const submitHandler = async (e) => {
    e.preventDefault();
    setError(null);

    // check if variables are empty
    if (!name) {
      setError("Project name is required");
      return;
    }

    if (!team) {
      setError("Team name is required");
      return;
    }

    if (!description) {
      setError("Description is required");
      return;
    }

    if (!tokenName) {
      setError("Token name is required");
      return;
    }

    if (!tokenAddress) {
      setError("Token address is required");
      return;
    }

    if (!totalSupply) {
      setError("total supply is required");
      return;
    }

    if (!whitePaperLink) {
      setError("whitepaper link is required");
      return;
    }

    if (!isURL(whitePaperLink)) {
      setError("whitelist link must be an url");
      return;
    }

    if (!etherscanLink) {
      setError("Token etherscan link is required");
      return;
    }

    if (!isURL(etherscanLink)) {
      setError("Etherscan link must be an URL");
      return;
    }

    if (!tokenPrice) {
      setError("Token price is required");
      return;
    }

    if (!minInvestment) {
      setError("Minimum investement");
      return;
    }

    if (!maxInvestment) {
      setError("Maximum investement");
      return;
    }

    if (!tokenAbi) {
      setError("Token abi is required");
      return;
    }

    if (!whitelistAbi) {
      setError("whitelis Abi is required");
      return;
    }

    if (!whitelistAddress) {
      setError("Whitelist address is required");
      return;
    }

    if (!whitelistStart) {
      setError("Please pick whitelist start date");
      return;
    }

    if (!whitelistEnd) {
      setError("Please pick whitelist end date");
      return;
    }

    if (!idoAddress) {
      setError("Ido address is required");
      return;
    }

    if (!idoStart) {
      setError("Please pick IDO start date");
      return;
    }

    if (!idoEnd) {
      setError("Please pick IDO end date");
      return;
    }

    if (
      new Date(whitelistStart).getTime() >= new Date(whitelistEnd).getTime()
    ) {
      setError("Please check whitelist dates");
      return;
    }

    if (
      new Date(idoStart).getTime() >= new Date(idoEnd).getTime() ||
      new Date(idoStart).getTime() <= new Date(whitelistEnd).getTime()
    ) {
      setError("Please check IDO dates");
      return;
    }

    if (!idoAbi) {
      setError("Ido contract abi is required");
      return;
    }

    await sendRequest(
      {
        url: "/api/v1/projects/createproject",
        data: {
          name,
          teamOfProject: team,
          description,
          tokenName,
          tokenAddress,
          whitelistAddress,
          whitelistStart,
          whitelistEnd,
          idoAddress,
          idoStart,
          idoEnd,
          tokenPrice: parseFloat(tokenPrice),
          tokenSymbol,
          tokensToSell: parseFloat(tokensToSell),
          address: web3Api.web3.utils.keccak256(account),
          tokenAbi,
          whitelistAbi,
          idoAbi,
          totalSupply,
          whitePaperLink,
          etherscanLink,
          maxInvestment,
          minInvestment,
        },
        method: "POST",
      },
      (data) => {
        return;
      }
    );

    if (success) {
      setName("");
      setTeam("");
      setDescription("");
      setTokenName("");
      setTokenSymbol("");
      setTokensToSell("");
      setTokenPrice("");
      setTokenAddress("");
      setWhitelistAddress("");
      setWhitelistStart("");
      setWhitelistEnd("");
      setIdoAddress("");
      setIdoStart("");
      setIdoEnd("");
      setError("");
      setTotalSupply("");
      setWhitePaperLink("");
      setEtherscanLink("");
      setTokenAbi("");
      setWhitelistAbi("");
      setIdoAbi("");
      setTokensToSell("");
      setMaxInvestment("");
      setMinInvestment("");
    }
  };

  useEffect(() => {
    let timer;
    if (success) {
      setSuccessMsg("Project successfully added");
      timer = setTimeout(() => {
        navigate("/projects");
        setSuccessMsg("");
      }, 2000);
    }
    return () => {
      if (success) {
        clearTimeout(timer);
      }
    };
  }, [success]);
  return (
    <section className="min-vh-100 pt-4 container-lg py-4">
      <h1 className="h3 pt-5 mt-3 text-primary fw-bold">Add project:</h1>
      <Form className="d-block mx-auto  mt-5" style={{ maxWidth: "800px" }}>
        <Form.Group className="mt-2">
          <Form.Label htmlFor="name" className="fw-bold text-capitalize">
            Project Name
          </Form.Label>
          <Form.Control
            type="text"
            required
            placeholder="Enter project name"
            name="name"
            value={name}
            onChange={(e) => setName(e.currentTarget.value)}
          />
        </Form.Group>
        <Form.Group className="mt-3">
          <Form.Label htmlFor="team" className="fw-bold text-capitalize">
            Project Team
          </Form.Label>
          <Form.Control
            type="text"
            required
            placeholder="Enter project team name"
            name="team"
            value={team}
            onChange={(e) => setTeam(e.currentTarget.value)}
          />
        </Form.Group>
        <Form.Group className="mt-3">
          <Form.Label htmlFor="description" className="fw-bold text-capitalize">
            Project description
          </Form.Label>
          <Form.Control
            type="text"
            required
            placeholder="Enter project description"
            name="description"
            as={"textarea"}
            rows={"3"}
            style={{ height: "200px", maxHeight: "200px" }}
            value={description}
            onChange={(e) => setDescription(e.currentTarget.value)}
          />
        </Form.Group>
        <Form.Group className="mt-3">
          <Form.Label htmlFor="token" className="fw-bold text-capitalize">
            Token Name
          </Form.Label>
          <Form.Control
            type="text"
            required
            placeholder="Enter token name"
            name="token"
            value={tokenName}
            onChange={(e) => setTokenName(e.currentTarget.value)}
          />
        </Form.Group>
        <Form.Group className="mt-3">
          <Form.Label htmlFor="symbol" className="fw-bold text-capitalize">
            Token Symbol
          </Form.Label>
          <Form.Control
            type="text"
            required
            placeholder="Enter token Symbol"
            name="token"
            value={tokenSymbol}
            onChange={(e) => setTokenSymbol(e.currentTarget.value)}
          />
        </Form.Group>
        <Form.Group className="mt-3 ">
          <Form.Label
            htmlFor="token-address"
            className="fw-bold text-capitalize"
          >
            Token total supply
          </Form.Label>
          <Form.Control
            type="number"
            required
            placeholder="Enter token address"
            name="token-address"
            value={totalSupply}
            onChange={(e) => setTotalSupply(parseFloat(e.currentTarget.value))}
          />
        </Form.Group>
        <Form.Group className="mt-3">
          <Form.Label htmlFor="sell" className="fw-bold text-capitalize">
            Amount to sell
          </Form.Label>
          <Form.Control
            type="number"
            required
            placeholder="Enter amount to sell"
            name="token"
            value={tokensToSell}
            onChange={(e) => setTokensToSell(parseFloat(e.currentTarget.value))}
          />
        </Form.Group>
        <Form.Group className="mt-3">
          <Form.Label htmlFor="price" className="fw-bold text-capitalize">
            Token price in O2B
          </Form.Label>
          <Form.Control
            type="number"
            required
            placeholder="Enter token price"
            name="token"
            value={tokenPrice}
            onChange={(e) => setTokenPrice(parseFloat(e.currentTarget.value))}
          />
        </Form.Group>
        <Form.Group className="mt-3">
          <Form.Label htmlFor="min" className="fw-bold text-capitalize">
            minimum investment
          </Form.Label>
          <Form.Control
            type="number"
            required
            placeholder="Enter token price"
            name="token"
            value={minInvestment}
            onChange={(e) =>
              setMinInvestment(parseFloat(e.currentTarget.value))
            }
          />
        </Form.Group>
        <Form.Group className="mt-3">
          <Form.Label htmlFor="max" className="fw-bold text-capitalize">
            maximum investment
          </Form.Label>
          <Form.Control
            type="number"
            required
            placeholder="Enter token price"
            name="token"
            value={maxInvestment}
            onChange={(e) =>
              setMaxInvestment(parseFloat(e.currentTarget.value))
            }
          />
        </Form.Group>
        <Form.Group className="mt-3">
          <Form.Label
            htmlFor="token-address"
            className="fw-bold text-capitalize"
          >
            Token Contract Address
          </Form.Label>
          <Form.Control
            type="text"
            required
            placeholder="Enter token address"
            name="token-address"
            value={tokenAddress}
            onChange={(e) => setTokenAddress(e.currentTarget.value)}
          />
        </Form.Group>
        <Form.Group className="mt-3 ">
          <Form.Label
            htmlFor="token-whitepaper"
            className="fw-bold text-capitalize"
          >
            Token etherscan link
          </Form.Label>
          <Form.Control
            type="text"
            required
            placeholder="Enter token etherscan link"
            name="token-whitepaper"
            value={etherscanLink}
            onChange={(e) => setEtherscanLink(e.currentTarget.value)}
          />
        </Form.Group>
        <Form.Group className="mt-3 ">
          <Form.Label
            htmlFor="token-whitepaper"
            className="fw-bold text-capitalize"
          >
            Token whitepaper link
          </Form.Label>
          <Form.Control
            type="text"
            required
            placeholder="Enter token whitepaper link"
            name="token-whitepaper"
            value={whitePaperLink}
            onChange={(e) => setWhitePaperLink(e.currentTarget.value)}
          />
        </Form.Group>
        <Form.Group className="mt-3">
          <Form.Label htmlFor="description" className="fw-bold text-capitalize">
            Token Contract ABi
          </Form.Label>
          <Form.Control
            type="text"
            required
            placeholder="Enter token contract ABI"
            name="description"
            as={"textarea"}
            rows={"3"}
            style={{ height: "200px", maxHeight: "200px" }}
            value={tokenAbi}
            onChange={(e) => setTokenAbi(e.currentTarget.value)}
          />
        </Form.Group>
        <Form.Group className="mt-3">
          <Form.Label
            htmlFor="whitelist-address"
            className="fw-bold text-capitalize"
          >
            Whitelist Contract Address
          </Form.Label>
          <Form.Control
            type="text"
            required
            placeholder="Enter whitelist"
            name="whiteliste"
            value={whitelistAddress}
            onChange={(e) => setWhitelistAddress(e.currentTarget.value)}
          />
        </Form.Group>
        <Form.Group className="mt-3">
          <Form.Label htmlFor="description" className="fw-bold text-capitalize">
            Whitelist Contract ABI
          </Form.Label>
          <Form.Control
            type="text"
            required
            placeholder="Enter project whitelist contract ABI"
            name="description"
            as={"textarea"}
            rows={"3"}
            style={{ height: "200px", maxHeight: "200px" }}
            value={whitelistAbi}
            onChange={(e) => setWhitelistAbi(e.currentTarget.value)}
          />
        </Form.Group>
        <div className="d-flex justify-content-evenly align-items-center mt-3 ,w-100">
          <Form.Group className="mb-3">
            <Form.Label
              htmlFor="whitelist-start"
              className="fw-bold text-capitalize"
            >
              Whitelist Application Start
            </Form.Label>
            <DateTimePicker
              value={whitelistStart}
              onChange={setWhitelistStart}
            />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label
              htmlFor="whitelist-end"
              className="fw-bold text-capitalize"
            >
              Whitelist Application End
            </Form.Label>
            <DateTimePicker value={whitelistEnd} onChange={setWhitelistEnd} />
          </Form.Group>
        </div>
        <Form.Group className="mb-3">
          <Form.Label
            htmlFor="ido-contract"
            className="fw-bold text-capitalize"
          >
            IDO contract Address
          </Form.Label>
          <Form.Control
            type="text"
            required
            name="ido-contract"
            placeholder="Enter IDO contract address"
            value={idoAddress}
            onChange={(e) => setIdoAddress(e.currentTarget.value)}
          />
        </Form.Group>
        <Form.Group className="mt-3">
          <Form.Label htmlFor="description" className="fw-bold text-capitalize">
            ido Contract ABI
          </Form.Label>
          <Form.Control
            type="text"
            required
            placeholder="Enter project ido contract ABI"
            name="description"
            as={"textarea"}
            rows={"3"}
            style={{ height: "200px", maxHeight: "200px" }}
            value={idoAbi}
            onChange={(e) => setIdoAbi(e.currentTarget.value)}
          />
        </Form.Group>
        <div className="d-flex justify-content-evenly align-items-center mt-3">
          <Form.Group className="mb-3">
            <Form.Label htmlFor="ido-start" className="fw-bold text-capitalize">
              IDO Start
            </Form.Label>
            <DateTimePicker
              value={idoStart}
              onChange={setIdoStart}
              className="d-block"
            />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label htmlFor="ido-end" className="fw-bold text-capitalize">
              IDO End
            </Form.Label>
            <DateTimePicker
              value={idoEnd}
              onChange={setIdoEnd}
              className="d-block"
            />
          </Form.Group>
        </div>
        {error && <p className="text-center text-danger mt-3">{error}</p>}
        {requestError && (
          <p className="text-center text-danger mt-3">{requestError}</p>
        )}
        {successMsg && (
          <p className="text-center bg-success text-white mt-3">{successMsg}</p>
        )}
        <Button
          type="submit"
          variant="outline-primary"
          className="d-block ms-auto mt-3"
          onClick={submitHandler}
        >
          {isPending ? "Loading..." : "Add project"}
        </Button>
      </Form>
    </section>
  );
};

export default AddProject;
