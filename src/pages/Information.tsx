import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useKinto } from "../hooks/useKinto";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import axios from "axios";
import { usePrivy } from "@privy-io/react-auth";

import { Label } from "../components/ui/label";
import { Input } from "../components/ui/input";
import { Button } from "../components/ui/button";

import profile1 from "@/assets/profile1.png";
import profile2 from "@/assets/profile2.png";

import photo1 from "@/assets/photo1.jpeg";
import photo2 from "@/assets/photo2.jpeg";
import photo3 from "@/assets/photo3.jpeg";
import photo4 from "@/assets/photo4.jpeg";

import kintoLogo from "@/assets/kinto-logo.jpeg";
import ethLogo from "@/assets/ethereum-logo.jpg";

// 입력 스키마
const profileSchema = z.object({
  name: z.string(),
  age: z.string(),
  about: z.string(),
  country: z.string(),
  mbti: z.string(),
  hobby: z.string(),
});

const Information = () => {
  const { accountInfo } = useKinto(); // TODO: info
  const { login, logout, authenticated, user } = usePrivy();

  const nav = useNavigate();

  const [profileImg, setProfileImg] = useState<string>(""); // 백 저장용
  const [readImg, setReadImg] = useState<string>(""); // 프론트 렌더용

  const form = useForm<z.infer<typeof profileSchema>>({
    resolver: zodResolver(profileSchema),
    mode: "onChange",
  });

  const onSubmit = async (data: z.infer<typeof profileSchema>) => {
    const newUser = {
      account:
        accountInfo?.walletAddress ||
        "0xBd447658d2eaDff72a51386c12A273671a33e064",
      name: data.name,
      age: data.age.toString(),
      country: data.country,
      mbti: data.mbti,
      hobby: data.hobby,
      about: data.about,
      profileImage: profileImg,
    };
    console.log(newUser);
    try {
      const response = await axios.post("http://localhost:3000/user", newUser, {
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
          "Access-Control-Allow-Origin": "*",
          "Access-Control-Allow-Methods": "GET,PUT,POST,DELETE,PATCH,OPTIONS",
        },
        withCredentials: true,
        httpsAgent: true,
      });
      console.log(response);
      nav("/main");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="bg-white gap-8">
      <div
        className="cursor-pointer relative rounded-full bg-gray-300 w-[130px] h-[130px]"
        style={{
          backgroundImage: `url(${readImg})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
        onClick={() => {
          const input = document.createElement("input");
          input.type = "file";
          input.accept = "image/*";
          input.onchange = async (e) => {
            const file = (e.target as HTMLInputElement).files?.[0];
            if (file) {
              if (file.size > 500 * 1024 * 1024) {
                return;
              }
              const formData = new FormData();
              formData.append("image", file);

              try {
                const { data } = await axios.post(
                  "http://localhost:3000/upload/image",
                  formData,
                  {
                    headers: {
                      "Content-Type": "multipart/form-data",
                    },
                  }
                );
                console.log(data);
                setProfileImg(data.filename);
                // 미리보기용 URL
                const previewUrl = URL.createObjectURL(file);
                setReadImg(previewUrl);
                return () => URL.revokeObjectURL(previewUrl);
              } catch (error) {
                console.error("fail to upload.");
              }
            }
          };
          input.click();
        }}
      >
        <img src={profile1} className={`absolute bottom-0 right-0`} />
        <img
          src={profile2}
          className={`absolute w-[20px] h-[20px] top-[50%] left-[50%] transform -translate-x-1/2 -translate-y-1/2 ${
            readImg && "hidden"
          }`}
        />
      </div>

      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="flex flex-col gap-8"
      >
        <div className="flex flex-col gap-4 w-full">
          <Label>Photo</Label>
          <div className="flex justify-between w-full gap-4">
            <img src={photo2} className="w-1/3 h-24 object-cover rounded-xl" />
            <img src={photo3} className="w-1/3 h-24 object-cover rounded-xl" />
            <img src={photo4} className="w-1/3 h-24 object-cover rounded-xl" />
          </div>
        </div>

        <div className="w-full flex justify-between gap-4">
          <div className="flex gap-1 flex-col">
            <Label>Name</Label>
            <Input
              {...form.register("name")}
              defaultValue="Yurina"
              className="border-0 border-[#888888] border-b-[1px] p-0"
            />
          </div>
          <div className="flex gap-1 flex-col">
            <Label>Age</Label>
            <Input
              {...form.register("age")}
              defaultValue="21"
              className="border-0 border-[#888888] border-b-[1px] p-0"
            />
          </div>
        </div>

        <div className="w-full">
          <div className="flex gap-1 flex-col">
            <Label>About</Label>
            <Input
              {...form.register("about")}
              defaultValue="Hi, I'm Yurina. Nice to meet you."
              className="border-0 border-[#888888] border-b-[1px] p-0"
            />
          </div>
        </div>

        <div className="w-full flex justify-between gap-4">
          <div className="flex gap-1 flex-col">
            <Label>Country</Label>
            <Input
              {...form.register("country")}
              defaultValue="Thailand"
              className="border-0 border-[#888888] border-b-[1px] p-0"
            />
          </div>
          <div className="flex gap-1 flex-col">
            <Label>Mbti</Label>
            <Input
              {...form.register("mbti")}
              defaultValue="ENFP"
              className="border-0 border-[#888888] border-b-[1px] p-0"
            />
          </div>
        </div>

        <div className="w-full">
          <div className="flex gap-1 flex-col">
            <Label>Hobby</Label>
            <Input
              {...form.register("hobby")}
              defaultValue="Watching movies"
              className="border-0 border-[#888888] border-b-[1px] p-0"
            />
          </div>
        </div>

        <div className="flex flex-col items-center justify-center gap-4 w-full">
          <Button variant="gradient" onClick={authenticated ? logout : login}>
            {authenticated
              ? `${user?.wallet?.address.slice(
                  0,
                  6
                )}...${user?.wallet?.address.slice(-4)}`
              : "Connect Wallet"}
          </Button>
          <Button type="submit" variant="gradient">
            Save Profile
          </Button>
        </div>
      </form>
    </div>
  );
};

export default Information;
