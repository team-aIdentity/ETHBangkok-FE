import React, { useEffect, useState } from "react";
import { Progress } from "../ui/progress";

import heart from "@/assets/heart.svg";

import { dummyGroup } from "./dummy";
import { Button } from "../ui/button";

interface VoteCardProps {
  group: (typeof dummyGroup)[0];
  isGroupMember: boolean;
  selectedUser?: string | null;
  onSelectUser?: (wallet: string) => void;
  onVote?: () => void;
  myAddress: string;
}

const VoteCard = ({
  group,
  isGroupMember,
  selectedUser,
  onSelectUser,
  onVote,
  myAddress,
}: VoteCardProps) => {
  // TODO: group 의 vote 현황 가져오기
  /*
struct voteInfo {
    totalVotes: uint256
    users: [
        {
            wallet: address,
            votes: uint256,
        }
    ]
}
mapping groupNum(uint256) => voteInfo(struct)
*/
  const MAX_VOTES = 30;
  const curVote = {
    totalVotes: 26,
    users: [
      {
        wallet: "1",
        votes: 5,
      },
      {
        wallet: "2",
        votes: 6,
      },
      {
        wallet: "3",
        votes: 7,
      },
      {
        wallet: "4",
        votes: 8,
      },
    ],
  };

  const [progress, setProgress] = useState<number>(
    (curVote.totalVotes / MAX_VOTES) * 100
  );
  useEffect(() => {
    // TODO: totalVotes 달라지면 setProgress 실행
    setProgress((curVote.totalVotes / MAX_VOTES) * 100);
  }, [curVote.totalVotes]);

  return (
    <>
      <div className="grid grid-cols-2 gap-2">
        {group.users.map((user: any) => (
          <div
            onClick={() => !isGroupMember && onSelectUser?.(user.wallet)}
            className={`
            relative cursor-pointer w-full border-2 h-[200px] overflow-hidden rounded-xl shadow-xl
            ${
              !isGroupMember && selectedUser === user.wallet
                ? "border-4 border-blue-700"
                : "border-gray-200 opacity-90"
            }
            ${
              user.wallet === myAddress
                ? "border-4 border-pink-600"
                : "border-gray-200"
            }
          `}
          >
            <img
              src={user.image}
              className="h-full w-full object-cover object-center"
            />
            {isGroupMember && (
              <div className="absolute top-2 left-2 w-12 bg-white rounded-full h-7 flex gap-2 p-2 justify-start items-center">
                <img src={heart} className="h-full" />
                <span className="text-xs">
                  {curVote.users.find((vote) => vote.wallet === user.wallet)
                    ?.votes || 0}
                </span>
              </div>
            )}
          </div>
        ))}
      </div>

      <div className="px-4 py-8 flex justify-center">
        {isGroupMember ? (
          <Progress value={progress} className="w-full border" />
        ) : (
          <Button
            variant="gradient"
            onClick={onVote}
            disabled={!selectedUser}
            className="w-[40%] from-blue-600 to-sky-300"
          >
            VOTE
          </Button>
        )}
      </div>
    </>
  );
};

export default VoteCard;
