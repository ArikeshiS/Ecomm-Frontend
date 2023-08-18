import React, {useState} from "react";
import Layout from "../../components/Layout/Layout";
import { toast } from 'react-toastify';
import axios from "axios";
import { useNavigate, useLocation } from "react-router-dom";
import "../../styles/AuthStyles.css";
import {useAuth} from "../../context/auth"
const Login = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [auth, setAuth] = useAuth();

    const navigate = useNavigate();
    const location = useLocation();

    const handleSubmit = async(e) => {
        e.preventDefault();
        // console.log(name, email, password, address, phone);
        // toast.success("Register Success");
        try{

            const response = await axios.post("http://localhost:8080/api/v1/auth/login",{
                email,
                password,
            });
            if(response && response.data.success)
            {
                toast.success(response.data.message);
                setAuth({
                    ...auth,
                    user: response.data.user,
                    token: response.data.token,
                }) 
                localStorage.setItem('auth', JSON.stringify(response.data));
                navigate(location.state ||"/"); 
            }
            else
            {
                // toast.success(response.data && response.data.message);
                toast.error(response.data.message)
            }

        }catch(error){
            console.log("Error: ", error.message);
            toast.error("Something went wrong");
        }
    }


  return (
    <Layout title="Register - Ecommer App">
      <div className="form-container" style={{ minHeight: "90vh" }}>
        <form onSubmit={handleSubmit}>
          <h4 className="title">Login to continue..</h4>
          <div className="mb-3">
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="form-control"
              id="exampleInputEmail1"
              placeholder="Enter Your Email "
              required
            />
          </div>
          <div className="mb-3">
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="form-control"
              id="exampleInputPassword1"
              placeholder="Enter Your Password"
              required
            />
          </div>
          <div className="mb-3">
          <button type="button" className="btn btn-primary" onClick={() => {navigate('/forgot-password')}}>
            Forgot Password
          </button>
          </div>
          <button type="submit" className="btn btn-primary">
            LOGIN
          </button>
        </form>
      </div>
    </Layout>
  );
};

export default Login;
