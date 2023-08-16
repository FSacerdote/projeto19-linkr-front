import { BrowserRouter, Route, Routes } from "react-router-dom";
import ResetCss from "./style/ResetCss";
import GlobalStyle from "./style/GlobalStyle";
import TimelinePage from "./pages/TimelinePage";
import { UserPage } from "./pages/UserPage";

function App() {
  return (
    <BrowserRouter>
      <ResetCss />
      <GlobalStyle />
      <Routes>
        <Route path="/timeline" element={<TimelinePage />} />
        <Route path="/user/:id?" element={<UserPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
