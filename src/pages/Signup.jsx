import { useState } from "react"
import { BottomWarning } from "../components/BottomWarning"
import { Button } from "../components/Button"
import { Heading } from "../components/Heading"
import { InputBox } from "../components/InputBox"
import { SubHeading } from "../components/SubHeading"
import axios from "axios";
import { useNavigate } from "react-router-dom"

export const Signup = () => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
 

  return <div className="bg-slate-300 h-screen flex justify-center">
    <div className="flex flex-col justify-center">
      <div className="rounded-lg bg-white w-80 text-center p-2 h-max px-4">
        <Heading label={"Sign up"} />
        <SubHeading label={"Enter your information to create an account"} />
        <InputBox onChange={e => {
          setFirstName(e.target.value);
        }} placeholder="Nishant" label={"First Name"} />
        <InputBox onChange={(e) => {
          setLastName(e.target.value);
        }} placeholder="Saini" label={"Last Name"} />
        <InputBox onChange={e => {
          setUsername(e.target.value);
        }} placeholder="nishant@gmail.com" label={"Email"} />
        <InputBox onChange={(e) => {
          setPassword(e.target.value)
        }} placeholder="123456" label={"Password"} />
        <div className="pt-4">
          <Button onClick={async () => {
            try {
              const response = await axios.post("http://localhost:3000/api/v1/user/signup", {
                username: username,
                firstName: firstName,
                lastName: lastName,
                password: password
              });

              // Check if response data is valid
              // if (!response.data || !response.data.token || !response.data.message) {
              //   throw new Error("Invalid response data");
              // }

              const { message, token,firstName:fname, userBalance:userbalance  } = response.data;

              // Create user object
              // console.log(message)
              // console.log(token)
              // console.log(fname)
              // console.log(userbalance)
              const user = {
                token: token,
                firstName:fname,
                message: message,
                userbalance:parseFloat(userbalance.toFixed(1)),
              };

              console.log(user);

              // Store user object in local storage
              localStorage.setItem("user", JSON.stringify(user));

              // Navigate to dashboard
              navigate("/dashboard");
            } catch (error) {
              console.error("Error signing up:", error);
              // Handle error (e.g., display error message to user)
            }
          }} label={"Sign up"} />

        </div>
        <BottomWarning label={"Already have an account?"} buttonText={"Sign in"} to={"/signin"} />
      </div>
    </div>
  </div>
}