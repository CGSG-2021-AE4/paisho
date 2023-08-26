import React from "react";
import { Cell, Tile } from "./tile";

const W = 17;
const H = 17;

const centerX = 8;
const centerY = 8;



interface FieldProps {
  isCellGood: ( selectedTile: Tile, cell: Cell )=>boolean,
}

interface FieldState {
}

export class Field extends React.Component<FieldProps, FieldState> {
  selectedTile: Tile = null;
  selectedCell: Cell = null;

  constructor( props: FieldProps ) {
    super(props);
  }

  selectTile( tile: Tile, cell?: Cell ): void {
    if (this.selectedCell != null)
    {
      this.selectedCell.onUnselect();
      this.selectedCell = null;
    }
    this.selectedTile = tile;

    if (cell != undefined)
    {
      this.selectedCell = cell;
      this.selectedCell.onSelect();
    }
  }

  genTiles(): JSX.Element[] {
    const out: JSX.Element[] = [];
  
    for (let y = 0; y < H; y++)
      for (let x = 0; x < H; x++)
        out.push(
          <div style={{
            width: 100 / W + "%",
            height: 100 / H + "%",
            display: 'flex'
          }}>
            <Cell y={centerY - y} x={x - centerX} isValid={((y - centerY) * (y - centerY) + (x - centerX) * (x - centerX) <= (W + 0.9) * (H + 0.9) / 4)} isTileSelected={()=>{
              return this.selectedTile != null;
              
            }} isCellGood={( cell: Cell )=>{
              return this.props.isCellGood(this.selectedTile, cell);

            }} onSelect={( cell: Cell )=>{
              console.log("Selected tile" + cell.state.tileId);
              this.selectTile({ id: cell.state.tileId, x: cell.props.x, y: cell.props.y }, cell);
            }} onSet={( newCell: Cell )=>{
              if (this.selectedTile == null)
                return;
              
              console.log("Set tile" + newCell.state.tileId);
              if (this.selectedCell != null) // Tile might be from board
                this.selectedCell.removeTile();
              newCell.setTile(this.selectedTile.id);
              this.selectedCell = null;
              this.selectedTile = null;
            }}/>
          </div>
        );
  
    return out;
  }

  render() {
    return (
      <div style={{
        position: 'relative',
        aspectRatio: 1,
        display: 'flex',
      }}>
        <img style={{
          width: '100%',
          height: '100%',
          position: 'absolute',
        }} src="./bin/imgs/board.png"/>
        <div style={{
          width: '100%',
          height: '100%',
          position: 'absolute',
          display: 'flex',
        }}> 
          <div style={{
            flex: 1,
            margin: 50/18 + "%",
            display: 'flex',
            flexWrap: 'wrap',
          }}>
            {this.genTiles()}
          </div>
        </div>
      </div>
    );
  }

}