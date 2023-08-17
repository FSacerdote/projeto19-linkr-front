import { BrowserRouter, Route, Routes } from "react-router-dom";
import ResetCss from "./style/ResetCss";
import GlobalStyle from "./style/GlobalStyle";
import TimelinePage from "./pages/TimelinePage";
import SignupPage from "./pages/Login/SignupPage";
import SigninPage from "./pages/Login/SigninPage";

import { useState } from "react";
import DataContextProvider from "./context/AuthContext";



import HashtagPage from "./pages/HashtagPage"
import { UserPage } from "./pages/UserPage";




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
        </Routes>
      </BrowserRouter>
    </DataContextProvider.Provider>

    <BrowserRouter>
      <ResetCss />
      <GlobalStyle />
      <Routes>
        <Route path="/timeline" element={<TimelinePage />} />

        <Route path="/signup" element={<SignupPage />} />
        <Route path="/signin" element={<SigninPage />} />


        <Route path="/user/:id?" element={<UserPage />} />
        <Route path="/hashtag/:hashtag" element={<HashtagPage />} />
      </Routes>
    </BrowserRouter>

  );
}

export default App;
