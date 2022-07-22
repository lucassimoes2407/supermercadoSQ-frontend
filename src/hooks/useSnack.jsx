import { Alert } from "@mui/material";
import { createContext, useCallback, useContext, useState } from "react";


const SnackContext = createContext({});

export function SnackProvider({ children }) {

    const [snack, setSnack] = useState(() => {
        return {
            open: false,
            autoHideDuration: 5000,
            message: 'Mensagem',
        }
    });

    const handleSnackOpen = useCallback(() => {
        setSnack((prevSnack) => {
            return { 
                ...prevSnack,
                open: !prevSnack.open,
                action: undefined
            }
        })
    }, []);

    const handleSnackState = useCallback((snackChange) => {
        setSnack(snackChange);
    }, []);

    return (
        <SnackContext.Provider
            value={{ snack, handleSnackOpen, handleSnackState }}
        >
            {children}
        </SnackContext.Provider>
    );
}

/**
 * @function SnackChild
 * @param {() => void} onClose - Function that closes the snack
 * @param {String} message - The message to display on the snack 
 * @param {"success" | "error" | "warning" | "info"} severity - The severity of the snack.
 * @returns {JSX.Element} Alert component for Snackbar
 */

export const SnackChild = (onClose, severity, message) => {
    return (
        <Alert onClose={onClose} severity={severity} sx={{ width: '100%' }}>
            {message}
        </Alert>
    )
}

export function useSnack() {
    const context = useContext(SnackContext);

    return context;
}