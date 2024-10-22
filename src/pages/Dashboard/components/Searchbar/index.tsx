import { HiRefresh } from "react-icons/hi";
import { useHistory } from "react-router-dom";
import Button from "~/components/Buttons";
import { IconButton } from "~/components/Buttons/IconButton";
import TextField from "~/components/TextField";
import routes from "~/router/routes";
import * as S from "./styles";
import { SearchbarProps, VALID_DOCUMENT_LENGTH } from "./types";

export const SearchBar = ({ onSearch }: SearchbarProps) => {
  const history = useHistory();

  const goToNewAdmissionPage = () => {
    history.push(routes.newUser);
  };

  const handleDocumentChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const document = event.target.value;

    if (document.length === VALID_DOCUMENT_LENGTH) {
      onSearch(document);
    }

    if (document.length === 0) {
      onSearch("");
    }
  };

  return (
    <S.Container>
      <TextField
        placeholder="Digite um CPF válido"
        onChange={handleDocumentChange}
      />

      <S.Actions>
        <IconButton aria-label="refetch">
          <HiRefresh />
        </IconButton>
        <Button onClick={() => goToNewAdmissionPage()}>Nova Admissão</Button>
      </S.Actions>
    </S.Container>
  );
};
