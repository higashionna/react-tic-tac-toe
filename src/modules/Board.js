import React from 'react'
import { useStore, useDispatch } from '../context'

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

export default function Footer() {
    const state = useStore()
    const dispatch = useDispatch()
    const cell = (i) => <Cell className="cell js-cell" onClick={() => dispatch({ type: "CLICK_CELL", index: i })}>{state.cells[i]}</Cell>

    return (
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

    )
}