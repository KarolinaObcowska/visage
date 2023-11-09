'use client'
import { useRouter } from 'next/navigation'
import { signIn } from 'next-auth/react'
import Loader from '@/components/Loader/Loader'
import { useState } from 'react'
import { BiSolidError } from 'react-icons/bi'
import toast from '@/components/Toast/Toast'
import 'react-toastify/dist/ReactToastify.css'
import { ToastContainer } from 'react-toastify'

const Login = () => {
  const [activeTab, setActiveTab] = useState('signIn')
  const router = useRouter()
  const [loading, setLoading] = useState(false)
  const [changePasswordLoading, setChangePasswordLoading] = useState(false)
  const [error, setError] = useState('')

  const handleLogin = async (e) => {
    setLoading(true)
    e.preventDefault()

    const callback = await signIn('credentials', {
      redirect: false,
      email: e.currentTarget.email.value,
      password: e.currentTarget.password.value,
    })
    if (callback.error) {
      setError(callback.error)
      setLoading(false)
    } else {
      router.push('/parts-requirements')
    }
  }

  const handleCreatePassword = async (e) => {
    e.preventDefault()
    setChangePasswordLoading(true)
    try {
      const data = { email: e.currentTarget.email.value, password: e.currentTarget.password.value }
      const res = await fetch('/api/auth/sign-up', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      })
      const response = await res.json()
      toast({ type: 'success', message: response.message })
      setActiveTab('signIn')
    } catch (error) {
      toast({ type: 'error', message: response.message })
    }
    setChangePasswordLoading(false)
  }
  return (
    <div className="w-full h-screen flex justify-center items-center bg-base-200">
      <ToastContainer position="top-center" autoClose={8000} hideProgressBar={false} newestOnTop={false} draggable={false} pauseOnVisibilityChange closeOnClick pauseOnHover />

      <div style={{ width: 300 }} className=" w-fit  bg-base-100 shadow-xl h-fit rounded-md overflow-hidden">
        <div className="flex w-full justify-center items-center border-b border-base-150">
          <div
            onClick={() => setActiveTab('signIn')}
            className={`${activeTab === 'signIn' ? 'text-primary  font-bold' : 'shadow-inner opacity-50 font-light'} w-1/2 py-4 flex bg-base-100 uppercase cursor-pointer justify-center items-center`}
          >
            Logowanie
          </div>
          <div
            onClick={() => setActiveTab('signUp')}
            className={`${
              activeTab === 'signUp' ? 'text-primary  font-bold' : 'shadow-inner opacity-50  font-medium font-light'
            } w-1/2 py-4 flex bg-base-100  uppercase  cursor-pointer justify-center border-l items-center`}
          >
            Rejestracja
          </div>
        </div>

        {activeTab === 'signIn' && (
          <form className="card-body mt-4 px-8" onSubmit={(e) => handleLogin(e)}>
            <input type="text" name="email" id="email" placeholder="E-mail" className="input input-bordered w-full max-w-xs" />
            <input type="password" name="password" id="password" placeholder="Hasło" className="input input-bordered w-full max-w-xs" />
            <div className="card-actions justify-center items-center mt-3">
              {loading ? (
                <Loader small />
              ) : (
                <button className="btn btn-primary w-full" type="submit">
                  Zaloguj
                </button>
              )}
              {error && !loading && (
                <p className="flex  items-center gap-2  font-bold py-2 text-sm text-primary">
                  <BiSolidError />
                  {error}
                </p>
              )}
            </div>
          </form>
        )}
        {activeTab === 'signUp' && (
          <form className="card-body mt-2" onSubmit={(e) => handleCreatePassword(e)}>
            <input type="text" name="email" id="email" placeholder="E-mail" className="input input-bordered w-full max-w-xs" />
            <input type="password" name="password" id="password" placeholder="Hasło" className="input input-bordered w-full max-w-xs" />
            <input type="password" name="confirmPassword" id="confirmPassword" placeholder="Potwierdź hasło" className="input input-bordered w-full max-w-xs" />

            <div className="card-actions justify-center items-center mt-3">
              {changePasswordLoading ? (
                <Loader small />
              ) : (
                <button className="btn btn-primary w-full" type="submit">
                  Zarejestruj się
                </button>
              )}
            </div>
          </form>
        )}
      </div>
    </div>
  )
}

export default Login
