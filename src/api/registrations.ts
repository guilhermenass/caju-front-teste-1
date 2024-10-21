import { Registration } from "~/models/registration";
import instance from "./axios";

export async function fetchAllRegistrations(): Promise<Registration[]> {
  const response = await instance.get<Registration[]>("/registrations");
  return response.data;
}

export async function fetchRegistrationsByDocument(
  document: string
): Promise<Registration[]> {
  const response = await instance.get<Registration[]>(
    `/registrations?cpf=${document}`
  );
  return response.data;
}
