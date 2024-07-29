import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";

import App from "../App";
import Home from "../home/Home";
import Shop from "../shop/Shop";
import About from "../components/About";
import Blog from "../components/Blog";
import SingleBook from "../shop/SingleBook";
import DashboardLayout from "../dashboard/DashboardLayout";
import Dashboard from "../dashboard/Dashboard";
import UploadBook from "../dashboard/UploadBook";
import ManageBooks from "../dashboard/ManageBooks";
import EditBooks from "../dashboard/EditBooks";
import Signup from "../components/Signup";
import Login from "../components/Login";
import PrivateRoute from "../PrivateRoute/PrivateRoute";
import Logout from "../components/Logout";
import Review from "../home/Review";
import ReviewForm from "../home/ReviewForm";
import User from "../components/User";
import CheckoutPage from "../shop/Checkout";
import YourOrders from "../dashboard/YourOrders";
import Request from "../dashboard/Request";

const router = createBrowserRouter([
    {
      path: "/",
      element: <App/>,
      children:[
        {
            path:'/',
            element:<Home/>
        }
      
    ,
    {
        path:"/shop",
         element:<PrivateRoute><Shop/></PrivateRoute>
    },
{
    path:"/about",
    element:<PrivateRoute><About/></PrivateRoute>
},
{
  path:"/review",
  element:<PrivateRoute><ReviewForm/></PrivateRoute>
},
{ path:"/book/:id",
element:<SingleBook/>,
loader:({params})=>fetch(`http://localhost:5000/book/${params.id}`)

},

{
    path:"/blog",
    element:<Blog/>
},
{
  path:"/admin/dashboard",
  element:<DashboardLayout/>,
  children:[
    {path:"/admin/dashboard",
  element:<Dashboard></Dashboard>,
    },
    {
      path:"/admin/dashboard/upload",
      element:<PrivateRoute><UploadBook/></PrivateRoute>
    },{
      path:"/admin/dashboard/manage",
      element:<PrivateRoute><ManageBooks/></PrivateRoute>
    },{
      path:"/admin/dashboard/editbooks/:id",
      element:<PrivateRoute><EditBooks/></PrivateRoute>,
      loader:({params})=>fetch(`http://localhost:5000/book/${params.id}`)
    }
    ,{
      path:"/admin/dashboard/user",
      element:<PrivateRoute><User/></PrivateRoute>,
      
    },{
      path:"/admin/dashboard/yourorders",
      element:<PrivateRoute><YourOrders/></PrivateRoute>
    },{
      path:"/admin/dashboard/requests",
      element:<PrivateRoute><Request/></PrivateRoute>
    }
    
  ]
}
]},{
  path:"sign-up",
  element:<Signup/>
},{
  path:"login",
  element:<Login/>
}
,{
  path:"logout",
  element:<Logout/>

},{
  path:"/checkout/:id",
  element:<PrivateRoute><CheckoutPage/></PrivateRoute>,
  loader:({params})=>fetch(`http://localhost:5000/book/${params.id}`)
}
  ]);
  export default router