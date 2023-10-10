import { Fragment, useRef, useState } from "react";
import { Dialog, Transition } from "@headlessui/react";
import { optionsInterface } from "../../vite-env";
import ReportReasons from "./ReportReason";
import { fetchSinglePostUrl } from "../../api/axiosConnection";
import Swal from "sweetalert2";

export default function ImageOptionsModal(props: optionsInterface) {
  const { card, email, setIsOptionsSelected, handleSave } = props;

  const [optionsClicked, setOptionsClicked] = useState<string>("");
  const [open, setOpen] = useState(true);
  const [data, setData] = useState<any>();

  //   const onButtonClicked = () => {
  //    setOptionsClicked('')
  //   };

  const handleClose = () => {
    if (optionsClicked == "") {
      setOpen(false);
      setIsOptionsSelected(false);
    }
  };

  const reportClicked = async () => {
    await fetchSinglePostUrl(card?.image, setData).then(
      (response: { reports: [{ email: string }] }) => {
        console.log(response, "ddddd");
        const result = response?.reports?.some(
          (report) => report?.email == email
        );
        console.log(result, "resullttttttt");

        if (result) {
          Swal.fire({
            position: "center",
            icon: "info",
            title: "You already reported this post",
            showConfirmButton: false,
            timer: 2000,
          });
        } else {
          setOptionsClicked("report");
        }
      }
    );
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
                      onClick={() => {
                        reportClicked();
                      }}
                        className="w-full text-lg font-semibold py-3  hover:bg-[#000000] text-[#c81a1a] cursor-pointer text-center"
                      >
                        report
                      </div>
                      <div
                        className="w-full text-lg font-semibold py-3 text-[#c2c2c2] border-t border-b text-center border-[#ffffff4c] hover:bg-[#000000] cursor-pointer"
                        
                        onClick={handleSave}
                      >
                        save
                      </div>
                      <div
                       className="w-full text-lg font-semibold py-3 text-[#c2c2c2] hover:bg-[#000000] cursor-pointer text-center">
                        unfollow
                      </div>
                    </div>
                  </div>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition.Root>
      {optionsClicked == "report" ? (
        <ReportReasons
          setOptionsClicked={setOptionsClicked}
          imageUrl={card.image}
          username={email}
        />
      ) : null}
    </>
  );
}
