

import { ToastContext } from '@/Context/ToastContext'
import { IFormValues } from '@/Interfaces'
import { AuthComponent, ConfirmPassInput, EmailInput, PasswordInput } from '@/SharedModule/Components'
import { RegisterPhoto } from '@/assets/images'
import baseUrl from '@/utils/Custom/Custom'
import { useContext, useState } from 'react'
import { Helmet } from 'react-helmet'
import { useForm } from 'react-hook-form'
import { Link, useNavigate, } from 'react-router-dom'
import './Register.module.scss'

const Register = () => {
  const required = "This Field is required"
  const navigate = useNavigate()

  const { getToastValue } = useContext(ToastContext)

  const { register, handleSubmit, formState: { errors }, getValues } = useForm<IFormValues>()
  const [Loading, setLoading] = useState(false)

  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const catchSelectedImage = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event?.target?.files?.[0];

    if (file)
      setSelectedImage(URL.createObjectURL(file));
  }

  const submitLogin = (data: IFormValues) => {


    setLoading(true)
    // @ts-ignore
    return baseUrl.post(`/api/v1/Users/Register`, { ...data, recipeImage: data.profileImage[0] },)
      .then(() => {
        if (getToastValue)
          getToastValue("success", "Registration completed successfully")
        navigate('/verify')
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
      <title> Sign up • Food App</title>
    </Helmet>
    <AuthComponent >
      <form onSubmit={handleSubmit(submitLogin)}>


        <div className='d-flex justify-content-center'>
          <label id="imageCircle" htmlFor="imageInput">

            <img className='rounded-circle' src={selectedImage ? selectedImage : RegisterPhoto} alt="Preview Image" width={80} height={80} />
            <input className="form-lable" {...register("profileImage", {
            })} type="file" id="imageInput" onChange={catchSelectedImage} placeholder="add Image" />
          </label>

        </div>


        <div className="row align-items-center mt-3">
          <div className="col-md-6 ">

            <div className='input-con '>
              <div className=' d-flex  gap-2  '>
                <i className="fa-solid fa-mobile-screen pe-2"></i>
                <input
                  className=' form-control w-100'
                  type="text"
                  placeholder='Enter your Name'

                  {...register("userName", {
                    required,
                    pattern: {
                      value: /^[a-zA-Z]+[0-9]+$/,
                      message: "Name must have char & end with numbers without spaces"
                    }
                  })}
                />
              </div>

            </div>
            {errors?.userName ? <span className='text-danger small my-2'>{errors?.userName?.message}</span> : null}


            <div className='input-con '>
              <div className=' d-flex gap-2  '>

                <i className="fa-solid fa-mobile-screen pe-2"></i>
                <input
                  className=' form-control w-100'
                  type="text"
                  placeholder='Enter your Country'

                  {...register("country", {
                    required,
                  })}
                />
              </div>
            </div>
            {errors?.country ? <span className='text-danger small my-2'>{errors?.country?.message}</span> : null}

            <PasswordInput inputName='password' placeholder='Enter your password' {...{ errors, register }} />

          </div>

          <div className="col-md-6 ">

            <EmailInput inputName='email' {...{ errors, register }} />

            <div className='input-con '>
              <div className=' d-flex gap-2  '>
                <i className="fa-solid fa-mobile-screen pe-2"></i>
                <input
                  className=' form-control w-100'
                  type="tel"
                  placeholder='Enter your phone number'

                  {...register("phoneNumber", {
                    required,
                    validate: value => (value !== undefined && +value > 0) || "Please enter a positive number"
                  })}
                />
              </div>
            </div>
            {errors?.phoneNumber ? <span className='text-danger small my-2'>{errors?.phoneNumber?.message}</span> : null}


            <ConfirmPassInput inputName={'confirmPassword'} placeholder='Confirm New Password' {...{ errors, register, getValues }} />
          </div>
        </div>



        <div className=' mt-2 text-end'>
          <Link to={'/'} className='forget'>Login Now ?</Link>
        </div>
        <div className='text-center'>
          <button type='submit' disabled={Loading} className='  btn btn-success w-100 mt-4 fw-bold  rounded-5 btn-lg '>{Loading ? <i className='fa fa-spin fa-spinner'></i> : "registration"}</button>
        </div>

      </form>
    </AuthComponent>
  </>
}

export default Register