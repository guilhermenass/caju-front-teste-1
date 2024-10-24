import Button from "../Buttons";
import * as S from "./styles";

type ModalProps = {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  message: string;
};

const Modal = ({ isOpen, message, onClose, onConfirm }: ModalProps) => {
  if (!isOpen) return null;

  return (
    <S.Modal>
      <S.ModalContent>
        <h2>Confirmação</h2>
        <p>{message}</p>
        <S.Buttons>
          <Button primary={false} onClick={onClose}>
            Cancelar
          </Button>
          <Button onClick={onConfirm}>Confirmar</Button>
        </S.Buttons>
      </S.ModalContent>
    </S.Modal>
  );
};

export default Modal;
