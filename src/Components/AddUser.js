import React from 'react'
import { gql,useMutation } from '@apollo/client';

const ADDUSER = gql`
mutation($name:String!) {
    createUser(name:$name){
      name
      id
    }
  }
`;

function AddUser() {
    let input;
    const [createUser,{data}] = useMutation(ADDUSER)
    return (
        <div>
        <form
          onSubmit={e => {
            e.preventDefault();
            createUser({ variables: { name: input.value } });
          }}
        >
          <input ref={node => { input = node;}}
          />
          <button type="submit">Add User</button>
        </form>
      </div>
    )
}

export default AddUser
