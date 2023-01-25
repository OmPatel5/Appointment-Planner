import Axios from 'axios';
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut, GoogleAuthProvider, signInWithPopup, reauthenticateWithRedirect } from 'firebase/auth';
import React, { useContext, useEffect, useState } from 'react';
import {auth} from '../firebase';
import { useHistory } from 'react-router';

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

        await Axios.get('https://appointment-planner-api.onrender.com/getUsers').then((response) => {
            const user = response.data.map((users) => {
                if (users.userid === uid) {
                    return 'yes';
                }
                return 'no'
            })
            
            console.log(user);
            if (!user.includes('yes')) {
                Axios.post('https://appointment-planner-api.onrender.com/createUser', {
                    userid: uid,
                    firstname: firstname, 
                    lastname: lastname
                });

                return;
            }
        })
    }
    async function login(email, password) {
        const loggedInUser = await signInWithEmailAndPassword(auth, email, password);

        await Axios.get('https://appointment-planner-api.onrender.com/getUsers').then((response) => {
            response.data.map((users) => {
                try {
                    if (users.userid === loggedInUser.user.uid) {
                        setFirstname(users.firstname); 
                        setLastname(users.lastname);
                        history.push('/contacts')
                    }
                } catch {
                    history.push('/login')
                }
            })
        })
        return; 
    }

    function logout() {
        setCurrentUser(null);
        return signOut(auth);
    }



    
    useEffect(() => {
        const unsubcribe = auth.onAuthStateChanged(async (user) => {
            await Axios.get('https://appointment-planner-api.onrender.com/getUsers').then((response) => {
                response.data.map((users) => {
                    try {
                        if (users.userid === user.uid) {
                            setFirstname(users.firstname); 
                            setLastname(users.lastname);
                            history.push('/contacts')
                        }
                    } catch(error) {
                        history.push('/login')
                    }
                })
            })

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