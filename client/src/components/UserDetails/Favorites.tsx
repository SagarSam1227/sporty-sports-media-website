import { useSelector } from "react-redux";
import { RootState } from "../../vite-env";
import SingleFavCard from "./singleFavCard";

function Favorites() {
  const userDetails: any = useSelector<RootState>((store) => store.user);
  const favorites = userDetails?.items?.favorites;
  

  return (
    <>
      <div className="w-full h-[26rem] bg-gray-100 overflow-y-scroll no-scrollbar">
        {favorites
          .slice()
          .reverse()
          .map((image: string) => {
            return (
                
               <SingleFavCard image={image}/>
                
            );
          })}
      </div>
    </>
  );
}

export default Favorites;
