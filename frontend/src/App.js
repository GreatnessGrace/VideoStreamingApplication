import React from "react";
import { useRoutes } from "react-router-dom";
import Home from "./pages/Home";
import Watch from "./pages/Watch";
import Search from "./pages/Search";
import Login from "./pages/Login";
import Profile from "./pages/Profile";
import NotFound from "./pages/NotFound";
import SignUp from "./pages/Signup";
import Subscription from "./pages/Subscriptions";
import VideoDetail from "./pages/VideoDetail";

const App = () => {
  const routes = useRoutes([
    { path: "/", element: <Home /> },
    { path: "/watch/:videoId", element: <Watch /> },
    { path: "/search", element: <Search /> },
    { path: "/login", element: <Login /> },
    { path: "/profile", element: <Profile /> },
    { path: "*", element: <NotFound /> },
    { path: "/signup", element: <SignUp /> },
    { path: "/subscription", element: <Subscription /> },
    // { path: "/video-detail", element: <VideoDetail video={sampleVideo} /> },
   
  ]);

  return routes; // Ensure this is within a BrowserRouter
};

export default App;
