import "./Logout.css";

const Logout = ({ onClick }) => {
  return (
    <button
      onClick={onClick}
      className="logout-button-info btn btn-outline-danger"
    >
      Log Out
    </button>
  );
};

export default Logout;
