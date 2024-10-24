import { useState } from "react";
import {
  HiOutlineCalendar,
  HiOutlineMail,
  HiOutlineTrash,
  HiOutlineUser,
} from "react-icons/hi";
import { toast } from "react-toastify";
import { ButtonSmall } from "~/components/Buttons";
import Modal from "~/components/Modal";
import { useDeleteRegistration } from "~/hooks/useDeleteRegistration";
import { useUpdateRegistrationStatus } from "~/hooks/useUpdateRegistrationStatus";
import { Registration, RegistrationStatus } from "~/models/registration";
import * as S from "./styles";

type RegistrationCardProps = {
  data: Registration;
};

type RegistrationAction = "APPROVED" | "REMOVED" | "REPROVED" | "REVIEW";

const RegistrationCard = ({
  data: { admissionDate, cpf, email, employeeName, id, status },
}: RegistrationCardProps) => {
  const { mutate } = useUpdateRegistrationStatus();
  const { mutate: mutateDeleteRegistration } = useDeleteRegistration();
  const [isModalOpen, setModalOpen] = useState(false);
  const [currentActionModal, setCurrentActionModal] = useState<RegistrationAction>();

  const openModal = (action: RegistrationAction) => {
    setModalOpen(!isModalOpen);
    setCurrentActionModal(action);
  };

  const handleUpdateStatus = (id: string, status: RegistrationStatus) => {
    const payload = {
      id,
      admissionDate,
      email,
      employeeName,
      cpf,
      status,
    };
    mutate(
      { id, updatedData: payload },
      {
        onSuccess: () => {
          toast.success("Registro atualizado com sucesso!");
        },
        onError: () => {
          toast.error("Ocorreu um erro ao atualizar o registro!");
        },
      }
    );
  };

  const handleDelete = (id: string) => {
    mutateDeleteRegistration(
      { id },
      {
        onSuccess: () => {
          toast.success("Registro removido com sucesso!");
        },
        onError: () => {
          toast.error("Ocorreu um erro ao remover o registro!");
        },
      }
    );
  };

  return (
    <S.Card>
      <S.IconAndText>
        <HiOutlineUser />
        <h3>{employeeName}</h3>
      </S.IconAndText>
      <S.IconAndText>
        <HiOutlineMail />
        <p>{email}</p>
      </S.IconAndText>
      <S.IconAndText>
        <HiOutlineCalendar />
        <span>{admissionDate}</span>
      </S.IconAndText>
      <S.Actions>
        {status === "REVIEW" && (
          <ButtonSmall
            onClick={() => openModal("REPROVED")}
            bgcolor="rgb(255, 145, 154)"
          >
            Reprovar
          </ButtonSmall>
        )}

        {status === "REVIEW" && (
          <ButtonSmall
            onClick={() => openModal("APPROVED")}
            bgcolor="rgb(155, 229, 155)"
          >
            Aprovar
          </ButtonSmall>
        )}

        {(status === "APPROVED" || status === "REPROVED") && (
          <ButtonSmall onClick={() => openModal("REVIEW")} bgcolor="#ff8858">
            Revisar novamente
          </ButtonSmall>
        )}

        <HiOutlineTrash onClick={() => openModal("REMOVED")} />
      </S.Actions>
      <Modal
        isOpen={isModalOpen}
        onClose={() => setModalOpen(false)}
        onConfirm={() => {
          if (currentActionModal === "REMOVED") {
            handleDelete(id);
            setModalOpen(false);
            return;
          }
          let actionToDo: RegistrationStatus = "APPROVED";
          if (currentActionModal === "REPROVED") actionToDo = "REPROVED";
          if (currentActionModal === "REVIEW") actionToDo = "REVIEW";
          handleUpdateStatus(id, actionToDo)
        }}
        message="Tem certeza de que deseja realizar esta ação?"
      />
    </S.Card>
  );
};

export default RegistrationCard;
