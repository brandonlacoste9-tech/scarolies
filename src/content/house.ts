export const house = {
  name: "Scarolie's Pasta Emporium",
  shortName: "Scarolie's",
  liveSite: 'http://www.scarolies.com/',
  liveSiteEn: 'http://www.scarolies.com/en/',
  email: 'scarolies@yahoo.ca',
  emailHref: 'mailto:scarolies@yahoo.ca',
  facebook: 'https://www.facebook.com/Scarolies',
  yelp: 'https://www.yelp.ca/biz/scarolies-pasta-emporium-pointe-claire',
  tripadvisor: 'https://www.tripadvisor.ca/Restaurant_Review-g181730-d806565-Reviews-Scarolie_s-Pointe_Claire_Quebec.html',
  winePdf: 'https://singleapp.com/menus/menu_182894_document.pdf?1675917708',
  vipFr: 'http://www.scarolies.com/#liste-vip',
  vipEn: 'http://www.scarolies.com/en/#vip-list',
  bookFr: 'https://www.tbdine.com/book/restaurant/scarolies-pasta-emporium?idApp=17&language=fr-ca',
  bookEn: 'https://www.tbdine.com/book/restaurant/scarolies-pasta-emporium?idApp=17&language=en-us',
  book: 'https://tbdine.com/pointe-claire/restaurants/scarolies-pasta-emporium',
} as const;

export const locations = [
  {
    id: 'pointe-claire' as const,
    slug: 'pointe-claire',
    name: { en: "Scarolie's Pasta Emporium", fr: "Scarolie's Pasta Emporium" },
    area: { en: 'Pointe-Claire', fr: 'Pointe-Claire' },
    addressLines: {
      en: ['950 St-Jean Blvd.', 'Pointe-Claire, QC'],
      fr: ['950, boul. Saint-Jean', 'Pointe-Claire, QC'],
    },
    postal: 'H9R 5N8',
    phone: '(514) 694-8611',
    phoneHref: 'tel:+15146948611',
    mapUrl: 'https://www.google.com/maps/search/?api=1&query=950+Boulevard+Saint-Jean+Pointe-Claire+QC+H9R+5N8',
    visitHours: {
      en: 'Monday–Thursday 11:00–21:00. Friday–Saturday 11:00–22:00. Sunday 11:00–21:00.',
      fr: 'Lundi au jeudi 11 h – 21 h. Vendredi et samedi 11 h – 22 h. Dimanche 11 h – 21 h.',
    },
    hoursShort: {
      en: 'Mon–Thu 11:00–21:00 · Fri–Sat 11:00–22:00 · Sun 11:00–21:00',
      fr: 'Lun–jeu 11 h – 21 h · ven–sam 11 h – 22 h · dim 11 h – 21 h',
    },
    phoneHours: {
      en: 'Reserve on TB Dine or call (514) 694-8611.',
      fr: 'Réservez sur TB Dine ou au (514) 694-8611.',
    },
  },
] as const;

export function bookUrl(locale: string) {
  return locale === 'fr' ? house.bookFr : house.bookEn;
}

export const bookingDoors = [
  {
    id: 'book',
    title: { en: 'Reserve a table', fr: 'Réserver une table' },
    body: {
      en: 'Online reservations go through TB Dine, the booker on their live site. You can also call.',
      fr: 'Les réservations en ligne passent par TB Dine, l’outil sur leur site. Vous pouvez aussi téléphoner.',
    },
    href: house.bookFr,
    cta: { en: 'TB Dine', fr: 'TB Dine' },
  },
  {
    id: 'call',
    title: { en: 'Call', fr: 'Téléphoner' },
    body: {
      en: '950 St-Jean Blvd., Pointe-Claire. (514) 694-8611.',
      fr: '950, boul. Saint-Jean, Pointe-Claire. (514) 694-8611.',
    },
    href: 'tel:+15146948611',
    cta: { en: '(514) 694-8611', fr: '(514) 694-8611' },
  },
  {
    id: 'menu',
    title: { en: 'The menu', fr: 'Le menu' },
    body: {
      en: 'Pasta, antipasto, salads, chicken and veal, pizza, grill, soup, fish, baked pasta. Lunch includes soup of the day. Tax extra. Prices may change.',
      fr: 'Pâtes, antipasto, salades, poulet et veau, pizza, grillades, soupes, poisson, pâtes au four. Le midi, soupe du jour incluse. Taxes en sus. Prix sujets à changement.',
    },
    href: '/menu',
    cta: { en: 'See the menu', fr: 'Voir le menu' },
  },
  {
    id: 'takeaway',
    title: { en: 'Family plates', fr: 'Repas familial' },
    body: {
      en: 'Takeaway plates for four. Call (514) 694-8611. Prices may change.',
      fr: 'Assiettes pour emporter, portions pour 4. Téléphonez au (514) 694-8611. Prix sujets à changement.',
    },
    href: '/takeaway',
    cta: { en: 'Family plates', fr: 'Repas familial' },
  },
] as const;

