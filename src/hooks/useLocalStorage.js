import { useEffect, useState } from "react";
// we use state to make the component render when the localstorage change 
/* 
JSON.parse we use it to convert the string that it came from the localstorage as string
example "true" -> true  
*/


export function useLocalStorage(key, initialValue) {
    const [storedValue, setStoredValue] = useState(() => {
        try {
            const item = localStorage.getItem(key); // check if item exist in localstorage
            return item ? JSON.parse(item) : initialValue;
        } catch (error) {
            console.error('Error reading localStorage key “' + key + '”:', error);
            return initialValue;
        }
    });

    const setValue = (value) => {
        try {
            const valueToStore = value instanceof Function ? value(storedValue) : value; //if i pass function and need stored value as param
            setStoredValue(valueToStore);
            localStorage.setItem(key, JSON.stringify(valueToStore));
        } catch (error) {
            console.error('Error setting localStorage key “' + key + '”:', error);
        }
    };

    return [storedValue, setValue];
}
