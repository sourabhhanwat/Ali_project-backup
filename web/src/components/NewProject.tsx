import Box from '@material-ui/core/Box';
import Grid from '@material-ui/core/Grid';
import { RouteComponentProps} from '@reach/router';
import React from 'react';
import '../modules/Subject';
import { Typography, styled, Avatar, makeStyles, Theme, createStyles, Button} from '@material-ui/core';
import { useForm} from 'react-hook-form';
import axios from "axios";
import ProjectIcon from './icons/Project';

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
  

  interface IFormInput {
    name: String;
    des: String;
    startdate: Date;
    res: String;
    enddate: Date;
    project_id:String;
  }

  export default function NewProject(this: any, _: RouteComponentProps) {

    const { register, handleSubmit, reset } = useForm<IFormInput>();
    const [lst, setLst] = React.useState([])
    const [status , setStatus] = React.useState({
      isSubmitted : false,
      status : false
    })
   
    const onSubmit = (data: IFormInput,e:any) => {
      
      axios.post('/api/v1/saveproject/', {
        Name: data.name,
        Description: data.des,
        StartDate: data.startdate,
        Responsible: data.res,
        EndDate: data.enddate,
      })

      .then(function (response) {
        console.log(response);
        setStatus({
          isSubmitted: true,
          status: response.data.status
        })
    })
      .catch(function (error) {
        console.log(error);
      });

      e.target.reset();

    };

    const onDrop = () => {

      axios.get('/api/v1/users/')
      .then(function (response) {
          setLst(response.data.map((item: any) =>({
            username: item.username,
            id: item.id
          })))
        console.log(lst)
      })

      .catch(function (error) {
        console.log(error);
      });
    };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
            <Box
              display="flex"
              flexDirection="column"
              alignItems="center"
              mb={8}>

              <Box display="flex" justifyContent="center" mb={2}>
            <StyledAvatar>
              <ProjectIcon />
            </StyledAvatar>
             </Box>
            
                <Box display="flex" justifyContent="center" mb={2}>
                <Typography component="h1" variant="h5" align="center">
                    New Project
                </Typography>
                </Box>
            </Box>  
                <Grid container spacing={1}>
                <Grid item xs={12}>
                {status.isSubmitted ? status.status ? 
                  <p style={{color: "green"}}>Data Submitted Succesfully!!..</p> : 
                  <p style={{ color : "red"}}>Data Not Saved!!.</p> : null
                }
                 <label style={{ width : "100px" , height: "40px", margin:"10px", fontSize:"18px"}}>Project Name</label> 
                 &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                 &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                 <input style={{ width : "900px" , height: "40px", margin:"10px"}} name="name" placeholder="Project Name here" ref={register({ required: true, maxLength: 100 })}  />
            </Grid>
            
            <Grid item xs={12}>
                 <label style={{ width : "100px" , height: "40px", margin:"10px", fontSize:"18px"}}>Project Description</label>
                 &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                 <input style={{ width : "900px" , height: "40px", margin:"10px"}} name="des" placeholder="Project Description here" ref={register({ required: true, maxLength: 2000 })}  />
            </Grid>

            <Grid item xs={12}>
                  <label style={{ width : "100px" , height: "40px", margin:"10px", fontSize:"18px"}}>Project Start Date</label>
                  &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                  &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                  <input type='date' style={{ width : "900px" , height: "40px", margin:"10px"}} name="startdate" ref={register({ required: true })}  />
            </Grid>
            
            <Grid item xs={12}>
              
                <Box>
                    <label style={{ width : "100px" , height: "40px", margin:"10px", fontSize:"18px"}}>Responsible</label>
                    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                    <select style={{ width : "300px" , height: "40px", margin:"10px", fontSize:"18px"}} name="res" ref={register}> 
                    {lst.map((list:any) => (
                    <option value= {list.id} key={list.id}> {list.username} </option>
                    ))}
                    </select> 
                    <Box fontWeight={800} clone>
                        <Button
                            type = "button"
                            onClick={() => onDrop()}
                            variant="contained"
                            size="large"
                            color="primary"
                            style={{margin: 5}}>
                            Load
                        </Button>
                    </Box>
                    {/* <button style={{ width : "200px" , height: "40px", margin:"10px",backgroundColor: 'lightGreen', fontStyle: "inherit"}}  type="button" onClick={() => onDrop()}>Load</button> */}
                    
                </Box>
            </Grid>

            <Grid item xs={12}>
                 <label style={{ width : "100px" , height: "40px", margin:"10px", fontSize:"18px"}}>Expected Completion Date</label>
                
                 <input type='date' style={{ width : "890px" , height: "40px", margin:"10px"}} name="enddate" ref={register({ required: true})} />
            </Grid>
            </Grid>
            <Box fontWeight={800} clone>
                <Button
                    type = "submit"
                    variant="contained"
                    size="large"
                    color="primary"
                    style={{margin: 5}}>
                    Submit
                </Button>
            </Box>
      {/* <input style={{ width : "300px" , height: "40px", margin:"20px",backgroundColor: 'lightGreen', fontStyle: "inherit"}} type="submit"/> */}
        
    </form>
    );
}