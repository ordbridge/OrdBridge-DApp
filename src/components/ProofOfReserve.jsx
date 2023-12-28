import React, { useEffect, useState } from "react";
import Web3 from "web3";
import { Button, Img, Line } from "../components";
import TOKEN_ABI from "../utils/tokenAbi";
import Text from "./Text";
import React, { useEffect, useState } from 'react';
import TOKEN_ABI from '../utils/tokenAbi';
import Text from './Text';

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
      .call((err, result) => {
        if (err) {
          console.error("Error: ", err);
          // handle the error here
        }

        if (result !== "0x0000000000000000000000000000000000000000") {
          const tokenContractHandler = new ethWeb3.eth.Contract(
            TOKEN_ABI,
            result,
          );
          tokenContractHandler.methods.totalSupply().call((err, result) => {
            if (result) {
              const supply = ethWeb3.utils.fromWei(result, "ether");
              setErcBalance(supply);
            }
          });
        }
      });

    avaxContractHandler.methods
      .tokenContracts(token.token)
      .call((err, result) => {
        if (err) {
          console.error("Error: ", err);
          // handle the error here
        }

        if (result !== "0x0000000000000000000000000000000000000000") {
          const tokenContractHandler = new avaxWeb3.eth.Contract(
            TOKEN_ABI,
            result,
          );
          tokenContractHandler.methods.totalSupply().call((err, result) => {
            if (result) {
              const supply = avaxWeb3.utils.fromWei(result, "ether");
              setArcBalance(supply);
            }
          });
        }
      });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="min-w-full">
      <Text className="text-[32px] text-white-A700 pl-2" size="txtSyneBold40">
        {token.token}
      </Text>
      <div className="pt-4 min-w-full">
        <Text
          className="bg-clip-text bg-gradient4  text-3xl text-transparent"
          size="txtSyneMedium36"
        >
          BRC20
        </Text>

        <Text
          className="w-fit m-0 p-0 text-xl md:text-[22px] text-white-A700 sm:text-xl"
          size="txtSyneMedium24"
        >
          Existing cross-chain amount
        </Text>
        <Text
          className="m-0 p-0 text-[32px] text-white-A700"
          size="txtSyneBold40"
        >
          {parseInt(token.balance, 10).toLocaleString()}
        </Text>
      </div>

      <div className="pt-4 min-w-full">
        <Text
          className="bg-clip-text bg-gradient33  text-3xl text-transparent"
          size="txtSyneMedium36"
        >
          ERC20
        </Text>

        <Text
          className="m-0 p-0 text-xl md:text-[22px] text-white-A700 sm:text-xl"
          size="txtSyneMedium24"
        >
          Existing cross-chain amount
        </Text>
        <Text
          className="m-0 p-0 text-[32px] text-white-A700"
          size="txtSyneBold40"
        >
          {parseInt(ercBalance, 10).toLocaleString()}
        </Text>
      </div>

      <div className="pt-4 min-w-full">
        <Text
          className="bg-clip-text bg-gradient9  text-3xl text-transparent"
          size="txtSyneMedium36"
        >
          ARC20
        </Text>

        <Text
          className="m-0 p-0 text-xl md:text-[22px] text-white-A700 sm:text-xl"
          size="txtSyneMedium24"
        >
          Existing cross-chain amount
        </Text>
        <Text
          className="m-0 p-0 text-[32px] text-white-A700"
          size="txtSyneBold40"
        >
          {parseInt(arcBalance, 10).toLocaleString()}
        </Text>
      </div>
    </div>
  );
};

export default ProofOfReserve;
