import App from './App';
import Home from './components/Home';
import Cart from './components/Cart';
import Error from './Error';

const routes = [
  {
    path: '/',
    element: <App />,
    children: [
      { index: true, element: <Home /> },
      { path: 'cart', element: <Cart /> },
    ],
    errorElement: <Error />,
  },
];

export default routes;
