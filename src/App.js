import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import './App.css';
import Contact from './components/pages/Contact';
import Detail from './components/pages/Detail';
import Home from './components/pages/Home';
import Root from './components/pages/Root';

const router = createBrowserRouter([
  {
    path: '/',
    element: <Root />,
    // errorElement: <ErrorPage />,
    children: [
      {
        index: true,
        element: <Home />,
      },
      {
        path: '/contacts/:contactId',
        element: <Detail />,
      },
      {
        path: '/contacts',
        element: <Contact />,
      },
    ],
  },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
