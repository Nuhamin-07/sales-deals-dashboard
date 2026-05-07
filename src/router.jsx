import { createBrowserRouter } from "react-router-dom";
import Signin from "./components/Signin.jsx";
import Header from "./components/Header.jsx";
import Dashboard from "./routes/Dashboard.jsx";
import Signup from "./components/Signup.jsx";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <Signin />,
  },
  {
    path: "/signup",
    element: <Signup />,
  },
  {
    path: "/dashboard",
    element: (
      <>
        <Header />
        <Dashboard />
      </>
    ),
  },
]);
