import React, { Component } from 'react';
import Button from 'material-ui/Button';
import Dialog, {
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from 'material-ui/Dialog';

import { compose, withHandlers, withState } from 'recompose';
import { connect } from 'react-redux';
import { Game } from 'connect_four_functional';

const { winner } = Game;
const isOver = game => game.players.length > 1 && winner(game);
const withSwitch = compose(
  withState('open', 'turn', ({ open }) => !!open),
  withHandlers({ toggle: ({ turn }) => () => turn(x => !x) })
);
const invert = fn => () => {
  console.log('INVERITNG');
  return fn(x => !x);
};

const stateToProps = ({ game }, { toggle, ...rest }) => {
  console.log('winner(game)', winner(game));

  console.log('isOver(game)', isOver(game));
  return {
    game,
    winner: isOver(game),
    negate: invert,
    open: !!isOver(game),
  };
};

const WinnerDialog = ({ game, open, toggle, negate, winner }) =>
  open &&
  <div>
    <Button onClick={toggle}>Open alert dialog</Button>
    <Dialog open={open} onRequestClose={negate(toggle)}>
      <DialogTitle>
        {winner && `The Game is over, the winner is ${winner.name}`}
      </DialogTitle>
      <DialogContent>
        <DialogContentText>
          Let Google help apps determine location. This means sending anonymous
          location data to Google, even when no apps are running.
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={toggle} color="primary">
          Disagree
        </Button>
        <Button onClick={toggle} color="primary">
          Agree
        </Button>
      </DialogActions>
    </Dialog>
  </div>;

export default connect(stateToProps)(withSwitch(WinnerDialog));
