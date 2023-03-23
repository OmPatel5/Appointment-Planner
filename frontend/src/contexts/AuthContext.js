import Axios from 'axios';
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut, GoogleAuthProvider, signInWithPopup, reauthenticateWithRedirect } from 'firebase/auth';
import React, { useContext, useEffect, useState } from 'react';
import {auth} from '../firebase';
import { useHistory } from 'react-router';
import { current } from '@reduxjs/toolkit';

const AuthContext = React.createContext();

export function useAuth() {
    return useContext(AuthContext)
}

export function AuthProvider({ children }) {
    const [currentUser, setCurrentUser] = useState();

    const [firstname, setFirstname] = useState();
    const [lastname, setLastname] = useState();
    const [isLoading, setIsLoading] = useState(true);

    const history = useHistory()

    async function register(email, password, firstname, lastname) {
        setFirstname(firstname); 
        setLastname(lastname);
        
        const registeredUser = await createUserWithEmailAndPassword(auth, email, password);
        await Axios.post('https://appointment-planner-api.onrender.com/createUser', {
            userid: registeredUser.user.uid,
            firstname: firstname, 
            lastname: lastname
        })

        return;
    }

    async function signInWithGoogle() {
        const provider = new GoogleAuthProvider();

        const registeredUser = await signInWithPopup(auth, provider);
        

        const name = registeredUser.user.displayName; 
        const [firstname, lastname] = name.split(' ');

        const uid = registeredUser.user.uid;

        setFirstname(firstname); 
        setLastname(lastname);


        await Axios.post('https://appointment-planner-api.onrender.com/createUserGoogle', {
            userid: uid,
            firstname: firstname, 
            lastname: lastname
        }).then((response) => {
            console.log(response)
        })

        



        
    }
    async function login(email, password) {
        const loggedInUser = await signInWithEmailAndPassword(auth, email, password);

        try {
            await Axios.get(`https://appointment-planner-api.onrender.com/getUserByUID/${loggedInUser.user.uid}`).then((response) => {
                console.log(response)
                setFirstname(response.data.firstname);
                setLastname(response.data.lastname);
                history.push('/contacts')
            })
        } catch {
            history.push('/login')
        }
    }

    function logout() {
        setCurrentUser(null);
        return signOut(auth);
    }



    
    useEffect(() => {
        const unsubcribe = auth.onAuthStateChanged(async (user) => {
            try {
                await Axios.get(`https://appointment-planner-api.onrender.com/getUserByUID/${user.uid}`).then((response) => {
                    console.log(response)
                    const [firstname, lastname] = user.displayName.split(' ');

                    setFirstname(firstname);
                    setLastname(lastname);
                    history.push('/contacts')
                })
            } catch(err) {
                console.log(err)
                history.push('/login')
            }

            console.log(user)

            setCurrentUser(user)
            setIsLoading(false)


        }) 

        return unsubcribe;
    }, []) 
       
    const value = {
        currentUser,
        login,
        register,
        firstname, 
        lastname, 
        logout, 
        signInWithGoogle
    }

    return (
        <AuthContext.Provider value={value}>
            {!isLoading && children}
        </AuthContext.Provider>
    )
}