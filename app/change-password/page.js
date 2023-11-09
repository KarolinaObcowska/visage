'use client'
import Loader from '@/components/Loader/Loader'
import { ToastContainer } from 'react-toastify'
import { useState } from 'react'
import { BiSolidError } from 'react-icons/bi'
import { useSession } from 'next-auth/react'
import toast from '@/components/Toast/Toast'

const ChangePassword = () => {
  const [loading, setLoading] = useState(false)
  const [validationError, setValidationError] = useState('')
  const [data, setData] = useState({
    currentPassword: '',
    newPassword: '',
    newPasswordConfirmation: '',
  })

  const session = useSession()
  const validatePasswords = () => {
    if (data.newPassword !== data.newPasswordConfirmation) {
      setValidationError('Podane hasła nie są takie same')
      setLoading(false)
      return false
    }
    return true
  }

  const handleOnChange = (e) => {
    e.preventDefault()
    setValidationError('')
    const { id, value } = e.target
    setData((prev) => ({
      ...prev,
      [id]: value,
    }))
  }

  const handleChangePassword = async (e) => {
    e.preventDefault()
    setLoading(true)
    const isValid = validatePasswords()
    if (isValid) {
      const userData = {
        email: session.data.user.email,
        ...data,
      }
      const res = await fetch('/api/change-password', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(userData),
      })
      const response = await res.json()
      console.log(response)
      if (response.status === 200) {
        setLoading(false)
        toast({ type: 'success', message: response.message })
      } else {
        setLoading(false)
        toast({ type: 'error', message: response.message })
      }
    }
    setLoading(false)
  }

  return (
    <div>
      <ToastContainer position="top-center" autoClose={8000} hideProgressBar={false} newestOnTop={false} draggable={false} pauseOnVisibilityChange closeOnClick pauseOnHover />
      <h3 className="text-lg font-medium text-primary border-b border-b-base-200 w-full py-4">Zmień hasło</h3>
      <form className="my-4 mb-8 flex gap-5 flex  justify-center items-cetner  flex-col w-full" onSubmit={(e) => handleChangePassword(e)}>
        <div className="gap-2 flex flex-col w-full items-center sm:items-start">
          <input placeholder="Aktualne hasło" id="currentPassword" type="password" name="currentPassword" className="input h-12 bg-white input-bordered w-full  sm:w-1/3" onChange={handleOnChange} />
          <input
            placeholder="Nowe hasło"
            onChange={handleOnChange}
            type="password"
            id="newPassword"
            name="newPassword"
            className={`input h-12 bg-white input-bordered w-full sm:w-1/3 ${validationError && 'border-primary'}`}
          />
          <input
            placeholder="Potwierdź hasło"
            onChange={handleOnChange}
            type="password"
            id="newPasswordConfirmation"
            name="newPasswordConfirmation"
            className={`input h-12 bg-white input-bordered w-full sm:w-1/3 ${validationError && 'border-primary'}`}
          />
        </div>
        {validationError && (
          <p className="text-primary flex items-center gap-2 justify-center md:justify-start">
            <BiSolidError />
            {validationError}
          </p>
        )}
        {loading && !validationError && <Loader small />}
        {!loading && <button className="btn btn-primary w-full sm:w-fit">Zmień hasło</button>}
      </form>
    </div>
  )
}

export default ChangePassword
