import React from "react";
import ReactDOM from "react-dom/client";
import { QueryClient, QueryClientProvider } from "react-query";
import "./index.css";
import reportWebVitals from "./reportWebVitals";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { HomePage, ErrorPage, DriversPage, VehiclesPage, CompaniesPage, LoginPage } from "./pages";
import { Navbar, ProtectedRoute } from "./components";

import { ThemeProvider, createTheme } from "@mui/material/styles";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Navbar />,
    errorElement: <ErrorPage />,

    children: [
      {
        path: "/",
        element: <HomePage />
      },
      {
        path: "/motoristas",
        element: (
          <ProtectedRoute>
            <DriversPage />
          </ProtectedRoute>
        )
      },
      {
        path: "/veiculos",
        element: <VehiclesPage />
      },
      {
        path: "/empresas",
        element: <CompaniesPage />
      },
      {
        path: "/login",
        element: <LoginPage />,
        errorElement: <ErrorPage />
      }
    ]
  }
]);

const theme = createTheme({
  typography: {
    fontFamily: `-apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen',
    'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue',
    sans-serif`,
    fontSize: 14,
    fontWeightLight: 300,
    fontWeightRegular: 400,
    fontWeightMedium: 500
  },
  palette: {
    primary: {
      main: "#042440"
    }
  }
});

const queryClient = new QueryClient();

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <ThemeProvider theme={theme}>
        <RouterProvider router={router} />
      </ThemeProvider>
    </QueryClientProvider>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
