import * as S from "./styles";

export default function Loading(): JSX.Element {
  return (
    <S.Loading aria-live="polite" aria-atomic>
      <S.SquareSpin tabIndex={-1}>
        <S.Spin tabIndex={-1}>
          <p>Carregando</p>
        </S.Spin>
      </S.SquareSpin>
    </S.Loading>
  );
}
