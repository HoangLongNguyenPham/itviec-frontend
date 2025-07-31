import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import Header from "./components/Header";
import Home from "./pages/Home";
import JobDetail from "./pages/JobDetail";
import Login from "./pages/Login";
import Register from "./pages/Register";
function App() {
  return (
    <Router>
      <Header />
      <main className="container mx-auto px-4 py-6">
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/jobs/:id" element={<JobDetail />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
      </Routes>
      </main>
    </Router>
    
  );
}

export default App;
