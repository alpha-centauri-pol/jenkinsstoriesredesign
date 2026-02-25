export const TESTIMONIALS = [
  {
    id: 'ibm',
    company: 'IBM',
    logoSrc: 'https://logo.clearbit.com/ibm.com',
    heading: 'Keeping Information and Code Safe',
    description:
      'Before Jenkins, the IBM DevOps team spent over six hours manually building their packager. Jenkins simplified the process into automated phases, keeping code secure in a private dev environment and detecting failures earlier.',
    metrics: [
      { value: '200%', label: 'faster build time' },
      { value: '100%', label: 'faster test cycles' },
    ],
    imageSrc:
      'https://images.unsplash.com/photo-1550751827-4bd374c3f58b?w=600&h=400&fit=crop',
    quote:
      'Jenkins makes our developer life easier with daily delivery, daily integration, daily improvement, and daily learning.',
    authorName: 'Julio Conchas',
    authorRole: 'DevOps, IBM',
  },
  {
    id: 'kplabs',
    company: 'KP Labs',
    logoSrc: 'https://logo.clearbit.com/kplabs.pl',
    heading: 'Automating Deep Space Exploration',
    description:
      'A satellite\'s onboard computer is crucial for mission success. KP Labs uses Jenkins to run hardware-based testing in their CI process, catching hardware/software incompatibilities early without disrupting developers.',
    metrics: [
      { value: '100%', label: 'automated hardware tests' },
      { value: '10x', label: 'shorter feedback times' },
    ],
    imageSrc:
      'https://images.unsplash.com/photo-1446776811953-b23d57bd21aa?w=600&h=400&fit=crop',
    quote:
      'Thanks to Jenkins pipelines being versioned, it is easy to test improvements without disrupting the work of other developers.',
    authorName: 'Maciej Nowak',
    authorRole: 'Software Engineer, KP Labs',
  },
  {
    id: 'fashion',
    company: 'Fashion Co.',
    logoSrc: 'https://logo.clearbit.com/farfetch.com',
    heading: 'Scaling CI/CD for Microservices',
    description:
      'Managing luxury fashion shipments at scale requires reliable pipelines. By integrating Jenkins with Kubernetes, they decoupled their pipelines, executing them in isolated pods to make deployments focused, fast, and reliable.',
    metrics: [
      { value: '10x', label: 'faster deployments' },
      { value: '6x', label: 'faster end-to-end tests' },
    ],
    imageSrc:
      'https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=600&h=400&fit=crop',
    quote:
      'Using Jenkins, we could take our CI/CD pipelines to a whole new level. We\'re now building and maintaining dozens of microservices with ease.',
    authorName: 'Sérgio Martins',
    authorRole: 'Test Automation Engineer',
  },
  {
    id: 'networking',
    company: 'Networking Inc.',
    logoSrc: 'https://logo.clearbit.com/cisco.com',
    heading: 'Security, Automation and Acceleration',
    description:
      'Manual security testing was slowing down releases. Jenkins was integrated to automate Static (SAST) and Dynamic (DAST) Application Security Testing tools, automatically scanning software after each component change.',
    metrics: [
      { value: '100%', label: 'automated security scans' },
      { value: '0', label: 'manual testing required' },
    ],
    imageSrc:
      'https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=600&h=400&fit=crop',
    quote:
      'Jenkins helped us to automate the boring stuff. We\'ve improved product security and shortened development release cycles.',
    authorName: 'Chris Siv',
    authorRole: 'Test Engineer',
  },
];
