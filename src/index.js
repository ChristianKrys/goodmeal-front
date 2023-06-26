import {createRoot} from 'react-dom/client';/*Pour pouvoir utiliser createRoot*/
import React, { StrictMode } from "react"; /*Pour pouvoir utiliser les composants de classes*/
import {BrowserRouter} from 'react-router-dom';

import "./css/style.css"; /*feuilles de style*/
import App from './components/App';




const template = (
  <StrictMode>
    <BrowserRouter>
      <App/> 
    </BrowserRouter>          
  </StrictMode>
);



const conteneur = document.getElementById('root');
const racine = createRoot(conteneur);
racine.render(template);







