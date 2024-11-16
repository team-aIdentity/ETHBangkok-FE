import React, { useEffect, useRef, useState } from "react";
import { useQueryClient } from "@tanstack/react-query";

import Wallet from "../components/Wallet/Wallet";
import Navigation from "../components/Navigation/Navigation";
import VoteCard from "../components/VoteCard/VoteCard";

import Swiper from "swiper";
import { Navigation as SwiperNavigation, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

import styled from "styled-components";

const SwiperContainer = styled.div`
  height: 500px;

  .swiper {
    overflow: visible;
  }
  .swiper-slide-active {
    opacity: 1 !important;
    z-index: 100;
    transform: translateY(3%);
  }
  .swiper-slide {
    width: 100% !important;
    transition: 0.3s ease;
    opacity: 0.5;
  }
`;

import { dummyGroup } from "../components/VoteCard/dummy";
import { useKinto } from "../hooks/useKinto";
import { useCompetition, useLike } from "../hooks/useCompetition";
import { UserInfo } from "../interface/interface";

const VotePage = () => {
  const queryClient = useQueryClient();

  const address = "0xBd447658d2eaDff72a51386c12A273671a33e064"; // TODO: 내 지갑 주소
  const { accountInfo } = useKinto();
  const { data: competitionArr, isLoading } = useCompetition();
  const { mutate: like } = useLike();

  const [selectedUser, setSelectedUser] = useState<number | null>(null);

  const swiperRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (swiperRef.current) {
      new Swiper(swiperRef.current, {
        modules: [SwiperNavigation, Pagination],
        slidesPerView: 1.0,
        spaceBetween: -90,
        centeredSlides: true,
        loop: false,
        initialSlide: 0,
        pagination: {
          el: ".swiper-pagination",
          clickable: true,
        },
        navigation: {
          nextEl: ".swiper-button-next",
          prevEl: ".swiper-button-prev",
        },
      });
    }
  }, []);

  const isGroupMember = (group: (typeof dummyGroup)[0]) => {
    return group.users.some((user) => user.wallet === address);
  };

  const handleVote = (competitionId: number, fromUserId: number) => {
    if (!selectedUser) return;
    // TODO: 투표 로직 구현
    // console.log(`Voted for ${selectedUser} in group ${competitionId}`);
    try {
      console.log(competitionId, selectedUser, fromUserId);
      const res = like({ competitionId, toUserId: selectedUser, fromUserId });
      console.log(res);

      queryClient.invalidateQueries({
        queryKey: ["competitionLikes", competitionId],
      });
      queryClient.invalidateQueries({
        queryKey: ["userLikeInCompetition", competitionId, fromUserId],
      });
      // setSelectedUser(null);
    } catch (error) {
      console.log(error);
    }
  };

  // const dummyGroupWithout = dummyGroup.filter(
  //   (group) => !group.users.some((user) => user.wallet === address)
  // );

  const filteredGroups = Array.isArray(competitionArr)
    ? competitionArr.filter(
        (group) =>
          !group.users.some(
            (user: UserInfo) => user.account === accountInfo?.walletAddress
          )
      )
    : [];
  // console.log(filteredGroups);

  return (
    <div className="relative flex flex-col gap-8">
      <Wallet />
      <SwiperContainer>
        <div ref={swiperRef} className="swiper w-full">
          <div className="swiper-wrapper items-center">
            {filteredGroups.map((group, idx) => (
              <div
                key={idx}
                className="swiper-slide transition-opacity duration-300"
              >
                {!isLoading && (
                  <VoteCard
                    group={group}
                    isGroupMember={isGroupMember(group)}
                    selectedUser={selectedUser}
                    onSelectUser={setSelectedUser}
                    onVote={handleVote}
                    myAddress={address}
                    isLoading={isLoading}
                  />
                )}
              </div>
            ))}
          </div>
        </div>
      </SwiperContainer>
      <Navigation />
    </div>
  );
};

export default VotePage;
