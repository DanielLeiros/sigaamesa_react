import React from "react";
import {isAuthenticated} from '../security/auth';
import {Route, Redirect} from "react-router-dom";

const PrivateRoute = ({component: Component, ...props}) =>{
    return ( <Route {...props} render={props =>
        isAuthenticated() ?  (
            <Component {...props}/> 
         ) : (
            <Redirect to={{pathname: "/login", state: { from: props.location}}} />
        )
    }/>
);}

export default PrivateRoute;

