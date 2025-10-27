// Parent_manager.jsx
import React from "react";
import Header from "../Components/Header/Header";
import Footer from "../Components/Footer/Footer";
import Menu from "../Components/Menu/Menu";
import style from './parent_manager.module.css';
// import ParentOverview from "../Components/Parent/ParentOverview"; 

// Mock Data for the Admin Parent List View
const mockParents = [
    { id: 'PAR-001', name: 'Olivia & Robert Chen', email: 'olivia.chen@email.com', phone: '555-1234', students: 2, status: 'Active' },
    { id: 'PAR-002', name: 'Omar K. Davies', email: 'omar.davies@email.com', phone: '555-4321', students: 1, status: 'Active' },
    { id: 'PAR-003', name: 'Jessica R. Bell', email: 'jessica.bell@email.com', phone: '555-5678', students: 3, status: 'Fees Pending' },
];

const Parent_manager = () => {
    // Menu state logic
    const [isMenuOpen, setIsMenuOpen] = React.useState(window.innerWidth > 1024); 
    const toggleMenu = () => setIsMenuOpen(prev => !prev);

    return (
        <div> 
            <Menu isMenuOpen={isMenuOpen} toggleMenu={toggleMenu}/>
            <main className={isMenuOpen ? 'menuOpen' : 'menuClosed'}>
                <Header toggleMenu={toggleMenu} />
                
                <section className="display">
                    <div className={style.managerContainer}>
                        <div className={style.managerHeader}>
                            <h1 className={style.pageTitle}>Guardian Management</h1>
                            <button className={style.addButton}>+ Add New Guardian</button>
                        </div>
                        
                        {/* Search and Filter bar would go here */}
                        
                        <table className={style.parentTable}>
                            <thead>
                                <tr>
                                    <th>ID</th>
                                    <th>Guardian Name</th>
                                    <th>Email</th>
                                    <th># Students</th>
                                    <th>Status</th>
                                    <th>Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {mockParents.map((parent) => (
                                    <tr key={parent.id}>
                                        <td>{parent.id}</td>
                                        <td>{parent.name}</td>
                                        <td>{parent.email}</td>
                                        <td>{parent.students}</td>
                                        <td style={{ color: parent.status === 'Fees Pending' ? '#f56565' : 'inherit' }}>
                                            {parent.status}
                                        </td>
                                        <td>
                                            <button className={style.contactButton}>Contact 📞</button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                        
                    </div>
                </section>
                
                <Footer />
            </main>
        </div>
    );
};

export default Parent_manager;