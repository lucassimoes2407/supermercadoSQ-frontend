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
        setSnack((prevSnack) => { return { ...prevSnack, open: !snack.open } })
    }, [snack]);

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

export function useSnack() {
    const context = useContext(SnackContext);

    return context;
}