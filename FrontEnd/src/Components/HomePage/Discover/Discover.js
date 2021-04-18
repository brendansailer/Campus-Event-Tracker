import FriendSuggestions from './FriendSuggestions/FriendSuggestions.js';
import TodaysNews from './TodaysNews/TodaysNews';
import './Discover.css';

function Discover() {
  //The html to be rendered for the Discover module
  return (
  <div className="discover-container">
        <div className="news">
            <TodaysNews></TodaysNews>
        </div>
        <div className="friend-suggestions">
            <FriendSuggestions></FriendSuggestions>
        </div>
    </div>
  );
}

export default Discover;
