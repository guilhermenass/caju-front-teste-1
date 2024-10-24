import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createRegistration } from "~/api/registrations";
import { CreateRegistrationRequest } from "~/models/registration";

export function useCreateRegistration() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ payload }: { payload: CreateRegistrationRequest }) =>
      createRegistration(payload),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["registrations"] });
    },
  });
}
