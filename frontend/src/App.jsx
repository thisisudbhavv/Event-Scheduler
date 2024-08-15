import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Home } from "./pages/Home";
import { AddEvent } from "./pages/AddEvent";

function App() {
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route index element={<Home />} />
          <Route path="/addevent" element={<AddEvent />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
