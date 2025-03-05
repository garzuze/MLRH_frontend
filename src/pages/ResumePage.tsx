import { useEffect, useState } from "react";
import { useAuth } from "../contexts/AuthContext";
import { ResumeType } from "../types/ResumeType";
import { mlrhUser } from "../types/TokenResponse";
import { axiosClient, axiosConfig } from "../utils/constants";
import { ResumeProvider, useResume } from "../contexts/ResumeContext";

export default function ResumePage() {
    return (
        <ResumeProvider>
            <Resume></Resume>
        </ResumeProvider>
    )
}

function Resume() {
    const { resume } = useResume();

    useEffect(() => {
        console.log("Resume state updated:", resume?.name);
    }, [resume]);
    console.log(resume?.name);
    return (
        <div className="text-white">
            {resume?.name || "carregando...."}
        </div>
    );
}