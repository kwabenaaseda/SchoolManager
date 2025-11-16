import React, { useState } from 'react'
import style from '../Components/Style/Page.module.css';

const ContactUs = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    institution: '',
    inquiryType: '',
    message: ''
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Contact form submitted:', formData);
    alert('Thank you for your message! Our team will get back to you within 24 hours.');
    setFormData({
      name: '',
      email: '',
      institution: '',
      inquiryType: '',
      message: ''
    });
  };

  const handleChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  return (
    <div className={style.contactPage}>
      {/* Hero Section */}
      <div className={style.contactHero}>
        <h1>Contact Us</h1>
        <p className={style.heroSubtitle}>
          Get in touch with our team to learn how Vitalearn can transform your educational institution
        </p>
      </div>

      <div className={style.contactContent}>
        {/* Contact Information */}
        <div className={style.contactInfo}>
          <h2>Let's Start a Conversation</h2>
          <p>
            Whether you're interested in implementing Vitalearn at your institution, 
            have technical questions, or want to explore partnership opportunities, 
            we're here to help.
          </p>
          
          <div className={style.contactMethods}>
            <div className={style.contactMethod}>
              <div className={style.methodIcon}>📧</div>
              <div className={style.methodInfo}>
                <h4>Email Us</h4>
                <p>hello@vitalearn.com</p>
                <span>General inquiries</span>
              </div>
            </div>
            
            <div className={style.contactMethod}>
              <div className={style.methodIcon}>🛠️</div>
              <div className={style.methodInfo}>
                <h4>Technical Support</h4>
                <p>support@vitalearn.com</p>
                <span>Platform assistance</span>
              </div>
            </div>
            
            <div className={style.contactMethod}>
              <div className={style.methodIcon}>🏫</div>
              <div className={style.methodInfo}>
                <h4>Sales & Onboarding</h4>
                <p>sales@vitalearn.com</p>
                <span>Implementation guidance</span>
              </div>
            </div>
            
            <div className={style.contactMethod}>
              <div className={style.methodIcon}>🌍</div>
              <div className={style.methodInfo}>
                <h4>Global Offices</h4>
                <p>Available Worldwide</p>
                <span>Remote-first company</span>
              </div>
            </div>
          </div>

          {/* Response Time Info */}
          <div className={style.responseInfo}>
            <h4>What to Expect</h4>
            <ul>
              <li>✅ Response within 24 hours</li>
              <li>✅ Technical consultation available</li>
              <li>✅ Custom demo scheduling</li>
              <li>✅ Implementation planning</li>
            </ul>
          </div>
        </div>

        {/* Contact Form */}
        <div className={style.contactFormContainer}>
          <h3>Send us a Message</h3>
          <form onSubmit={handleSubmit} className={style.contactForm}>
            <div className={style.formRow}>
              <div className={style.formGroup}>
                <label>Full Name *</label>
                <input
                  type="text"
                  value={formData.name}
                  onChange={(e) => handleChange('name', e.target.value)}
                  required
                  className={style.contactInput}
                />
              </div>
              
              <div className={style.formGroup}>
                <label>Email Address *</label>
                <input
                  type="email"
                  value={formData.email}
                  onChange={(e) => handleChange('email', e.target.value)}
                  required
                  className={style.contactInput}
                />
              </div>
            </div>

            <div className={style.formRow}>
              <div className={style.formGroup}>
                <label>Institution/Organization</label>
                <input
                  type="text"
                  value={formData.institution}
                  onChange={(e) => handleChange('institution', e.target.value)}
                  className={style.contactInput}
                  placeholder="Your school or company"
                />
              </div>
              
              <div className={style.formGroup}>
                <label>Inquiry Type *</label>
                <select
                  value={formData.inquiryType}
                  onChange={(e) => handleChange('inquiryType', e.target.value)}
                  required
                  className={style.contactInput}
                >
                  <option value="">Select an option</option>
                  <option value="school-implementation">School Implementation</option>
                  <option value="technical-support">Technical Support</option>
                  <option value="partnership">Partnership Opportunity</option>
                  <option value="careers">Careers</option>
                  <option value="other">Other</option>
                </select>
              </div>
            </div>

            <div className={style.formGroup}>
              <label>Message *</label>
              <textarea
                value={formData.message}
                onChange={(e) => handleChange('message', e.target.value)}
                required
                className={style.contactTextarea}
                rows="6"
                placeholder="Tell us about your needs, questions, or how we can help your institution..."
              />
            </div>

            <button type="submit" className={style.submitButton}>
              Send Message
            </button>
          </form>
        </div>
      </div>

      {/* FAQ Section */}
      <section className={style.faqSection}>
        <h2>Frequently Asked Questions</h2>
        <div className={style.faqGrid}>
          <div className={style.faqItem}>
            <h4>How long does implementation take?</h4>
            <p>Most schools are fully operational within 2-4 weeks, depending on size and customization needs.</p>
          </div>
          
          <div className={style.faqItem}>
            <h4>Do you offer training?</h4>
            <p>Yes! We provide comprehensive training for administrators, teachers, and staff.</p>
          </div>
          
          <div className={style.faqItem}>
            <h4>Can we integrate with existing systems?</h4>
            <p>Absolutely. Our API-first approach allows seamless integration with most educational tools.</p>
          </div>
          
          <div className={style.faqItem}>
            <h4>What about data migration?</h4>
            <p>We offer data migration services to help transition from your current systems smoothly.</p>
          </div>
        </div>
      </section>
    </div>
  )
}

export default ContactUs