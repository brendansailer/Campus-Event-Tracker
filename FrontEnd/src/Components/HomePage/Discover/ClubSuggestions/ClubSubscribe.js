import "./ClubSubscribe.css";
function ClubSubscribe({ key, description }) {
  return (
    <li className="user">
      <div className="image-name">
        {/* <img className="image" src={picture._url} alt="profile"></img> */}
        <p style={{ marginLeft: "0.5rem" }} className="name">
          {description}
        </p>
      </div>
      <button className="btn btn-outline-primary">Connect</button>
    </li>
  );
}

export default ClubSubscribe;