export const menu = [
  {
    id: "pasta",
    title: { en: "Pasta", fr: "Pasta" },
    items: [
      {
        id: "spaghettini-napolitana",
        title: { en: "Spaghettini Napolitana", fr: "Spaghettini Napolitana" },
        body: { en: "Spagettini pasta tossed with our homemade tomato sauce", fr: "Pâtes spaghetti sautées avec sauce aux tomates maison" },
        price: "$21.95",
      },
      {
        id: "spaghetti-bolognese",
        title: { en: "Spaghetti Bolognese", fr: "Spaghetti Bolognese" },
        body: { en: "Extra meatballs $6.95. Spaghettini pasta tossed with our homemade meat sauce", fr: "Extra boulettes 6,95 $. Pâtes spaghetti avec notre sauce a la viande maison" },
        price: "$24.75",
      },
      {
        id: "penne-arrabiata",
        title: { en: "Penne Arrabiata", fr: "Penne Arrabiata" },
        body: { en: "Penne pasta sautéed with our homemade spicey tomato sauce", fr: "Pâtes penne sautées avec sauce aux tomates épices maison" },
        price: "$23.75",
      },
      {
        id: "linguini-primavera",
        title: { en: "Linguini Primavera", fr: "Linguini Primavera" },
        body: { en: "Linguini pasta in a rosé sauce with fresh seasonal vegetables, white wine and garlic", fr: "Pâtes linguini avec sauce rosé, légumes saisonniére, vin blanc et ail" },
        price: "$27.45",
      },
      {
        id: "fettuccini-alfredo",
        title: { en: "Fettuccini Alfredo", fr: "Fettuccini Alfredo" },
        body: { en: "Fettucine pasta with alfredo sauce and parmesan cheese", fr: "Pâtes fettuccini avec sauce alfredo et fromage parmesan" },
        price: "$25.95",
      },
      {
        id: "spaghetti-carbonara",
        title: { en: "Spaghetti Carbonara", fr: "Spaghetti Carbonara" },
        body: { en: "Spaghetti with cream, panchetta, parmesan cheese, egg yolks and black peppercorns", fr: "Spaghetti avec crème, pancetta, fromage parmesan, jaunes d'oeufs et poivre noir moulu" },
        price: "$27.25",
      },
      {
        id: "spaghettini-aglio-olio",
        title: { en: "Spaghetti Aglio & Olio", fr: "Spaghettini Aglio & Olio" },
        body: { en: "Extra virgin olive oil, garlic, basil & white wine", fr: "Huile d'olive extra vierge, ail, basilic et vin blanc" },
        price: "$19.95",
      },
      {
        id: "penne-romanoff",
        title: { en: "Penne Romanoff", fr: "Penne Romanoff" },
        body: { en: "Penne pasta in a rosé sauce, with vodka, crushed black pepper, mushrooms and shallots", fr: "Pâtes penne sauce rose, vodka, poivrons noires, champignons et échalottes" },
        price: "$25.95",
      },
      {
        id: "penne-gigi",
        title: { en: "Penne Gigi", fr: "Penne Gigi" },
        body: { en: "Penne pasta in a rosé sauce, with proscuitto, mushrooms and shallots", fr: "Pâtes penne sauce rosé, proscuitto, champignons et échalottes" },
        price: "$26.45",
      },
      {
        id: "tortellini-alla-rosa",
        title: { en: "Tortellini alla Rosa", fr: "Tortellini alla Rosa" },
        body: { en: "Tortellini stuffed with ricotta cheese sautéed in a rosé sauce with parmesan cheese", fr: "Pâtes tortellini farcies avec fromage ricotta sautées dans une sauce rosé avec fromage parmesan" },
        price: "$26.45",
      },
      {
        id: "gnochi-al-gorgonzola-e-spinaci",
        title: { en: "Gnochi Gorgonzola e Spinaci", fr: "Gnochi al gorgonzola e spinaci" },
        body: { en: "Gnochi pasta in a creamy gorgonzola cheese sauce with spinach", fr: "Gnochi, épinards et sauce au fromage gorgonzola crémeuse." },
        price: "$26.25",
      },
      {
        id: "fettuccini-giorgio",
        title: { en: "Fettuccini Giorgio", fr: "Fettuccini Giorgio" },
        body: { en: "Fettucine pasta in a tomato sauce with spinach, mushrooms, red bell peppers, brie and goat cheese", fr: "Pâtes fettuccini avec sauce tomates, pesto, champignons, épinards, poivrons rouge, fromage brie et de chévre" },
        price: "$27.95",
      },
      {
        id: "fettuccini-alla-giovanni",
        title: { en: "Fettuccini alla Giovanni", fr: "Fettuccini alla Giovanni" },
        body: { en: "Cream, Brandy, shallots, ground pepper, portobello mushrooms, pesto, pancetta ( Italian bacon ), sundried tomatoes and Kalamata black olives", fr: "Crème, Brandy, échalots, poivre moulu, champignons portobello, pesto, pancetta ( bacon italienne ), tomates séchées et olives noire Kalamata" },
        price: "$28.45",
      },
      {
        id: "fettuccini-al-pollo-e-funghi",
        title: { en: "Fettuccini al Pollo e Funghi", fr: "Fettuccini al Pollo e Funghi" },
        body: { en: "Sautéed chicken breast with cream, pesto, portobello mushrooms, sundried tomatoes and white wine", fr: "Poulet sauté en languettes, crème, ail, champignons portobello, pesto, tomates séchées et vin blanc" },
        price: "$29.25",
      },
      {
        id: "penne-arrosto",
        title: { en: "Penne Arrosto", fr: "Penne Arrosto" },
        body: { en: "Grilled Italian sausage, tomato sauce, garlic, pesto, red peppers, shallots and white wine", fr: "Pâtes penne avec saucisses italienne , sauce tomate, ail, poivrons rouges, pesto, échalots et vin blanc" },
        price: "$26.45",
      },
      {
        id: "spaghetti-cacciatore",
        title: { en: "Spaghetti Cacciatore", fr: "Spaghetti Cacciatore" },
        body: { en: "Spaghetti in a tomato sauce with sautéed chicken, garlic, grilled peppers, shallots, mushrooms, pesto, onions, fresh basil, oregano, white wine and Kalamata olives", fr: "Spaghetti avec sauce tomates, poulet en languettes, ail, poivrons grillés, échalottes, champignons, pesto, oignons, basilic frais, origan, vin blanc et olives Kalamata" },
        price: "$28.95",
      },
      {
        id: "linguini-porcini-spinacci",
        title: { en: "Linguini Porcini Spinacci", fr: "Linguini Porcini Spinacci" },
        body: { en: "Porcini mushrooms, cream and pesto, sundried tomatoes, garlic, spinach, basil and bocconcini cheese", fr: "Champignons portobello, crème, pesto, tomates séchées, ail, épinards, basilic, chilli et fromage boconccini" },
        price: "$27.45",
      },
      {
        id: "capelli-di-angelo-alla-diablo",
        title: { en: "Capelli di Angelo alla Diablo", fr: "Capelli di Angelo alla Diablo" },
        body: { en: "Angel hair pasta in arrabiata sauce with shrimps, mushrooms and shallots", fr: "Pâtes cheveux d' anges avec crevettes, champignons, échalottes et sauce arrabiata" },
        price: "$32.95",
      },
      {
        id: "capelli-di-angelo-gamberi-funghi",
        title: { en: "Capelli di Angelo gamberi Funghi", fr: "Capelli di Angelo gamberi Funghi" },
        body: { en: "Angel hair pasta in a creamy pesto sauce with shrimps, porcini mushrooms, garlic, white wine and olive oil", fr: "Pâtes cheveux d'anges,crevettes, champignons portobello, ail. huile d'olive, vin blanc, crème et pesto" },
        price: "$32.95",
      },
      {
        id: "tortellini-con-portobello",
        title: { en: "Tortellini con Portobello", fr: "Tortellini con Portobello" },
        body: { en: "Tortellini stuffed with cheese, in a cream sauce with white wine, portobello mushrooms & parmesan cheese", fr: "Tortellini farcies avec fromage, cream, vin blanc, champignons portobello et fromage parmesan" },
        price: "$26.25",
      },
      {
        id: "capelli-con-pesto-di-pomodori-e-portobello",
        title: { en: "Capelli con Pesto di Pomodori e Portobello", fr: "Capelli con Pesto di Pomodori e Portobello" },
        body: { en: "Angel hair pasta in a creamy pesto sauce with broccoli, portebello mushrooms, sundried tomato,white wine, romano cheese, topped with roasted pine nuts", fr: "Pâtes cheveux d' anges avec fromage romano, sauce au pesto crèmeuse avec vin blanc, tomates séchées, brocoli, champignons portobello et noix de pins rotis" },
        price: "$27.45",
      },
      {
        id: "linguini-vongole-marinara-ou-vin-blanc-ail",
        title: { en: "Linguini Vongole Marinara or White Wine", fr: "Linguini Vongole Marinara ou Vin Blanc/Ail" },
        body: { en: "Linguini with marinara sauce,baby clams, garlic, shallots, white wine / or white wine & garlic", fr: "Linguini sauce marinara, palourdes, ail, échalottes, vin blanc, poivre noir ou sauce au vin blanc et ail" },
        price: "$27.45",
      },
      {
        id: "penne-al-salmone",
        title: { en: "Penne al Salmone", fr: "Penne al salmone" },
        body: { en: "Smoked salmon, cream, tomato sauce, black peppercorns, vodka and shallots", fr: "Saumon fumé, creme, sauce tomate, poivre noir moulu, vodka et échalotes" },
        price: "$27.75",
      },
      {
        id: "ravioli-of-aragosta",
        title: { en: "Ravioli d'Aragosta", fr: "Ravioli of Aragosta" },
        body: { en: "Ravioli pasta stuffed with lobster in a rosé sauce with sundried tomatos, garlic, brandy and green Madagascar peppercorns", fr: "Pâtes raviolis farcies avec homard dans sauce rosé, ail, tomates séchées, poivre vert de Madagascar et Brandy" },
        price: "$31.45",
      },
      {
        id: "linguini-pescatore",
        title: { en: "Linguini Pescatore", fr: "Linguini Pescatore" },
        body: { en: "Linguini pasta in a tomato sauce with white wine and a mix of seafood", fr: "Pâtes linguini dans une sauce au tomates vin blanc avec fruits de mer" },
        price: "$34.45",
      },
      {
        id: "fettuccini-scalope",
        title: { en: "Fettuccini Scalope", fr: "Fettuccini Scalope" },
        body: { en: "Fettucine pasta in a rosé sauce with scallops, sundried tomatos, garlic, brandy and portebello mushrooms", fr: "Pâtes fettuccini avec sauce rosé, petoncles, tomates séchées, ail, brandy champignons portobello" },
        price: "$32.95",
      },
      {
        id: "linguini-con-gamberetti-alla-brandy-rosa",
        title: { en: "Linguini con Gamberetti alla Brandy Rosa", fr: "Linguini con Gamberetti alla Brandy Rosa" },
        body: { en: "Linguini pasta sautéed in a creamy tomato lobster brandy sauce, with jumbo shrimp seared in extra virgin olive oil, with roasted red peppers, portobello mushrooms, asparagus and shallots.", fr: "Pâtes linguini sautées dans une sauce crèmeuse au homard, tomates et brandy avec crevettes géantes poêlées à l'huile d'olive extra vierge, poivrons rouges rôtis, champignons portobello, asperges, et échalotes." },
        price: "$33.95",
      },
      {
        id: "pates-sans-gluten",
        title: { en: "* gluten-free pasta", fr: "* pates sans gluten" },
        body: { en: "penne", fr: "penne" },
        price: "$3.95",
      },
    ],
  },
  {
    id: "antipasto",
    title: { en: "Antipasto", fr: "Antipasto" },
    items: [
      {
        id: "calamari-fritti",
        title: { en: "Calamari Fritti", fr: "Calamari Fritti" },
        price: "$23.95",
      },
      {
        id: "boulettes-de-viande",
        title: { en: "Meatballs", fr: "Boulettes de viande" },
        price: "$10.45",
      },
      {
        id: "cocktail-de-crevettes",
        title: { en: "Shrimp Cocktail", fr: "Cocktail de Crevettes" },
        price: "$22.75",
      },
      {
        id: "saucisse-italienne",
        title: { en: "Grilled Italian Sausage", fr: "Saucisse italienne" },
        price: "$15.45",
      },
      {
        id: "portobello-et-poivrons-rouges",
        title: { en: "Portobello Mushrooms & Red Pepper", fr: "Portobello et Poivrons Rouges" },
        price: "$16.45",
      },
      {
        id: "zucchini-fritti",
        title: { en: "Zucchini Fritti", fr: "Zucchini Fritti" },
        price: "$18.95",
      },
      {
        id: "avocado-crab-crevettes-calypso",
        title: { en: "Avocado Crab & Crevettes Calypso", fr: "Avocado Crab & Crevettes Calypso" },
        price: "$19.75",
      },
      {
        id: "crevettes-sautees-a-l-ail",
        title: { en: "Garlic Shrimp", fr: "Crevettes Sautées a l'ail" },
        price: "$22.75",
      },
      {
        id: "cozze-moules",
        title: { en: "Cozze ( mussels )", fr: "Cozze ( moules )" },
        price: "$23.50",
      },
      {
        id: "aubergine-gratinee",
        title: { en: "Eggplant Parmesan", fr: "Aubergine Gratinée" },
        price: "$15.95",
      },
      {
        id: "salmone-affumicato",
        title: { en: "Salmone Affumicato", fr: "Salmone Affumicato" },
        body: { en: "Smoked salmon", fr: "Saumon fumé" },
        price: "$20.75",
      },
    ],
  },
  {
    id: "insalata",
    title: { en: "Insalata", fr: "Insalata" },
    items: [
      {
        id: "insalata-cesare",
        title: { en: "Insalata Cesare", fr: "Insalata Cesare" },
        body: { en: "Small / large. Romaine lettuce, croutons, parmesan and ceasar dressing", fr: "Petite / grande. Laitue romaine, croûtons, parmesan et vinaigrette" },
        price: "$10.95 / $21.95",
      },
      {
        id: "insalata-italiana",
        title: { en: "Insalata Italiana", fr: "Insalata Italiana" },
        body: { en: "Small / large. Mixed exotic greens and an italian dressing", fr: "Petite / grande. Mélange de salades exotiques et vinaigrette italienne" },
        price: "$10.45 / $20.95",
      },
      {
        id: "insalata-alessandro",
        title: { en: "Insalata Alessandro", fr: "Insalata Alessandro" },
        body: { en: "Small / large. Mixed exotic greens, romaine lettuce, tomatoes, cucumbers, avocado, red grapes, feta, oranges and italian dressing", fr: "Petite / grande. Mélange de salade exotiques, laitue romaine, tomates, concombres, avocats, raisins rouges, feta, oranges et vinaigrette italienne" },
        price: "$18.25 / $23.95",
      },
      {
        id: "insalata-mediterranea",
        title: { en: "Insalata Mediterranea", fr: "Insalata Mediterranea" },
        body: { en: "Small / large. Cherry tomatoes, feta cheese, mixed peppers, red onion, black olives, meditterranean dressing and oregano", fr: "Petite / grande. Tomates cerise, fromage feta, mélange de poivrons, oignons rouges, olives noire, vinaigrette mediterranean et origan" },
        price: "$18.95 / $23.95",
      },
      {
        id: "trio-insalata-di-frutti-di-mare",
        title: { en: "Trio Insalata di Frutti di Mare", fr: "Trio Insalata di Frutti di Mare" },
        body: { en: "Exotic greens with a blend of mixed seafood {crispy calamari, shrimps and crab in a creamy calypso sauce and Atlantic smoked salmon) garnished with cucumbers, endives and our Italian vinaigrette", fr: "Verdures exotiques, recouverte d' une mélange au fruit de mer {calamars frits, crevettes et crabe dans une sauce crémeuse calypso et saumon fumé de l' Atlantique}, garnies avec des câpres, oignions rouges, concombres, endives et notre vinaigrette italienne" },
        price: "$28.95",
      },
      {
        id: "insalata-caprese-di-burrata",
        title: { en: "Insalata Caprese Di Burrata", fr: "Insalata Caprese Di Burrata" },
        body: { en: "Fresh tomatoes, burrata, arugula, red onions, prosciutto, black olives, extra virgin olive oil and balsamic.", fr: "Tomates fraiches, burrata, roquettes, oignons rouges, prosciutto, olives noires, huile d'olive extra vierge et vinaigrette balsamique." },
        price: "$23.75",
      },
      {
        id: "insalata-siciliana",
        title: { en: "Insalata Siciliana", fr: "Insalata Siciliana" },
        body: { en: "Fresh tomatoes, arugula, red onions, balsamic, extra virgin olive oil, goat cheese.", fr: "Tomates fraiches, roquettes, oignons rouges, vinaigre balsamique, huile d'olive extra vierge, garnis de fromage de chèvre." },
        price: "$16.25",
      },
      {
        id: "ajouter-poulet-rotis-au-four",
        title: { en: "* add grilled chicken", fr: "*ajouter poulet rôtis au four" },
        price: "$7.45",
      },
    ],
  },
  {
    id: "pollo",
    title: { en: "Chicken & veal", fr: "Pollo / Vitello" },
    items: [
      {
        id: "veau-parmegan",
        title: { en: "Vitello Parmigiano", fr: "Veau Parmegan" },
        body: { en: "Breaded veal with tomato sauce and mozzarella cheese, with penne arrabiata or spaghetti napolitana", fr: "Veau pané avec sauce tomates et fromage mozzarella, avec penne arrabiata ou spaghetti napolitana" },
        price: "$31.95",
      },
      {
        id: "veau-marsala-pollo-marsala",
        title: { en: "Vitello Marsala / Pollo Marsala", fr: "Veau Marsala / Pollo Marsala" },
        body: { en: "Veal / chicken. Veal sautéed in marsala wine, mushrooms and demi-glace, with penne arrabiata or spaghetti napolitana", fr: "Veau / poulet. Escalopes de veau avec vin marsala et champignons, avec penne arrabiata ou spaghetti napolitana" },
        price: "$32.95 / $29.45",
      },
      {
        id: "veau-picatta-pollo-picatta",
        title: { en: "Vitello Picatta / Pollo Picatta", fr: "Veau Picatta / Pollo Picatta" },
        body: { en: "Veal / chicken. Veal sautéed in butter, lemon and white wine, with penne arrabiata or spaghetti napolitana", fr: "Veau / poulet. Escalopes de veau avec citron, avec penne arrabiata ou spaghetti napolitana" },
        price: "$32.95 / $29.95",
      },
      {
        id: "veau-tutto-italia",
        title: { en: "Vitello Tutto Italia", fr: "Veau Tutto Italia" },
        body: { en: "Veal sautéed in extra virgin olive oil, sundried tomatoes, roasted bell peppers, garlic, porcni mushrooms demi-glace and marsala wine with penne arrabiata or spaghetti napolitana", fr: "Escalopes de veau avec tomates séchées, poivrons rouges, champignons porcini, ail, demi-glace et vin Marsala avec penne arrabiata ou spaghetti napolitana" },
        price: "$32.95",
      },
      {
        id: "poulet-parmegan",
        title: { en: "Pollo Parmigiano", fr: "Poulet Parmegan" },
        body: { en: "Breaded chicken filet, tomato sauce, with mozzarella cheese with penne arrabiata or spaghetti napolitana", fr: "Poulet pané avec sauce tomates et fromage mozzarella, avec penne arrabiata ou spaghetti napolitana" },
        price: "$30.95",
      },
    ],
  },
  {
    id: "pizza",
    title: { en: "Pizza", fr: "Pizza" },
    items: [
      {
        id: "pizza-paesana",
        title: { en: "Pizza Paesana", fr: "Pizza Paesana" },
        body: { en: "Tomato sauce, sundried tomatoes, portobello mushrooms, mozzarella and goat cheese", fr: "Sauce tomate, tomates séchées, champignons portobello, mozzarella et fromage de chévre" },
        price: "$22.45",
      },
      {
        id: "pizza-bella",
        title: { en: "Pizza Bella", fr: "Pizza Bella" },
        body: { en: "Tomato sauce, grilled eggplant, grilled zucchini, wild mushrooms, brie and mozzarella cheese", fr: "Sauce tomate, aubergine, courgettes, champignons sauvage, fromage brie et mozzarella" },
        price: "$23.75",
      },
      {
        id: "pizza-napolitana",
        title: { en: "Pizza Napolitana", fr: "Pizza Napolitana" },
        body: { en: "Tomato sauce, basil, oregano, mozzarella cheese", fr: "Sauce tomate, basilic, origan et mozzarella" },
        price: "$21.95",
      },
      {
        id: "pizza-carbonara",
        title: { en: "Pizza Carbonara", fr: "Pizza Carbonara" },
        body: { en: "Tomato sauce, italian sausage, bacon, onions and mozzarella cheese", fr: "Sauce tomate, saucisses italiennes, bacon, oignons rouges et fromage mozzarella" },
        price: "$23.95",
      },
      {
        id: "pizza-giardino",
        title: { en: "Pizza Giardino", fr: "Pizza Giardino" },
        body: { en: "Tomato sauce, fresh spring vegetables, fresh basial and mozzarella cheese", fr: "Sauce tomate, légumes de la saison, basilic, origan et fromage mozzarella" },
        price: "$24.45",
      },
      {
        id: "pizza-americana",
        title: { en: "Pizza Americana", fr: "Pizza Americana" },
        body: { en: "Tomato sauce, pepperoni, mushrooms, peppers and mozzarella cheese", fr: "Sauce tomate, pepperoni, champignons, poivrons assortis et fromage mozzarella" },
        price: "$24.45",
      },
      {
        id: "pizza-amorosa",
        title: { en: "Pizza Amorosa", fr: "Pizza Amorosa" },
        body: { en: "Tomato sauce, roasted red peppers, mushrooms, spinach, gorgonzola, parmesan and mozzarella cheese", fr: "Sauce tomate, poivrons rouges, champignons, épinards, fromage gorgonzola, parmesan et mozzarella" },
        price: "$24.75",
      },
      {
        id: "pizza-pollo-meditarraneo",
        title: { en: "Pizza Pollo Meditarraneo", fr: "Pizza Pollo Meditarraneo" },
        body: { en: "Tomato sauce, grilled chicken, mushrooms, feta cheese, Kalamata olives, red onions, roasted red peppers and mozarella cheese", fr: "Sauce tomate, poulet grillé, champignons, fromage feta, olives noire, oignons rouges, poivrons rouge grillés et fromage mozzarella" },
        price: "$25.95",
      },
    ],
  },
  {
    id: "griglia",
    title: { en: "From the grill", fr: "Griglia" },
    items: [
      {
        id: "pollo-calabrese",
        title: { en: "Pollo Calabrese", fr: "Pollo Calabrese" },
        body: { en: "Charcoal broiled chicken filet, topped with grilled vegetables, goat cheese and rosemary potatoes", fr: "Filet de poitrines grillés avec légumes grillées, fromage de chévre et pommes de terres romarin" },
        price: "$29.45",
      },
      {
        id: "bistecca-surlonge-alla-griglia",
        title: { en: "Sirloin Steak", fr: "Bistecca Surlonge alla Griglia" },
        body: { en: "Canadian AAA sirloin steak perfectly aged and cooked to perfection, seasoned with Scarolie's steak spice, peppercorn sauce, served with rosemary potatoes and grilled vegetables.", fr: "Surlonge (Canadien AAA) parfaitement vieillie et cuite a la perfection, assaisonnées avec épices de bifteck Scarolie's, accompagnée d'une sauce au poivre." },
        price: "$44.95",
      },
      {
        id: "bistecca-di-rib",
        title: { en: "Rib Steak", fr: "Bistecca di Rib" },
        body: { en: "Perfectly aged rib steak (Canadian AAA) cooked to perfection, seasoned with Scarolie's steak spice, served with rosemary potatos and vegetables", fr: "Entrecote (Canadian AAA) parfaitement vieilli et grillé a la perfection, assaisonnées avec épices de bifteck Scarolie's." },
        price: "$49.95",
      },
      {
        id: "carre-d-agneau",
        title: { en: "Rack of Lamb", fr: "Carré d'agneau" },
        body: { en: "Charcoal broiled rack of lamb grilled to your choice {black rum, 5-spice and demi-glace}, served with rosemary potatoes and grilled vegetables", fr: "Carré d'Agneau enrobé avec nos épices maison, grillé à la perfection et servi avec une sauce au { rhum noir, 5 épices et demi-glace }, servi avec pommes de terres romarin et légumes grillées" },
        price: "$48.95",
      },
    ],
  },
  {
    id: "zuppe",
    title: { en: "Soup", fr: "Zuppe" },
    items: [
      {
        id: "soupe-du-jour",
        title: { en: "Soup of the day", fr: "Soupe du jour" },
        price: "$6.25",
      },
      {
        id: "minestrone",
        title: { en: "Minestrone", fr: "Minestrone" },
        price: "$6.75",
      },
    ],
  },
  {
    id: "pesce",
    title: { en: "Fish", fr: "Pesce" },
    items: [
      {
        id: "filet-de-saumon",
        title: { en: "Salmone del Atlantico", fr: "Filet de Saumon" },
        body: { en: "Grilled salmon, with butter and fresh dill, sautéed spinach, served on a bed of white rice", fr: "Filet de saumon de l'Atlantique grillés avec beurre et aneth frais, épinards sautées et riz blanc" },
        price: "$30.95",
      },
      {
        id: "saumon-et-crevettes-style-langoustines",
        title: { en: "Fresh Salmon and Scampi Shrimp", fr: "Saumon et Crevettes Style Langoustines" },
        body: { en: "Fresh Atlantic salmon filet grilled to perfection and jumbo butterflied shrimp lightly seasoned then oven roasted. Served with white rice.", fr: "Filet de saumon de l'atlantique grillé, mariné dans huile d'olive, ail, citron et herbes fraiches. Servi avec 3 crevettes géantes style papillon légèrement assaisonées et rotis au four avec du beurre a l'ail, riz blanc et légumes grillées." },
        price: "$37.95",
      },
      {
        id: "crevettes-alla-griglia",
        title: { en: "Gamberi alla Griglia", fr: "Crevettes alla Griglia" },
        body: { en: "Jumbo shrimps grilled and marinated, served with white rice and charcoal grilled vegetables", fr: "Crevettes géantes marinées et grillées, servi avec riz blanc et légumes grillés au charbon" },
        price: "$31.95",
      },
      {
        id: "crevettes-style-langoustines",
        title: { en: "Shrimp Scampi Style", fr: "Crevettes Style Langoustines" },
        body: { en: "Jumbo butterflied shrimp (papillon style) lightly seasoned and then oven roasted with garlic butter placed on a bed of white rice & grilled vegetables. Served with garlic butter.", fr: "Crevettes géantes style papillon légèrement assaisonées et rotis au four avec du beurre a l'ail presenté sur un lit de riz blanc avec légumes grillées. Servi avec du beurre a l'ail." },
        price: "$35.95",
      },
    ],
  },
  {
    id: "forno",
    title: { en: "Baked pasta", fr: "Pasta al forno" },
    items: [
      {
        id: "lasagna-casalinga",
        title: { en: "Lasagna Casalinga", fr: "Lasagna Casalinga" },
        body: { en: "Layers of pasta, meat sauce, ricotta and mozzarella cheese", fr: "Pâtes cuites au four avec notre sauce a la viande, fromage ricotta et fromage mozzarella" },
        price: "$25.45",
      },
      {
        id: "manicotti",
        title: { en: "Manicotti", fr: "Manicotti" },
        body: { en: "Pasta stuffed with ricotta cheese and spinach, tomato sauce and mozzarella cheese", fr: "Pâtes farcie avec fromage et épinards recouverte de sauce tomate et fromage mozzarella" },
        price: "$22.95",
      },
      {
        id: "cannelloni",
        title: { en: "Cannelloni", fr: "Cannelloni" },
        body: { en: "Minced veal stuffed in pasta, tomato sauce and mozzarella", fr: "Pâtes farcie avec veau recouverte de sauce tomate et fromage mozzarella" },
        price: "$23.95",
      },
      {
        id: "rotolo-alla-milanese",
        title: { en: "Rotolo alla Milanese", fr: "Rotolo alla Milanese" },
        body: { en: "Rolled pasta stuffed with ricotta cheese, spinach and prosciutto. Mozzarella cheese and rosé sauce.", fr: "Pates roulées farcies au fromage ricotta, epinards, prosciutto, sauce rose et mozzarella." },
        price: "$25.25",
      },
      {
        id: "portafoglio-di-cranchio-e-aragosta",
        title: { en: "Portafoglio di Cranchio e Aragosta", fr: "Portafoglio di Cranchio e Aragosta" },
        body: { en: "Portafoglio pasta stuffed with crab and lobster, baked in a brandy tomato cream lobster sauce with baby shrimp, baby scallops, pink peppercorns, diced shallots and mozzarella cheese", fr: "Pâtes Portafoglio farcies avec crabe et homard , cuit au four dans une sauce au tomate à la crème brandy et homard, avec petites crevettes, petites pétoncles et poivre rose concassé, recouvert d'échalotes et fromage Mozzarella" },
        price: "$28.95",
      },
    ],
  },
  {
    id: "lunch",
    title: { en: "Lunch — soup of the day included", fr: "Menu midi — soupe du jour incluse" },
    items: [
      {
        id: "lunch-spaghetti-bolognese",
        title: { en: "Spaghetti Bolognese", fr: "Spaghetti Bolognese" },
        body: { en: "Spaghettini pasta tossed with our homemade meat sauce", fr: "Pâtes spaghetti avec notre sauce a la viande maison et 2 boulettes" },
        price: "$19.45",
      },
      {
        id: "lunch-tortellini-alla-rosa",
        title: { en: "Tortellini alla Rosa", fr: "Tortellini alla Rosa" },
        body: { en: "Tortellini stuffed with ricotta cheese sautéed in a rosé sauce with parmesan cheese", fr: "Pâtes tortellini farcies avec fromage ricotta sautées dans une sauce rosé avec fromage parmesan" },
        price: "$20.45",
      },
      {
        id: "lunch-spaghetti-cacciatore",
        title: { en: "Spaghetti Cacciatore", fr: "Spaghetti Cacciatore" },
        body: { en: "Spaghetti in a tomato sauce with sautéed chicken, garlic, grilled peppers, shallots, mushrooms, pesto, onions, fresh basil, oregano, white wine and Kalamata olives", fr: "Spaghetti avec sauce tomates, poulet, ail, poivrons grillés, échalottes, champignons, pesto, oignons, basilic frais, origan, vin blanc et olives Kalamata" },
        price: "$20.45",
      },
      {
        id: "lunch-linguini-primavera",
        title: { en: "Linguini Primavera", fr: "Linguini Primavera" },
        body: { en: "Linguini pasta in a rosé sauce with fresh seasonal vegetables, white wine and garlic", fr: "Pâtes linguini avec sauce rosé, légumes saisonniére, vin blanc et ail" },
        price: "$20.45",
      },
      {
        id: "lunch-casalinga-lasagna",
        title: { en: "Lasagna Casalinga", fr: "Casalinga Lasagna" },
        body: { en: "Layers of pasta, meat sauce, ricotta and mozzarella cheese", fr: "Pâtes cuites au four avec notre sauce a la viande, fromage ricotta et fromage mozzarella" },
        price: "$19.45",
      },
      {
        id: "lunch-pizza-americana",
        title: { en: "Pizza Americana", fr: "Pizza Americana" },
        body: { en: "Tomato sauce, pepperoni, mushrooms, peppers and mozzarella cheese", fr: "Sauce tomate, pepperoni, champignons, poivrons assortis et fromage mozzarella" },
        price: "$19.95",
      },
      {
        id: "lunch-insalata-di-pollo-cesar",
        title: { en: "Insalata di Pollo Cesar", fr: "Insalata di Pollo Cesar" },
        body: { en: "Romaine lettuce, croutons, parmesan and ceasar dressing", fr: "Laitue romaine, croutons, fromage parmesan et poulet grillé" },
        price: "$19.95",
      },
      {
        id: "lunch-insalata-di-pollo-italienne",
        title: { en: "Insalata di Pollo Italienne", fr: "Insalata di Pollo Italienne" },
        body: { en: "Mixed exotic greens and an italian dressing", fr: "Mélange de salades exotiques avec poulet grillé et vinaigrette italienne" },
        price: "$19.75",
      },
      {
        id: "lunch-veau-marsala",
        title: { en: "Veau Marsala", fr: "Veau Marsala" },
        body: { en: "Veal sautéed in marsala wine, mushrooms and demi-glace, with penne arrabiata or spaghetti napolitana", fr: "Escalopes de veau avec vin marsala et champignons, servi avec spaghetti napolitana" },
        price: "$24.95",
      },
      {
        id: "lunch-pollo-parmegan",
        title: { en: "Pollo Parmegan", fr: "Pollo Parmegan" },
        body: { en: "Breaded chicken filet, tomato sauce, with mozzarella cheese with penne arrabiata or spaghetti napolitana", fr: "Poitrine de poulet pané, recouverte avec sauce tomate et fromage mozzarella, servi avec spaghettini napolitana" },
        price: "$22.95",
      },
      {
        id: "lunch-pollo-alla-griglia-chipotle",
        title: { en: "Burger di Pollo alla Chipotle", fr: "Pollo alla Griglia Chipotle" },
        body: { en: "Grilled chicken breast burger with our chipotle rub, mayonnaise, mustard, pickles, red onions, and tomato", fr: "Poitrine de poulet grillé style chipotle avec zucchini, aubergine et poivrons rouges grillés, servi avec riz blanc" },
        price: "$22.95",
      },
      {
        id: "lunch-burger-alla-scarolies",
        title: { en: "Hamburger alla Scarolies", fr: "Burger alla Scarolies" },
        body: { en: "Grilled Angus beef Hamburger with our Scarolie's sauce, swiss & cheddar cheese, dijon mustard, onions & caramelized mushrooms. Served with fries.", fr: "Hamburger au boeuf Angus grillé, garnis avec notre sauce Scarolie's, fromage mozzarella, moutarde de Dijon, oignons et champignons caramélisés, servi avec frites" },
        price: "$19.45",
      },
      {
        id: "lunch-burger-di-pollo-alla-chipotle",
        title: { en: "Burger di Pollo alla Chipotle", fr: "Burger di Pollo alla Chipotle" },
        body: { en: "Grilled chicken breast burger with our chipotle rub, mayonnaise, mustard, pickles, red onions, and tomato", fr: "Burger au poitrine de poulet grillé, garnis avec chipotle, cornichons, oignons rouges, tomates, moutarde, mayonnaise et fromage mozzarella" },
        price: "$19.95",
      },
      {
        id: "lunch-saumon-atlantico",
        title: { en: "Saumon Atlantique", fr: "Saumon Atlantico" },
        body: { en: "Grilled Atlantic salmon, served with teriyaki sauce, sautéed spinach, and a bed of white rice", fr: "Filet de saumon de l'Atlantique grillés avec une sauce teryaki, épinards sautées et riz blanc" },
        price: "$25.95",
      },
      {
        id: "lunch-insalata-di-pollo-alla-alessandro",
        title: { en: "Insalata di Pollo alla Alessandro", fr: "Insalata di Pollo alla Alessandro" },
        body: { en: "Mixed exotic greens, romaine lettuce, grilled chicken breast, tomatoes, cucumbers, avocado, red grapes, feta, oranges and italian dressing", fr: "Mélange de salades exotiques, laitue romaine, poitrine de poulet grillé, tomates, concombres, avocats, raisins rouges, feta, orange et vinaigrette italienne" },
        price: "$23.95",
      },
    ],
  },
  {
    id: "family",
    title: { en: "Family plates for 4", fr: "Repas familial pour 4" },
    items: [
      {
        id: "family-1-assiette-de-lasagne",
        title: { en: "1. Lasagna Platter", fr: "1. Assiette de Lasagne" },
        body: { en: "Layers Of Pasta, Meat Sauce, Ricotta And Mozzarella Cheese", fr: "Couches de pâtes avec sauce à la viande Scarolie's, fromage ricotta et mozzarella" },
        price: "$49.95",
      },
      {
        id: "family-2-cacciatore-au-poulet-casserole",
        title: { en: "2. Chicken Cacciatore Casserole", fr: "2. Cacciatore au poulet Casserole" },
        body: { en: "Strips of chicken breast with button mushrooms, red bell peppers, Kalamata black olives, shallots, baby onions, fresh oregano, garlic, pesto and cherry tomatoes served over penne pasta.", fr: "Morceaux de poitrine de poulet avec champignons, poivrons rouges, olives noires de Kalamata, ail, oignons, orégan et échalottes, servi avec pâtes penne" },
        price: "$52.95",
      },
      {
        id: "family-3-filets-de-saumon",
        title: { en: "3. Salmon Filets", fr: "3. Filets de Saumon" },
        body: { en: "Fresh Atlantic salmon filet grilled to perfection, topped with butter and dill served with rice, fresh asparagus and our homemade marinara sauce.", fr: "Filet de saumon de l' Atlantique, grillés à la perfection, recouvert d'aneth et beurre, servi avec riz, asperges fraiches et notre sauce marinara" },
        price: "$62.95",
      },
      {
        id: "family-4-tortellini-gigi-casserole",
        title: { en: "4. Tortellini Gigi Casserole", fr: "4. Tortellini Gigi Casserole" },
        body: { en: "Tortelinni pasta in our Scarolies cream and tomato sauce with proscuitto, buttom mushrooms, white wine and shallots served with mozzarella cheese and baked in the oven.", fr: "Pâtes tortellini dans une sauce crème et tomate avec proscuitto, champignons, vin blanc et échalottes servi avec fromage mozzarella et cuit dans le four" },
        price: "$56.95",
      },
      {
        id: "family-5-penne-arosto-casserole",
        title: { en: "5. Penne Arosto Casserole", fr: "5. Penne Arosto Casserole" },
        body: { en: "Penne pasta in our Scarolie's tomato sauce with chopped Italian sausage, pesto, roasted red bell peppers, garlic, shallots and white wine served with mozzarella cheese and baked in the oven.", fr: "Pâtes penne dans une sauce aux tomates avec saucisses italiennes, pesto, poivrons rouges et ail gratinée au four." },
        price: "$54.95",
      },
      {
        id: "family-6-assiette-de-spaghetti-bolognese",
        title: { en: "6. Spaghetti Bolognese Platter", fr: "6. Assiette de spaghetti bolognese" },
        body: { en: "Spaghetti pasta served with our Scarolie's meat sauce and 8 meat balls", fr: "Pâtes spaghetti servi avec sauce à la viande Scarolie's et 8 boulettes de viande" },
        price: "$50.95",
      },
      {
        id: "family-7-assiette-pollo-callabrese",
        title: { en: "7. Pollo Callabrese Platter", fr: "7. Assiette \"Pollo Callabrese\"" },
        body: { en: "Grilled chicken breast served on a bed of rice with grilled zuchini, roasted red bell peppers and roasted eggplant.", fr: "Poitrines de poulet grillées servi sur un lit de riz avec zuchinis grillés, poivrons rouges et aubergines" },
        price: "$52.95",
      },
      {
        id: "family-8-assiette-de-grillade-mixte",
        title: { en: "8. Mixed Grill Platter", fr: "8. Assiette de Grillade mixte" },
        body: { en: "Chicken breasts, pork chops and Italian sausages grilled to perfection and served on a bed of rice with grilled zucchini, eggplant and roasted red peppers.", fr: "Poitrine de poulet, côtelettes de porcs et saucisses italiennes grillées à la perfection, servis sur un lit de riz avec courgettes grillées, poivrons rouges et aubergines." },
        price: "$62.95",
      },
      {
        id: "family-9-cotelettes-de-porcs",
        title: { en: "9. Pork Chops", fr: "9. Côtelettes de Porcs" },
        body: { en: "Pork Chops marinated with olive oil and rosemary brushed with our Southern Bar B.Q sauce, grilled to perfection served with rice and asparagus.", fr: "Côtelettes de porc marinées avec huile d'olive & romarin, brossées avec une sauce BBQ grillées à la perfection, servis avec riz et asperges." },
        price: "$51.95",
      },
      {
        id: "family-10-pollo-parmiggiano",
        title: { en: "10. Chicken Parmiggiano", fr: "10. Pollo Parmiggiano" },
        body: { en: "Breaded chicken filet, tomato sauce, baked with mozzarella. Served with spaghetti napolitana.", fr: "Poitrines de poulet panné et cuites au four, recouvertes avec sauce tomate et fromage mozzarella, servi avec spaghetti napolitana" },
        price: "$66.95",
      },
    ],
  },
  {
    id: "cocktails",
    title: { en: "$13 martinis & cocktails", fr: "Martinis et cocktails 13 $" },
    items: [
      {
        id: "raspberry-limoncello-prosecco",
        title: { en: "Raspberry Limoncello Prosecco", fr: "Raspberry Limoncello Prosecco" },
        body: { en: "Fresh raspberries, lemon, Limoncello, Prosecco and sparkling water.", fr: "Framboises fraîches, jus de citron, Limoncello, Prosecco et eau pétillante." },
        price: "$13.00",
      },
      {
        id: "summer-strawberry-fizz",
        title: { en: "Summer Strawberry Fizz", fr: "Summer Strawberry Fizz" },
        body: { en: "Strawberries, mint, sugar, vodka, lime, Prosecco and sparkling water.", fr: "Fraises, menthe, sucre, vodka, jus de limette, Prosecco et eau pétillante." },
        price: "$13.00",
      },
      {
        id: "prosecco-margarita",
        title: { en: "Prosecco Margarita", fr: "Prosecco Margarita" },
        body: { en: "Tequila, lime, triple sec, orange juice and Prosecco, salted rim.", fr: "Tequila, jus de limette, triple sec, jus d'orange et Prosecco, verre givré au sel." },
        price: "$13.00",
      },
      {
        id: "french-75",
        title: { en: "French 75", fr: "French 75" },
        body: { en: "Gin, lemon and sugar, topped with Prosecco and a lemon twist.", fr: "Gin, jus de citron et sucre, Prosecco, zeste de citron." },
        price: "$13.00",
      },
      {
        id: "prosecco-slushies",
        title: { en: "Prosecco slushies", fr: "Prosecco slushies" },
        body: { en: "Prosecco, vodka, strawberries and lime, blended with ice and mint.", fr: "Prosecco, vodka, fraises et jus de limette, glace, menthe." },
        price: "$13.00",
      },
      {
        id: "bikini-martini",
        title: { en: "Bikini Martini", fr: "Bikini Martini" },
        body: { en: "Malibu rum, vodka, pineapple, grenadine and cherries.", fr: "Rhum Malibu, vodka, jus d'ananas, grenadine et cerises." },
        price: "$13.00",
      },
      {
        id: "love-martini",
        title: { en: "Love Martini", fr: "Love Martini" },
        body: { en: "Malibu rum, peach schnapps, cranberry, strawberries.", fr: "Rhum Malibu, schnaps aux pêches, jus de canneberge, fraises." },
        price: "$13.00",
      },
      {
        id: "bigbang-martini",
        title: { en: "Bigbang Martini", fr: "Bigbang Martini" },
        body: { en: "Vodka, peach schnapps, cranberry, lime wheel.", fr: "Vodka, schnaps aux pêches, jus de canneberge, roue de limette." },
        price: "$13.00",
      },
      {
        id: "caribbean-martini",
        title: { en: "Caribbean Martini", fr: "Caribbean Martini" },
        body: { en: "Malibu rum, vodka, pineapple, grenadine, orange.", fr: "Rhum Malibu, vodka, jus d'ananas, grenadine, oranges." },
        price: "$13.00",
      },
      {
        id: "lemon-drop-martini",
        title: { en: "Lemon-drop Martini", fr: "Lemon-drop Martini" },
        body: { en: "Limoncello, vodka, triple sec, lemon, twist.", fr: "Limoncello, vodka, triple sec, jus de citron, zeste." },
        price: "$13.00",
      },
      {
        id: "malibu-mojito",
        title: { en: "Malibu Mojito", fr: "Malibu Mojito" },
        body: { en: "Malibu rum, lime, sparkling water, fresh mint.", fr: "Rhum Malibu, jus de limette, eau pétillante, menthe fraîche." },
        price: "$13.00",
      },
      {
        id: "amaretto-sour",
        title: { en: "Amaretto Sour", fr: "Amaretto Sour" },
        body: { en: "Amaretto, triple sec, lime, orange juice and cherries.", fr: "Amaretto, triple sec, jus de limette, jus d'orange et cerises." },
        price: "$13.00",
      },
      {
        id: "aperol-spritz",
        title: { en: "Aperol Spritz", fr: "Aperol Spritz" },
        body: { en: "Aperol, Prosecco, sparkling water, orange slices.", fr: "Aperol, Prosecco, eau pétillante, oranges." },
        price: "$13.00",
      },
      {
        id: "pina-colada-sangria",
        title: { en: "Pina Colada Sangria", fr: "Pina Colada Sangria" },
        body: { en: "Malibu rum, pineapple juice and house white wine.", fr: "Rhum Malibu, jus d'ananas et vin blanc maison." },
        price: "$13.00",
      },
      {
        id: "dirty-arnold-palmer",
        title: { en: "Dirty Arnold Palmer", fr: "Dirty Arnold Palmer" },
        body: { en: "White rum, iced tea, lemonade, lime and mint.", fr: "Rhum blanc, thé glacé, limonade, jus de limette, menthe." },
        price: "$13.00",
      },
    ],
  },
] as const;

export const menuCategories = menu.map((section) => ({ id: section.id, title: section.title }));

export function menuItemById(id: string) {
  for (const section of menu) {
    const found = section.items.find((item) => item.id === id);
    if (found) return found;
  }
  return undefined;
}

export const housePickIds = [
  'carre-d-agneau',
  'calamari-fritti',
  'saumon-et-crevettes-style-langoustines',
  'spaghetti-cacciatore',
  'linguini-con-gamberetti-alla-brandy-rosa',
  'rotolo-alla-milanese',
  'lasagna-casalinga',
  'bistecca-surlonge-alla-griglia',
  'pollo-calabrese',
  'capelli-di-angelo-alla-diablo',
  'insalata-caprese-di-burrata',
  'pizza-americana',
] as const;

export const housePicks = housePickIds
  .map((id) => menuItemById(id))
  .filter((item): item is NonNullable<typeof item> => Boolean(item));
