import { Link } from 'react-router-dom';
import { Tabs, TabList, TabPanels, Tab, TabPanel } from '@chakra-ui/react'
import { townRoutes } from '../../StaticInfo/GarbageInfo';
import { auroraRoutes } from '../../StaticInfo/GarbageInfo';
import { concepcionRoutes } from '../../StaticInfo/GarbageInfo';
import GarbageCard from '../../components/GarbageCard';
import { ChevronLeft } from 'lucide-react';
import '../../assets/styles/truck.css'

export default function GarbageSchedule() {

    return (
        <>
            <div className='flex flex-col w-full gap-4'>
                <Link to={"/app/activity"}>
                    <ChevronLeft size={40} />
                </Link>
                <header className="flex justify-center">
                    <section className="truck text-white rounded-3xl text-center flex items-center h-[8rem] justify-center w-[97%] relative">
                        <div>
                            <h1 className="text-2xl font-bold text-left pl-4 shadow-lg">
                                Horario
                            </h1>
                            <p className="text-sm mt-2 text-left pl-4 font-semibold shadow-lg">
                                Horarios de recolección de basura en tu zona.
                            </p>
                        </div>
                    </section>
                </header>
                <section className='flex flex-col items-center w-full gap-7'>
                    <h1 className="pl-4 text-xl font-medium text-stellar-blue">
                        <span className="inline-block border-b-[0.1rem] border-yellow-400 pb-1">
                            <b>Encuentra tu zona</b>
                        </span>
                    </h1>

                    <Tabs variant="soft-rounded" >
                        <TabList display="flex" justifyContent="center">
                            <Tab _selected={{ bg: '#36a6ba', color: 'white' }}>El Centro</Tab>
                            <Tab _selected={{ bg: '#36a6ba', color: 'white' }}>La Aurora</Tab>
                            <Tab _selected={{ bg: '#36a6ba', color: 'white' }}>Concepción</Tab>
                        </TabList>

                        <TabPanels>
                            <TabPanel>
                                <section className='flex flex-col items-center gap-4 h-[80vh] overflow-auto'>
                                    {townRoutes.map(card => (
                                        <GarbageCard
                                            place={card.place}
                                            day={card.day}
                                            time={card.time}
                                            lineColor={card.lineColor}
                                        />
                                    ))}
                                </section>
                            </TabPanel>

                            <TabPanel>
                                <section className='flex flex-col items-center gap-4 h-[80vh] overflow-auto'>
                                    {auroraRoutes.map(card => (
                                        <GarbageCard
                                            place={card.place}
                                            day={card.day}
                                            time={card.time}
                                            lineColor={card.lineColor}
                                        />
                                    ))}
                                </section>
                            </TabPanel>

                            <TabPanel>
                                <section className='flex flex-col items-center gap-4 h-[80vh] overflow-auto'>
                                    {concepcionRoutes.map(card => (
                                        <GarbageCard
                                            place={card.place}
                                            day={card.day}
                                            time={card.time}
                                            lineColor={card.lineColor}
                                        />
                                    ))}
                                </section>
                            </TabPanel>
                        </TabPanels>
                    </Tabs>

                </section>
            </div>
        </>
    )
}
