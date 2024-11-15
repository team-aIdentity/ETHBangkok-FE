import React from "react";
import { useNavigate } from "react-router-dom";

import Navigation from "../components/Navigation/Navigation";
import Wallet from "../components/Wallet/Wallet";

import { Button } from "../components/ui/button";
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "../components/ui/hover-card";

import card1 from "@/assets/card1.png";
import card2 from "@/assets/card2.png";
import card3 from "@/assets/card3.png";
import card4 from "@/assets/card4.png";
import card5 from "@/assets/card5.png";

const MainPage = () => {
  const nav = useNavigate();

  const requestJoinBattle = async () => {
    // TODO: 매칭 알고리즘 실행

    nav("/battle");
  };

  return (
    <div className="relative flex flex-col gap-8">
      <Wallet />
      <div className="relative w-full h-[300px]">
        <img
          src={card1}
          className="absolute w-[120px] h-[150px] top-[20px] left-[80px]"
        />
        <img
          src={card2}
          className="absolute w-[120px] h-[150px] top-[20px] left-[170px]"
        />

        {/* 아랫줄 3개 */}
        <img
          src={card3}
          className="absolute w-[150px] h-[170px] top-[100px] left-[40px]"
        />
        <img
          src={card4}
          className="absolute w-[110px] h-[140px] top-[100px] left-[130px]"
        />
        <img
          src={card5}
          className="absolute w-[130px] h-[150px] top-[100px] left-[200px]"
        />
      </div>
      <div className="text-white text-xl">You can make or be A Celebrity!</div>
      <div className="flex gap-8 w-full">
        <Button
          variant="gradient"
          className="text-xl font-bold h-14"
          onClick={() => nav("/vote")}
        >
          VOTE
        </Button>
        <HoverCard>
          <HoverCardTrigger asChild>
            <Button
              variant="gradient"
              className="text-xl font-bold h-14"
              onClick={() => requestJoinBattle()}
            >
              BATTLE
            </Button>
          </HoverCardTrigger>
          <HoverCardContent className="flex flex-col">
            <div>
              <span className="font-bold text-sky-300 border-b-2 border-sky-300">
                1 token
              </span>
              <span> is required</span>
            </div>
            to participate in a battle.
          </HoverCardContent>
        </HoverCard>
      </div>
      <Navigation />
    </div>
  );
};

export default MainPage;
