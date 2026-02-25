import * as React from 'react';
import Globe3D from './Globe3D';
import {
  REGIONS,
  COMPANIES,
  DETAIL,
  LEFT_POSITIONS,
  RIGHT_POSITIONS,
} from './globeData';
import * as styles from './GlobeSection.module.css';

/* ── SVG Icons (inline to avoid extra deps) ── */
const BackArrowIcon = () => (
  <svg
    width="28"
    height="28"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.5"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <line x1="19" y1="12" x2="5" y2="12" />
    <polyline points="12 19 5 12 12 5" />
  </svg>
);

const CloseIcon = () => (
  <svg
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
  >
    <line x1="18" y1="6" x2="6" y2="18" />
    <line x1="6" y1="6" x2="18" y2="18" />
  </svg>
);

const GlobeIcon = () => (
  <svg
    width="16"
    height="16"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.5"
    strokeLinecap="round"
    className={styles.earthBtnIcon}
  >
    <circle cx="12" cy="12" r="10" />
    <path d="M2 12h20M12 2a15.3 15.3 0 014 10 15.3 15.3 0 01-4 10 15.3 15.3 0 01-4-10 15.3 15.3 0 014-10z" />
  </svg>
);

/* ── Popover bubble SVGs ── */
const LocationSvg = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="white">
    <path d="M12 2C7.58 2 4 5.58 4 10c0 5.25 7 12 8 12s8-6.75 8-12c0-4.42-3.58-8-8-8zm0 11c-1.66 0-3-1.34-3-3s1.34-3 3-3 3 1.34 3 3-1.34 3-3 3z" />
  </svg>
);

const TeamSvg = () => (
  <svg
    width="28"
    height="28"
    viewBox="0 0 24 24"
    fill="none"
    stroke="white"
    strokeWidth="1.5"
    strokeLinecap="round"
    opacity="0.9"
  >
    <path d="M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2" />
    <circle cx="9" cy="7" r="4" />
    <path d="M23 21v-2a4 4 0 00-3-3.87M16 3.13a4 4 0 010 7.75" />
  </svg>
);

const PulseSvg = () => (
  <svg
    width="20"
    height="20"
    viewBox="0 0 24 24"
    fill="none"
    stroke="#ef4444"
    strokeWidth="1.5"
    strokeLinecap="round"
    opacity="0.85"
  >
    <path d="M22 12h-4l-3 9L9 3l-3 9H2" />
  </svg>
);

