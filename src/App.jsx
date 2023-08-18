import reactLogo from './assets/react.svg'
import tomato from './assets/tomato.png'
import './App.css'

function App() {

  return (
    <>
      <div>
        <a href="https://react.dev" target="_blank">
          <img src={reactLogo} className="logo" alt="React logo" />
        </a>
        <a href="https://en.wikipedia.org/wiki/Pomodoro_Technique" target="_blank">
          <img src={tomato} className="logo" alt="tomato logo" />
        </a>
      </div>
      <h1>Hello, whirld</h1>
    </>
  )
}

export default App
