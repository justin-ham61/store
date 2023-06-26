import axios from 'axios';
import React, { useEffect } from 'react'
import { createContext, useState } from "react";

export const AuthContext = createContext(false);

export const AuthProvider = () => {
    const [ authLevel, setAuthLevel ] = useState(false)

    useEffect(() => {
        axios.get('/Auth/api/user')
        .then(response => {
            const userData = response.data;
            console.log(userData)
            if (userData === null){
                setAuthLevel(false)
            } else {
                if (userData.isAdmin === 1){
                    setAuthLevel(true)
                }
            }
        })
    }, []);

  return (
    <AuthContext.Provider value={{authLevel, setAuthLevel}}>

    </AuthContext.Provider>
  )
}

