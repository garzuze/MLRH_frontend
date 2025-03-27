// Profile.tsx
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useProfiles } from '../hooks/useProfiles';
import Title from '../components/ui/Title';
import { AxiosError } from 'axios';

const ProfilePage: React.FC = () => {
    const { id } = useParams<{ id: string }>();
    const { data: profile, isLoading, error } = useProfiles(Number(id))
    const profileData = Array.isArray(profile) ? profile[0] : profile;
    return (
        <main className="w-full mx-auto min-h-screen grid grid-cols-4">
            <div className="col-span-4">
                <div className="flex flex-col px-6 py-8 mx-auto h-screen font-roboto bg-gradient-to-br from-neutral-950 via-neutral-900 to-indigo-900 lg:py-0">
                    {isLoading && (
                        <Title variant='h1' text={"Carregando..."}></Title>
                    )}
                    {error && (error as AxiosError).response?.status === 404 && (
                        <Title variant='h1' text={"Vaga não encontrada."}></Title>
                    )}
                    {profileData && (
                        <section>
                            <Title variant='h2' text={profileData.strRepresentation}></Title>
                        </section>
                        
                    )}
                </div>
            </div>
        </main>
    )
}

export default ProfilePage;
