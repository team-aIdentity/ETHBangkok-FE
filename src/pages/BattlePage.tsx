import React from "react";

import Wallet from "../components/Wallet/Wallet";
import Navigation from "../components/Navigation/Navigation";
import VoteCard from "../components/VoteCard/VoteCard";

import { dummyGroup } from "../components/VoteCard/dummy";

const BattlePage = () => {
  const address = "1"; // TODO: 내 지갑 주소

  const isGroupMember = (group: (typeof dummyGroup)[0]) => {
    return group.users.some((user) => user.wallet === address);
  };

  return (
    <div className="relative flex flex-col gap-8">
      <Wallet />
      <div className="w-full">
        <div className="items-center">
          <VoteCard
            group={dummyGroup[0]}
            isGroupMember={isGroupMember(dummyGroup[0])}
            myAddress={address}
          />
        </div>
      </div>
      <Navigation />
    </div>
  );
};

export default BattlePage;
