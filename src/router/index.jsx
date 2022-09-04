import App from "../App.jsx";

import Edit from "../pages/Edit";
import Login from "../pages/Login";
import Register from "../pages/Register";
import ListList from "../pages/ListList";
import ListTable from "../pages/ListTable";
import {BrowserRouter as Router,Routes,Route} from 'react-router-dom'
import Means from "../pages/Means";

const BaseRouter = () => (
    <Router>
        <Routes>
            <Route path='/' element={<App />}>
                <Route path='/listlist' element = {<ListList />}></Route>
                <Route path='/listtable'  element = {<ListTable />}></Route>
                <Route path='/edit/:id' element={<Edit />}></Route>
                <Route path='/edit' element={<Edit />}></Route>
                <Route path='/means' element={<Means />}></Route>

            </Route>
            <Route path='/login' element={<Login />}></Route>
            <Route path='/register' element={<Register />}></Route>
        </Routes>
    </Router>
)
export default BaseRouter