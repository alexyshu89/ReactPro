import { zodResolver } from "@hookform/resolvers/zod";
import { useForm, useFieldArray } from "react-hook-form";

import {
  defaultValues,
  formSchema,
  type FormValues,
} from "../model/formSchema";

import styles from "./RhfForm.module.css";

export const RhfForm = () => {
  const {
    register,
    control,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    mode: "onChange",
    defaultValues,
  });

  const { fields, append, remove } = useFieldArray({
    control,
    name: "socialLinks",
  });

  const onSubmit = (data: FormValues) => {
    console.log(data);
    alert("Регистрация прошла успешно!");
    reset();
  };

  return (
    <div className={styles.rhf}>
      <h2>React Hook Form</h2>
      <div className={styles.wrap}>
        <h3>Регистрация</h3>

        <form onSubmit={(e) => void handleSubmit(onSubmit)(e)} noValidate>
          <div className={styles.formItem}>
            <label>
              <span className={styles.fieldName}>Имя пользователя:</span>
              <input
                className={styles.field}
                type="text"
                {...register("username")}
                placeholder="Иванов Иван"
              />
            </label>
            {errors.username && (
              <p className={styles.errorMessage}>{errors.username.message}</p>
            )}
          </div>

          <div className={styles.formItem}>
            <label>
              <span className={styles.fieldName}>Email:</span>
              <input
                className={styles.field}
                type="email"
                {...register("email")}
                placeholder="example@mail.com"
              />
            </label>
            {errors.email && (
              <p className={styles.errorMessage}>{errors.email.message}</p>
            )}
          </div>

          <div className={styles.formItem}>
            <label>
              <span className={styles.fieldName}>Пароль:</span>
              <input
                className={styles.field}
                type="password"
                {...register("password")}
              />
            </label>
            {errors.password && (
              <p className={styles.errorMessage}>{errors.password.message}</p>
            )}
          </div>

          <div className={styles.formItem}>
            <label>
              <span className={styles.fieldName}>Подтверждение пароля:</span>
              <input
                className={styles.field}
                type="password"
                {...register("confirmPassword")}
              />
            </label>
            {errors.confirmPassword && (
              <p className={styles.errorMessage}>
                {errors.confirmPassword.message}
              </p>
            )}
          </div>

          <div className={styles.formItem}>
            <span className={styles.fieldName}>Социальные сети:</span>
            {fields.map((item, index) => (
              <div key={item.id} className={styles.linksWrap}>
                <div className={styles.linkWrap}>
                  <input
                    type="text"
                    placeholder="https://github.com"
                    {...register(`socialLinks.${index}.url`)}
                    className={styles.linkField}
                  />

                  <button
                    className={
                      fields.length === 1
                        ? styles.removeBtnDisabled
                        : styles.removeBtn
                    }
                    type="button"
                    onClick={() => remove(index)}
                    disabled={fields.length === 1}
                  >
                    Удалить
                  </button>
                </div>
                {errors.socialLinks?.[index]?.url && (
                  <p className={styles.errorMessage}>
                    {errors.socialLinks[index].url.message}
                  </p>
                )}
              </div>
            ))}

            <button
              className={styles.appendBtn}
              type="button"
              onClick={() => append({ url: "" })}
            >
              + Добавить ссылку
            </button>
          </div>

          <button
            className={styles.submitBtn}
            type="submit"
            disabled={isSubmitting}
          >
            {isSubmitting ? "Отправка..." : "Зарегистрироваться"}
          </button>
        </form>
      </div>
    </div>
  );
};
