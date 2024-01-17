import { AuthContext } from '@/Context/AuthContext'
import { ToastContext } from '@/Context/ToastContext'
import { IFormValues } from '@/Interfaces'
import { AuthComponent, EmailInput, PasswordInput } from '@/SharedModule/Components'
import baseUrl from '@/utils/Custom/Custom'
import { useContext, useEffect, useState } from 'react'
import { Helmet } from 'react-helmet'
import { useForm } from 'react-hook-form'
import { Link, useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
// @ts-ignore
// import { Helmet } from '';

const Login = () => {

  const navigate = useNavigate()
  const [Loading, setLoading] = useState(false)
  const { getToastValue } = useContext(ToastContext)
  const { saveAdminData } = useContext(AuthContext)

  const { register, handleSubmit, formState: { errors } } = useForm<IFormValues>()

  function handleCallbackResponse(response: any) {

    localStorage.setItem("adminToken", response.credential)
    if (saveAdminData)
      saveAdminData()
    navigate('/dashboard')
    toast.success('Welcome', {
      autoClose: 2000,
      theme: "colored",
    });

  }

  useEffect(() => {
    // @ts-ignore
    const google = window.google
    google.accounts.id.initialize({
      client_id: '320174446901-75vhr20bt9ei5l896ul3lldh92bshbdg.apps.googleusercontent.com',
      callback: handleCallbackResponse,
    })

    google.accounts.id.renderButton(
      document.getElementById("signInDiv"),
      { theme: "outline", size: "large" },
    )
    google.accounts.id.prompt()

  }, [])




  const submitLogin = (data: IFormValues) => {
    setLoading(true)
    return baseUrl.post(`/api/v1/Users/Login`, data)
      .then((res) => {
        localStorage.setItem("adminToken", res.data.token)
        if (saveAdminData)
          saveAdminData()
        if (getToastValue)
          getToastValue("success", "Welcome")
        navigate('/dashboard')
      })
      .catch((err) => {
        if (getToastValue)
          getToastValue("error", err.response.data.message)
      }).finally(() => {
        setLoading(false)
      })
  }



  return <>
<Helmet>
  <title> Sign in • Food App</title>
</Helmet>

    <AuthComponent>
      <form onSubmit={handleSubmit(submitLogin)}>
        <h2 className='fw-bold'>Log In</h2>
        <p>Welcome Back! Please enter your details</p>

        <EmailInput {...{ register, errors }} inputName={'email'} />

        <PasswordInput register={register} inputName={'password'} placeholder='Password' errors={errors} />

        <div className=' mt-2 d-flex flex-md-row justify-content-between align-items-center flex-column'>
        <Link to={'/register'} className='forget text-decoration-none orange '>Registration ?</Link>
          <div className=' my-2' id='signInDiv'></div>
          
          <Link to={'/forget-pass-request'} className='forget'>Forgot Password ?</Link>
        </div>
        <button type='submit' disabled={Loading} className='btn btn-success w-100 mt-4 fw-bold'>{Loading ? <i className='fa fa-spin fa-spinner'></i> : "Login"}</button>

      </form>
    </AuthComponent>
  </>
}

export default Login