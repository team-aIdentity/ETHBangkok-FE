import { useQuery } from "@tanstack/react-query";
import { useMutation } from "@tanstack/react-query";

import axios from "axios";

import { Competition, Like } from "../interface/interface";

// 배틀 배열 가져오기
export const useCompetition = () => {
  const fetchCompetition = async (): Promise<Competition> => {
    const response = await axios.get(`http://localhost:3000/competition`);
    return response.data;
  };

  return useQuery({
    queryKey: ["competition"],
    queryFn: fetchCompetition,
  });
};

// 배틀 신청하기
export const useJoinQueue = () => {
  return useMutation({
    mutationFn: async (userId: number) => {
      const response = await axios.post(
        "http://localhost:3000/competition/join-queue",
        {
          userId: userId,
        },
        {
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
            "Access-Control-Allow-Origin": "*",
            "Access-Control-Allow-Methods": "GET,PUT,POST,DELETE,PATCH,OPTIONS",
          },
          withCredentials: true,
          httpsAgent: true,
        }
      );
      return response.data;
    },
  });
};

// 투표하기
export const useLike = () => {
  return useMutation({
    mutationFn: async ({
      competitionId,
      toUserId,
      fromUserId,
    }: {
      competitionId: number;
      toUserId: number;
      fromUserId: number;
    }) => {
      const response = await axios.post(
        "http://localhost:3000/likes",
        {
          competitionId,
          toUserId,
          fromUserId,
        },
        {
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
            "Access-Control-Allow-Origin": "*",
            "Access-Control-Allow-Methods": "GET,PUT,POST,DELETE,PATCH,OPTIONS",
          },
          withCredentials: true,
          httpsAgent: true,
        }
      );
      return response.data;
    },
  });
};

// 특정 컴피티션의 모든 좋아요 또는 특정 유저가 받은 좋아요 조회
export const useCompetitionLikes = (
  competitionId: number
  // toUserId?: number
) => {
  const fetchCompetitionLikes = async (): Promise<Like[]> => {
    const response = await axios.get(
      `http://localhost:3000/likes/competition/${competitionId}`
      // {
      //   params: {
      //     toUserId,
      //   },
      // }
    );
    return response.data;
  };

  return useQuery({
    queryKey: ["competitionLikes", competitionId],
    queryFn: fetchCompetitionLikes,
  });
};

// 특정 컴피티션에서 특정 유저가 누른 좋아요 조회
export const useUserLikeInCompetition = (
  competitionId: number,
  fromUserId: number
) => {
  const fetchUserLike = async (): Promise<Like> => {
    const response = await axios.get(
      `http://localhost:3000/likes/competition/${competitionId}/fromUserId/${fromUserId}`
    );
    return response.data;
  };

  return useQuery({
    queryKey: ["userLikeInCompetition", competitionId, fromUserId],
    queryFn: fetchUserLike,
  });
};
