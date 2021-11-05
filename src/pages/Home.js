import Button from '@material-ui/core/Button';
import Header from '../components/Header';
import './Home.css';
const Home = () => {
  return (
    <div class="vh-100">
      <Header />
      <h1>Connect 4!</h1>
      <div>
        <div>
          <input type="radio" name="difficulty"/>
          <label>vs Player</label>
        </div>
        <div>
          <input type="radio" name="difficulty"/>
          <label>vs CPU</label>
        </div>
      </div>
      <Button variant="contained" color="secondary">Start!</Button>
    </div>
  );
};
export default Home;
