import React from 'react'
import ReactDOM from 'react-dom'
import { StoreProvider } from './context'

import App from './App'

const app = (
    <StoreProvider>
        <App />
    </StoreProvider>
);

ReactDOM.render(app, document.getElementById('root'))
