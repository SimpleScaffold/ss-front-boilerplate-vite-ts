import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from "src/App";
import {Provider} from 'react-redux'
import store from "src/app/store/redux/reduxStore.jsx";



import 'src/styles/index.css'



createRoot(document.getElementById('root')!).render(
  <StrictMode>
      <Provider store={store}>
          <App/>
      </Provider>
  </StrictMode>,
)
