
import React from "react";
import { Cell, TileId} from "./tile";
import { Field } from "./field";

interface BoardProps {
  field: React.MutableRefObject<Field>,
  tiles: TileId[],
}

interface BoardState {
}

export class Board extends React.Component<BoardProps, BoardState> {
  
  constructor( props: BoardProps ) {
    super(props);
  }

  genTiles() : JSX.Element[] {
    const out: JSX.Element[] = [];
  
    for (let i = 0; i < this.props.tiles.length; i++)
      out.push(
        <div style={{
          width: '3em',
          height: '3em',
          display: 'flex'
        }}>
          <Cell y={0} x={i} isValid={true} tileId={this.props.tiles[i]} isTileSelected={()=>{
            return this.props.field.current.selectedTile != null;

          }} isCellGood={( cell: Cell )=>{
            return false;

         }} onSelect={( cell: Cell )=>{
            console.log("Selected tile on board" + cell.state.tileId);
            this.props.field.current.selectTile({ id: cell.state.tileId, x: cell.props.x, y: cell.props.y }, cell);

         }} onSet={( newCell: Cell )=>{
            console.log("You can't move the tile back to board!!!:(" + newCell.state.tileId);
          }}/>
        </div>
      );
  
    return out;
  }

  render() {

    return (
      <div style={{
        flex: 1,
        display: 'flex',
        flexWrap: 'wrap',
        alignContent: 'flex-start',
      }}>
        {this.genTiles()}
      </div>
    );
  }

}