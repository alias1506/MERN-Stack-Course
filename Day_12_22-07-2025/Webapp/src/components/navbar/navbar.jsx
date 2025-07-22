import './navbar.css'
export default function navbar() {
    return (
        <div className="navbar">
            <div className='navbar-left'>
                <p>Home</p>
                <p>About</p>
                <p>Services</p>
            </div>
            <div className='navbar-right'>
                <button>Contact</button>
            </div>
        </div>
    )
}
