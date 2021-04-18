import "./UserConnect.css";
function UserConnect({ firstName, lastName, picture }) {
  console.log(picture);
  return (
    <li className="user">
      <div className="image-name">
        <img className="image" src={picture._url} alt="profile"></img>
        <p style={{ marginLeft: "0.5rem" }} className="name">
          {firstName} {lastName}
        </p>
      </div>
      <button className="btn btn-outline-primary">Connect</button>
    </li>
  );
}

export default UserConnect;
