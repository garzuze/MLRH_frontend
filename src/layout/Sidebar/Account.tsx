import { FiLogOut } from "react-icons/fi";
import { useAuth } from "../../contexts/AuthContext"

export default function Account() {
    const { user } = useAuth();
    const { logout } = useAuth();

    return (
        <div className="border-b mb-4 mt-2 pb-4 border-stone-300 ">
            <button className="flex p-0.5 hover:bg-stone-200 rounded transition-colors relative gap-2 w-full items-center">
                <img
                    src="https://api.dicebear.com/9.x/glass/svg?backgroundColor=312e81"
                    alt="avatar"
                    className="size-8 rounded shrink-0 shadow"
                />
                <div className="text-start">
                    <span className="text-sm font-bold block">{user?.firstName} {user?.lastName}</span>
                    <div className="flex space-x-2 items-center">
                        <span className="text-xs block text-stone-500">{user?.email}</span>
                        <small className="" onClick={() => logout()}><FiLogOut /></small>
                    </div>
                </div>
            </button>
        </div>
    )
}