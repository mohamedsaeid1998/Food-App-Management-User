
import { AuthContext } from '@/Context/AuthContext'
import { ToastContext } from '@/Context/ToastContext'
import { NoDataImg } from '@/assets/images'
import baseUrl from '@/utils/Custom/Custom'
import { useContext, useState } from 'react'
import { toast } from 'react-toastify'
interface IProps {
  location?: string
  handleClose: () => void
  itemId?: number
  refetch?: any
  role?: any
}



const NoData = ({ location, handleClose, itemId, refetch }: IProps) => {

  const { headers } = useContext(AuthContext)
  const { getToastValue } = useContext(ToastContext)
  const [Loading, setLoading] = useState(false)

  const deleteCategory = () => {
    setLoading(true)
    return baseUrl.delete(`/api/v1/Recipe/${itemId}`, {
      headers
    })
      .then(() => {
        if (getToastValue)
          getToastValue("success", `Recipe Deleted successfully`)
        handleClose()
        refetch()
      })
      .catch((err) => {
        if (getToastValue)
          getToastValue("error", err.response.data.message)
      }).finally(() => {
        setLoading(false)
      })
  }



  return <>
    <div className='text-center '>
      <img src={NoDataImg} alt="noData-img" />
      <h4 className='pt-1 mb-0'>{location === "recipes" ? "Delete This Item ?" : "No Data !"}</h4>
      {location === "recipes"? <div>
        <p className='mutedColor'>are you sure you want to delete this item ? if you are sure just <br /> click on delete it</p>
        <button onClick={deleteCategory} disabled={Loading} className=" btn btn-outline-danger">{Loading ? <i className='fa fa-spin fa-spinner'></i> : "Delete This Item"} </button>
      </div>
        : null}
    </div>
  </>
}

export default NoData