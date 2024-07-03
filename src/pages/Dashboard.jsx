import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Appbar from "../components/Appbar"; 
import { Balance } from "../components/Balance";
import { Users } from "../components/Users";

export const Dashboard = () => {
    const navigate = useNavigate();
    const [currentBalance, setBalance] = useState(0);
    const user = JSON.parse(localStorage.getItem("user"));

    useEffect(() => {
        if (!user) {
            navigate("/signin");
        } else {
            setBalance(user.userbalance);
        }
    }, [user, navigate]);

    return (
        <div>
            <Appbar />
            <div className="m-8">
                <div className="font-bold mt-6 text-lg">Balance</div>
                <div className="mt-2">
                    <Balance value={currentBalance} />
                </div>
                <Users />
            </div>
        </div>
    );
};
