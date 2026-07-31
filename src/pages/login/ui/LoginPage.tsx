import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { useLocation, useNavigate } from "react-router-dom";
import * as z from "zod";

import { useAuth } from "features/authRouting";

import { useAuthLoginMutation } from "shared/api";

import { loginSchema } from "../model/loginSchema";

import styles from "./LoginPage.module.css";

type LoginFormValues = z.infer<typeof loginSchema>;

interface LocationState {
  from?: {
    pathname: string;
  };
}

export const LoginPage = () => {
  const [authLogin] = useAuthLoginMutation();
  const { login } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const [serverError, setServerError] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormValues>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const state = location.state as LocationState | null;
  const fromPage = state?.from?.pathname ?? "/profile";

  const onSubmit = async (values: LoginFormValues) => {
    setServerError(null);
    setIsSubmitting(true);

    try {
      const response = await authLogin(values);

      if ("data" in response && response.data) {
        login(response.data.accessToken, response.data.user);
        void navigate(fromPage, { replace: true });
      } else if ("error" in response && response.error) {
        alert("Неверный email или password");
      }
    } catch (err) {
      if (err && typeof err === "object" && "data" in err) {
        const errorData = err.data as { message?: string };
        setServerError(errorData.message ?? "Неверный логин или пароль");
      } else if (err instanceof Error) {
        setServerError(err.message);
      } else {
        setServerError("Произошла ошибка при входе");
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className={styles.wrap}>
      <h2>Вход в систему</h2>

      {serverError && <p className={styles.error}>{serverError}</p>}

      <form
        onSubmit={(e) => {
          void handleSubmit(onSubmit)(e);
        }}
      >
        <div className={styles.email}>
          <label htmlFor="email" className={styles.fieldWrap}>
            <span>Email:</span>
            <input
              id="email"
              type="email"
              disabled={isSubmitting}
              className={styles.field}
              {...register("email")}
            />
          </label>
          {errors.email && (
            <p className={styles.fieldError}>{errors.email.message}</p>
          )}
        </div>

        <div className={styles.password}>
          <label htmlFor="password" className={styles.fieldWrap}>
            <span>Пароль:</span>
            <input
              id="password"
              type="password"
              disabled={isSubmitting}
              className={styles.field}
              {...register("password")}
            />
          </label>
          {errors.password && (
            <p className={styles.fieldError}>{errors.password.message}</p>
          )}
        </div>

        <button type="submit" disabled={isSubmitting} className={styles.btn}>
          {isSubmitting ? "Вход..." : "Войти"}
        </button>
      </form>
    </div>
  );
};
