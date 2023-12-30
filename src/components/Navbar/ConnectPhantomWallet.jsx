// Import your Phantom wallet icon here
import PhantomIcon from "../../assets/phantom.png"; // Update the path as necessary
import "../../styles/connect-wallet.css";

import React from "react";
import { Button } from ".."; // Adjust the import according to your project structure

const ConnectPhantomWallet = ({ onConnectClick, address, text }) => {
    if (address) {
        // Truncate the address
        const firstHalf = address.substring(0, 5);
        const lastHalf = address.substring(address.length - 4);
        const truncatedAddress = firstHalf + "....." + lastHalf;

        return (
        <Button
            className="!text-white-A700 cursor-pointer font-bold font-syne rounded-full text-base flex justify-start px-8 w-max sm:px-6 sm:text-xs gap-2 break-all"
            color={`${text === "Connect Wallets" ? "deep_purple_A200_a3" : "deep_purple_A200_cc"}`}
            size="sm"
            variant="outline"
        >
            <img src={PhantomIcon} style={{ width: "20px" }} alt="Phantom Wallet" />
            {truncatedAddress}
        </Button>
        );
    }

    return (
        <Button
            className="!text-white-A700 cursor-pointer font-bold font-syne leading-[normal] rounded-[29px] text-base text-center w-max px-6"
            color={`${text === "Connect Wallets" ? "deep_purple_A200_a3" : "deep_purple_A200_cc"}`}
            size="sm"
            variant="outline"
            onClick={onConnectClick}
        >
            {text ? text : "Connect Phantom"}
        </Button>
    );
};

export default ConnectPhantomWallet;
