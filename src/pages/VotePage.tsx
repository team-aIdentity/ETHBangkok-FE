import React, { useEffect, useRef, useState } from "react";

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

const VotePage = () => {
  const address = "1"; // TODO: 내 지갑 주소

  const [selectedUser, setSelectedUser] = useState<string | null>(null);

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

  const handleVote = (groupId: number) => {
    if (!selectedUser) return;
    // TODO: 투표 로직 구현
    console.log(`Voted for ${selectedUser} in group ${groupId}`);
    setSelectedUser(null);
  };

  const dummyGroupWithout = dummyGroup.filter(
    (group) => !group.users.some((user) => user.wallet === address)
  );
  return (
    <div className="relative flex flex-col gap-8">
      <Wallet />
      <SwiperContainer>
        <div ref={swiperRef} className="swiper w-full">
          <div className="swiper-wrapper items-center">
            {dummyGroupWithout.map((group, idx) => (
              <div
                key={idx}
                className="swiper-slide transition-opacity duration-300"
              >
                <VoteCard
                  group={group}
                  isGroupMember={isGroupMember(group)}
                  selectedUser={selectedUser}
                  onSelectUser={setSelectedUser}
                  onVote={() => handleVote(group.id)}
                  myAddress={address}
                />
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
