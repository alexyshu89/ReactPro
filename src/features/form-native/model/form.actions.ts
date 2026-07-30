import { schema } from "./types";
import type { FormState } from "./types";

export const initialFormState: FormState = {
  success: false,
  errors: {},
  message: null,
};

export async function submitFormAction(
  _prevState: FormState,
  formData: FormData,
): Promise<FormState> {
  await new Promise((resolve) => setTimeout(resolve, 2000));

  const rawData = {
    email: formData.get("email"),
    confirmSubscription: formData.get("confirmSubscription") === "on",
  };

  const validatedFields = schema.safeParse(rawData);

  if (!validatedFields.success) {
    const fieldErrors: Record<string, string> = {};
    validatedFields.error.issues.forEach((issue) => {
      if (issue.path[0]) fieldErrors[issue.path[0].toString()] = issue.message;
    });

    return {
      success: false,
      errors: fieldErrors,
      message: "Пожалуйста, исправьте ошибки в форме",
    };
  }

  return {
    success: true,
    errors: {},
    message: `Подписка выполнена успешно!`,
  };
}
