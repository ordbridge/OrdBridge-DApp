import React, { useEffect, useState } from 'react';
import axios from 'axios';

const DashboardStatCard = ({ title, value }) => {
  return (
    <div className="dashboard-stat-card">
      <p className="dashboard-stat-card--title">{title}</p>
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
const Dashboard = () => {
  const [statsData, setStatsData] = useState({});
  useEffect(() => {
    (async () => {
      const res = await axios.get('https://api.ordbridge.io/bapi/reporting');
      console.log(res.data?.data[0], 'Dataa');
      setStatsData(res?.data?.data?.[0]);
    })();
  }, []);
  return (
    <div className="font-syne text-white">
      <div className="container py-[50px]">
        <h1 className="dashboard-heading">Dashboard</h1>
        <div className="grid grid-cols-2 gap-5 text-white">
          <DashboardStatCard title="Price" value={statsData?.high24h} />
          <DashboardStatCard title="Total Volume" value={statsData?.volume24h} />
        </div>
        <h1 className="dashboard-heading mt-10">Proof of Reserves</h1>
        <div className="grid grid-cols-3 gap-3">
          <DashboardReserveCard
            tokenName="BRGE"
            conversion1="BRC20"
            amount1="193.47 M"
            conversion2="ERC20"
            amount2="182.47 M"
            conversion3="ARC20"
            amount3="393.47 M"
          />
          <DashboardReserveCard
            tokenName="BRGE"
            conversion1="BRC20"
            amount1="193.47 M"
            conversion2="ERC20"
            amount2="182.47 M"
            conversion3="ARC20"
            amount3="393.47 M"
          />
          <DashboardReserveCard
            tokenName="BRGE"
            conversion1="BRC20"
            amount1="193.47 M"
            conversion2="ERC20"
            amount2="182.47 M"
            conversion3="ARC20"
            amount3="393.47 M"
          />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
