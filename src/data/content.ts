import { images, type ImageKey } from './images'

/* ------------------------------------------------------------------ */
/*  Profile                                                            */
/* ------------------------------------------------------------------ */

export const profile = {
  name: 'Leonardo Perez',
  initials: 'LP',
  age: 21,
  location: 'El Paso, Texas',
  email: 'lmperez15@miners.utep.edu',
  phone: '(915) 494-2907',
  phoneHref: 'tel:+19154942907',
  linkedin: 'https://www.linkedin.com/in/leonardomperez2005',
  linkedinHandle: 'in/leonardomperez2005',
  resumeHref: '/Leonardo_Perez_Resume.pdf',
  school: 'The University of Texas at El Paso',
  schoolShort: 'UTEP',
  degree: 'B.S. Mechanical Engineering',
  graduation: 'May 2028',
  gpa: '3.92',
  languages: ['English', 'Spanish'],
  // Hero intro
  intro:
    'Mechanical engineering student at UTEP. I work in manufacturing (metal additive, CNC machining, wire EDM) and in simulation-driven design, across a research lab, a steel mill, and a competition team.',
  // About
  about: [
    'I’m 21, from El Paso, and in my third year of mechanical engineering at UTEP. Most of what I do is make parts and make sure they are right: setting up laser powder bed fusion builds, programming and running CNC mills and lathes, cutting parts free on the wire EDM, and inspecting the result against the drawing.',
    'That work has taken me through the W.M. Keck Center for 3D Innovation as a research assistant, a summer at Vinton Steel designing cooling hardware for a hot rolling mill with ANSYS Fluent, and the Sun City Summit Rocket Team, where I lead manufacturing. I model in Siemens NX, Fusion 360, and SolidWorks, and I’m as comfortable on a manual lathe as on a five-machine LPBF floor.',
  ],
} as const

export const heroStats = [
  { value: '3.92', unit: '/ 4.00', label: 'GPA, Dean’s List every semester' },
  { value: '±0.005', unit: 'in', label: 'Wire EDM tolerance held' },
  { value: '100+', unit: '', label: 'LPBF samples processed' },
  { value: '5', unit: '', label: 'LPBF platforms operated' },
] as const

export const marqueeItems = [
  'HAAS VF-2',
  'Wire EDM',
  'EOS',
  'SLM 280',
  'Renishaw',
  'Aconity',
  'VELO3D',
  'RPMI 222XR',
  'Siemens NX',
  'Siemens Sinumerik',
  'ANSYS Fluent',
  'Fusion 360',
  'SolidWorks',
  'MATLAB',
] as const

/* ------------------------------------------------------------------ */
/*  Experience                                                         */
/* ------------------------------------------------------------------ */

export type Experience = {
  id: string
  role: string
  org: string
  location: string
  start: string
  end: string
  current?: boolean
  kind: 'research' | 'industry' | 'team'
  bullets: string[]
  tags: string[]
}

