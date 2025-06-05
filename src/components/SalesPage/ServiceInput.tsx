import React from "react";
import { ClientFeeType } from "../../types/ClientFeeType";

interface ServiceInputProps {
    serviceId: number;
    label: string;
    clientFees: ClientFeeType[];
    onChange: (serviceId: number, name: string, value: number) => void;
}

const ServiceInput: React.FC<ServiceInputProps> = ({ serviceId, label, clientFees, onChange }) => (
    <div className="w-full">
        <p className="text-sm w-full mt-4">
            {label}
        </p>
        <div className="service flex gap-x-4 w-full">
            <input hidden readOnly name="service" value={serviceId} required></input>
            <input
                type="number"
                name="percentual"
                placeholder="Percentual"
                className="placeholder:text-sm placeholder:text-stone-400 text-sm border-b border-stone-300 w-1/3 mt-4 focus:outline-none focus:border-stone-700"
                required
                onChange={(e) => onChange(serviceId, e.target.name, Number(e.target.value))}
                value={clientFees.find(fee => fee.service === serviceId)?.percentual || ""}
            />
            <input
                type="number"
                name="value"
                placeholder="Valor"
                step="0.01"
                className="placeholder:text-sm placeholder:text-stone-400 text-sm border-b border-stone-300 w-1/3 mt-4 focus:outline-none focus:border-stone-700"
                onChange={(e) => onChange(serviceId, e.target.name, Number(e.target.value))}
                value={clientFees.find(fee => fee.service === serviceId)?.value || ""}
            />
            <input
                step="0.01"
                name="deadline"
                placeholder="Prazo"
                className="placeholder:text-sm placeholder:text-stone-400 text-sm border-b border-stone-300 w-1/3 mt-4 focus:outline-none focus:border-stone-700"
                onChange={(e) => onChange(serviceId, e.target.name, Number(e.target.value))}
                value={clientFees.find(fee => fee.service === serviceId)?.deadline || ""}
            />
        </div>
    </div>
)

export default ServiceInput;
