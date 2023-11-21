import { Fragment, useRef, useState } from "react";
import { Dialog, Transition } from "@headlessui/react";
import SingleReason from "../SingleReason";
import { updateReportUrl } from "../../api/axiosConnection";
import Swal from "sweetalert2";

function ReportReasons({
  setOptionsClicked,
  imageUrl,
  username,
}: {
  setOptionsClicked: (arg0: string) => void;
  imageUrl: string;
  username: string;
}) {
  console.log(imageUrl, username);

  const [opening, setOpening] = useState(true);
  const cancelButtonRef = useRef(null);
  const [flag, setFlag] = useState<string>("");

  const handleClosing = () => {
    if (opening) {
      setOpening(false);
      setOptionsClicked('');
    }
  };

  const handleReport = () => {
    if (flag.length > 0) {
      updateReportUrl(imageUrl, username, flag).then(() => {
        setOpening(false);
        setOptionsClicked('')
        Swal.fire({
          position: "center",
          icon: "success",
          text: "Thanks for your response",
          showConfirmButton: false,
          timer: 2000,
        });
      });
    }
  };

  return (
    <Transition.Root show={opening} as={Fragment}>
      <Dialog
        as="div"
        className="relative z-10"
        initialFocus={cancelButtonRef}
        onClose={handleClosing}
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
              <Dialog.Panel className="relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg">
                <div className="bg-white px-4 pb-4 pt-5 sm:p-6 sm:pb-4">
                  <div>
                    <Dialog.Title
                      as="h2"
                      className="text-base font-semibold leading-6 text-gray-900"
                    >
                      Why are you reporting this post?
                    </Dialog.Title>
                    <hr className="my-5" />
                  </div>
                  <div className=" sm:items-start">
                    <SingleReason
                      reason="It's spam"
                      flag={flag}
                      setFlag={setFlag}
                    />
                    <SingleReason
                      reason="Nudity or sexual activity"
                      flag={flag}
                      setFlag={setFlag}
                    />
                    <SingleReason
                      reason="Violence or dangerous organizations"
                      flag={flag}
                      setFlag={setFlag}
                    />
                    <SingleReason
                      reason="Bullying or harassment"
                      flag={flag}
                      setFlag={setFlag}
                    />
                    <SingleReason
                      reason="Scam or fraud"
                      flag={flag}
                      setFlag={setFlag}
                    />
                    <SingleReason
                      reason="Suicide or self-injury"
                      flag={flag}
                      setFlag={setFlag}
                    />
                    <SingleReason
                      reason="Sale of illegal or regulated goods"
                      flag={flag}
                      setFlag={setFlag}
                    />
                  </div>
                </div>
                <div className="bg-gray-50 px-4 py-3 sm:flex sm:flex-row-reverse sm:gap-5 sm:px-6">
                  <button
                    type="button"
                    className="mt-3 inline-flex w-full justify-center rounded-md bg-black px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-gray-50 hover:text-black hover:border-black sm:mt-0 sm:w-auto"
                    onClick={() => {
                      handleReport();
                    }}
                  >
                    report
                  </button>
                  <button
                    onClick={handleClosing}
                    type="button"
                    className="mt-3 inline-flex w-full justify-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 sm:mt-0 sm:w-auto"
                    ref={cancelButtonRef}
                  >
                    Cancel
                  </button>
                </div>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition.Root>
  );
}

export default ReportReasons;
