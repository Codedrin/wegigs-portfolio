import Header from "./components/Header"
import Hero from "./components/Hero"
import AmbientBackground from "./components/AmbientBackground"

function App() {
  return (
    <div className="pointer-events-none relative min-h-screen bg-ink">
      <AmbientBackground />
      <Header />
      <main className="pointer-events-none relative z-10">
        <Hero />
      </main>
    </div>
  )
}

export default App