export const experience: Experience[] = [
  {
    id: 'keck',
    role: 'Undergraduate Research Assistant',
    org: 'W.M. Keck Center for 3D Innovation',
    location: 'El Paso, TX',
    start: 'Jun 2025',
    end: 'Present',
    current: true,
    kind: 'research',
    bullets: [
      'Machine setup, powder sieving, and build preparation across multiple LPBF systems (EOS, SLM, Aconity, Renishaw, VELO3D), keeping process-controlled conditions for each build; 100+ processed samples to date.',
      'Machine components and custom fixtures for post-processing on a HAAS VF-2 CNC mill, programming toolpaths in Fusion 360 and SolidWorks for internal and external LPBF research projects.',
      'Wire EDM post-processing (SSG HB400) to remove parts from build plates to customer and research specifications, consistently within ±0.005 in.',
      'Operate, set up, and program a custom gantry integrated into an RPMI 222XR on a Siemens Sinumerik controller, supporting Directed Energy Deposition research in a hybrid additive environment.',
      'Develop and optimize CNC toolpaths in Siemens NX for hybrid additive processes, ensuring accurate gantry motion and reliable deposition during experimental builds.',
      'Section DED specimens on the wire EDM for metallurgical analysis, process validation, and characterization of hybrid-manufactured components.',
    ],
    tags: ['LPBF', 'DED', 'Wire EDM', 'HAAS VF-2', 'Siemens NX', 'Sinumerik'],
  },
  {
    id: 'vinton',
    role: 'Engineering Intern',
    org: 'Vinton Steel, LLC',
    location: 'El Paso, TX',
    start: 'Jun 2026',
    end: 'Aug 2026',
    kind: 'industry',
    bullets: [
      'Designed and optimized a cooling pipe for a hot rolling mill stand, developing and evaluating multiple concepts with ANSYS Fluent, reducing overspray onto adjacent equipment and extending bearing service life.',
      'Wrote the Standard Operating Procedure for roll stand assembly, standardizing maintenance practices and improving consistency, efficiency, and training for Roll Shop personnel.',
      'Installed and programmed NFC tags on rolling mill rolls, encoding identification and inventory data to improve roll traceability and inventory management.',
    ],
    tags: ['ANSYS Fluent', 'CFD', 'SOP Authoring', 'NFC', 'Rolling Mill'],
  },
  {
    id: 'rocket',
    role: 'Manufacturing Team Lead',
    org: 'Sun City Summit Rocket Team',
    location: 'El Paso, TX',
    start: 'Jan 2026',
    end: 'Present',
    current: true,
    kind: 'team',
    bullets: [
      'Lead the manufacturing team producing flight-critical hardware for UTEP’s entry at the International Rocket Engineering Competition (IREC), coordinating machining operations and task execution.',
      'Independently manufacture fins, fin mounting brackets, a steel nose tip, ballast, and bulk plates using wire EDM and CNC milling, consistently within ±0.01 in.',
      'Dimensional inspection and quality verification of manufactured components for fit, alignment, and aerodynamic performance before final integration.',
    ],
    tags: ['Team Leadership', 'CNC Milling', 'Wire EDM', 'Inspection', 'IREC'],
  },
]

/* ------------------------------------------------------------------ */
/*  Projects                                                           */
/* ------------------------------------------------------------------ */

export type Spec = { label: string; value: string }

export type Project = {
  id: string
  index: string
  title: string
  subtitle: string
  org: string
  year: string
  description: string
  specs: Spec[]
  images: ImageKey[]
  cover: ImageKey | null
}

