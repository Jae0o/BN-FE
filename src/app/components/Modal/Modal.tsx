import { AnimatePresence, motion } from "motion/react"

import type { ModalProps } from "./Modal.type"
import { ModalPortal } from "./components"
import { useAwayClickModal, useKeydownModal } from "./hooks"

const Modal = ({
  children,
  isShow,
  onClose,
  hideCloseIcon = false,
  disableAwayClick = false,
}: ModalProps) => {
  const handleCloseModal = useAwayClickModal(onClose)

  useKeydownModal({
    callback: onClose,
    isShow,
    disableAwayClick,
  })

  return (
    <AnimatePresence>
      {isShow && (
        <ModalPortal isShow={isShow}>
          <motion.section
            className="fixed inset-0 z-50 flex items-center justify-center overflow-auto bg-black/50"
            onClick={event => !disableAwayClick && handleCloseModal(event)}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}>
            <motion.article
              className={`relative min-h-16 min-w-16 rounded-2xl bg-white p-6 shadow-lg ${!hideCloseIcon ? "pt-10" : ""}`}
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}>
              {!hideCloseIcon && (
                <motion.button
                  type="button"
                  onClick={onClose}
                  className="absolute top-2 right-2 flex size-8 cursor-pointer items-center justify-center rounded-md text-icon hover:bg-gray-bg"
                  whileTap={{ scale: 1.2 }}
                  aria-label="Close modal">
                  ✕
                </motion.button>
              )}

              {children}
            </motion.article>
          </motion.section>
        </ModalPortal>
      )}
    </AnimatePresence>
  )
}

export default Modal
