import React, { useState, useEffect } from "react";
import { ethers } from "ethers";

import { Button } from "../ui/button";

import cloud from "@/assets/cloud.svg";
import { useKinto } from "../../hooks/useKinto";
import { usePrivy } from "@privy-io/react-auth";

const ERC20_ABI = [
  "function balanceOf(address owner) view returns (uint256)",
  "function decimals() view returns (uint8)",
];

const Wallet = () => {
  const { user, ready } = usePrivy();
  const [tokenBalance, setTokenBalance] = useState<string>("0");

  const { accountInfo, tokenBalances } = useKinto();
  console.log(accountInfo);
  // TOOD : wallet info
  // const address = "0x3710a38d7310F0036a6094cC8b9aBae95Fcf2B20";

  const fetchTokenBalance = async () => {
    if (!user?.wallet?.address) return;

    try {
      // MetaMask provider 가져오기
      const provider = new ethers.BrowserProvider(window.ethereum);

      // 토큰 컨트랙트 주소 (여기에 확인하고자 하는 토큰의 컨트랙트 주소를 입력)
      const tokenAddress = "0x9F99a0C9FA804A90Ebb4503A89006fddc3A239a3";

      // 토큰 컨트랙트 인스턴스 생성
      const tokenContract = new ethers.Contract(
        tokenAddress,
        ERC20_ABI,
        provider
      );

      // 잔액 조회
      const balance = await tokenContract.balanceOf(user.wallet.address);
      const decimals = await tokenContract.decimals();

      // 잔액을 적절한 단위로 변환
      const formattedBalance = ethers.formatUnits(balance, decimals);
      setTokenBalance(formattedBalance);
    } catch (error) {
      console.error("토큰 잔액 조회 실패:", error);
    }
  };

  // 지갑 연결 시 잔액 조회
  useEffect(() => {
    if (ready && user?.wallet?.address) {
      fetchTokenBalance();
    }
  }, [ready, user?.wallet?.address]);

  return (
    <div className="absolute top-0 w-full h-12 px-8 flex justify-between items-center">
      <Button variant="gradientDark" className="w-auto p-1">
        <div className="w-full h-full bg-white rounded-full flex items-center gap-2 p-2 pr-4">
          {/* <div className="bg-white opacity-95 w-8 h-8 rounded-full text-sky-300 flex justify-center items-center text-lg font-bold">
            C
          </div> */}
          <img src={cloud} className="h-[80%]" />
          <span className="text-[#767676] h-full flex justify-center items-center">
            {/* {tokenBalances[0]?.balance?.toString() || 13} */}
            {tokenBalance}
          </span>
        </div>
      </Button>
      <Button variant="gradientDark" className="w-auto">
        {user?.wallet?.address
          ? `${user.wallet.address.slice(0, 5)}...${user.wallet.address.slice(
              -3
            )}`
          : "Connect Wallet"}
      </Button>
    </div>
  );
};

export default Wallet;
