import { Modal } from "@/components/modal"
import successAnimation from "@/public/lottie/success.json"
import Lottie from "lottie-react"
import s from "./modal.module.scss"

interface ModalCompleteProps {
  isOpen: boolean
  setIsOpen: (isOpen: boolean) => void
}

export const ModalComplete = ({ isOpen, setIsOpen }: ModalCompleteProps) => {
  return (
    <Modal onClose={() => setIsOpen(false)} className={s.modal}>
      <div className={s.anim}>
        <Lottie
          animationData={successAnimation}
          loop={true}
          style={{ width: 200, height: 200 }}
        />
      </div>
      <h2>Terminé</h2>
      <p>
        Félicitations, vous avez réussi à terminer votre achat.
        <br />A bientôt !
      </p>
    </Modal>
  )
}
