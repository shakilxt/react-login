import { createBrowserRouter, RouterProvider } from "react-router-dom"
import HomePage from "./pages/Home/HomePage.jsx"
import LoginPage from "./pages/Login/LoginPage.jsx"

import ProtectedRoute from "./components/PR/ProtectedRoute.jsx"
import PostsPage from "./pages/Posts/PostsPage.jsx"

const router = createBrowserRouter([
    {
        path: "/",
        element: <HomePage />
    },
    {
        path: "/login",
        element: <LoginPage /> // Replace with LoginPage
    },
    {
        path: "/register",
        element: <HomePage /> // Replace with RegisterPage
    },
    {
        path: "/posts",
        element: <ProtectedRoute><PostsPage /></ProtectedRoute>,
    }
])

const AppRouter = () => <RouterProvider router={router} />

export default AppRouter