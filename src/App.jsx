import React from 'react';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Contact from './pages/Contact';
import Detail from './pages/Detail';
import ErrorPage from './pages/ErrorPage';
import Home from './pages/Home';
import NewContact from './pages/NewContact';
import Root from './pages/Root';

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
