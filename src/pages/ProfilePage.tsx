// Profile.tsx
import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useProfiles } from '../hooks/useProfiles';
import Title from '../components/ui/Title';
import { AxiosError } from 'axios';
import { FiBriefcase, FiClock, FiDollarSign, FiMapPin } from "react-icons/fi";
import Button from '../components/ui/Button';

const ProfilePage: React.FC = () => {
    const { id } = useParams<{ id: string }>();
    const { data: profile, isLoading, error } = useProfiles(Number(id));
    const profileData = Array.isArray(profile) ? profile[0] : profile;
    const navigate = useNavigate();


    return (
        <main className="w-full mx-auto min-h-screen grid grid-cols-4">
            <div className="col-span-4">
                <div className="flex flex-col px-4 sm:px-6 py-6 sm:py-8 mx-auto h-screen font-roboto bg-gradient-to-br from-neutral-950 via-neutral-900 to-indigo-900 lg:py-0">
                    {isLoading && (
                        <Title variant='h1' text={"Carregando..."}></Title>
                    )}
                    {error && (error as AxiosError).response?.status === 404 && (
                        <Title variant='h1' text={"Vaga não encontrada."}></Title>
                    )}
                    {profileData && (
                        <section className='p-6 bg-neutral-950 border border-neutral-800 rounded-lg shadow-sm my-6'>
                            <Title variant='h2' text={profileData.positionStr} className='border-b-2 pb-2 border-neutral-800'></Title>
                            <div className='my-4 text-zinc-300 border-b-2 pb-2 border-neutral-800'>
                                <div>
                                    Publicada em {new Date(profileData.createdAt).toLocaleDateString("pt-BR")}
                                </div>
                                <div className="flex items-center justify-start gap-2 w-full rounded">
                                    <FiMapPin /> {profileData.location}
                                </div>
                                <div className="flex items-center justify-start gap-2 w-full rounded">
                                    <FiBriefcase /> Efetivo
                                </div>
                                <div className="flex items-center justify-start gap-2 w-full rounded">
                                    <FiClock /> {profileData.workSchedule}
                                </div>
                                {profileData.remuneration && (
                                    <div className="flex items-center justify-start gap-2 w-full rounded">
                                        <FiDollarSign /> R${profileData.remuneration}
                                    </div>
                                )}
                            </div>
                            <div className='my-4 text-zinc-300 border-b-2 pb-2 border-neutral-800'>
                                <Title variant='h3' text='Responsabilidades'></Title>
                                <p className='text-zinc-100 my-2'>
                                    <ul className='list-disc list-inside'>
                                        {profileData.jobResponsibilities.split("\r\n").map((responsability, key) => (
                                            <li key={key}>{responsability}</li>
                                        ))}
                                    </ul>
                                </p>
                            </div>
                            <div className='my-4 text-zinc-300 border-b-2 pb-2 border-neutral-800'>
                                <Title variant='h3' text='Atribuições'></Title>
                                <p className='text-zinc-100 my-2'>
                                    <ul className='list-disc list-inside'>
                                        {profileData.professionalExperience.split("\r\n").map((experience, key) => (
                                            <li key={key}>{experience}</li>
                                        ))}
                                    </ul>
                                </p>
                            </div>
                            <div className='my-4 text-zinc-300 border-b-2 pb-2 border-neutral-800'>
                                <Title variant='h3' text='Benefícios'></Title>
                                <p className='text-zinc-100 my-2'>
                                    <ul className='list-disc list-inside'>
                                        {profileData.benefits.map((benefit, key) => (
                                            <li key={key}>{benefit}</li>
                                        ))}
                                    </ul>
                                </p>
                            </div>
                            <p className='md:text-lg text-zinc-100 lg:text-xl'>Ficou interesado? Cadastre seu currículo.</p>
                            <Button text={'Se candidatar'} onClick={() => navigate("/#resume")}>
                            </Button>
                        </section>
                    )}
                </div>
            </div>
        </main>
    )
}

export default ProfilePage;
