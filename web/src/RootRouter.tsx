import React from 'react';
import { BrowserRouter, Switch, Route, Link } from 'react-router-dom';
import { Home } from './pages/Home';
import { Login } from './pages/Login';
import { Register } from './pages/Register';

export const RootRouter: React.FC = () => {
    return <BrowserRouter>
        <header>
            <div>
                <Link to='/'>Home</Link>
            </div>
            <div>
                <Link to='/register'>Register</Link>
            </div>
            <div>
                <Link to='/login'>Login</Link>
            </div>
        </header>
        <Switch>
            <Route exact path="/" component={Home} /> 
            <Route path="/register" component={Register} />
            <Route path="/login" component={Login} />
        </Switch>
    </BrowserRouter>;
}