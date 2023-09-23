import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'

import App from './App.tsx'
import './index.css'
import { Providers } from './Providers/index.tsx'

ReactDOM.createRoot(document.getElementById('root')!).render(
	<React.StrictMode>
		<Providers>
			<BrowserRouter>
				<App />
			</BrowserRouter>
		</Providers>
	</React.StrictMode>,
)
