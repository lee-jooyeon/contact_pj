import { Route, Routes } from 'react-router-dom';
import './App.css';
import Contact from './components/pages/Contact';
import Detail from './components/pages/Detail';
import ErrorPage from './components/pages/ErrorPage';
import Home from './components/pages/Home';
import Layout from './components/pages/Layout';

function App() {
  return (
    <Routes>
      <Route path="/"  element={<Layout />}>
        <Route index element={<Home />} />
        <Route path="/contacts" element={<Contact />} />
        <Route path="/contacts/:contactname" element={<Detail />} />
      </Route>
      <Route path="*" element={<ErrorPage />} />
    </Routes>
  )
}

export default App;
