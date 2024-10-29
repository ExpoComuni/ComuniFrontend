import React from 'react'
import { Phone } from 'lucide-react';

export default function PhoneCard({ place, number, description, lineColor }) {
    return (
        <div className="flex items-center border p-4 rounded-xl text-black w-full">
            <div className="flex flex-col items-center justify-center">
                <div className="flex flex-col items-center justify-center pl-2">
                    <div className="border-l-4 " style={{ borderColor: lineColor }}>
                        <div className="flex flex-col  px-4 py-2">
                            <p className="text-lg font-semibold">{place}</p>
                            <p>{description}</p>
                            <p className="flex gap-2 text-sm text-gray-700"><Phone size={20}/> {number}</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};