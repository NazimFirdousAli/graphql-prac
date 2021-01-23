import React, { Fragment, useState, useEffect } from 'react'
import { gql, useLazyQuery, useMutation } from '@apollo/client';
import {Container,CssBaseline} from '@material-ui/core';


const USERS = gql`
   query {
       users{
           id 
           name
       }
   }


`;
const UPDATE_USER = gql`
mutation($id:Int!,$name:String!){
    updateUser(id:$id,name:$name){
    id 
    name
    }
  }
  
`;
const CREATE_USER = gql`
mutation($name:String!){
    createUser(name:$name){
        id 
        name
    }
  }   
`;

const DELETE_USER = gql`
  mutation ($id: Int!) {
      deleteUser(id: $id) {
          id
          name
      }
  }
`;
const Update = () => {
    const [user, setUser] = useState('');
    const [userId, setUserId] = useState('');
    const [editMode, setEditMode] = useState(false);

    const handleChange = ({ target: { value } }) => setUser(value);

    const [users, { loading, error, data }] = useLazyQuery(USERS);
    const [updateUser] = useMutation(UPDATE_USER);
    const [createUser] = useMutation(CREATE_USER);
    const [deleteUser] = useMutation(DELETE_USER);

    useEffect(() => {
        users();
    }, [users])

    const onSubmitHandler = (ev) => {
        ev.preventDefault();
        if (!user.trim()) return console.log('User field is empty...');
        if (editMode) {
            // update mutation logics
            updateUser({ variables: { id: userId, name: user } }).then(() => {
                setUser('');
                setEditMode(false);
                setUserId('');
            })
        } else {
            // create mutation logics
            createUser({ variables: { name: user } }).then(() => setUser(''))
        }
        users();
    }
    //Edit Function for edit mod
    const onEdit = id => {
        const u = data.users.find((user) => user.id === id);
        setUser(u.name);
        setEditMode(true);
        setUserId(id);
    }


    const onDelete = id => {
        deleteUser({ variables: { id } }).then(() => {
            if (editMode) {
                setUser('');
                setEditMode(false);
                setUserId('')
            }
            users();
        })
    }





    if (loading || !data) return <p>Loading...</p>;
    if (error) return <p>Error :(</p>;

    return (
        <Fragment>
        <CssBaseline />
        <Container>
            <form
                onSubmit={onSubmitHandler}
            >
                <input
                    value={user}
                    onChange={handleChange}
                />
               
                <button type="submit">{editMode ? 'Update' : 'Save'}</button>
            </form>
            <table>
                <thead>
                    <tr>
                        <th>User Id</th>
                        <th>User Name</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {data.users.map(({ id, name }, i) => (
                        <tr key={i}>
                            <td>{id}</td>
                            <td>{name}</td>
                            <td>
                                <input type='button' value='edit' onClick={() => onEdit(id)} />
                                <input type='button' value='delete' onClick={() => onDelete(id)} />
                            </td>
                        </tr>
                    ))};
                </tbody>
            </table>
            </Container>
        </Fragment>
    );
}

export default Update