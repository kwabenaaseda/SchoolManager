import React from 'react'
import style from '../Components/Style/Page.module.css';

const About = () => {
  return (
    <div className={style.aboutPage}>
      {/* Hero Section */}
      <div className={style.aboutHero}>
        <h1>About Vitalearn</h1>
        <p className={style.heroSubtitle}>
          Engineering the future of education through distributed systems architecture
        </p>
      </div>

      {/* Mission Section */}
      <section className={style.missionSection}>
        <div className={style.missionContent}>
          <div className={style.missionText}>
            <h2>Our Mission</h2>
            <p>
              Vitalearn is dedicated to building resilient, scalable educational technology 
              that empowers institutions worldwide. We believe in leveraging cutting-edge 
              distributed systems engineering to create platforms that are as reliable as 
              they are transformative.
            </p>
            <p>
              Our multi-tenant architecture ensures that every school gets enterprise-grade 
              performance with the isolation and security they require, while our AI-powered 
              insights help educators make data-driven decisions.
            </p>
          </div>
          <div className={style.missionGraphic}>
            <div className={style.architectureVisual}>
              <div className={style.tenantNode}>
                <span>🏫 School A</span>
              </div>
              <div className={style.tenantNode}>
                <span>🎓 School B</span>
              </div>
              <div className={style.tenantNode}>
                <span>📚 School C</span>
              </div>
              <div className={style.coreNode}>
                <span>⚡ Vitalearn Core</span>
              </div>
              <div className={style.connection}></div>
              <div className={style.connection}></div>
              <div className={style.connection}></div>
            </div>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className={style.valuesSection}>
        <h2>Our Core Principles</h2>
        <div className={style.valuesGrid}>
          <div className={style.valueCard}>
            <div className={style.valueIcon}>🔒</div>
            <h3>Data Isolation</h3>
            <p>Strict tenant separation ensures your school's data remains completely private and secure.</p>
          </div>
          <div className={style.valueCard}>
            <div className={style.valueIcon}>⚡</div>
            <h3>System Resilience</h3>
            <p>Microservices architecture guarantees 99.99% uptime and independent service scaling.</p>
          </div>
          <div className={style.valueCard}>
            <div className={style.valueIcon}>🤖</div>
            <h3>AI Integration</h3>
            <p>Intelligent automation and insights without compromising performance or privacy.</p>
          </div>
          <div className={style.valueCard}>
            <div className={style.valueIcon}>🌍</div>
            <h3>Global Scale</h3>
            <p>Built to serve educational institutions of all sizes, from local schools to international universities.</p>
          </div>
        </div>
      </section>

      {/* Team/Technology Section */}
      <section className={style.technologySection}>
        <div className={style.techContent}>
          <div className={style.techText}>
            <h2>Built on Modern Architecture</h2>
            <p>
              Vitalearn leverages a distributed microservices architecture that separates 
              academic, financial, and AI services into independent domains. This ensures 
              that a failure in one service never affects the entire platform.
            </p>
            <div className={style.techStack}>
              <span className={style.techTag}>Microservices</span>
              <span className={style.techTag}>Multi-Tenancy</span>
              <span className={style.techTag}>AI/ML Integration</span>
              <span className={style.techTag}>Real-time Analytics</span>
              <span className={style.techTag}>Secure APIs</span>
              <span className={style.techTag}>Cloud Native</span>
            </div>
          </div>
          <div className={style.techVisual}>
            <div className={style.serviceMesh}>
              <div className={style.service}>Academic API</div>
              <div className={style.service}>Finance API</div>
              <div className={style.service}>AI Service</div>
              <div className={style.service}>Auth Service</div>
              <div className={style.serviceMeshLine}></div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className={style.aboutCta}>
        <h2>Ready to Join the Future of Education?</h2>
        <p>Transform your institution with our distributed learning platform</p>
        <div className={style.ctaButtons}>
          <a href="/auth" className={style.primaryCta}>Start Your Application</a>
          <a href="/contact" className={style.secondaryCta}>Schedule a Demo</a>
        </div>
      </section>
    </div>
  )
}

export default About