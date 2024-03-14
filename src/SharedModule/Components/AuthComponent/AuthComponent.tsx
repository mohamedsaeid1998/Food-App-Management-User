import { AuthLogo } from "@/assets/images"
import React, { useEffect, useState } from "react"
import { useLocation } from "react-router-dom"
import { toast } from "react-toastify"

interface Props {
  children: React.ReactNode
  setValue?: any
}

const AuthComponent = ({ setValue, children }: Props) => {
  const { pathname } = useLocation()



  const [radioCheckedUser, setRadioCheckedUser] = useState(false);

  const handleTestCode = (e: any) => {
    e.preventDefault()

    if (testCode === "3c6v9b") {
      setShow(true)
      toast.success("Choose account Kind", {
        autoClose: 2000,
        theme: "colored",
      });


    } else {
      setShow(false)
      toast.error("Wrong Code", {
        autoClose: 2000,
        theme: "colored",
      })
    }

  }

  useEffect(() => {

    if (radioCheckedUser) {
      setValue("email", "msmma198@gmail.com")
      setValue("password", "01021754177@Aa")
    }

  }, [radioCheckedUser])


  const [testCode, setTestCode] = useState("")
  const [show, setShow] = useState(false)


  const handleRadioChangeUser = (e: any) => {
    setRadioCheckedUser(e.target.checked);
  };
  return <>
    <main className="Auth-container Auth-BackGround container-fluid">
      <div className="row bg-overlay justify-content-center align-items-center overflow-auto ">
        <div className={`${pathname === '/register' ? "col-10 col-lg-8 py-3" : "col-md-8 col-lg-6 col-10 py-3"}   `}>
          <div className={`bg-white p-5 animate__animated ${pathname === "/" ? " animate__zoomIn" : pathname === "/reset-pass" ? "animate__slideInDown" : "animate__zoomInDown"} `}>
            <div className="logo text-center">
              <img src={AuthLogo} className={`${pathname === '/register' ? "w-25" : "w-50"} object-fit-cover' alt="logo`} />
            </div>
            {children}
            {pathname === "/" ?
              <form className="testContainer">
                <input
                  className="w-25 rounded-1 px-2 form-control border border-1 border-dark"
                  type="password"
                  placeholder="test Code"
                  onChange={(e) => {
                    setTestCode(e.target.value)
                  }}
                />
                <button
                  className="btn btn-sm btn-success ms-2 fw-bold"
                  onClick={() => handleTestCode(event)}
                >
                  Submit
                </button>
                <div
                  className={`${show ? "show" : "hide"} `}>
                  <div className="inputWrapper">
                    <label htmlFor="User" >User</label>
                    <input type="radio" name="check " id="User"
                      checked={radioCheckedUser}
                      onChange={handleRadioChangeUser}
                      className="radioInput" />
                  </div>
                </div>
              </form>
              : ""}
          </div>
        </div>
      </div>
    </main>
  </>
}

export default AuthComponent
