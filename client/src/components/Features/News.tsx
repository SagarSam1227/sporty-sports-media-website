import { useSelector } from "react-redux";
import { RootState } from "../../vite-env";



function News() {
    const userDetails: any = useSelector<RootState>((store) => store.user);

    const username = userDetails.items?.username
    return (
        <>
            <div className={`md:float-left ml-40 grid grid-cols-2 gap-1 row-auto columns-4 md:ml-[-13rem] rounded-md h-[30rem] overflow-y-scroll no-scrollbar md:mt-20 ${username ? "w-1/2" : "w-3/4"}`}>
                <div className=" rounded-md justify-center">
                    
                </div>
            </div>
        </>
    )
}

export default News;

