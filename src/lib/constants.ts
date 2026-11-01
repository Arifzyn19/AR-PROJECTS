import { Project, ExpertiseCategory } from '../types';

export const SITE_METADATA = {
  author: 'ARIFZYN',
  role: 'Independent Developer & Systems Architect',
  location: 'Jakarta, Indonesia · Remote Worldwide',
  availability: 'Available for Select Inquiries & Architecture',
  email: 'contact@arifzyn.dev',
  github: 'https://github.com/arifzyn',
  linkedin: 'https://linkedin.com/in/arifzyn',
  twitter: 'https://x.com/arifzyn',
  headline: 'I build digital experiences.',
  subheadline: 'Independent developer exploring the intersection of engineering, design, and technology.',
};

export const PROJECTS: Project[] = [
  {
    id: 'aoyami',
    title: 'AOYAMI',
    subtitle: 'Modular Application Ecosystem',
    category: 'Ecosystem',
    year: '2025',
    role: 'Lead Architect & UI Engineer',
    summary: 'A unified digital workspace ecosystem integrating cross-platform micro-applications, shared cryptographic state, and modular UI.',
    description: 'AOYAMI was engineered as a resilient application collective designed to eliminate workspace fragmentation. By standardizing communication protocols across independent services, it provides instant data synchronization, high-frequency offline caching, and a unified obsidian design language.',
    architectureDetails: [
      'Micro-frontend host architecture utilizing module federation with asynchronous bundle splitting.',
      'Decoupled event bus running over WebSockets with automated back-pressure buffering.',
      'Multi-tenant state synchronizer built on CRDTs (Conflict-free Replicated Data Types) for offline resilience.',
      'Hardware-accelerated layout engine with 60fps rendering budgets and strict sub-50ms latency.'
    ],
    techStack: ['TypeScript', 'React', 'Next.js', 'Node.js', 'WebSockets', 'Tailwind CSS', 'Docker'],
    metrics: [
      { label: 'Latency', value: '< 28ms' },
      { label: 'Bundle Footprint', value: '42 kB gzip' },
      { label: 'Module Sync', value: '99.98%' }
    ],
    screenshotUrl: '/src/assets/images/aoyami_project_1793519553128.jpg',
    repoUrl: 'https://github.com/arifzyn/aoyami-ecosystem',
    liveUrl: 'https://aoyami.arifzyn.dev',
    featured: true,
  },
  {
    id: 'presetly',
    title: 'PRESETLY',
    subtitle: 'Digital Preset & Creative Tool Platform',
    category: 'Platform',
    year: '2024',
    role: 'Full-Stack Developer & Shader Designer',
    summary: 'A high-performance creative preset engine delivering GPU-accelerated LUT previewing, sound profile calibration, and cross-DAW distribution.',
    description: 'PRESETLY rethinks how digital creators discover, audition, and deploy audio-visual presets. Featuring an in-browser WebGL LUT color grading engine and interactive audio frequency spectrum analyzer, it enables instantaneous previewing without requiring local render runs.',
    architectureDetails: [
      'Real-time 3D LUT (Look-Up Table) parser rendering tetrahedral color cube interpolation in WebGL.',
      'Web Audio API DSP pipeline performing live FFT spectrum analysis and dynamic parametric curve sculpting.',
      'Edge-cached binary distribution network handling multi-format preset packages (.cube, .xmp, .fst).',
      'Lossless client-side image processing pipeline with zero server roundtrips for privacy.'
    ],
    techStack: ['TypeScript', 'Three.js / WebGL', 'Web Audio API', 'React', 'Tailwind CSS', 'Supabase'],
    metrics: [
      { label: 'Audition Speed', value: 'Instant (< 16ms)' },
      { label: 'Color Accuracy', value: '32-bit Float' },
      { label: 'Supported Formats', value: '14+' }
    ],
    screenshotUrl: '/src/assets/images/presetly_project_1793519553573.jpg',
    repoUrl: 'https://github.com/arifzyn/presetly-platform',
    liveUrl: 'https://presetly.arifzyn.dev',
    featured: true,
  },
  {
    id: 'youra',
    title: 'YOURA',
    subtitle: 'High-Performance Anime Streaming Platform',
    category: 'Streaming',
    year: '2024',
    role: 'Core Systems & Frontend Engineer',
    summary: 'A cinema-first anime streaming application engineered with zero-buffer segment streaming, subtitle synchronization, and architectural minimalism.',
    description: 'Built for cinephiles who demand purist presentation, YOURA replaces ad-saturated conventional streaming sites with an architectural obsidian interface. It incorporates custom HLS segment pipelining, sub-frame subtitle synchronization, and keyboard-centric media navigation.',
    architectureDetails: [
      'Custom adaptive bitrate HLS streaming pipeline with intelligent segment prefetching heuristics.',
      'Hardware-accelerated ASS/SSA subtitle renderer parsed directly into Canvas/WebGL overlays.',
      'Global edge CDN proxying video segments through encrypted transient relays for zero throttling.',
      'Optimized memory lifecycle managing video buffer pools to prevent browser tab bloat on long viewing sessions.'
    ],
    techStack: ['TypeScript', 'React', 'HLS.js', 'Tailwind CSS', 'Node.js', 'Redis', 'Web Workers'],
    metrics: [
      { label: 'Time to First Frame', value: '320ms' },
      { label: 'Buffer Stall Rate', value: '0.04%' },
      { label: 'Sub Frame Sync', value: '± 4ms' }
    ],
    screenshotUrl: '/src/assets/images/youra_project_1793519553037.jpg',
    repoUrl: 'https://github.com/arifzyn/youra-streaming',
    liveUrl: 'https://youra.arifzyn.dev',
    featured: true,
  },
  {
    id: 'datanest',
    title: 'DATANEST',
    subtitle: 'Android Database Management & Inspector',
    category: 'Mobile & DB',
    year: '2024',
    role: 'Android & Native Systems Developer',
    summary: 'A developer-grade Android database management utility providing live Room/SQLite schema navigation, query profiling, and data manipulation.',
    description: 'DATANEST solves Android database debugging by bringing a full desktop-class inspection experience directly into the device environment. Developers can browse relational table graphs, execute raw queries with live syntax checking, and trace slow execution plans without relying on remote adb cables.',
    architectureDetails: [
      'Native Android application leveraging Jetpack Compose, Kotlin Coroutines, and Room ORM.',
      'Dynamic SQLite pragma inspection engine generating visual relational entity-relationship diagrams on-the-fly.',
      'In-memory SQL lexer and tokenizer providing syntax highlighting and query timing benchmarks.',
      'Export subsystem supporting encrypted database snapshot dumps and schema migration DDL verification.'
    ],
    techStack: ['Kotlin', 'Android Jetpack', 'Jetpack Compose', 'SQLite', 'Room DB', 'Coroutines / Flow'],
    metrics: [
      { label: 'Startup Overhead', value: '< 45ms' },
      { label: 'APK Footprint', value: '3.4 MB' },
      { label: 'Query Execution', value: 'Sub-millisecond' }
    ],
    screenshotUrl: '/src/assets/images/datanest_project_1793519553170.jpg',
    repoUrl: 'https://github.com/arifzyn/datanest-android',
    featured: true,
  },
  {
    id: 'minecraft-automation',
    title: 'MINECRAFT AUTOMATION',
    subtitle: 'Distributed Server Automation & Orchestration',
    category: 'Systems & Automation',
    year: '2023 - 2025',
    role: 'Distributed Systems & Automation Engineer',
    summary: 'A robust server automation and cluster management orchestrator featuring automated backups, packet analysis, and self-healing infrastructure.',
    description: 'An industrial-strength orchestration system designed for high-concurrency game server clusters. It delivers programmatic world backups, automated crash recovery, real-time packet-level telemetry monitoring, and resource-bounded Dockerized server deployment.',
    architectureDetails: [
      'Asynchronous daemon written with high-throughput event loops and zero-allocation socket pools.',
      'Distributed worker mesh coordinating snapshot backup rotations and incremental delta compression.',
      'Integrated metrics telemetry parsing tick-rates (TPS), entity allocations, and memory pressure in real time.',
      'Custom Discord bot and REST control plane providing remote administrative commands and emergency containment.'
    ],
    techStack: ['Node.js', 'TypeScript', 'Java', 'Docker', 'Linux / Bash', 'Redis', 'Prometheus'],
    metrics: [
      { label: 'Cluster Uptime', value: '99.99%' },
      { label: 'Automated Recovery', value: '< 12s' },
      { label: 'TPS Preservation', value: '20.0 Flat' }
    ],
    screenshotUrl: '/src/assets/images/minecraft_auto_project_1793519555374.jpg',
    repoUrl: 'https://github.com/arifzyn/minecraft-automation-suite',
    featured: true,
  },
];

