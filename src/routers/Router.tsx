import { createBrowserRouter } from "react-router-dom";

import App from "../App";

import StartPage from "../pages/StartPage";
import Information from "../pages/Information";
import MainPage from "../pages/MainPage";
import VotePage from "../pages/VotePage";
import BattlePage from "../pages/BattlePage";
import RankPage from "../pages/RankPage";
import ChatPage from "../pages/ChatPage";
import MyPage from "../pages/MyPage";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "/",
        element: <StartPage />,
      },
      {
        path: "/info",
        element: <Information />,
      },
      {
        path: "/main",
        element: <MainPage />,
      },
      {
        path: "/vote",
        element: <VotePage />,
      },
      {
        path: "/battle",
        element: <BattlePage />,
      },
      {
        path: "/rank",
        element: <RankPage />,
      },
      {
        path: "/chat",
        element: <ChatPage />,
      },
      {
        path: "/mypage",
        element: <MyPage />,
      },
    ],
  },
]);

export default router;
