import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import './App.scss';
import Edit from './pages/Edit/Edit';
import Home from './pages/Home/Home';

const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />
  },
  {
    path: "/edit/:id",
    element: <Edit />
  },

])

function App() {
  return (
    <div className="App">
      <RouterProvider router={router} />
    </div>
  );
}

export default App;
