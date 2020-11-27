import Box from '@material-ui/core/Box';
import Button from '@material-ui/core/Button';
import { RouteComponentProps } from '@reach/router';
import React from 'react';
import '../modules/Subject';
import { Link as NavLink } from "@reach/router";
import KeyboardArrowDownIcon from '@material-ui/icons/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@material-ui/icons/KeyboardArrowUp';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import { Typography, TextField, TableContainer, Paper, Table, TableHead, TableRow, TableCell, TableBody, styled, Avatar, Checkbox, IconButton, Collapse } from '@material-ui/core';

// function Copyright() {
//     return (
//         <Typography variant="body2" color="textSecondary" align="center">
//             {'Copyright © '}
//             <Link color="inherit" href="#">
//                 rbui
//             </Link>{' '}
//             {new Date().getFullYear()}
//             {'.'}
//         </Typography>
//     );
// }

const StyledAvatar = styled(Avatar)(({ theme }) => ({
    backgroundColor: theme.palette.secondary.main,
}));

const StyledImage = styled('img')(({ theme }) => ({
    width: theme.spacing(25),
    marginBottom: theme.spacing(2),
    objectFit: 'contain',
    textAlign: 'center',
}));

// const useStyles = makeStyles((theme: Theme) =>
//   createStyles({
//     root: {
//       flexGrow: 1,
//     },
//   }),
// );

const tableStyles = {
  padding: 'unset',
};

function Row() {
  const [open, setOpen] = React.useState(false)
  const [itemCheckBox, setItemCheckBox] = React.useState({
    item1: false,
    item2: false,
    item3: false,
    item4: false
  })

  const [subItemCheckBox, setSubItemCheckBox] = React.useState({
    item1: false,
    item2: false,
    item3: false,
    item4: false
  })

  const handleViewTableCheckboxChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setItemCheckBox({
      ...itemCheckBox,
      item2: event.target.checked
    })
    setSubItemCheckBox({
      ...subItemCheckBox,
      item2: event.target.checked
    })
  }

  const handleViewSubItemCheckBoxChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSubItemCheckBox({
      ...subItemCheckBox,
      item2: event.target.checked
    })
  }


  const handleDeleteTableCheckboxChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setItemCheckBox({
      ...itemCheckBox,
      item4: event.target.checked
    })
    setSubItemCheckBox({
      ...subItemCheckBox,
      item4: event.target.checked
    })
  }

  const handleDeleteSubItemCheckBoxChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSubItemCheckBox({
      ...subItemCheckBox,
      item4: event.target.checked
    })
  }

  const handleCreateTableCheckboxChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setItemCheckBox({
      ...itemCheckBox,
      item1: event.target.checked
    })
    setSubItemCheckBox({
      ...subItemCheckBox,
      item1: event.target.checked
    })
  }

  const handleCreateSubItemCheckBoxChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSubItemCheckBox({
      ...subItemCheckBox,
      item1: event.target.checked
    })
  }

  const handleModifyTableCheckboxChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setItemCheckBox({
      ...itemCheckBox,
      item3: event.target.checked
    })
    setSubItemCheckBox({
      ...subItemCheckBox,
      item3: event.target.checked
    })
  }

  const handleModifySubItemCheckBoxChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSubItemCheckBox({
      ...subItemCheckBox,
      item3: event.target.checked
    })
  }
  return (
    <React.Fragment>
      <TableRow>
        <TableCell/>
          <TableCell component="th" scope="row">Existing User</TableCell>
          <TableCell align="right">
            <Checkbox  inputProps={{ 'aria-label': 'primary checkbox' }}/>
          </TableCell>
          <TableCell align="right">
            <Checkbox  inputProps={{ 'aria-label': 'primary checkbox' }}/>
          </TableCell>
          <TableCell align="right">
            <Checkbox  inputProps={{ 'aria-label': 'primary checkbox' }}/>
          </TableCell>
          <TableCell align="right">
            <Checkbox  inputProps={{ 'aria-label': 'primary checkbox' }}/>
          </TableCell>
      </TableRow>

      <TableRow>
        <TableCell>
          <IconButton aria-label="expand row" size="small" onClick={() => setOpen(!open)}>
            {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
          </IconButton>
        </TableCell>
        <TableCell component="th" scope="row">Project 1</TableCell>
        <TableCell align="right">
          <Checkbox checked={itemCheckBox.item1} onChange={handleCreateTableCheckboxChange} inputProps={{ 'aria-label': 'primary checkbox' }}/>
        </TableCell>
        <TableCell align="right"> 
          <Checkbox checked={itemCheckBox.item2} onChange={handleViewTableCheckboxChange} inputProps={{ 'aria-label': 'primary checkbox' }}/>
        </TableCell>
        <TableCell align="right">
          <Checkbox checked={itemCheckBox.item3} onChange={handleModifyTableCheckboxChange} inputProps={{ 'aria-label': 'primary checkbox' }}/>
        </TableCell>
        <TableCell align="right">
          <Checkbox checked={itemCheckBox.item4} onChange={handleDeleteTableCheckboxChange} inputProps={{ 'aria-label': 'primary checkbox' }}/>
        </TableCell>
    </TableRow>
      
      <TableRow>
        <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
          <Collapse in={open} timeout="auto" unmountOnExit>
            <Box margin={1}>
              <Table size="small" aria-label="purchases">
                <TableBody>

                  <TableRow>
                    <TableCell></TableCell>
                    <TableCell>Platform 1</TableCell>
                    <TableCell></TableCell>
                    <TableCell></TableCell>
                    <TableCell>
                      <Checkbox checked={subItemCheckBox.item1} onChange={handleCreateSubItemCheckBoxChange} inputProps={{ 'aria-label': 'primary checkbox' }}/>
                    </TableCell>
                    <TableCell>
                      <Checkbox checked={subItemCheckBox.item2} onChange={handleViewSubItemCheckBoxChange} inputProps={{ 'aria-label': 'primary checkbox' }}/>
                    </TableCell>
                    <TableCell>
                      <Checkbox checked={subItemCheckBox.item3} onChange={handleModifySubItemCheckBoxChange} inputProps={{ 'aria-label': 'primary checkbox' }}/>
                    </TableCell>
                    <TableCell>
                      <Checkbox checked={subItemCheckBox.item4} onChange={handleDeleteSubItemCheckBoxChange} inputProps={{ 'aria-label': 'primary checkbox' }}/>
                    </TableCell>
                  </TableRow>

                  <TableRow>
                    <TableCell></TableCell>
                    <TableCell>Platform 2</TableCell>
                    <TableCell></TableCell>
                    <TableCell></TableCell>
                    <TableCell >
                      <Checkbox checked={subItemCheckBox.item1} onChange={handleCreateSubItemCheckBoxChange} inputProps={{ 'aria-label': 'primary checkbox' }}/>
                    </TableCell>
                    <TableCell>
                      <Checkbox checked={subItemCheckBox.item2} onChange={handleViewSubItemCheckBoxChange} inputProps={{ 'aria-label': 'primary checkbox' }}/>
                    </TableCell>
                    <TableCell>
                      <Checkbox checked={subItemCheckBox.item3} onChange={handleModifySubItemCheckBoxChange} inputProps={{ 'aria-label': 'primary checkbox' }}/>
                    </TableCell>
                    <TableCell>
                      <Checkbox checked={subItemCheckBox.item4} onChange={handleDeleteSubItemCheckBoxChange} inputProps={{ 'aria-label': 'primary checkbox' }}/>
                    </TableCell>
                  </TableRow>

                  
                </TableBody>
              </Table>
            </Box>
          </Collapse>
        </TableCell>
      </TableRow>
    
    </React.Fragment>
      
  )
}

