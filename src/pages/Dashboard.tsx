import Button from "../components/ui/Button";
import { logout } from "../hooks/useAuth";

export default function Dashboard() {
    return (
        <>
            <Button text="Logout" variant="default" className="" onClick={() => logout()} />
        </>
    )
}