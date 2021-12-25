import { GiftBox } from "./GiftBox";
import { HashRouter, Routes, Route } from "react-router-dom";

function App() {
  return (
    <HashRouter>
      <Routes>
        <Route path="gift" element={<GiftBox />}></Route>
      </Routes>
    </HashRouter>
  );
}
export default App;
