import { z } from "zod";

export const schema = z.object({
  email: z
    .string()
    .min(1, "Email обязателен")
    .email("Некорректный формат email"),
  confirmSubscription: z.literal(true, {
    message: "Необходимо подтвердить подписку",
  }),
});

export type FormFieldsValues = z.infer<typeof schema>;

export interface FormState {
  success: boolean;
  errors: Partial<Record<keyof FormFieldsValues, string>>;
  message: string | null;
}
