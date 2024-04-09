import { TypedUseSelectorHook, useDispatch as useDispatchRedux, useSelector as useSelectorRedux } from "react-redux";
import { AppDispatch, RootState } from "../utils/type";

export const useDispatch = () => useDispatchRedux<AppDispatch>();

export const useSelector: TypedUseSelectorHook<RootState> = useSelectorRedux;