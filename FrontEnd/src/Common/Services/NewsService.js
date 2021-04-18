import Parse from "parse";
// SERVICE FOR PARSE SERVER ACTION


//READ ACTION - get a user by ID
export const getNews = () => {
    const News = Parse.Object.extend("News");
    const query = new Parse.Query(News);
    return query.find().then((results) => {
      // returns array of news objects
      return results;
    });
}
