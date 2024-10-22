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

export async function upgradeRegistration(
  id: string,
  payload: Registration
): Promise<Registration> {
  const url = `/registrations/${id}`
  const response = await instance.put<Registration>(url, payload);
  return response.data;
}

export async function deleteRegistration(id: string): Promise<Registration> {
  const response = await instance.delete(`/registrations/${id}`);
  return response.data;
}
