import React from "react";
import Wallet from "../components/Wallet/Wallet";
import Navigation from "../components/Navigation/Navigation";

import rank1 from "@/assets/rank1.svg";
import rank2 from "@/assets/rank2.svg";
import rank3 from "@/assets/rank3.svg";

const RankPage = () => {
  return (
    <div className="relative flex flex-col gap-8">
      <Wallet />
      <div className="w-full h-[550px] text-center overflow-y-auto pb-8 scrollbar-hide [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none] [-webkit-scrollbar]:hidden">
        <div className="w-full">
          <div className="text-white text-xl font-bold mb-2">
            Weekly Ranking
          </div>
          <div className="flex flex-col items-center gap-3 mb-8">
            <img src={rank1} />
            <img src={rank2} />
            <img src={rank3} />
          </div>
        </div>
        <div className="w-full">
          <div className="text-white text-xl font-bold mb-2">
            Montly Ranking
          </div>
          <div className="flex flex-col items-center gap-3 mb-2">
            <img src={rank1} />
            <img src={rank2} />
            <img src={rank3} />
          </div>
        </div>
      </div>
      <Navigation />
    </div>
  );
};

export default RankPage;
