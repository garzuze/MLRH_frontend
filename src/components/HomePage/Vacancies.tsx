import { useProfiles } from "../../hooks/useProfiles"
import Title from "../ui/Title"
import Vacancy from "./Vacancy"
export default function Vacancies() {
    const { data: profiles, isLoading: loadingProfiles, error: profilesError } = useProfiles(undefined, ["A"], { enabled: true });
    return (
        <div className="bg-gradient-to-br from-neutral-950 via-neutral-900 to-indigo-900" id="vagas">
            <div className="w-full font-roboto 2xl:max-w-screen-xl mx-auto">
                <div className="w-full lg:max-w-screen-lg mx-auto">
                    <Title variant={"h2"} text={"Nossas Vagas"} className={"text-center py-8"} />
                </div>
                <div className="pb-8 w-full lg:max-w-screen-xl mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-4 justify-items-center justify-center gap-4">
                    {profilesError ? (<div>Houve um erro</div>) :
                        loadingProfiles ? (<div>Carregando...</div>)
                            : (
                                profiles?.map(profile => (
                                    <Vacancy profile={profile} key={profile.id} />
                                ))
                            )
                    }
                </div>
            </div>
        </div>
    )
}