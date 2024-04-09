import { useCallback } from "react";
import { useDispatch, useSelector } from "../../hooks/redux";
import { Link, useNavigate } from "react-router-dom";
import { useFormCallback } from "../../utils/use-form-callback";
import { getAuth } from "../../services/selectors";
import {
  authRegisterAction,
  AUTH_CLEAR_ERRORS,
} from "../../services/actions/auth";
import { URL_LOGIN } from "../../utils/routes";
import {
  Input,
  EmailInput,
  PasswordInput,
  Button,
} from "@ya.praktikum/react-developer-burger-ui-components";
import Loader from "../../components/loader/Loader";

import { TRegisterUser } from '../../utils/api';

type TState = TRegisterUser & {
    wasSubmit?: boolean;
}

function Register() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const submitCallback = useCallback(
    (state:TState) => {
      dispatch(authRegisterAction(state, () => navigate(URL_LOGIN))as any);
    },
    [dispatch, navigate]
  );

  const { state, onChange, onSubmit } = useFormCallback(
    {
      name: "",
      email: "",
      password: "",
      accessToken:"",
      refreshToken:""
    },
    submitCallback
  );

  const { requestStart, requestError, userLoggedIn } = useSelector(getAuth);

  if (requestError) {
    alert(`[Регистрация] ${requestError}`);
    dispatch({ type: AUTH_CLEAR_ERRORS , message:"" });
  }

  return (
    <main className="page-container">
      <form className="page-container-inner" onSubmit={onSubmit}>
        {requestStart || userLoggedIn ? (
          <Loader />
        ) : (
          <>
            <h1 className="text text_type_main-medium mb-6">Регистрация</h1>
            <Input
              placeholder="Имя"
              extraClass="mb-6"
              name="name"
              value={state.name}
              onChange={onChange}
            />
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
            {requestStart ? (
              <Loader />
            ) : (
              <Button
                type="primary"
                extraClass="mb-20"
                htmlType="submit"
                disabled={
                  state.name === "" ||
                  state.email === "" ||
                  state.password === ""
                }
              >
                Зарегистрироваться
              </Button>
            )}
            <p className="text text_type_main-default text_color_inactive mb-4">
              Уже зарегистрированы?{" "}
              <Link className="page-link" to={URL_LOGIN}>
                Войти
              </Link>
            </p>
          </>
        )}
      </form>
    </main>
  );
}

export default Register;
