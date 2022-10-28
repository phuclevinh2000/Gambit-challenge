import { BrowserRouter, Routes, Route } from 'react-router-dom';
import './App.css';
import Home from './page/Home/Home';
import Error from './page/Error/Error';
import Login from './page/Login/Login';
import ConnectTool from './component/ConnectTool/ConnectTool';
import SharedLayout from './component/SharedLayout/SharedLayout';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<SharedLayout />}>
          <Route index element={<Home />} />
        </Route>
        <Route path='/login' element={<Login />} />
        <Route path='*' element={<Error />} />
      </Routes>

      <ConnectTool />
    </BrowserRouter>
  );
}

export default App;