export const projects: Project[] = [
  {
    id: 'fin-can',
    index: '01',
    title: 'Fin Can',
    subtitle: 'Aluminum fins and mounting brackets',
    org: 'Sun City Summit Rocket Team',
    year: '2026',
    description:
      'Aluminum fins and mounting brackets for the team’s launch vehicle. Fin profiles were cut on the wire EDM, brackets milled, leading edges beveled, and every part inspected for fit and alignment before installation on the airframe.',
    specs: [
      { label: 'Material', value: 'Aluminum' },
      { label: 'Process', value: 'Wire EDM, CNC milling' },
      { label: 'Tolerance', value: '±0.01 in' },
    ],
    images: ['fin-can-installed', 'fin-can-part', 'fin-single', 'fin-can-cad', 'fin-can-part-2', 'fin-can-cad-2'],
    cover: 'fin-can-installed',
  },
  {
    id: 'nose-tip',
    index: '02',
    title: 'Steel Nose Tip',
    subtitle: 'Turned steel tip for the nose cone',
    org: 'Sun City Summit Rocket Team',
    year: '2026',
    description:
      'Steel tip for the nose cone, turned with a shouldered base so it seats in the cone. Modeled, machined, and checked against the model before integration.',
    specs: [
      { label: 'Material', value: 'Steel' },
      { label: 'Process', value: 'CNC turning' },
    ],
    images: ['nose-tip-part', 'nose-tip-cad', 'nose-tip-cad-2'],
    cover: 'nose-tip-part',
  },
  {
    id: 'boat-tail',
    index: '03',
    title: 'Boat Tail',
    subtitle: 'Tapered aluminum aft section',
    org: 'Sun City Summit Rocket Team',
    year: '2026',
    description:
      'Tapered aluminum section that closes out the airframe behind the fins, with a stepped shoulder that fits into the body tube. Shown modeled, machined, and installed.',
    specs: [
      { label: 'Material', value: 'Aluminum' },
      { label: 'Process', value: 'CNC turning' },
    ],
    images: ['boat-tail-part', 'boat-tail-cad', 'boat-tail-part-2', 'fin-can-installed'],
    cover: 'boat-tail-part',
  },
  {
    id: 'ballast',
    index: '04',
    title: 'Ballast',
    subtitle: 'Turned steel mass with center bore',
    org: 'Sun City Summit Rocket Team',
    year: '2026',
    description: 'Steel ballast turned to a tapered profile with a center bore, used to set the vehicle’s center of gravity.',
    specs: [
      { label: 'Material', value: 'Steel' },
      { label: 'Process', value: 'CNC turning, drilling' },
    ],
    images: ['ballast-part'],
    cover: 'ballast-part',
  },
  {
    id: 'fixtures',
    index: '05',
    title: 'Post-Processing Fixtures',
    subtitle: 'CNC-milled fixture plates for LPBF parts',
    org: 'W.M. Keck Center for 3D Innovation',
    year: '2025 to 2026',
    description:
      'Fixture plates milled on the HAAS VF-2 to hold additively manufactured parts during post-processing. Pocket geometry comes from the part CAD so each piece seats the same way for secondary machining and inspection.',
    specs: [
      { label: 'Machine', value: 'HAAS VF-2' },
      { label: 'CAM', value: 'Fusion 360, SolidWorks' },
    ],
    images: ['fixture-plate', 'fixture-plates-pair'],
    cover: 'fixture-plate',
  },
  {
    id: 'multitool',
    index: '06',
    title: 'Stainless Steel Multi-Tool',
    subtitle: '1st place, America Makes Additive Manufacturing in Steel',
    org: 'America Makes · W.M. Keck Center',
    year: '2026',
    description:
      'One of two undergraduates on the multidisciplinary team that designed and manufactured a stainless steel multi-tool by laser powder bed fusion. Responsible for machine setup, build preparation, build removal, and wire EDM post-processing of the winning part.',
    specs: [
      { label: 'Process', value: 'LPBF, wire EDM' },
      { label: 'Material', value: 'Stainless steel' },
      { label: 'Result', value: '1st place, 2026' },
    ],
    images: [],
    cover: null,
  },
  {
    id: 'cooling-pipe',
    index: '07',
    title: 'Rolling Mill Cooling Pipe',
    subtitle: 'CFD-driven redesign for a hot rolling stand',
    org: 'Vinton Steel, LLC',
    year: '2026',
    description:
      'Developed and compared several cooling-pipe concepts for a hot rolling mill stand in ANSYS Fluent. The final design reduced overspray onto adjacent equipment and extends bearing service life.',
    specs: [
      { label: 'Tool', value: 'ANSYS Fluent' },
      { label: 'Outcome', value: 'Less overspray, longer bearing life' },
    ],
    images: [],
    cover: null,
  },
]

/* ------------------------------------------------------------------ */
/*  Awards                                                             */
/* ------------------------------------------------------------------ */

export type Award = {
  id: string
  place: string
  title: string
  org: string
  year: string
  description: string
  image: ImageKey | null
  featured?: boolean
}

export const awards: Award[] = [
  {
    id: 'america-makes',
    place: '1st',
    title: 'Additive Manufacturing in Steel Competition',
    org: 'America Makes',
    year: '2026',
    description:
      'One of two undergraduates on the multidisciplinary team that designed and built an LPBF stainless steel multi-tool. Performed machine setup, build preparation, build removal, and wire EDM post-processing for the winning component.',
    image: null,
    featured: true,
  },
  {
    id: 'irec',
    place: '2nd',
    title: 'International Rocket Engineering Competition, 30k COTS',
    org: 'IREC',
    year: '2026',
    description:
      'Selected as one of 14 representatives from a 100+ member team based on technical contributions. Supported final assembly, integration, and launch operations at the competition.',
    image: 'irec-2nd-place',
    featured: true,
  },
  {
    id: 'rookie',
    place: 'Rookie of the Year',
    title: 'Manufacturing',
    org: '',
    year: '2026',
    description: 'Recognized in the manufacturing category in my first season.',
    image: 'rookie-of-the-year',
  },
  {
    id: 'deans-list',
    place: '6×',
    title: 'Dean’s List',
    org: 'The University of Texas at El Paso',
    year: '2023 to 2026',
    description: 'Fall 2023, Spring 2024, Fall 2024, Spring 2025, Fall 2025, Spring 2026. GPA 3.92 / 4.00.',
    image: null,
  },
]

