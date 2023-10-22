import './App.scss';
import 'bootstrap/dist/css/bootstrap.min.css';
import Background from './components/Background';
import Template from './components/Template';
import Sidebar from './components/sidebar';
import { Route, Routes } from 'react-router-dom';
import Spec from './components/spec';

function App() {

  return (
    <div className="App">
      <Background />
      <Sidebar/>
      <Routes>
        <Route path="/" element={
              <Template>
                <content />
              </Template>
        }></Route>



        <Route path="gen1/:id" element={
          <Spec />
        }>
        </Route>
      </Routes>



    </div>
  );
}

export default App;
