import Vacancy from "./Vacancy"
export default function Vacancies() {
    const profiles = [
        { id: 1, position: "Desenvolvedor Junior", activities: "Lorem ipsum, dolor sit amet consectetur adipisicing elit. Doloremque ipsa, sit quae vitae nulla harum dolor vel officiis quis quisquam quidem. Praesentium doloribus laboriosam dolorem veniam repudiandae tempore, eius dolor." },
        { id: 2, position: "Assistente Administrativo", activities: "Realizar atividades administrativas, como organização de documentos, envio de relatórios e controle de arquivos" },
        { id: 3, position: "Analista de Compras", activities: "Realizar cotações, análise comparativa de preços, negociação de preços e prazos, adiantamento ou postergação de pedidos e negociação de fretes com transportadoras" },
        { id: 4, position: "Engenheiro de Software", activities: "Lorem ipsum, dolor sit amet consectetur adipisicing elit. Doloremque ipsa, sit quae vitae nulla harum dolor vel officiis quis quisquam quidem. Praesentium doloribus laboriosam dolorem veniam repudiandae tempore, eius dolor." },
        { id: 5, position: "Desenvolver Jr.", activities: "Lorem ipsum, dolor sit amet consectetur adipisicing elit. Doloremque ipsa, sit quae vitae nulla harum dolor vel officiis quis quisquam quidem. Praesentium doloribus laboriosam dolorem veniam repudiandae tempore, eius dolor." },
        { id: 6, position: "Desenvolver Jr.", activities: "Lorem ipsum, dolor sit amet consectetur adipisicing elit. Doloremque ipsa, sit quae vitae nulla harum dolor vel officiis quis quisquam quidem. Praesentium doloribus laboriosam dolorem veniam repudiandae tempore, eius dolor." },
        { id: 7, position: "Desenvolver Jr.", activities: "Lorem ipsum, dolor sit amet consectetur adipisicing elit. Doloremque ipsa, sit quae vitae nulla harum dolor vel officiis quis quisquam quidem. Praesentium doloribus laboriosam dolorem veniam repudiandae tempore, eius dolor." }
    ]
    return (
        <div className="w-full font-roboto 2xl:max-w-screen-xl mx-auto">
            <div className="w-full lg:max-w-screen-lg mx-auto">
                <h2 className="text-center text-3xl md:text-4xl bg-gradient-to-b from-zinc-50 to-zinc-300 bg-clip-text text-transparent font-roboto font-semibold py-8">
                    Nossas Vagas
                </h2>
            </div>
            <div className="pb-8 w-full lg:max-w-screen-xl mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-4 justify-items-center justify-center gap-4">
                {profiles.map(profile => (
                    <Vacancy profile={profile} key={profile.id} />
                ))}
            </div>
        </div>
    )
}