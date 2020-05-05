import React from 'react'
import { useStore, useDispatch } from '../context'

export default function Footer() {
    const state = useStore()
    const dispatch = useDispatch()
    return (
        < div className="l-footer footer" >
            <div className="state-message js-state-message">{state.message}</div>
            <div>
                <button className="button js-restart" onClick={() => dispatch({ type: "CLICK_RESTART" })}>RESTART</button>
            </div>
        </div>

    )
}