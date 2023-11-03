'use client'
import { BsChevronDown } from 'react-icons/bs'
import { useState } from 'react'
import { useForm } from 'react-hook-form'

const Table = ({ data, handleCreateOrder }) => {
  const [expandedGroups, setExpandedGroups] = useState([])

  const { register, handleSubmit } = useForm()

  const expandRow = (e, group) => {
    e.preventDefault()
    if (expandedGroups.includes(group)) {
      setExpandedGroups(expandedGroups.filter((g) => g !== group))
    } else {
      setExpandedGroups([...expandedGroups, group])
    }
  }

  const submitForm = async (data) => {
    handleCreateOrder(data)
    console.log(data)
  }
  return (
    <div>
      <form class="relative  flex flex-col items-center " onSubmit={handleSubmit(submitForm)}>
        <div className="w-3/4">
          <table class="w-full text-sm text-center text-gray-500 text-gray-400">
            <thead class="text-xs text-base-100 uppercase bg-primary w-full ">
              <tr>
                <th scope="col" class="px-6 py-4 w-1/4">
                  Indeks
                </th>
                <th scope="col" class="px-6 py-4 w-1/4">
                  Opis towaru
                </th>
                <th scope="col" class="px-6 py-4 w-1/4">
                  Jednostka miary
                </th>
                <th scope="col" class="px-6 py-4 w-1/8">
                  Ilość
                </th>
              </tr>
            </thead>
            {Object.keys(data).map(
              (group) =>
                group !== 'undefined' && (
                  <tbody key={group} className="w-full bg-white">
                    <tr colSpan={4} className=" border border-white z-2" key={group}>
                      <th colSpan={4} onClick={(e) => expandRow(e, group)} class="bg-white px-6 py-4 border-b cursor-pointer text-left">
                        <p className="flex items-center gap-6">
                          <p className={expandedGroups.includes(group) && ` text-secondary`}>{group}</p>
                          <BsChevronDown className={expandedGroups.includes(group) && `rotate-180 text-secondary`} />
                        </p>
                      </th>
                    </tr>

                    {expandedGroups.includes(group) &&
                      data[group].map((el) => (
                        <tr key={el} className="bg-base-200 text-gray-600 border-t-2 border-r border-l border-base-100 z-1">
                          <td className="w-1/4">{el.Indeks}</td>
                          <td className="w-1/4">{el['Opis towaru']}</td>
                          <td className="w-1/4">{el['JM']}</td>
                          <td class="px-6 py-2 w-1/8">
                            <input className="input input-bordered h-8 w-32 bg-red" type="number" defaultValue={0} {...register(el.Indeks)} />
                          </td>
                        </tr>
                      ))}
                  </tbody>
                )
            )}
          </table>
        </div>
        <div className="w-full flex justify-end my-6">
          <button className="btn btn-success" type="submit">
            Wyślij
          </button>
        </div>
      </form>
    </div>
  )
}

export default Table
