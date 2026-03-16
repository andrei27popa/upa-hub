export interface ProtectedUnit {
  id: string;
  name: string;
  logo: string;
  description: string;
  founder: string;
  location: string;
  city: string;
  region: string;
  yearFounded: number;
  totalEmployees: number;
  employeesWithDisabilities: number;
  services: string[];
  domain: string;
  productTypes: string[];
  portfolio: string[];
  website: string;
  email: string;
  phone: string;
  certified: boolean;
  verified: boolean;
  socialImpactScore: number;
  testimonials: { author: string; role: string; text: string }[];
}

export interface AccessibilityTool {
  id: string;
  title: string;
  description: string;
  icon: string;
  category: string;
  difficulty: 'Începător' | 'Intermediar' | 'Avansat';
  userType: string[];
  url?: string;
}

export const regions = [
  'București', 'Cluj', 'Timiș', 'Iași', 'Constanța', 'Brașov',
  'Sibiu', 'Dolj', 'Bihor', 'Mureș', 'Argeș', 'Prahova',
];

export const domains = [
  'IT & Digital', 'Producție', 'Servicii curățenie', 'Ambalare',
  'Confecții textile', 'Artizanat', 'Alimentație', 'Tipografie',
  'Servicii administrative', 'Grădinărit & Peisagistică',
  'Reciclare', 'Catering',
];

export const serviceTypes = [
  'Digitalizare documente', 'Curățenie profesională', 'Ambalare produse',
  'Confecții', 'Catering', 'Web development', 'Tipărire',
  'Servicii de grădinărit', 'Producție industrială', 'Reciclare',
  'Servicii administrative', 'Design grafic',
];

