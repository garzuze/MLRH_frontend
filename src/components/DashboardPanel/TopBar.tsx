import { useAuth } from "../../contexts/AuthContext"
import getDate from "../../utils/getDate";

export default function TopBar({ title, subtitle }: { title: string, subtitle: string}) {

    return (
        <div className="border-b px-4 mb-4 mt-2 pb-4 border-stone-200">
            <div className="flex items-center justify-between p-0.5">
                <div>
                    <span className="text-sm font-bold block">{title}</span>
                    <span className="text-xs block text-stone-500">{subtitle}</span>
                </div>
            </div>
        </div>
    )
}