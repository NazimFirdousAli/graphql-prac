import React from 'react'
import { gql, useMutation, useQuery } from '@apollo/client';

const UPDATEUSER = gql`
    mutation($id: Int!, $name: String!){
        updateUser(id:$id,name:$name){
              id
              name
          }
    }`;
    const USERSVIEW = gql`
query {
    users{
        id
        name
    }
  }
`;
    
function UpdateUser() {

    const {loading, error,data} = useQuery(USERSVIEW)
    const [updateUser] = useMutation(UPDATEUSER)
    if (loading) return <p>Loading...</p>;
  if (error) return <p>Error :(</p>;

    return data.users.map(({ id, name }) => {
     let input;
    return (
        <div key={id}>
        <p>{name}</p>
        <form
          onSubmit={e => {
            e.preventDefault();
            updateUser({ variables: {id, name: input.value } });
            input.value='';
          }}
        >
          <input ref={node => { input = node;}}
          />
          <button type="submit">Update User</button>
        </form>
      </div>
    )
        })
}

export default UpdateUser;
