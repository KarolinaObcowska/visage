import { AiOutlineArrowDown } from 'react-icons/ai'
import { AiOutlineArrowUp } from 'react-icons/ai'

const FloatingButton = () => {
  const handleScrollToBottom = (e) => {
    e.preventDefault()
    window.scrollTo({ top: document.body.scrollHeight, behavior: 'smooth' })
  }
  const handleScrollToTop = (e) => {
    e.preventDefault()
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }
  return (
    <div className="fixed z-20 bottom-10 right-2 flex flex-col gap-2">
      <button className=" bg-secondary hover:bg-primary text-white p-3 rounded-full shadow-xl cursor-pointer" onClick={(e) => handleScrollToTop(e)}>
        <AiOutlineArrowUp className="" />
      </button>
      <button className=" bg-secondary hover:bg-primary text-white p-3 rounded-full shadow-xl cursor-pointer" onClick={(e) => handleScrollToBottom(e)}>
        <AiOutlineArrowDown className="" />
      </button>
    </div>
  )
}

export default FloatingButton
