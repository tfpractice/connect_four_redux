import React, { Component } from 'react';
import Button from 'material-ui/Button';
import Grid from 'material-ui/Grid';
import Dialog, {
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from 'material-ui/Dialog';
import { compose, withHandlers, withState } from 'recompose';
import { connect } from 'react-redux';
import { Game } from 'connect_four_functional';

import { GameActs } from '../../modules';

const { winner } = Game;

const isOver = game => game.players.length > 1 && winner(game);
const withSwitch = compose(
  withState('open', 'turn', ({ open }) => !!open),
  withHandlers({ toggle: ({ turn }) => () => turn(x => !x) })
);

const invert = fn => () => fn(x => !x);
const stateToProps = ({ game }) => ({
  game,
  winner: isOver(game),
  negate: invert,
  open: !!isOver(game),
});

const WinnerDialog = ({
  game,
  open,
  toggle,
  negate,
  winner,
  start,
  resetGame,
  clearGame,
}) =>
  (<Grid container>
    <Grid item xs>
      <Button onClick={toggle}>Open alert dialog</Button>
      <Dialog open={open} onRequestClose={negate(toggle)}>
        <DialogTitle>
          {winner && `The Game is over, the winner is ${winner.name}`}
        </DialogTitle>
        <DialogContent>
          <DialogContentText>
            Reset the game to play against your oppnonent once more. Or clear
            the game to log out and let others play
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => clearGame() && toggle()}>Clear game</Button>
          <Button onClick={() => resetGame(game) && toggle()}>
            Reset game
          </Button>
        </DialogActions>
      </Dialog>
    </Grid>
  </Grid>);

export default connect(stateToProps, GameActs)(withSwitch(WinnerDialog));
