import React, { useEffect, useState } from "react";
import { useKinto } from "../hooks/useKinto";
import { useNavigate } from "react-router-dom";
import { createKintoSDK, KintoAccountInfo } from "kinto-web-sdk";

import kyc1 from "@/assets/kyc1.png";
import kyc2 from "@/assets/kyc2.png";

const StartPage = () => {
  const [accountInfo, setAccountInfo] = useState<KintoAccountInfo | undefined>(
    undefined
  );

  const { connect, kinto } = useKinto();
  const nav = useNavigate();

  // TODO
  const getOnchainKyc = async () => {
    // console.log("try connecting wallet");
    try {
      // const kinto = createKintoSDK(
      //   "0x9F99a0C9FA804A90Ebb4503A89006fddc3A239a3"
      // );
      // console.log("ㅠㅠ");
      // const info = await kinto.connect();
      // const info = await connect();
      // console.log(info);
      // if (info.approval) nav("/info");
      if (accountInfo?.exists) nav("/info");
    } catch (error) {
      console.log(error);
    }
  };

  async function fetchAccountInfo() {
    try {
      setAccountInfo(await kinto.connect());
    } catch (error) {
      console.error("Failed to fetch account info:", error);
    }
  }

  useEffect(() => {
    console.log(accountInfo);
  }, [accountInfo]);

  useEffect(() => {
    fetchAccountInfo();
  });

  return (
    <div className="bg-[#3A3F4D] gap-8 h-[700px]">
      <div className="text-white font-bold text-2xl">KYC Verify</div>
      <div className="flex justify-center bg-black items-center w-[320px] h-[180px] rounded-lg">
        <img
          src={kyc1}
          alt="KYC verification"
          className="w-[90%] h-[90%] object-contain"
        />
      </div>
      <div className="text-white font-400 text-base mb-6">
        Please connect your Kinto wallet.
      </div>
      <img
        src={kyc2}
        className="cursor-pointer"
        onClick={() => getOnchainKyc()}
      />
    </div>
  );
};

export default StartPage;
