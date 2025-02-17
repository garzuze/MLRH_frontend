import { useAuth } from "../../context/AuthContext"

export default function Account() {
    const { user } = useAuth();
    return (
        <div className="border-b mb-4 mt-2 pb-4 border-stone-300 ">
            <button className="flex p-0.5 hover:bg-stone-200 rounded transition-colors relative gap-2 w-full items-center">
                <img
                    src="https://api.dicebear.com/9.x/glass/svg?backgroundColor=312e81"
                    alt="avatar"
                    className="size-8 rounded shrink-0 shadow"
                />
                <div className="text-start">
                    <span className="text-sm font-medium block">{user?.first_name} {user?.last_name}</span>
                    <span className="text-xs block text-stone-500">{user?.email}</span>
                </div>
            </button>
        </div>
    )
}