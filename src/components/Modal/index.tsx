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
  message,
  onClose,
  onConfirm,
}) => {
  if (!isOpen) return null; // Não renderiza a modal se não estiver aberta

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
