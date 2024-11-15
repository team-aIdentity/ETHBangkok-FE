import React from "react";
import Wallet from "../components/Wallet/Wallet";
import Navigation from "../components/Navigation/Navigation";

import user9 from "@/assets/user9.jpeg";
import user4 from "@/assets/user4.jpeg";
import user5 from "@/assets/user5.jpeg";
import heart from "@/assets/heart.svg";

const ChatPage = () => {
  return (
    <div className="relative flex flex-col gap-8">
      <Wallet />
      <div className="w-full h-[550px] overflow-y-auto pb-8 scrollbar-hide [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none] [-webkit-scrollbar]:hidden">
        <div className="w-full flex flex-col">
          <div className="text-white text-xl font-bold mb-8">Message</div>
          <div className="w-full flex justify-between gap-4 p-2">
            <div className="flex gap-4">
              <img src={user9} className="rounded-full w-14 h-14" />
              <div className="flex flex-col justify-center font-bold text-lg">
                Tony
                <span className="font-normal text-sm text-[#767676]">
                  Hi there
                </span>
              </div>
            </div>
            <div className="font-normal text-sm text-[#767676]">12:08 AM</div>
          </div>
          <div className="w-full flex justify-between gap-4 p-2">
            <div className="flex gap-4">
              <div className="relative">
                <img src={user4} className="rounded-full w-14 h-14" />
                <img
                  src={heart}
                  className="absolute top-0 left-[-10px] rounded-full h-6"
                />
                <span className="absolute top-0 left-0 h-6 text-white">1</span>
              </div>
              <div className="flex flex-col justify-center font-bold text-lg">
                Polly
                <span className="font-normal text-sm text-[#767676]">
                  How about you?
                </span>
              </div>
            </div>
            <div className="font-normal text-sm text-[#767676]"> 08:12 AM</div>
          </div>
          <div className="w-full flex justify-between gap-4 p-2">
            <div className="flex gap-4">
              <img src={user5} className="rounded-full w-14 h-14" />
              <div className="flex flex-col justify-center font-bold text-lg">
                Anika
                <span className="font-normal text-sm text-[#767676]">
                  Hi I'm Anika.
                </span>
              </div>
            </div>
            <div className="font-normal text-sm text-[#767676]">11:00 AM</div>
          </div>
        </div>
      </div>
      <Navigation />
    </div>
  );
};

export default ChatPage;
