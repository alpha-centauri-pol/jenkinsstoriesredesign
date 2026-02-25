import * as React from 'react';
import { useStaticQuery, graphql, Link } from 'gatsby';
import { StaticImage, GatsbyImage, getImage } from 'gatsby-plugin-image';
import UseCasesTabs from '../components/UseCasesTabs/UseCasesTabs';
import TestimonialsCarousel from '../components/TestimonialsCarousel/TestimonialsCarousel';
import GlobeSection from '../components/GlobeSection/GlobeSection';
import Layout from '../layout';
import Seo from '../components/Seo';
import './index.css';

const IndexPage = () => {
  const title = 'Jenkins - User Story Library';
  const { stories } = useStaticQuery(graphql`
    query FrontPageStories {
      stories: allUserStory(sort: { date: DESC }, limit: 4) {
        edges {
          node {
            title
            date(formatString: "dddd DD MMMM YYYY")
            tag_line
            authored_by
            slug
            image {
              childImageSharp {
                gatsbyImageData(width: 400, height: 200)
              }
            }
          }
        }
      }
    }
  `);

  const [isDarkMode, setIsDarkMode] = React.useState(false);
  const sectionsRef = React.useRef([]);

  // Dark Mode Detection
  React.useEffect(() => {
    const checkDarkMode = () => {
      const darkModeMediaQuery = window.matchMedia(
        '(prefers-color-scheme: dark)',
      );
      setIsDarkMode(darkModeMediaQuery.matches);
    };
    checkDarkMode();
    const darkModeMediaQuery = window.matchMedia(
      '(prefers-color-scheme: dark)',
    );
    darkModeMediaQuery.addEventListener('change', checkDarkMode);
    return () =>
      darkModeMediaQuery.removeEventListener('change', checkDarkMode);
  }, []);

  // Scroll-triggered Animation
React.useEffect(() => {
  const appeared = new WeakSet();
  const disappeared = new WeakSet();
  const isFadingOut = new WeakMap();  
  const observer = new IntersectionObserver(

    entries => {
      entries.forEach(entry => {
        const target = entry.target;

        if (entry.isIntersecting) {
          if (!appeared.has(target) && !isFadingOut.get(target)) {
            target.classList.add('section-visible');
            appeared.add(target);
          }
        } else {
          if (appeared.has(target) && !disappeared.has(target) && !isFadingOut.get(target)) {
            target.classList.remove('section-visible');
            target.classList.add('section-hidden');
            disappeared.add(target);

            // Mark target as fading out
            isFadingOut.set(target, true);

            // Handle fade out transition till end
            const handleTransitionEnd = () => {
              target.classList.remove('section-hidden');
              target.classList.add('section-final');
              isFadingOut.delete(target); // Reset the fading-out state
              target.removeEventListener('transitionend', handleTransitionEnd);
            };

            target.addEventListener('transitionend', handleTransitionEnd);
          }
        }
      });
    },
    { threshold: 0.2 },
  );

  sectionsRef.current.forEach(section => {
    if (section) observer.observe(section);
  });

  return () => observer.disconnect();
}, []);

  return (
    <Layout title={title}>
      <Seo title={title} pathname="/" />

      {/* Hero Section */}
      <div ref={el => (sectionsRef.current[0] = el)} className="hero-section">
        <div className="hero-top">
          <div className="hero-content">
            <span className="hero-chip">SUCCESS STORIES</span>
            <h1 className="hero-title">Jenkins Is The Way</h1>
            <p className="hero-subtitle">
              Explore the latest Jenkins user stories from developers and engineers around the world.
            </p>
            <div className="hero-buttons">
              <Link to="/all" className="hero-button">
                View All Stories
              </Link>
              <Link to="/map" className="hero-button hero-button-secondary">
                Explore Map
              </Link>
            </div>
          </div>
        </div>

        <div className="hero-cards">
          <Link to="/all" className="hero-card">
            <div className="hero-card-header">
              <ion-icon name="book-outline" class="hero-card-icon"></ion-icon>
              <h3>Browse Stories</h3>
            </div>
            <p>Read success stories from Jenkins users across every industry.</p>
            <span className="hero-card-link">Learn more &rarr;</span>
          </Link>
          <Link to="/map" className="hero-card">
            <div className="hero-card-header">
              <ion-icon name="globe-outline" class="hero-card-icon"></ion-icon>
              <h3>Explore the Map</h3>
            </div>
            <p>See where Jenkins is making an impact around the world.</p>
            <span className="hero-card-link">Learn more &rarr;</span>
          </Link>
          <Link to="/all" className="hero-card">
            <div className="hero-card-header">
              <ion-icon name="create-outline" class="hero-card-icon"></ion-icon>
              <h3>Share Your Story</h3>
            </div>
            <p>Contribute your own Jenkins success story to the community.</p>
            <span className="hero-card-link">Learn more &rarr;</span>
          </Link>
          <Link to="/map" className="hero-card">
            <div className="hero-card-header">
              <ion-icon name="search-outline" class="hero-card-icon"></ion-icon>
              <h3>Search &amp; Filter</h3>
            </div>
            <p>Find stories by country, industry, or technology stack.</p>
            <span className="hero-card-link">Learn more &rarr;</span>
          </Link>
        </div>
      </div>

      {/* Use Cases */}
      <UseCasesTabs />

      {/* Globe Interactive Section */}
      <GlobeSection />

      {/* Testimonials */}
      <TestimonialsCarousel />
    </Layout>
  );
};

export default IndexPage;
