type RegistrationStatus = "APROVED" | "REVIEW" | "REPROVED";

export interface Registration {
  id: string;
  admissionDate: string;
  email: string;
  employeeName: string;
  status: RegistrationStatus;
  cpf: string;
}