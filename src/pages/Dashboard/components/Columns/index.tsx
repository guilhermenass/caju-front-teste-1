import * as S from "./styles";
import RegistrationCard from "../RegistrationCard";
import { Registration } from "~/models/registration";

const allColumns = [
  { status: "REVIEW", title: "Pronto para revisar" },
  { status: "APPROVED", title: "Aprovado" },
  { status: "REPROVED", title: "Reprovado" },
];

type ColumnsProps = {
  registrations: Registration[];
};
const Columns = ({ registrations }: ColumnsProps) => {

  return (
    <S.Container>
      {allColumns.map((column) => {
        const filteredRegistrations = registrations.filter(
          (registration) => registration.status === column.status
        );
        return (
          <S.Column status={column.status} key={column.title}>
            <>
              <S.TitleColumn status={column.status}>
                {column.title}
              </S.TitleColumn>
              <S.ColumnContent>
                {filteredRegistrations.length > 0 ? (
                  filteredRegistrations.map((registration) => (
                    <RegistrationCard
                      data={registration}
                      key={registration.id}
                    />
                  ))
                ) : (
                  <S.EmptyState>Não há registros neste status.</S.EmptyState>
                )}
              </S.ColumnContent>
            </>
          </S.Column>
        );
      })}
    </S.Container>
  );
};
export default Columns;
