import { useEffect, useState } from "react";
import AuthLoginForm from "./AuthLoginForm/AuthLoginForm";
import { loginUser } from "../../../Common/Services/AuthService";
import { useHistory } from "react-router-dom";
const AuthLogin = () => {
  const history = useHistory();

  const [user, setUser] = useState({
    username: "",
    password: "",
  });

  const [add, setAdd] = useState(false);

  // useEffect that run when changes are made to the state variable flags
  useEffect(() => {
    if (user && add) {
      loginUser(user).then((userLoggedIn) => {
        if (userLoggedIn) {
          console.log(
            `${userLoggedIn.get("username")} successfully logged in!`
          );
          let path = "/home-auth";
          console.log(path);
          history.push(path);
        }
      });
      // TODO: redirect user to main app
      setAdd(false);
    }
  }, [user, add, history]);

  const onChangeHandler = (e) => {
    e.preventDefault();
    const { name, value: newValue } = e.target;
    setUser({
      ...user,
      [name]: newValue,
    });
  };

  const onSubmitHandler = (e) => {
    e.preventDefault();
    setAdd(true);
  };

  return (
    <AuthLoginForm
      user={user}
      onChange={onChangeHandler}
      onSubmit={onSubmitHandler}
    />
  );
};

export default AuthLogin;
