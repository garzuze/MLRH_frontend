import Title from "../ui/Title";

export default function Contact() {
    return (
        <div className="border-t-2 border-neutral-700 bg-black p-12" id="contato">
            <div className="max-w-screen-lg mx-auto grid grid-cols-3">
                <div className="col-span-3 md:col-span-1">
                    <Title variant={"h3"} text={"ML Gestão de Pessoas"} />
                    <p className=" mb-3 font-normal text-zinc-300 line-clamp-3">
                        © 2024 ML Gestão de Pessoas.<br></br> Todos os direitos reservados.
                    </p>
                </div>
                <div className="col-span-3 md:col-span-1">
                    <p className="mb-3 font-normal text-zinc-300 line-clamp-3">
                        Rua Goiânia, 1597 - Cajuru, Curitiba - PR
                        <br></br>
                        CEP: 82940-150
                        <br></br>
                        Telefone: (41) 9 9869-0165
                    </p>
                </div>
                <div className="col-span-3 md:col-span-1 flex">
                    <a href="https://www.linkedin.com/company/ml-gest-o-de-pessoas---curitiba/" className="mr-4">
                        <svg width="24" height="24" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path fillRule="evenodd" clipRule="evenodd" d="M0 24C0 10.7452 10.7452 0 24 0C37.2548 0 48 10.7452 48 24C48 37.2548 37.2548 48 24 48C10.7452 48 0 37.2548 0 24ZM16.9605 19.8778H11.5216V36.2196H16.9605V19.8778ZM17.3188 14.8227C17.2835 13.2204 16.1377 12 14.277 12C12.4164 12 11.2 13.2204 11.2 14.8227C11.2 16.3918 12.3805 17.6473 14.2064 17.6473H14.2412C16.1377 17.6473 17.3188 16.3918 17.3188 14.8227ZM36.5754 26.8497C36.5754 21.8303 33.8922 19.4941 30.3131 19.4941C27.4254 19.4941 26.1326 21.0802 25.4107 22.1929V19.8783H19.9711C20.0428 21.4117 19.9711 36.22 19.9711 36.22H25.4107V27.0934C25.4107 26.605 25.446 26.1178 25.5898 25.7681C25.9829 24.7924 26.8779 23.7822 28.3805 23.7822C30.3494 23.7822 31.1365 25.2807 31.1365 27.4767V36.2196H36.5752L36.5754 26.8497Z" fill="white" />
                        </svg>
                    </a>
                    <a href="https://www.facebook.com/mlgestaorh">
                        <svg width="24" height="24" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path fillRule="evenodd" clipRule="evenodd" d="M0 24C0 10.7452 10.7452 0 24 0C37.2548 0 48 10.7452 48 24C48 37.2548 37.2548 48 24 48C10.7452 48 0 37.2548 0 24ZM26.5016 38.1115V25.0542H30.1059L30.5836 20.5546H26.5016L26.5077 18.3025C26.5077 17.1289 26.6192 16.5001 28.3048 16.5001H30.5581V12H26.9532C22.6231 12 21.0991 14.1828 21.0991 17.8536V20.5551H18.4V25.0547H21.0991V38.1115H26.5016Z" fill="white" />
                        </svg>
                    </a>
                </div>
                <div className="col-span-3">
                    <p className="mt-4 font-thin text-center text-white line-clamp-3">
                        Desenvolvido com ❤ por <a href="https://github.com/garzuze">Lucas Garzuze Cordeiro</a>.
                    </p>
                </div>
            </div>
        </div>

    )
}