import React, { useState, useEffect } from 'react'
import { useQuery, useLazyQuery, gql, useMutation } from '@apollo/client';

import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import { withStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import IconButton from '@material-ui/core/IconButton';
import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';




const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
        backgroundColor: '#F1D1B5'
    },
    paper: {
        padding: theme.spacing(2),
        textAlign: 'center',
        BackgroundColor: '#F0F8FF',
        height: '700px',
        width: '700px',
        margin: '5% 25%',
        overflowY: 'auto'
    },
    textbox: {
        '& .MuiTextField-root': {
            margin: theme.spacing(1),

        }
    },
    button: {
        '& > *': {
            margin: theme.spacing(1),
            color: '#568EA6',
            height: '10px',
            width: '10px',
        }
    },
    table: {
        Width: '100%',
    }

}));

const StyledTableCell = withStyles((theme) => ({
    head: {
        backgroundColor: "#305f72",
        color: theme.palette.common.white,
        width: '700px'
    },
    body: {
        fontSize: 14,
    },
}))(TableCell);
const StyledTableRow = withStyles((theme) => ({
    root: {
        '&:nth-of-type(odd)': {
            backgroundColor: theme.palette.action.hover,
            overflowX: 'auto',
        },
    },
}))(TableRow);




const USERS = gql`
  query {
    users{
      id
      name
    }
  }
`;
const ADDUSER = gql`
mutation($name:String!) {
    createUser(name:$name){
      name
      id
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

const UPDATEUSER = gql`
    mutation($id: Int!, $name: String!){
        updateUser(id:$id,name:$name){
              id
              name
          }
    }`;



function CRUDinOne() {
    const classes = useStyles();


    const [user, setUser] = useState('');
    const [userId, setUserId] = useState('');
    const [editMode, setEditMode] = useState(false);

    const handleChange = ({ target: { value } }) => setUser(value);

    const [users, { loading, error, data }] = useLazyQuery(USERS);
    const [updateUser] = useMutation(UPDATEUSER);
    const [createUser] = useMutation(ADDUSER);
    const [deleteUser] = useMutation(DELETEUSER);

    useEffect(() => {
        users();
    }, [users]);

    useEffect(() => {
        console.log('data', data)
    }, [data]);

    function onSubmitHandler(ev) {
        ev.preventDefault()
        if (editMode) {
            updateUser({ variables: { id: userId, name: user } }).then(() => {
                setUser('');
                setEditMode(false);
                setUserId('');
            })
        }
        else {
            createUser({ variables: { name: user } }).then(() => setUser(''))
        }
        users();
    }

    function Update(id) {
        const u = data.users.find((user) => user.id === id);
        setUser(u.name);
        setEditMode(true);
        setUserId(id);
    }
    function Delete(id) {
        deleteUser({ variables: { id } }).then(() => {
            if (editMode) {
                setUser('');
                setEditMode(false);
                setUserId('')
            }
        })
        users();
    }

    return (
        <div className={classes.root}>
            <Grid container spacing={3}>
                <Grid item xs={12}>
                    <Paper className={classes.paper}>


                        <h1 >WELCOME TO CRUD APPLCATION</h1>
                        <form onSubmit={onSubmitHandler}>
                            <div>
                                <TextField className={classes.textbox} id="outlined-search" label="Enter Username" type="username" variant="outlined" value={user} onChange={handleChange} />
                            &nbsp;&nbsp;
                            <Button className={classes.button} type="submit" variant="outlined" >{editMode ? 'Edit' : 'Save'}</Button>
                            </div>
                        </form>
                        <br /><br />
                        <TableContainer component={Paper}>
                            {!loading && data && Array.isArray(data.users) && (
                                <Table className={classes.table} aria-label="customized table">
                                    <TableHead >
                                        <TableRow >
                                            <StyledTableCell>User-ID</StyledTableCell>
                                            <StyledTableCell >Username</StyledTableCell>
                                            <StyledTableCell  ></StyledTableCell>
                                            <StyledTableCell ></StyledTableCell>
                                        </TableRow>
                                    </TableHead>
                                    <TableBody>
                                        {data.users.map(({ id, name }, i) => (
                                            <StyledTableRow >
                                                <StyledTableCell align="left">{id}</StyledTableCell>
                                                <StyledTableCell align="left">{name}</StyledTableCell>
                                                <StyledTableCell align="right">
                                                    <IconButton color='primary'>
                                                        <EditIcon onClick={() => Update(id)}></EditIcon>
                                                    </IconButton>
                                                </StyledTableCell>
                                                <StyledTableCell align="right">
                                                    <IconButton color='secondary'>
                                                        <DeleteIcon onClick={() => Delete(id)}></DeleteIcon>
                                                    </IconButton>
                                                </StyledTableCell>
                                            </StyledTableRow>
                                        ))};

                                </TableBody>
                                </Table>
                            )}
                        </TableContainer>
                    </Paper>
                </Grid>
            </Grid >
        </div >
    )
}

export default CRUDinOne
