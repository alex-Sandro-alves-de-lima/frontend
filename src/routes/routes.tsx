import { createBrowserRouter } from 'react-router-dom';
import App from '../App.tsx';
import Error404 from "../components/error404.tsx";
import Login from "../components/Login/login.tsx";
import PrivateRoute from './privateRoutes.tsx';
import AddItemForm from '../components/item/AddItemForm.tsx';
import ListItemForm from '../components/item/ListItemForm.tsx';
import ListItem from '../components/item/ListItem.tsx';
import EditItem from '../components/item/editItem.tsx';
import Item from '../components/item/item.tsx';

const router = createBrowserRouter([
  {
    path: "/",
      element: (
          <PrivateRoute> 
            <App />
          </PrivateRoute>
        ), 
        errorElement: <Error404/>,
    children: [
      {
        path: "Item", /// Rota privada
        element: (
          <PrivateRoute> 
            <Item />
          </PrivateRoute>
        ),
      },
      {
        path: "EditItem/:id",
        element: (
          <PrivateRoute>
            <EditItem />
          </PrivateRoute>
        ),
      },
      {
        path: "ListItemForm",
        element: (
          <PrivateRoute>
            <ListItemForm />
          </PrivateRoute>
        ),
      },
      {
        path: "ListItem",
        element: (
          <PrivateRoute>
            <ListItem />
          </PrivateRoute>
        ),
      }
     ,{
        path: "AddItemForm",
        element: (
          <PrivateRoute>
            <AddItemForm />
          </PrivateRoute>
        ),
      },
      {
        path: "*",
        element: <Error404 />,
      },
    ],
  },
  {
    path: "login",
    element: <Login />, /// Rota publica
  },
  {
    path: "*",
    element: <Error404 />,
  }
]);

export default router;
