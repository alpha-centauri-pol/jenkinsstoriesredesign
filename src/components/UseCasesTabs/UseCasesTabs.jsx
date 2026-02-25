import * as React from 'react';
import {
  Bot,
  Brain,
  Search,
  Zap,
  GraduationCap,
  FileQuestion,
  UserCheck,
  Stethoscope,
  FileText,
  FileSearch,
  HeartPulse,
  Scale,
  Briefcase,
  ShieldCheck,
  Building2,
  Database,
  Wrench,
  MessageSquare,
  BookOpen,
  Link2,
} from 'lucide-react';
import { TABS_DATA } from './useCasesData';
import * as styles from './UseCasesTabs.module.css';

const ICON_MAP = {
  Bot,
  Brain,
  Search,
  Zap,
  GraduationCap,
  FileQuestion,
  UserCheck,
  Stethoscope,
  FileText,
  FileSearch,
  HeartPulse,
  Scale,
  Briefcase,
  ShieldCheck,
  Building2,
  Database,
  Wrench,
  MessageSquare,
  BookOpen,
  Link2,
};

function LucideIcon({ name, size = 18, color, ...props }) {
  const Icon = ICON_MAP[name];
  if (!Icon) return null;
  return <Icon width={size} height={size} color={color} {...props} />;
}

function PreviewQuote({ tab, quote, author, storyLink }) {
  return (
    <div
      className={`${styles.previewBox} ${styles.previewBoxColumn}`}
      style={{
        background: `linear-gradient(to bottom right, ${tab.gradientFrom}, rgba(30, 41, 59, 0.4))`,
      }}
    >
      <div className={`${styles.previewCard} ${styles.previewCardCenter}`}>
        <p className={styles.previewQuote}>{quote}</p>
        {author && <p className={styles.previewAuthor}>{author}</p>}
        {storyLink && (
          <a href={storyLink} className={styles.previewStoryLink}>
            Read the full story &rarr;
          </a>
        )}
      </div>
    </div>
  );
}

const PREVIEW_MAP = {
  'ai-assistants': (tab) => (
    <PreviewQuote
      tab={tab}
      quote={`"Jenkins helped in achieving my automation work of continuously tweaking the ML model until it reaches 90% accuracy through scripts."`}
      author="— V Roshan Kumar Patro, Trainee, Linux World"
      storyLink="/user-story/to-truly-automate-everything"
    />
  ),
  education: (tab) => (
    <PreviewQuote
      tab={tab}
      quote={`"Using Jenkins helped our development team to adopt a test automation process with ease. Test automation culture was proven to be worth the effort."`}
      author="— Ari Tikka, Senior Test Automation Specialist, TietoEVRY"
      storyLink="/user-story/to-transfer-test-automation-culture-to-the-next-generation-of-software-testers-and-developers"
    />
  ),
  healthcare: (tab) => (
    <PreviewQuote
      tab={tab}
      quote={`"Jenkins didn't help me build a solution, Jenkins is the solution. We achieved infinite parallel builds and cost reduction—servers are only up for the required time."`}
      author="— Vitor Lobao, DevOps Engineer, Carta Healthcare"
      storyLink="/user-story/to-modernize-healthcare"
    />
  ),
  legal: (tab) => (
    <PreviewQuote
      tab={tab}
      quote={`"Jenkins empowered us to deliver our product safely, securely and reliably and helped us build trust with the customer."`}
      author="— Prabhu Chinnappan, Program Manager DevOps, Finastra"
      storyLink="/user-story/to-safe-secure-and-reliable-product-delivery"
    />
  ),
  enterprise: (tab) => (
    <PreviewQuote
      tab={tab}
      quote={`"Jenkins provides a centralized, well documented, well supported solution for our engineers. Support can be gained from across the community, with great resources being shared far and wide."`}
      author="— Ben Selby, Principal Engineer"
      storyLink="/user-story/to-provide-an-enterprise-grade-ci-cd-experience-to-engineers"
    />
  ),
  tools: (tab) => (
    <PreviewQuote
      tab={tab}
      quote={`"Jenkins saved us a lot of time and also helped in providing a quality product. It's like a god of automation. Thanks for giving us this awesome tool."`}
      author="— Akshit Singhal, DevOps Engineer"
      storyLink="/user-story/to-make-the-devops-process-simple-and-enjoyable"
    />
  ),
};

const UseCasesTabs = () => {
  const [activeIdx, setActiveIdx] = React.useState(0);
  const activeTab = TABS_DATA[activeIdx];

  return (
    <div className={styles.section}>
      {/* Header */}
      <div className={styles.header}>
        <div className={styles.chip}>
          <span className={styles.chipLabel}>With</span>
          <span className={styles.chipValue}>
            <Database className={styles.chipIcon} width={12} height={12} />
            JENKINS
          </span>
        </div>
        <h2 className={styles.heading}>
          Automation infrastructure that adapts to every use-case
        </h2>
        <p className={styles.subtitle}>
          Powered by an extensible open-source platform with 1,800+ plugins.
          Jenkins orchestrates CI/CD pipelines for teams of every size—from
          startups to the world's largest enterprises.
        </p>
      </div>

      {/* Grid */}
      <div className={styles.grid}>
        {/* Sidebar */}
        <div className={styles.sidebar}>
          {TABS_DATA.map((tab, idx) => (
            <button
              key={tab.id}
              className={`${styles.sidebarBtn} ${idx === activeIdx ? styles.sidebarBtnActive : ''}`}
              onClick={() => setActiveIdx(idx)}
            >
              <span
                className={`${styles.sidebarIconWrap} ${idx === activeIdx ? styles.sidebarIconWrapActive : ''}`}
              >
                <LucideIcon name={tab.sidebarIcon} size={18} />
              </span>
              <span
                className={`${styles.sidebarLabel} ${idx === activeIdx ? styles.sidebarLabelActive : ''}`}
              >
                {tab.sidebarLabel}
              </span>
            </button>
          ))}

          {/* CTA Card */}
          <div className={styles.ctaCard}>
            <div className={styles.ctaStripe} />
            <h4 className={styles.ctaTitle}>Jenkins Docs</h4>
            <p className={styles.ctaDesc}>
              Get started with Jenkins pipelines in minutes.
            </p>
            <a href="https://www.jenkins.io/doc/" className={styles.ctaLink}>
              Read documentation &rarr;
            </a>
          </div>
        </div>

        {/* Card Area */}
        <div className={styles.cardArea}>
          <div key={activeTab.id} className={styles.cardOuter}>
            <div className={styles.cardInner}>
              {/* Preview */}
              <div className={styles.previewWrap}>
                {PREVIEW_MAP[activeTab.id]?.(activeTab)}
              </div>

              {/* Content */}
              <div className={styles.cardContent}>
                <div className={styles.cardTextBlock}>
                  <h3 className={styles.cardTitle}>{activeTab.cardTitle}</h3>
                  <p className={styles.cardDesc}>{activeTab.cardDesc}</p>
                </div>

                <div className={styles.featuresList}>
                  {activeTab.features.map((f) => (
                    <div key={f.title} className={styles.featureItem}>
                      <div className={styles.featureIcon}>
                        <LucideIcon
                          name={f.icon}
                          size={20}
                          color={f.color}
                        />
                      </div>
                      <div>
                        <h4 className={styles.featureTitle}>{f.title}</h4>
                        <p className={styles.featureDesc}>{f.desc}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UseCasesTabs;
