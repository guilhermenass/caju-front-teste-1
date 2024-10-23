import { useState } from "react";
import { useAllRegistrations } from "~/hooks/useAllRegistrations";
import { useRegistrationsByDocument } from "~/hooks/useRegistrationsByDocument";
import Columns from "./components/Columns";
import { SearchBar } from "./components/Searchbar";
import * as S from "./styles";

const DashboardPage = () => {
  const [document, setDocument] = useState("");
  const {
    data,
    isLoading: isLoadingAllRegistrations,
    refetch: refetchAllRegistrations,
  } = useAllRegistrations();

  const {
    data: registrationsByDocumentData,
    isLoading: isLoadingRegistrationsByDocument
  } = useRegistrationsByDocument(document);

  async function handleSearchByDocument(document: string): Promise<void> {
    setDocument(document);
  }

  const handleRefetchAll = () => {
    refetchAllRegistrations()
  };

  const isLoading = isLoadingAllRegistrations || !document ? isLoadingAllRegistrations : isLoadingRegistrationsByDocument;

  if (isLoading) {
    return <h1>loading...</h1>;
  }

  const registrations =
    document && registrationsByDocumentData
      ? registrationsByDocumentData
      : data || [];

  return (
    <S.Container>
      <SearchBar
        onSearch={(document: string) => handleSearchByDocument(document)}
        onRefetch={handleRefetchAll}
      />
      <Columns registrations={registrations || []} />
    </S.Container>
  );
};
export default DashboardPage;
