import React from 'react';
import AppBar from 'material-ui/AppBar';
import Toolbar from 'material-ui/Toolbar';
import Text from 'material-ui/Typography';
import Grid from 'material-ui/Grid';
import { Link, } from 'react-router-dom';
import { LoginForm, } from './auth';

const Nav = (props) => {
  console.log('props', props);
  return (
   <AppBar>
     <Toolbar>
       <Grid container justify="space-between" direction="row" align="center">
         <Grid item>
           <Grid container direction="row" align="center">
             <Link to="/" >
               <Text type="headline" secondary >
                 Connect Four Redux
               </Text>
             </Link>
           </Grid>
         </Grid>
         <Grid item>
           <LoginForm formID={'mainLogin'}/>
         </Grid>
       </Grid>
     </Toolbar>
   </AppBar>
  );
};

export default Nav;
