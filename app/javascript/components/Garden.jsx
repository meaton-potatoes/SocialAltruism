import React, { Component } from 'react'
import { Spinner } from 'components'
import trees from 'images/trees'
import tileImage from 'images/grass-tile'
console.log(trees)

const TILE_BASE_POSITION = {top: 0, left: 0}
const TILE_VERTICAL_OFFSET = {top: 46, left: 45}
const TILE_HORIZONTAL_OFFSET = {top: -29, left: 71}
const TOTAL_ROWS = 2
const ROW_LENGTH = 4

class Garden extends Component {
  constructor() {
    super()
    this.state = {}
  }

  // gardenSize() {
  //   if (this.size) {
  //     return this.size
  //   }

  //   const element = $('#garden-sizer')
  //   const height = element.height()
  //   const width = element.width()
  //   this.size = { height, width }
  // }

  randomTree() {
    return trees[Math.round(Math.random(trees.length) * trees.length)]
  }

  renderTiles() {
    const calculateStyle = (row, column) => {
      const x = (row + 1) * (column + 1)
      const zIndex = TOTAL_ROWS - row + 1
      const normalOffset = Object.fromEntries(['top', 'left'].map(attr => [attr, (TILE_VERTICAL_OFFSET[attr] * x) + TILE_BASE_POSITION[attr]]))
      return { top: `${normalOffset.top}px`, left: `${normalOffset.left}px`, zIndex: zIndex }
    }

    return (
      <div id='tiles'>
        {
          [...Array(TOTAL_ROWS)].map((_, row) => {
            return (
              <div class='column'>
                {
                  [...Array(ROW_LENGTH)].map((_, column) => {
                    return <img src={tileImage}
                                className='tile'
                                style={calculateStyle(row, column)}
                                key={`tile-${row}`}
                          />
                  })
                }
              </div>
            )
          })
        }
      </div>
    )
    for (let row = 0; row < TOTAL_ROWS; row++) {
      for (let column = 0; column < ROW_LENGTH; column++) {
        const num = row * column

      }
    }
  }

  render() {
    const { stats } = this.state

    return (
      <div className='card' style={{ marginBottom: '20px', height: '500px' }}>
        <div className='card-body'>
          <div id="garden">
            { this.renderTiles() }
          </div> 
        </div>
      </div>
    )
  }
}

export default Garden
