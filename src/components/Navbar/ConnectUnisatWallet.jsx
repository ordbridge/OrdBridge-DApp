import UnisatIcon from "../../assets/unisat.png";
import "../../styles/connect-wallet.css";

import React from "react";
import { Button } from "..";

const ConnectUnisatWallet = ({ onConnectClick, address, text }) => {
  if (address) {
    const firstHalf = address && address.substring(0, 5);
    const lastHalf =
      address && address.substring(address.length - 3, address.length - 1);
    const truncatedAddress = firstHalf + "....." + lastHalf;
    return (
      <Button
        className="!text-white-A700 cursor-pointer font-bold font-syne rounded-full text-base flex justify-start px-8 w-max sm:px-6 gap-2 break-all	sm:text-[20px] md:w-max sm:w-full font-syne"
        color={`${
          text === "Connect Wallets"
            ? "deep_purple_A200_a3"
            : "light_purple_A200_cc"
        }`}
        size="sm"
        variant="outline"
      >
        <img src={UnisatIcon} style={{ width: "20px" }} alt="" />{" "}
        {truncatedAddress}
      </Button>
    );
  }

  if (!address) {
    return (
      <Button
        className="!text-white-A700 cursor-pointer font-bold font-syne leading-[normal] rounded-[29px] text-base text-center py-3 sm:text-3 sm:px-4 px-6"
        color={`${
          text === "Connect Wallets"
            ? "deep_purple_A200_a3"
            : "light_purple_A200_cc"
        }`}
        size="sm"
        variant="outline"
        onClick={onConnectClick}
      >
        {text ? text : "Connect Unisat"}
      </Button>
    );
  }
};

export default ConnectUnisatWallet;
