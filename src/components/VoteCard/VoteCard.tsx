import React, { useEffect, useState } from "react";

import { Progress } from "../ui/progress";
import heart from "@/assets/heart.svg";

import { dummyGroup } from "./dummy";
import { Button } from "../ui/button";
import { Competition, UserInfo } from "../../interface/interface";
import { useKinto } from "../../hooks/useKinto";
import { useUserInfo } from "../../hooks/useUserInfo";
import {
  useCompetitionLikes,
  useUserLikeInCompetition,
} from "../../hooks/useCompetition";

interface VoteCardProps {
  group: Competition;
  isGroupMember: boolean;
  selectedUser?: number | null;
  onSelectUser?: (userId: number) => void;
  onVote?: any;
  // onVote?: (competitionId: number, toUserId: number, fromUserId: number) => void;
  myAddress: string;
  isLoading: boolean;
}

const VoteCard = ({
  group,
  isGroupMember,
  selectedUser,
  onSelectUser,
  onVote,
  myAddress,
  isLoading,
}: VoteCardProps) => {
  const { accountInfo } = useKinto();
  const { data: userInfo } = useUserInfo(
    accountInfo?.walletAddress || "0xBd447658d2eaDff72a51386c12A273671a33e064"
  );

  // 이 배틀의 좋아요 수
  const { data: allLikes } = useCompetitionLikes(group.id);
  // 로그인 유저가 누구에게 투표했는지
  const { data: userLike } = useUserLikeInCompetition(
    group.id,
    userInfo?.id || 12
  ); // competitionId: 1, fromUserId: 456

  console.log(allLikes);
  console.log(userLike);

  const MAX_VOTES = 30;

  // 각 유저별 받은 투표 수 계산
  const votesPerUser = group.likes.reduce(
    (acc: { [key: number]: number }, like) => {
      const toUserId = like.toUser.id;
      acc[toUserId] = (acc[toUserId] || 0) + 1;
      return acc;
    },
    {}
  );

  const [progress, setProgress] = useState<number>(
    (group.likes.length / MAX_VOTES) * 100
  );
  useEffect(() => {
    // TODO: totalVotes 달라지면 setProgress 실행
    setProgress((group.likes.length / MAX_VOTES) * 100);
  }, [group.likes]);

  return (
    <>
      <div className="grid grid-cols-2 gap-2">
        {group.users.map((user: UserInfo) => (
          <div
            onClick={() => !isGroupMember && onSelectUser?.(user.id)}
            className={`
              relative cursor-pointer w-full border-2 border-gray-200 h-[200px] overflow-hidden rounded-xl shadow-xl
              ${!isGroupMember && selectedUser === user.id ? "" : "opacity-90"}
              ${user.account === myAddress ? "border-pink-600" : ""}
              ${
                userLike && userLike.toUser.id !== user.id
                  ? "brightness-50 cursor-not-allowed opacity-100"
                  : " cursor-not-allowed opacity-100"
              }
          `}
          >
            <img
              src={`http://localhost:3000/image/${user.profileImage}`}
              className="h-full w-full object-cover object-center"
            />
            {isGroupMember ? (
              <div className="absolute top-2 left-2 w-12 bg-white rounded-full h-7 flex gap-2 p-2 justify-start items-center">
                <img src={heart} className="h-full" />
                <span className="text-xs">{votesPerUser[user.id] || 0}</span>
              </div>
            ) : (
              <div
                className={`absolute top-2 left-2 bg-white rounded-full h-7 flex gap-2 p-2 justify-start items-center hover:scale-105 ${
                  selectedUser !== user.id && "opacity-40"
                } ${userLike && userLike.id === user.id && "opacity-100"}`}
              >
                <img src={heart} className="h-full" />
                <span className={`text-xs ${!userLike && "hidden"}`}>
                  {votesPerUser[user.id] || 0}
                </span>
              </div>
            )}
          </div>
        ))}
      </div>

      <div className="px-4 py-6 flex justify-center">
        {isGroupMember ? (
          <Progress value={progress} className="w-full border" />
        ) : userLike ? (
          <Button variant="gradientDark" disabled className={`w-[40%]`}>
            Already voted
          </Button>
        ) : (
          <Button
            variant="gradientDark"
            disabled={!selectedUser || userLike}
            onClick={() =>
              selectedUser && userInfo && onVote(group.id, userInfo.id)
            }
            className={`w-[40%] ${
              !selectedUser || userLike
                ? "opacity-50 cursor-not-allowed bg-gray-100"
                : ""
            }`}
          >
            VOTE
          </Button>
        )}
      </div>
    </>
  );
};

export default VoteCard;
