import "./App.css";
import Home from "./components/Home";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import BlogPage from "./components/BlogPage";

function App() {
  return <>
    <BrowserRouter>
      <Routes>
        <Route exact path="/" element={<Home />} />
        <Route exact path="/blog/:id" element={<BlogPage />} />
      </Routes>
    </BrowserRouter>
    <Toaster />
   </>;
}

export default App;
