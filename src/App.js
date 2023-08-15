import { BrowserRouter, Route, Routes } from 'react-router-dom';
import ResetCss from './style/ResetCss';
import GlobalStyle from './style/GlobalStyle';
import TimelinePage from './pages/TimelinePage';


function App() {
  return (
    <BrowserRouter>
      <ResetCss />
      <GlobalStyle />
      <Routes>
        <Route path="/timeline" element={<TimelinePage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
