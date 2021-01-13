import React, { useEffect } from 'react';
import Axios from 'axios';
import { useDispatch } from 'react-redux';
import { auth } from '../_actions/user_action';
import { withRouter } from 'react-router-dom';

export default function Auth(SpecificComponent, option, adminRoute = null) {
  
    function AuthenticationCheck(props) {
        
        const dispatch = useDispatch();

        useEffect(() => {
            dispatch(auth()).then(response => {
                
                if (!response.payload.isAuth) {
                    if (option) {
                        props.history.push('/login')
                    }
                } else {
                    if (adminRoute && !response.payload.isAdmin) {
                        props.history.push('/')
                    } else {
                        if (!option) {
                            props.history.push('/')
                        }
                    }
                }

            })

            Axios.get('/api/users/auth')
            
        }, [dispatch])

        return (
            <SpecificComponent />
        )
    }
  
    return withRouter(AuthenticationCheck) 
}