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


    if (!isLoading && profileData?.status != "A") {
        return <div className='flex justify-center items-center h-screen bg-white'>
            <Title variant='h1' text='Ops! Vaga encerrada.' mode='light'></Title>
        </div>
    }
    return (
        <main className="w-full mx-auto grid grid-cols-4 bg-white">
            <div className="col-span-4">
                <div className="flex flex-col px-4 sm:px-6 py-6 sm:py-8 mx-auto font-roboto lg:py-0">
                    {isLoading && (
                        <div className='flex justify-center items-center h-screen'>
                            <Title variant='h1' mode='light' text={"Carregando..."}></Title>
                        </div>
                    )}
                    {error && (error as AxiosError).response?.status === 404 && (
                        <div className='flex justify-center items-center h-screen'>
                            <Title variant='h1' mode='light' text={"Vaga encerrada."}></Title>
                        </div>
                    )}
                    {profileData && (
                        <section className='p-6 bg-zinc-50 border border-neutral-400 rounded-lg shadow-sm my-6'>
                            <Title variant='h2' text={profileData.positionStr} className='border-b-2 pb-2 border-neutral-400' mode='light'></Title>
                            <div className='my-4 text-zinc-700 border-b-2 pb-2 border-neutral-400'>
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
                            <div className='my-4 text-zinc-700 border-b-2 pb-2 border-neutral-400'>
                                <Title variant='h3' text='Responsabilidades' mode='light'></Title>
                                <p className='text-zinc-700 my-2'>
                                    <ul className='list-disc list-inside'>
                                        {profileData.jobResponsibilities.split("\r\n").map((responsability, key) => (
                                            <li key={key}>{responsability}</li>
                                        ))}
                                    </ul>
                                </p>
                            </div>
                            <div className='my-4 text-zinc-700 border-b-2 pb-2 border-neutral-400'>
                                <Title variant='h3' text='Atribuições' mode='light'></Title>
                                <p className='text-zinc-700 my-2'>
                                    <ul className='list-disc list-inside'>
                                        {profileData.professionalExperience.split("\r\n").map((experience, key) => (
                                            <li key={key}>{experience}</li>
                                        ))}
                                    </ul>
                                </p>
                            </div>
                            <div className='my-4 text-zinc-700 border-b-2 pb-2 border-neutral-400'>
                                <Title variant='h3' text='Benefícios' mode='light'></Title>
                                <p className='text-zinc-700 my-2'>
                                    <ul className='list-disc list-inside'>
                                        {profileData.benefits.map((benefit, key) => (
                                            <li key={key}>{benefit}</li>
                                        ))}
                                    </ul>
                                </p>
                            </div>
                            <p className='md:text-lg text-zinc-700 lg:text-xl'>Ficou interesado? Cadastre seu currículo.</p>
                            <Button text={'Se candidatar'} variant='dark' onClick={() => navigate("/#resume")}>
                            </Button>
                        </section>
                    )}
                </div>
            </div>
        </main>
    )
}

export default ProfilePage;
