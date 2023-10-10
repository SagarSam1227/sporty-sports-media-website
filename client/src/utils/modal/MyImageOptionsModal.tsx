import { Fragment, useEffect, useRef, useState } from "react";
import { Dialog, Transition } from "@headlessui/react";
import { myOptionsInterface } from "../../vite-env";
import { updateReportHideUrl } from "../../api/axiosConnection";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";
import { handleDeletePost } from "../../redux/handleRedux";
import { useDispatch } from "react-redux";

export default function MyImageOptionsModal(props: myOptionsInterface) {
  const { card, setIsOptionsSelected,setIsFullImage } = props;

  const [optionsClicked, setOptionsClicked] = useState<string>("");
  const [open, setOpen] = useState(true);
  const [data, setData] = useState<any>();
  const navigate = useNavigate()
  const dispatch = useDispatch()



  const handleClose = () => {
    if (optionsClicked == "") {
      setOpen(false);
      setIsOptionsSelected(false);
    }
  };

  const handleDelete = async () => {
 
   await updateReportHideUrl(card?.image, true);
     navigate('/user-info')
        handleClose();
    await Swal.fire({
          icon:'success',
          text: "post deleted successfully",
          showConfirmButton: false,
          timer: 2000,
        });
       
        handleDeletePost(card?.image,dispatch)
          setOpen(false);
          setIsOptionsSelected(false);
          setIsFullImage(false)
        //   window.location.reload();
    
  };


  const cancelButtonRef = useRef(null);

  return (
    <>
      <Transition.Root show={open} as={Fragment}>
        <Dialog
          as="div"
          className="relative z-10"
          initialFocus={cancelButtonRef}
          onClose={handleClose}
        >
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
          </Transition.Child>

          <div className="fixed inset-0 z-10 overflow-y-auto">
            <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
              <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                enterTo="opacity-100 translate-y-0 sm:scale-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 translate-y-0 sm:scale-100"
                leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
              >
                <Dialog.Panel className="relative transform overflow-hidden rounded-2xl text-left shadow-xl transition-all sm:my-8 w-[17rem]">
                  <div className="bg-[#000000cd]">
                    <div className="">
                      <div
                        onClick={()=>{
                            handleDelete()
                        }}
                        className="w-full text-lg font-semibold py-3 text-[#c81a1a] hover:bg-[#000000] cursor-pointer text-center"
                      >
                        delete
                      </div>
                      <div
                        className="w-full text-lg font-semibold py-3 text-[#c2c2c2] border-t border-b text-center border-[#ffffff4c] hover:bg-[#000000] cursor-pointer"
                        onClick={() => {}}
                      >
                        edit
                      </div>
                      <div className="w-full text-lg font-semibold py-3 text-[#c2c2c2] hover:bg-[#000000] cursor-pointer text-center">
                        cancel
                      </div>
                    </div>
                  </div>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition.Root>
    </>
  );
}
