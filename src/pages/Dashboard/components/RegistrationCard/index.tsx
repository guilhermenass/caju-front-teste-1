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

type RegistrationCardProps = {
  data: Registration;
};

const RegistrationCard = ({
  data: { admissionDate, cpf, email, employeeName, id, status },
}: RegistrationCardProps) => {
  const { sendPutRequest } = usePutRequest();

  const handleReproveRegistration = (payload: Registration) => {
    sendPutRequest(`registrations/${id}`, payload);
  };

  const handleApproveRegistration = (id: string) => {
    const payload = {
      admissionDate: "22/10/2023",
      email: "filipe@caju.com.br",
      employeeName: "Filipe Marins",
      status: "APPROVED",
      cpf: "78502270001",
    };
    sendPutRequest(`registrations/${id}`, payload);
  };

  const handleReviewAgain = (id: string) => {
    const payload = {
      admissionDate: "22/10/2023",
      email: "filipe@caju.com.br",
      employeeName: "Filipe Marins",
      status: "REVIEW",
      cpf: "78502270001",
    };
    sendPutRequest(`registrations/${id}`, payload);
  };

  return (
    <S.Card>
      <S.IconAndText>
        <HiOutlineUser />
        <h3>{props.data.employeeName}</h3>
      </S.IconAndText>
      <S.IconAndText>
        <HiOutlineMail />
        <p>{props.data.email}</p>
      </S.IconAndText>
      <S.IconAndText>
        <HiOutlineCalendar />
        <span>{props.data.admissionDate}</span>
      </S.IconAndText>
      <S.Actions>
        <ButtonSmall
          onClick={() => handleReproveRegistration(props.data.id)}
          bgcolor="rgb(255, 145, 154)"
        >
          Reprovar
        </ButtonSmall>
        <ButtonSmall
          onClick={() => handleApproveRegistration(props.data.id)}
          bgcolor="rgb(155, 229, 155)"
        >
          Aprovar
        </ButtonSmall>
        <ButtonSmall
          onClick={() => handleReviewAgain(props.data.id)}
          bgcolor="#ff8858"
        >
          Revisar novamente
        </ButtonSmall>

        <HiOutlineTrash />
      </S.Actions>
    </S.Card>
  );
};

export default RegistrationCard;
