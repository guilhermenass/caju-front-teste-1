import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { act, render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { mockRegistrations } from "~/api/mocks/registrations-mock";
import { useAllRegistrations } from "~/hooks/useAllRegistrations";
import { useRegistrationsByDocument } from "~/hooks/useRegistrationsByDocument";
import Dashboard from ".";

jest.mock("~/hooks/useAllRegistrations");
jest.mock("~/hooks/useRegistrationsByDocument");

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

const renderWithClientProvider = () => {
  return render(
    <QueryClientProvider client={queryClient}>
      <Dashboard />
    </QueryClientProvider>
  );
};

describe("DashboardPage", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("should render loading component", () => {
    (useAllRegistrations as jest.Mock).mockReturnValue({
      data: mockRegistrations,
      isLoading: true,
      refetch: jest.fn(),
    });

    (useRegistrationsByDocument as jest.Mock).mockReturnValue({
      data: [],
      isLoading: false,
      refetch: jest.fn(),
    });
    renderWithClientProvider();
    expect(screen.getByText('Carregando')).toBeInTheDocument()
  });

  it("should render registrations after loading", async () => {
    (useAllRegistrations as jest.Mock).mockReturnValue({
      data: mockRegistrations,
      isLoading: false,
      refetch: jest.fn(),
    });

    (useRegistrationsByDocument as jest.Mock).mockReturnValue({
      data: [],
      isLoading: false,
      refetch: jest.fn(),
    });

    renderWithClientProvider();

    await waitFor(() => {
      expect(screen.getByText("John Doe")).toBeInTheDocument();
      expect(screen.getByText("john.doe@example.com")).toBeInTheDocument();
      expect(screen.getByText("15/12/2023")).toBeInTheDocument();
      expect(screen.getByText("Aprovado")).toBeInTheDocument();

      expect(screen.getByText("Jane Doe")).toBeInTheDocument();
      expect(screen.getByText("jane.doe@example.com")).toBeInTheDocument();
      expect(screen.getByText("28/10/2024")).toBeInTheDocument();
      expect(screen.getByText("Pronto para revisar")).toBeInTheDocument();

      expect(screen.getByText("Alice Smith")).toBeInTheDocument();
      expect(screen.getByText("alice.smith@example.com")).toBeInTheDocument();
      expect(screen.getByText("10/03/2024")).toBeInTheDocument();
      expect(screen.getByText("Reprovar")).toBeInTheDocument();
    });
  });

  it("should search registrations by document number", async () => {
    (useAllRegistrations as jest.Mock).mockReturnValue({
      data: mockRegistrations,
      isLoading: false,
      refetch: jest.fn(),
    });

    (useRegistrationsByDocument as jest.Mock).mockReturnValue({
      data: [mockRegistrations[0]],
      isLoading: false,
    });

    const { admissionDate, email, employeeName } = mockRegistrations[0];

    renderWithClientProvider();

    const searchInput = await screen.findByPlaceholderText(
      "Digite um CPF válido"
    );
    await act(async () => {
      await userEvent.type(searchInput, "10053774990");
    });

    await waitFor(() => {
      expect(screen.getByText(employeeName)).toBeInTheDocument();
      expect(screen.getByText(admissionDate)).toBeInTheDocument();
      expect(screen.getByText(email)).toBeInTheDocument();
    });
  });

  it("should refetch all registrations when refetch button is clicked", async () => {
    const refetchMock = jest.fn();

    (useAllRegistrations as jest.Mock).mockReturnValue({
      data: mockRegistrations,
      isLoading: false,
      refetch: refetchMock,
    });

    (useRegistrationsByDocument as jest.Mock).mockReturnValue({
      data: [],
      isLoading: false,
      refetch: refetchMock,
    });

    renderWithClientProvider();

    const refetchButton = screen.getByRole("button", { name: /refetch/i });
    await userEvent.click(refetchButton);

    expect(refetchMock).toHaveBeenCalled();
  });
});
