import { ethers } from "ethers";
// import { abi as ERC20ABI } from "@/abi/ERC20.json";
const ERC20_ABI = [
  "function balanceOf(address owner) view returns (uint256)",
  "function decimals() view returns (uint8)",
  "function symbol() view returns (string)",
];

import { createKintoSDK } from "kinto-web-sdk";
import { useState, useCallback, useEffect } from "react";
import { KintoAccountInfo } from "kinto-web-sdk/dist/types";

const KINTO_URL = import.meta.env.VITE_KINTO_URL || "https://app.kinto.xyz";

interface TokenBalance {
  address: string;
  balance: string;
  symbol: string;
  decimals: number;
}

const APP_ADDRESS = "0x9F99a0C9FA804A90Ebb4503A89006fddc3A239a3";

export const useKinto = () => {
  const [accountInfo, setAccountInfo] = useState<KintoAccountInfo | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  const [tokenBalances, setTokenBalances] = useState<TokenBalance[]>([]);
  const [wsProvider, setWsProvider] = useState<ethers.JsonRpcProvider | null>(
    null
  );

  useEffect(() => {
    const provider = new ethers.JsonRpcProvider(
      import.meta.env.VITE_WS_RPC_URL
    );
    setWsProvider(provider);

    return () => {
      if (wsProvider) {
        wsProvider.removeAllListeners();
        wsProvider.destroy();
      }
    };
  }, []);

  const kinto = createKintoSDK(APP_ADDRESS);

  const [kintoSDK, setKintoSDK] = useState<any | null>(null);

  useEffect(() => {
    try {
      const sdk = createKintoSDK(APP_ADDRESS);
      setKintoSDK(sdk);
      console.log("Kinto SDK 초기화 완료:", sdk);
    } catch (error) {
      console.error("Kinto SDK 초기화 실패:", error);
    }
  }, []);

  const connect = useCallback(async () => {
    console.log("연결 시도 중...");
    if (!kintoSDK) {
      throw new Error("Kinto SDK가 초기화되지 않았습니다.");
    }

    try {
      setIsLoading(true);
      setError(null);

      const info = await kintoSDK.connect();
      console.log(info);
      console.log("연결 정보:", JSON.stringify(info, null, 2));
      setAccountInfo(info);
      return info;
    } catch (err) {
      console.error("연결 오류:", err);
      setError(err instanceof Error ? err : new Error("Unknown error"));
      throw err;
    } finally {
      setIsLoading(false);
    }
  }, [kintoSDK]);

  // const connect = useCallback(async () => {
  //   console.log("connect?");
  //   console.log(kinto);
  //   try {
  //     setIsLoading(true);
  //     setError(null);
  //     console.log("먼데ㅠ");
  //     const info = await kinto.connect();
  //     console.log("연결 정보:", JSON.stringify(info, null, 2)); // 자세한 로깅
  //     setAccountInfo(info);
  //     return info;
  //   } catch (err) {
  //     setError(err instanceof Error ? err : new Error("Unknown error"));
  //     throw err;
  //   } finally {
  //     setIsLoading(false);
  //   }
  // }, []);

  const checkKYCStatus = useCallback(async () => {
    try {
      const info = await kinto.connect();
      setAccountInfo(info);
      return info;
    } catch (err) {
      setError(err instanceof Error ? err : new Error("KYC 상태 확인 실패"));
      return false;
    }
  }, []);

  const createNewWallet = useCallback(async () => {
    try {
      setIsLoading(true);
      setError(null);
      await kinto.createNewWallet();
      const info = await kinto.connect();
      setAccountInfo(info);
    } catch (err) {
      setError(err instanceof Error ? err : new Error("지갑 생성 실패"));
      throw err;
    } finally {
      setIsLoading(false);
    }
  }, []);

  const getTokenBalance = useCallback(
    async (tokenAddress: string) => {
      try {
        if (!accountInfo?.walletAddress) {
          throw new Error("wallet is not connected.");
        }

        // TODO: provider 설정
        const provider = new ethers.JsonRpcProvider("YOUR_RPC_URL");

        const tokenContract = new ethers.Contract(
          tokenAddress,
          ERC20_ABI,
          provider
        );

        const [balance, decimals, symbol] = await Promise.all([
          tokenContract.balanceOf(accountInfo.walletAddress),
          tokenContract.decimals(),
          tokenContract.symbol(),
        ]);

        // 실제 토큰 수량으로 변환
        const formattedBalance = ethers.formatUnits(balance, decimals);

        return {
          balance: formattedBalance,
          symbol,
          decimals,
        };
      } catch (err) {
        setError(err instanceof Error ? err : new Error("토큰 잔액 조회 실패"));
        throw err;
      }
    },
    [accountInfo]
  );

  const monitorTokenBalance = useCallback(
    async (tokenAddress: string) => {
      if (!wsProvider || !accountInfo?.walletAddress) return;

      const tokenContract = new ethers.Contract(
        tokenAddress,
        ERC20_ABI,
        wsProvider
      );

      // Transfer 이벤트 필터 생성
      const filterFrom = tokenContract.filters.Transfer(
        accountInfo.walletAddress,
        null
      );
      const filterTo = tokenContract.filters.Transfer(
        null,
        accountInfo.walletAddress
      );

      // 잔액 업데이트 함수
      const updateBalance = async () => {
        const [balance, decimals, symbol] = await Promise.all([
          tokenContract.balanceOf(accountInfo.walletAddress),
          tokenContract.decimals(),
          tokenContract.symbol(),
        ]);

        setTokenBalances((prev) => {
          const newBalances = [...prev];
          const index = newBalances.findIndex(
            (t) => t.address === tokenAddress
          );
          const newBalance = {
            address: tokenAddress,
            balance: ethers.formatUnits(balance, decimals),
            symbol,
            decimals,
          };

          if (index === -1) {
            newBalances.push(newBalance);
          } else {
            newBalances[index] = newBalance;
          }
          return newBalances;
        });
      };

      // 이벤트 리스너 등록
      tokenContract.on(filterFrom, updateBalance);
      tokenContract.on(filterTo, updateBalance);

      // 초기 잔액 조회
      await updateBalance();

      // 클린업 함수 반환
      return () => {
        tokenContract.off(filterFrom, updateBalance);
        tokenContract.off(filterTo, updateBalance);
      };
    },
    [wsProvider, accountInfo]
  );

  return {
    kinto,
    accountInfo,
    isLoading,
    error,
    connect,
    checkKYCStatus,
    createNewWallet,

    tokenBalances,
    monitorTokenBalance,
    getTokenBalance,
  };
};
