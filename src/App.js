
import React, { useReducer } from 'react'

import "./App.css"
import styled from 'styled-components'

const Table = styled.table`
    border-collapse: collapse;
    margin: 0 auto;
`
const Cell = styled.td`
    border: solid 2px black;
    width: 50px;
    height: 50px;
    cursor: pointer;
    text-align: center;
    font-size: 25px;    
`
const Active = styled.div`
    border-bottom: 4px solid black;
`

const STATUSES = {
    stating: 'starting...',
    win: '%name% win!!',
    draw: 'draw',
    play: 'playing!!',
}

const CHARACTERS = {
    circle: '○',
    cross: '×',
}

const initialState = {
    handCount: 0,
    isCircleTurn: true,
    circleTurn: <div className="turn-item"><Active>〇</Active></div>,
    crossTurn: <div className="turn-item">×</div>,
    cells: {
        "0": null,
        "1": null,
        "2": null,
        "3": null,
        "4": null,
        "5": null,
        "6": null,
        "7": null,
        "8": null
    },
    progress: true,
    message: STATUSES.stating,
}

const winLine = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
]

function checkWinner(cells) {
    for (let i = 0; i <= winLine.length - 1; i++) {
        const winLineCell = winLine[i]
        let a = cells[winLineCell[0]]
        let b = cells[winLineCell[1]]
        let c = cells[winLineCell[2]]
        if (a === null || b === null || c === null) {
            continue
        }
        if (a === b && b === c) {
            return true
        }
    }
}

const reducer = (state, action) => {
    switch (action.type) {
        case 'CLICK_CELL':
            var cells = state.cells
            var isCircleTurn = state.isCircleTurn
            var progress = state.progress
            var message = STATUSES.play
            var handCount = state.handCount
            var circleTurn = state.circleTurn
            var crossTurn = state.crossTurn

            if (cells[action.index] || !progress) {
                return state
            }

            var turn = state.isCircleTurn ? CHARACTERS.circle : CHARACTERS.cross
            cells[action.index] = turn

            handCount = handCount + 1

            if (handCount === 9 || !progress) {
                progress = false
                message = STATUSES.draw
            }

            if (checkWinner(cells)) {
                progress = false
                const winMessage = isCircleTurn ? STATUSES.win.replace('%name%', CHARACTERS.circle) : STATUSES.win.replace('%name%', CHARACTERS.cross)
                message = winMessage
            }

            if (state.isCircleTurn) {
                circleTurn = <div className="turn-item">〇</div>
                crossTurn = <div className="turn-item"><Active>×</Active></div>
            } else {
                circleTurn = <div className="turn-item"><Active>〇</Active></div>
                crossTurn = <div className="turn-item">×</div>
            }

            return {
                ...state,
                handCount: handCount,
                isCircleTurn: !isCircleTurn,
                circleTurn: circleTurn,
                crossTurn: crossTurn,
                cells,
                progress,
                message,
            }

        case 'CLICK_RESTART':
            return {
                handCount: 0,
                isCircleTurn: true,
                circleTurn: <div className="turn-item"><Active>〇</Active></div>,
                crossTurn: <div className="turn-item">×</div>,
                cells: {
                    "0": null,
                    "1": null,
                    "2": null,
                    "3": null,
                    "4": null,
                    "5": null,
                    "6": null,
                    "7": null,
                    "8": null
                },
                progress: true,
                message: STATUSES.stating,
            }
        default: return state
    }
}

export default function App() {
    const [state, dispatch] = useReducer(reducer, initialState)
    const cell = (i) => <Cell className="cell js-cell" onClick={() => dispatch({ type: "CLICK_CELL", index: i })}>{state.cells[i]}</Cell>

    return (
        <div className="l-container">
            <main className="l-main">
                <header className="header">
                    <h1>TIC TAC TOE</h1>
                </header>
                <div className="display">
                    <div className="turn">
                        {state.circleTurn}
                        {state.crossTurn}
                    </div>
                </div>
                <div className="l-board">
                    <Table>
                        <tbody>
                            <tr>
                                {cell(0)}
                                {cell(1)}
                                {cell(2)}
                            </tr>
                            <tr>
                                {cell(3)}
                                {cell(4)}
                                {cell(5)}
                            </tr>
                            <tr>
                                {cell(6)}
                                {cell(7)}
                                {cell(8)}
                            </tr>
                        </tbody>
                    </Table>
                </div>
                <div className="l-footer footer">
                    <div className="state-message js-state-message">{state.message}</div>
                    <div>
                        <a className="button js-restart" onClick={() => dispatch({ type: "CLICK_RESTART" })}>RESTART</a>
                    </div>
                </div>
            </main>
        </div>
    )
}