import React from 'react'
import { useStore, useDispatch } from './context'
import Footer from './modules/Footer'
import Board from './modules/Board'
import Header from './modules/Header'

import "./App.css"

export default function App() {

    return (
        <div className="l-container">
            <main className="l-main">
                <Header />
                <Board />
                <Footer />
            </main>
        </div>
    )
}