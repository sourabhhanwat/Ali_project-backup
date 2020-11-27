import Box from '@material-ui/core/Box';
import Grid from '@material-ui/core/Grid';
import { RouteComponentProps, useMatch } from '@reach/router';
import React from 'react';
import '../modules/Subject';
import { Typography, styled, Avatar, Button } from '@material-ui/core';
import { useForm} from 'react-hook-form';
import axios from "axios";
import PlatformIcon from './icons/Platform';

const StyledAvatar = styled(Avatar)(({ theme }) => ({
    backgroundColor: theme.palette.secondary.main,
}));
  

interface IFormInput {
  name: String;
  des: String;
  res: String;
  pro: String;
}

export default function UpdatePlatform(this: any, {platformId,}: RouteComponentProps<{platformId: number;}>) {

    const { register, handleSubmit } = useForm<IFormInput>();
    const [lst, setLst] = React.useState([])
    const [platform, updatePlatform] = React.useState<any>([]);
    const [project, updateProject] = React.useState<any>([]);

    const [status, setStatus] = React.useState({
      isSubmitted : false,
      status : false,
    })

    const match = useMatch('/dashboard/UpdatePlatform/:platformId');

    if (match) {
        platformId = parseInt((match as any).platformId);
    }
    
    React.useEffect(() => {
      fetch(`/api/v1/platforms/${platformId}`)
        .then(results => results.json())
        .then(data => {
          updatePlatform(data);
        });
    }, []);

    React.useEffect(() => {
        fetch('/api/v1/projects')
          .then(results => results.json())
          .then(data => {
            updateProject(data);
          });
      }, []);

    const onSubmit = (data: IFormInput,e:any) => {
      console.log(data);
      
      axios.post('/api/v1/updateplatform/', {
        Name: data.name,
        Description: data.des,
        Responsible: data.res,
        Project: data.pro,
        platformId : platformId,
      })
      .then(function (response) {
        console.log(response);
        setStatus({
          isSubmitted : true,
          status : response.data.status,
        })
    })
      .catch(function (error) {
        console.log(error);
      });
      e.target.reset();
    };

    React.useEffect(() => {
        fetch('/api/v1/users')
          .then(results => results.json())
          .then(data => {
            setLst(data);
          });
      }, []);

    // const onDrop = () => {
    //   axios.get('/api/v1/users/')
    //   .then(function (response) {
    //     setLst(response.data.map((item : any) => ({
    //       username : item.username,
    //       id : item.id,
    //     })))
    //   })
    //   .catch(function (error) {
    //     console.log(error);
    //   });
    // };

    // if(status )

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
            <Box
              display="flex"
              flexDirection="column"
              alignItems="center"
              mb={8}>

              <Box display="flex" justifyContent="center" mb={2}>
            <StyledAvatar>
              <PlatformIcon />
            </StyledAvatar>
             </Box>
            
                <Box display="flex" justifyContent="center" mb={2}>
                <Typography component="h1" variant="h5" align="center">
                    New Platform
                </Typography>
                </Box>

            </Box>  
                <Grid container spacing={1}>
             <Grid item xs={12}>

                {status.isSubmitted ? status.status ? 
                  <p style={{color: "green"}}>Data Submitted Succesfully!!..</p> : 
                  <p style={{ color : "red"}}>Data Not Saved!!.</p> : null
                }

                 <label style={{ width : "100px" , height: "40px", margin:"10px", fontSize:"18px"}}>Platform Name</label> 
                 &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                 &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                 <input style={{ width : "900px" , height: "40px", margin:"10px"}} name="name" defaultValue={platform.name} placeholder="Platform Name here" ref={register({ required: true, maxLength: 100 })}  />
            </Grid>
            
            <Grid item xs={12}>
                 <label style={{ width : "100px" , height: "40px", margin:"10px", fontSize:"18px"}}>Platform Description</label>
                 &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                 <input style={{ width : "900px" , height: "40px", margin:"10px"}} name="des" defaultValue={platform.description} placeholder="Platform Description here" ref={register({ required: true, maxLength: 2000 })}  />
            </Grid>
            
            <Grid item xs={12}>
            <Box>
                    <label style={{ width : "100px" , height: "40px", margin:"10px", fontSize:"18px"}}>Responsible</label>
                    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; &nbsp;&nbsp;&nbsp;&nbsp;
                    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;

                    <select style={{ width : "300px" , height: "40px", margin:"10px", fontSize:"18px"}} defaultValue="res" name="res" ref={register}> 
                    {lst.map((list: any) => (
                    <option value= {list.id} key={list.id}> {list.username} </option>
                    ))}
                    </select> 
                    {/* <Box fontWeight={800} clone>
                          <Button
                              type = "button"
                              variant="contained"
                              onClick={() => onDrop()}
                              size="large"
                              color="primary"
                              style={{margin: 5}}>
                              Load
                          </Button>
                      </Box> */}
                </Box>
            </Grid>

            <Grid item xs={12}>
            <Box>
                    <label style={{ width : "100px" , height: "40px", margin:"10px", fontSize:"18px"}}>Projects</label>
                    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; &nbsp;&nbsp;&nbsp;&nbsp;
                    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;

                 {/* <input style={{ width : "400px" , height: "40px", margin:"10px"}}  defaultValue="pro" ref={register} /> */}
                    
                    <select style={{ width : "300px" , height: "40px", margin:"10px", fontSize:"18px"}} name="pro" ref={register}> 
                    {project.map((list: any) => (
                    <option value= {list.id} key={list.id}> {list.name} </option>
                    ))}
                    </select> 
                    
                </Box>
            </Grid>

            </Grid>
            <Box fontWeight={800} clone>
                <Button
                    type = "submit"
                    variant="contained"
                    size="large"
                    color="primary"
                    style={{margin: 5}}>
                    Update Platform
                </Button>
            </Box>
    </form>
    );
}