export const EXPERTISE_AREAS: ExpertiseCategory[] = [
  {
    id: 'frontend',
    title: 'Frontend Engineering',
    shortDesc: 'Precision client-side architectures, deterministic rendering, and 60fps interaction standards.',
    description: 'Crafting responsive, high-performance web applications with obsessive attention to DOM performance, bundle footprints, and accessibility. Specializing in component-driven systems, custom WebGL visualizers, and state machines.',
    coreTechnologies: ['React', 'Next.js', 'TypeScript', 'Three.js / WebGL', 'Tailwind CSS', 'Vite'],
    keyPractices: [
      'Sub-50ms interaction budget and zero-layout-shift (CLS = 0) assurance',
      'Typed state machines with deterministic client-side synchronization',
      'Optimized WebGL canvases with on-demand rendering and zero GC loops',
      'Comprehensive WCAG AA contrast compliance and semantic markup'
    ],
    focusAreas: ['Interactive 3D Viewports', 'Design Systems & Tokens', 'Performance Profiling', 'PWA Architecture']
  },
  {
    id: 'backend',
    title: 'Backend Engineering',
    shortDesc: 'Resilient APIs, event-driven microservices, and high-throughput data processing.',
    description: 'Designing modular server systems capable of handling asynchronous concurrency, real-time streaming, and transactional reliability. Emphasizing clean boundaries, robust error propagation, and defensive security.',
    coreTechnologies: ['Node.js', 'TypeScript', 'Go', 'Express / Fastify', 'PostgreSQL', 'Redis', 'WebSockets'],
    keyPractices: [
      'Event-driven asynchronous architectures with back-pressure handling',
      'Stateless JWT / session authentication with cryptographic integrity',
      'Relational schema design with optimized indexes and ACID transactions',
      'High-throughput Redis caching layers and pub/sub message brokers'
    ],
    focusAreas: ['Streaming API Gateways', 'Real-Time WebSockets', 'Cache Invalidation Strategies', 'Database Optimization']
  },
  {
    id: 'android',
    title: 'Android Development',
    shortDesc: 'Native Kotlin engineering, Jetpack Compose UI, and local-first SQLite persistence.',
    description: 'Building lean native Android applications tailored for efficiency, battery consciousness, and intuitive haptics. Implementing modern reactive patterns with StateFlow, Coroutines, and clean architectural separation.',
    coreTechnologies: ['Kotlin', 'Jetpack Compose', 'Room ORM', 'SQLite', 'Coroutines / Flow', 'Android NDK'],
    keyPractices: [
      'Single-activity declarative UI architecture via Jetpack Compose',
      'Local-first offline synchronization with deterministic Room migrations',
      'Strict background battery budget management and WorkManager scheduling',
      'Deep system integration, hardware sensor querying, and native inspectors'
    ],
    focusAreas: ['Local Database Tooling', 'System Utilities', 'Reactive Architecture (MVI)', 'Offline-First Apps']
  },
  {
    id: 'architecture',
    title: 'System Architecture',
    shortDesc: 'Distributed orchestration, containerization, and resilient infrastructure design.',
    description: 'Structuring resilient computing environments from the ground up. Balancing service decomposition with operational simplicity, automated CI/CD pipelines, and proactive observability.',
    coreTechnologies: ['Docker', 'Linux / Unix', 'GitOps', 'Nginx', 'Prometheus', 'Cloudflare Workers'],
    keyPractices: [
      'Reproducible containerized environments with multi-stage minimal builds',
      'Proactive telemetry monitoring (metrics, structured logging, tracing)',
      'Zero-downtime rolling deployment strategies and disaster recovery runbooks',
      'Network perimeter security, reverse-proxying, and SSL automation'
    ],
    focusAreas: ['Server Cluster Orchestration', 'Automated Failover', 'CI/CD Pipelines', 'Edge Compute']
  },
  {
    id: 'ui-engineering',
    title: 'UI Engineering',
    shortDesc: 'Architectural minimalism, rigorous design token math, and ergonomic typography.',
    description: 'Bridging the chasm between raw software engineering and refined graphic design. Creating bespoke visual identities grounded in obsidian dark modes, deliberate grid geometry, and restrained kinetic motion.',
    coreTechnologies: ['Design Tokens', 'Tailwind CSS v4', 'Framer Motion', 'Figma', 'Typography Math', 'SVG Craft'],
    keyPractices: [
      'Strict 60-30-10 color budgeting with zero decorative gradient clutter',
      'Proportional typographic scaling using tabular numerals for technical data',
      'Compositor-only GPU transitions (transform & opacity) avoiding repaint stalls',
      'Unboxed metadata discipline with quiet editorial separators'
    ],
    focusAreas: ['Dark Architectural Minimalism', 'Micro-Interactions', 'Spatial Layout Math', 'Typography Hierarchy']
  }
];

export const TECHNICAL_PHILOSOPHY = [
  {
    number: '01',
    title: 'Restraint as an Aesthetic',
    detail: 'Eliminate decorative noise. Every pixel, hairline border, and accent highlight must fulfill a distinct functional purpose.'
  },
  {
    number: '02',
    title: 'Deterministic Performance',
    detail: 'Frame drops and unexpected state jumps undermine user trust. We build with strict 60fps budgets and predictable data flows.'
  },
  {
    number: '03',
    title: 'Systems Over Silos',
    detail: 'Great software is not just an interface or a database; it is a coherent ecosystem where each layer complements the next.'
  },
  {
    number: '04',
    title: 'Obsidian Precision',
    detail: 'Deep charcoal surfaces, restrained acid lime accents, and surgical typography provide an environment of high focus and clarity.'
  }
];

export const SYSTEM_SPECIFICATIONS = [
  { label: 'Aesthetics', value: 'Dark Architectural Minimalism' },
  { label: 'Rendering Engine', value: '60fps Procedural WebGL / PBR' },
  { label: 'Color System', value: 'Obsidian #101112 · Lime #B8F36B' },
  { label: 'Typography Standard', value: 'Geist Sans · IBM Plex Mono' },
];

