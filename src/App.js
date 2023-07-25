import React from 'react';
import { routes } from './routes.js';
import { Route, Routes } from 'react-router';
import Layout from './Components/Layout';
import RequireAuth from './Components/RequireAuth';
import shortid from 'shortid';
import PersistUser from './Components/PersistUser';
import './theme/_main.scss';

function App() {

  return (
    <div className={`main-container`}>
      <React.Fragment>
        <Routes>
          <Route path='/' element={<Layout/>}>
            {routes.map((routes, key)=>{
              if(routes.AuthRequired){
                return(
                  <Route element={<PersistUser/>} key={shortid.generate()}>
                    <Route element={<RequireAuth/>} key={shortid.generate()+key}>
                      <Route path={routes.path} element={<routes.component/>} key={shortid.generate()+key}/>
                    </Route>
                  </Route>
                )
              }
              return <Route path={routes.path} element={<routes.component/>} key={shortid.generate()+key}/>
            })}
          </Route>
        </Routes> 
      </React.Fragment>
    </div>
  );
}

export default App;