/* ── Pill component ── */
function Pill({
  name,
  data,
  pos,
  side,
  hoveredPill,
  onHover,
  onLeave,
  onSelect,
}) {
  const isRight = side === 'right';
  const isHovered = hoveredPill === name;
  const isDimmed = hoveredPill !== null && !isHovered;

  return (
    <div
      className={styles.pillWrap}
      style={{ top: pos.top, left: pos.left }}
    >
      <div
        className={`${styles.pill} ${isHovered ? styles.pillActive : ''} ${isDimmed ? styles.pillDimmed : ''}`}
        onMouseEnter={() => onHover(name)}
        onMouseLeave={onLeave}
        onClick={(e) => {
          e.stopPropagation();
          onSelect(name);
        }}
        role="button"
        tabIndex={0}
        onKeyDown={(e) => e.key === 'Enter' && onSelect(name)}
      >
        {name}
      </div>

      {/* Popover */}
      <div
        className={`${styles.popover} ${isRight ? styles.popoverRight : styles.popoverLeft} ${isHovered ? styles.popoverVisible : ''}`}
      >
        {/* Decorative bubbles */}
        <div
          className={`${styles.popoverBubble} ${isHovered ? styles.popoverBubbleVisible : ''}`}
          style={{
            top: 0,
            [isRight ? 'left' : 'right']: 10,
            width: 55,
            height: 55,
            backgroundColor: '#3b82f6',
            transitionDelay: isHovered ? '80ms' : '0ms',
            transformOrigin: `${isRight ? 'left' : 'right'} center`,
          }}
        >
          <LocationSvg />
        </div>
        <div
          className={`${styles.popoverBubble} ${isHovered ? styles.popoverBubbleVisible : ''}`}
          style={{
            top: -15,
            [isRight ? 'left' : 'right']: 80,
            width: 80,
            height: 80,
            backgroundColor: '#10b981',
            transitionDelay: isHovered ? '140ms' : '0ms',
            transformOrigin: `${isRight ? 'left' : 'right'} center`,
          }}
        >
          <TeamSvg />
        </div>
        <div
          className={`${styles.popoverBubble} ${isHovered ? styles.popoverBubbleVisible : ''}`}
          style={{
            top: 50,
            [isRight ? 'left' : 'right']: 55,
            width: 45,
            height: 45,
            backgroundColor: '#14161a',
            border: '1px solid #334155',
            transitionDelay: isHovered ? '200ms' : '0ms',
            transformOrigin: `${isRight ? 'left' : 'right'} center`,
          }}
        >
          <PulseSvg />
        </div>

        {/* Text block */}
        <div
          className={`${styles.popoverText} ${isRight ? styles.popoverTextRight : styles.popoverTextLeft} ${isHovered ? styles.popoverTextVisible : ''}`}
          style={{ transitionDelay: isHovered ? '180ms' : '0ms' }}
        >
          <p className={styles.popoverHoverDesc}>{data.hover}</p>
          <button
            className={`${styles.exploreBtn} ${!isRight ? styles.exploreBtnLeft : ''}`}
            onClick={(e) => {
              e.stopPropagation();
              onSelect(name);
            }}
          >
            {isRight ? (
              <>
                Explore <span style={{ fontSize: '1rem', lineHeight: 1 }}>&rarr;</span>
              </>
            ) : (
              <>
                <span style={{ fontSize: '1rem', lineHeight: 1 }}>&larr;</span> Explore
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
}

/* ── Main GlobeSection ── */
const GlobeSection = () => {
  const [view, setView] = React.useState('home');
  const [selectedRegion, setSelectedRegion] = React.useState(null);
  const [selectedEntity, setSelectedEntity] = React.useState(null);
  const [hoveredPill, setHoveredPill] = React.useState(null);

  const sectionRef = React.useRef(null);
  const globeWrapRef = React.useRef(null);
  const globeStateRef = React.useRef({ spinning: true, nudgeVel: 0 });

  const isHome = view === 'home';
  const region = selectedRegion ? REGIONS[selectedRegion] : null;
  const detail = selectedEntity ? DETAIL[selectedEntity] : null;

  const leftRegions = React.useMemo(
    () => Object.entries(REGIONS).filter(([, v]) => v.side === 'left'),
    [],
  );
  const rightRegions = React.useMemo(
    () => Object.entries(REGIONS).filter(([, v]) => v.side === 'right'),
    [],
  );

  /* Lock/unlock body scroll when entering/leaving fullscreen views */
  React.useEffect(() => {
    if (!isHome) {
      document.body.style.overflow = 'hidden';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isHome]);

  const goToMission = React.useCallback((regionName) => {
    setSelectedEntity(null);
    setHoveredPill(null);
    setSelectedRegion(regionName);
    setView('mission');
    globeStateRef.current.spinning = false;
    globeStateRef.current.nudgeVel = 0.8;
  }, []);

  const goToHome = React.useCallback(() => {
    setView('home');
    setSelectedRegion(null);
    setSelectedEntity(null);
    setHoveredPill(null);
    globeStateRef.current.spinning = true;
  }, []);

  const openDetail = React.useCallback(
    (entityName) => {
      if (view === 'detail' && selectedEntity && selectedEntity !== entityName) {
        setView('mission');
        setTimeout(() => {
          setSelectedEntity(entityName);
          setView('detail');
        }, 200);
      } else {
        setSelectedEntity(entityName);
        setView('detail');
      }
    },
    [view, selectedEntity],
  );

  const closeDetail = React.useCallback(() => {
    setView('mission');
    setTimeout(() => setSelectedEntity(null), 200);
  }, []);

  /* Globe wrap transform */
  const globeTransform = isHome
    ? 'translate(-50%,-50%) translateY(12%) scale(1)'
    : 'translate(-50%,-50%) translateY(35%) scale(1.5)';

  return (
    <>
      <div className={styles.wrapper}>
        <div className={styles.wrapperInner}>
          <div style={{ width: '100%', height: '900px', position: 'relative' }}>
            <div
              ref={sectionRef}
              className={`${styles.container} ${!isHome ? styles.containerFixed : ''}`}
            >
            {/* Home title */}
            <div
              className={`${styles.homeTitle} ${!isHome ? styles.homeTitleHidden : ''}`}
            >
              <h2 className={styles.homeTitleHeading}>Customer Stories.</h2>
              <p className={styles.homeTitleDesc}>
                See how teams around the world use Jenkins to do their best
                work.
              </p>
              <a href="/map" style={{ display: 'inline-block', color: '#60a5fa', fontSize: '1rem', fontWeight: '500', textDecoration: 'none', border: '1px solid rgba(96, 165, 250, 0.4)', padding: '6px 16px', borderRadius: '8px', transition: 'all 0.2s', backgroundColor: 'rgba(96, 165, 250, 0.1)' }}>
                Go to Map
              </a>
            </div>

            {/* Mission overlay */}
            <div
              className={`${styles.missionOverlay} ${!isHome ? styles.missionOverlayVisible : ''}`}
            >
              {region && (
                <>
                  <div className={styles.missionLeft}>
                    <div className={styles.missionLabel}>
                      Customer Spotlight
                    </div>
                    <h2
                      className={`${styles.missionHeading} ${view === 'detail' ? styles.missionHeadingDimmed : ''}`}
                    >
                      {region.heading}
                    </h2>
                    <p
                      className={`${styles.missionDesc} ${view === 'detail' ? styles.missionDescDimmed : ''}`}
                    >
                      {region.description}
                    </p>
                  </div>
                  <div
                    className={`${styles.regionStats} ${view === 'detail' ? styles.regionStatsDimmed : ''}`}
                  >
                    <div className={styles.statsRow}>
                      <div>
                        <div className={styles.statValue}>
                          {region.stat1.value}
                        </div>
                        <div className={styles.statLabel}>
                          {region.stat1.label}
                        </div>
                      </div>
                      <div>
                        <div className={styles.statValue}>
                          {region.stat2.value}
                        </div>
                        <div className={styles.statLabel}>
                          {region.stat2.label}
                        </div>
                      </div>
                    </div>
                    <div className={styles.goalsList}>
                      {region.goals.map((g) => (
                        <p key={g.text} className={styles.goalText}>
                          {g.text}
                        </p>
                      ))}
                    </div>
                  </div>
                </>
              )}
            </div>

            {/* Back button */}
            <nav className={styles.backNav}>
              <div
                className={`${styles.backBtnWrap} ${!isHome ? styles.backBtnWrapVisible : styles.backBtnWrapHidden}`}
              >
                <button className={styles.backBtn} onClick={goToHome}>
                  <BackArrowIcon />
                </button>
              </div>
            </nav>

            {/* Globe */}
            <div
              ref={globeWrapRef}
              className={styles.globeWrap}
              style={{ transform: globeTransform }}
            >
              <div className={styles.globeClip}>
                <Globe3D globeStateRef={globeStateRef} />
              </div>

              {/* Pills */}
              <div
                className={`${styles.pillsLayer} ${!isHome ? styles.pillsLayerHidden : ''}`}
              >
                {leftRegions.map(([name, data], i) => (
                  <Pill
                    key={name}
                    name={name}
                    data={data}
                    pos={LEFT_POSITIONS[i]}
                    side="left"
                    hoveredPill={hoveredPill}
                    onHover={setHoveredPill}
                    onLeave={() => setHoveredPill(null)}
                    onSelect={goToMission}
                  />
                ))}
                {rightRegions.map(([name, data], i) => (
                  <Pill
                    key={name}
                    name={name}
                    data={data}
                    pos={RIGHT_POSITIONS[i]}
                    side="right"
                    hoveredPill={hoveredPill}
                    onHover={setHoveredPill}
                    onLeave={() => setHoveredPill(null)}
                    onSelect={goToMission}
                  />
                ))}
              </div>

              {/* Bubbles */}
              <div
                className={`${styles.bubblesLayer} ${!isHome ? styles.bubblesLayerVisible : ''}`}
              >
                {COMPANIES.map((c) => (
                  <div
                    key={c.name}
                    className={styles.companyBubble}
                    style={{
                      top: c.top,
                      left: c.left,
                      width: c.size,
                      height: c.size,
                      backgroundColor: c.color,
                      color: c.textColor,
                      borderColor: c.border
                        ? 'rgba(255,255,255,0.1)'
                        : 'transparent',
                      border: `1px solid ${c.border ? 'rgba(255,255,255,0.1)' : 'transparent'}`,
                      boxShadow: c.border
                        ? 'inset 0 0 0 1px rgba(255,255,255,0.1)'
                        : 'none',
                    }}
                    onClick={(e) => {
                      e.stopPropagation();
                      openDetail(c.name);
                    }}
                    role="button"
                    tabIndex={0}
                    onKeyDown={(e) => e.key === 'Enter' && openDetail(c.name)}
                  >
                    <span
                      className={styles.companyName}
                      style={{
                        fontSize:
                          c.size > 100
                            ? '1.1rem'
                            : c.size > 70
                              ? '0.85rem'
                              : '0.7rem',
                      }}
                    >
                      {c.name}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Earth view button */}
            <div
              className={`${styles.earthBtn} ${!isHome ? styles.earthBtnVisible : ''}`}
            >
              <button className={styles.earthBtnButton} onClick={goToHome}>
                <GlobeIcon />
                Go to Earth View
              </button>
            </div>

            {/* Detail card */}
            <div
              className={`${styles.detailCard} ${view === 'detail' && detail ? styles.detailCardVisible : ''}`}
            >
              {detail && (
                <>
                  <div
                    className={styles.detailHeader}
                    style={{ backgroundColor: detail.color }}
                  >
                    <h2 className={styles.detailHeaderTitle}>
                      {detail.headerText}
                    </h2>
                    <button
                      className={styles.detailCloseBtn}
                      onClick={closeDetail}
                    >
                      <CloseIcon />
                    </button>
                  </div>
                  <div className={styles.detailBody}>
                    <div className={styles.detailColumns}>
                      <div className={styles.detailMain}>
                        <div className={styles.detailLabel}>
                          {detail.label}
                        </div>
                        <h3 className={styles.detailQuote}>{detail.quote}</h3>
                        <p className={styles.detailAuthor}>{detail.author}</p>
                        <p className={styles.detailParagraph}>{detail.body}</p>
                        <p className={styles.detailParagraph}>
                          {detail.body2}
                        </p>
                      </div>
                      <div className={styles.detailGoals}>
                        {detail.goals.map((g) => (
                          <div key={g.text} className={styles.detailGoalRow}>
                            <div
                              className={styles.detailGoalDot}
                              style={{ backgroundColor: g.color }}
                            />
                            <p className={styles.detailGoalText}>{g.text}</p>
                          </div>
                        ))}
                      </div>
                    </div>
                    <div className={styles.detailResources}>
                      <div className={styles.detailResourcesLabel}>
                        Resources
                      </div>
                      <div className={styles.detailResourcesLinks}>
                        {detail.resources.map((r) => (
                          <a
                            key={r}
                            href="#"
                            className={styles.detailResourceLink}
                          >
                            {r}
                          </a>
                        ))}
                      </div>
                    </div>
                  </div>
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>

      {/* Fullscreen overlay */}
      <div
        className={`${styles.overlay} ${!isHome ? styles.overlayActive : ''}`}
        onClick={goToHome}
        role="presentation"
      />
    </>
  );
};

export default GlobeSection;
