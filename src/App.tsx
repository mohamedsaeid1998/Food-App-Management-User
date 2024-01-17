import { Login, Register, ResetPass, ResetPassRequest, Verify } from '@/AuthModule/Components'
import { AuthLayout, MasterLayout, NotFound, ProtectedRoute } from '@/SharedModule/Components'
import { RouterProvider, createHashRouter } from 'react-router-dom'
import FavoritesList from './FavoritesModule/Components/FavoritesList/FavoritesList'
import Home from './HomeModule/Components/Home/Home'
import RecipesList from './RecipesModule/Components/RecipesList/RecipesList'

function App() {


  const routes = createHashRouter([
    {
      path: "dashboard", element: <ProtectedRoute><MasterLayout /></ProtectedRoute>, errorElement: <NotFound />, children: [
        { index: true, element: <Home /> },
        { path: "recipes", element: <RecipesList /> },
        { path: "favorites", element: <FavoritesList /> },
      ]
    },

    {
      path: "/", element: <AuthLayout />, errorElement: <NotFound />, children: [
        { index: true, element: <Login /> },
        { path: "login", element: <Login /> },
        { path: "register", element: <Register /> },
        { path: "verify", element: <Verify /> },
        { path: "forget-pass-request", element: <ResetPassRequest /> },
        { path: "reset-pass", element: <ResetPass /> },
      ]
    }
  ])

  return (
    <>
      <RouterProvider router={routes} />
    </>
  )
}

export default App
