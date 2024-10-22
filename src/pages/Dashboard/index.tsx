import Collumns from "./components/Columns";
import * as S from "./styles";
import { SearchBar } from "./components/Searchbar";
import { useRegistrations } from "~/hooks/useRegistrations";

const DashboardPage = () => {
  const { data, isLoading } = useRegistrations();

  async function handleSearchByDocument(document?: string): Promise<void> {
    // await fetchData(document)
  }

  if (isLoading) {
    return <h1>loading...</h1>
  }

  return (
    <S.Container>
      <SearchBar onSearch={(document?: string) => handleSearchByDocument(document)} />
      <Collumns registrations={data || []} />
    </S.Container>
  );
};
export default DashboardPage;
