// Finance_manager.jsx
import React, { useState } from "react";
import { Routes, Route, useNavigate } from 'react-router-dom';
import Header from "../Components/Header/Header";
import Footer from "../Components/Footer/Footer";
import Menu from "../Components/Menu/Menu";
import style from './finance_manager.module.css';

// Mock Data for Finance
const mockFinancials = {
    totalRevenue: 1850000, // Total money brought in
    totalExpenses: 920000, // Total money spent
    outstandingFees: 45000, // Money owed to the school
    
    // Budget Tracking (Connecting to user interests)
    budgets: [
        { name: "Staff Payroll", allocated: 1000000, spent: 850000 },
        { name: "Tech Upgrades (Distributed Systems)", allocated: 50000, spent: 40000 },
        { name: "Health & Wellness Programs", allocated: 60000, spent: 55000 }, // Close to exceeding budget (Health)
        { name: "Psychology/Counseling Services", allocated: 40000, spent: 25000 },
    ],
};

const mockOutstandingFees = [
    { studentId: 'STU-1004', name: 'Kwame A. Mensah', type: 'Tuition Fee', amount: 3500.00, due: '2025-09-01', status: 'Late' },
    { studentId: 'STU-1022', name: 'Eleanor J. Smith', type: 'Tech Fee', amount: 450.00, due: '2025-11-15', status: 'Due Soon' },
    { studentId: 'STU-1109', name: 'David B. Adjei', type: 'Tuition Fee', amount: 2100.00, due: '2025-10-10', status: 'Late' },
];

// --- Sub-Component for the Main Dashboard View ---
const FinanceDashboardView = () => {
    const navigate = useNavigate();

    const netIncome = mockFinancials.totalRevenue - mockFinancials.totalExpenses;

    const getStatusClass = (dateString) => {
        const today = new Date();
        const dueDate = new Date(dateString);
        
        if (dueDate < today) return style.statusLate;
        const diffDays = Math.ceil((dueDate - today) / (1000 * 60 * 60 * 24));
        if (diffDays <= 30) return style.statusDue;
        return '';
    };

    const formatCurrency = (amount) => {
        return new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(amount);
    };

    return (
        <div className={style.managerContainer}>
            <h1 className={style.pageTitle}>💰 Financial Management Overview</h1>

            {/* Section 1: Top-Level Metrics (System Architecture View) */}
            <h2>Q4 Performance Snapshot</h2>
            <div className={style.dashboardGrid}>
                
                {/* Metric 1: Total Revenue */}
                <div className={`${style.metricCard} ${style.cardRevenue}`}>
                    <h3>Total Revenue (YTD)</h3>
                    <div className={style.metricValue}>{formatCurrency(mockFinancials.totalRevenue)}</div>
                </div>
                
                {/* Metric 2: Total Expenses */}
                <div className={`${style.metricCard} ${style.cardExpense}`}>
                    <h3>Total Expenses (YTD)</h3>
                    <div className={style.metricValue}>{formatCurrency(mockFinancials.totalExpenses)}</div>
                </div>
                
                {/* Metric 3: Net Income (Engineering/Profit) */}
                <div className={`${style.metricCard}`} style={{borderLeftColor: netIncome > 0 ? '#38a169' : '#e53e3e'}}>
                    <h3>Net Income</h3>
                    <div className={style.metricValue}>{formatCurrency(netIncome)}</div>
                </div>
                
                {/* Metric 4: Outstanding Fees */}
                <div className={`${style.metricCard} ${style.cardBudget}`}>
                    <h3>Outstanding Fees</h3>
                    <div className={style.metricValue}>{formatCurrency(mockFinancials.outstandingFees)}</div>
                </div>
            </div>

            {/* Section 2: Operational Budget Tracking (Health & Psychology View) */}
            <h2>Operational Budget Tracking (YTD)</h2>
            <div className={style.budgetTracker}>
                <h3>Key Budget Allocations</h3>
                {mockFinancials.budgets.map((budget, index) => {
                    const percentageSpent = (budget.spent / budget.allocated) * 100;
                    const amountClass = percentageSpent > 90 ? style.warning : ''; // Warning if > 90% spent

                    return (
                        <div key={index} className={style.budgetRow}>
                            <span className={style.budgetLabel}>{budget.name}:</span>
                            <span className={style.budgetAmount}>
                                {formatCurrency(budget.spent)} / {formatCurrency(budget.allocated)} 
                                ({percentageSpent.toFixed(1)}% Spent)
                            </span>
                        </div>
                    );
                })}
            </div>

            {/* Section 3: Detailed Fee Management */}
            <h2>Outstanding Student Fees</h2>
            <table className={style.feesTable}>
                <thead>
                    <tr>
                        <th>Student ID</th>
                        <th>Name</th>
                        <th>Fee Type</th>
                        <th>Amount Due</th>
                        <th>Due Date</th>
                        <th>Status</th>
                        <th>Action</th>
                    </tr>
                </thead>
                <tbody>
                    {mockOutstandingFees.map((fee) => (
                        <tr key={fee.studentId}>
                            <td>{fee.studentId}</td>
                            <td>{fee.name}</td>
                            <td>{fee.type}</td>
                            <td>{formatCurrency(fee.amount)}</td>
                            <td>{fee.due}</td>
                            <td>
                                <span className={`${style.statusTag} ${getStatusClass(fee.due)}`}>
                                    {fee.status}
                                </span>
                            </td>
                            <td>
                                <button 
                                    className={style.collectButton}
                                    // Future action: navigate(`/finance/ledger/${fee.studentId}`)
                                    onClick={() => alert(`Initiating collection for ${fee.name}.`)}
                                >
                                    Collect / View Ledger
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>

        </div>
    );
};
// --- End Sub-Component ---

const Finance_manager = () => {
    // Menu state logic
    const [isMenuOpen, setIsMenuOpen] = useState(window.innerWidth > 1024); 
    const toggleMenu = () => setIsMenuOpen(prev => !prev);

    return (
        <div> 
            <Menu isMenuOpen={isMenuOpen} />
            <main className={isMenuOpen ? 'menuOpen' : 'menuClosed'}>
                <Header toggleMenu={toggleMenu} />
                
                <section className="display">
                    {/* Nested Routes Setup for a complex Finance Manager */}
                    <Routes>
                        {/* Route 1: Main Dashboard View (path is /finance) */}
                        <Route index element={<FinanceDashboardView />} /> 
                        
                        {/* Route 2: Detailed Ledger View (path is /finance/ledger/:studentId) - To be built later */}
                        <Route path="ledger/:studentId" element={<h1>Detailed Student Ledger!</h1>} /> 
                    </Routes>
                </section>
                
                <Footer />
            </main>
        </div>
    );
};

export default Finance_manager;