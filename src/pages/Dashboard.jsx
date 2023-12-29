import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Web3 from 'web3';
import AVAX_ABI from '../utils/avax';
import ETH_ABI from '../utils/eth';
import ProofOfReserve from '../components/ProofOfReserve';

const DashboardStatCard = ({ title, value }) => {
  return (
    <div className="dashboard-stat-card">
      <p className="dashboard-stat-card--title">{title.toUpperCase()}</p>
      <h4 className="dashboard-stat-card--value">{value}</h4>
    </div>
  );
};

const DashboardReserveCard = ({
  tokenName,
  conversion1,
  amount1,
  conversion2,
  amount2,
  conversion3,
  amount3
}) => {
  return (
    <div className="dashboard-stat-card">
      <h1 className="dashboard-stat-card--title font-bold">{tokenName}</h1>
      <p className="text-muted">Token Supply</p>
      <div className="flex justify-content-between mb-3">
        <p>{conversion1}</p>
        <p>{amount1}</p>
      </div>
      <div className="flex justify-content-between mb-3">
        <p>{conversion2}</p>
        <p>{amount2}</p>
      </div>
      <div className="flex justify-content-between ">
        <p>{conversion3}</p>
        <p>{amount3}</p>
      </div>
    </div>
  );
};
const Dashboard = ({ appChains }) => {
  const [statsData, setStatsData] = useState({});
  const [reservesData, setReservesData] = useState([]);

  const ethChain = appChains[0];
  const avaxChain = appChains[2];
  const ethWeb3 = new Web3('https://mainnet.infura.io/v3/18b346ece35742b2948e73332f85ad86');
  const avaxWeb3 = new Web3(
    'https://avalanche-mainnet.infura.io/v3/18b346ece35742b2948e73332f85ad86'
  );
  const ethContractHandler = new ethWeb3.eth.Contract(ETH_ABI, ethChain.contractAddress);
  const avaxContractHandler = new avaxWeb3.eth.Contract(AVAX_ABI, avaxChain.contractAddress);

  console.log(ethWeb3, 'Eth web2');

  useEffect(() => {
    (async () => {
      const res = await axios.get('https://api.ordbridge.io/bapi/reporting');
      console.log(res.data?.data[0], 'Dataa');
      setStatsData(res?.data?.data?.[0]);
    })();
    (async () => {
      const res = await axios.get('https://api.ordbridge.io/bapi/token/btc/balance');
      const balanceList = res?.data?.data?.[0].balanceList;
      const balances = balanceList.map((item) => ({
        token: item.token,
        balance: item.balance
      }));
      console.log(balanceList, balances, 'BALANCE LIST');
      setReservesData(balances);
    })();
  }, []);

  return (
    <div className="font-syne text-white">
      <div className="container py-[50px] min-h-screen">
        <h1 className="dashboard-heading">DASHBOARD</h1>
        <div className="grid grid-cols-2 sm:grid-cols-1 md:grid-cols-1 gap-5 text-white">
          <DashboardStatCard
            title="Price"
            value={`$${statsData?.lastPrice ? statsData.lastPrice.substring(0, 7) : 'Loading...'}`}
          />
          <DashboardStatCard
            title="Total Volume"
            value={parseInt(statsData?.volume24h, 10)?.toLocaleString()}
          />
        </div>
        <h1 className="dashboard-heading mt-10">PROOF OF RESERVES</h1>
        <div className="grid grid-cols-3 md:grid-cols-2 sm:grid-cols-1 gap-x-3 gap-y-5">
          {/*{reservesData.map((item) => (*/}
          {/*  <DashboardReserveCard*/}
          {/*    tokenName="BRGE"*/}
          {/*    conversion1={item.token}*/}
          {/*    amount1={item.balance}*/}
          {/*    conversion2="ERC20"*/}
          {/*    // amount2={ethWeb3}*/}
          {/*    // conversion3={avaxWeb3}*/}
          {/*    amount3="393.47 M"*/}
          {/*  />*/}
          {/*))}*/}
          {reservesData.map((item) => (
            <ProofOfReserve
              token={item}
              avaxWeb3={avaxWeb3}
              ethWeb3={ethWeb3}
              avaxContractHandler={avaxContractHandler}
              ethContractHandler={ethContractHandler}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
