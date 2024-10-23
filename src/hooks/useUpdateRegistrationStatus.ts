import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateRegistration } from "~/api/registrations";
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
    }) => updateRegistration(id, updatedData),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["registrations"] });
      queryClient.invalidateQueries({ queryKey: ["registrationsByDocument"] });
    },

  });
}
