import { useMutation, useQueryClient } from "@tanstack/react-query";
import { upgradeRegistration } from "~/api/registrations";
import { Registration } from "~/models/registration";

export function useUpdateRegistrationStatus() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({
      id,
      updatedData,
    }: {
      id: string;
      updatedData: Registration;
    }) => upgradeRegistration(id, updatedData),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["registrations"] });
      queryClient.invalidateQueries({ queryKey: ["registrationsByDocument"] });
    },
    onError: (error) => {
      console.error("Erro ao atualizar o registro:", error);
    },
  });
}
