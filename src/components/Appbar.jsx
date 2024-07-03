import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
//  import {Dashboard }from '../pages/Dashboard';

export const Appbar = () => {
    const navigate = useNavigate();
    const [firstName, setFirstname] = useState('');

    const user = JSON.parse(localStorage.getItem("user"));
    useEffect(() => {
        if (user) {
            setFirstname(user.firstName);
        }
    }, []);
    // console.log("karanpreet");
    // console.log(user.firstName);
    // console.log(user.userbalance);

    const onLogout = () => {
        localStorage.setItem("user", null);
        navigate("/");
    }
    return <div className="shadow h-14 flex justify-between bg-white dark:bg-gray-800">
    <div className="flex flex-col justify-center items-center h-full ml-8 font-bold text-gray-900 dark:text-white">
        PayTM App
    </div>

    <div className="flex items-center">
        {firstName && (
            <div className="rounded-full h-12 w-12 bg-slate-200 flex justify-center items-center mr-2">
                <div className="text-2xl">{firstName[0]}</div>
            </div>
        )}
        <button
            onClick={onLogout}
            type="button"
            className="text-gray-900 bg-white border border-gray-300 focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-100 font-medium rounded-full text-sm px-5 py-2.5 dark:bg-gray-800 dark:text-white dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700 mr-7"
        >
            Logout
        </button>
    </div>
</div>

}
export default Appbar;