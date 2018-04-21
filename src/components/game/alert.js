import Button from 'material-ui/Button';
import Dialog, {
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from 'material-ui/Dialog';
import Grid from 'material-ui/Grid';
import React from 'react';
import { connect } from 'react-redux';
import { Game } from 'connect_four_functional';

import { Auth, Game as GMod } from '../../modules';
import { withSwitch } from '../wrappers';

const { winner } = Game;

const isOver = game => game.players.length > 1 && winner(game);

const invert = fn => () => fn(x => !x);

const mapState = ({ game }) => ({
  game,
  winner: isOver(game),
  negate: invert,
  open: !!isOver(game),
});

const WinnerDialog = ({
  game, open, toggle, resetGame, clearGameFB,
}) => (
  <Grid container>
    <Grid item xs>
      <Button onClick={toggle}>Open alert dialog</Button>
      <Dialog open={open}>
        <DialogTitle>
          {winner && `The Game is over, the winner is ${winner.name}`}
          <Button onClick={toggle}>Close alert dialog</Button>
        </DialogTitle>
        <DialogContent>
          <DialogContentText>
            Reset the game to play against your oppnonent once more. Or clear
            the game to log out and let others play
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => clearGameFB() && toggle()}>Clear game</Button>
          <Button onClick={() => resetGame(game) && toggle()}>
            Reset game
          </Button>
        </DialogActions>
      </Dialog>
    </Grid>
  </Grid>
);

export default connect(mapState, { ...Auth.actions, ...GMod.actions })(withSwitch(WinnerDialog));
