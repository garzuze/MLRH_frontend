import AutocompleteInput from "./AutocompleteInput";
import { ResumeType } from "../../types/ResumeType";
import { useAxiosClient } from "../../hooks/useAxiosClient";

// selectedResume e setSelectedResume são variáveis de estado que serão passadas como props
const ResumeSelector = ({ selectedResume, setSelectedResume }: { selectedResume: ResumeType | null, setSelectedResume: (resume: ResumeType) => void }) => {
    const axiosClient = useAxiosClient();
    
    const fetchResumes = async (query: string): Promise<ResumeType[]> => {
        const response = await axiosClient.get(
            `hr/search_resumes?q=${query}`,
        );
        return response.data;
    };
    return (
        <AutocompleteInput<ResumeType>
            value={selectedResume?.name ?? ""}
            onSelect={setSelectedResume}
            fetchResults={fetchResumes}
            getOptionLabel={(resume) => resume.name}
            placeholder="Buscar currículos"
            inputName="resume"
            inputValue={selectedResume?.id ?? ""}
        />
    );
};

export default ResumeSelector;
