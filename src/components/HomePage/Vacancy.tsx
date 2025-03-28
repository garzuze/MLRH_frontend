import { ProfileType } from "../../types/ProfileType";
import Title from "../ui/Title";

export default function Vacancy({ profile }: {profile: ProfileType}) {
    return (
        <div className="max-w-sm p-6 bg-neutral-950 border border-neutral-800 rounded-lg shadow-sm hover:bg-neutral-900">
            <a href="">
                <Title variant={"h3"} text={profile.positionStr} className={"mb-2"}/>
            </a>
            <p className="mb-3 font-normal text-zinc-300 line-clamp-3">
                {profile.jobResponsibilities}
            </p>
            <a href={`/vaga/${profile.id}`} target="_blank" rel="noopener noreferrer" className="inline-flex items-center px-3 py-2 text-sm font-medium text-center text-black bg-zinc-100 rounded-lg hover:bg-zinc-300 focus:ring-4 focus:outline-none focus:ring-indigo-950">
                Saber mais
                <svg className="rtl:rotate-180 w-3.5 h-3.5 ms-2" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 10">
                    <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M1 5h12m0 0L9 1m4 4L9 9" />
                </svg>
            </a>
        </div>

    )
}