export const protectedUnits: ProtectedUnit[] = [
  {
    id: '1',
    name: 'Atelierul de Incluziune',
    logo: '',
    description: 'Atelierul de Incluziune este o unitate protejată specializată în producția de articole textile personalizate și servicii de broderie. Cu o echipă dedicată și un mediu de lucru adaptat, oferim produse de calitate superioară pentru companii și instituții. Misiunea noastră este de a demonstra că incluziunea la locul de muncă generează valoare pentru toți.',
    founder: 'Maria Ionescu',
    location: 'Str. Libertății 45, Sector 4',
    city: 'București',
    region: 'București',
    yearFounded: 2018,
    totalEmployees: 35,
    employeesWithDisabilities: 22,
    services: ['Confecții textile', 'Broderie industrială', 'Personalizare produse', 'Ambalare'],
    domain: 'Confecții textile',
    productTypes: ['Textile', 'Uniforme', 'Articole promoționale'],
    portfolio: [],
    website: 'https://atelieruldeIncluziune.ro',
    email: 'contact@atelieruldeIncluziune.ro',
    phone: '+40 721 123 456',
    certified: true,
    verified: true,
    socialImpactScore: 92,
    testimonials: [
      { author: 'Alexandru Popescu', role: 'Director Achiziții, TechCorp', text: 'Colaborarea cu Atelierul de Incluziune ne-a adus nu doar produse de calitate, ci și satisfacția de a contribui la incluziunea socială.' },
      { author: 'Elena Dumitrescu', role: 'Manager HR, RetailPlus', text: 'Profesionalism desăvârșit și livrare la timp. Recomandăm cu căldură!' },
    ],
  },
  {
    id: '2',
    name: 'DigiAccess Solutions',
    logo: '',
    description: 'DigiAccess Solutions oferă servicii IT complete: dezvoltare web, testare software, digitalizare documente și suport tehnic. Echipa noastră include specialiști cu diverse tipuri de dizabilități care aduc perspective unice în procesul de dezvoltare, contribuind la crearea de soluții mai accesibile.',
    founder: 'Andrei Munteanu',
    location: 'Bd. Eroilor 12, Centru',
    city: 'Cluj-Napoca',
    region: 'Cluj',
    yearFounded: 2020,
    totalEmployees: 28,
    employeesWithDisabilities: 18,
    services: ['Web development', 'Testare accesibilitate', 'Digitalizare documente', 'Suport IT'],
    domain: 'IT & Digital',
    productTypes: ['Servicii IT', 'Software', 'Digitalizare'],
    portfolio: [],
    website: 'https://digiaccess.ro',
    email: 'office@digiaccess.ro',
    phone: '+40 744 567 890',
    certified: true,
    verified: true,
    socialImpactScore: 95,
    testimonials: [
      { author: 'Cristina Vasilescu', role: 'CTO, InnoSoft', text: 'DigiAccess ne-a ajutat să ne facem platforma accesibilă. Expertiză reală în testare de accesibilitate.' },
    ],
  },
  {
    id: '3',
    name: 'EcoWork Verde',
    logo: '',
    description: 'EcoWork Verde este o unitate protejată dedicată serviciilor de grădinărit, întreținere spații verzi și peisagistică. Oferim servicii complete de amenajare și întreținere pentru companii, primării și comunități locale, promovând simultan incluziunea și sustenabilitatea.',
    founder: 'Ion Dobre',
    location: 'Str. Primăverii 78',
    city: 'Timișoara',
    region: 'Timiș',
    yearFounded: 2016,
    totalEmployees: 42,
    employeesWithDisabilities: 28,
    services: ['Grădinărit', 'Peisagistică', 'Întreținere spații verzi', 'Amenajare parcuri'],
    domain: 'Grădinărit & Peisagistică',
    productTypes: ['Servicii peisagistică', 'Întreținere'],
    portfolio: [],
    website: 'https://ecoworkverde.ro',
    email: 'contact@ecoworkverde.ro',
    phone: '+40 756 234 567',
    certified: true,
    verified: true,
    socialImpactScore: 88,
    testimonials: [
      { author: 'Dan Marinescu', role: 'Primar, Comuna Verde', text: 'EcoWork Verde a transformat parcul nostru. Profesionalism și dedicare extraordinară.' },
    ],
  },
  {
    id: '4',
    name: 'PrintAbility',
    logo: '',
    description: 'PrintAbility oferă servicii complete de tipografie și design grafic. De la cărți de vizită la broșuri corporate, echipa noastră mixtă realizează materiale tipărite de cea mai înaltă calitate. Suntem dovada vie că diversitatea la locul de muncă îmbunătățește creativitatea.',
    founder: 'Sofia Radu',
    location: 'Bd. Unirii 156',
    city: 'Iași',
    region: 'Iași',
    yearFounded: 2019,
    totalEmployees: 20,
    employeesWithDisabilities: 13,
    services: ['Tipărire offset', 'Design grafic', 'Producție materiale promoționale', 'Ambalaje personalizate'],
    domain: 'Tipografie',
    productTypes: ['Materiale tipărite', 'Ambalaje', 'Produse promoționale'],
    portfolio: [],
    website: 'https://printability.ro',
    email: 'comenzi@printability.ro',
    phone: '+40 733 890 123',
    certified: true,
    verified: true,
    socialImpactScore: 85,
    testimonials: [
      { author: 'Mihai Stoica', role: 'Marketing Manager, BrandCo', text: 'Calitate excepțională la prețuri competitive. Partenerul nostru de încredere pentru toate materialele tipărite.' },
    ],
  },
  {
    id: '5',
    name: 'CleanInclusion',
    logo: '',
    description: 'CleanInclusion este lider în servicii profesionale de curățenie pentru birouri, spații comerciale și instituții publice. Cu peste 50 de angajați, dintre care majoritatea sunt persoane cu dizabilități, demonstrăm zilnic că un mediu de lucru incluziv produce rezultate excelente.',
    founder: 'Gabriela Stan',
    location: 'Str. Republicii 23',
    city: 'Brașov',
    region: 'Brașov',
    yearFounded: 2015,
    totalEmployees: 55,
    employeesWithDisabilities: 38,
    services: ['Curățenie birouri', 'Curățenie industrială', 'Dezinfecție', 'Întreținere clădiri'],
    domain: 'Servicii curățenie',
    productTypes: ['Servicii curățenie', 'Igienizare'],
    portfolio: [],
    website: 'https://cleaninclusion.ro',
    email: 'office@cleaninclusion.ro',
    phone: '+40 745 678 901',
    certified: true,
    verified: true,
    socialImpactScore: 90,
    testimonials: [
      { author: 'Laura Gheorghe', role: 'Facility Manager, CorpBuild', text: 'Servicii impecabile, echipă de încredere. CleanInclusion este partenerul nostru de 5 ani.' },
      { author: 'Vlad Nistor', role: 'Director, Școala Nr. 7', text: 'Am ales CleanInclusion pentru calitate și pentru impactul social. Nu am regretat nicio clipă.' },
    ],
  },
  {
    id: '6',
    name: 'PackSocial',
    logo: '',
    description: 'PackSocial este specializată în servicii de ambalare, co-packing și logistică ușoară. Lucrăm cu branduri mari din România pentru ambalarea și etichetarea produselor, oferind flexibilitate și atenție la detalii într-un mediu de lucru adaptat nevoilor angajaților noștri.',
    founder: 'Victor Popa',
    location: 'Zona Industrială Vest, Str. Fabricii 10',
    city: 'Sibiu',
    region: 'Sibiu',
    yearFounded: 2017,
    totalEmployees: 48,
    employeesWithDisabilities: 32,
    services: ['Ambalare produse', 'Co-packing', 'Etichetare', 'Asamblare kituri'],
    domain: 'Ambalare',
    productTypes: ['Servicii ambalare', 'Kituri promoționale'],
    portfolio: [],
    website: 'https://packsocial.ro',
    email: 'comenzi@packsocial.ro',
    phone: '+40 722 345 678',
    certified: true,
    verified: true,
    socialImpactScore: 87,
    testimonials: [
      { author: 'Ana Grigorescu', role: 'Supply Chain Manager, FreshFoods', text: 'PackSocial gestionează ambalarea pentru trei din liniile noastre de produse. Calitate constantă și livrare la timp.' },
    ],
  },
];

