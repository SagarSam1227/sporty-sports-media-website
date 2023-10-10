
import { Link } from "react-router-dom";

function LandingPage() {

  return (
    <>
      <div className=" w-full h-[642px] bg-no-repeat"
      style={{background:'url(https://images.pexels.com/photos/5836901/pexels-photo-5836901.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2)',
      backgroundSize: 'cover',
      backgroundRepeat:'no-repeat',
      backgroundPosition: 'center',
    }}
      >
        <div className="w-full  lg:h-20 flex justify-between">
          <button>
            {" "}
            <img
              className=" w-14 lg:w-20 mt-7 ml-7"
              src="/assets/logo_transparent.png"
              alt=""
            />
          </button>
          
          <div className=" flex mr-4 gap-4">
                    <div className=" mt-11">
                        <Link to='/login'>
                        <button data-modal-target="authentication-modal" data-modal-toggle="authentication-modal" className=" text-[#faebd7] font-semibold rounded-full bg-[#000000] font-roboto" >
                            <h4  className="text-xs mx-2 lg:mx-4 my-1">Sign In</h4>
                        </button>
                        </Link>
                    </div>
                    <div className=" mt-11">
                       <Link to={"/home"}><button className=" text-[#faebd7] rounded-full font-semibold bg-[#000000]">
                        <h4 className="mx-2 lg:mx-4 my-1 text-xs">Home</h4>
                        </button></Link>
                    </div>
                </div>
        </div>
        <div className="md:mt-20 mt-[5rem]
              font-bold text-center" >
                <h1 className="text-[#faebd7] md:text-8xl text-5xl">You were meant</h1>
                <h1 className="md:text-9xl text-6xl">to be here.</h1>
                <h1 className="text-[#faebd7] md:first-letter:text-8xl text-5xl">This moment is</h1>
                <h1 className="md:text-9xl text-6xl">yours</h1>
            </div>
      </div>
    </>
  );
}

export default LandingPage;
