'use client'
import { useSession } from 'next-auth/react'
import { signOut } from 'next-auth/react'
import { useRouter, usePathname } from 'next/navigation'
import { RxAvatar } from 'react-icons/rx'
import { BsChevronDown } from 'react-icons/bs'
import { FiLogOut } from 'react-icons/fi'
import { MdOutlineCreate } from 'react-icons/md'
import { FaRegListAlt } from 'react-icons/fa'
import { AiOutlineSetting } from 'react-icons/ai'
import { RiLockPasswordFill } from 'react-icons/ri'
import Loader from '../Loader/Loader'

const Navbar = () => {
  const session = useSession()
  const router = useRouter()
  const pathname = usePathname()

  if (session.status === 'unauthenticated') return router.push('/')
  if (session.status === 'loading')
    return (
      <div className="fixed top-0 left-0 h-screen w-screen z-100 flex items-center justify-center bg-base-100" style={{ zIndex: 999 }}>
        <Loader />
      </div>
    )

  if (session.status === 'authenticated')
    return (
      <div className="navbar bg-black p-0 z-19">
        <div className="flex-1">
          <a className="btn btn-ghost normal-case text-xl">
            <img src="/img/logo.jpg" className="w-52" />
          </a>
        </div>
        <div className="flex items-center gap-10 mr-5 hidden md:flex ">
          <button
            className={`p-1 text-white tracking-wider flex items-center gap-2 ${pathname === '/parts-requirements' && 'text-primary border-b border-primary'}`}
            onClick={() => router.push('/parts-requirements')}
          >
            <MdOutlineCreate />
            Nowe zamówienie
          </button>

          <button
            className={`p-1 text-white tracking-wider flex items-center gap-2 ${pathname === '/parts-requirements-history' && 'text-primary border-b border-primary'}`}
            onClick={() => router.push('/parts-requirements-history')}
          >
            <FaRegListAlt />
            Historia zamówień
          </button>
          {session.data.user.role === 'admin' && (
            <button className={`p-1 text-white tracking-wider flex items-center gap-2 ${pathname === '/settings' && 'text-primary border-b border-primary'}`} onClick={() => router.push('/settings')}>
              <AiOutlineSetting className="w-5 h-5" />
              Ustawienia
            </button>
          )}
          <button
            className={`p-1 text-white tracking-wider flex items-center gap-2 ${pathname === '/change-password' && 'text-primary border-b border-primary'}`}
            onClick={() => router.push('/change-password')}
          >
            <RiLockPasswordFill className="w-5 h-5" />
            Zmień hasło
          </button>
        </div>
        <div className=" h-full">
          <div className="dropdown dropdown-end border-l border-gray-800 ">
            <label tabIndex={0} className="btn btn-ghost ">
              <div className=" text-primary  h-full flex ">
                <div className="text-white text-center flex items-center justify-center gap-2  text-md">
                  <RxAvatar className="w-6 h-6" />
                  <BsChevronDown />
                </div>
              </div>
            </label>
            <ul tabIndex={0} className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow-lg bg-base-100 rounded-box w-52 ">
              <li className="block md:hidden py-1">
                <button className={`p-1 w-full tracking-wider ${pathname === '/parts-requirements' && 'text-primary '}`} onClick={() => router.push('/parts-requirements')}>
                  <MdOutlineCreate />
                  Nowe zamówienie
                </button>
              </li>
              <li className="block md:hidden py-1 ">
                <button className={`p-1 w-full  tracking-wider ${pathname === '/parts-requirements-history' && 'text-primary '}`} onClick={() => router.push('/parts-requirements-history')}>
                  <FaRegListAlt />
                  Historia zamówień
                </button>
              </li>
              {session.data.user.role === 'admin' && (
                <li className="block md:hidden py-1 ">
                  <button className={`p-1 w-full  tracking-wider ${pathname === '/settings' && 'text-primary '}`} onClick={() => router.push('/settings')}>
                    <AiOutlineSetting />
                    Ustawienia
                  </button>
                </li>
              )}
              <li className="block md:hidden py-1 mb-1">
                <button className={`p-1 w-full  tracking-wider ${pathname === '/change-password' && 'text-primary '}`} onClick={() => router.push('/change-password')}>
                  <RiLockPasswordFill />
                  Zmień hasło
                </button>
              </li>
              <li className="border-t border-primary pt-2 pb-2 md:border-t-0 md:p-0 ">
                <button onClick={signOut} className="p-1 flex items-center  gap-2">
                  <FiLogOut className=" w-4 h-4" />
                  Logout
                </button>
              </li>
            </ul>
          </div>
        </div>
      </div>
    )
}

export default Navbar
