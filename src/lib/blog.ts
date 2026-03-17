export interface BlogPost {
  id: string;
  slug: string;
  title: string;
  excerpt: string;
  content: string; // HTML content
  author: string;
  authorRole: string;
  date: string;
  readTime: number;
  category: string;
  tags: string[];
  featured: boolean;
  image?: string;
}

export const blogCategories = ['Toate', 'Legislație', 'Incluziune', 'Accesibilitate', 'Povești de succes', 'Ghiduri practice'];

export const blogPosts: BlogPost[] = [
  {
    id: '1',
    slug: 'legea-448-2006-obligatiile-angajatorilor',
    title: 'Legea 448/2006: Tot ce trebuie să știi despre obligațiile angajatorilor',
    excerpt: 'Ghid complet despre obligațiile legale ale angajatorilor cu peste 50 de salariați privind angajarea persoanelor cu dizabilități și alternativele disponibile.',
    content: `
      <p>Legea nr. 448/2006 privind protecția și promovarea drepturilor persoanelor cu handicap reprezintă cadrul legislativ fundamental care reglementează obligațiile angajatorilor din România în ceea ce privește incluziunea persoanelor cu dizabilități pe piața muncii. Înțelegerea corectă a acestei legi este esențială pentru orice companie cu peste 50 de angajați.</p>

      <h2>Obligația principală: cota de 4%</h2>
      <p>Conform articolului 78 din Legea 448/2006, autoritățile și instituțiile publice, persoanele juridice, publice sau private, care au cel puțin 50 de angajați, au obligația de a angaja persoane cu handicap într-un procent de cel puțin 4% din numărul total de angajați. Această cotă se calculează raportat la numărul mediu de angajați din luna anterioară.</p>

      <p>De exemplu, o companie cu 200 de angajați trebuie să aibă cel puțin 8 persoane cu dizabilități angajate. Nerespectarea acestei obligații atrage după sine sancțiuni financiare semnificative, care pot afecta bugetul companiei pe termen lung.</p>

      <h2>Alternative legale la angajarea directă</h2>
      <p>Legea oferă două alternative pentru angajatorii care nu îndeplinesc cota de 4%:</p>
      <ul>
        <li><strong>Plata unei sume către bugetul de stat</strong> — echivalentul salariului minim brut pe economie înmulțit cu numărul de locuri de muncă neocupate de persoane cu dizabilități.</li>
        <li><strong>Achiziționarea de produse sau servicii de la unități protejate autorizate</strong> — în valoare echivalentă sumei datorate bugetului de stat. Această variantă este avantajoasă atât economic, cât și social, deoarece contribuie direct la angajarea persoanelor cu dizabilități.</li>
      </ul>

      <h2>De ce colaborarea cu unitățile protejate este soluția optimă</h2>
      <p>Colaborarea cu o unitate protejată autorizată oferă multiple avantaje. Pe lângă conformitatea legală, companiile beneficiază de servicii profesionale de calitate, contribuie la incluziunea socială și își îmbunătățesc imaginea corporativă. Multe unități protejate oferă servicii digitale moderne — de la web design la marketing online — la standarde competitive pe piață.</p>

      <p>Este important de reținut că documentele justificative trebuie păstrate și prezentate la solicitarea autorităților competente. Facturile emise de unitățile protejate autorizate sunt instrumentul principal de demonstrare a conformității cu prevederile legale.</p>
    `,
    author: 'Elena Marinescu',
    authorRole: 'Consultant legislație socială',
    date: '15 Mar 2025',
    readTime: 8,
    category: 'Legislație',
    tags: ['Legea 448', 'obligații angajatori', 'cota 4%', 'unități protejate'],
    featured: true,
  },
  {
    id: '2',
    slug: '5-beneficii-colaborare-unitate-protejata',
    title: '5 Beneficii ale colaborării cu o unitate protejată',
    excerpt: 'Descoperă avantajele concrete ale parteneriatelor cu unitățile protejate autorizate: de la economii financiare la impact social pozitiv.',
    content: `
      <p>Colaborarea cu unitățile protejate autorizate nu este doar o obligație legală — este o oportunitate strategică pentru companiile care doresc să combine responsabilitatea socială cu eficiența economică. Iată cele cinci beneficii principale ale acestui tip de parteneriat.</p>

      <h2>1. Economii financiare semnificative</h2>
      <p>Prin achiziționarea de servicii de la o unitate protejată, companiile evită plata penalităților către bugetul de stat. Mai mult, costul serviciilor primite este adesea competitiv cu cel al furnizorilor tradiționali, ceea ce înseamnă că firma primește valoare reală în schimbul investiției. Practic, banii care ar fi mers la buget se transformă în servicii utile pentru afacere.</p>

      <h2>2. Servicii profesionale de calitate</h2>
      <p>Unitățile protejate moderne oferă o gamă largă de servicii profesionale: dezvoltare web, design grafic, marketing digital, traduceri, servicii administrative, servicii de curățenie și multe altele. Calitatea acestor servicii este comparabilă cu cea a furnizorilor tradiționali, iar echipele sunt motivate și dedicate.</p>

      <h2>3. Impact social pozitiv și CSR</h2>
      <p>Parteneriatele cu unitățile protejate contribuie direct la incluziunea persoanelor cu dizabilități pe piața muncii. Acest lucru poate fi valorificat în rapoartele de responsabilitate socială corporativă (CSR) ale companiei și contribuie la construirea unui brand pozitiv. Studiile arată că 87% dintre consumatori preferă brandurile care susțin cauze sociale.</p>

      <h2>4. Conformitate legală simplificată</h2>
      <p>Procesul de colaborare cu o unitate protejată este simplu și transparent. Factura emisă de unitatea protejată autorizată este singurul document necesar pentru demonstrarea conformității cu Legea 448/2006. Nu sunt necesare documente suplimentare sau proceduri birocratice complexe.</p>

      <h2>5. Flexibilitate și adaptabilitate</h2>
      <p>Unitățile protejate moderne se adaptează nevoilor clienților lor. Fie că aveți nevoie de un proiect punctual sau de un parteneriat pe termen lung, serviciile pot fi calibrate în funcție de buget și cerințe. Această flexibilitate face ca parteneriatele să fie sustenabile pe termen lung, cu beneficii pentru ambele părți.</p>

      <p>În concluzie, colaborarea cu o unitate protejată este una dintre cele mai inteligente decizii pe care o companie le poate lua — combinând beneficii financiare cu impact social pozitiv și conformitate legală.</p>
    `,
    author: 'Adrian Popescu',
    authorRole: 'Manager parteneriate',
    date: '2 Feb 2025',
    readTime: 6,
    category: 'Incluziune',
    tags: ['unități protejate', 'beneficii', 'CSR', 'parteneriate'],
    featured: true,
  },
  {
    id: '3',
    slug: 'ghid-complet-wcag-2-1-website-accesibil',
    title: 'Cum să faci un website accesibil: Ghid complet WCAG 2.1',
    excerpt: 'Totul despre standardele WCAG 2.1 și cum să le implementezi corect pentru a face site-ul tău accesibil tuturor utilizatorilor.',
    content: `
      <p>Accesibilitatea web nu mai este un moft — este o necesitate. Standardele WCAG (Web Content Accessibility Guidelines) 2.1, publicate de W3C, reprezintă referința internațională pentru accesibilitatea conținutului web. Acest ghid vă va ajuta să înțelegeți și să implementați aceste standarde.</p>

      <h2>Cele patru principii WCAG</h2>
      <p>WCAG 2.1 se bazează pe patru principii fundamentale, cunoscute sub acronimul POUR:</p>
      <ul>
        <li><strong>Perceptibil (Perceivable)</strong> — Informațiile și componentele interfeței trebuie prezentate într-un mod pe care utilizatorii le pot percepe. Aceasta include text alternativ pentru imagini, subtitrări pentru conținut audio și contrast suficient între text și fundal.</li>
        <li><strong>Operabil (Operable)</strong> — Componentele interfeței și navigarea trebuie să fie operabile. Toate funcționalitățile trebuie să fie accesibile prin tastatură, utilizatorii trebuie să aibă suficient timp pentru a citi conținutul, iar navigarea trebuie să fie intuitivă.</li>
        <li><strong>Inteligibil (Understandable)</strong> — Informațiile și operarea interfeței trebuie să fie ușor de înțeles. Textul trebuie să fie lizibil, paginile trebuie să funcționeze previzibil, iar utilizatorii trebuie ajutați să evite și să corecteze erorile.</li>
        <li><strong>Robust</strong> — Conținutul trebuie să fie suficient de robust pentru a fi interpretat în mod fiabil de o varietate largă de agenți utilizator, inclusiv tehnologii asistive.</li>
      </ul>

      <h2>Nivelurile de conformitate</h2>
      <p>WCAG 2.1 definește trei niveluri de conformitate: A (minim), AA (recomandat) și AAA (optim). Majoritatea legislațiilor și standardelor internaționale solicită nivelul AA. Aceasta include cerințe precum un raport de contrast de cel puțin 4.5:1 pentru text normal și 3:1 pentru text mare.</p>

      <h2>Verificări esențiale de accesibilitate</h2>
      <p>Pentru a evalua accesibilitatea unui website, există câteva verificări esențiale pe care le puteți face: testarea navigării doar cu tastatura, verificarea contrastului culorilor, testarea cu un cititor de ecran (precum NVDA sau VoiceOver), validarea codului HTML și verificarea responsivității pe diferite dispozitive.</p>

      <p>Implementarea accesibilității web nu trebuie să fie complicată. Începeți cu pașii de bază — structură semantică HTML, text alternativ, contrast suficient — și construiți gradual. Fiecare îmbunătățire adusă face site-ul mai accesibil pentru milioane de oameni cu dizabilități.</p>
    `,
    author: 'Marian Dumitrescu',
    authorRole: 'Expert accesibilitate digitală',
    date: '20 Ian 2025',
    readTime: 10,
    category: 'Accesibilitate',
    tags: ['WCAG', 'accesibilitate web', 'design inclusiv', 'W3C'],
    featured: true,
  },
  {
    id: '4',
    slug: 'povestea-digiaccess-tehnologia-schimba-vieti',
    title: 'Povestea DigiAccess: Cum tehnologia schimbă vieți',
    excerpt: 'Despre cum un program de digitalizare a transformat viețile a zeci de persoane cu dizabilități, oferindu-le acces la piața muncii.',
    content: `
      <p>Când am lansat programul DigiAccess acum trei ani, nu ne așteptam la impactul pe care urma să-l aibă. Ce a început ca o inițiativă mică de formare digitală pentru persoane cu dizabilități s-a transformat într-un program care a schimbat fundamental viețile a peste 120 de beneficiari.</p>

      <h2>Primii pași</h2>
      <p>Totul a început cu o observație simplă: multe persoane cu dizabilități aveau competențe și motivație, dar le lipseau abilitățile digitale necesare pentru a accede pe piața muncii modernă. Am organizat primul curs de competențe digitale de bază cu 12 participanți într-o sală împrumutată de la o bibliotecă din București. Rezultatele au fost remarcabile — în trei luni, 8 din cei 12 participanți și-au găsit un loc de muncă.</p>

      <h2>Creșterea programului</h2>
      <p>Succesul primei generații a atras atenția mai multor organizații. Am primit finanțare de la trei companii mari și am putut extinde programul în cinci orașe din România. Cursurile s-au diversificat: de la competențe digitale de bază la programare web, design grafic și marketing online. Fiecare curs a fost adaptat nevoilor specifice ale participanților, cu suport individualizat și ritm personalizat.</p>

      <h2>Povești care inspiră</h2>
      <p>Mihai, 34 de ani, diagnosticat cu deficiență de vedere, a absolvit cursul de web development și lucrează acum ca front-end developer la o firmă de IT din Cluj. „Programul mi-a arătat că limitele pe care le vedeam erau în mare parte construcții mentale", spune el. Ana, 28 de ani, cu dizabilitate locomotorie, a devenit designer grafic freelancer și are clienți din toată Europa. „Nu mai sunt definită de ceea ce nu pot face, ci de ceea ce pot", povestește Ana.</p>

      <p>Aceste povești nu sunt excepții — sunt rezultatul unui sistem care funcționează atunci când oferim oamenilor instrumentele și oportunitățile de care au nevoie. Tehnologia nu doar că egalizează șansele — ea deschide uși pe care mulți nici nu știau că există. Programul DigiAccess continuă să crească, iar impactul său se măsoară nu doar în cifre, ci în vieți transformate.</p>
    `,
    author: 'Cristina Ionescu',
    authorRole: 'Director program DigiAccess',
    date: '8 Ian 2025',
    readTime: 7,
    category: 'Povești de succes',
    tags: ['DigiAccess', 'digitalizare', 'incluziune', 'formare profesională'],
    featured: false,
  },
  {
    id: '5',
    slug: 'adaptari-rezonabile-locul-de-munca-ghid-angajatori',
    title: 'Adaptări rezonabile la locul de muncă: Ghid pentru angajatori',
    excerpt: 'Ce sunt adaptările rezonabile, cum le implementezi și de ce sunt esențiale pentru un mediu de lucru inclusiv și productiv.',
    content: `
      <p>Adaptările rezonabile la locul de muncă reprezintă modificările sau ajustările care permit unei persoane cu dizabilități să desfășoare activitatea profesională în condiții echitabile. Legea obligă angajatorii să ofere astfel de adaptări, dar dincolo de obligația legală, acestea sunt o investiție inteligentă în productivitate și loialitate.</p>

      <h2>Ce sunt adaptările rezonabile?</h2>
      <p>O adaptare rezonabilă este orice modificare a mediului de lucru, a proceselor sau a echipamentelor care permite unui angajat cu dizabilități să-și îndeplinească atribuțiile. Termenul „rezonabil" se referă la faptul că adaptarea nu trebuie să impună o sarcină disproporționată angajatorului. Exemple comune includ: ajustarea programului de lucru, furnizarea de echipament specializat, modificarea spațiului fizic sau permiterea muncii la distanță.</p>

      <h2>Tipuri frecvente de adaptări</h2>
      <p>Adaptările pot fi clasificate în mai multe categorii:</p>
      <ul>
        <li><strong>Adaptări fizice:</strong> rampe de acces, birouri ajustabile, iluminat adaptat, spații de parcare dedicate.</li>
        <li><strong>Adaptări tehnologice:</strong> software de citire a ecranului, tastaturi ergonomice, monitoare cu dimensiuni mari, software de recunoaștere vocală.</li>
        <li><strong>Adaptări organizaționale:</strong> program flexibil, pauze suplimentare, posibilitatea de a lucra de acasă, redistribuirea unor sarcini.</li>
        <li><strong>Adaptări comunicaționale:</strong> instrucțiuni în formate accesibile, interpret de limbaj mimico-gestual, comunicare scrisă ca alternativă la cea verbală.</li>
      </ul>

      <h2>Procesul de implementare</h2>
      <p>Implementarea adaptărilor rezonabile trebuie să fie un proces colaborativ. Discutați deschis cu angajatul despre nevoile sale specifice, consultați specialiști în ergonomie sau accesibilitate și evaluați periodic eficacitatea adaptărilor. Costurile sunt deseori mult mai mici decât se estimează inițial — studiile arată că peste 50% dintre adaptări nu implică niciun cost, iar cele care implică costuri au o medie de doar 500 de euro.</p>

      <p>Un mediu de lucru adaptat nu beneficiază doar persoanele cu dizabilități. Birourile ergonomice, iluminatul calitativ și programele flexibile îmbunătățesc productivitatea și satisfacția tuturor angajaților. Investiția în adaptări rezonabile este o investiție în echipa voastră în ansamblu.</p>
    `,
    author: 'Andrei Vasile',
    authorRole: 'Specialist resurse umane',
    date: '22 Dec 2024',
    readTime: 9,
    category: 'Ghiduri practice',
    tags: ['adaptări rezonabile', 'loc de muncă', 'angajatori', 'incluziune'],
    featured: false,
  },
  {
    id: '6',
    slug: 'incluziunea-digitala-accesibilitatea-web-2025',
    title: 'Incluziunea digitală: De ce contează accesibilitatea web în 2025',
    excerpt: 'Într-o lume din ce în ce mai digitalizată, accesibilitatea web devine crucială pentru incluziunea a milioane de persoane cu dizabilități.',
    content: `
      <p>Anul 2025 marchează un punct de cotitură în discuția despre accesibilitatea digitală. Cu peste 1 miliard de persoane cu dizabilități la nivel global și o economie din ce în ce mai dependentă de serviciile online, accesibilitatea web nu mai este opțională — este o condiție fundamentală pentru o societate echitabilă.</p>

      <h2>Barierele digitale invizibile</h2>
      <p>Multe persoane fără dizabilități nu realizează cât de inaccesibil poate fi internetul. Un site web fără text alternativ pentru imagini este complet inutil pentru o persoană cu deficiență de vedere. Un formular fără etichete corecte devine imposibil de completat cu un cititor de ecran. Un video fără subtitrări exclude persoanele cu deficiențe de auz. Aceste bariere digitale sunt la fel de reale ca o scară fără rampă.</p>

      <h2>Legislația europeană — Directiva EAA</h2>
      <p>Directiva Europeană privind Accesibilitatea (European Accessibility Act — EAA), care intră în vigoare pe deplin în 2025, impune standarde de accesibilitate pentru serviciile digitale din toate statele membre UE. Aceasta acoperă site-uri web, aplicații mobile, servicii bancare online, comerț electronic și multe altele. Companiile care nu se conformează riscă sancțiuni financiare și acțiuni legale.</p>

      <h2>Beneficii economice ale accesibilității</h2>
      <p>Dincolo de aspectul etic și legal, accesibilitatea web are sens economic. Piața persoanelor cu dizabilități și a familiilor lor este estimată la peste 8 trilioane de dolari la nivel global. Un site accesibil atrage mai mulți utilizatori, îmbunătățește SEO-ul (motoarele de căutare favorizează conținutul accesibil) și reduce riscul legal. Companiile care investesc în accesibilitate digitală raportează creșteri ale vânzărilor online de până la 20%.</p>

      <p>Accesibilitatea web nu este doar despre tehnologie — este despre empatie, incluziune și respect. Fiecare site web accesibil este o poartă deschisă către informație, servicii și oportunități pentru milioane de oameni. Anul 2025 este momentul perfect pentru a acționa — nu doar pentru că legea o cere, ci pentru că este ceea ce trebuie făcut.</p>
    `,
    author: 'Diana Radu',
    authorRole: 'Consultant accesibilitate digitală',
    date: '10 Dec 2024',
    readTime: 7,
    category: 'Accesibilitate',
    tags: ['accesibilitate web', 'incluziune digitală', 'EAA', 'legislație'],
    featured: false,
  },
  {
    id: '7',
    slug: 'cum-sa-alegi-unitatea-protejata-potrivita',
    title: 'Cum să alegi unitatea protejată potrivită pentru compania ta',
    excerpt: 'Criterii esențiale și pași practici pentru selectarea unei unități protejate autorizate care să corespundă nevoilor companiei tale.',
    content: `
      <p>Alegerea unei unități protejate autorizate nu trebuie să fie un proces complicat, dar merită atenție. O decizie informată vă va asigura nu doar conformitatea legală, ci și un parteneriat valoros pe termen lung. Iată ce trebuie să aveți în vedere.</p>

      <h2>Verificați autorizația</h2>
      <p>Primul și cel mai important pas este să verificați dacă unitatea protejată deține o autorizație valabilă emisă de Autoritatea Națională pentru Protecția Drepturilor Persoanelor cu Dizabilități (ANPDPD). Doar facturile emise de unități protejate autorizate sunt recunoscute ca justificare pentru îndeplinirea obligațiilor prevăzute de Legea 448/2006. Puteți consulta lista unităților autorizate pe site-ul ANPDPD.</p>

      <h2>Evaluați serviciile oferite</h2>
      <p>Unitățile protejate oferă o gamă variată de servicii. Unele sunt specializate în servicii digitale (web design, social media, content writing), altele în servicii de producție sau artizanale. Alegeți o unitate ale cărei servicii se aliniază cu nevoile reale ale companiei voastre. Astfel, investiția nu este doar o obligație legală, ci și un cost operațional eficient.</p>

      <h2>Evaluați calitatea și comunicarea</h2>
      <p>Solicitați mostre de lucru sau portofolii anterioare. O unitate protejată profesionistă va fi transparentă în privința proceselor, termenelor și calității. Comunicarea eficientă este esențială — asigurați-vă că unitatea are un punct de contact dedicat și că răspunde la solicitări într-un termen rezonabil.</p>

      <h2>Considerați impactul social</h2>
      <p>Interesați-vă despre numărul de persoane cu dizabilități angajate, condițiile de lucru oferite și impactul social al unității. O unitate protejată autentică va fi mândră să împărtășească aceste informații. Parteneriatele cele mai valoroase sunt cele în care ambele părți — compania și unitatea protejată — cresc și se dezvoltă împreună.</p>

      <p>Nu uitați: relația cu o unitate protejată este un parteneriat, nu o tranzacție. Investiți timp în construirea unei relații de colaborare și veți vedea rezultate pe termen lung, atât pentru compania voastră, cât și pentru comunitate.</p>
    `,
    author: 'Laura Gheorghe',
    authorRole: 'Expert achiziții responsabile',
    date: '28 Nov 2024',
    readTime: 6,
    category: 'Ghiduri practice',
    tags: ['unități protejate', 'ghid alegere', 'autorizare', 'parteneriate'],
    featured: false,
  },
  {
    id: '8',
    slug: 'impactul-economic-incluziunii-persoanelor-cu-dizabilitati',
    title: 'Impactul economic al incluziunii persoanelor cu dizabilități',
    excerpt: 'Date și studii care demonstrează că incluziunea persoanelor cu dizabilități pe piața muncii generează beneficii economice majore.',
    content: `
      <p>Incluziunea persoanelor cu dizabilități pe piața muncii nu este doar o chestiune de dreptate socială — este o strategie economică inteligentă. Studii realizate de organizații precum Banca Mondială, McKinsey și Accenture demonstrează că diversitatea și incluziunea generează beneficii economice concrete și măsurabile.</p>

      <h2>Cifre care vorbesc de la sine</h2>
      <p>Conform Organizației Internaționale a Muncii (OIM), excluderea persoanelor cu dizabilități de pe piața muncii costă economiile naționale între 3% și 7% din PIB. În România, unde aproximativ 850.000 de persoane au un grad de dizabilitate certificat, potențialul economic nevalorificat este uriaș. Studiile Accenture arată că companiile care includ activ persoane cu dizabilități au venituri cu 28% mai mari și profit net de două ori mai mare decât media industriei.</p>

      <h2>Productivitate și loialitate</h2>
      <p>Contrar prejudecăților, angajații cu dizabilități demonstrează adesea o productivitate egală sau superioară colegilor lor. Un studiu DuPont a arătat că 90% dintre angajații cu dizabilități au primit evaluări de performanță egale sau superioare colegilor fără dizabilități. Mai mult, rata de retenție este semnificativ mai mare — angajații cu dizabilități sunt cu 72% mai loiali angajatorului, reducând costurile asociate fluctuației de personal.</p>

      <h2>Inovație prin diversitate</h2>
      <p>Echipele diverse — inclusiv din perspectiva dizabilității — generează soluții mai creative și inovatoare. Persoanele cu dizabilități dezvoltă zilnic strategii adaptive care se traduc în gândire creativă la locul de muncă. De la tehnologii asistive care au devenit mainstream (cum ar fi assistentii vocali) până la design universal care beneficiază pe toată lumea, inovația născută din nevoia de accesibilitate a transformat industrii întregi.</p>

      <p>Investiția în incluziunea persoanelor cu dizabilități nu este caritate — este bussiness smart. Companiile care înțeleg acest lucru nu doar că fac bine societății, ci se poziționează strategic pentru succesul pe termen lung. Datele sunt clare: incluziunea nu costă — plătește.</p>
    `,
    author: 'Bogdan Stancu',
    authorRole: 'Economist, cercetător în politici sociale',
    date: '15 Nov 2024',
    readTime: 8,
    category: 'Incluziune',
    tags: ['impact economic', 'incluziune', 'piața muncii', 'diversitate'],
    featured: false,
  },
];

export function getBlogPost(slug: string): BlogPost | undefined {
  return blogPosts.find((post) => post.slug === slug);
}

export function getRelatedPosts(currentSlug: string, category: string, count = 3): BlogPost[] {
  return blogPosts
    .filter((post) => post.slug !== currentSlug)
    .sort((a, b) => (a.category === category ? -1 : 1) - (b.category === category ? -1 : 1))
    .slice(0, count);
}
