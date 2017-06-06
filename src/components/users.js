import React from 'react';
import { connect, } from 'react-redux';
import Button from 'material-ui/Button';
import Grid from 'material-ui/Grid';
import { UserActs, } from '../modules';
import { Game, } from 'connect_four_functional';
import Text from 'material-ui/Typography';
import List, { ListItem, ListItemAvatar, ListItemIcon, ListItemText, ListSubheader, } from 'material-ui/List';
import Avatar from 'material-ui/Avatar';
const mapStateToProps = ({ users, game, auth: { user, }, }) =>
({ users, game, id: user && user.id, active: Game.active(game), });
const Users = ({ users, addUser, id, game, active, }) => (
     <Grid container direction="column" justify="center" align="center" className="App">
       <Grid item xs={11} className="App-header">
         {active && <Text align="center">
           {`the current player is ${active.name || active.id}`}
         </Text>}
         <List dense>
           <ListSubheader>
             <Text align="center">users</Text>
           </ListSubheader>
           {game.players.map((u, i) => (
             <ListItem key={u.id}>
               <ListItemAvatar>
                 <Avatar>
                   {`${i}`}
                 </Avatar>
               </ListItemAvatar>
               <ListItemText primary={u.name || u.id} secondary={ u.id} />
             </ListItem>))}
         </List>
       </Grid>
     </Grid>
   );

export default connect(mapStateToProps, UserActs)(Users);
