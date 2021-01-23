import React from 'react'
import { useQuery, gql, useMutation } from '@apollo/client';


const ADDUSER = gql`
mutation($name:String!) {
    createUser(name:$name){
      name
      id
    }
  }
`;

const USERSVIEW = gql`
  query {
    users{
      id
      name
    }
  }
`;

const DELETEUSER = gql`
  mutation($id:Int!) {
    deleteUser(id:$id){
      name
      id
    }
  }
`;

function UserView() {
  const { loading, error, data } = useQuery(USERSVIEW);
  const [deleteUser] = useMutation(DELETEUSER, {
    refetchQueries: [{ query: USERSVIEW }]
  })

  console.log(data);
  const onDelete = (id) => {
    deleteUser({ variables: { id } })
  }
  if (loading) return <p>loading</p>
  if (error) return <p>Error :\</p>
  return (
    
    <table>
      <thead>
        <tr>
          <th>User Id</th>
          <th>Username</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
        {data.users.map(({ name, id }, i) => (
          <tr key={i}>
            <td>{id}</td>
            <td>{name}</td>
            <td>
              <button>edit</button>
              <button onClick={() => onDelete(id)}>delete</button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}


export default UserView
