import {BrowserRouter, Routes, Route} from "react-router";
import SamplePage from "../pages/sample/SamplePage.tsx";
import HomePage from "../pages/HomePage.tsx";
import Sample2Page from "../pages/sample/depth/Sample2Page.tsx";

function App() {

    return (

        <BrowserRouter>
            <Routes>
                <Route index element={<HomePage />} />

                <Route path="sample" >
                    <Route index element={<SamplePage />} />
                    <Route path="aa" element={<Sample2Page/>}>
                    </Route>
                </Route>
            </Routes>
        </BrowserRouter>


    )
}

export default App
