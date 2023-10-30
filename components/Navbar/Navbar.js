import Link from 'next/link'

const Navbar = () => {
  return (
    <div className="navbar bg-black">
      <div className="flex-1">
        <a className="btn btn-ghost normal-case text-xl">
          <img src="/img/logo.jpg" className="w-52" />
        </a>
      </div>
      <div className="flex-none">
        <div className="dropdown dropdown-end">
          <label tabIndex={0} className="btn btn-ghost btn-circle avatar">
            <div className="w-10 h-10 rounded-full bg-primary ">
              <div className="text-white text-center flex items-center justify-center w-full h-full text-lg">K</div>
            </div>
          </label>
          <ul tabIndex={0} className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52">
            <li>
              <Link href="/login">Logout</Link>
            </li>
          </ul>
        </div>
      </div>
    </div>
  )
}

export default Navbar
