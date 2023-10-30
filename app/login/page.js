'use client'

import { useRouter } from 'next/navigation'

const Login = () => {
  const router = useRouter()

  const handleLoginClick = () => {
    router.push('/parts-requirements')
  }
  return (
    <div className="w-full h-screen flex justify-center items-center bg-base-200">
      <div className="card w-96 bg-base-100 shadow-xl h-fit">
        <div className="card-body">
          <h2 className="text-md text-center uppercase font-bold mb-3 ">Logowanie</h2>
          <input type="text" placeholder="E-mail" className="input input-bordered w-full max-w-xs" />
          <input type="text" placeholder="Hasło" className="input input-bordered w-full max-w-xs" />

          <div className="card-actions justify-center mt-3">
            <button className="btn btn-primary w-full" onClick={handleLoginClick}>
              Zaloguj
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Login
