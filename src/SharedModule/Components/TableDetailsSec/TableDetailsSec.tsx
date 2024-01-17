import { useLocation } from "react-router-dom"



const TableDetailsSec = () => {
  const { pathname } = useLocation()

  const title = pathname === '/dashboard/recipes' ? 'Recipe' : 'Favorites'
  return <>

    <section>
      <div className="d-flex justify-content-between mt-2 ms-2 align-items-center">


          <div>
            <h5 className="m-0">{title} Table Details</h5>
            <span>You can check all details</span>
          </div>


      </div>
    </section>
  </>
}

export default TableDetailsSec