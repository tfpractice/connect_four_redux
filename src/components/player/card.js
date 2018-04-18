import Card, { CardHeader } from "material-ui/Card";
import React from "react";
import { connect } from "react-redux";
import { Game, Player } from "connect_four_functional";

import { pColorRange } from "../../utils/viz";

const range = [ `#fff`, `#C62828`, `#000` ];

const colors = game =>
  game.players
    .map((p, i) => [ p.id, pColorRange(game.players)(range)(p.id) ])
    .reduce((p, [ key, val ]) => Object.assign(p, { [key]: val }), {});

const { id } = Player;

const { active } = Game;

const isActive = player => game => id(active(game)) == id(player);

const stateToProps = ({ game }, { player }) => ({
  isActive: isActive(player)(game),
  color: colors(game)[player.id],
});

const PlayerCard = ({ player, isActive, color }) => (
  <Card style={{ backgroundColor: color }}>
    <CardHeader title={player.name} subheader={player.id} />
  </Card>
);

export default connect(stateToProps)(PlayerCard);
