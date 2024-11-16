import { useQuery } from "@tanstack/react-query";
import axios from "axios";

import { UserInfo } from "../interface/interface";

export const useUserInfo = (userId: string) => {
  const fetchUserInfo = async (): Promise<UserInfo> => {
    const response = await axios.get(
      `http://localhost:3000/user/account/${userId}`
    );
    return response.data;
  };

  return useQuery({
    queryKey: ["userInfo", userId],
    queryFn: fetchUserInfo,
  });
};
