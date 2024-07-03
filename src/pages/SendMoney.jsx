import {useNavigate, useSearchParams } from 'react-router-dom';
import axios from "axios";
import { useState, useEffect } from 'react';
export const SendMoney = () => {
    const navigate = useNavigate();
    const [searchParams] = useSearchParams();
    const id = searchParams.get("id");
    const name = searchParams.get("name");
    const [amount, setAmount] = useState(0);
    const [transferStatus, setTransferStatus] = useState(null);
    const user = JSON.parse(localStorage.getItem("user"));
    useEffect(() => {
        if (user == null) {
            navigate("/signin");
        }
    }, []);

    const initiateTransfer = async () => {
       
        try {
            const response = await axios.post(
                "http://localhost:3000/api/v1/account/transfer",
                { to: id, amount },
                { headers: { Authorization: "Bearer " + user.token } }
            );
            setTransferStatus({success: true, message: "Transfer initiated successfully!"});
        } catch (error) {
            console.error("Error initiating transfer:", error);
            setTransferStatus({success: false, message: "Failed to initiate transfer/Insufficient balance. Please try again."});
        }
    };

    const onOkClick = async () => {
        if (transferStatus.success) {
            try {
                // Fetch the latest balance from the server
                const balanceResponse = await axios.get("http://localhost:3000/api/v1/account/balance", {
                    headers: { Authorization: "Bearer " + user.token }
                });
                const latestBalance1 = balanceResponse.data.balance;
                const  latestBalance = parseFloat(latestBalance1.toFixed(1));
                
    
                // Update the balance in local storage
                const updatedUser = JSON.parse(localStorage.getItem("user"));
                updatedUser.userbalance = latestBalance;
                localStorage.setItem("user", JSON.stringify(updatedUser));
    
                // Navigate to the dashboard
                navigate("/dashboard");
            } catch (error) {
                console.error("Error updating balance:", error);
                setTransferStatus({ success: false, message: "Failed to update balance. Please try again." });
            }
        }
    
        // Reset transfer status
        setTransferStatus(null);
    };
    

    return (
        <div className="flex justify-center h-screen bg-gray-100">
            {
                transferStatus &&
                <StatusModal status={transferStatus} onOkClick={onOkClick}/>
            }
            <div className="h-full flex flex-col justify-center">
                <div className="border h-min text-card-foreground max-w-md p-4 space-y-8 w-96 bg-white shadow-lg rounded-lg">
                    <div className="flex flex-col space-y-1.5 p-6">
                        <h2 className="text-3xl font-bold text-center">Send Money</h2>
                    </div>
                    <div className="p-6">
                        <div className="flex items-center space-x-4">
                            <div className="w-12 h-12 rounded-full bg-green-500 flex items-center justify-center">
                                <span className="text-2xl text-white">{name[0].toUpperCase()}</span>
                            </div>
                            <h3 className="text-2xl font-semibold">{name}</h3>
                        </div>
                        <div className="space-y-4">
                            <div className="space-y-2">
                                <label htmlFor="amount" className="text-sm font-medium leading-none">
                                    Amount (in Rs)
                                </label>
                                <input
                                    onChange={(e) => setAmount(e.target.value)}
                                    type="number"
                                    className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
                                    id="amount"
                                    placeholder="Enter amount"
                                />
                            </div>
                            <button
                                onClick={initiateTransfer}
                                className="justify-center rounded-md text-sm font-medium ring-offset-background transition-colors h-10 px-4 py-2 w-full bg-green-500 text-white"
                            >
                                Initiate Transfer
                            </button>
                            <button
                                onClick={() => navigate("/dashboard")}
                                className="justify-center rounded-md text-sm font-medium ring-offset-background transition-colors h-10 px-4 py-2 w-full bg-red-500 text-white"
                            >
                                Cancel & Go Back
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};


const StatusModal = ({status, onOkClick}) => {
    return <div className='fixed top-0 left-0 bg-[#0000005f] items-center justify-center flex h-full w-full'>
        <div className='bg-white p-16 flex items-center flex-col'>
            <h3>Message</h3>
            <p>{status.message}</p>
            <button onClick={onOkClick} className='p-4 bg-black text-white'>Ok</button>
        </div>
    </div>
}