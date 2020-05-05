import React from 'react'
import { useStore } from '../context'

export default function Header() {
    const state = useStore()

    return (
        <>
            <header className="header">
                <h1>TIC TAC TOE</h1>
            </header>
            <div className="display">
                <div className="turn">
                    {state.circleTurn}
                    {state.crossTurn}
                </div>
            </div>
        </>
    )
}