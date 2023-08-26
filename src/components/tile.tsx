import React from "react";

export enum TileId {
  // Black
  BR3 = 0,
  BR4 = 1,
  BR5 = 2,
  BW3 = 3,
  BW4 = 4,
  BW5 = 5,
  BR  = 6,
  BW  = 7,
  BK  = 8,
  BB  = 9,
  BL  = 10,
  BO  = 11,

  // White
  WR3 = 12,
  WR4 = 13,
  WR5 = 14,
  WW3 = 15,
  WW4 = 16,
  WW5 = 17,
  WR  = 18,
  WW  = 19,
  WK  = 20,
  WB  = 21,
  WL  = 22,
  WO  = 23,
}

export enum TileType {
  Red3,
  Red4,
  Red5,
  White3,
  White4,
  White5,
  Accent,
  Special
}

export interface TileData {
  type: TileType,
  side: string,
  name: string,
  img: string,
}

export const tilesData: TileData[]  = [
  // Black
  { type: TileType.Red3,    side: "Black", name: "Rose",          img: "BR3.png" },
  { type: TileType.Red4,    side: "Black", name: "Chrysanthemum", img: "BR4.png" },
  { type: TileType.Red5,    side: "Black", name: "Rhododendron",  img: "BR5.png" },
  { type: TileType.White3,  side: "Black", name: "Jasmine",       img: "BW3.png" },
  { type: TileType.White4,  side: "Black", name: "Lily",          img: "BW4.png" },
  { type: TileType.White5,  side: "Black", name: "White Jade",    img: "BW5.png" },
  { type: TileType.Accent,  side: "Black", name: "Rock",          img: "BR.png" },
  { type: TileType.Accent,  side: "Black", name: "Wheel",         img: "BW.png" },
  { type: TileType.Accent,  side: "Black", name: "Knotweed",      img: "BK.png" },
  { type: TileType.Accent,  side: "Black", name: "Boat",          img: "BB.png" },
  { type: TileType.Special, side: "Black", name: "White Lotus",   img: "BL.png" },
  { type: TileType.Special, side: "Black", name: "Orchid",        img: "BO.png" },

  // White
  { type: TileType.Red3,    side: "White", name: "Rose",          img: "WR3.png" },
  { type: TileType.Red4,    side: "White", name: "Chrysanthemum", img: "WR4.png" },
  { type: TileType.Red5,    side: "White", name: "Rhododendron",  img: "WR5.png" },
  { type: TileType.White3,  side: "White", name: "Jasmine",       img: "WW3.png" },
  { type: TileType.White4,  side: "White", name: "Lily",          img: "WW4.png" },
  { type: TileType.White5,  side: "White", name: "White Jade",    img: "WW5.png" },
  { type: TileType.Accent,  side: "White", name: "Rock",          img: "WR.png" },
  { type: TileType.Accent,  side: "White", name: "Wheel",         img: "WW.png" },
  { type: TileType.Accent,  side: "White", name: "Knotweed",      img: "WK.png" },
  { type: TileType.Accent,  side: "White", name: "Boat",          img: "WB.png" },
  { type: TileType.Special, side: "White", name: "White Lotus",   img: "WL.png" },
  { type: TileType.Special, side: "White", name: "Orchid",        img: "WO.png" },
];

export interface Tile {
  id: TileId,
  x: number,
  y: number,
}

interface CellProps {
  x: number,
  y: number,
  isValid: boolean,
  tileId?: TileId,

  // Callbacks
  isCellGood: ( cell: Cell )=>boolean,
  isTileSelected: ()=>boolean,
  onSet: ( cell: Cell )=>void,
  onSelect: ( cell: Cell )=>void,
}

interface CellState {
  hasTile: boolean,
  tileId: TileId,
  isHover: boolean,
  isSelected: boolean
}

export class Cell extends React.Component<CellProps, CellState> {
  
  constructor( props: CellProps ) {
    super(props);
    this.state = {
      hasTile: props.tileId != undefined,
      tileId: props.tileId,
      isHover: false,
      isSelected: false
    };
  }

  onSelect(): void {
    this.setState({ isSelected: true });
  }

  onUnselect(): void {
    this.setState({ isSelected: false });
  }

  setTile( id: TileId ): void {
    this.setState({
      hasTile: true,
      tileId: id,
    });
  }
  
  removeTile(): void {
    this.setState({
      hasTile: false,
      tileId: undefined,
      isSelected: false,
    });
  }

  getBackColor(): string {
    if (!this.state.isHover)
      return 'transparent';

    if (this.props.isTileSelected()) {
      if (this.state.hasTile || !this.props.isCellGood(this))
        return 'var(--tile-bad-shadow)';
      else
        return 'var(--tile-good-shadow)';
    } else {
      if (this.state.hasTile)
        return 'var(--tile-shadow)';
    }

    
  }

  render() {
    if (!this.props.isValid)
      return (<></>);

    return (
      <div style={{
        flex: 1,
        margin: '5%',
        userSelect: 'none',
        display: 'flex',
        backgroundColor: this.getBackColor(),
      }} onMouseOver={()=>{
        console.log(this);
        this.setState({ isHover: true });
      }} onMouseLeave={()=>{
        this.setState({ isHover: false });
      }} onClick={()=>{
        if (this.state.hasTile)
          this.props.onSelect(this);
        else
          this.props.onSet(this);
      }}>
        {this.state.hasTile && <img src={"./bin/imgs/tiles/" + tilesData[this.state.tileId].img}></img>}
        {/** /}
        <p style={{ paddingBlock: '0.1em', fontSize: '0.9em' }}>X: {this.props.x}</p>
        <p style={{ paddingBlock: '0.1em', fontSize: '0.9em' }}>Y: {this.props.y}</p>
        {/**/}
      </div>
    );
  }

}