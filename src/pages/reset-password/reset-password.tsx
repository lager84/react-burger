import { useCallback, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { useFormCallback } from "../../utils/use-form-callback";
import { getAuth } from "../../services/selectors";
import { authResetPasswordAction } from "../../services/actions/auth";
import { URL_FORGOT_PASSWORD, URL_LOGIN } from "../../utils/routes";
import {
  Input,
  PasswordInput,
  Button,
} from "@ya.praktikum/react-developer-burger-ui-components";
import Loader from "../../components/loader/Loader";
import { TResetPassword } from '../../utils/api';

type TState = TResetPassword & {
  wasSubmit?: boolean;
};


function ResetPassword() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const submitCallback = useCallback(
    (state:TState) => {
      dispatch(authResetPasswordAction(state, () => navigate(URL_LOGIN)) as any);
    },
    [dispatch, navigate]
  );

  const { state, onChange, onSubmit } = useFormCallback<TState>(
    {
      password: "",
      token: "",
    },
    submitCallback
  );

  const { requestStart, forgotPassword } = useSelector(getAuth);

  useEffect(() => {
    if (!forgotPassword) {
      navigate(URL_FORGOT_PASSWORD);
    }
  }, [forgotPassword, navigate]);

  return (
    <main className="page-container">
      <form className="page-container-inner" onSubmit={onSubmit}>
        <h1 className="text text_type_main-medium mb-6">
          Восстановление пароля
        </h1>
        <PasswordInput
          placeholder="Введите новый пароль"
          name="password"
          value={state.password}
          onChange={onChange}
          extraClass="mb-6"
        />
        <Input
          placeholder="Введите код из письма"
          name="token"
          value={state.token}
          onChange={onChange}
          extraClass="mb-6"
        />
        {requestStart ? (
          <Loader />
        ) : (
          <Button
            type="primary"
            extraClass="mb-20"
            htmlType="submit"
            disabled={state.password === "" || state.token === ""}
          >
            Сохранить
          </Button>
        )}
        <p className="text text_type_main-default text_color_inactive">
          Вспомнили пароль?{" "}
          <Link className="page-link" to={URL_LOGIN}>
            Войти
          </Link>
        </p>
      </form>
    </main>
  );
}

export default ResetPassword;
