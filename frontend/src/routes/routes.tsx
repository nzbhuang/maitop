import {
  createBrowserRouter 
} from 'react-router-dom';
import Landing from '../components/landing/landing';

const router = createBrowserRouter([
    {
      path: "/",
      element: <Landing />
    },
  ]);

export default router;