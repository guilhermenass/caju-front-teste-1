import Button from "../Buttons";
import * as S from "./styles"; // Importar estilos se necessário

type ModalProps = {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  message: string;
};

const Modal: React.FC<ModalProps> = ({
  isOpen,
  onClose,
  onConfirm,
  message,
}) => {
  if (!isOpen) return null; // Não renderiza a modal se não estiver aberta

  return (
    <S.Modal>
      <S.ModalContent>
        <h2>Confirmação</h2>
        <p>{message}</p>
        <S.Buttons>
          <Button primary onClick={onConfirm}>Confirmar</Button>
          <Button onClick={onClose}>Cancelar</Button>
        </S.Buttons>
      </S.ModalContent>
    </S.Modal>
  );
};

export default Modal;
