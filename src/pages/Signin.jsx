import { useState } from "react"
import { BottomWarning } from "../components/BottomWarning"
import { Button } from "../components/Button"
import { Heading } from "../components/Heading"
import { InputBox } from "../components/InputBox"
import { SubHeading } from "../components/SubHeading"
import axios from "axios"
import { useNavigate } from "react-router-dom"
import { useEffect } from "react";



export const Signin = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const user = JSON.parse(localStorage.getItem("user"));

  const navigate = useNavigate();
  
  useEffect(() => {
    if (user != null) {
        navigate("/dashboard");
    }
}, []);
const handleSignIn = async () => {
  // Check if username or password is empty
  if (!username || !password) {
    setErrorMessage('Please enter both username and password.');
    return;
  }}
  // useEffect(() => {
  //   const userToken = localStorage.getItem("token");

  //   if (userToken) {
  //     navigate("/dashboard");
  //   }
  // }, []);
  return <div className="bg-slate-300 h-screen flex justify-center">
    <div className="flex flex-col justify-center">
      <div className="rounded-lg bg-white w-80 text-center p-2 h-max px-4">
        <Heading label={"Sign in"} />
        <SubHeading label={"Enter your credentials to access your account"} />
        <InputBox onChange={e => {
          setUsername(e.target.value);
        }} placeholder="nishant@gmail.com" label={"Email"} />
        <InputBox onChange={e => {
          setPassword(e.target.value);
        }} placeholder="123456" label={"Password"} />
        <div className="pt-4">
          <Button onClick={async () => {
            try {
            

              const response = await axios.post("http://localhost:3000/api/v1/user/signin", {
                username: username,
                password: password
              });
             
              console.log("hello tusha");
               console.log(response.data.userbalance);
            
              const { token, username : uname, firstName ,userbalance  } = response.data;
              // Store token and user info in local storage
             
              console.log(token);
              const user = {
                token: token,
                username: uname,
                firstName: firstName,
                userbalance:parseFloat(userbalance.toFixed(1))
              }
              console.log(user);
              localStorage.setItem("user", JSON.stringify(user));
              if (username  && password) {
              navigate("/dashboard");
  
  }
            }
            catch (error) {
              console.error("Error during sign-in:", error);

            }



          

            // navigate("/dashboard")

          }} label={"Sign in"} />
        </div>
        <BottomWarning label={"Don't have an account?"} buttonText={"Sign up"} to={"/signup"} />
      </div>
    </div>
  </div>
}