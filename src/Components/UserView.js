import React from 'react'
import { useQuery, gql } from '@apollo/client';

const USERSVIEW = gql`
query {
    users{
        id
        name
    }
  }
`;

function UserView() {
    const { loading, error, data } = useQuery(USERSVIEW);
    console.log(data);
    if (loading) return <p>loading</p>
    if (error) return <p>Error :\</p>
     return(
         data.users.map(({ name, id }, i) => {
        return (
        <div key={i}>
            <p>
                {name}:{id}
            </p>
        </div>)
    }))
}

export default UserView
