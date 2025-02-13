import { Outlet } from "react-router-dom";
import NavBar from "./components/NavBar/NavBar";
import "./App.css";
function App() {
  return (
    <div className="app-container">
      <NavBar />
      <main className="main-content">
        <Outlet />
      </main>
    </div>
  );
}

export default App;
