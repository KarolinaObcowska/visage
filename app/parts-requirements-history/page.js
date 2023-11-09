'use client'
import Loader from '@/components/Loader/Loader'
import { useSession } from 'next-auth/react'
import React, { useEffect, useState } from 'react'
import { BsChevronDown } from 'react-icons/bs'
import * as XLSX from 'xlsx'

function formatDate(d) {
  const date = new Date(d)
  const day = String(date.getDate()).padStart(2, '0')
  const month = String(date.getMonth() + 1).padStart(2, '0')
  const year = date.getFullYear()

  return `${day}-${month}-${year}`
}

const Page = () => {
  const [orders, setOrders] = useState([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(false)
  const session = useSession()

  const [expandedGroups, setExpandedGroups] = useState([])
  const expandRow = (e, group) => {
    e.preventDefault()
    if (expandedGroups.includes(group)) {
      setExpandedGroups(expandedGroups.filter((g) => g !== group))
    } else {
      setExpandedGroups([...expandedGroups, group])
    }
  }

  const fetchOrders = async () => {
    setLoading(true)
    try {
      const res = await fetch(`/api/parts-requirements-history`)
      const data = await res.json()

      const users = await fetch(`/api/get-users`)
      const user = await users.json()

      const orders = data.orders.map((order) => ({
        ...order,
        createdBy: user?.users?.find((u) => u.id === order.id).email,
      }))
      setOrders([...orders])
    } catch (error) {
      setError(error.message)
    }

    setLoading(false)
  }

  useEffect(() => {
    fetchOrders()
  }, [])

  const downloadExcel = async (data) => {
    const exceldata = data.orderItems.map((item) => ({
      monter: data.createdBy,
      'nr zamówienia': data.order_id,
      powód: item.notes,
      data: formatDate(data.order_date),
      indeks: item.product_id,
      'nazwa indeksu': item.product_name,
      JM: item.jm,
      Ilość: item.quantity,
    }))
    const worksheet = XLSX.utils.json_to_sheet(exceldata)
    const workbook = XLSX.utils.book_new()
    XLSX.utils.book_append_sheet(workbook, worksheet, 'Sheet1')
    XLSX.writeFile(workbook, 'Zamówienie.xlsx')
  }

  return (
    <div>
      <h2 className="block md:hidden font-bold text-gray-500 text-lg pb-6">Historia zamówień</h2>
      {loading && <Loader />}
      {error && <p>{error}</p>}
      <div className="relative overflow-x-auto shadow-md ">
        {!loading && !error && (
          <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400 max-w-full overflow-hidden">
            <thead className="text-xs text-base-100 uppercase bg-primary w-full">
              <tr>
                <th scope="col" className="px-6 py-4 text-left w-1/6">
                  ID
                </th>
                <th scope="col" className="px-6 py-4 w-1/6">
                  Data
                </th>

                <th scope="col" className="px-6 py-4 w-1/6">
                  Ilość
                </th>
                <th scope="col" className="px-6 py-4 w-1/6">
                  Utworzył
                </th>
                <th scope="col" colSpan={2} className="px-6 py-4 "></th>
                <th scope="col" className="px-6 py-4 text-right w-1/6">
                  <span className="sr-only">Pobierz</span>
                </th>

                <th scope="col" className="px-6 py-4 text-right w-1/6">
                  <span className="sr-only">Rozwiń</span>
                </th>
              </tr>
            </thead>
            {orders.length > 0 ? (
              orders?.map((el) => (
                <tbody key={el.order_id} className="w-full bg-white max-w-full overflow-hidden">
                  <tr className={`cursor-pointer bg-white border-b font-medium ${expandedGroups.includes(el.order_id) && ` text-secondary`}`}>
                    <td scope="row" className="px-6 py-4 w-10 font-medium  whitespace-nowrap text-md ">
                      {el.order_id}
                    </td>
                    <td className="px-6 py-4 w-24">{formatDate(el.order_date)}</td>

                    <td className="px-6 py-4 w-24">{el.orderItems.length ?? 0}</td>
                    <td className="px-6 py-4 w-24">{el.createdBy}</td>

                    <td className="px-6 py-4 text-right w-full">
                      <button className="font-medium  hover:underline text-secondary" onClick={(e) => downloadExcel(el)}>
                        Pobierz
                      </button>
                    </td>
                    <td />
                    <td />
                    <td scope="col" className="px-6 py-5  w-20 flex items-center justify-end cursor-pointer" onClick={(e) => expandRow(e, el.order_id)}>
                      <BsChevronDown className={expandedGroups.includes(el.order_id) && `rotate-180 text-secondary`} />
                    </td>
                  </tr>
                  {expandedGroups.includes(el.order_id) &&
                    el?.orderItems?.map((item) => (
                      <tr
                        className="bg-base-200 text-gray-600 border-t-2 border-r border-l border-base-100 z-1 
                  "
                        key={item.order_item_id}
                      >
                        <td className=" w-10 px-6 font-medium text-gray-900 whitespace-nowrap ">{item.product_id}</td>
                        <td colSpan={1} className=" w-24 px-6">
                          {item.product_name}
                        </td>

                        <td className="px-6  py-2 w-24 text-left">{item.quantity}</td>
                        <td colSpan={3} className="w-full px-6 text-left">
                          Uwagi: {item.notes}
                        </td>
                        <td className="px-6 py-4 w-1/8 text-left">{item.jm}</td>
                        <td />
                      </tr>
                    ))}
                </tbody>
              ))
            ) : (
              <tbody>
                <tr>
                  <td colSpan={6} className="py-6 px-2 text-lg w-full font-bold text-center">
                    Brak zamówień powiązanych z kontem.
                  </td>
                </tr>
              </tbody>
            )}
          </table>
        )}
      </div>
    </div>
  )
}

export default Page
