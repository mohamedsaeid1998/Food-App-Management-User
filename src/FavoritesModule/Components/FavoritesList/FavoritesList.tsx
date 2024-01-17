import { AuthContext } from '@/Context/AuthContext'
import { ToastContext } from '@/Context/ToastContext'
import { Header, TableDetailsSec } from '@/SharedModule/Components'
import { NoImage5 } from '@/assets/images'
import { UseAuthenticatedQuery } from '@/utils'
import baseUrl from '@/utils/Custom/Custom'
import { useContext } from 'react'
import { Helmet } from 'react-helmet'
import { FaHeart } from 'react-icons/fa'

const FavoritesList = () => {

  const { headers } = useContext(AuthContext)
  const { getToastValue } = useContext(ToastContext)

  const { data: favList, refetch } = UseAuthenticatedQuery({
    queryKey: [`getFavorites`],
    url: `https://upskilling-egypt.com:443
/api/v1/userRecipe/?pageSize=10000&pageNumber=1`,
    config: {
      headers
    }
  })



  const RemoveFromFavorite = (id: number) => {
    return baseUrl.delete(`/api/v1/userRecipe/${id}`, {
      headers
    })
      .then(() => {
        if (getToastValue)
          getToastValue("success", "Recipe Deleted From FavoriteList Successfully")
        refetch()
      })
      .catch((err) => {
        if (getToastValue)
          getToastValue("error", err.response.data.message)
      })
  }




  return <>
    <Helmet>
      <title> Favorites • Food App</title>
    </Helmet>
    <Header title="Favorites" subTitle="Items" para="You can now add your items that any user can order it from" subPara="the Application and you can edit" />
    <TableDetailsSec />
    <div className="row mt-1 g-5">
      {favList?.data?.map((item: any) =>
        <div className=" col-sm-6 col-md-4 col-lg-3 mb-5">
          <div className="portCon shadow rounded-5">
            <div className="portImg rounded-5 ">
              <img src={item?.recipe?.imagePath === "" ? NoImage5 : `https://upskilling-egypt.com:443/` + item?.recipe?.imagePath} className="w-100   img" alt="this picture is not found" />
            </div>
            <div className="row pt-4 px-2">

              <div className="subInfo px-3 text-sm-start ps-sm-3 d-flex justify-content-around justify-content-md-between w-100 ">
                <span className='h5 text-truncate'>{item?.recipe?.name}</span>
                <span className='h5 text-nowrap'>{item?.recipe?.price + ` Eg`}</span>
              </div>

              <div className='d-flex justify-content-around justify-content-md-between align-items-center align-content-center px-3  pb-3'>
                <span className='text-truncate'>{item?.recipe?.description}</span>
                <button className="text-danger pointer delete pointer me-3" onClick={() => RemoveFromFavorite(item?.id)}>
                  <FaHeart size={20} />
                </button>
              </div>

            </div>
          </div>
        </div>
      )}

    </div>
  </>
}

export default FavoritesList