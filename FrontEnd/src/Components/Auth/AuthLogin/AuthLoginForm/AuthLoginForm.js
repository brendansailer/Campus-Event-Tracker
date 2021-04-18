import "./AuthLoginForm.css";
const AuthLoginForm = ({ user, onChange, onSubmit }) => {
  return (
    <div>
      <form className="login-form" onSubmit={onSubmit} autoComplete="off">
        <div className="input-group login-group">
          <div className="input-group-prepend">
            <span className="input-group-text" id="basic-addon1">
              <i className="fa fa-user"></i>
            </span>
          </div>

          <input
            name="username"
            value={user.username}
            onChange={onChange}
            type="text"
            className="form-control login-text"
            placeholder="Username"
            required
          />
        </div>

        <div className="input-group login-group">
          <div className="input-group-prepend">
            <span className="input-group-text" id="basic-addon1">
              <i className="fa fa-lock"></i>
            </span>
          </div>
          <input
            name="password"
            value={user.password}
            onChange={onChange}
            type="password"
            className="form-control login-text"
            placeholder="Password"
            required
          />
        </div>

        <div className="form-group login-button-group">
          <button
            type="submit"
            className="btn login-submit btn-primary"
            onSubmit={onSubmit}
          >
            Log In
          </button>
        </div>
      </form>
    </div>
  );
};

export default AuthLoginForm;
