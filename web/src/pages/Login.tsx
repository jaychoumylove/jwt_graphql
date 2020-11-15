import React, { useState } from 'react';
import { RouteComponentProps } from 'react-router-dom';
import { useLoginMutation } from '../generated/graphql';

export interface ILoginProps extends RouteComponentProps {
    
}

const Login: React.FC<ILoginProps> = ({history}) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [login] = useLoginMutation();

    return (
        <div>
            <form onSubmit={async (e) => {
                e.preventDefault();
                console.log('form submiteed');
                console.log(email, password);

                const response = await login({
                    variables: {
                        email,
                        password
                    }
                });

                console.log(response);

                history.push('/');
            }}>
                <div>
                    <input type="text" name="email" onChange={e => {
                        setEmail(e.target.value)
                    }}/>
                </div>
                <div>
                    <input type="password" name="password" onChange={e => {
                        setPassword(e.target.value)
                    }}/>
                </div>

                <div><button type='submit'>login</button></div>
            </form>
        </div>
    );
}

export { Login };