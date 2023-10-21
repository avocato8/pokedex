import './App.scss';
import 'bootstrap/dist/css/bootstrap.min.css';
import Background from './components/Background';
import Template from './components/Template';
import Sidebar from './components/sidebar';
import { useState } from 'react';

function App() {
  const [data, setData] = useState([]);
  
  return (
    <div className="App">
      <Sidebar/>
      <Background/>
      <Template>
        <content/>
      </Template>
   
      
    </div>
  );
}

export default App;
