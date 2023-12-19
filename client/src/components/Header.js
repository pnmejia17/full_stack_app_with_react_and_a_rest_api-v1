import { useContext } from 'react'
import { Link } from 'react-router-dom'
import UserContext from '../context/UserContext'



function Header() {
    const {auth} =useContext(UserContext)

    return (
        <header>
            <div className="wrap header--flex">
            <h1 className="header--logo"><Link to='/'>Courses</Link></h1>
            <nav>
                {auth ?
                    <ul className="header--signedin">
                        <li>Welcome, {auth.firstName} {auth.lastName}!</li>
                        <br></br>
                        <Link to="/signout">Sign Out</Link></ul> :
                    <ul className="header--signedout">
                        <li><Link to='/signup'>Sign Up</Link></li>
                        <li><Link to="/signin">Sign In</Link></li>
                     </ul>}
            </nav>
            </div>
        </header>
    )
}

export default Header