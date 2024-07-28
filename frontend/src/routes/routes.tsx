import {
  Route,
  Routes
} from 'react-router-dom';
import Home from '../components/home/home';
import TopRatings from '../components/topratings/topratings';
import ChartsList from '../components/chartslist/chartslist';
import Info from '../components/info/info';

const pages = [
  { element: <Home />, path: "/" },
  { element: <TopRatings />, path: "/top-ratings" },
  { element: <ChartsList />, path: "/charts" },
  { element: <Info />, path: "/info" },
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