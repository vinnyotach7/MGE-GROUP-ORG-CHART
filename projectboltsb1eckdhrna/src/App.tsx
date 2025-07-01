import "./App.css"
import Footer from "./components/Footer"

function App() {
  return (
    <div className="App">
      <header>
        <nav>
          <ul>
            <li>
              <a href="/">Home</a>
            </li>
            <li>
              <a href="/about">About</a>
            </li>
            <li>
              <a href="/staff">Staff</a>
            </li>
          </ul>
        </nav>
      </header>

      <main className="container mx-auto mt-8 px-4">
        <h1>Welcome to MGE Group Staff Management System</h1>
        <p>This is a simple staff management system built with React and TypeScript.</p>
      </main>

      <Footer />
    </div>
  )
}

export default App
