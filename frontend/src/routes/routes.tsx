import {
  Route,
  Routes
} from 'react-router-dom';
import Home from '../components/home/home';

const pages = [
  { element: <Home />, path: "/" },
]

const Router = () => {

  const pageRoutes = pages.map((item) =>
    <Route element={item.element} path={item.path}/>
  )

  return (
    <Routes>
      {pageRoutes}
    </Routes>
  )
}


export default Router;