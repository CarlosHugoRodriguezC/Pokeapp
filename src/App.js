import './App.scss';
import pokeball from './assets/images/pokeball.png';
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
      <footer className='footer'></footer>
    </>
  );
}

export default App;
