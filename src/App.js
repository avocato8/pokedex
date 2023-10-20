import './App.scss';
import 'bootstrap/dist/css/bootstrap.min.css';
import Background from './components/Background';
import Template from './components/Template';

function App() {
  return (
    <div className="App">
      <ul className="nav flex-column">
        <li className="nav-item">
          <a className="nav-link active" aria-current="page" href="#">Active</a>
        </li>
        <li className="nav-item">
          <a className="nav-link" href="#">Link</a>
        </li>
        <li className="nav-item">
          <a className="nav-link" href="#">Link</a>
        </li>
        <li className="nav-item">
          <a className="nav-link disabled" aria-disabled="true">Disabled</a>
        </li>
      </ul>
      <Background/>
      <Template>
        //https://pokeapi.co/api/v2/pokedex/2
      </Template>
   
      
    </div>
  );
}

export default App;
