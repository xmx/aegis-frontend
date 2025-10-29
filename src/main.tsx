import {StrictMode} from 'react'
import * as ReactDOM from 'react-dom/client'
import {createBrowserRouter, RouterProvider} from "react-router-dom";

import Agent from './pages/Agent.tsx'

const router = createBrowserRouter([
    {path: "/", element: <Agent/>},
]);

ReactDOM.createRoot(document.getElementById('root')!).render(
    <StrictMode>
        <RouterProvider router={router}/>
    </StrictMode>,
)
