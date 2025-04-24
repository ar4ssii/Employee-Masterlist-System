// import logo from './logo.svg';
import './Style.css';
import Header from './Includes/Header';
import AddEmployee from './Includes/AddEmployee';
import EditEmployee from './Includes/EditEmployee';
import EmployeeList from './Includes/EmployeeList';
import { Link, Routes, Route } from 'react-router-dom';

function App() {
  return (
    <div className="App">
      <Header />
      <Routes>
        <Route path="/addemployee" element= { <AddEmployee /> } />
        <Route path="/editemployee/:id" element= { <EditEmployee /> } />
        <Route path="/" element= { <EmployeeList /> } />
      </Routes>
      



    </div>
  );
}

export default App;
