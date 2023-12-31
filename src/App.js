import { BrowserRouter, Route, Routes } from "react-router-dom";
import ResetCss from "./style/ResetCss";
import GlobalStyle from "./style/GlobalStyle";
import TimelinePage from "./pages/TimelinePage";
import { useState } from "react";
import DataContextProvider from "./context/AuthContext";
import HashtagPage from "./pages/HashtagPage";
import { UserPage } from "./pages/UserPage";
import SigninPage from "./pages/Login/SigninPage";
import SignupPage from "./pages/Login/SignupPage";

function App() {
  const [token, setToken] = useState(localStorage.getItem("token"));
  const [picture, setPicture] = useState(localStorage.getItem("picture"));
  const [userId, setUserId] = useState(parseInt(localStorage.getItem("userId")));
  const [config, setConfig] = useState({
    headers: { authorization: `Bearer ${token}` },
  });
  const [loggedUsername, setLoggedUsername] = useState(localStorage.getItem("username"));
  const contextValue = {
    token,
    setToken,
    picture,
    setPicture,
    config,
    setConfig,
    userId,
    setUserId,
    loggedUsername,
    setLoggedUsername
  };

  return (
    <DataContextProvider.Provider value={contextValue}>
      <BrowserRouter>
        <ResetCss />
        <GlobalStyle />
        <Routes>
          <Route path="/timeline" element={<TimelinePage />} />
          <Route path="/sign-up" element={<SignupPage />} />
          <Route path="/" element={<SigninPage />} />
          <Route path="/user/:id?" element={<UserPage />} />
          <Route path="/hashtag/:hashtag" element={<HashtagPage />} />
        </Routes>
      </BrowserRouter>
    </DataContextProvider.Provider>
  );
}

export default App;
