import TodaysNews from './TodaysNews/TodaysNews';
import './Discover.css';
import ClubSuggestions from './ClubSuggestions/ClubSuggestions.js';

function Discover() {
  //The html to be rendered for the Discover module
  return (
  <div className="discover-container">
        <div className="news">
            <TodaysNews></TodaysNews>
        </div>
        <div className="club-suggestions">
            <ClubSuggestions></ClubSuggestions>
        </div>
    </div>
  );
}

export default Discover;
