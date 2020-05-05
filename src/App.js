
import React from 'react'
import useClickReducer from './useClickReducer'

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
export default function App() {
    const [state, dispatch] = useClickReducer()
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
                        <button className="button js-restart" onClick={() => dispatch({ type: "CLICK_RESTART" })}>RESTART</button>
                    </div>
                </div>
            </main>
        </div>
    )
}