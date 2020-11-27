import Box from '@material-ui/core/Box';
import Grid from '@material-ui/core/Grid';
import { RouteComponentProps, useMatch} from '@reach/router';
import React from 'react';
import '../modules/Subject';
import { Typography, styled, Avatar, Button} from '@material-ui/core';
import { useForm} from 'react-hook-form';
import axios from "axios";
import ProjectIcon from './icons/Project';
import { Link } from '@reach/router';
// import CreatePlatform from './CreatePlatform';
import { useHistory } from "react-router-dom";
import { Redirect } from "react-router-dom";

const StyledAvatar = styled(Avatar)(({ theme }) => ({
    backgroundColor: theme.palette.secondary.main,
}));

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

  export default function NewProject(this: any, {projectId,}: RouteComponentProps<{projectId: number;}>) {

    const { register, handleSubmit } = useForm<IFormInput>();
    const [lst, setLst] = React.useState([]);
    const [project, updateProject] = React.useState<any>([]);

    const [status , setStatus] = React.useState({
      isSubmitted : false,
      status : false
    })

    let history = useHistory();

    const match = useMatch('/dashboard/projects/:projectId');

    if (match) {
        projectId = parseInt((match as any).projectId);
    }

    React.useEffect(() => {
      fetch(`/api/v1/projects/${projectId}`)
        .then(results => results.json())
        .then(data => {
          updateProject(data);
        });
    }, []);

    console.log("update project==>", project.users )
   
    const onSubmit = (data: IFormInput,e:any) => {

      console.log("I am sending data==>", data);
      
      axios.post('/api/v1/updateproject/', {
        Name: data.name,
        Description: data.des,
        StartDate: data.startdate,
        Responsible: data.res,
        EndDate: data.enddate,
        projectId : projectId,
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

    React.useEffect(() => {
      fetch('/api/v1/users/')
        .then(results => results.json())
        .then(data => {
          setLst(data.map((item: any) => ({
            username: item.username,
            id: item.id
          })));
        });
    }, []);

    // const onDrop = () => {

    //   axios.get('/api/v1/users/')
    //   .then(function (response) {
    //       setLst(response.data.map((item: any) =>({
    //         username: item.username,
    //         id: item.id
    //       })))
    //     console.log(lst)
    //   })

    //   .catch(function (error) {
    //     console.log(error);
    //   });
    // };
    // const StyledLink = styled(Link)({ textDecoration: 'none' });
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
                    Update Project
                </Typography>
                </Box>
            </Box>  
                <Grid container spacing={1}>
                <Grid item xs={12}>
                {status.isSubmitted ? status.status ? 
                <p style={{ color : "green"}}>Project Saved Successfully!!.</p>:
                  <p style={{ color : "red"}}>Project Not Saved!!.</p> : null
                }
                 <label style={{ width : "100px" , height: "40px", margin:"10px", fontSize:"18px"}}>Project Name</label> 
                 &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                 &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                 <input style={{ width : "900px" , height: "40px", margin:"10px"}} name="name" defaultValue={project.name} 
                 placeholder="Project Name here" ref={register({ required: true, maxLength: 100 })}  />
            </Grid>
            
            <Grid item xs={12}>
                 <label style={{ width : "100px" , height: "40px", margin:"10px", fontSize:"18px"}}>Project Description</label>
                 &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                 <input style={{ width : "900px" , height: "40px", margin:"10px"}} name="des" defaultValue={project.description} placeholder="Project Description here" ref={register({ required: true, maxLength: 2000 })}  />
            </Grid>

            <Grid item xs={12}>
                  <label style={{ width : "100px" , height: "40px", margin:"10px", fontSize:"18px"}}>Project Start Date</label>
                  &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                  &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                  <input type='date' style={{ width : "900px" , height: "40px", margin:"10px"}} name="startdate" defaultValue={String(project.start_date).split('T')[0]} ref={register({ required: true })}  />
            </Grid>
            
            <Grid item xs={12}>
              
                <Box>
                    <label style={{ width : "100px" , height: "40px", margin:"10px", fontSize:"18px"}}>Responsible</label>
                    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                    <select style={{ width : "300px" , height: "40px", margin:"10px", fontSize:"18px"}} defaultValue= {project.users} name="res" ref={register}> 
                    {lst.map((list:any) => (
                    <option value= {list.id} key={list.id}> {list.username} </option>
                    ))}
                    </select> 
                    {/* <Box fontWeight={800} clone>
                        <Button
                            type = "button"
                            // onClick={() => onDrop()}
                            variant="contained"
                            size="large"
                            color="primary"
                            style={{margin: 5}}>
                            Load
                        </Button>
                    </Box> */}
                    {/* <button style={{ width : "200px" , height: "40px", margin:"10px",backgroundColor: 'lightGreen', fontStyle: "inherit"}}  type="button" onClick={() => onDrop()}>Load</button> */}
                    
                </Box>
            </Grid>

            <Grid item xs={12}>
                 <label style={{ width : "100px" , height: "40px", margin:"10px", fontSize:"18px"}}>Expected Completion Date</label>
                
                 <input type='date' style={{ width : "890px" , height: "40px", margin:"10px"}} name="enddate" defaultValue={String(project.end_date).split('T')[0]} ref={register({ required: true})} />
            </Grid>
            </Grid>
            <Box fontWeight={800} clone>
                <Button
                    type = "submit"
                    variant="contained"
                    size="large"
                    color="primary"
                    style={{margin: 5}}>
                    Update Project
                </Button>
            </Box>
      {/* <input style={{ width : "300px" , height: "40px", margin:"20px",backgroundColor: 'lightGreen', fontStyle: "inherit"}} type="submit"/> */}
        
    </form>
    );
}