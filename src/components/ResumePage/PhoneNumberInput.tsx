import { useState } from "react";

const PhoneNumberInput = ({name, defaultValue}: {name: string, defaultValue?: string | undefined }) => {
    const [number, setNumber] = useState<string>(defaultValue ? defaultValue : '');

    const handleChange = (phone: string) => {
        const formattedNumber = formatNumber(phone);
        setNumber(formattedNumber);
    }

    return <input
        type="text"
        placeholder="(xx) xxxxx-xxxx"
        name={name}
        minLength={15}
        id={name}
        required
        value={number}
        onChange={(e) => handleChange(e.target.value)}
        className="bg-neutral-900 border border-neutral-800 text-zinc-300 rounded-lg focus:ring-slate-600 focus:border-slate-600 w-full md:w-64 p-2.5" />
}

function formatNumber(value: string) {
    if (!value) return value;

    const phone = value.replace(/[^\d]/g, ""); // Pega só os números

    if (phone.length < 3) return phone;
    if (phone.length < 7) {
        return `(${phone.slice(0, 2)}) ${phone.slice(2)}`
    } else {
        const ddd = phone.slice(0, 2);
        const prefix = phone.slice(2, 7);
        const sufix = phone.slice(7, 11);

        let formattedNumber = `(${ddd}) ${prefix}`
        if (sufix) {
            formattedNumber += `-${sufix}`;
        }

        return formattedNumber;        
    }
}

export default PhoneNumberInput