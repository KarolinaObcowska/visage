'use client'
import { AiOutlineUserAdd } from 'react-icons/ai'
import { RiCloseFill } from 'react-icons/ri'
import { useEffect, useState } from 'react'
import toast from '@/components/Toast/Toast'
import 'react-toastify/dist/ReactToastify.css'
import Loader from '@/components/Loader/Loader'
import { ToastContainer } from 'react-toastify'
import * as XLSX from 'xlsx'
const Settings = () => {
  const [email, setEmail] = useState({
    email: '',
    password: '',
    firstLogin: true,
    role: 'user',
  })

  const [file, setFile] = useState(null)
  const [users, setUsers] = useState([])
  const [loading, setLoading] = useState(false)
  const [emails, setEmails] = useState([])

  const getUsers = async () => {
    const res = await fetch('/api/get-users')
    const data = await res.json()
    setUsers(data.users)
  }

  useEffect(() => {
    getUsers()
  }, [])

  const handleCreateUser = async (e) => {
    e.preventDefault()
    setLoading(true)
    if (!emails.length) {
      toast({ type: 'warning', message: 'Podaj adres email użytkownika' })
      return
    }
    try {
      const res = await fetch('/api/create-user', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(emails),
      })
      const response = await res.json()
      if (response.status === 201) {
        toast({ type: 'success', message: 'Dodano użytkowników' })
      } else {
        toast({ type: 'info', message: response.message })
      }
      setEmails([])
      setLoading(false)
    } catch (error) {
      toast({ type: 'error', message: error.message })
      setLoading(false)
    }
  }
  const handleChangeEmail = (e) => {
    setEmail((prev) => ({
      ...prev,
      email: e.target.value,
    }))
  }

  const handleDeleteEmail = (e, index) => {
    e.preventDefault()
    const updatedEmails = [...emails]
    updatedEmails.splice(index, 1)
    setEmails(updatedEmails)
  }

  const handleKeyDown = (evt) => {
    if (evt.code === 'Space') {
      evt.preventDefault()
      let email = evt.target.value.trim()
      if (email) {
        setEmails((prev) => [...prev, { email: email, password: '', firstLogin: true, role: 'user' }])
        setEmail({
          email: '',
          password: '',
          firstLogin: true,
          role: 'user',
        })
      }
    }
  }

  const readUploadFile = (e) => {
    e.preventDefault()
    if (e.target.files) {
      const reader = new FileReader()
      reader.onload = (e) => {
        const data = e.target.result
        const workbook = XLSX.read(data, { type: 'array' })
        const sheetName = workbook.SheetNames[0]
        const worksheet = workbook.Sheets[sheetName]
        const json = XLSX.utils.sheet_to_json(worksheet)
        setFile(json)
      }
      reader.readAsArrayBuffer(e.target.files[0])
    }
  }

  const saveFile = async (e) => {
    e.preventDefault()
    const res = await fetch('/api/save-file', {
      method: 'POST',
      body: JSON.stringify({ ...file }),
    })
    const response = await res.json()
    if (response.status === 201) {
      toast({ type: 'success', message: response.message })
    }
  }

  return (
    <div>
      <ToastContainer position="top-center" autoClose={8000} hideProgressBar={false} newestOnTop={false} draggable={false} pauseOnVisibilityChange closeOnClick pauseOnHover />
      <h3 className="text-lg font-medium text-primary border-b border-b-base-200 w-full py-4">Dodaj użytkowników</h3>
      <form className="my-4 mb-8 flex gap-5 flex flex-col w-full" onSubmit={(e) => handleCreateUser(e)}>
        <div className="flex flex-wrap gap-5">
          {emails?.map((el, idx) => (
            <div key={idx} className="text-md bg-primary py-2 px-3 rounded-md items-center flex gap-5 text-white">
              {el.email}
              <RiCloseFill className="h-13 w-13 text-white cursor-pointer" onClick={(e) => handleDeleteEmail(e, idx)} />
            </div>
          ))}
        </div>
        <div className="gap-2 flex">
          <input placeholder="Email" id="email" name="email" className="input h-12 bg-white input-bordered w-1/3" value={email.email} onChange={handleChangeEmail} onKeyDown={handleKeyDown} />
          {!loading && (
            <button type="submit" className="btn h-12 btn-success ">
              <AiOutlineUserAdd />
              Dodaj
            </button>
          )}
          {loading && <Loader small />}
        </div>
      </form>
      <h3 className="text-lg font-medium text-primary border-b border-b-base-200 w-full py-4">Aktualizuj listę produktów</h3>

      <form className="mt-6" onSubmit={(e) => saveFile(e)}>
        <input type="file" onChange={readUploadFile} />
        <button type="submit" className="btn btn-primary">
          Zapisz plik
        </button>
      </form>
      <h3 className="text-lg font-medium text-primary border-b border-b-base-200 w-full py-4 mt-10 mb-6">Aktualni użytkownicy</h3>
      <ul className="flex flex-col  w-1/2">
        {users?.map((el) => (
          <li key={el.email} className="border-b py-1">
            {el.email}
          </li>
        ))}
      </ul>
    </div>
  )
}

export default Settings