export const accessibilityTools: AccessibilityTool[] = [
  {
    id: '1',
    title: 'PDF Accessibility Checker',
    description: 'Verifică dacă documentele PDF respectă standardele de accesibilitate. Analizează structura, textul alternativ, ordinea de citire și compatibilitatea cu screen readers.',
    icon: 'FileCheck',
    category: 'Documente',
    difficulty: 'Intermediar',
    userType: ['Designer', 'Dezvoltator', 'Angajator'],
  },
  {
    id: '2',
    title: 'Color Contrast Checker',
    description: 'Verifică raportul de contrast între culorile de text și fundal conform standardelor WCAG 2.1. Sugerează alternative accesibile pentru combinațiile care nu trec testul.',
    icon: 'Palette',
    category: 'Design',
    difficulty: 'Începător',
    userType: ['Designer', 'Dezvoltator'],
    url: '/tool-uri/contrast-checker',
  },
  {
    id: '3',
    title: 'Alt-Text Generator',
    description: 'Generează automat texte alternative descriptive pentru imagini, optimizate pentru screen readers. Suportă limba română și engleză.',
    icon: 'Image',
    category: 'Conținut',
    difficulty: 'Începător',
    userType: ['Designer', 'Dezvoltator', 'Angajator'],
  },
  {
    id: '4',
    title: 'Accessibility Audit Helper',
    description: 'Instrument complet de audit pentru evaluarea accesibilității website-urilor. Generează rapoarte detaliate cu recomandări de îmbunătățire conform WCAG 2.1 AA.',
    icon: 'ClipboardCheck',
    category: 'Audit',
    difficulty: 'Avansat',
    userType: ['Dezvoltator', 'Angajator', 'Instituție publică'],
  },
  {
    id: '5',
    title: 'Text Simplification Tool',
    description: 'Simplifică textele complexe pentru a fi mai ușor de înțeles de persoanele cu dizabilități cognitive. Analizează nivelul de lizibilitate și sugerează reformulări.',
    icon: 'Type',
    category: 'Conținut',
    difficulty: 'Începător',
    userType: ['Angajator', 'ONG', 'Instituție publică'],
  },
  {
    id: '6',
    title: 'CV Builder Incluziv',
    description: 'Creator de CV-uri adaptat pentru persoanele cu dizabilități. Include secțiuni pentru abilități, adaptări necesare și evidențierea competențelor relevante.',
    icon: 'FileText',
    category: 'Carieră',
    difficulty: 'Începător',
    userType: ['Persoană cu dizabilități'],
  },
  {
    id: '7',
    title: 'Workplace Accommodation Planner',
    description: 'Planificator de adaptări la locul de muncă. Ajută angajatorii să identifice și implementeze adaptările necesare pentru angajații cu diverse tipuri de dizabilități.',
    icon: 'Building2',
    category: 'Angajare',
    difficulty: 'Intermediar',
    userType: ['Angajator', 'ONG'],
  },
  {
    id: '8',
    title: 'Checklist Accesibilitate Clădiri',
    description: 'Lista completă de verificare a accesibilității fizice a clădirilor: rampe, lifturi, semnalizare tactilă, toalete adaptate, parcări rezervate și multe altele.',
    icon: 'Building',
    category: 'Infrastructură',
    difficulty: 'Intermediar',
    userType: ['Angajator', 'Instituție publică', 'ONG'],
  },
  {
    id: '9',
    title: 'Checklist Accesibilitate Website',
    description: 'Ghid pas cu pas pentru verificarea conformității website-ului cu standardele WCAG 2.1. Include criterii pentru nivelurile A, AA și AAA.',
    icon: 'Globe',
    category: 'Audit',
    difficulty: 'Intermediar',
    userType: ['Dezvoltator', 'Designer'],
    url: '/tool-uri/checklist-web',
  },
  {
    id: '10',
    title: 'Generator Descrieri Audio',
    description: 'Creează descrieri audio pentru conținut vizual: prezentări, grafice, infografice. Ideal pentru materialele destinate persoanelor cu deficiențe de vedere.',
    icon: 'AudioLines',
    category: 'Conținut',
    difficulty: 'Avansat',
    userType: ['Designer', 'Angajator', 'ONG'],
  },
  {
    id: '11',
    title: 'Keyboard Navigation Tester',
    description: 'Testează dacă un website poate fi navigat complet doar cu tastatura. Identifică capcanele de focus și elementele inaccesibile.',
    icon: 'Keyboard',
    category: 'Audit',
    difficulty: 'Intermediar',
    userType: ['Dezvoltator'],
  },
  {
    id: '12',
    title: 'Ghid Limbaj Incluziv',
    description: 'Verifică și sugerează alternative pentru limbajul non-incluziv din texte. Include ghid de bune practici pentru comunicarea respectuoasă despre dizabilitate.',
    icon: 'MessageCircleHeart',
    category: 'Conținut',
    difficulty: 'Începător',
    userType: ['Angajator', 'ONG', 'Instituție publică', 'Designer'],
  },
];

export const toolCategories = [
  'Toate', 'Documente', 'Design', 'Conținut', 'Audit', 'Carieră', 'Angajare', 'Infrastructură',
];

export const userTypes = [
  'Toți', 'Angajator', 'Persoană cu dizabilități', 'Designer', 'Dezvoltator', 'ONG', 'Instituție publică',
];
