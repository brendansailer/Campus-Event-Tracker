import "./AuthRegisterForm.css";
const AuthRegisterForm = ({ user, onChange, onSubmit }) => {
  return (
    <div>
      <form onSubmit={onSubmit} autoComplete="off" className="register-form">
        <div className="form-group register-group">
          <label>First Name</label>
          <br />
          <input
            type="text"
            className="form-control"
            id="first-name-input"
            value={user.firstName}
            onChange={onChange}
            name="firstName"
            placeholder="First Name"
            required
          />
        </div>

        <div className="form-group register-group">
          <label>Last Name</label>
          <br />
          <input
            type="text"
            className="form-control register-group"
            id="last-name-input"
            value={user.lastName}
            onChange={onChange}
            name="lastName"
            placeholder="Last Name"
            required
          />
        </div>

        <div className="form-group register-group">
          <label>E-Mail</label>
          <br />
          <input
            type="email"
            className="form-control register-group"
            id="email-input"
            value={user.email}
            onChange={onChange}
            name="email"
            required
            placeholder="E-Mail"
          />
        </div>

        <div className="form-group register-group">
          <label>Username</label>
          <br />
          <input
            type="text"
            className="form-control"
            id="username-input"
            value={user.username}
            onChange={onChange}
            name="username"
            required
            placeholder="Username"
          />
        </div>

        <div className="form-group register-group">
          <label>Password</label>
          <br />
          <input
            type="password"
            className="form-control"
            id="password-input"
            value={user.password}
            onChange={onChange}
            name="password"
            required
            min="0"
            placeholder="Password"
          />
        </div>

        <button
          type="submit"
          className="btn btn-primary register-button"
          onSubmit={onSubmit}
        >
          Sign Up
        </button>
      </form>
    </div>
  );
};

export default AuthRegisterForm;
