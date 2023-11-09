'use client'
import { BsChevronDown } from 'react-icons/bs'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { useSession } from 'next-auth/react'
import Loader from '../Loader/Loader'
import toast from '../Toast/Toast'
import 'react-toastify/dist/ReactToastify.css'
import FloatingButton from '../FloatingButton/FloatingButton'
import Image from 'next/image'
import { ToastContainer } from 'react-toastify'

const Table = ({ data }) => {
  const [expandedGroups, setExpandedGroups] = useState([])
  const session = useSession()
  const { register, handleSubmit } = useForm()
  const [loading, setLoading] = useState(false)

  const createOrder = async (items) => {
    setLoading(true)
    const data = JSON.stringify({
      id: session.data.user.email,
      order_date: new Date(),
      orderItems: [...items],
    })
    try {
      const res = await fetch('/api/parts-requirements', {
        method: 'POST',
        headers: {
          'content-typ': 'application/json',
        },
        body: data,
      })
      toast({ type: 'success', message: 'Dodano zamówienie' })
      setLoading(false)
    } catch (error) {
      toast({ type: 'error', message: error.message })
      setLoading(false)
    }
  }

  const expandRow = (e, group) => {
    e.preventDefault()
    if (expandedGroups.includes(group)) {
      setExpandedGroups(expandedGroups.filter((g) => g !== group))
    } else {
      setExpandedGroups([...expandedGroups, group])
    }
  }

  const submitForm = async (data) => {
    const items = Object.keys(data.items)
    const notEmptyItems = items.map((item) => {
      if (data.items[item].params) {
        return data.items[item]
      } else return
    })

    let formatedData = notEmptyItems.filter((el) => el !== undefined)
    formatedData.map((el) => (el.params = JSON.parse(el.params)))

    const finalData = formatedData.map((el) => ({ quantity: Number(el.quantity), notes: el.notes, product_id: el.params.Indeks, product_name: el.params['Opis towaru'], jm: el.params['JM'] ?? '-' }))
    await createOrder(finalData)
  }
  return (
    <>
      <FloatingButton />
      <ToastContainer position="top-center" autoClose={8000} hideProgressBar={false} newestOnTop={false} draggable={false} pauseOnVisibilityChange closeOnClick pauseOnHover />
      <form className="relative overflow-x-auto w-full " onSubmit={handleSubmit(submitForm)}>
        <h2 className="block md:hidden font-bold text-gray-500 text-lg pb-6">Nowe zamówienie</h2>
        <div className="w-full">
          <table className="w-full text-sm text-center text-gray-500 text-gray-400">
            <thead className="text-xs text-base-100 uppercase bg-primary w-full text-xs md:text-sm ">
              <tr>
                <th scope="col" className="px-6 py-4 w-1/8 text-left">
                  Indeks
                </th>
                <th scope="col" className="px-6 py-4 w-1/8 text-left">
                  Zdjęcie
                </th>
                <th scope="col" className="px-6 py-4 w-1/6">
                  Opis towaru
                </th>
                <th scope="col" className="px-6 py-4 w-1/8">
                  Jednostka miary
                </th>
                <th scope="col" className="px-6 py-4 w-1/6">
                  Ilość
                </th>
                <th scope="col" className="px-6 py-4 w-1/3">
                  Uwagi
                </th>
              </tr>
            </thead>
            {Object.keys(data ?? {})?.map(
              (group) =>
                group !== 'undefined' && (
                  <tbody key={group} className="w-full bg-white text-xs md:text-sm">
                    <tr className=" border border-white z-2 " key={group}>
                      <th colSpan={6} onClick={(e) => expandRow(e, group)} className="bg-white px-6 py-4 border-b cursor-pointer text-left">
                        <p className="flex items-center gap-6">
                          <p className={expandedGroups.includes(group) && ` text-secondary`}>{group}</p>
                          <p className="text-xs text-primary">({data[group].length})</p>
                          <BsChevronDown className={expandedGroups.includes(group) && `rotate-180 text-secondary`} />
                        </p>
                      </th>
                    </tr>

                    {expandedGroups.includes(group) &&
                      data[group].map((el, idx) => (
                        <tr key={el.Indeks} className="bg-base-200  text-gray-600 border-t-2 border-r-0 border-l-0 border-white z-1">
                          <td className="w-1/6 px-6 text-left ">
                            <div className="flex items-center gap-2 ">
                              <input type="checkbox" defaultChecked={false} className="w-5 h-5 bg-white text-primary" value={JSON.stringify(el)} {...register(`items[${el.Indeks}].params`)} />
                              {el.Indeks}
                            </div>
                          </td>
                          <td className="w-1/8 flex py-2 items-center justify-center">
                            <Image src="/img/image-placeholder.jpg" alt="image placeholder" width={60} height={50} />
                          </td>
                          <td className="w-1/6">{el['Opis towaru']}</td>
                          <td className="w-1/8">{el['JM']}</td>
                          <td className="px-6 py-2 w-1/6">
                            <input className="input input-bordered h-10 w-20 md:w-32 bg-red" type="number" defaultValue={0} {...register(`items[${el.Indeks}].quantity`)} />
                          </td>
                          <td className="px-6 py-2 w-1/3">
                            <input className="input input-bordered h-10 w-20 w-full bg-red text-sm" placeholder="Powód zapotrzebowania" type="text" {...register(`items[${el.Indeks}].notes`)} />
                          </td>
                        </tr>
                      ))}
                  </tbody>
                )
            )}
          </table>
        </div>
        <div className="w-full flex justify-center my-6">
          {loading ? (
            <Loader small />
          ) : (
            <button className="btn btn-success" type="submit">
              Wyślij zamówienie
            </button>
          )}
        </div>
      </form>
    </>
  )
}

export default Table
