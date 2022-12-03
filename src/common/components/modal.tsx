import { Dialog, Transition } from "@headlessui/react";
import {
  FormEvent,
  Fragment,
  FunctionComponent,
  PropsWithChildren,
  useEffect,
  useState,
} from "react";

interface ModalProps {
  displayModal: boolean;
}

const Modal: FunctionComponent<PropsWithChildren<ModalProps>> = ({
  displayModal,
  children,
}) => {
  const [show, setShow] = useState(displayModal);

  useEffect(() => {
    setShow(displayModal);
  }, [displayModal]);

  const handleCloseModal = (e: FormEvent) => {
    e.preventDefault();
    setShow(false);
  };

  return (
    <Transition appear show={show} as={Fragment}>
      <Dialog as="div" className="relative z-10" onClose={() => setShow(false)}>
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-black bg-opacity-25" />
        </Transition.Child>

        <div className="fixed inset-0 overflow-y-auto">
          <div className="flex items-center justify-center min-h-full p-4 text-center">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 scale-95"
              enterTo="opacity-100 scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 scale-100"
              leaveTo="opacity-0 scale-95"
            >
              <Dialog.Panel className="w-full max-w-xl px-10 py-14 overflow-hidden align-middle transition-all transform bg-white shadow-xl rounded-2xl text-center">
                <form onSubmit={(e) => handleCloseModal(e)}>{children}</form>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition>
  );
};

export default Modal;
