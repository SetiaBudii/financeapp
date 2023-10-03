import React, { useState } from 'react'
import { Link } from 'react-router-dom';

const Sidebar = () => {
    const [isSidebarOpen, setIsSidebarOpen] = useState(true);

    const toggleSidebar = () => {
      setIsSidebarOpen(!isSidebarOpen);
    };
  
    const sidebarClassName = isSidebarOpen
      ? 'navbar-nav bg-gradient-dark sidebar sidebar-dark accordion'
      : 'navbar-nav bg-gradient-dark sidebar sidebar-dark accordion toggled';

    return (
        <>
            <ul className={sidebarClassName} id="accordionSidebar">
                <a className="sidebar-brand d-flex align-items-center justify-content-center" href="index.html">
                    <div className="sidebar-brand-text mx-1">M5-FinanceWeb</div>
                </a>
                <hr className="sidebar-divider my-0" />

                <li className="nav-item active">
                    <a className="nav-link" href="/home">


                        <i className="fas fa-fw fa-tachometer-alt"></i>
                        <span>Dashboard</span></a>
                </li>
                <hr className="sidebar-divider" />
                <div className="sidebar-heading">
                </div>
                <li className="nav-item">
                    <a className="nav-link collapsed" href="#" data-toggle="collapse" data-target="#collapseTwo"
                        aria-expanded="true" aria-controls="collapseTwo">
                        <i className="fas fa-fw fa-wallet"></i>
                        <span>Wallet</span>
                    </a>
                    <div id="collapseTwo" className="collapse" aria-labelledby="headingTwo" data-parent="#accordionSidebar">
                        <div className="bg-white py-2 collapse-inner rounded">

                            <h6 className="collapse-header">Custom Components:</h6>
                            <a className="collapse-item" href="">View</a>
                            <a className="collapse-item" href="/newWallet">Add</a>
                            <a className="collapse-item" href="cards.html">Remove Wallet</a>

                        </div>
                    </div>
                </li>

                <li className="nav-item">
                    <a className="nav-link collapsed" href="#" data-toggle="collapse" data-target="#collapseUtilities"
                        aria-expanded="true" aria-controls="collapseUtilities">
                        <i className="fas fa-fw fa-donate"></i>
                        <span>Budgeting</span>
                    </a>
                    <div id="collapseUtilities" className="collapse" aria-labelledby="headingUtilities"
                        data-parent="#accordionSidebar">
                        <div className="bg-white py-2 collapse-inner rounded">
                            {/* <a className="collapse-item" href="utilities-color.html">Colors</a>
                            <a className="collapse-item" href="utilities-border.html">Borders</a>
                            <a className="collapse-item" href="utilities-animation.html">Animations</a>
                            <a className="collapse-item" href="utilities-other.html">Other</a> */}
                            {/* <a className="collapse-item" href="utilities-color.html">Income</a> */}
                            <Link to="/income" className='collapse-item'>Income</Link>
                            <Link to="/outcome" className='collapse-item'>Outcome</Link>
                        </div>
                    </div>
                </li>

                <hr className="sidebar-divider" />

                {/* <div className="sidebar-heading">
                    Addons
                </div> */}

                {/* <li className="nav-item">
                    <a className="nav-link collapsed" href="#" data-toggle="collapse" data-target="#collapsePages"
                        aria-expanded="true" aria-controls="collapsePages">
                        <i className="fas fa-fw fa-folder"></i>
                        <span>Pages</span>
                    </a>
                    <div id="collapsePages" className="collapse" aria-labelledby="headingPages" data-parent="#accordionSidebar">
                        <div className="bg-white py-2 collapse-inner rounded">
                            <h6 className="collapse-header">Login Screens:</h6>
                            <a className="collapse-item" href="login.html">Login</a>
                            <a className="collapse-item" href="register.html">Register</a>
                            <a className="collapse-item" href="forgot-password.html">Forgot Password</a>
                            <div className="collapse-divider"></div>
                            <h6 className="collapse-header">Other Pages:</h6>
                            <a className="collapse-item" href="404.html">404 Page</a>
                            <a className="collapse-item" href="blank.html">Blank Page</a>
                        </div>
                    </div>
                </li> */}

                <li className="nav-item">
                    <a className="nav-link" href="charts.html">
                        <i className="fas fa-fw fa-receipt"></i>
                        <span>Recap</span></a>
                </li>

                <li className="nav-item">
                    <a className="nav-link" href="tables.html">
                        <i className="fas fa-fw fa-file-invoice-dollar"></i>
                        <span>Report</span></a>
                </li>
                <hr className="sidebar-divider d-none d-md-block" />

                <div className="text-center d-none d-md-inline">
                    <button className="rounded-circle border-0" id="sidebarToggle" name="sidebarToggle" onClick={toggleSidebar}></button>
                </div>
            </ul>
        </>
    );
};

export default Sidebar