import { BrowserRouter, Route, Routes } from "react-router-dom";
import ResetCss from "./style/ResetCss";
import GlobalStyle from "./style/GlobalStyle";
import TimelinePage from "./pages/TimelinePage";

import SignupPage from "./pages/Signup/SignupPage";

import HashtagPage from "./pages/HashtagPage"
import { UserPage } from "./pages/UserPage";


function App() {
  return (
    <BrowserRouter>
      <ResetCss />
      <GlobalStyle />
      <Routes>
        <Route path="/timeline" element={<TimelinePage />} />

        <Route path="/signup" element={<SignupPage />} />

        <Route path="/user/:id?" element={<UserPage />} />
        <Route path="/hashtag/:hashtag" element={<HashtagPage />} />

      </Routes>
    </BrowserRouter>
  );
}

export default App;
