import React, { useState } from 'react';
import style from '../Components/Style/Page.module.css';

const Documentation = () => {
  const [activeSection, setActiveSection] = useState('strategic-assessment');
  const [activeSubSection, setActiveSubSection] = useState('executive-summary');

  // Enhanced Documentation Menu Structure
  const menuSections = [
    {
      id: 'strategic-assessment',
      title: '🎯 Strategic Assessment',
      icon: '🎯',
      subsections: [
        { id: 'executive-summary', title: 'Executive Summary' },
        { id: 'market-positioning', title: 'Market Positioning' },
        { id: 'competitive-analysis', title: 'Competitive Analysis' },
        { id: 'financial-viability', title: 'Financial Viability' }
      ]
    },
    {
      id: 'technical-architecture',
      title: '🏗️ Technical Architecture',
      icon: '🏗️',
      subsections: [
        { id: 'microservices-design', title: 'Microservices Design' },
        { id: 'data-decoupling', title: 'Data Decoupling Principle' },
        { id: 'multi-tenancy', title: 'Multi-Tenancy Isolation' },
        { id: 'ai-workflow', title: 'AI Workflow Architecture' },
        { id: 'security-architecture', title: 'Security Architecture' }
      ]
    },
    {
      id: 'compliance-legal',
      title: '⚖️ Compliance & Legal',
      icon: '⚖️',
      subsections: [
        { id: 'ferpa-gdpr', title: 'FERPA & GDPR Compliance' },
        { id: 'soc2-iso27001', title: 'SOC 2 & ISO 27001' },
        { id: 'ethical-ai', title: 'Ethical AI Framework' },
        { id: 'vendor-liability', title: 'Vendor Liability' },
        { id: 'data-governance', title: 'Data Governance' }
      ]
    },
    {
      id: 'business-operations',
      title: '💰 Business Operations',
      icon: '💰',
      subsections: [
        { id: 'pricing-strategy', title: 'Pricing Strategy' },
        { id: 'roi-analysis', title: 'ROI Analysis' },
        { id: 'cost-structure', title: 'Cost Structure' },
        { id: 'market-entry', title: 'Market Entry Strategy' }
      ]
    },
    {
      id: 'api',
      title: '🔌 API Documentation',
      icon: '🔌',
      subsections: [
        { id: 'system-api', title: 'System-Level APIs' },
        { id: 'tenant-api', title: 'Tenant-Level APIs' },
        { id: 'authentication', title: 'Authentication Flow' }
      ]
    }
  ];

  const DocumentationContent = () => {
    switch (activeSection) {
      case 'strategic-assessment':
        return (
          <div className={style.docContent}>
            {activeSubSection === 'executive-summary' || !activeSubSection ? (
              <section>
                <h2>🎯 Executive Summary & Strategic Positioning</h2>
                <div className={style.contentCard}>
                  <div className={style.executiveSummary}>
                    <div className={style.valueProposition}>
                      <h3>Core Value Proposition</h3>
                      <p>
                        <strong>The Multi-Tenant Student Management System (MSMS)</strong> is engineered as a 
                        secure, scalable, and customizable platform designed to manage the comprehensive 
                        operations of multiple independent schools (tenants), resolving significant operational 
                        complexities and security vulnerabilities associated with legacy Student Information Systems.
                      </p>
                      
                      <div className={style.architecturePillars}>
                        <h4>Architectural Foundation</h4>
                        <div className={style.pillarGrid}>
                          <div className={style.pillar}>
                            <strong>Identity & Core Management</strong>
                            <p>High-traffic authentication separated from profile data for optimal performance</p>
                          </div>
                          <div className={style.pillar}>
                            <strong>Finance & Audit Management</strong>
                            <p>Strong consistency with immutable ledger for financial integrity</p>
                          </div>
                          <div className={style.pillar}>
                            <strong>Academics & Workflow</strong>
                            <p>Asynchronous processing for long-running academic operations</p>
                          </div>
                          <div className={style.pillar}>
                            <strong>Communication & Content</strong>
                            <p>Decoupled messaging to prevent data sprawl and maintain performance</p>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className={style.marketContext}>
                      <h3>2025 EdTech Market Context</h3>
                      <div className={style.marketMetrics}>
                        <div className={style.metricCard}>
                          <span className={style.metricValue}>65%</span>
                          <span className={style.metricLabel}>Cloud-First SIS Adoption</span>
                        </div>
                        <div className={style.metricCard}>
                          <span className={style.metricValue}>80%</span>
                          <span className={style.metricLabel}>Mobile-First User Preference</span>
                        </div>
                        <div className={style.metricCard}>
                          <span className={style.metricValue}>$10M+</span>
                          <span className={style.metricLabel}>Target Customer Revenue</span>
                        </div>
                      </div>
                      
                      <div className={style.competitiveAdvantage}>
                        <h4>Strategic Differentiation</h4>
                        <ul>
                          <li><strong>Asynchronous AI Workflow:</strong> Guarantees platform stability during intensive AI processing</li>
                          <li><strong>Enforced Multi-Tenancy:</strong> Complete data isolation between institutions</li>
                          <li><strong>Microservices Resilience:</strong> Independent service scaling and failure containment</li>
                          <li><strong>Compliance-First Design:</strong> Built-in adherence to FERPA, GDPR, and SOC 2 requirements</li>
                        </ul>
                      </div>
                    </div>
                  </div>
                </div>
              </section>
            ) : null}

            {activeSubSection === 'market-positioning' ? (
              <section>
                <h2>📈 Market Positioning & Trends</h2>
                <div className={style.contentCard}>
                  <h3>Global EdTech SIS Market Overview</h3>
                  <p>
                    Student Information Systems serve as the essential "digital backbone" for modern 
                    educational institutions, managing functions from enrollment and scheduling to 
                    grades and financial transactions. The market is mature but undergoing significant 
                    transformation driven by technological innovation.
                  </p>

                  <div className={style.marketTrends}>
                    <h4>Key 2025 Market Shifts</h4>
                    <div className={style.trendGrid}>
                      <div className={style.trendItem}>
                        <div className={style.trendIcon}>☁️</div>
                        <div className={style.trendContent}>
                          <h5>Cloud-First Adoption</h5>
                          <p>65% of new SIS implementations now utilize cloud-based deployments</p>
                        </div>
                      </div>
                      <div className={style.trendItem}>
                        <div className={style.trendIcon}>🔄</div>
                        <div className={style.trendContent}>
                          <h5>Demand for Integration</h5>
                          <p>Unified digital campus environment with seamless LMS and financial system connectivity</p>
                        </div>
                      </div>
                      <div className={style.trendItem}>
                        <div className={style.trendIcon}>📱</div>
                        <div className={style.trendContent}>
                          <h5>Mobile Self-Service</h5>
                          <p>80% of users prefer mobile-first access for critical functions</p>
                        </div>
                      </div>
                      <div className={style.trendItem}>
                        <div className={style.trendIcon}>🤖</div>
                        <div className={style.trendContent}>
                          <h5>AI Differentiation</h5>
                          <p>AI-powered predictive analytics becoming the competitive battleground</p>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className={style.architecturalImperative}>
                    <h4>Architectural Market Fit</h4>
                    <p>
                      The microservices architecture directly addresses core failures of legacy SIS systems:
                    </p>
                    <div className={style.problemSolution}>
                      <div className={style.problem}>
                        <h5>Legacy System Problems</h5>
                        <ul>
                          <li>Pipeline breakage during updates</li>
                          <li>Data synchronization burdens</li>
                          <li>Cascading failures across modules</li>
                        </ul>
                      </div>
                      <div className={style.solution}>
                        <h5>MSMS Solutions</h5>
                        <ul>
                          <li>Independent service deployment</li>
                          <li>Decoupled data domains</li>
                          <li>Failure containment boundaries</li>
                        </ul>
                      </div>
                    </div>
                  </div>
                </div>
              </section>
            ) : null}

            {activeSubSection === 'competitive-analysis' ? (
              <section>
                <h2>⚔️ Competitive Landscape Analysis</h2>
                <div className={style.contentCard}>
                  <h3>Market Competitors</h3>
                  <div className={style.competitorAnalysis}>
                    <table className={style.competitorTable}>
                      <thead>
                        <tr>
                          <th>Competitor</th>
                          <th>Market Position</th>
                          <th>AI Capabilities</th>
                          <th>Architecture</th>
                          <th>MSMS Advantage</th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr>
                          <td><strong>PowerSchool</strong></td>
                          <td>Market Leader</td>
                          <td>AI for personalized learning</td>
                          <td>Monolithic/Legacy</td>
                          <td>True multi-tenancy + Async AI</td>
                        </tr>
                        <tr>
                          <td><strong>Skyward</strong></td>
                          <td>Established Player</td>
                          <td>Basic analytics</td>
                          <td>Traditional</td>
                          <td>Microservices resilience</td>
                        </tr>
                        <tr>
                          <td><strong>Infinite Campus</strong></td>
                          <td>K-12 Focus</td>
                          <td>Limited AI integration</td>
                          <td>Modular</td>
                          <td>Superior scalability</td>
                        </tr>
                      </tbody>
                    </table>
                  </div>

                  <div className={style.aiDifferentiation}>
                    <h4>AI Competitive Advantage</h4>
                    <div className={style.aiComparison}>
                      <div className={style.competitorAI}>
                        <h5>Competitor AI Implementation</h5>
                        <ul>
                          <li>Synchronous processing causing bottlenecks</li>
                          <li>Potential system degradation during heavy use</li>
                          <li>Limited to basic predictive analytics</li>
                        </ul>
                      </div>
                      <div className={style.msmsAI}>
                        <h5>MSMS AI Implementation</h5>
                        <ul>
                          <li><strong>Asynchronous workflow</strong> guarantees platform stability</li>
                          <li>No performance degradation during AI processing</li>
                          <li>Explainable AI (XAI) for transparency and trust</li>
                        </ul>
                      </div>
                    </div>
                  </div>

                  <div className={style.regulatoryConstraints}>
                    <h4>Regulatory Market Constraints</h4>
                    <p>
                      <strong>Critical Limitation:</strong> State student data privacy laws restrict data usage 
                      solely to "K-12 purposes" defined by school districts. Unlike commercial SaaS, MSMS cannot:
                    </p>
                    <ul>
                      <li>Utilize student data to feed external AI systems</li>
                      <li>Develop corporate-wide commercial models from student data</li>
                      <li>Engage in secondary data sales or monetization</li>
                    </ul>
                    <p className={style.warningNote}>
                      This imposes a strict ceiling on data exploitation ROI, requiring premium subscription pricing 
                      to recover high engineering costs.
                    </p>
                  </div>
                </div>
              </section>
            ) : null}

            {activeSubSection === 'financial-viability' ? (
              <section>
                <h2>💰 Financial Viability Analysis</h2>
                <div className={style.contentCard}>
                  <h3>Microservices ROI Justification</h3>
                  <p>
                    The microservices architecture requires substantial continuous investment but delivers 
                    superior operational efficiency and scalability that justifies the high Total Cost of Ownership.
                  </p>

                  <div className={style.costBreakdown}>
                    <h4>Cost Profile Analysis</h4>
                    <div className={style.costGrid}>
                      <div className={style.costCategory}>
                        <h5>Initial Costs</h5>
                        <ul>
                          <li>Architecture design: $30,000 - $80,000</li>
                          <li>DevOps pipeline setup</li>
                          <li>Migration engineering: $500,000+</li>
                        </ul>
                      </div>
                      <div className={style.costCategory}>
                        <h5>Recurring Costs</h5>
                        <ul>
                          <li>Specialized personnel: $300,000 - $600,000/year</li>
                          <li>Infrastructure: 20-100% higher than monolithic</li>
                          <li>Maintenance: 20-40% ongoing overhead</li>
                        </ul>
                      </div>
                    </div>
                  </div>

                  <div className={style.roiMetrics}>
                    <h4>Quantifiable ROI Metrics</h4>
                    <table className={style.roiTable}>
                      <thead>
                        <tr>
                          <th>KPI Category</th>
                          <th>Target Improvement</th>
                          <th>Business Impact</th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr>
                          <td><strong>Development Velocity</strong></td>
                          <td>3x-10x increase</td>
                          <td>Faster time-to-market and regulatory adaptation</td>
                        </tr>
                        <tr>
                          <td><strong>Reliability (MTTR)</strong></td>
                          <td>50-80% reduction</td>
                          <td>Mitigation of financial penalties from downtime</td>
                        </tr>
                        <tr>
                          <td><strong>Infrastructure Efficiency</strong></td>
                          <td>20-40% cost reduction</td>
                          <td>Optimized cloud spending through independent scaling</td>
                        </tr>
                        <tr>
                          <td><strong>Change Failure Rate</strong></td>
                          <td>30-60% reduction</td>
                          <td>Improved platform stability for premium SLAs</td>
                        </tr>
                      </tbody>
                    </table>
                  </div>

                  <div className={style.viabilityThreshold}>
                    <h4>Economic Viability Threshold</h4>
                    <div className={style.thresholdCard}>
                      <div className={style.thresholdMetric}>
                        <span className={style.thresholdValue}>$10M+</span>
                        <span className={style.thresholdLabel}>Minimum Target Customer Annual Revenue</span>
                      </div>
                      <p>
                        The architecture is financially viable only for businesses targeting enterprise clients 
                        with substantial IT budgets capable of sustaining the high operational costs.
                      </p>
                    </div>
                  </div>
                </div>
              </section>
            ) : null}
          </div>
        );

      case 'technical-architecture':
        return (
          <div className={style.docContent}>
            {activeSubSection === 'microservices-design' || !activeSubSection ? (
              <section>
                <h2>🏗️ Microservices Architecture Design</h2>
                <div className={style.contentCard}>
                  <h3>Strategic Service Decoupling</h3>
                  <p>
                    The MSMS employs a sophisticated microservices architecture that separates concerns 
                    across multiple independent services, each responsible for specific business domains 
                    to optimize performance based on data volatility and consistency needs.
                  </p>

                  <div className={style.serviceBreakdown}>
                    <h4>Service Domain Architecture</h4>
                    <div className={style.serviceCatalog}>
                      <div className={style.serviceCard}>
                        <h5>Identity & Core Service</h5>
                        <p><strong>Purpose:</strong> High-traffic authentication and user management</p>
                        <p><strong>Optimization:</strong> Separates fast login processes from complex profile data</p>
                        <p><strong>Key Models:</strong> User.js, Staff.User.js, student.js</p>
                      </div>
                      
                      <div className={style.serviceCard}>
                        <h5>Finance & Audit Service</h5>
                        <p><strong>Purpose:</strong> Financial transactions with strong consistency</p>
                        <p><strong>Optimization:</strong> Immutable ledger pattern for audit integrity</p>
                        <p><strong>Key Models:</strong> Main.Finance.js, Staff.Finance.js</p>
                      </div>
                      
                      <div className={style.serviceCard}>
                        <h5>Academic Service</h5>
                        <p><strong>Purpose:</strong> Grade management and academic workflows</p>
                        <p><strong>Optimization:</strong> Asynchronous processing for long-running tasks</p>
                        <p><strong>Key Models:</strong> GradingSystem.js, ScoreSubmission.js</p>
                      </div>
                      
                      <div className={style.serviceCard}>
                        <h5>AI/ML Service</h5>
                        <p><strong>Purpose:</strong> Predictive analytics and report generation</p>
                        <p><strong>Optimization:</strong> Asynchronous workflow for platform stability</p>
                        <p><strong>Key Models:</strong> StudentReport.js with XAI integration</p>
                      </div>
                    </div>
                  </div>

                  <div className={style.complexityManagement}>
                    <h4>Complexity Management Strategy</h4>
                    <p>
                      Managing distributed system complexity requires mature operational practices:
                    </p>
                    <div className={style.operationalRequirements}>
                      <div className={style.requirement}>
                        <h5>Service Mesh Implementation</h5>
                        <p>ISTIO or similar for standardized security protocols and service communication</p>
                      </div>
                      <div className={style.requirement}>
                        <h5>Centralized Security</h5>
                        <p>Vault for key management and secret storage across all services</p>
                      </div>
                      <div className={style.requirement}>
                        <h5>Distributed Tracing</h5>
                        <p>Comprehensive monitoring for debugging cross-service workflows</p>
                      </div>
                    </div>
                  </div>
                </div>
              </section>
            ) : null}

            {activeSubSection === 'ai-workflow' ? (
              <section>
                <h2>🤖 Asynchronous AI Workflow Architecture</h2>
                <div className={style.contentCard}>
                  <h3>Resilient AI Processing</h3>
                  <p>
                    The Asynchronous AI Report Generation Workflow represents a core competitive advantage, 
                    ensuring platform stability during intensive AI processing that would typically degrade 
                    performance in synchronous systems.
                  </p>

                  <div className={style.workflowDiagram}>
                    <h4>AI Report Generation Flow</h4>
                    <div className={style.flowSteps}>
                      <div className={style.flowStep}>
                        <div className={style.stepNumber}>1</div>
                        <div className={style.stepContent}>
                          <h5>Request Initiation</h5>
                          <p>Admin creates StudentReport document with status: 'Pending'</p>
                        </div>
                      </div>
                      <div className={style.flowStep}>
                        <div className={style.stepNumber}>2</div>
                        <div className={style.stepContent}>
                          <h5>Queue Trigger</h5>
                          <p>API calls message queue (Kafka/RabbitMQ) with report ID</p>
                        </div>
                      </div>
                      <div className={style.flowStep}>
                        <div className={style.stepNumber}>3</div>
                        <div className={style.stepContent}>
                          <h5>AI Processing</h5>
                          <p>Dedicated worker service processes data asynchronously</p>
                        </div>
                      </div>
                      <div className={style.flowStep}>
                        <div className={style.stepNumber}>4</div>
                        <div className={style.stepContent}>
                          <h5>Result Delivery</h5>
                          <p>Worker updates report status and stores generated content</p>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className={style.xaiIntegration}>
                    <h4>Explainable AI (XAI) Integration</h4>
                    <p>
                      To maintain ethical standards and build trust, all AI features implement Explainable AI:
                    </p>
                    <div className={style.xaiBenefits}>
                      <div className={style.benefit}>
                        <h5>Transparency</h5>
                        <p>Clear explanations of factors influencing AI decisions</p>
                      </div>
                      <div className={style.benefit}>
                        <h5>Bias Mitigation</h5>
                        <p>Proactive detection and reduction of algorithmic bias</p>
                      </div>
                      <div className={style.benefit}>
                        <h5>Regulatory Compliance</h5>
                        <p>Adherence to emerging AI ethics standards and regulations</p>
                      </div>
                    </div>
                  </div>
                </div>
              </section>
            ) : null}
          </div>
        );

      case 'compliance-legal':
        return (
          <div className={style.docContent}>
            {activeSubSection === 'ferpa-gdpr' || !activeSubSection ? (
              <section>
                <h2>⚖️ FERPA & GDPR Compliance Framework</h2>
                <div className={style.contentCard}>
                  <h3>Data Privacy Mandates</h3>
                  <p>
                    The MSMS operates within one of the most rigorously regulated sectors for data privacy, 
                    requiring strict compliance across operational, legal, and ethical domains.
                  </p>

                  <div className={style.complianceFramework}>
                    <div className={style.regulation}>
                      <h4>FERPA Compliance (US)</h4>
                      <p>
                        The Family Educational Rights and Privacy Act requires written permission before 
                        releasing information from education records.
                      </p>
                      <div className={style.complianceMeasures}>
                        <h5>MSMS Implementation</h5>
                        <ul>
                          <li>RBAC enforcement for data access restrictions</li>
                          <li>Tenant isolation preventing cross-institution data access</li>
                          <li>Clear vendor contracts defining data processing limits</li>
                          <li>Audit trails for all data access and modifications</li>
                        </ul>
                      </div>
                    </div>

                    <div className={style.regulation}>
                      <h4>GDPR Compliance (International)</h4>
                      <p>
                        General Data Protection Regulation mandates stringent data protection practices 
                        for EU citizen data.
                      </p>
                      <div className={style.complianceMeasures}>
                        <h5>MSMS Implementation</h5>
                        <ul>
                          <li>Data minimization principles in all data collection</li>
                          <li>Closed AI systems or PII removal before external processing</li>
                          <li>Data Protection Officer oversight</li>
                          <li>End-to-end encryption for data storage and transmission</li>
                        </ul>
                      </div>
                    </div>
                  </div>

                  <div className={style.dataUsageRestrictions}>
                    <h4>Critical Data Usage Limitations</h4>
                    <div className={style.restrictionNotice}>
                      <div className={style.warningIcon}>⚠️</div>
                      <div className={style.warningContent}>
                        <p>
                          <strong>Regulatory Constraint:</strong> Student data can only be used for "K-12 purposes" 
                          as defined by school districts. This prohibits:
                        </p>
                        <ul>
                          <li>Feeding external AI systems with student data</li>
                          <li>Developing corporate commercial models from educational data</li>
                          <li>Secondary data sales or monetization</li>
                        </ul>
                      </div>
                    </div>
                  </div>
                </div>
              </section>
            ) : null}

            {activeSubSection === 'soc2-iso27001' ? (
              <section>
                <h2>🛡️ SOC 2 & ISO 27001 Compliance</h2>
                <div className={style.contentCard}>
                  <h3>Enterprise Security Certification</h3>
                  <p>
                    To secure enterprise contracts and global credibility, the MSMS requires objective, 
                    third-party verification of its security posture and operational effectiveness.
                  </p>

                  <div className={style.certificationFramework}>
                    <div className={style.certification}>
                      <h4>SOC 2 Type II Attestation</h4>
                      <p>
                        Essential for US enterprise SaaS market, evaluating operational effectiveness 
                        of controls over time based on Trust Services Criteria.
                      </p>
                      <div className={style.trustCriteria}>
                        <h5>Trust Services Criteria Alignment</h5>
                        <div className={style.criteriaGrid}>
                          <div className={style.criterion}>
                            <strong>Security</strong>
                            <p>Protected against unauthorized access</p>
                          </div>
                          <div className={style.criterion}>
                            <strong>Availability</strong>
                            <p>System is available for operation and use</p>
                          </div>
                          <div className={style.criterion}>
                            <strong>Processing Integrity</strong>
                            <p>System processing is complete, valid, accurate, timely, and authorized</p>
                          </div>
                          <div className={style.criterion}>
                            <strong>Confidentiality</strong>
                            <p>Information designated as confidential is protected</p>
                          </div>
                          <div className={style.criterion}>
                            <strong>Privacy</strong>
                            <p>Personal information is collected, used, retained, disclosed, and disposed</p>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className={style.certification}>
                      <h4>ISO 27001 Certification</h4>
                      <p>
                        Globally recognized certification for Information Security Management Systems (ISMS), 
                        necessary for international client assurance.
                      </p>
                      <div className={style.implementationRequirements}>
                        <h5>Required Controls</h5>
                        <ul>
                          <li>Advanced encryption (AES-256 at rest, TLS 1.3 in transit)</li>
                          <li>Strict access management and authentication</li>
                          <li>Comprehensive audit trails</li>
                          <li>Regular security assessments and penetration testing</li>
                          <li>Incident response and business continuity planning</li>
                        </ul>
                      </div>
                    </div>
                  </div>
                </div>
              </section>
            ) : null}
          </div>
        );

      case 'business-operations':
        return (
          <div className={style.docContent}>
            {activeSubSection === 'pricing-strategy' || !activeSubSection ? (
              <section>
                <h2>💰 Value-Based Premium Pricing Strategy</h2>
                <div className={style.contentCard}>
                  <h3>Market-Aligned Pricing Model</h3>
                  <p>
                    Given the substantial Total Cost of Ownership, the MSMS must adopt a premium pricing 
                    strategy targeting institutions capable of sustaining high operational costs while 
                    delivering demonstrable 10x value over competitors.
                  </p>

                  <div className={style.pricingTiers}>
                    <h4>Recommended Tiered Pricing Structure</h4>
                    <div className={style.tierGrid}>
                      <div className={style.tier}>
                        <div className={style.tierHeader}>
                          <h5>Foundation</h5>
                          <div className={style.tierPrice}>$1.00 - $2.50/student</div>
                        </div>
                        <div className={style.tierFeatures}>
                          <p><strong>Value Proposition:</strong> Secure Core Operations</p>
                          <ul>
                            <li>Identity & Core Management</li>
                            <li>Basic Gradebook & Standard Reports</li>
                            <li>Mandatory tenant_id Isolation</li>
                          </ul>
                        </div>
                      </div>

                      <div className={style.tier}>
                        <div className={style.tierHeader}>
                          <h5>Strategic</h5>
                          <div className={style.tierPrice}>$3.00 - $5.00/student</div>
                        </div>
                        <div className={style.tierFeatures}>
                          <p><strong>Value Proposition:</strong> Advanced Management & Audit</p>
                          <ul>
                            <li>Full RBAC Implementation</li>
                            <li>Comprehensive Finance Ledger (Immutable)</li>
                            <li>All Standard Integrations</li>
                          </ul>
                        </div>
                      </div>

                      <div className={style.tier}>
                        <div className={style.tierHeader}>
                          <h5>Enterprise</h5>
                          <div className={style.tierPrice}>$5.00+ + AI Add-ons</div>
                        </div>
                        <div className={style.tierFeatures}>
                          <p><strong>Value Proposition:</strong> Resilience, AI & Governance</p>
                          <ul>
                            <li>Full Asynchronous AI Reporting</li>
                            <li>Advanced Predictive Analytics</li>
                            <li>Dedicated Multi-Tenant SLA</li>
                            <li>Explainable AI (XAI) Integration</li>
                          </ul>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className={style.valueJustification}>
                    <h4>Premium Value Justification</h4>
                    <div className={style.valuePillars}>
                      <div className={style.pillar}>
                        <h5>Compliance & Risk Avoidance</h5>
                        <p>Multi-tenancy isolation and immutable audit trails mitigate legal liability</p>
                      </div>
                      <div className={style.pillar}>
                        <h5>Resilience & Performance</h5>
                        <p>Guaranteed availability through asynchronous AI workflow</p>
                      </div>
                      <div className={style.pillar}>
                        <h5>Actionable Intelligence</h5>
                        <p>Advanced, ethical predictive analytics for intervention planning</p>
                      </div>
                    </div>
                  </div>
                </div>
              </section>
            ) : null}
          </div>
        );

      default:
        return (
          <div className={style.docContent}>
            <section>
              <h2>Vitalearn Strategic Documentation</h2>
              <div className={style.contentCard}>
                <div className={style.welcomeStrategic}>
                  <h3>Comprehensive Platform Intelligence</h3>
                  <p>
                    This documentation represents the complete strategic, technical, and operational 
                    intelligence behind the Multi-Tenant Student Management System (MSMS) - engineered 
                    for enterprise-scale educational institutions.
                  </p>
                  
                  <div className={style.strategicHighlights}>
                    <h4>Key Strategic Insights</h4>
                    <div className={style.highlightGrid}>
                      <div className={style.highlight}>
                        <strong>Market Position:</strong> Targeting $10M+ revenue institutions with premium SIS solutions
                      </div>
                      <div className={style.highlight}>
                        <strong>Architectural Advantage:</strong> Microservices with enforced multi-tenancy isolation
                      </div>
                      <div className={style.highlight}>
                        <strong>Competitive Edge:</strong> Asynchronous AI workflow guaranteeing platform stability
                      </div>
                      <div className={style.highlight}>
                        <strong>Compliance Foundation:</strong> Built-in FERPA, GDPR, and SOC 2 alignment
                      </div>
                    </div>
                  </div>

                  <div className={style.investorReady}>
                    <h4>🚀 Investor-Ready Documentation</h4>
                    <p>
                      This comprehensive analysis includes detailed market positioning, competitive landscape, 
                      financial viability assessment, and complete technical architecture - structured for 
                      Silicon Valley acquisition readiness.
                    </p>
                  </div>
                </div>
              </div>
            </section>
          </div>
        );
    }
  };

  return (
    <div className={style.documentationPage}>
      <div className={style.docHeader}>
        <h1>Vitalearn Strategic Platform Documentation</h1>
        <p>Complete technical, market, and compliance intelligence for enterprise acquisition readiness</p>
        <div className={style.documentationBadges}>
          <span className={style.badge}>🎯 Strategic Assessment</span>
          <span className={style.badge}>🏗️ Technical Architecture</span>
          <span className={style.badge}>⚖️ Compliance Framework</span>
          <span className={style.badge}>💰 Financial Analysis</span>
        </div>
      </div>

      <div className={style.docLayout}>
        <nav className={style.docSidebar}>
          <div className={style.sidebarHeader}>
            <h3>Strategic Documentation</h3>
          </div>
          <div className={style.sidebarContent}>
            {menuSections.map(section => (
              <div key={section.id} className={style.sidebarSection}>
                <button
                  className={`${style.sidebarItem} ${activeSection === section.id ? style.active : ''}`}
                  onClick={() => {
                    setActiveSection(section.id);
                    setActiveSubSection(section.subsections[0]?.id || '');
                  }}
                >
                  <span className={style.sidebarIcon}>{section.icon}</span>
                  {section.title}
                </button>
                
                {activeSection === section.id && (
                  <div className={style.subsectionList}>
                    {section.subsections.map(sub => (
                      <button
                        key={sub.id}
                        className={`${style.subsectionItem} ${activeSubSection === sub.id ? style.active : ''}`}
                        onClick={() => setActiveSubSection(sub.id)}
                      >
                        {sub.title}
                      </button>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>
        </nav>

        <main className={style.docMain}>
          <DocumentationContent />
        </main>
      </div>
    </div>
  );
};

export default Documentation;