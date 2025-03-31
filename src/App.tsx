import { useState } from 'react'
import {RouterProvider} from "react-router";
import router from "src/app/router/router.tsx";

function App() {

  return (
    <>
        <RouterProvider router={router} />
    </>
  )
}

export default App
