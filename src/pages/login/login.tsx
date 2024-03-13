import { useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import {
  EmailInput,
  PasswordInput,
  Button,
} from "@ya.praktikum/react-developer-burger-ui-components";
import { useFormCallback } from "../../utils/use-form-callback";
import { getAuth } from "../../services/selectors";
import {
  authLoginAction,
  authGetUserAction,
} from "../../services/actions/auth";
import { URL_FORGOT_PASSWORD, URL_REGISTER } from "../../utils/routes";
import { TLoginUser } from '../../utils/api';


type TState = TLoginUser & {
  wasSubmit?: boolean;
};

function Login() {
  const dispatch = useDispatch();

  const submitCallback = useCallback(
    (state:TState) => {
      dispatch(authLoginAction(state) as any);
    },
    [dispatch]
  );

  const { state, onChange, onSubmit } = useFormCallback(
    {
      email: "",
      password: "",
    },
    submitCallback
  );

  const { userLoggedIn } = useSelector(getAuth);

  if (userLoggedIn) {
    dispatch(authGetUserAction() as any);
  }

  return (
    <main className="page-container">
      <form className="page-container-inner" onSubmit={onSubmit}>
        <>
          <h1 className="text text_type_main-medium mb-6">Вход</h1>
          <EmailInput
            extraClass="mb-6"
            name="email"
            value={state.email}
            onChange={onChange}
          />
          <PasswordInput
            extraClass="mb-6"
            name="password"
            value={state.password}
            onChange={onChange}
          />
          <Button
            type="primary"
            extraClass="mb-20"
            htmlType="submit"
            disabled={state.email === "" || state.password === ""}
          >
            Войти
          </Button>
          <p className="text text_type_main-default text_color_inactive mb-4">
            Вы — новый пользователь?{" "}
            <Link className="page-link" to={URL_REGISTER}>
              Зарегистрироваться
            </Link>
          </p>
          <p className="text text_type_main-default text_color_inactive">
            Забыли пароль?{" "}
            <Link className="page-link" to={URL_FORGOT_PASSWORD}>
              Восстановить пароль
            </Link>
          </p>
        </>
      </form>
    </main>
  );
}

export default Login;
