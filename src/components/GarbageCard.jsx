import React from 'react';

export default function GarbageCard({ place, day, time, lineColor }) {
    return (
        <div className="flex items-center border p-3 rounded-xl text-black w-full">
            <div className="flex flex-col items-center justify-center">
                <div className="border-l-4 " style={{ borderColor: lineColor }}>
                    <div className="px-4 py-2">
                        <p className="text-lg font-bold">{day}</p>
                        <p className="text-sm text-gray-400">{time}</p>
                    </div>
                </div>
            </div>
            <div className="flex-grow ml-4">
                <p className="text-lg font-semibold">{place}</p>
                <p className="text-sm text-gray-400">Recolección de Basura</p>
            </div>
            <div className="ml-auto">
                <span className="text-white">&gt;</span>
            </div>
        </div>
    );
};

