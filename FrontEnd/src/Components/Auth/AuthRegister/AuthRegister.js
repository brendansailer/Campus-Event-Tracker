import { useEffect, useState } from "react";
import AuthRegisterForm from "./AuthRegisterForm/AuthRegisterForm";
import { createUser } from "../../../Common/Services/AuthService";
import { useHistory } from "react-router";

const AuthRegister = () => {
  const history = useHistory();

  const [newUser, setNewUser] = useState({
    firstName: "",
    lastName: "",
    email: "",
    username: "",
    password: "",
  });

  // flags in the state to watch for add/remove updates
  const [add, setAdd] = useState(false);

  // useEffect that run when changes are made to the state variable flags
  useEffect(() => {
    if (newUser && add) {
      createUser(newUser).then((userCreated) => {
        if (userCreated) {
          // console.log(
          //   `${userCreated.get("firstName")}, you successfully registered.`
          // );
          // console.log(userCreated);
          history.push("/home-auth");
        }
      });
    }
    setAdd(false);
  }, [newUser, add, history]);

  const onChangeHandler = (e) => {
    e.preventDefault();
    const { name, value: newValue } = e.target;
    setNewUser({
      ...newUser,
      [name]: newValue,
    });
  };

  const onSubmitHandler = (e) => {
    e.preventDefault();
    setAdd(true);
  };

  return (
    <div
      style={{
        width: "100vw",
        height: "100vh",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <h1 style={{ fontSize: "xx-large" }}>Create An Account</h1>
      <AuthRegisterForm
        user={newUser}
        onChange={onChangeHandler}
        onSubmit={onSubmitHandler}
      />
    </div>
  );
};

export default AuthRegister;
