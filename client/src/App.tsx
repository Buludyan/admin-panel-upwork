import { Routes, Route } from "react-router-dom";
import "./App.css";
import { Dashboard } from "./Components/Dashboard/Dashboard";
import { CollegesListPage } from "./Pages/CollegesListPage/CollegesListPage";
import { DetailsPage } from "./Pages/DetailsPage/DetailsPage";

function App() {
  return (
    <div className="App">
      <Dashboard />
      <Routes>
        <Route path="/" element={<CollegesListPage />} />
        <Route path="/:id" element={<DetailsPage />} />
      </Routes>
    </div>
  );
}

export default App;
