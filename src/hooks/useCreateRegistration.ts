import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createRegistration } from "~/api/registrations";
import { Registration } from "~/models/registration";

export function useCreateRegistration() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ updatedData }: { updatedData: Registration }) =>
      createRegistration(updatedData),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["registrations"] });
      queryClient.invalidateQueries({ queryKey: ["registrationsByDocument"] });
    },
  });
}
