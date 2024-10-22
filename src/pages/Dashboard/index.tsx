import { useState } from "react";
import { useAllRegistrations } from "~/hooks/useAllRegistrations";
import { useRegistrationsByDocument } from "~/hooks/useRegistrationsByDocument";
import Collumns from "./components/Columns";
import { SearchBar } from "./components/Searchbar";
import * as S from "./styles";

const DashboardPage = () => {
  const [document, setDocument] = useState("");
  const { data, isLoading } = useAllRegistrations();

  const { data: registrationsByDocumentData } =
    useRegistrationsByDocument(document);

  async function handleSearchByDocument(document: string): Promise<void> {
    setDocument(document);
  }

  if (isLoading) {
    return <h1>loading...</h1>;
  }

  const registrations = document ? registrationsByDocumentData : data

  return (
    <S.Container>
      <SearchBar
        onSearch={(document: string) => handleSearchByDocument(document)}
      />
      <Collumns registrations={registrations || []} />
    </S.Container>
  );
};
export default DashboardPage;
