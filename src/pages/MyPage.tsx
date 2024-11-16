import React, { useEffect, useState } from "react";
import axios from "axios";

import Wallet from "../components/Wallet/Wallet";
import Navigation from "../components/Navigation/Navigation";

import profile1 from "@/assets/profile1.png";
import profile2 from "@/assets/profile2.png";

import photo1 from "@/assets/photo1.jpeg";
import photo2 from "@/assets/photo2.jpeg";
import photo3 from "@/assets/photo3.jpeg";
import photo4 from "@/assets/photo4.jpeg";
import { Label } from "../components/ui/label";
import { Input } from "../components/ui/input";
import { Button } from "../components/ui/button";
import { useKinto } from "../hooks/useKinto";
import { useUserInfo } from "../hooks/useUserInfo";

const MyPage = () => {
  const { accountInfo } = useKinto();
  const { data: userInfo, isLoading } = useUserInfo(
    accountInfo?.walletAddress || "0xBd447658d2eaDff72a51386c12A273671a33e064"
  );

  console.log(userInfo);

  const saveProfile = async () => {
    // TODO: post profile
  };

  return (
    <div className="relative">
      <Wallet />
      <div className="w-full h-[550px] overflow-y-auto pb-8 scrollbar-hide [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none] [-webkit-scrollbar]:hidden">
        <div className="flex flex-col gap-8">
          <div
            className="relative rounded-full bg-gray-300 w-[130px] h-[130px]"
            style={{
              backgroundImage: isLoading
                ? ""
                : `url(http://localhost:3000/image/${userInfo?.profileImage})`,
              backgroundSize: "cover",
              backgroundPosition: "center",
            }}
          >
            <img src={profile1} className="absolute bottom-0 right-0" />
          </div>

          <div className="flex flex-col gap-4 w-full">
            <Label>Photo</Label>
            <div className="flex justify-between w-full">
              <div
                className="relative rounded-xl bg-gray-300 w-[110px] h-[110px] overflow-hidden"
                style={{
                  backgroundImage: isLoading ? "" : `url(${photo2})`,
                  backgroundSize: "cover",
                  backgroundPosition: "center",
                }}
              />
              <div
                className="relative rounded-xl bg-gray-300 w-[110px] h-[110px] overflow-hidden"
                style={{
                  backgroundImage: isLoading ? "" : `url(${photo3})`,
                  backgroundSize: "cover",
                  backgroundPosition: "center",
                }}
              />
              <div
                className="relative rounded-xl bg-gray-300 w-[110px] h-[110px] overflow-hidden"
                style={{
                  backgroundImage: isLoading ? "" : `url(${photo4})`,
                  backgroundSize: "cover",
                  backgroundPosition: "center",
                }}
              />
            </div>
          </div>

          <div className="w-full flex justify-between gap-4">
            <div className="flex gap-1 flex-col">
              <Label>Name</Label>
              <Input
                defaultValue={isLoading ? "" : userInfo?.name}
                className="border-0 border-[#888888] border-b-[1px] p-0"
              />
            </div>
            <div className="flex gap-1 flex-col">
              <Label>Age</Label>
              <Input
                defaultValue={isLoading ? "" : userInfo?.age}
                className="border-0 border-[#888888] border-b-[1px] p-0"
              />
            </div>
          </div>

          <div className="w-full">
            <div className="flex gap-1 flex-col">
              <Label>About</Label>
              <Input
                defaultValue={isLoading ? "" : userInfo?.about}
                className="border-0 border-[#888888] border-b-[1px] p-0"
              />
            </div>
          </div>

          <div className="w-full flex justify-between gap-4">
            <div className="flex gap-1 flex-col">
              <Label>Country</Label>
              <Input
                defaultValue={isLoading ? "" : userInfo?.country}
                className="border-0 border-[#888888] border-b-[1px] p-0"
              />
            </div>
            <div className="flex gap-1 flex-col">
              <Label>Mbti</Label>
              <Input
                defaultValue={isLoading ? "" : userInfo?.mbti}
                className="border-0 border-[#888888] border-b-[1px] p-0"
              />
            </div>
          </div>

          <div className="w-full">
            <div className="flex gap-1 flex-col">
              <Label>Hobby</Label>
              <Input
                defaultValue={isLoading ? "" : userInfo?.hobby}
                className="border-0 border-[#888888] border-b-[1px] p-0"
              />
            </div>
          </div>

          <div className="flex flex-col w-[90%]">
            <Button variant="gradient" onClick={() => saveProfile()}>
              Save Profile
            </Button>
          </div>
        </div>
      </div>
      <Navigation />
    </div>
  );
};

export default MyPage;
