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

export const createDBUser = (newUser) => {
  return fetch('http://18.205.219.249:8001/login/create', {
    method: 'POST', // *GET, POST, PUT, DELETE, etc.
    mode: 'cors', // no-cors, *cors, same-origin
    cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
    credentials: 'same-origin', // include, *same-origin, omit
    headers: {
      'Content-Type': 'application/json'
    },
    redirect: 'follow', // manual, *follow, error
    referrerPolicy: 'no-referrer', // no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url
    body: JSON.stringify({username: newUser.username, email: newUser.email, password: newUser.password})
  }).then(response => response.json())
}

export const getDBUser = (username, email) => {
  return fetch('http://18.205.219.249:8001/login', {
    method: 'POST', // *GET, POST, PUT, DELETE, etc.
    mode: 'cors', // no-cors, *cors, same-origin
    cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
    credentials: 'same-origin', // include, *same-origin, omit
    headers: {
      'Content-Type': 'application/json'
    },
    redirect: 'follow', // manual, *follow, error
    referrerPolicy: 'no-referrer', // no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url
    body: JSON.stringify({username, email})
  }).then(response => response.json())
}

export const getUserRSVPs = (user_id) => {
  
  return fetch('http://18.205.219.249:8001/event/subscribed/' + user_id, {
    method: 'GET', // *GET, POST, PUT, DELETE, etc.
    mode: 'cors', // no-cors, *cors, same-origin
    cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
    credentials: 'same-origin', // include, *same-origin, omit
    headers: {
    'Content-Type': 'application/json'
    },
    redirect: 'follow', // manual, *follow, error
    referrerPolicy: 'no-referrer', // no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url
  }).then(response => response.json())
}

export const createRSVP = (user_id, event_id, likelihood) => {
  return fetch('http://18.205.219.249:8001/event/rsvp', {
    method: 'POST', // *GET, POST, PUT, DELETE, etc.
    mode: 'cors', // no-cors, *cors, same-origin
    cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
    credentials: 'same-origin', // include, *same-origin, omit
    headers: {
    'Content-Type': 'application/json'
    },
    redirect: 'follow', // manual, *follow, error
    referrerPolicy: 'no-referrer', // no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url
    body: JSON.stringify({user_id, event_id, likelihood})
  }).then(response => response.json())
}

