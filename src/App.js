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
  const contextValue = { token, setToken };

  return (
    <DataContextProvider.Provider value={contextValue}>
      <BrowserRouter>
        <ResetCss />
        <GlobalStyle />
        <Routes>
          <Route path="/timeline" element={<TimelinePage />} />
          <Route path="/signup" element={<SignupPage />} />
          <Route path="/" element={<SigninPage />} />
          <Route path="/user/:id?" element={<UserPage />} />
          <Route path="/hashtag/:hashtag" element={<HashtagPage />} />
        </Routes>
      </BrowserRouter>
    </DataContextProvider.Provider>
  );
}

export default App;
