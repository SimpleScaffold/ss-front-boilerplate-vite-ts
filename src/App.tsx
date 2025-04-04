import { useState } from 'react'
import { RouterProvider } from 'react-router'
import router from 'src/app/router/router.tsx'
import useRouteListener from 'src/app/router/useRouteListener.tsx'

function App() {

    useRouteListener()

    return (
        <>
            <RouterProvider router={router} />
        </>
    )
}

export default App
