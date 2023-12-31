import React from 'react'
import { useEffect } from 'react'
import { GoogleLogin } from "react-google-login"
import { gapi } from "gapi-script"
import { googleAuth } from '../apis/auth'
import { useState } from 'react'
import { loginUser } from '../apis/auth'
import { Link, useNavigate } from 'react-router-dom'
import { BsEmojiLaughing, BsEmojiExpressionless } from "react-icons/bs"
import { toast } from 'react-toastify';
import Navbar from '../components/Navbar'
import { validUser } from '../apis/auth'
import login from "../assets/login.jpg"
const defaultData = {
  email: "",
  password: ""
}
function Login() {
  const [formData, setFormData] = useState(defaultData)
  const [isLoading, setIsLoading] = useState(false)
  const [showPass, setShowPass] = useState(false)
  const pageRoute = useNavigate()
  const googleSuccess = async (res) => {
    if (res?.profileObj) {
      setIsLoading(true)
      const response = await googleAuth({ tokenId: res.tokenId })
      setIsLoading(false)

      console.log("response :" + res)
      if (response.data.token) {
        localStorage.setItem("userToken", response.data.token)
        pageRoute("/chats")

      }
    }
  }
  const googleFailure = (error) => {
    toast.error("Something went Wrong.Try Again!")
  }
  const handleOnChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  const formSubmit = async (e) => {
    e.preventDefault()
    if (formData.email.includes("@") && formData.password.length > 6) {
      setIsLoading(true)
      const { data } = await loginUser(formData)
      if (data?.token) {
        localStorage.setItem("userToken", data.token)
        toast.success("Succesfully Login!")
        setIsLoading(false)
        pageRoute("/chats")
      }
      else {
        setIsLoading(false)
        toast.error("Invalid Credentials!")
        setFormData({ ...formData, password: "" })
      }
    }
    else {
      setIsLoading(false)
      toast.warning("Provide valid Credentials!")
      setFormData(defaultData)

    }
  }
  useEffect(() => {
    const initClient = () => {
      gapi.client.init({
        clientId: process.env.REACT_APP_GOOGLE_CLIENT_ID,
        scope: ''
      });
    };
    gapi.load('client:auth2', initClient);
    const isValid = async () => {
      const data = await validUser()
      if (data?.user) {
        window.location.href = "/chats"
      }

    }
    isValid()
  }, [])
  return (
    <>
      <Navbar />
      <div className="flex justify-center items-center ">
        <img
          src={login}
          alt=""
          className="w-1/2 mx-auto px-8 pt-16 ml-8  md:mt-4  hidden md:block"
        />
        <div className=" w-full md:w-1/2 flex justify-center items-center mt-8 ml-0  md:ml-24 ">
          <div className="w-[90%] sm:w-[400px] pl-0 ml-0 h-[400px] mt-36 sm:pl-0 relative">
            {/* <img className='w-[100px] absolute -top-16 left-28' src="https://mir-s3-cdn-cf.behance.net/project_modules/fs/78c4af118001599.608076cf95739.jpg" alt="" /> */}
            <div className="absolute -top-5 left-0">
              <h3 className=" text-[25px] font-bold tracking-wider text-black">
                Login
              </h3>
              <p className="text-black text-[12px] tracking-wider font-medium">
                No Account ?{" "}
                <Link
                  className="text-[rgba(0,195,154,1)] underline"
                  to="/register"
                >
                  Sign up
                </Link>
              </p>
            </div>
            {/* <h2 className='text-2xl text-[#fff] font-bold tracking-wide my-6 text-center'>Login to your Account</h2> */}
            <form
              className="flex flex-col gap-y-4 mt-[12%]"
              onSubmit={formSubmit}
            >
              <div>
                <input
                  className="w-[100%] sm:w-[80%] bg-[#222222] h-[50px] pl-3 text-[#ffff] rounded-lg"
                  onChange={handleOnChange}
                  name="email"
                  type="text"
                  placeholder="Email"
                  value={formData.email}
                  required
                />
              </div>
              <div className="relative">
                <input
                  className="w-[100%] sm:w-[80%] bg-[#222222] h-[50px] pl-3 text-[#ffff] rounded-lg"
                  onChange={handleOnChange}
                  type={showPass ? "text" : "password"}
                  name="password"
                  placeholder="Password"
                  value={formData.password}
                  required
                />
                {!showPass ? (
                  <button type="button">
                    <BsEmojiLaughing
                      onClick={() => setShowPass(!showPass)}
                      className="text-[#fff] absolute top-3 right-5 sm:right-24 w-[30px] h-[25px] rounded-lg"
                    />
                  </button>
                ) : (
                  <button type="button">
                    {" "}
                    <BsEmojiExpressionless
                      onClick={() => setShowPass(!showPass)}
                      className="text-[#fff] absolute top-3 right-5 sm:right-24 w-[30px] h-[25px] rounded-lg"
                    />
                  </button>
                )}
              </div>

              <button
                className="w-[100%]  sm:w-[80%] h-[50px] font-bold text-white tracking-wide text-[17px] relative rounded-lg bg-[#00c39a]"
                type="submit"
              >
                <div
                  style={{ display: isLoading ? "" : "none" }}
                  className="absolute -top-[53px] left-[27%] sm:-top-[53px] sm:left-[56px]"
                >
                  <lottie-player
                    src="https://assets2.lottiefiles.com/packages/lf20_h9kds1my.json"
                    background="transparent"
                    speed="1"
                    style={{ width: "200px", height: "160px" }}
                    loop
                    autoplay
                  ></lottie-player>
                </div>
                <p
                  style={{ display: isLoading ? "none" : "block" }}
                  className="test-[#fff]"
                >
                  Login
                </p>
              </button>
              <p className='ml-40  md:ml-36 pl-4 font-bold'>/</p>
              <GoogleLogin
                clientId={process.env.REACT_APP_GOOGLE_CLIENT_ID}
                render={(renderProps) => (
                  <button
                    onClick={renderProps.onClick}
                    disabled={renderProps.disabled}
                    aria-label="Continue with google"
                    className="focus:ring-2 focus:ring-offset-1  py-3.5 px-4 border rounded-lg  flex items-center w-[100%]  sm:w-[80%] bg-[rgba(0,195,154,1)] justify-center"
                    disableElevation={true}
                    disablefocusRipple={true}
                  >
                    <img
                      src="https://tuk-cdn.s3.amazonaws.com/can-uploader/sign_in-svg2.svg"
                      alt="google"
                    />
                    <p className="text-[base] font-medium ml-4 text-[#fff]">
                      Continue with Google
                    </p>
                  </button>
                )}
                onSuccess={googleSuccess}
                onFailure={googleFailure}
                cookiePolicy={"single_host_origin"}
              />
            </form>
          </div>
        </div>
      </div>
    </>
  );
}

export default Login