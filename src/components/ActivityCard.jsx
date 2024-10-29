import { Target } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function ActivityCard({ title, description, icon, headerColor, iconBackgroundColor, route }) {
    return (
        <div className='border rounded-xl min-w-[10.2rem] min-h-[10.2rem]'>
            <Link to={route}>
                <div className={`${headerColor} text-white h-[30%]  flex justify-center items-center rounded-t-xl`}>
                    <h2 className="text-sm font-bold">{title}</h2>
                </div>
                <div className="flex flex-col items-center h-[70%] bg-white p-2 rounded-b-xl">
                    <div className={`${iconBackgroundColor} p-[0.5rem] rounded-full`}>
                        {icon || <Target size={24} color="green" />}
                    </div>
                    <p className="text-center text-gray-700 text-[13px] mt-1 leading-tight">
                        {description}
                    </p>
                </div>
            </Link>
        </div>

    );
}
