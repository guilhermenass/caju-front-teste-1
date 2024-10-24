import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { useCreateRegistration } from "~/hooks/useCreateRegistration";
import RegisterAdmission from ".";
import { toast } from "react-toastify";
import routes from "~/router/routes";

jest.mock("~/hooks/useCreateRegistration");

const mockHistoryPush = jest.fn();
const queryClient = new QueryClient();
const mockUseLocationValue = {
  pathname: "/",
  search: "",
  hash: "",
  state: null,
};

jest.mock("react-router-dom", () => ({
  __esModule: true,
  ...jest.requireActual("react-router-dom"),
  useLocation: () => mockUseLocationValue,
  useHistory: () => ({ push: mockHistoryPush }),
}));

jest.mock("react-toastify", () => ({
  toast: {
    success: jest.fn(),
    error: jest.fn(),
  },
}));

const renderWithClientProvider = () => {
  return render(
    <QueryClientProvider client={queryClient}>
      <RegisterAdmission />
    </QueryClientProvider>
  );
};

describe("RegisterUserPage", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("should register new admission", async () => {
    const mockMutate = jest.fn((_, { onSuccess }) => {
      if (onSuccess) onSuccess();
    });

    (useCreateRegistration as jest.Mock).mockReturnValue({
      isPending: false,
      mutate: mockMutate,
    });

    renderWithClientProvider();

    expect(screen.getByText("Nome completo")).toBeInTheDocument();
    expect(screen.getByText("Email")).toBeInTheDocument();
    expect(screen.getByText("CPF")).toBeInTheDocument();
    expect(screen.getByText("Data de admissão")).toBeInTheDocument();

    await userEvent.type(
      screen.getByPlaceholderText("Nome completo"),
      "Pedro Silva"
    );
    await userEvent.type(
      screen.getByPlaceholderText("exemplo@dominio.com"),
      "pedro.silva@caju.com.br"
    );
    await userEvent.type(
      screen.getByPlaceholderText("Digite um CPF válido"),
      "29719577053"
    );
    await userEvent.type(screen.getByTestId("admission-date"), "2024-11-10");

    await userEvent.click(screen.getByRole("button", { name: "Cadastrar" }));

    await waitFor(() => {
      expect(toast.success).toHaveBeenCalledWith(
        "Usuário cadastrado com sucesso."
      );
      expect(mockHistoryPush).toHaveBeenCalledWith(routes.dashboard);
    });
  });

  it("should render erro message when register fails", async () => {
    const mockMutate = jest.fn((_, { onError }) => {
      if (onError) onError(new Error("Ocorreu um erro ao tentar cadastrar um novo usuário.")); // Simula um erro na mutação
    });

    (useCreateRegistration as jest.Mock).mockReturnValue({
      isPending: false,
      mutate: mockMutate,
    });

    renderWithClientProvider();

    expect(screen.getByText("Nome completo")).toBeInTheDocument();
    expect(screen.getByText("Email")).toBeInTheDocument();
    expect(screen.getByText("CPF")).toBeInTheDocument();
    expect(screen.getByText("Data de admissão")).toBeInTheDocument();

    await userEvent.type(
      screen.getByPlaceholderText("Nome completo"),
      "Pedro Silva"
    );
    await userEvent.type(
      screen.getByPlaceholderText("exemplo@dominio.com"),
      "pedro.silva@caju.com.br"
    );
    await userEvent.type(
      screen.getByPlaceholderText("Digite um CPF válido"),
      "29719577053"
    );
    await userEvent.type(screen.getByTestId("admission-date"), "2024-11-10");

    await userEvent.click(screen.getByRole("button", { name: "Cadastrar" }));

    await waitFor(() => {
      expect(toast.error).toHaveBeenCalledWith(
        "Ocorreu um erro ao tentar cadastrar um novo usuário."
      );
      expect(mockHistoryPush).not.toHaveBeenCalledWith(routes.dashboard);
    });
  });
});
