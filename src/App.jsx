import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import ContactForm from "./components/ContactForm";
import Projects from "./components/Projects";
import Contact from "./components/Contact";
import Home from "./components/Home";
import { ProgressBar } from "./components/ProgressBar";
import ScrollToTop from "./components/ScrollToTop";

function App() {
  return (
    <BrowserRouter>
      <div className="min-h-screen flex flex-col">
        <ScrollToTop />
        <Navbar />
        <ProgressBar />
        <main className="flex-1 flex flex-col justify-start overflow-x-hidden">
          <Routes>
            <Route path="/" element={<Home />} />            
            <Route path="/projects" element={<Projects />} />
            <Route path="/contact" element={<Contact />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </BrowserRouter>
  );
}

export default App;
