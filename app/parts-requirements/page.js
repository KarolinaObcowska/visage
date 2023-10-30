import Table from '@/components/Table/Table'

const PartsRequirements = () => {
  return (
    <div className="w-full h-full bg-base-100 py-10 px-12">
      <Table />
      <div className="w-full flex justify-end my-6">
        <button className="btn btn-success">Wyślij</button>
      </div>
    </div>
  )
}

export default PartsRequirements
