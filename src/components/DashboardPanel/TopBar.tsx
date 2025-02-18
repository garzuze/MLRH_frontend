import { useAuth } from "../../context/AuthContext"
import getDate from "./getDate";

export default function TopBar() {
    const { user } = useAuth();
    const currentDate = getDate()

    return (
        <div className="border-b px-4 mb-4 mt-2 pb-4 border-stone-200">
            <div className="flex items-center justify-between p-0.5">
                <div>
                    <span className="text-sm font-bold block">Bom dia, {user?.first_name}!</span>
                    <span className="text-xs block text-stone-500">{currentDate}</span>
                </div>
            </div>
        </div>
    )
}