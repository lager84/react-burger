import { useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import {
  authForgotPasswordAction,
  AUTH_CLEAR_ERRORS,
} from "../../services/actions/auth";
import { URL_LOGIN, URL_RESET_PASSWORD } from "../../utils/routes";
import { useFormCallback } from "../../utils/use-form-callback";
import { getAuth } from "../../services/selectors";
import {
  EmailInput,
  Button,
} from "@ya.praktikum/react-developer-burger-ui-components";

function ForgotPassword() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const submitCallback = useCallback(
    (state) => {
      dispatch(
        authForgotPasswordAction(state, () => navigate(URL_RESET_PASSWORD))
      );
    },
    [dispatch, navigate]
  );

  const { state, onChange, onSubmit } = useFormCallback(
    {
      email: "",
    },
    submitCallback
  );

  const { requestError } = useSelector(getAuth);

  if (requestError) {
    alert(`[Восстановление пароля] ${requestError}`);
    dispatch({ type: AUTH_CLEAR_ERRORS });
  }

  return (
    <main className="page-container">
      <form className="page-container-inner" onSubmit={onSubmit}>
        <>
          <h1 className="text text_type_main-medium mb-6">
            Восстановление пароля
          </h1>
          <EmailInput
            extraClass="mb-6"
            placeholder="Укажите e-mail"
            name="email"
            value={state.email}
            onChange={onChange}
          />
          <Button
            type="primary"
            extraClass="mb-20"
            htmlType="submit"
            disabled={state.email === ""}
          >
            Восстановить
          </Button>
          <p className="text text_type_main-default text_color_inactive">
            Вспомнили пароль?{" "}
            <Link className="page-link" to={URL_LOGIN}>
              Войти
            </Link>
          </p>
        </>
      </form>
    </main>
  );
}

export default ForgotPassword;
