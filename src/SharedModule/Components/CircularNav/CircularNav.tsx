import { BsColumnsGap } from 'react-icons/bs';
import { FaRegHeart } from "react-icons/fa";
import { FiLogOut } from 'react-icons/fi';
import { IoIosUnlock, IoMdClose } from 'react-icons/io';
import { LiaHomeSolid } from 'react-icons/lia';
import { MdOutlineMenu } from "react-icons/md";
import { Link, useNavigate } from 'react-router-dom';
import { Modal } from 'react-bootstrap';
import { ChangePass } from '@/AuthModule/Components';
import "./CircularNav.scss";

import { useState } from 'react';
const CircularNav = () => {

  const navigate = useNavigate()

  const logOut = () => {
    localStorage.removeItem('adminToken')
    navigate('/')
  }
  const [show, setShow] = useState(false)

  const showChangePassModal = () => {
    setShow(true)
  }

  const handleClose = () => {
    setShow(false)
  }

  return <>
    <Modal show={show} onHide={handleClose}>
      <Modal.Body><ChangePass{...{handleClose}}/></Modal.Body>
    </Modal>
    <div className='circularNav '>
      <div className="site">
        <div className="container">
      <nav className='navigation'>
        <input type="checkbox" id='link' hidden/>
        <label htmlFor="link" className='link'>
        <span className='menu'><MdOutlineMenu size={"35px"} /></span>
          <span className='close'><IoMdClose size={"35px"} /></span>
        </label>
        <ul className='submenu'>
          <li><Link to={'/dashboard'}><span>Home</span><LiaHomeSolid /></Link></li>
          <li><Link to={'/dashboard/recipes'}><span>Recipes</span><BsColumnsGap /></Link></li>
          <li><Link to={'/dashboard/favorites'}><span>Favorites</span><FaRegHeart /></Link></li>
          <li onClick={showChangePassModal} ><span >ChangePass</span><IoIosUnlock /> </li>
          <li onClick={() => logOut()}><span >LogOut</span><FiLogOut /></li>
        </ul>
      </nav>
      </div>
      </div>

    </div>

  </>
}

export default CircularNav