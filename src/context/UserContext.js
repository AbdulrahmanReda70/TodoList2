import { createContext, useState, useEffect } from 'react';
import { supabase } from '../supabase/supabase';
export const UserInfo = createContext(null);

function UserContext({ children }) {
    const [user, setUser] = useState(null);
    useEffect(() => {
        async function getUser() {
            const user = await supabase.auth.getUser();
            setUser(user.data.user);
        }
        getUser();
    }, []);
    return (
        <UserInfo.Provider value={user}>
            {children}
        </UserInfo.Provider>
    );

}

export default UserContext;