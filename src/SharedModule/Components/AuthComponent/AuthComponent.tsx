import { AuthLogo } from "@/assets/images"
import React from "react"
import { useLocation } from "react-router-dom"

interface Props{
  children:React.ReactNode
}

const AuthComponent = ({ children }:Props) => {
const {pathname} =  useLocation()
  return <>
    <main className="Auth-container Auth-BackGround container-fluid">
      <div className="row bg-overlay justify-content-center align-items-center overflow-auto ">
        <div className={`${pathname === '/register'? "col-10 col-lg-8 py-3" :"col-md-8 col-lg-6 col-10 py-3" }   `}>
          <div className={`bg-white p-5 animate__animated ${pathname === "/" ?" animate__zoomIn": pathname === "/reset-pass"?"animate__slideInDown" :"animate__zoomInDown"} ` }>
            <div className="logo text-center">
              <img src={AuthLogo} className={`${pathname === '/register'?"w-25":"w-50"} object-fit-cover' alt="logo`} />
            </div>
            {children}
          </div>
        </div>
      </div>
    </main>
  </>
}

export default AuthComponent
