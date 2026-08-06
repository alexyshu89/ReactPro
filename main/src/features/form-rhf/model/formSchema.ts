import { z } from "zod";

export const formSchema = z
  .object({
    username: z
      .string()
      .min(1, "Имя пользователя обязательно")
      .regex(/^[\p{L}\s-]+$/u, {
        message: "Имя должно содержать только буквы",
      }),
    email: z
      .string()
      .min(1, "Email обязателен")
      .refine((val) => val.includes("@"), {
        message: "Некорректный формат email (должен содержать @)",
      }),
    password: z.string().min(6, "Пароль должен быть не менее 6 символов"),
    confirmPassword: z.string().min(1, "Подтверждение пароля обязательно"),
    socialLinks: z.array(
      z.object({
        url: z.string().min(1, "Ссылка обязательна").url("Некорректный URL"),
      }),
    ),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Пароли не совпадают",
    path: ["confirmPassword"],
  });

export type FormValues = z.infer<typeof formSchema>;

export const defaultValues = {
  username: "",
  email: "",
  password: "",
  confirmPassword: "",
  socialLinks: [{ url: "" }],
};
