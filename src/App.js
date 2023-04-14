import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import './App.css';
import Contact from './components/pages/Contact';
import Detail from './components/pages/Detail';
import ErrorPage from './components/pages/ErrorPage';
import Home from './components/pages/Home';
import NewContact from './components/pages/NewContact';
import Root from './components/pages/Root';

const router = createBrowserRouter([
  {
    path: '/',
    element: <Root />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: '/',
        index: true,
        element: <Home />,
      },
      {
        path: '/contacts',
        element: <Contact />,
      },
      {
        path: '/contacts/:contactId',
        element: <Detail />,
      },
      {
        path: '/newcontact',
        element: <NewContact />,
      },
    ],
  },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
