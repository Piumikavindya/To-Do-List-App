import React from "react";
import  ReactDOM  from "react-dom";
import App from "./App";
import "./index.css";
import { BrowserRouter } from "react-router-dom";
import ThemeProvider from "./hooks/ThemeProvider";


ReactDOM.render (<BrowserRouter>
<ThemeProvider>
<App />

</ThemeProvider>
 
 </BrowserRouter> ,
 document.getElementById('root'));

