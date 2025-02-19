import Button from "../ui/Button";
import AutocompleteInput from "./AutocompleteInput";

export default function ClientContactForm() {
    return (
        <>
            <form method="post" onSubmit={(e) => e.preventDefault()}>
                <AutocompleteInput />
                <input
                    type="text"
                    placeholder="Nome"
                    className=" placeholder:text-sm text-sm border-b border-stone-300 w-full mt-4 focus:outline-none focus:border-stone-700"
                    name="name"
                />
                <input
                    type="text"
                    placeholder="Departamento"
                    className=" placeholder:text-sm text-sm border-b border-stone-300 w-full mt-4 focus:outline-none focus:border-stone-700"
                    name="department"
                />
                <input
                    type="email"
                    placeholder="Email"
                    className=" placeholder:text-sm text-sm border-b border-stone-300 w-full mt-4 focus:outline-none focus:border-stone-700"
                    name="email"
                />
                <div className="w-full flex gap-x-4">
                    <input
                        type="text"
                        placeholder="Telefone"
                        className="placeholder:text-sm text-sm border-b border-stone-300 mt-4 focus:outline-none focus:border-stone-700 w-3/4"
                        name="phone"
                    />
                    <select name="status" className="text-sm text-stone-400 border-b border-stone-300 mt-4 focus:outline-none focus:border-stone-700 w-1/4">
                        <option value={"True"}>Ativo</option>
                        <option value={"False"}>Inativo</option>
                    </select>
                </div>

                <Button text={"Cadastrar contato"} variant="dark" className="w-full mx-0 p-2 text-sm mt-4"></Button>
            </form>
        </>
    )
}