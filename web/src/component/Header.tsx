import React from 'react';
import { Link } from 'react-router-dom';

export interface IHeaderProps {
    
}

const Header: React.FC<IHeaderProps> = () => {
    return (
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
    );
}

export { Header };