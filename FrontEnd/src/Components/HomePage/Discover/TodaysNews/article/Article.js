import "./Article.css";

function Article({ title, link, image, desc }) {
  return (
    <li className="article-item">
      <div className="article-text">
        <a className="article-title" href={link}>
          {title}
        </a>
        <p>{desc}</p>
      </div>

      <img className="article-image" src={image._url} alt="article"></img>
    </li>
  );
}

export default Article;
