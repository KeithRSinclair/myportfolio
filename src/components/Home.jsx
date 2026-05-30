import UnderConstruction from './UnderConstruction'
import CountdownTimer from './CountdownTimer'

export default function Home() {
  return (
    <div className="flex flex-col items-center justify-start px-2 pt-2 sm:pt-10">
      <UnderConstruction />
      <div className="mt-6 sm:mt-8 w-full max-w-6xl">
        <CountdownTimer />
      </div>      
    </div>
  )
}