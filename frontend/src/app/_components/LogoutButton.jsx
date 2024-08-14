import { Button } from "@mui/material";
import { useAuthContext } from "../context/AuthContext";

export default function LogoutButton () {
    const { logout } = useAuthContext();

    const handleLogout = () => {
        logout();
    };
    return (
        <Button
            onClick={() => {
                handleLogout();
            }}
            color="warning"
            variant="contained"
        >
            Выйти
        </Button>
    );
}