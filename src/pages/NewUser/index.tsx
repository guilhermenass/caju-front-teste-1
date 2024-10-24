import TextField from "~/components/TextField";
import * as S from "./styles";
import Button from "~/components/Buttons";
import { HiOutlineArrowLeft } from "react-icons/hi";
import { IconButton } from "~/components/Buttons/IconButton";
import { useHistory } from "react-router-dom";
import routes from "~/router/routes";
import { useRef, useState } from "react";
import { validateDocument, validateEmail, validateFullName } from "~/utils";

const NewUserPage = () => {
  const history = useHistory();
  const emailRef = useRef<HTMLInputElement>(null);
  const [emailError, setEmailError] = useState<string>("");

  const documentRef = useRef<HTMLInputElement>(null);
  const [documentError, setDocumentError] = useState<string>("");

  const fullNameRef = useRef<HTMLInputElement>(null);
  const [fullNameError, setFullNameError] = useState<string>("");

  const admissionDateRef = useRef<HTMLInputElement>(null);
  const [admissionDateError, setAdmissionDateError] = useState<string>("");

  const handleRedirectToHome = () => {
    history.push(routes.dashboard);
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const isValidFullName = validateFullName(fullNameRef.current?.value);
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
    const isValidDocument = validateDocument(documentRef.current?.value);
    if (!isValidDocument) {
      setDocumentError("CPF inválido.");
      return;
    }
    setDocumentError("");

    if (!admissionDateRef.current?.value) {
      setAdmissionDateError("A data de admissão é obrigatória.")
      return;
    }
    setAdmissionDateError("")
  };

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
            placeholder="CPF"
            label="CPF"
            ref={documentRef}
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
