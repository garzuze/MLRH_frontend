import AutocompleteInput from "./AutocompleteInput";
import { axiosClient, axiosConfig } from "../../utils/constants";
import { ResumeType } from "../../types/ResumeType";

const fetchResumes = async (query: string): Promise<ResumeType[]> => {
    const response = await axiosClient.get(
        `hr/search_resumes?q=${query}`,
        axiosConfig
    );
    return response.data;
};

const ResumeSelector = ({ selectedResume, setSelectedResume }: { selectedResume: ResumeType | null, setSelectedResume: (resume: ResumeType) => void }) => {
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
