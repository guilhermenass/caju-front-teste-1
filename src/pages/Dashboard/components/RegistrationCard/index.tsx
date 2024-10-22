import {
  HiOutlineCalendar,
  HiOutlineMail,
  HiOutlineTrash,
  HiOutlineUser,
} from "react-icons/hi";
import { ButtonSmall } from "~/components/Buttons";
import { useDeleteRegistration } from "~/hooks/useDeleteRegistration";
import { useUpdateRegistrationStatus } from "~/hooks/useUpdateRegistrationStatus";
import { Registration, RegistrationStatus } from "~/models/registration";
import * as S from "./styles";

type RegistrationCardProps = {
  data: Registration;
};

const RegistrationCard = ({
  data: { admissionDate, cpf, email, employeeName, id, status },
}: RegistrationCardProps) => {
  const { mutate } = useUpdateRegistrationStatus();

  const { mutate: mutateDeleteRegistration } = useDeleteRegistration();

  const handleUpdateStatus = (id: string, status: RegistrationStatus) => {
    const payload = {
      id,
      admissionDate,
      email,
      employeeName,
      cpf,
      status,
    };
    mutate({ id, updatedData: payload });
  };

  const handleDelete = (id: string) => {
    mutateDeleteRegistration({ id });
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
            onClick={() => handleUpdateStatus(id, "REPROVED")}
            bgcolor="rgb(255, 145, 154)"
          >
            Reprovar
          </ButtonSmall>
        )}

        {status === "REVIEW" && (
          <ButtonSmall
            onClick={() => handleUpdateStatus(id, "APPROVED")}
            bgcolor="rgb(155, 229, 155)"
          >
            Aprovar
          </ButtonSmall>
        )}

        {(status === "APPROVED" || status === "REPROVED") && (
          <ButtonSmall
            onClick={() => handleUpdateStatus(id, "REVIEW")}
            bgcolor="#ff8858"
          >
            Revisar novamente
          </ButtonSmall>
        )}

        <HiOutlineTrash onClick={() => handleDelete(id)} />
      </S.Actions>
    </S.Card>
  );
};

export default RegistrationCard;
