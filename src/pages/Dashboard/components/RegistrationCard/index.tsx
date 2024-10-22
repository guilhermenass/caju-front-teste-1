import { ButtonSmall } from "~/components/Buttons";
import * as S from "./styles";
import {
  HiOutlineMail,
  HiOutlineUser,
  HiOutlineCalendar,
  HiOutlineTrash,
} from "react-icons/hi";
import usePutRequest from "~/hooks/usePutRequest";
import { Registration } from "~/models/registration";
import useDeleteRequest from "~/hooks/useDeleteRequest";

type RegistrationCardProps = {
  data: Registration;
};

const RegistrationCard = ({
  data: { admissionDate, cpf, email, employeeName, id },
}: RegistrationCardProps) => {
  const { sendPutRequest } = usePutRequest();
  const { sendDeleteRequest } = useDeleteRequest()

  const handleUpdateStatus = (id: string, status: string) => {
    const payload = {
      admissionDate,
      email,
      employeeName,
      cpf,
      status,
    };
    sendPutRequest(`registrations/${id}`, payload);
  };

  const handleDelete = (id: string) => {
    sendDeleteRequest(`registrations/${id}`)
  }

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
        <ButtonSmall
          onClick={() => handleUpdateStatus(id, 'REPROVED')}
          bgcolor="rgb(255, 145, 154)"
        >
          Reprovar
        </ButtonSmall>
        <ButtonSmall
          onClick={() => handleUpdateStatus(id, 'APPROVED')}
          bgcolor="rgb(155, 229, 155)"
        >
          Aprovar
        </ButtonSmall>
        <ButtonSmall
          onClick={() => handleUpdateStatus(id, 'REVIEW')}
          bgcolor="#ff8858"
        >
          Revisar novamente
        </ButtonSmall>

        <HiOutlineTrash onClick={() => handleDelete(id)} />
      </S.Actions>
    </S.Card>
  );
};

export default RegistrationCard;
