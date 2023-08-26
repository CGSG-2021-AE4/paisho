
import { renderC } from './components/comp';
import { Field } from './components/field';
import { Board } from './components/board';
import React from 'react';
import { TileId } from './components/tile';

const DefTileKit = [
  TileId.BR3,
  TileId.BR4,
  TileId.BR5,
  TileId.BW3,
  TileId.BW4,
  TileId.BW5,

  TileId.BR3,
  TileId.BR4,
  TileId.BR5,
  TileId.BW3,
  TileId.BW4,
  TileId.BW5,

  TileId.BR3,
  TileId.BR4,
  TileId.BR5,
  TileId.BW3,
  TileId.BW4,
  TileId.BW5,

  TileId.BR,
  TileId.BW,
  TileId.BK,
  TileId.BB,
  TileId.BL,
  TileId.BO,
];

function Game(): JSX.Element {
  const fieldRef = React.useRef(null);

  return (
    <>
      <Field ref={fieldRef} isCellGood={( tile, cell )=>{ return true; }}/>
      <Board field={fieldRef} tiles={DefTileKit}/> {/* Black */}
      <Board field={fieldRef} tiles={DefTileKit.map(e=>{ return e + 12; })}/> {/* White */}
    </>
  );
}

renderC('layer0', <div className="flex1 flexBox" style={{ padding: '3em' }}><Game/></div>);
