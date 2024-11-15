import React from "react";

import kyc1 from "@/assets/kyc1.png";
import kyc2 from "@/assets/kyc2.png";
import { useNavigate } from "react-router-dom";

const StartPage = () => {
  const nav = useNavigate();

  const getOnchainKyc = async () => {
    // TODO: kinto 연결

    nav("/info");
  };

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
        Information about kyc is stored in DID
      </div>
      <img src={kyc2} onClick={() => getOnchainKyc()} />
    </div>
  );
};

export default StartPage;
