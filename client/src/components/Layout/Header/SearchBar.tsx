import {useContext} from "react"
import DarkModeContext from "../../../utils/DarkModeContext";

function SearchBar(){
  const {isDarkmode} = useContext(DarkModeContext)

    return (
        <>
          <div className="md:w-56 md:float-left h-1 hidden md:flex md:ml-60"></div>


  <div className=" hidden md:flex md:mt-16">
    <input
      type=""
     className={`rounded-full w-64 fixed ${isDarkmode?"bg-[#b8bac0]":"bg-[#f5f5f5]"} bg-[#f5f5f5] drop-shadow-lg md:h-10 p-[1rem] pr-10`}
      aria-label="Search"
      // aria-describedby="button-addon2" 
      />
      <button className="">
      <img className="flex-1 mx-2 h-[1.5rem] w-[1.5rem] fixed ml-[14rem] mt-[0.5rem]" src="https://img.icons8.com/?size=512&id=Y6AAeSVIcpWt&format=png" alt="" />
      </button>
    
  </div>
           
            
        </>
    )
}

export default SearchBar;