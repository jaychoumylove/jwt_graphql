import React, {  } from 'react';
import { useUsersQuery } from '../generated/graphql';

export interface IHomeProps {
    
}

const Home: React.FC<IHomeProps> = () => {

    const { data } = useUsersQuery({ fetchPolicy: "network-only" });

    return (
        <div>
            <header>users</header>
            <div>
                { data ?  
                <ul>
                    {data.users.map(item => {
                        return <li key={item.id}>
                            {item.email} . {item.id}
                        </li>
                    })}
                </ul>: <div>loading</div> }
            </div>
        </div>
    );
}

export { Home };