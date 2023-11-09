'use client'
import Loader from '@/components/Loader/Loader'
import Table from '@/components/Table/Table'
import { useEffect, useState } from 'react'

const PartsRequirements = () => {
  const [file, setFile] = useState(null)
  const [loading, setLoading] = useState(false)

  const fetchExcel = async () => {
    setLoading(true)
    const res = await fetch('/api/read-file')
    const data = await res.json()
    const convertedFile = await convertData(data.file.content)
    setFile(convertedFile)
    setLoading(false)
  }

  const convertData = async (data) => {
    const convertedData = {}

    for (const key in data) {
      const value = data[key]
      const groupName = value['Nazwa grupy']

      if (!convertedData[groupName]) {
        convertedData[groupName] = []
      }

      convertedData[groupName].push(value)
    }
    return convertedData
  }

  useEffect(() => {
    fetchExcel()
  }, [])

  return <div className="w-full h-full bg-base-100 ">{loading && !file ? <Loader /> : <Table data={file} />}</div>
}

export default PartsRequirements
