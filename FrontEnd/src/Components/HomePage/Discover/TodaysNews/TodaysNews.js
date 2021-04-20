import Article from "./article/Article";
import { useState, useEffect } from "react";
import "./style.css";

function TodaysNews() {
  // //set up the state
  // const [articles, setNews] = useState([]);

  // //useEffect to run when the page loads to obtain async data
  // useEffect(() => {
  //   getNews().then((news) => {
  //     console.log(news);
  //     setNews(news);
  //   });
  // }, []);

  return (
    <div className="news-container">
      <h1 className="title">Suggested Clubs? Idk</h1>

      <ul className="news-list">
        {/* {articles.map((article) => {
          return (
            <Article
              key={article.id}
              link={article.get("link")}
              title={article.get("title")}
              desc={article.get("description")}
              image={article.get("image")}
            ></Article>
          );
        })} */}
      </ul>
    </div>
  );
}

export default TodaysNews;
