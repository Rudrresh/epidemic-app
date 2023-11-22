import {Link} from "react-router-dom"


export const Navbar = () => {
    return (
        <div className="navbar">
            <Link to ="/">Home</Link>
            <Link to ="/auth">Login</Link>
            <Link to ="/update-entry">Update Entry</Link>
            <Link to ="/display">View Data</Link>
        </div>
    );
};