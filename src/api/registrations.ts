import { Registration } from "~/models/registration";
import instance from "./axios";

const BASE_URL = '/registrations'

export async function fetchAllRegistrations(): Promise<Registration[]> {
  const response = await instance.get<Registration[]>(BASE_URL);
  return response.data;
}

export async function fetchRegistrationsByDocument(
  document: string
): Promise<Registration[]> {
  const response = await instance.get<Registration[]>(
    `${BASE_URL}?cpf=${document}`
  );
  return response.data;
}

export async function updateRegistration(
  id: string,
  payload: Registration
): Promise<Registration> {
  const url = `${BASE_URL}/${id}`
  const response = await instance.put<Registration>(url, payload);
  return response.data;
}

export async function deleteRegistration(id: string): Promise<Registration> {
  const response = await instance.delete(`${BASE_URL}/${id}`);
  return response.data;
}

export async function createRegistration(payload: Registration): Promise<Registration> {
  const response = await instance.post(BASE_URL, payload)
  return response.data
}