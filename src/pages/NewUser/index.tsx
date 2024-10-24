import { useMask } from "@react-input/mask";
import { useRef, useState } from "react";
import { HiOutlineArrowLeft } from "react-icons/hi";
import { useHistory } from "react-router-dom";
import { toast } from "react-toastify";
import Button from "~/components/Buttons";
import { IconButton } from "~/components/Buttons/IconButton";
import Loading from "~/components/Loading";
import TextField from "~/components/TextField";
import { useCreateRegistration } from "~/hooks/useCreateRegistration";
import { CreateRegistrationRequest } from "~/models/registration";
import routes from "~/router/routes";
import {
  formatToBrazilianDate,
  validateDocument,
  validateEmail,
  validateFullName,
} from "~/utils";
import * as S from "./styles";

const NewUserPage = () => {
  const documentRef = useMask({
    mask: "___.___.___-__",
    replacement: { _: /\d/ },
  });
  const history = useHistory();
  const emailRef = useRef<HTMLInputElement>(null);
  const [emailError, setEmailError] = useState<string>("");

  const [documentError, setDocumentError] = useState<string>("");

  const fullNameRef = useRef<HTMLInputElement>(null);
  const [fullNameError, setFullNameError] = useState<string>("");

  const admissionDateRef = useRef<HTMLInputElement>(null);
  const [admissionDateError, setAdmissionDateError] = useState<string>("");

  const { mutate, isPending } = useCreateRegistration();

  const handleRedirectToHome = () => {
    history.push(routes.dashboard);
  };

  const handleSaveUser = (payload: CreateRegistrationRequest) => {
    mutate(
      { payload },
      {
        onSuccess: () => {
          toast.success("Usuário cadastrado com sucesso.");
          handleRedirectToHome();
        },
        onError: () => {
          toast.error("Ocorreu um erro ao tentar cadastrar um novo usuário.");
        },
      }
    );
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const admissionDateValue = admissionDateRef.current?.value;
    const documentValue = documentRef.current?.value;
    const emailValue = emailRef.current?.value;
    const fullNameValue = fullNameRef.current?.value;

    const isValidFullName = validateFullName(fullNameValue);
    if (!isValidFullName) {
      setFullNameError("O nome completo é inválido");
      return;
    }
    setFullNameError("");
    const isValidEmail = validateEmail(emailRef.current?.value);
    if (!isValidEmail) {
      setEmailError("E-mail inválido.");
      return;
    }
    setEmailError("");
    const isValidDocument = validateDocument(documentValue);
    if (!isValidDocument) {
      setDocumentError("CPF inválido.");
      return;
    }
    setDocumentError("");

    if (!admissionDateValue) {
      setAdmissionDateError("A data de admissão é obrigatória.");
      return;
    }
    setAdmissionDateError("");
    const payload: CreateRegistrationRequest = {
      admissionDate: formatToBrazilianDate(admissionDateValue),
      cpf: documentValue || "",
      email: emailValue || "",
      employeeName: fullNameValue || "",
      status: "REVIEW",
    };
    handleSaveUser(payload);
  };

  if (isPending) {
    return <Loading />;
  }

  return (
    <S.Container>
      <form onSubmit={(event) => handleSubmit(event)}>
        <S.Card>
          <IconButton onClick={() => handleRedirectToHome()} aria-label="back">
            <HiOutlineArrowLeft size={24} />
          </IconButton>
          <TextField
            placeholder="Nome completo"
            label="Nome completo"
            ref={fullNameRef}
            error={fullNameError}
          />
          <TextField
            placeholder="exemplo@dominio.com"
            label="Email"
            type="email"
            ref={emailRef}
            error={emailError}
          />
          <TextField
            ref={documentRef}
            placeholder="Digite um CPF válido"
            type="text"
            label="CPF"
            error={documentError}
          />

          <TextField
            label="Data de admissão"
            type="date"
            ref={admissionDateRef}
            error={admissionDateError}
          />
          <Button type="submit">Cadastrar</Button>
        </S.Card>
      </form>
    </S.Container>
  );
};

export default NewUserPage;
