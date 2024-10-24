import { HiRefresh } from "react-icons/hi";
import { useHistory } from "react-router-dom";
import Button from "~/components/Buttons";
import { IconButton } from "~/components/Buttons/IconButton";
import routes from "~/router/routes";
import * as S from "./styles";
import { SearchbarProps, VALID_DOCUMENT_LENGTH } from "./types";

import TextField from "~/components/TextField";
import { useMask } from "@react-input/mask";
import { useState } from "react";

export const SearchBar = ({ onSearch, onRefetch }: SearchbarProps) => {
  const history = useHistory();

  const documentRef = useMask({
    mask: "___.___.___-__",
    replacement: { _: /\d/ },
  });

  const [documentError, setDocumentError] = useState<string>("");

  const goToNewAdmissionPage = () => {
    history.push(routes.newUser);
  };

  const handleDocumentChange = (event: React.ChangeEvent<HTMLInputElement>) => {

    const documentWithoutMask = event.target.value.replace(/\D/g, "");

    if (documentWithoutMask.length === VALID_DOCUMENT_LENGTH) {
      onSearch(documentWithoutMask);
      return
    }
    if (documentWithoutMask.length === 0) {
      onSearch("");
      return
    }
    setDocumentError("CPF precisa ter 11 números")
  };

  const handleRefetch = () => {
    onRefetch();
  };

  return (
    <S.Container>
      <TextField
        ref={documentRef}
        placeholder="Digite um CPF válido"
        type="text"
        label="CPF"
        error={documentError}
        onChange={handleDocumentChange}
      />
      <S.Actions>
        <IconButton aria-label="refetch" onClick={handleRefetch}>
          <HiRefresh />
        </IconButton>
        <Button onClick={() => goToNewAdmissionPage()}>Nova Admissão</Button>
      </S.Actions>
    </S.Container>
  );
};
