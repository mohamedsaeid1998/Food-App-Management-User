import { AuthContext } from "@/Context/AuthContext";
import { Header, LoadingSpinner, NoData, TableDetailsSec } from "@/SharedModule/Components";
import { NoImage5 } from '@/assets/images';
import { UseAuthenticatedQuery } from "@/utils";
import { useContext, useEffect, useState } from "react";
import { FaEye } from "react-icons/fa6";
import { Modal } from 'react-bootstrap';
import baseUrl from "@/utils/Custom/Custom";
import moment from 'moment';
import { FaRegHeart, FaHeart } from 'react-icons/fa';
import { ToastContext } from "@/Context/ToastContext";
import { Helmet } from "react-helmet";


const RecipesList = () => {

  const { headers } = useContext(AuthContext)
  const { getToastValue } = useContext(ToastContext)

  //?  **********Get Tags**********//
  const { data: tags } = UseAuthenticatedQuery({
    queryKey: [`getTags`],
    url: `https://upskilling-egypt.com:443
/api/v1/tag`,
    config: {
      headers
    }
  })

  //?  **********Get categories**********//
  const { data: categories } = UseAuthenticatedQuery({
    queryKey: [`getCategories`],
    url: `https://upskilling-egypt.com:443
/api/v1/Category/`,
    config: {
      headers,
      params: {
        pageSize: 1000,
        pageNumber: 1
      }
    }
  })


  const [searchParams, setSearchParams] = useState({
    pageNumber: 1,
    name: "",
    tagId: undefined,
    categoryId: undefined,
  });
  const { data: tableData, refetch } = UseAuthenticatedQuery({
    queryKey: [`getRecipes`],
    url: `https://upskilling-egypt.com:443
/api/v1/Recipe/`,
    config: {
      headers,
      params: {
        pageSize: 7,
        pageNumber: searchParams.pageNumber,
        name: searchParams.name,
        tagId: searchParams.tagId,
        categoryId: searchParams.categoryId
      }
    }
  })
  useEffect(() => {

    refetch()
  }, [searchParams]);


  const getNameValue = (e: React.ChangeEvent<HTMLInputElement>) => {
    // setLoading(true)

    setSearchParams({
      ...searchParams,
      pageNumber: 1,
      name: e.target.value,
    });

  }

  const getTagValue = (e: React.ChangeEvent<HTMLSelectElement>) => {

    setSearchParams({
      ...searchParams,
      pageNumber: 1,
      tagId: +e.target.value,
    });
  }

  const getCategoryValue = (e: React.ChangeEvent<HTMLSelectElement>) => {

    setSearchParams({
      ...searchParams,
      pageNumber: 1,
      categoryId: +e.target.value,
    });
  }


  const [show, setShow] = useState(false)
  const [recipeData, setRecipeData] = useState(null)


  const recipeDetails = (id: number) => {

    return baseUrl.get(`/api/v1/Recipe/${id}`)
      .then((res) => {
        setRecipeData(res.data)
      })
  }



  const showChangePassModal = (id: number) => {
    recipeDetails(id)
    setShow(true)
  }

  const handleClose = () => {
    setShow(false)
  }

  const { data: favList, refetch: reFresh } = UseAuthenticatedQuery({
    queryKey: [`getFavorites`],
    url: `https://upskilling-egypt.com:443
/api/v1/userRecipe/?pageSize=10000&pageNumber=1`,
    config: {
      headers
    }
  })



  const AddToFavorite = (id: number) => {
    return baseUrl.post(`/api/v1/userRecipe`, {
      recipeId: id
    }, {
      headers
    })
      .then(() => {
        if (getToastValue)
          getToastValue("success", "Recipe Added to FavoriteList Successfully")
        reFresh()
      })
      .catch((err) => {
        if (getToastValue)
          getToastValue("error", err.response.data.message)
        reFresh()
      })
  }



  return <>
    <Helmet>
      <title> Recipes • Food App</title>
    </Helmet>
    <Modal show={show} onHide={handleClose}>
      <Modal.Body>
        <div>
          <h3>Recipe Details</h3>
          {!recipeData && <LoadingSpinner />}
          {recipeData && <div>
            <div className="d-flex justify-content-center align-items-center mb-2">
              <img className="w-50 h-50 rounded-4" src={recipeData?.imagePath === "" ? NoImage5 : `https://upskilling-egypt.com:443/` + recipeData?.imagePath} />
            </div>
            <h6 className="d-block text-success fw-bold">UserName: <span className="text-black">{recipeData?.name}</span></h6>
            <h6 className="d-block text-success fw-bold">Price: <span className="text-black"> {recipeData?.price}</span></h6>
            <h6 className="d-block text-success fw-bold">Description: <span className="text-black">{recipeData?.description}</span></h6>
            <h6 className="d-block text-success fw-bold">CreationDate: <span className="text-black">{moment(recipeData?.creationDate).format("Do MMM YY")}</span></h6>
            <h6 className="d-block text-success fw-bold">ModificationDate: <span className="text-black">{moment(recipeData?.modificationDate).format("Do MMM YY")}
            </span></h6>
          </div>



          }



        </div>


      </Modal.Body>
    </Modal>
    <Header title="Recipes" subTitle="Items" para="You can now add your items that any user can order it from" subPara="the Application and you can edit" />
    <TableDetailsSec />
    <div className="row d-flex align-items-center filtration my-2">
      <div className="col-md-5">
        <input onChange={getNameValue} value={searchParams.name} type="search" className='form-control my-2 ' placeholder=" Search By Recipe Name..." />
      </div>
      <div className="col-md-3">
        <select onChange={getTagValue} value={searchParams.tagId} className="form-select "  >
          <option value={0} className="text-muted">Select Tag</option>
          {tags?.map((tag: any) =>
            <option key={tag.id} value={tag.id}>{tag.name}</option>

          )}
        </select>
      </div>
      <div className="col-md-3">
        <select onChange={getCategoryValue} value={searchParams.categoryId} className="form-select " placeholder="CategoryId" >
          <option value={0} className="text-muted" >Select Category</option>
          {categories?.data?.map((category: any) =>
            <option key={category.id} value={category.id}>{category.name}</option>
          )}
        </select>
      </div>

    </div>


    {tableData ? <>
      {tableData?.data.length > 0 ? <>
        <table className="table">
          <thead>
            <tr >
              <th className='ps-3'>Id</th>
              <th>Recipe Name</th>
              <th>Price</th>
              <th>Image</th>
              <th>Description</th>
              <th>Tag</th>
              <th>Category</th>
              <th>Actions</th>
            </tr>

          </thead>

          <tbody>
            {tableData?.data.map((data: any, index: number) =>

              <tr key={data?.id} >
                <td data-cell="id" className='id ps-3' >{index + 1}</td>
                <td data-cell="name ">{data?.name}</td>

                <td data-cell="price ">{data?.price}</td>
                <td data-cell="image ">{data?.imagePath === "" ? <img className='img-table' src={NoImage5} alt="image" /> : <img className=' img-table' src={`https://upskilling-egypt.com:443/` + data?.imagePath} alt="image" />}</td>
                <td className='text-truncate' data-cell="description ">{data?.description}</td>
                <td data-cell="tag ">{data?.tag?.name}</td>
                <td data-cell="category ">{data?.category[0] === undefined ? "No Category" : data?.category[0]?.name}</td>
                <td data-cell="actions " className='action  align-items-center gap-3   '>
                  <button className=" text-success pointer delete pointer me-2" onClick={() => showChangePassModal(data?.id)}>
                    <FaEye size={25} />
                  </button>
                  {favList?.data?.some((favorite: any) => Number(favorite?.recipe?.id) === Number(data?.id)) ? (
                    <button className="text-danger pointer delete pointer">
                      <FaHeart size={25} />
                    </button>
                  ) : (
                    <button className="text-danger pointer delete pointer" onClick={() => AddToFavorite(data?.id)}>
                      <FaRegHeart size={25} />
                    </button>
                  )}

                </td>
              </tr>)}

          </tbody>

        </table>

        <nav className='page' aria-label="Page navigation example ">
          <ul className="pagination m-auto mb-4">
            <li className={`page-item ${searchParams.pageNumber <= 1 ? 'disabled' : ''}`}>
              <a className="page-link" onClick={() => setSearchParams({ ...searchParams, pageNumber: Math.max(1, searchParams.pageNumber - 1) })}>
                Previous
              </a>
            </li>
            {Array(tableData?.totalNumberOfPages).fill(0).map((_, i) => i + 1).map((pageNo) =>
              <li key={pageNo} onClick={() => setSearchParams({ ...searchParams, pageNumber: pageNo })} className='page-item'>
                <a className={`page-link ${searchParams.pageNumber === pageNo ? 'activePage' : ''}`}>
                  {pageNo}
                </a>
              </li>
            )}
            <li className={`page-item ${searchParams.pageNumber >= (tableData?.totalNumberOfPages || 1) ? 'disabled' : ''}`} >
              <a className="page-link" onClick={() => setSearchParams({ ...searchParams, pageNumber: Math.min(tableData?.totalNumberOfPages || 1, searchParams.pageNumber + 1) })}>
                Next
              </a>
            </li>

          </ul>
        </nav>

      </> : <NoData handleClose={handleClose} />}

    </> : <LoadingSpinner />
    }
  </>
}

export default RecipesList