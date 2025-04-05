interface ReportTextarea {
    name: string;
    placeholder: string;
    defaultValue?: string;
}

const ReportTextarea: React.FC<ReportTextarea> = ({ name, placeholder, defaultValue }) => (
    <textarea
        name={name}
        id={name}
        className="text-sm border-b border-stone-300 w-full mt-4 focus:outline-none focus:border-stone-700 placeholder:text-stone-400"
        placeholder={placeholder}
        defaultValue={defaultValue}
    />
)

export default ReportTextarea;