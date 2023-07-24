import { createContext, useEffect, useState } from "react";
import { creteUserDocFromAuth, onAuthStateChangedListner } from "../utils/firebase.utils";

export const UserContext = createContext({
    currentUser: null,
    serCurrentUser: () => null
});

export const UserProvider = ({children}) => {
    const [ currentUser, setCurrentUser ] = useState(null);
    const value = {currentUser, setCurrentUser};

    useEffect(() => {
        const unsubscribe = onAuthStateChangedListner((user) => {
            if (user) {
                creteUserDocFromAuth(user);
              }
            setCurrentUser(user);
        })
        return unsubscribe;
    }, [])

    return <UserContext.Provider value={value}>{children}</UserContext.Provider>
}