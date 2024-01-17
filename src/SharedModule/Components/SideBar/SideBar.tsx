import { sideBarLogo } from '@/assets/images';
import { useState } from 'react';
import { BsColumnsGap } from "react-icons/bs";
import { FaRegHeart } from 'react-icons/fa';
import { FiLogOut } from "react-icons/fi";
import { IoIosUnlock } from "react-icons/io";
import { LiaHomeSolid } from "react-icons/lia";
import { Menu, MenuItem, Sidebar } from 'react-pro-sidebar';
import { Link, useLocation } from 'react-router-dom';
import { Modal } from 'react-bootstrap';
import { ChangePass } from '@/AuthModule/Components';
interface Props {
  logOut:() => void
  setSidebarOpen:(a:boolean) => void
  isSidebarOpen:boolean
}

const SideBar = ({logOut,isSidebarOpen,setSidebarOpen}:Props) => {
  const [iscollapsed, setIscollapsed] = useState(false)


  const { pathname } = useLocation()
  const handleToggle = () => {
    setIscollapsed(!iscollapsed)
    setSidebarOpen(!isSidebarOpen)

  }

  
  const [show, setShow] = useState(false)

  const showChangePassModal = () => {
    setShow(true)
  }

  const handleClose = () => {
    setShow(false)
  }



  return <>
    <div className='sidebar-container text-white'>
    <Modal show={show} onHide={handleClose}>
      <Modal.Body><ChangePass{...{handleClose}}/></Modal.Body>
    </Modal>
      <Sidebar   collapsed={iscollapsed}  className='h-100 side '>
        <Menu>
          <MenuItem data-aos="zoom-out" data-aos-delay="1000" className='my-4 logoImage'  onClick={() => handleToggle()} icon={<img src={sideBarLogo}  alt="logo" />} ></MenuItem>
          <MenuItem data-aos-delay="300" data-aos="fade-right"  className={`${pathname === "/dashboard" ? 'active' : null} link`} component={<Link to="/dashboard" />} icon={<LiaHomeSolid size={'25px'} />}>Home</MenuItem>
          <MenuItem data-aos-delay="500" data-aos="fade-right"  className={`${pathname === '/dashboard/recipes' ? 'active' : null} link`} component={<Link to='/dashboard/recipes' />} icon={<BsColumnsGap size={'25px'} />}>Recipes</MenuItem>
          <MenuItem data-aos-delay="600" data-aos="fade-right"  className={`${pathname === '/dashboard/favorites' ? 'active' : null} link`} component={<Link to='/dashboard/favorites' />} icon={<FaRegHeart size={'25px'} />}>Favorites</MenuItem>
          <MenuItem data-aos-delay="700" data-aos="fade-right" className='link' onClick={showChangePassModal} icon={<IoIosUnlock size={'25px'} />}> Change Password</MenuItem>
          <MenuItem data-aos-delay="800" data-aos="fade-right" className='link' icon={<FiLogOut size={'25px'} />} onClick={() => logOut()}>LogOut</MenuItem>
        </Menu>
      </Sidebar>
    </div>
  </>
}

export default SideBar
