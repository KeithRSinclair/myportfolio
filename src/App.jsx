
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Navbar from './components/Navbar'
import UnderConstruction from './components/UnderConstruction'
import Footer from './components/Footer'
import CountdownTimer from './components/CountdownTimer'
import ContactForm from './components/ContactForm'
import About from './components/About'
import Projects from './components/Projects'

function Home() {
  return (
    <div className="flex flex-col items-center justify-start px-2 pt-2 sm:pt-10">
      <UnderConstruction />
      <div className="mt-6 sm:mt-8 w-full max-w-6xl">
        <CountdownTimer />
      </div>
      <ContactForm />
    </div>
  )
}

function App() {
  return (
    <BrowserRouter>
      <div className="min-h-screen flex flex-col">
        <Navbar />
        <main className="flex-1 flex flex-col justify-start pb-16 sm:pb-8">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/projects" element={<Projects />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </BrowserRouter>
  )
}

export default App
