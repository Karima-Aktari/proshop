import { BrowserRouter, Routes, Route } from "react-router-dom";
import HomeScreen from "./screens/HomeScreen";
import AppLayout from "./components/AppLayout";

function App() {
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<AppLayout />}>
            <Route index={true} path="/" element={<HomeScreen />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
