import * as React from 'react';
import { ChevronLeft, ChevronRight, Search } from 'lucide-react';
import { TESTIMONIALS } from './testimonialsData';
import * as styles from './TestimonialsCarousel.module.css';

const AUTOPLAY_MS = 5000;

const TestimonialsCarousel = () => {
  const [index, setIndex] = React.useState(0);
  const hoveredRef = React.useRef(false);
  const total = TESTIMONIALS.length;

  const goTo = React.useCallback(
    (i) => setIndex(((i % total) + total) % total),
    [total],
  );

  React.useEffect(() => {
    const id = setInterval(() => {
      if (!hoveredRef.current) {
        setIndex((prev) => (prev + 1) % total);
      }
    }, AUTOPLAY_MS);
    return () => clearInterval(id);
  }, [total]);

  return (
    <div className={styles.section}>
      <div className={styles.inner}>
        {/* Header */}
        <div className={styles.header}>
          <div className={styles.badge}>Testimonials</div>
          <h2 className={styles.title}>Teams worldwide trust Jenkins</h2>
          <p className={styles.description}>
            From startups to Fortune 100 enterprises, engineering teams rely on
            Jenkins to automate builds, accelerate releases, and ship software
            with confidence.
          </p>
          <div className={styles.searchBarContainer}>
            <Search className={styles.searchIcon} size={20} />
            <input 
              type="text" 
              placeholder="Search all case studies" 
              className={styles.searchInput} 
            />
          </div>
        </div>

        {/* Carousel */}
        <div
          className={styles.carouselWrapper}
          onMouseEnter={() => {
            hoveredRef.current = true;
          }}
          onMouseLeave={() => {
            hoveredRef.current = false;
          }}
        >
          <div className={styles.fadeLeft} />
          <div className={styles.fadeRight} />

          <div className={styles.slider}>
            <div
              className={styles.track}
              style={{ transform: `translateX(-${index * 100}%)` }}
            >
              {TESTIMONIALS.map((t) => (
                <div key={t.id} className={styles.slide}>
                  <div className={styles.slideGradientBorder}>
                    <div className={styles.slideInnerBorder}>
                      <div className={styles.slideContent}>
                        {/* Left */}
                        <div className={styles.slideLeft}>
                          <div>
                            <h3 className={styles.slideHeading}>
                              {t.heading}
                            </h3>
                            <p className={styles.slideDescription}>
                              {t.description}
                            </p>
                          </div>
                          <div className={styles.slideMetrics}>
                            {t.metrics.map((m) => (
                              <div key={m.label}>
                                <span className={styles.metricValue}>
                                  {m.value}
                                </span>
                                <span className={styles.metricLabel}>
                                  {m.label}
                                </span>
                              </div>
                            ))}
                          </div>
                        </div>

                        {/* Right */}
                        <div className={styles.slideRight}>
                          <div className={styles.slideQuoteArea}>
                            <img
                              src={t.imageSrc}
                              alt={t.authorName}
                              className={styles.slideImage}
                            />
                            <p className={styles.slideQuoteText}>
                              &ldquo;{t.quote}&rdquo;
                            </p>
                          </div>
                          <div className={styles.slideFooter}>
                            <span className={styles.authorName}>
                              {t.authorName}
                            </span>
                            <span className={styles.authorRole}>
                              {t.authorRole}
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Navigation */}
          <div className={styles.nav}>
            <button
              className={styles.navBtn}
              onClick={() => goTo(index - 1)}
              aria-label="Previous testimonial"
            >
              <ChevronLeft width={24} height={24} />
            </button>

            <div className={styles.dots}>
              {TESTIMONIALS.map((_, i) => (
                <button
                  key={i}
                  className={`${styles.dot} ${i === index ? styles.dotActive : styles.dotInactive}`}
                  onClick={() => goTo(i)}
                  aria-label={`Go to slide ${i + 1}`}
                />
              ))}
            </div>

            <button
              className={styles.navBtn}
              onClick={() => goTo(index + 1)}
              aria-label="Next testimonial"
            >
              <ChevronRight width={24} height={24} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TestimonialsCarousel;
