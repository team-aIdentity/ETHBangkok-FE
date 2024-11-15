import React from "react";

import profile1 from "@/assets/profile1.png";
import profile2 from "@/assets/profile2.png";

import photo1 from "@/assets/photo1.jpeg";
import photo2 from "@/assets/photo2.jpeg";
import photo3 from "@/assets/photo3.jpeg";
import photo4 from "@/assets/photo4.jpeg";
import { Label } from "../components/ui/label";
import { Input } from "../components/ui/input";
import { Button } from "../components/ui/button";
import { useNavigate } from "react-router-dom";

const Information = () => {
  const nav = useNavigate();

  const connectWallet = async () => {
    // TODO: connect
  };

  const saveProfile = async () => {
    // TODO: post profile

    nav("/main");
  };

  return (
    <div className="bg-white gap-8">
      <div
        className="relative rounded-full bg-gray-300 w-[130px] h-[130px]"
        style={{
          backgroundImage: `url(${photo1})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <img src={profile1} className="absolute bottom-0 right-0" />
        {/* <img
          src={profile2}
          className="absolute w-[20px] h-[20px] top-[50%] left-[50%] transform -translate-x-1/2 -translate-y-1/2"
        /> */}
      </div>

      <div className="flex flex-col gap-4 w-full">
        <Label>Photo</Label>
        <div className="flex justify-between w-full">
          <div
            className="relative rounded-xl bg-gray-300 w-[110px] h-[110px] overflow-hidden"
            style={{
              backgroundImage: `url(${photo2})`,
              backgroundSize: "cover",
              backgroundPosition: "center",
            }}
          />
          <div
            className="relative rounded-xl bg-gray-300 w-[110px] h-[110px] overflow-hidden"
            style={{
              backgroundImage: `url(${photo3})`,
              backgroundSize: "cover",
              backgroundPosition: "center",
            }}
          />
          <div
            className="relative rounded-xl bg-gray-300 w-[110px] h-[110px] overflow-hidden"
            style={{
              backgroundImage: `url(${photo4})`,
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
            defaultValue="Yurina"
            className="border-0 border-[#888888] border-b-[1px] p-0"
          />
        </div>
        <div className="flex gap-1 flex-col">
          <Label>Age</Label>
          <Input
            defaultValue="21"
            className="border-0 border-[#888888] border-b-[1px] p-0"
          />
        </div>
      </div>

      <div className="w-full">
        <div className="flex gap-1 flex-col">
          <Label>About</Label>
          <Input
            defaultValue="Hi, I'm Yurina. Nice to meet you."
            className="border-0 border-[#888888] border-b-[1px] p-0"
          />
        </div>
      </div>

      <div className="w-full flex justify-between gap-4">
        <div className="flex gap-1 flex-col">
          <Label>Country</Label>
          <Input
            defaultValue="Japan"
            className="border-0 border-[#888888] border-b-[1px] p-0"
          />
        </div>
        <div className="flex gap-1 flex-col">
          <Label>Mbti</Label>
          <Input
            defaultValue="ENFP"
            className="border-0 border-[#888888] border-b-[1px] p-0"
          />
        </div>
      </div>

      <div className="w-full">
        <div className="flex gap-1 flex-col">
          <Label>Hobby</Label>
          <Input
            defaultValue="Shopping / Watching movies"
            className="border-0 border-[#888888] border-b-[1px] p-0"
          />
        </div>
      </div>

      <div className="flex flex-col gap-4 w-[90%]">
        <Button variant="gradient" onClick={() => connectWallet()}>
          Connect Wallet
        </Button>
        <Button variant="gradient" onClick={() => saveProfile()}>
          Save Profile
        </Button>
      </div>
    </div>
  );
};

export default Information;
