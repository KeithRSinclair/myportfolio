import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import ContactForm from "./components/ContactForm";
import Projects from "./components/Projects";
import Contact from "./components/Contact";
import Home from "./components/Home";
import { ProgressBar } from "./components/ProgressBar";
import ScrollToTop from "./components/ScrollToTop";

function AppRoutes() {
  const { pathname } = useLocation();

  return (
    <>
      <Home isActive={pathname === "/"} />
      <Routes>
        <Route path="/" element={null} />
        <Route path="/projects" element={<Projects />} />
        <Route path="/contact" element={<Contact />} />
      </Routes>
    </>
  );
}

function App() {
  return (
    <BrowserRouter>
      <div className="min-h-screen flex flex-col">
        <ScrollToTop />
        <Navbar />
        <ProgressBar />
        <main className="flex-1 flex flex-col justify-start overflow-x-hidden">
          <AppRoutes />
        </main>
        <Footer />
      </div>
    </BrowserRouter>
  );
}

export default App;
