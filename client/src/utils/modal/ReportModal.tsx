import { Fragment, useRef, useState } from 'react'
import { Dialog, Transition } from '@headlessui/react'
import { reportInterface } from '../../vite-env'


export default function ReportModal(props:reportInterface){

  const {reports,setIsViewReport} = props

  const [open, setOpen] = useState(true)

  console.log(reports);
  
  const cancelButtonRef = useRef(null)

  const uniqueReasonsCount = new Map();

// Iterate through the reports array and count reasons
reports.forEach(report=> {
  const { reason } = report;
  if (uniqueReasonsCount.has(reason)) {
    uniqueReasonsCount.set(reason, uniqueReasonsCount.get(reason) + 1);
  } else {
    uniqueReasonsCount.set(reason, 1);
  }
});



  return (
    <Transition.Root show={open} as={Fragment}>
      <Dialog as="div" className="relative z-10" initialFocus={cancelButtonRef} onClose={setIsViewReport}>
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
              <Dialog.Panel className="relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all sm:my-8 sm:w-96 sm:max-w-lg">
                <div className="bg-white px-4 pb-4 pt-5 sm:p-6 sm:pb-4">
                  <div className=" sm:items-start">
                    {reports?.length==0?
                    <Dialog.Title as="h3" className="text-base font-semibold leading-6 text-gray-900">
                        No reports 
                      </Dialog.Title>:
                    Array.from(uniqueReasonsCount.entries()).map(([reason, count]) => {
                   return (
                   <div className="mt-3 text-center sm:mt-0 flex justify-between sm:mb-3">
                      <Dialog.Title as="h3" className="text-base font-normal leading-6 text-gray-900">
                      {reason}
                      </Dialog.Title>
                      <h1>-</h1>
                      <Dialog.Title as="h3" className="text-base font-semibold leading-6 text-gray-900">
                      {count} {count==1?'report':'reports'}
                      </Dialog.Title>
                    </div>)
                    })}
                  
                  </div>
                </div>
                <div className="bg-gray-50 px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6">
                  <button
                    type="button"
                    className="mt-3 inline-flex w-full justify-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 sm:mt-0 sm:w-auto"
                    onClick={() => {

                      setOpen(false)
                      setIsViewReport(false)
                    }
                    }
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
  )
}
