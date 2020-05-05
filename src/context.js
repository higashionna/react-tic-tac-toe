import React, { useReducer, useMemo } from 'react'
import styled from 'styled-components'

// const

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

// Hooks Custom Reducer Create

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

// Create Store

const storeContext = React.createContext();
const dispatchContext = React.createContext();

export const StoreProvider = ({ children }) => {
    const [store, dispatch] = useReducer(reducer, initialState)
    const contextValue = useMemo(() => [store, dispatch],
        [store, dispatch],
    )

    return (
        <dispatchContext.Provider value={contextValue[1]}>
            <storeContext.Provider value={contextValue[0]}>
                {children}
            </storeContext.Provider>
        </dispatchContext.Provider>
    )
}

export function useStore() {
    return React.useContext(storeContext)
}
export function useDispatch() {
    return React.useContext(dispatchContext)
}