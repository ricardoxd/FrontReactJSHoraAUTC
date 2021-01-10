import logo from './logo.svg';
import './App.css';
import Inicio from './components/inicio/Inicio';
function App() {
  return (
    <div className="App">
      <header className="App-header">
        <h1>Convertidor de hora local a UTC</h1>
        <img src={logo} className="App-logo" alt="logo" />
        <Inicio></Inicio>
      </header>
    </div>
  );
}

export default App;
