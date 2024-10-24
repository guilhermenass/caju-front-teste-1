import userEvent from "@testing-library/user-event";
import TextField from ".";
import { render, screen } from "@testing-library/react";

describe("TextField", () => {
  it("should render the label and input", () => {
    render(<TextField label="Nome" id="name" />);
    expect(screen.getByLabelText("Nome")).toBeInTheDocument();
  });

  it("should render the error message when error prop is passed", () => {
    render(<TextField label="Nome" id="name" error="Campo obrigatório" />);
    expect(screen.getByText("Campo obrigatório")).toBeInTheDocument();
  });

  it("should not render the error message when error prop is not passed", () => {
    render(<TextField label="Nome" id="name" />);
    expect(screen.queryByText("Campo obrigatório")).not.toBeInTheDocument();
  });

  it("should call onChange when typing in the input", async () => {
    const handleChange = jest.fn();
    render(<TextField label="Nome" id="name" onChange={handleChange} />);

    const input = screen.getByLabelText("Nome");
    await userEvent.type(input, "John Doe");
    expect(handleChange).toHaveBeenCalledTimes(8); // 8 caracteres digitados
  });

  it("should forward the ref to the input element", () => {
    const ref = { current: null };
    render(<TextField label="Nome" id="name" ref={ref} />);
    expect(ref.current).toBeInstanceOf(HTMLInputElement);
  });
});
