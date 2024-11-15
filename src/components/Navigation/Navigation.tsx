import React from "react";
import { useLocation, useNavigate } from "react-router-dom";

import vote from "@/assets/vote.png";
import rank from "@/assets/rank.svg";
import chat from "@/assets/chat.svg";
import mypage from "@/assets/mypage.svg";

const navArr = [
  {
    path: "/main",
    icon: vote,
  },
  {
    path: "/rank",
    icon: rank,
  },
  {
    path: "/chat",
    icon: chat,
  },
  {
    path: "/mypage",
    icon: mypage,
  },
];

const Navigation = () => {
  const nav = useNavigate();
  const { pathname } = useLocation();

  const getIconColor = (path: string) => {
    return pathname === path
      ? "cursor-pointer h-[35px] w-[35px] filter invert brightness-0 contrast-100" // 활성화 상태에 shadow 추가
      : "cursor-pointer h-[35px] w-[35px] filter invert brightness-0"; // 비활성화 (회색)
  };

  return (
    <div className="rounded-xl absolute bottom-0 w-full h-[80px] px-8 bg-gradient-to-r from-sky-300 to-pink-200 transition-all">
      <div className="flex justify-between items-center h-full">
        {navArr.map((n) => {
          if (n.path === "/main") {
            return (
              <div
                className={`rounded-full p-3 flex justify-center items-center hover:scale-90 hover:shadow-inner hover:shadow-gray-400 ${
                  pathname === n.path && "scale-90 shadow-inner shadow-gray-400"
                } transition-all active:translate-y-2`}
              >
                <div
                  className="h-[35px] w-[35px] cursor-pointer bg-gradient-to-r from-blue-500 to-purple-500"
                  style={{
                    WebkitMask: `url(${vote}) center/contain no-repeat`,
                    mask: `url(${vote}) center/contain no-repeat`,
                  }}
                  onClick={() => nav("/main")}
                />
              </div>
            );
          } else {
            return (
              <div
                className={`rounded-full p-3 flex justify-center items-center hover:scale-90 hover:shadow-inner hover:shadow-gray-400 ${
                  pathname === n.path && "scale-90 shadow-inner shadow-gray-400"
                } transition-all active:translate-y-2`}
              >
                <img
                  src={n.icon}
                  className={getIconColor(n.path)}
                  onClick={() => nav(n.path)}
                />
              </div>
            );
          }
        })}
      </div>
    </div>
  );
};

export default Navigation;
