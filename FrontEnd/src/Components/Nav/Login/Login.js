import "./Login.css";

const Login = ({ onClick }) => {
  return (
    <button className="btn btn-primary log-in-btn" onClick={onClick}>Log in to see more</button>
  );
};

export default Login;
