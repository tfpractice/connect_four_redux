import { compose, withHandlers, withState } from "recompose";

const withSwitch = compose(
  withState(`open`, `turn`, ({ open }) => !!open),
  withHandlers({ toggle: ({ turn }) => () => turn(x => !x) })
);

// const invert = fn => () => fn(x => !x);

export default withSwitch;
