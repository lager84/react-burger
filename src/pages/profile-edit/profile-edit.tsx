import { useCallback, useEffect } from "react";
import { useDispatch, useSelector } from "../../hooks/redux";
import { useNavigate } from "react-router-dom";
import { useFormCallback } from "../../utils/use-form-callback";
import { getAuth } from "../../services/selectors";
import {
  authPatchUserAction,
  AUTH_CLEAR_ERRORS,
} from "../../services/actions/auth";
import {
  Input,
  EmailInput,
  PasswordInput,
  Button,
} from "@ya.praktikum/react-developer-burger-ui-components";
import Loader from "../../components/loader/Loader";
import { TPatchUser } from '../../utils/api';

type TState = TPatchUser & {
  wasSubmit?: boolean;
};


function ProfileEdit() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const submitCallback = useCallback(
    (state:TState) => {
      dispatch(authPatchUserAction(state)  as any);
    },
    [dispatch]
  );

  const { requestStart, requestError, requestSuccess, user } =
    useSelector(getAuth);

  const { state, setState, onChange, onSubmit } = useFormCallback(
    {
      name: "",
      email: "",
      password: "",
    },
    submitCallback
  );

  const changeValue =
    user?.name !== "" &&
    (state.name !== user?.name ||
      state.email !== user.email ||
      state.password.length > 0);

  const onReset = useCallback(
    (e:React.FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      if (!user) return;
      setState({ name: user.name, email: user.email, password: "" });
    },
    [setState, user]
  );

  useEffect(() => {
    if (requestError) {
      alert(`[Профиль сохранение] ${requestError}`);
      dispatch({ type: AUTH_CLEAR_ERRORS , message:"" });
    } else if (user) {
      setState({ name: user.name, email: user.email, password: "" });
    }
  }, [dispatch, setState, user, navigate, requestError, requestSuccess]);

  return (
    <form
      className="page-container-inner"
      onSubmit={onSubmit}
      onReset={onReset}
    >
      <Input
        extraClass="mb-6"
        name="name"
        placeholder="Имя"
        value={state.name}
        onChange={onChange}
        icon="EditIcon"
      />
      <EmailInput
        extraClass="mb-6"
        name="email"
        value={state.email}
        onChange={onChange}
        isIcon
      />
      <PasswordInput
        extraClass="mb-6"
        name="password"
        value={state.password}
        onChange={onChange}
        icon="EditIcon"
      />
      {requestStart ? (
        <Loader />
      ) : changeValue ? (
        <div>
          <Button type="primary" htmlType="reset">
            Отмена
          </Button>
          <Button type="primary" extraClass="ml-5" htmlType="submit">
            Сохранить
          </Button>
        </div>
      ) : undefined}
    </form>
  );
}

export default ProfileEdit;
