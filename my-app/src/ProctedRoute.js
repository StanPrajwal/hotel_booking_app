import React from "react"
import {Outlet,Navigate} from "react-router-dom"

const PrivateRoute = () =>{
    const token = localStorage.getItem("token")
    return (
        token?
            <Outlet/>
        : 
            <Navigate to="/login"/>
        
        
    )
}
const PrivateRouteforHotel = () =>{
    const token = localStorage.getItem("token")
    return (
        token?
            <Outlet/>
        : 
            <Navigate to="/hotel"/>
        
        
    )
}

export {
    PrivateRoute,
    PrivateRouteforHotel}