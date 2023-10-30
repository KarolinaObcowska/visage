import React from 'react'

const Table = () => {
  return (
    <div>
      <div class="relative overflow-x-auto shadow-md ">
        <table class="w-full text-sm text-center text-gray-500 dark:text-gray-400">
          <thead class="text-xs text-base-100 uppercase bg-primary ">
            <tr>
              <th scope="col" class="px-6 py-4">
                Zdjęcie
              </th>
              <th scope="col" class="px-6 py-4">
                Nazwa
              </th>
              <th scope="col" class="px-6 py-4">
                Kod
              </th>
              <th scope="col" class="px-6 py-4">
                Kod
              </th>
              <th scope="col" class="px-6 py-4">
                Ilość
              </th>
            </tr>
          </thead>
          <tbody>
            <tr class="bg-white border-b">
              <td class="px-6 py-4 bg-white font-medium text-gray-900 whitespace-nowrap dark:text-white flex items-center justify-center">
                <img src="/img/example.jpg" className="w-16" />
              </td>
              <td class="px-6 py-4">Test</td>
              <td class="px-6 py-4">123456</td>
              <td class="px-6 py-4">123456</td>

              <td class="px-6 py-4">
                <input className="input input-bordered h-10 bg-white" type="number" />
              </td>
            </tr>
            <tr class="bg-white border-b   ">
              <td scope="row" class="px-6 py-4 bg-white font-medium text-gray-900 whitespace-nowrap dark:text-white flex items-center justify-center">
                <img src="/img/example.jpg" className="w-16" />
              </td>
              <td class="px-6 py-4">Test</td>
              <td class="px-6 py-4">123456</td>
              <td class="px-6 py-4">123456</td>

              <td class="px-6 py-4">
                <input className="input input-bordered h-10 bg-white" type="number" />
              </td>
            </tr>
            <tr class="bg-white border-b  ">
              <td scope="row" class="px-6 py-4 bg-white font-medium text-gray-900 whitespace-nowrap dark:text-white flex items-center justify-center">
                <img src="/img/example.jpg" className="w-16" />
              </td>
              <td class="px-6 py-4">Test</td>
              <td class="px-6 py-4">123456</td>
              <td class="px-6 py-4">123456</td>

              <td class="px-6 py-4">
                <input className="input input-bordered h-10 bg-white" type="number" />
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  )
}

export default Table
