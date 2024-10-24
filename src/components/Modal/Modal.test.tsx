import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import Modal from ".";

describe("Modal", () => {
  it("should show modal with message and buttons", () => {
    const mockOnClose = jest.fn();
    const mockOnConfirm = jest.fn();
    const message = "Tem certeza que deseja excluir?";
    render(
      <Modal
        isOpen
        message={message}
        onClose={mockOnClose}
        onConfirm={mockOnConfirm}
      />
    );
    expect(screen.getByText(message)).toBeInTheDocument();
    expect(screen.getByText("Confirmação")).toBeInTheDocument();
    expect(
      screen.getByRole("button", { name: "Confirmar" })
    ).toBeInTheDocument();
    expect(
      screen.getByRole("button", { name: "Cancelar" })
    ).toBeInTheDocument();
  });

  it("should call confirm and cancel actions buttons", async () => {
    const mockOnClose = jest.fn();
    const mockOnConfirm = jest.fn();
    const message = "Tem certeza que deseja excluir?";
    render(
      <Modal
        isOpen
        message={message}
        onClose={mockOnClose}
        onConfirm={mockOnConfirm}
      />
    );
    const confirmButton = screen.getByRole("button", { name: "Confirmar" });
    const cancelButton = screen.getByRole("button", { name: "Cancelar" });
    await userEvent.click(confirmButton)
    await userEvent.click(cancelButton)

    expect(mockOnClose).toHaveBeenCalled()
    expect(mockOnConfirm).toHaveBeenCalled()

  });
});
