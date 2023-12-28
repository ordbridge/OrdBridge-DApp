import React, { useEffect, useState } from 'react';
import TOKEN_ABI from '../utils/tokenAbi';
import Text from './Text';

const ProofOfReserve = ({ token, ethWeb3, avaxWeb3, ethContractHandler, avaxContractHandler }) => {
  const [ercBalance, setErcBalance] = useState(0);
  const [arcBalance, setArcBalance] = useState(0);

  useEffect(() => {
    ethContractHandler.methods.tokenContracts(token.token).call((err, result) => {
      if (err) {
        console.error('Error: ', err);
        // handle the error here
      }

      if (result !== '0x0000000000000000000000000000000000000000') {
        const tokenContractHandler = new ethWeb3.eth.Contract(TOKEN_ABI, result);
        tokenContractHandler.methods.totalSupply().call((err, result) => {
          if (result) {
            const supply = ethWeb3.utils.fromWei(result, 'ether');
            setErcBalance(supply);
          }
        });
      }
    });

    avaxContractHandler.methods.tokenContracts(token.token).call((err, result) => {
      if (err) {
        console.error('Error: ', err);
        // handle the error here
      }

      if (result !== '0x0000000000000000000000000000000000000000') {
        const tokenContractHandler = new avaxWeb3.eth.Contract(TOKEN_ABI, result);
        tokenContractHandler.methods.totalSupply().call((err, result) => {
          if (result) {
            const supply = avaxWeb3.utils.fromWei(result, 'ether');
            setArcBalance(supply);
          }
        });
      }
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="dashboard-stat-card">
      <Text className="text-[32px] dashboard-stat-card--title font-bold" size="txtSyneBold40">
        {token?.token?.toUpperCase()}
      </Text>
      <p className="text-[#C2C2C2] my-3">Token Supply</p>
      <div className="flex justify-content-between mb-4">
        <p>BRC20</p>
        <p>{parseInt(token?.balance, 10)?.toLocaleString()}</p>
      </div>
      <div className="flex justify-content-between mb-4">
        <p>ERC20</p>
        <p>{parseInt(token?.balance, 10)?.toLocaleString()}</p>
      </div>
      <div className="flex justify-content-between mb-4">
        <p>Existing cross-chain amount</p>
        <p> {parseInt(arcBalance, 10)?.toLocaleString()}</p>
      </div>
    </div>
  );
};

export default ProofOfReserve;
