import React from 'react';
import ReactDOM from 'react-dom/client';
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import './index.css';
import App from './App';
import ErrorPage from './pages/ErrorPage';
import ProfilePage from './pages/ProfilePage';
import { AppProvider } from './contexts/main';
import { WalletContext } from './contexts/wallet';
import * as buffer from "buffer";
import PublicationPage from './pages/PublicationPage';
import SubspacePage from './pages/SubspacePage';
import ProfileListPage from './pages/ProfileListPage';
import PublicationListPage from './pages/PublicationListPage';
import SubspaceListPage from './pages/SubspaceListPage';
import HomePage from './pages/HomePage';
// import reportWebVitals from './reportWebVitals';

// Workarround fixes the "Buffer is not defined" error
declare const window: Window &
  typeof globalThis & {
    Buffer: any
  }
window.Buffer = buffer.Buffer;

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    errorElement: <ErrorPage />,
    children: [
      { index: true, element: <HomePage /> },
      {
        path: "profiles/",
        element: <ProfileListPage />,
      },
      {
        path: "profiles/:id",
        element: <ProfilePage />,
      },
      {
        path: "publications/",
        element: <PublicationListPage />,
      },
      {
        path: "publications/:id",
        element: <PublicationPage />,
      },
      {
        path: "subspaces/",
        element: <SubspaceListPage />,
      },
      {
        path: "subspaces/:id",
        element: <SubspacePage />,
      },
    ],
  },
]);

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  // <React.StrictMode>
    <WalletContext>
      <AppProvider>
        <RouterProvider router={router} />
      </AppProvider>
    </WalletContext>
  // </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
// reportWebVitals();
