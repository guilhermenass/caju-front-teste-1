import { forwardRef, InputHTMLAttributes } from "react";
import * as S from './styles'

type TextFieldProps = {
  label?: string;
  error?: string;
} & InputHTMLAttributes<any>;

const TextField = forwardRef<HTMLInputElement, TextFieldProps>((props, ref) => {
  return (
    <div>
      <label htmlFor={props.id}>{props.label}</label>
      <S.Input {...props} ref={ref} />
      {props.error && (
        <S.ErrorMessage>{props.error}</S.ErrorMessage>
      )}
    </div>
  );
});

export default TextField;
