import React from "react";

import Wallet from "../components/Wallet/Wallet";
import Navigation from "../components/Navigation/Navigation";
import VoteCard from "../components/VoteCard/VoteCard";

import { dummyGroup } from "../components/VoteCard/dummy";
import { useKinto } from "../hooks/useKinto";
import { useCompetition } from "../hooks/useCompetition";
import { Competition, UserInfo } from "../interface/interface";

const BattlePage = () => {
  const address = "0xBd447658d2eaDff72a51386c12A273671a33e064"; // TODO: 내 지갑 주소
  const { accountInfo } = useKinto();
  const { data: competitionArr, isLoading } = useCompetition();

  if (isLoading || !competitionArr) return <></>;

  const isGroupMember = (group: Competition) => {
    return group.users.some((user) => user.account === address); // TODO : 실제로 바꾸기
  };

  // console.log(competitionArr);
  const filteredGroup = Array.isArray(competitionArr)
    ? competitionArr.find((group) =>
        group.users.some(
          (user: UserInfo) => user.account === address
          // (user: UserInfo) => user.account === accountInfo?.walletAddress // TODO : 실제로 바꾸기
        )
      )
    : null;
  console.log(filteredGroup);

  return (
    <div className="relative flex flex-col gap-8">
      <Wallet />
      <div className="w-full">
        <div className="items-center">
          <VoteCard
            group={filteredGroup}
            isGroupMember={isGroupMember(filteredGroup)}
            myAddress={address}
            isLoading={isLoading}
          />
        </div>
      </div>
      <Navigation />
    </div>
  );
};

export default BattlePage;