/* ------------------------------------------------------------------ */
/*  Skills                                                             */
/* ------------------------------------------------------------------ */

export type SkillGroup = {
  id: string
  title: string
  items: string[]
}

export const skillGroups: SkillGroup[] = [
  {
    id: 'additive',
    title: 'Additive Manufacturing',
    items: [
      'Laser powder bed fusion (LPBF)',
      'EOS',
      'SLM 280',
      'Renishaw',
      'Aconity',
      'VELO3D',
      'Directed Energy Deposition (DED)',
      'Powder handling and sieving',
      'Build setup',
      'Post-processing',
    ],
  },
  {
    id: 'subtractive',
    title: 'Subtractive Manufacturing',
    items: [
      'CNC milling',
      'CNC turning',
      'Wire EDM',
      'Manual mill',
      'Manual lathe',
      'Bandsaw',
      'CAM programming',
      'Workholding and fixturing',
      'Calipers and micrometers',
      'Dimensional inspection',
    ],
  },
  {
    id: 'fundamentals',
    title: 'Engineering Fundamentals',
    items: [
      'Statics and dynamics',
      'Mechanics of materials',
      'Thermodynamics',
      'Fluid mechanics',
      'Heat transfer',
      'Engineering materials',
      'Engineering drawings and GD&T',
      'Tolerancing',
    ],
  },
  {
    id: 'software',
    title: 'Software',
    items: ['Siemens NX (CAD/CAM)', 'ANSYS Fluent', 'Fusion 360', 'SolidWorks (CAD/CAM)', 'MATLAB', 'Siemens Sinumerik', 'Microsoft Office'],
  },
  {
    id: 'languages',
    title: 'Languages',
    items: ['English (fluent)', 'Spanish (fluent)'],
  },
]

/* ------------------------------------------------------------------ */
/*  Gallery                                                            */
/* ------------------------------------------------------------------ */

export type GalleryItem = {
  key: ImageKey
  caption: string
}

export const gallery: GalleryItem[] = [
  { key: 'leo-odyssey-rocket', caption: 'With ODYSSEY at IREC 2026.' },
  { key: 'team-launch-site', caption: 'Sun City Summit Rocket Team at the launch site.' },
  { key: 'fin-can-installed', caption: 'Fin can and boat tail installed on the airframe.' },
  { key: 'leo-dust-rocket', caption: 'With DUST.' },
  { key: 'fin-single', caption: 'Machined aluminum fin.' },
  { key: 'irec-2nd-place', caption: '2nd place, IREC 2026, 30k COTS.' },
  { key: 'fixture-plates-pair', caption: 'Fixture plates for LPBF post-processing.' },
  { key: 'airframe-floor', caption: 'Airframe before fin installation.' },
  { key: 'boat-tail-part-2', caption: 'Aluminum boat tail.' },
  { key: 'rookie-of-the-year', caption: 'Rookie of the Year, Manufacturing.' },
  { key: 'nose-tip-part', caption: 'Steel nose tip.' },
  { key: 'fin-can-part-2', caption: 'Fin can assembly.' },
]

export const navLinks = [
  { href: '#about', label: 'About' },
  { href: '#experience', label: 'Experience' },
  { href: '#work', label: 'Work' },
  { href: '#awards', label: 'Awards' },
  { href: '#gallery', label: 'Gallery' },
  { href: '#skills', label: 'Skills' },
  { href: '#contact', label: 'Contact' },
] as const

export { images }
