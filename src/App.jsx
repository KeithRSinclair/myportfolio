
import Navbar from './components/Navbar'
import UnderConstruction from './components/UnderConstruction'
import Footer from './components/Footer'
import CountdownTimer from './components/CountdownTimer'

function App() {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      {/* Portfolio Launch countdown — import is at the top; placed immediately under UnderConstruction */}
      <main className="flex-1 flex flex-col justify-start pb-8">
        <div className="flex flex-col items-center justify-start px-2 pt-2 sm:pt-10">
          <UnderConstruction />
          <div className="mt-6 sm:mt-8 w-full max-w-6xl">
            <CountdownTimer />
          </div>
        </div>
      </main>
      <Footer />
    </div>
  )
}

export default App
