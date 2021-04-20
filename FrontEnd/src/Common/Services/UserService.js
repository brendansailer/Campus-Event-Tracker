import Parse from "parse";
// SERVICE FOR PARSE SERVER ACTION

//READ ACTION - get a user by ID
export const getUser = (id) => {
  const User = Parse.Object.extend("User");
  const query = new Parse.Query(User);
  return query.get(id).then((result) => {
    return result;
  });
};

// DELETE ACTION - remove user by ID
export const removeUserById = (id) => {
  const User = Parse.Object.extend("User");
  const query = new Parse.Query(User);
  return query.get(id).then((user) => {
    return user.destroy();
  });
};

//UPDATE ACTION - get a user by ID
export const updateUser = (id, changes) => {
  const User = new Parse.User();
  const query = new Parse.Query(User);

  // Finds the user by its ID
  return query.get(id).then((user) => {
    // Updates the data we want
    changes.profileBody && user.set('profileBody', changes.profileBody);
    // Saves the user with the updated data
    user.save().then((response) => {
      console.log('Updated user', response);
      return response
    }).catch((error) => {
      console.error('Error while updating user', error);
    });
  });
};
