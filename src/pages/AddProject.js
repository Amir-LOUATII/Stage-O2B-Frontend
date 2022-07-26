import React, { useEffect, useState } from "react";
import { Button, Form } from "react-bootstrap";
import UseHttp from "../hooks/useHttp.";
import { useNavigate } from "react-router-dom";
import DateTimePicker from "react-datetime-picker";

const AddProject = () => {
  const [name, setName] = useState("");
  const [team, setTeam] = useState("");
  const [description, setDescription] = useState("");
  const [tokenName, setTokenName] = useState("");
  const [tokenSymbol, setTokenSymbol] = useState("");
  const [tokensToSell, setTokensToSell] = useState("");
  const [tokenPrice, setTokenPrice] = useState("");
  const [tokenAddress, setTokenAddress] = useState("");
  const [whitelistAddress, setWhitelistAddress] = useState("");
  const [whitelistStart, setWhitelistStart] = useState("");
  const [whitelistEnd, setWhitelistEnd] = useState("");
  const [idoAddress, setIdoAddress] = useState("");
  const [idoStart, setIdoStart] = useState("");
  const [idoEnd, setIdoEnd] = useState("");
  const [error, setError] = useState("");
  const [successMsg, setSuccessMsg] = useState("");
  console.log(whitelistStart);

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
        },
        method: "POST",
      },
      (data) => {
        return;
      }
    );
    setSuccessMsg("Project successfully added");
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
  };

  useEffect(() => {
    let timer;
    if (success) {
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
          <Form.Label htmlFor="name" className="fw-bold">
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
          <Form.Label htmlFor="team" className="fw-bold">
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
          <Form.Label htmlFor="description" className="fw-bold">
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
          <Form.Label htmlFor="token" className="fw-bold">
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
          <Form.Label htmlFor="symbol" className="fw-bold">
            Token Symbol
          </Form.Label>
          <Form.Control
            type="text"
            required
            placeholder="Enter token name"
            name="token"
            value={tokenSymbol}
            onChange={(e) => setTokenSymbol(e.currentTarget.value)}
          />
        </Form.Group>
        <Form.Group className="mt-3">
          <Form.Label htmlFor="sell" className="fw-bold">
            Amount to sell
          </Form.Label>
          <Form.Control
            type="number"
            required
            placeholder="Enter amount to sell"
            name="token"
            value={tokensToSell}
            onChange={(e) => setTokensToSell(e.currentTarget.value)}
          />
        </Form.Group>
        <Form.Group className="mt-3">
          <Form.Label htmlFor="price" className="fw-bold">
            token price en ether
          </Form.Label>
          <Form.Control
            type="number"
            required
            placeholder="Enter token price"
            name="token"
            value={tokenPrice}
            onChange={(e) => setTokenPrice(e.currentTarget.value)}
          />
        </Form.Group>
        <Form.Group className="mt-3">
          <Form.Label htmlFor="token-address" className="fw-bold">
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
        <Form.Group className="mt-3">
          <Form.Label htmlFor="whitelist-address" className="fw-bold">
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
        <div className="d-flex justify-content-evenly align-items-center mt-3 ,w-100">
          <Form.Group className="mb-3">
            <Form.Label htmlFor="whitelist-start" className="fw-bold">
              Whitelist Application Start
            </Form.Label>
            <DateTimePicker
              value={whitelistStart}
              onChange={setWhitelistStart}
            />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label htmlFor="whitelist-end" className="fw-bold">
              Whitelist Application End
            </Form.Label>
            <DateTimePicker value={whitelistEnd} onChange={setWhitelistEnd} />
          </Form.Group>
        </div>
        <Form.Group className="mb-3">
          <Form.Label htmlFor="ido-contract" className="fw-bold">
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
        <div className="d-flex justify-content-evenly align-items-center mt-3">
          <Form.Group className="mb-3">
            <Form.Label htmlFor="ido-start" className="fw-bold">
              IDO Start
            </Form.Label>
            <DateTimePicker
              value={idoStart}
              onChange={setIdoStart}
              className="d-block"
            />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label htmlFor="ido-end" className="fw-bold">
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
