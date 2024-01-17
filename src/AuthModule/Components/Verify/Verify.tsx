
import { ToastContext } from '@/Context/ToastContext'
import { IFormValues } from '@/Interfaces'
import baseUrl from '@/utils/Custom/Custom'
import { useContext, useState } from 'react'
import { useForm } from 'react-hook-form'
import { Link, useNavigate, } from 'react-router-dom'
import './Verify.module.scss'
import { AuthComponent, EmailInput } from '@/SharedModule/Components'
import { Helmet } from 'react-helmet'
const Verify = () => {

  const navigate = useNavigate()

  const { getToastValue } = useContext(ToastContext)

  const { register, handleSubmit, formState: { errors } } = useForm<IFormValues>()
  const [Loading, setLoading] = useState(false)


  const submitVerify = (data: IFormValues) => {
    setLoading(true)
    return baseUrl.put(`/api/v1/Users/verify`, data)
      .then(() => {
        if (getToastValue)
          getToastValue("success", "Successfully Verify")
        navigate('/')
      })
      .catch((err) => {
        if (getToastValue)
          getToastValue("error", err.response.data.message)
      }).finally(() => {
        setLoading(false)
      })
  }

  return <>
    <AuthComponent>
      <Helmet>
        <title> verification the account • Food App</title>
      </Helmet>
      <form onSubmit={handleSubmit(submitVerify)}>
        <h2 className='fw-bold'>Verify</h2>
        <p>Welcome Back! Please enter your details</p>
        <EmailInput inputName='email' {...{ errors, register }} />
        <div className='input-con'>

          <div className=' d-flex gap-2'>
            <i className="fa-solid fa-mobile-screen pe-2 "></i>
            <input
              className=' form-control w-100'
              type="text"
              placeholder='Enter Verification'

              {...register("code", {
                required: "code is Required",
                pattern: {
                  value: /^[a-zA-Z0-9]{4}$/,
                  message: " code must be 4 char"
                }
              })}
            />

          </div>

        </div>
        {errors?.code ? <span className='text-danger small'>{errors?.code?.message}</span> : null}

        <div className=' mt-2 text-end'>
          <Link to={'/'} className='forget text-decoration-none text-white '>Login ?</Link>
        </div>
        <button type='submit' disabled={Loading} className='btn btn-success w-100 mt-4 fw-bold  rounded-5 btn-lg '>{Loading ? <i className='fa fa-spin fa-spinner'></i> : "Verify"}</button>

      </form>
    </AuthComponent>  </>
}

export default Verify