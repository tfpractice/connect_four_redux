import React from 'react';
import { connect, } from 'react-redux';
import Card, { CardHeader, } from 'material-ui/Card';
import { Game, Player, } from 'connect_four_functional';

const { id, } = Player;
const { active, } = Game;
const isActive = player => game => id(active(game)) == id(player);

const stateToProps = ({ game, }, { player, }) => ({ isActive: isActive(player)(game), });

const pStyle = isActive => isActive ? { backgroundColor: '#f0f', } : {};

const PlayerCard = ({ player, isActive, }) => (
  
  <Card style={pStyle(isActive)}>
    <CardHeader title={player.name}/>
  </Card>
);

export default connect(stateToProps)(PlayerCard);
