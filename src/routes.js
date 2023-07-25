import React from 'react'
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import PersistUser from './Components/PersistUser';
import RequireAuth from './Components/RequireAuth';
import ErrorElement from './common/ErrorElements/ErrorElement';
const Register = React.lazy(()=>import('./views/Auth/register'));
const Login = React.lazy(()=> import('./views/Auth/auth'));
const Logout = React.lazy(()=> import('./views/Logout/logout'));
const Profile = React.lazy(()=>import('./views/Profile/profile'));
const Home = React.lazy(()=> import('./views/Layout/Layout'));
const Board = React.lazy(()=>import('./views/Board/board'));
const Archive = React.lazy(()=>import('./views/Archive/Archive'));


const routes = createBrowserRouter([
    /**auth routes */
    { 
        path: '/login', 
        element:( 
            <React.Suspense>
                <Login/>,
            </React.Suspense>
            ), 
        AuthRequired: false 
    },
    {
        path: '/register', 
        element:( 
            <React.Suspense>
                <Register/>,
            </React.Suspense>
            ), 
        AuthRequired: false 
    },
    { 
        path: '/logout', 
        element: ( 
            <React.Suspense>
                <Logout/>,
            </React.Suspense>
            ), 
        AuthRequired: false
    },

    /**private routes */
    {   
        path:'/',
        name:'Home',
        element: (
          <React.Suspense>
             <PersistUser>
                <RequireAuth>
                    <Home/>
                </RequireAuth>
            </PersistUser>
          </React.Suspense>
        ),
        AuthRequired: true,
        errorElement: (<ErrorElement/>),
        children: [
            {
                path:'/board',
                name:'Board', 
                element: (
                    <React.Suspense fallback={<h5>loading...</h5>}>
                        <Board/>
                    </React.Suspense>
                ),
                AuthRequired: true,
                errorElement: (<ErrorElement/>),
            }, 
            {
                path:'/archive',
                name: 'Archive',
                element: (
                    <React.Suspense fallback={<h5>loading...</h5>}>
                        <Archive/>
                    </React.Suspense>
                ),
                errorElement: (<ErrorElement/>),
                AuthRequired: true
            },
            {
                path:'/profile',
                name:'Profile',
                element: (
                    <React.Suspense fallback={<h5>Loading...</h5>}>
                        <Profile/>
                    </React.Suspense>
                )
            }
        ]
    },
])

export {routes}




