import { useEffect, useState } from "react"
import { Button } from "./Button"
import axios from "axios";
import { useNavigate } from "react-router-dom";

export const Users = () => {
    const [users, setUsers] = useState([]);
    const [filter, setFilter] = useState("");
    const [currentuser, setCurrentUser] = useState("");

    useEffect(() => {
        const user = JSON.parse(localStorage.getItem("user"));
        if (user) {
            setCurrentUser(user.username);
        }
    }, []);

    useEffect(() => {
        axios.get("http://localhost:3000/api/v1/user/bulk?filter=" + filter)
            .then(response => {
                const filteredUser = response.data.user.filter(user => user.username !== currentuser);
                setUsers(filteredUser);
            })
            .catch(error => {
                console.error('Error fetching data:', error);
            });
    }, [filter, currentuser]);


    return <>
      <div className="font-bold mt-6 text-lg">
    Users
</div>
<div className="my-2">
    <input
        onChange={(e) => {
            setFilter(e.target.value);
        }}
        type="text"
        placeholder="Search users..."
        className="w-full px-2 py-1 border rounded border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
    />
</div>
<div>
    {users.map((user) => (
        <User user={user} key={user.id} />
    ))}
</div>

    </>
}

function User({user}) {
    const navigate = useNavigate();

    return <div className="flex justify-between">
    <div className="flex">
        <div className="rounded-full h-12 w-12 bg-slate-200 flex justify-center items-center mt-1 mr-2">
            <div className="text-xl">
                {user.firstName[0]}
            </div>
        </div>
        <div className="flex flex-col justify-center">
            <div className="text-base">
                {user.firstName} {user.lastName}
            </div>
        </div>
    </div>

    <div className="flex flex-col justify-center">
        <Button
            onClick={(e) => {
                navigate(`/send?id=${user._id}&name=${user.firstName}`);
            }}
            label="Send Money"
            className="text-sm bg-blue-500 hover:bg-blue-700 text-white py-1 px-3 rounded-md"
        />
    </div>
</div>

}