import React from 'react'
import { NavLink } from 'react-router-dom';
import style from '../Components/Style/Page.module.css';

/**
 * Modern, minimalistic landing page for Vitalearn
 * Focused on value proposition and clear CTAs
 */
const HomePage = () => {
  return (
    <div className={style.homePage}>
      {/* Hero Section */}
      <section className={style.heroSection}>
        <div className={style.heroContent}>
          <div className={style.heroBadge}>
            <span>Multi-Tenant Architecture</span>
          </div>
          <h1 className={style.heroTitle}>
            Engineering Success in 
            <span className={style.gradientText}> Education</span>
          </h1>
          <p className={style.heroSubtitle}>
            A distributed system built for scalability, security, and academic excellence. 
            Serving 100+ schools with 99.99% uptime.
          </p>
          <div className={style.heroActions}>
            <NavLink to="/auth" className={style.primaryButton}>
              Start Your School →
            </NavLink>
            <NavLink to="/docs" className={style.secondaryButton}>
              View Documentation
            </NavLink>
          </div>
          <div className={style.heroMetrics}>
            <div className={style.metric}>
              <span className={style.metricValue}>100+</span>
              <span className={style.metricLabel}>Schools</span>
            </div>
            <div className={style.metric}>
              <span className={style.metricValue}>99.99%</span>
              <span className={style.metricLabel}>Uptime</span>
            </div>
            <div className={style.metric}>
              <span className={style.metricValue}>50k+</span>
              <span className={style.metricLabel}>Students</span>
            </div>
          </div>
        </div>
        <div className={style.heroVisual}>
          <div className={style.architecturalGraphic}>
            <div className={style.node}></div>
            <div className={style.node}></div>
            <div className={style.node}></div>
            <div className={style.connection}></div>
            <div className={style.connection}></div>
          </div>
        </div>
      </section>

      {/* Features Grid */}
      <section className={style.featuresSection}>
        <div className={style.sectionHeader}>
          <h2>Built for Educational Excellence</h2>
          <p>Enterprise-grade features designed specifically for modern educational institutions</p>
        </div>
        <div className={style.featuresGrid}>
          <div className={style.featureCard}>
            <div className={style.featureIcon}>🔒</div>
            <h3>Tenant Isolation</h3>
            <p>Complete data separation between schools with strict security boundaries</p>
          </div>
          <div className={style.featureCard}>
            <div className={style.featureIcon}>⚡</div>
            <h3>Microservices</h3>
            <p>Independent scaling of academic, financial, and AI services</p>
          </div>
          <div className={style.featureCard}>
            <div className={style.featureIcon}>🤖</div>
            <h3>AI-Powered Insights</h3>
            <p>Automated report generation and personalized learning recommendations</p>
          </div>
          <div className={style.featureCard}>
            <div className={style.featureIcon}>📊</div>
            <h3>Real-time Analytics</h3>
            <p>Comprehensive dashboards for staff, students, and administrators</p>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className={style.ctaSection}>
        <div className={style.ctaContent}>
          <h2>Ready to Transform Your School?</h2>
          <p>Join educational institutions worldwide using Vitalearn's distributed platform</p>
          <div className={style.ctaActions}>
            <NavLink to="/auth" className={style.ctaButton}>
              Register Your School
            </NavLink>
            <NavLink to="/contact" className={style.ctaSecondary}>
              Schedule a Demo
            </NavLink>
          </div>
        </div>
      </section>
    </div>
  )
}

export default HomePage