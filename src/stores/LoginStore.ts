import { observable } from "mobx";
import { createContext, useContext } from "react";

export const loginData = observable({ email: "mail@", password: "" });

export const LoginStoreContext = createContext(loginData);

export const useLoginStoreContext = () => useContext(LoginStoreContext);
