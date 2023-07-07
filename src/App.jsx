import React from 'react';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Root from './pages/Root';
import Contact from './pages/Contact';
import Detail from './pages/Detail';
import ErrorPage from './pages/ErrorPage';
import Home from './pages/Home';
import NewContact from './pages/NewContact';
import ProtectedRoute from './pages/ProtectedRoute';

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
        element: (
          <ProtectedRoute>
            <Contact />
          </ProtectedRoute>
        ),
      },
      {
        path: '/contacts/:contactId',
        element: (
          <ProtectedRoute>
            <Detail />
          </ProtectedRoute>
        ),
      },
      {
        path: '/newcontact',
        element: (
          <ProtectedRoute>
            <NewContact />
          </ProtectedRoute>
        ),
      },
    ],
  },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
