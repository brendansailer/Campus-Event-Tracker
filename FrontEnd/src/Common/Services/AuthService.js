import Parse from "parse";

export const createUser = (newUser) => {
  const user = new Parse.User();

  user.set("firstName", newUser.firstName);
  user.set("lastName", newUser.lastName);
  user.set("username", newUser.username);
  user.set("email", newUser.email);
  user.set("password", newUser.password);

  return user
    .signUp()
    .then((newUserSaved) => {
      return newUserSaved;
    })
    .catch((error) => {
      alert(`Error: ${error.message}`);
    });
};

export const loginUser = (user) => {
  return Parse.User.logIn(user.username, user.password)
    .then((result) => {
      return result;
    })
    .catch((error) => {
      alert("Invalid Login Attempt");
    });
};

export const getCurrentUser = () => {
  return Parse.User.current();
};

export const logoutUser = () => {
  return Parse.User.logOut().then(() => {
    return true;
  });
};
