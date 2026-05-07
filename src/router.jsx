import { createBrowserRouter } from "react-router-dom";
import Signin from "./components/Signin.jsx";
import Header from "./components/Header.jsx";
import Dashboard from "./routes/Dashboard.jsx";
import Signup from "./components/Signup.jsx";
import RouteRedirect from "./routes/RouteRedirect.jsx";
import ProtectedRoute from "./components/ProtectedRoute.jsx";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <RouteRedirect />,
  },
  {
    path: "/signin",
    element: <Signin />,
  },
  {
    path: "/signup",
    element: <Signup />,
  },
  {
    path: "/dashboard",
    element: (
      <ProtectedRoute>
        <Header />
        <Dashboard />
      </ProtectedRoute>
    ),
  },
]);
