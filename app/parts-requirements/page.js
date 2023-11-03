import Table from '@/components/Table/Table'
import * as fs from 'fs'
import * as XLSX from 'xlsx'

async function getData() {
  const excelData = fs.readFileSync('./public/products.xlsx', (err) => {
    if (err) {
      console.log(err.message)
      throw err
    }
    console.log('data written to file')
  })
  const workbook = XLSX.read(excelData, { type: 'buffer' })
  const sheetName = workbook.SheetNames[0]
  const sheet = workbook.Sheets[sheetName]
  const data = XLSX.utils.sheet_to_json(sheet)
  const groupedData = {}
  data.forEach((row) => {
    const group = row['Nazwa grupy']
    if (!groupedData[group]) {
      groupedData[group] = []
    }
    groupedData[group].push(row)
  })
  return groupedData
}

const PartsRequirements = async () => {
  const data = await getData()

  return (
    <div className="w-full h-full bg-base-100 py-10 px-12">
      <Table data={data} />
    </div>
  )
}

export default PartsRequirements
