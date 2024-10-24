import { Registration } from "~/models/registration";

export const mockRegistrations: Registration[] = [
  {
    id: "1",
    admissionDate: "15/12/2023",
    email: "john.doe@example.com",
    employeeName: "John Doe",
    status: "APPROVED",
    cpf: "123.456.789-00",
  },
  {
    id: "2",
    admissionDate: "28/10/2024",
    email: "jane.doe@example.com",
    employeeName: "Jane Doe",
    status: "REVIEW",
    cpf: "987.654.321-00",
  },
  {
    id: "3",
    admissionDate: "10/03/2024",
    email: "alice.smith@example.com",
    employeeName: "Alice Smith",
    status: "REPROVED",
    cpf: "111.222.333-44",
  },
];
