import React from 'react'
import LogoApp from '../assets/SolStru.svg'
import { Link } from 'react-router-dom'
import { BLOG_PAGE, FORMORDER_PAGE, HOME_PAGE, LOGIN_PAGE, LOKASI_PAGE, PESANAN_PAGE } from '../routes/routeConstant'
import { Button } from './ui/button'

const Navbar = () => {
  return (
    <nav className='bg-white flex md:justify-between gap-10 items-center rounded-3xl py-2 px-8'>
        <Link to={HOME_PAGE}>
            <div className='logo-app md:h-11 md:w-32 h-9 w-24'></div>
        </Link>
        <ul className='font-medium md:text-base overflow-x-auto text-sm flex md:gap-10 gap-5 items-center'>
            <li className='hover-text'><Link to={HOME_PAGE}>Home</Link></li>
            <li className='hover-text'><Link to={BLOG_PAGE}>Blog</Link></li>
            <li className='hover-text'><Link to={LOKASI_PAGE}>Lokasi</Link></li>
            <li className='hover-text'><Link to={PESANAN_PAGE}>Pemesanan</Link></li>
            <li>
              <Link to={LOGIN_PAGE} ><Button className="w-full" variant="outline">Masuk</Button></Link>
            </li>
        </ul>
    </nav>
  )
}

export default Navbar