import React, { useEffect, useState } from "react";
import TOKEN_ABI from "../utils/tokenAbi";
import Text from "./Text";

const ProofOfReserve = ({
  token,
  ethWeb3,
  avaxWeb3,
  ethContractHandler,
  avaxContractHandler,
}) => {
  const [ercBalance, setErcBalance] = useState(0);
  const [arcBalance, setArcBalance] = useState(0);

  useEffect(() => {
    ethContractHandler.methods
      .tokenContracts(token.token)
      .call()
      .then((result) => {
        if (result !== "0x0000000000000000000000000000000000000000") {
          const tokenContractHandler = new ethWeb3.eth.Contract(
            TOKEN_ABI,
            result,
          );
          console.log({ call: 1, result });

          tokenContractHandler.methods
            .totalSupply()
            .call()
            .then((result) => {
              if (result) {
                const supply = ethWeb3.utils.fromWei(result, "ether");
                console.log({ call: 1, result });
                setErcBalance(supply);
              }
            });
        }
      });

    avaxContractHandler.methods
      .tokenContracts(token.token)
      .call()
      .then((result) => {
        if (result !== "0x0000000000000000000000000000000000000000") {
          const tokenContractHandler = new avaxWeb3.eth.Contract(
            TOKEN_ABI,
            result,
          );

          tokenContractHandler.methods
            .totalSupply()
            .call()
            .then((result) => {
              if (result) {
                const supply = avaxWeb3.utils.fromWei(result, "ether");
                setArcBalance(supply);
                console.log(supply, "supply");
              }
            });
        }
      });
  });

  return (
    <div className="dashboard-stat-card">
      <Text
        className="text-[32px] dashboard-stat-card--title font-bold"
        size="txtSyneBold40"
      >
        {token?.token?.toUpperCase()}
      </Text>
      <p className="text-[#C2C2C2] my-3">Token Supply</p>
      <div className="flex justify-content-between mb-4">
        <p>BRC20</p>
        <p>{parseInt(token?.balance, 10)?.toLocaleString()}</p>
      </div>
      <div className="flex justify-content-between mb-4">
        <p>ERC20</p>
        <p>{parseInt(ercBalance, 10)?.toLocaleString()}</p>
      </div>
      <div className="flex justify-content-between mb-4">
        <p>ARC20</p>
        <p> {parseInt(arcBalance, 10)?.toLocaleString()}</p>
      </div>
    </div>
  );
};

export default ProofOfReserve;
