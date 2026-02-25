export const TABS_DATA = [
  {
    id: 'ai-assistants',
    sidebarLabel: 'CI/CD Automation',
    sidebarIcon: 'Bot',
    cardTitle: 'Automate builds, tests, and deployments end-to-end',
    cardDesc:
      'Jenkins powers continuous integration and delivery pipelines for teams of every size. From compiling code to running test suites and deploying to production, Jenkins orchestrates the entire software lifecycle with extensible pipelines.',
    accentColor: '#60a5fa',
    gradientFrom: 'rgba(30, 58, 138, 0.4)',
    features: [
      {
        icon: 'Brain',
        color: '#60a5fa',
        title: 'Pipeline as Code',
        desc: 'Define your entire build pipeline in a Jenkinsfile',
      },
      {
        icon: 'Search',
        color: '#60a5fa',
        title: 'Automated testing',
        desc: 'Run unit, integration, and E2E tests on every commit',
      },
      {
        icon: 'Zap',
        color: '#60a5fa',
        title: 'Continuous delivery',
        desc: 'Ship faster with automated deployment workflows',
      },
    ],
  },
  {
    id: 'education',
    sidebarLabel: 'Testing & Quality',
    sidebarIcon: 'GraduationCap',
    cardTitle: 'Build a culture of automated testing and quality',
    cardDesc:
      'Jenkins helps development teams adopt test automation with ease—from scheduling overnight regression suites to running quality gates on every pull request. Ensure code quality, reduce manual effort, and shorten release cycles.',
    accentColor: '#34d399',
    gradientFrom: 'rgba(6, 78, 59, 0.4)',
    features: [
      {
        icon: 'FileQuestion',
        color: '#34d399',
        title: 'Regression testing',
        desc: 'Automated nightly test suites with morning reports',
      },
      {
        icon: 'Search',
        color: '#34d399',
        title: 'Code quality gates',
        desc: 'Integrate SonarQube and static analysis checks',
      },
      {
        icon: 'UserCheck',
        color: '#34d399',
        title: 'Test reporting',
        desc: 'JUnit reports and trend analysis built in',
      },
    ],
  },
  {
    id: 'healthcare',
    sidebarLabel: 'Cloud & Kubernetes',
    sidebarIcon: 'Stethoscope',
    cardTitle: 'Scale builds with Kubernetes and cloud-native pipelines',
    cardDesc:
      'Jenkins integrates natively with Kubernetes to spin up ephemeral build agents as pods, giving you infinite parallel builds that scale up on demand and scale down when idle—keeping costs low and builds fast.',
    accentColor: '#fb7185',
    gradientFrom: 'rgba(136, 19, 55, 0.4)',
    features: [
      {
        icon: 'FileText',
        color: '#fb7185',
        title: 'Dynamic agents',
        desc: 'Spin up Kubernetes pods as build agents on demand',
      },
      {
        icon: 'FileSearch',
        color: '#fb7185',
        title: 'Cost optimization',
        desc: 'Servers only run for the time builds need them',
      },
      {
        icon: 'HeartPulse',
        color: '#fb7185',
        title: 'Infrastructure as Code',
        desc: 'Manage Jenkins itself via Terraform and Docker',
      },
    ],
  },
  {
    id: 'legal',
    sidebarLabel: 'Security & Compliance',
    sidebarIcon: 'Scale',
    cardTitle: 'Secure your software supply chain with Jenkins',
    cardDesc:
      'Jenkins automates security scanning into every build—from Static Application Security Testing (SAST) to Dynamic Analysis (DAST). Catch vulnerabilities early, maintain audit trails, and deliver software you can trust.',
    accentColor: '#fbbf24',
    gradientFrom: 'rgba(120, 53, 15, 0.4)',
    features: [
      {
        icon: 'Briefcase',
        color: '#fbbf24',
        title: 'SAST & DAST',
        desc: 'Automated security scans on every code change',
      },
      {
        icon: 'Search',
        color: '#fbbf24',
        title: 'Build metadata',
        desc: 'Full audit trail of who built what and when',
      },
      {
        icon: 'ShieldCheck',
        color: '#fbbf24',
        title: 'Credential management',
        desc: 'Secure secrets with Vault and credential binding',
      },
    ],
  },
  {
    id: 'enterprise',
    sidebarLabel: 'Enterprise CI/CD',
    sidebarIcon: 'Building2',
    cardTitle: 'Enterprise-grade CI/CD across every team',
    cardDesc:
      'Jenkins provides a centralized, standardized build platform that scales across organizational units. With Configuration as Code, shared libraries, and SSO, teams get a consistent experience while retaining the flexibility to customize.',
    accentColor: '#a78bfa',
    gradientFrom: 'rgba(88, 28, 135, 0.4)',
    features: [
      {
        icon: 'Database',
        color: '#a78bfa',
        title: 'Centralized builds',
        desc: 'Holistic view of pipelines across all teams',
      },
      {
        icon: 'Search',
        color: '#a78bfa',
        title: 'Shared libraries',
        desc: 'Reuse pipeline code across microservices',
      },
      {
        icon: 'UserCheck',
        color: '#a78bfa',
        title: 'Configuration as Code',
        desc: 'Reproducible Jenkins instances from a YAML file',
      },
    ],
  },
  {
    id: 'tools',
    sidebarLabel: 'Developer Productivity',
    sidebarIcon: 'Wrench',
    cardTitle: 'Build internal tooling that accelerates your team',
    cardDesc:
      'Jenkins gives teams the power to automate anything—from weekly release cycles to server provisioning. With 1,800+ plugins, any workflow can be automated, freeing developers to focus on building great software.',
    accentColor: '#22d3ee',
    gradientFrom: 'rgba(22, 78, 99, 0.4)',
    features: [
      {
        icon: 'MessageSquare',
        color: '#22d3ee',
        title: 'Plugin ecosystem',
        desc: '1,800+ plugins for every tool and platform',
      },
      {
        icon: 'BookOpen',
        color: '#22d3ee',
        title: 'Scripted automation',
        desc: 'Groovy-based scripting for custom workflows',
      },
      {
        icon: 'Link2',
        color: '#22d3ee',
        title: 'Integrations',
        desc: 'Connect Git, Docker, Slack, Jira, and more',
      },
    ],
  },
];