export default function Newuser(_: RouteComponentProps) {
    
  return (
        <>
        <form noValidate>
            <Box
              display="flex"
              flexDirection="column"
              alignItems="center"
              mb={8}>

              <StyledImage src="/logo.jpg" />
              <Typography component="p" align="center">
                  One stop solution for Risk Analysis
              </Typography>
            </Box>  

        <Box display="flex" justifyContent="center" mb={2}>
            <StyledAvatar>
                <LockOutlinedIcon />
            </StyledAvatar>
        </Box>

        {/* <Box display="flex" justifyContent="center" mb={2}>
            <Typography component="h1" variant="h5" align="center">
                Sign Up
            </Typography>
        </Box> */}

        <Box mb={6}>
            <TextField
                // inputRef={register({
                //     required: {
                //         value: true,
                //         message: 'firstname required',
                //     },
                //     minLength: {
                //         value: 3,
                //         message: 'firstname too short',
                //     },
                // })}
                variant="outlined"
                margin="normal"
                required
                fullWidth
                label="firstname"
                name="firstname"
                autoComplete="firstname"
                // error={!!errors['firstname']}
                // helperText={errors['firstname']?.message}
                autoFocus
            />
            <TextField
                // inputRef={register({
                //     required: {
                //         value: true,
                //         message: 'lastname required',
                //     },
                //     minLength: {
                //         value: 3,
                //         message: 'lastname too short',
                //     },
                // })}
                variant="outlined"
                margin="normal"
                required
                fullWidth
                label="lastname"
                name="lastname"
                autoComplete="firstname"
                // error={!!errors['lastname']}
                // helperText={errors['lastname']?.message}
                autoFocus
            />
            <TextField
                variant="outlined"
                margin="normal"
                required
                fullWidth
                name="password"
                label="Password"
                type="password"
                autoComplete="current-password"
                // inputRef={register({
                //     required: {
                //         value: true,
                //         message: 'Password required',
                //     },
                //     minLength: {
                //         value: 3,
                //         message: 'Password too short',
                //     },
                // })}
                // error={!!errors['password']}
                // helperText={errors['password']?.message}
            />
        </Box>

        <Box mb={2}>
            <Button
                type="submit"
                fullWidth
                variant="contained"
                color="primary"
            >
                <NavLink to="/newuser">Create User</NavLink>
            </Button>
        </Box>

        {/* {isFailed && (
            <Box display="flex" justifyContent="center" mb={2}>
                <Typography color="error">Authentication failed</Typography>
            </Box>
        )} */}

      <Box mb={8}>
        <TableContainer component={Paper}>
          <Table aria-label="collapsible table">
            <TableHead>
              <TableRow>
                <TableCell />
                <TableCell>Entity</TableCell>
                <TableCell align="right">Create</TableCell>
                <TableCell align="right">View</TableCell>
                <TableCell align="right">Modify</TableCell>
                <TableCell align="right">Delete</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              <Row />
            </TableBody>
          </Table>
      </TableContainer>
    </Box>
  </form>
        </>
    );
}
