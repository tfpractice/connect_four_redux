import { onlineRef } from './refs';

export const addDiscon = ref =>
  Promise.resolve(ref.onDisconnect())
    .then(dRef => {
      console.log(`conn`, ref.child(`connections`));

      ref.child(`connections`).on(`value`, snap => {
        console.log(`connection valu`, snap.val());

        snap.hasChildren() === false
          ? dRef.remove()
          : dRef.update({ connections: ref.child(`connections`).push().key });
      });
      console.log(`dref removed`, dRef, ref.toJSON());
    })
    .then(r => {
      console.log(`addDiscon`, r, ref);
      return ref;
    });

export const catConn = ref =>
  Promise.resolve(ref.child(`connections`).push())
    .then(pref =>
      pref
        .onDisconnect()
        .remove()
        .then(() => pref.set(Date.now())))
    .then(() => ref);

const updateRef = u => ref => ref.update(u).then(() => ref);

export const addOnline = u => () =>
  Promise.resolve(onlineRef.child(u.id))
    .then(updateRef(u))
    .then(catConn)
    .catch(console.error);

export const goOffline = ({ id }) => {
  console.log(`going offline`, onlineRef.child(`${id}`));
  return onlineRef.child(`${id}`).remove();
};
