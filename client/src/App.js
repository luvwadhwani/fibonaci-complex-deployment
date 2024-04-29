import logo from './logo.svg';
import './App.css';
import {Link, Route, BrowserRouter as Router, Routes} from "react-router-dom";
import Fib from "./Fib";
import OtherPage from "./OtherPage";
import {Component} from "react";

class App extends Component {
    render() {
        return (
            <Router>
                <div className="App">
                    <header className="App-header">
                        <img src={logo} className="App-logo" alt="logo"/>
                        <h1>Welcome to React</h1>
                        <Link to="/">Home</Link>
                        <Link to="/otherpage">About Us</Link>
                    </header>
                    <div>
                        <Routes>
                            <Route exact path="/" component={Fib} />
                            <Route path="/otherpage" component={OtherPage} />
                        </Routes>
                    </div>
                </div>
            </Router>
        );
    }
}

export default App;
