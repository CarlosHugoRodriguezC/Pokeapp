import './App.scss';
import pokeball from './assets/images/pokeball.png';
import pokemon_logo from './assets/images/Pokemon-Logo.png';
import { AppRouter } from './Routes/AppRouter.js';

function App() {
  return (
    <>
      <header className='header'>
        <div className='logo'>
          <img src={pokeball} width='40' height='auto'></img>
        </div>
      </header>
      <main className='main'>
        <AppRouter />
      </main>
      <footer className='footer'>
        <div></div>
        <div>
          <img src={pokemon_logo} width='100' height='auto'></img>
        </div>
      </footer>
    </>
  );
}

export default App;
