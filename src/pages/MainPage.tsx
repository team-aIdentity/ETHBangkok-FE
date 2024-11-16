import React from "react";
import { useNavigate } from "react-router-dom";
import { ethers } from "ethers";
import { usePrivy } from "@privy-io/react-auth";
import type { UnsignedTransactionRequest } from "@privy-io/react-auth";

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
import { useKinto } from "../hooks/useKinto";
import { useJoinQueue } from "../hooks/useCompetition";
import { useUserInfo } from "../hooks/useUserInfo";

const ERC20_ABI = [
  "function transfer(address to, uint256 amount) returns (bool)",
  "function approve(address spender, uint256 amount) returns (bool)",
  "function allowance(address owner, address spender) view returns (uint256)",
  "function decimals() view returns (uint8)",
];

const contractAddress = "0x9F99a0C9FA804A90Ebb4503A89006fddc3A239a3"; // TODO
const collectingAddress = "0xa7E6a5baA467E212f6c0B996828839902Da32ec9";
const KINTO_RPC_URL = "https://rpc.kinto.xyz/http";

interface TxCall {
  to: `0x${string}`;
  data: `0x${string}`;
  value: bigint;
}

const MainPage = () => {
  const { user } = usePrivy();

  const { kinto, accountInfo } = useKinto();
  const { data: userInfo, isLoading } = useUserInfo(
    `${
      accountInfo?.walletAddress || "0xBd447658d2eaDff72a51386c12A273671a33e064"
    }`
  );
  const nav = useNavigate();

  const { mutate: joinQueue } = useJoinQueue();

  const requestJoinBattle = async () => {
    if (!userInfo || !user?.wallet?.address) return;

    try {
      // 매칭 큐 참여
      const res = await joinQueue(userInfo.id);
      console.log(res);
      nav("/battle");
    } catch (error) {
      console.error("Transaction failed:", error);
      alert("Transaction failed. Please check your wallet and try again.");
    }
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
      <div className="text-white text-xl">You can be or make A Celebrity!</div>
      <div className="flex gap-8 w-full">
        <Button
          variant="gradient"
          className="text-xl font-bold h-14 hover:transition-all group hover:from-sky-600 hover:to-sky-400"
          onClick={() => nav("/vote")}
        >
          <span className="group-hover:hidden">MAKE</span>
          <span className="hidden group-hover:block">VOTE</span>
        </Button>
        <HoverCard>
          <HoverCardTrigger asChild>
            <Button
              variant="gradient"
              className="text-xl font-bold h-14 hover:transition-all group hover:from-pink-600 hover:to-pink-400"
              onClick={() => requestJoinBattle()}
            >
              <span className="group-hover:hidden">BE</span>
              <span className="hidden group-hover:block">BATTLE</span>{" "}
            </Button>
          </HoverCardTrigger>
          <HoverCardContent className="flex flex-col">
            <div>
              <span className="font-bold text-pink-600 border-b-2 border-pink-300">
                1 Token
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
