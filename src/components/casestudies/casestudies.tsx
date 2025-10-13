'use client';

import { motion } from 'framer-motion';
import styles from './CaseStudies.module.css';

const CaseStudies = () => {
  const caseStudies = [
    {
      id: 1,
      title: 'Abbad Dental Clinic & Implant Centre',
      location: 'Nashik',
      category: 'HEALTHCARE',
      description: 'Complete digital transformation that established the clinic as the leading dental authority in Nashik.',
      image: '/assets/img/portfolio/abbad.jpg',
      results: [
        { value: '300%', label: 'TRAFFIC GROWTH' },
        { value: '200+', label: 'NEW PATIENTS' },
        { value: '100+', label: '5-STAR REVIEWS' }
      ]
    },
    {
      id: 2,
      title: 'Coconut Beach Farm Resort',
      location: 'Coastal Maharashtra',
      category: 'HOSPITALITY',
      description: 'Strategic digital marketing that transformed off-season bookings and online presence.',
      image: '/assets/img/portfolio/coconut1.jpg',
      results: [
        { value: '150%', label: 'DIRECT BOOKINGS' },
        { value: '2.5x', label: 'SOCIAL GROWTH' },
        { value: '40%', label: 'OFF-SEASON BOOST' }
      ]
    }
  ];

  return (
    <section className={styles.section}>
      <div className={styles.container}>
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className={styles.header}
        >
          <span className={styles.badge}>CASE STUDIES</span>
          <h2 className={styles.title}>Success Stories</h2>
        </motion.div>

        {/* Case Studies Grid */}
        <div className={styles.grid}>
          {caseStudies.map((study, index) => (
            <motion.article
              key={study.id}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.15 }}
              className={styles.card}
            >
              {/* Large Image with Overlay Content */}
              <div className={styles.imageSection}>
                <img
                  src={study.image}
                  alt={study.title}
                  className={styles.image}
                />
                <div className={styles.overlay}></div>
                
                {/* Category Badge */}
                <div className={styles.categoryBadge}>{study.category}</div>
              </div>

              {/* Content Below Image */}
              <div className={styles.content}>
                <h3 className={styles.cardTitle}>{study.title}</h3>
                <p className={styles.location}>{study.location}</p>
                <p className={styles.description}>{study.description}</p>

                {/* Results Grid */}
                <div className={styles.resultsGrid}>
                  {study.results.map((result, idx) => (
                    <div key={idx} className={styles.resultBox}>
                      <div className={styles.resultValue}>{result.value}</div>
                      <div className={styles.resultLabel}>{result.label}</div>
                    </div>
                  ))}
                </div>
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
};

export default CaseStudies;
