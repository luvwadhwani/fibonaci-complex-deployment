import logo from './logo.svg';
import './App.css';
import {Link, Route, BrowserRouter, Routes} from "react-router-dom";
import Fib from "./Fib";
import OtherPage from "./OtherPage";
import {Component} from "react";
import Layout from "./Layout";

class App extends Component {
    render() {
        return (
            <BrowserRouter>
                <Routes>
                    <Route path="/" element={<Layout />}>
                        <Route index element={<Fib />} />
                        <Route path="otherpage" element={<OtherPage />} />
                    </Route>
                </Routes>
            </BrowserRouter>
        );
    }
}

export default App;
