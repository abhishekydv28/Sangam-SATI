export interface FestEvent {
  id: string;
  festival: 'technovision' | 'samrat-utsav' | 'sports';
  title: string;
  category: 
    | 'Paper Presentation' 
    | 'Robotics & Challenge' 
    | 'Coding & Tech' 
    | 'Exhibition & Poster' 
    | 'Startup & Innovation' 
    | 'Ceremony' 
    | 'Cultural (Suggested)' 
    | 'Sports Academic';
  dateLabel: string;
  dateIso: string; // YYYY-MM-DD
  dayLabel: 'Day 1' | 'Day 2' | 'Academic Calendar' | 'TBA';
  timeSlot: string;
  venue: string;
  department: string;
  coordinators: string[];
  status: 'past' | 'tba' | 'confirmed';
  isTba: boolean;
  description: string;
  rules?: string[];
  teamFormat?: 'Individual' | 'Team of 2-4' | 'Individual or Team' | 'Open';
  clubOrHost?: string;
}

export interface SportsActivity {
  id: string;
  sport: string;
  dates: string;
  category: 'Outdoor Tournament' | 'Traditional Sport' | 'Track & Field' | 'Cricket League';
  venue: string;
  isTba: boolean;
  detailsStatus: 'Confirmed Date' | 'Dates TBA' | 'Venue Confirmed';
  description: string;
}

export const FESTIVAL_DETAILS = {
  technovision: {
    name: 'TECHNOVISION 2026',
    edition: 'Annual National Technical Symposium',
    institute: 'Samrat Ashok Technological Institute (SATI), Vidisha',
    dates: '2–3 November 2026',
    category: 'Technical Festival',
    duration: '2 Days',
    theme: 'Futuristic Technology, Innovation, Coding and Robotics',
    statusTag: 'Past Event',
    heroImage: '/src/assets/images/technovision_robotics_1793689164420.jpg',
    summary: 'Central India’s premier technical congregation uniting innovators, programmers, researchers, and robotics enthusiasts across engineering disciplines at SATI Vidisha.'
  },
  samratUtsav: {
    name: 'SAMRAT UTSAV 2027',
    edition: 'Annual Socio-Cultural Extravaganza',
    institute: 'Samrat Ashok Technological Institute (SATI), Vidisha',
    dates: '18–19 February 2027',
    targetDateIso: '2027-02-18T09:00:00+05:30',
    category: 'Cultural Festival',
    duration: '2 Days',
    venue: 'SATI Main Campus, Vidisha (Specific venues TBA)',
    theme: 'Indian Heritage Meets Contemporary Campus Culture',
    statusTag: 'Upcoming Celebration',
    heroImage: '/src/assets/images/samrat_utsav_cultural_1793689164067.jpg',
    summary: 'A vibrant celebration of theatrical mastery, rhythm, classical traditions, visual arts, and modern student expression on the historic soil of Vidisha.'
  },
  sportsCalendar: {
    name: 'Sports Activity Calendar 2027',
    institute: 'Samrat Ashok Technological Institute (SATI), Vidisha',
    period: 'January – February 2027',
    category: 'Department of Physical Education & Sports',
    heroImage: '/src/assets/images/sati_sports_ground_1793689164967.jpg',
    disclaimer: 'Supplied for the SATI academic calendar. These dates must not automatically be treated as confirmed Samrat Utsav competitions.'
  }
};

export const TECHNOVISION_EVENTS: FestEvent[] = [
  // Day 1: Monday, 2 November 2026
  {
    id: 'tv-reg-day1',
    festival: 'technovision',
    title: 'Registration & Welcome Kit Desk',
    category: 'Ceremony',
    dateLabel: 'Monday, 2 November 2026',
    dateIso: '2026-11-02',
    dayLabel: 'Day 1',
    timeSlot: '10:00 AM – 11:00 AM',
    venue: 'Porch Entrance, Main Academic Block',
    department: 'General / All Branches',
    coordinators: ['Technovision Student Volunteer Desk', 'Registration Committee'],
    status: 'past',
    isTba: false,
    description: 'On-spot participant verification, distribution of delegate passes, event schedules, and welcome kits for registered delegates.',
    teamFormat: 'Individual'
  },
  {
    id: 'tv-inaugural',
    festival: 'technovision',
    title: 'Inaugural Function & Keynote Address',
    category: 'Ceremony',
    dateLabel: 'Monday, 2 November 2026',
    dateIso: '2026-11-02',
    dayLabel: 'Day 1',
    timeSlot: '11:00 AM – 11:45 AM',
    venue: 'Smart Classroom, Main Building',
    department: 'Institute Level',
    coordinators: ['Technovision-2026 Organizing Committee'],
    status: 'past',
    isTba: false,
    description: 'Traditional lamp lighting ceremony, address by Director SATI, Dean Academics, and invited distinguished industry keynote speakers.',
    teamFormat: 'Open'
  },
  {
    id: 'tv-paper-cse-it',
    festival: 'technovision',
    title: 'Paper Presentation — CSE, CSE (BC), MCA and IT',
    category: 'Paper Presentation',
    dateLabel: 'Monday, 2 November 2026',
    dateIso: '2026-11-02',
    dayLabel: 'Day 1',
    timeSlot: '12:00 PM – 1:30 PM',
    venue: 'Computer Center / Classroom',
    department: 'CSE, CSE (BC), MCA & IT',
    coordinators: ['Technical Committee — CSE, CSE (BC), MCA & IT'],
    status: 'past',
    isTba: false,
    description: 'Scholarly presentations showcasing novel research in distributed computing, cloud architectures, blockchain consensus, and algorithmic optimization.',
    rules: [
      'Maximum 8 minutes for presentation followed by 2 minutes Q&A by jury.',
      'IEEE 2-column paper format submission mandatory.',
      'Both original research papers and review papers accepted.'
    ],
    teamFormat: 'Individual or Team'
  },
  {
    id: 'tv-paper-emerging',
    festival: 'technovision',
    title: 'Paper Presentation — Cyber Security, IoT, AIADS and AIML',
    category: 'Paper Presentation',
    dateLabel: 'Monday, 2 November 2026',
    dateIso: '2026-11-02',
    dayLabel: 'Day 1',
    timeSlot: '12:00 PM – 1:30 PM',
    venue: 'Computer Center / Classroom',
    department: 'Cyber Security, IoT, AIADS & AIML',
    coordinators: ['Technical Committee — Cyber Security, IoT, AIADS & AIML'],
    status: 'past',
    isTba: false,
    description: 'High-impact technical tracks evaluating applied neural networks, autonomous IoT edge computing, ethical hacking, and threat mitigation models.',
    rules: [
      'Presentation deck should include problem statement, model design, and experimental benchmarks.',
      'Live code demo or simulation carries bonus marks in evaluation.',
      '8 minutes presentation + 2 minutes peer/jury discussion.'
    ],
    teamFormat: 'Individual or Team'
  },
  {
    id: 'tv-paper-civil',
    festival: 'technovision',
    title: 'Paper Presentation — Civil Engineering',
    category: 'Paper Presentation',
    dateLabel: 'Monday, 2 November 2026',
    dateIso: '2026-11-02',
    dayLabel: 'Day 1',
    timeSlot: '12:00 PM – 1:30 PM',
    venue: 'Computer Center / Classroom',
    department: 'Civil Engineering',
    coordinators: ['Technical Committee — Civil Engineering'],
    status: 'past',
    isTba: false,
    description: 'Presentations on sustainable infrastructure, geo-technical breakthroughs, smart materials, seismic resistant structural analysis, and GIS modeling.',
    rules: [
      'PPT slides must emphasize sustainability metrics and methodology.',
      'Paper must be original work with plagiarism under 15%.'
    ],
    teamFormat: 'Individual or Team'
  },
  {
    id: 'tv-break-day1',
    festival: 'technovision',
    title: 'Session Break & Networking Lunch',
    category: 'Ceremony',
    dateLabel: 'Monday, 2 November 2026',
    dateIso: '2026-11-02',
    dayLabel: 'Day 1',
    timeSlot: '1:30 PM – 2:30 PM',
    venue: 'Campus Canteen / Central Lawn',
    department: 'All Delegates',
    coordinators: ['Hospitality Team'],
    status: 'past',
    isTba: false,
    description: 'Intermission for delegates, faculty evaluation committee, and student researchers to refresh and network.',
    teamFormat: 'Open'
  },
  {
    id: 'tv-paper-ec-ei',
    festival: 'technovision',
    title: 'Paper Presentation — EC and EI',
    category: 'Paper Presentation',
    dateLabel: 'Monday, 2 November 2026',
    dateIso: '2026-11-02',
    dayLabel: 'Day 1',
    timeSlot: '2:30 PM – 3:30 PM',
    venue: 'Computer Center / Classroom',
    department: 'Electronics & Instrumentation (EC & EI)',
    coordinators: ['Technical Committee — Electronics Engineering'],
    status: 'past',
    isTba: false,
    description: 'Focusing on VLSI architectures, signal processing algorithms, industrial sensor networks, and optical communication paradigms.',
    rules: [
      'Hardware diagrams or schematic simulations must be clearly documented.',
      'Strict adherence to the 8-minute presentation window.'
    ],
    teamFormat: 'Individual or Team'
  },
  {
    id: 'tv-paper-me-ee',
    festival: 'technovision',
    title: 'Paper Presentation — ME and EE',
    category: 'Paper Presentation',
    dateLabel: 'Monday, 2 November 2026',
    dateIso: '2026-11-02',
    dayLabel: 'Day 1',
    timeSlot: '2:30 PM – 3:30 PM',
    venue: 'Computer Center / Classroom',
    department: 'Mechanical & Electrical Engineering (ME & EE)',
    coordinators: ['Technical Committee — Electrical and Mechanical Engineering'],
    status: 'past',
    isTba: false,
    description: 'Presentations spanning green energy grids, electric vehicle powertrains, thermal simulations, and robotic kinematics.',
    rules: [
      'Simulation parameters must cite authentic standard benchmark data.',
      'Judge evaluation rubric evaluates innovation, industrial feasibility, and presentation delivery.'
    ],
    teamFormat: 'Individual or Team'
  },
  {
    id: 'tv-paper-mba-msc',
    festival: 'technovision',
    title: 'Paper Presentation — MBA and M.Sc.',
    category: 'Paper Presentation',
    dateLabel: 'Monday, 2 November 2026',
    dateIso: '2026-11-02',
    dayLabel: 'Day 1',
    timeSlot: '3:30 PM – 4:30 PM',
    venue: 'Computer Center / Classroom',
    department: 'MBA & Applied Sciences (M.Sc.)',
    coordinators: ['Technical Committee — MBA and M.Sc.'],
    status: 'past',
    isTba: false,
    description: 'Strategic case analyses, tech entrepreneurship frameworks, supply chain optimization, and applied scientific computational models.',
    rules: [
      'Case study methodology or statistical empirical analysis required.',
      '7 minutes presentation + 3 minutes defense.'
    ],
    teamFormat: 'Individual or Team'
  },
  {
    id: 'tv-poster',
    festival: 'technovision',
    title: 'Poster Presentation Showcase',
    category: 'Exhibition & Poster',
    dateLabel: 'Monday, 2 November 2026',
    dateIso: '2026-11-02',
    dayLabel: 'Day 1',
    timeSlot: '12:00 PM – 5:00 PM',
    venue: '2nd Floor, Right Wing Academic Corridor',
    department: 'Multi-Disciplinary Engineering & Applied Sciences',
    coordinators: [
      'Dr. Veena Datar',
      'Dr. R.K. Pathak',
      'Prof. Abhilasha Saxena',
      'Prof. Adis Dwivedi',
      'Prof. Deepika Sharma'
    ],
    status: 'past',
    isTba: false,
    description: 'Interactive visual research gallery displaying cutting-edge infographics, engineering solutions, and green technology prototypes to visiting evaluators.',
    rules: [
      'Poster dimensions standard A0 or 3x4 feet mounted on provided boards.',
      'At least one author must remain stationed at the poster during jury rounds.'
    ],
    teamFormat: 'Individual or Team'
  },
  {
    id: 'tv-model',
    festival: 'technovision',
    title: 'Model Presentation — Showcase Robotics',
    category: 'Exhibition & Poster',
    dateLabel: 'Monday, 2 November 2026',
    dateIso: '2026-11-02',
    dayLabel: 'Day 1',
    timeSlot: '12:00 PM – 5:00 PM',
    venue: 'Classroom / Exhibition Hall',
    department: 'Inter-Disciplinary & Robotics',
    coordinators: [
      'Prof. Kamlesh Sharma',
      'Prof. Niraj Kumar'
    ],
    status: 'past',
    isTba: false,
    description: 'Working physical prototypes, custom electronic hardware, IoT hardware setups, and automated robotics demonstrations built by student engineers.',
    rules: [
      'Working physical demonstration is required (pure simulation models placed in paper category).',
      'Safe electrical power supply rules apply; no hazardous combustibles.'
    ],
    teamFormat: 'Team of 2-4'
  },
  {
    id: 'tv-boat-robo',
    festival: 'technovision',
    title: 'Boat Racing / Robo Obstacle Challenge',
    category: 'Robotics & Challenge',
    dateLabel: 'Monday, 2 November 2026',
    dateIso: '2026-11-02',
    dayLabel: 'Day 1',
    timeSlot: '2:30 PM – 5:30 PM',
    venue: 'Open Area, Main Building',
    department: 'Robotics / All Engineering Branches',
    clubOrHost: 'Flux Club',
    coordinators: [
      'Prof. K.G. Kirar',
      'Prof. Niraj Kumar',
      'Prof. Kamlesh Sharma'
    ],
    status: 'past',
    isTba: false,
    description: 'High-adrenaline obstacle course featuring wired and wireless remote-controlled robots navigating steep terrains, ramps, chicanes, and water channels.',
    rules: [
      'Bot specifications: Max weight 5kg, voltage limit 24V DC.',
      'Time penalty for touching track boundaries or obstacle dislodgement.',
      'Flux Club official timing gates determine fastest valid trial.'
    ],
    teamFormat: 'Team of 2-4'
  },

  // Day 2: Tuesday, 3 November 2026
  {
    id: 'tv-coding',
    festival: 'technovision',
    title: 'Coding Challenge — CODE CRACK',
    category: 'Coding & Tech',
    dateLabel: 'Tuesday, 3 November 2026',
    dateIso: '2026-11-03',
    dayLabel: 'Day 2',
    timeSlot: '10:30 AM onward',
    venue: 'Computer Center / Classroom Labs',
    department: 'Computer Science, IT & All Branches',
    clubOrHost: 'Coding Club',
    coordinators: [
      'Prof. Satish Pawar',
      'Prof. Mukesh Azad',
      'Prof. Garima Jain',
      'Prof. Ankur Mishra'
    ],
    status: 'past',
    isTba: false,
    description: 'Competitive programming sprint testing algorithmic mastery, computational thinking, data structure optimization, and rapid debugging.',
    rules: [
      'Languages supported: C, C++, Java, Python.',
      'Plagiarism checks and locked IDE environment enforced.',
      'Points allocated based on test cases passed and execution runtime.'
    ],
    teamFormat: 'Individual'
  },
  {
    id: 'tv-roborumble',
    festival: 'technovision',
    title: 'Robo Rumble — Combat Arena',
    category: 'Robotics & Challenge',
    dateLabel: 'Tuesday, 3 November 2026',
    dateIso: '2026-11-03',
    dayLabel: 'Day 2',
    timeSlot: '10:30 AM onward',
    venue: 'Open Area, Main Building',
    department: 'Robotics / Inter-Branch',
    clubOrHost: 'Flux Club',
    coordinators: [
      'Prof. K.G. Kirar',
      'Prof. Niraj Kumar'
    ],
    status: 'past',
    isTba: false,
    description: 'Fierce head-to-head robot wrestling and pushing championship inside the reinforced Flux Club arena cage.',
    rules: [
      'Wedge, lifter, and pusher robots allowed under 8kg weight class.',
      'Matches consist of two 3-minute rounds; immobilization rules apply.'
    ],
    teamFormat: 'Team of 2-4'
  },
  {
    id: 'tv-startup',
    festival: 'technovision',
    title: 'Startup / Idea Generation Pitch',
    category: 'Startup & Innovation',
    dateLabel: 'Tuesday, 3 November 2026',
    dateIso: '2026-11-03',
    dayLabel: 'Day 2',
    timeSlot: '10:30 AM onward',
    venue: 'Startup Lab / Classroom',
    department: 'Innovation & Entrepreneurship Cell',
    coordinators: [
      'Dr. Divya Rashi Sahu',
      'Prof. Jyoti Sonkar'
    ],
    status: 'past',
    isTba: false,
    description: 'Budding student founders pitch viable business models, social impact initiatives, and patent-worthy intellectual property to angel investors & mentors.',
    rules: [
      'Pitch deck must cover Problem, Solution, Market Size, Revenue Model, and Team.',
      '5 minutes deck pitch + 5 minutes investor jury questioning.'
    ],
    teamFormat: 'Individual or Team'
  },
  {
    id: 'tv-valedictory',
    festival: 'technovision',
    title: 'Valedictory Function & Prize Distribution',
    category: 'Ceremony',
    dateLabel: 'Tuesday, 3 November 2026',
    dateIso: '2026-11-03',
    dayLabel: 'Day 2',
    timeSlot: '3:30 PM onward',
    venue: 'Smart Classroom, Main Building',
    department: 'Institute Level',
    coordinators: ['Technovision-2026 Organizing Committee'],
    status: 'past',
    isTba: false,
    description: 'Grand closing ceremony, release of Technovision 2026 symposium proceedings, announcement of category winners, and cash trophy distribution.',
    teamFormat: 'Open'
  }
];

export const SAMRAT_UTSAV_CATEGORIES = [
  {
    id: 'music',
    name: 'Music & Vocals',
    tag: 'Suggested Category',
    description: 'Classical, semi-classical, Western solo, battle of bands, and choral harmonies.',
    status: 'Competitions & Timings TBA'
  },
  {
    id: 'dance',
    name: 'Dance & Choreography',
    tag: 'Suggested Category',
    description: 'Traditional folk routines, classical Bharatnatyam/Kathak, Western hip-hop, and group street dance.',
    status: 'Competitions & Timings TBA'
  },
  {
    id: 'drama',
    name: 'Drama & Theatre',
    tag: 'Suggested Category',
    description: 'Nukkad Natak (street plays), stage dramatics, mono-acting, and theatrical skits.',
    status: 'Competitions & Timings TBA'
  },
  {
    id: 'art',
    name: 'Fine Arts & Installations',
    tag: 'Suggested Category',
    description: 'Rangoli, live painting, digital illustration, clay modeling, and campus installations.',
    status: 'Competitions & Timings TBA'
  },
  {
    id: 'literary',
    name: 'Literary & Oratory',
    tag: 'Suggested Category',
    description: 'Parliamentary debate, Hindi/English poetry slam (Kavyanjali), quiz challenges, and creative writing.',
    status: 'Competitions & Timings TBA'
  },
  {
    id: 'media',
    name: 'Media & Photography',
    tag: 'Suggested Category',
    description: 'Campus photo-walks, short film festival, reel making, and documentary storytelling.',
    status: 'Competitions & Timings TBA'
  }
];

export const SAMRAT_UTSAV_TEASER_EVENTS: FestEvent[] = [
  {
    id: 'su-opening',
    festival: 'samrat-utsav',
    title: 'Samrat Utsav Grand Opening & Heritage Procession',
    category: 'Cultural (Suggested)',
    dateLabel: 'Thursday, 18 February 2027',
    dateIso: '2027-02-18',
    dayLabel: 'Day 1',
    timeSlot: 'Timings TBA by Student Affairs',
    venue: 'SATI Campus Central Amphitheatre (Exact Venue TBA)',
    department: 'Cultural Council',
    coordinators: ['To Be Announced by Cultural Organizing Committee'],
    status: 'tba',
    isTba: true,
    description: 'Inaugural cultural celebration, traditional welcome rituals, and official ceremonial flag hoisting for Samrat Utsav 2027.',
    teamFormat: 'Open'
  },
  {
    id: 'su-dance-showcase',
    festival: 'samrat-utsav',
    title: 'Nrityanjali — Classical & Folk Dance Showcase',
    category: 'Cultural (Suggested)',
    dateLabel: 'Thursday, 18 February 2027',
    dateIso: '2027-02-18',
    dayLabel: 'Day 1',
    timeSlot: 'Performance Timings TBA',
    venue: 'SATI Auditorium / Open Stage (Venue TBA)',
    department: 'Dance Society',
    coordinators: ['To Be Announced by Cultural Organizing Committee'],
    status: 'tba',
    isTba: true,
    description: 'Suggested cultural stage performance showcasing traditional Indian folk forms and contemporary choreography.',
    teamFormat: 'Individual or Team'
  },
  {
    id: 'su-battle-bands',
    festival: 'samrat-utsav',
    title: 'Symphony — Battle of Campus Bands',
    category: 'Cultural (Suggested)',
    dateLabel: 'Thursday, 18 February 2027',
    dateIso: '2027-02-18',
    dayLabel: 'Day 1',
    timeSlot: 'Evening Slot (Exact Timings TBA)',
    venue: 'Main Campus Stage (Venue TBA)',
    department: 'Music Club',
    coordinators: ['To Be Announced by Cultural Organizing Committee'],
    status: 'tba',
    isTba: true,
    description: 'Live musical showdown featuring acoustic, rock, fusion, and indie bands across collegiate circuits.',
    teamFormat: 'Team of 2-4'
  },
  {
    id: 'su-nukkad',
    festival: 'samrat-utsav',
    title: 'Rangmanch — Nukkad Natak (Street Play)',
    category: 'Cultural (Suggested)',
    dateLabel: 'Friday, 19 February 2027',
    dateIso: '2027-02-19',
    dayLabel: 'Day 2',
    timeSlot: 'Afternoon Slot (Timings TBA)',
    venue: 'Central Quadrangle (Venue TBA)',
    department: 'Dramatic Society',
    coordinators: ['To Be Announced by Cultural Organizing Committee'],
    status: 'tba',
    isTba: true,
    description: 'Socially poignant street theatre performances addressing environmental responsibility, youth empowerment, and ethical values.',
    teamFormat: 'Team of 2-4'
  },
  {
    id: 'su-star-night',
    festival: 'samrat-utsav',
    title: 'Star Night & Valedictory Cultural Gala',
    category: 'Cultural (Suggested)',
    dateLabel: 'Friday, 19 February 2027',
    dateIso: '2027-02-19',
    dayLabel: 'Day 2',
    timeSlot: 'Night (Timings TBA)',
    venue: 'Main Festival Grounds (Venue TBA)',
    department: 'Institute Cultural Committee',
    coordinators: ['To Be Announced by Cultural Organizing Committee'],
    status: 'tba',
    isTba: true,
    description: 'Grand finale featuring invited performing artists, award distribution for inter-college cultural events, and collective celebration.',
    teamFormat: 'Open'
  }
];

export const SPORTS_ACTIVITIES: SportsActivity[] = [
  {
    id: 'sp-volleyball',
    sport: 'Volleyball Tournament',
    dates: '16–17 January 2027',
    category: 'Outdoor Tournament',
    venue: 'SATI Sports Complex / Outdoor Volleyball Court',
    isTba: false,
    detailsStatus: 'Confirmed Date',
    description: 'Inter-branch and inter-collegiate volleyball championship featuring group stages, semifinals, and trophy final.'
  },
  {
    id: 'sp-khokho',
    sport: 'Kho-Kho Matches',
    dates: '23–24 January 2027',
    category: 'Traditional Sport',
    venue: 'SATI Sports Grounds',
    isTba: false,
    detailsStatus: 'Confirmed Date',
    description: 'High-speed traditional Indian tag sport matches testing agility, tactical coordination, and team endurance.'
  },
  {
    id: 'sp-athletics',
    sport: 'Athletics Meet',
    dates: '6–7 February 2027',
    category: 'Track & Field',
    venue: 'SATI Main Athletic Track & Field Stadium',
    isTba: false,
    detailsStatus: 'Confirmed Date',
    description: 'Comprehensive track and field events including 100m sprint, 400m relay, long jump, shot put, and high jump.'
  },
  {
    id: 'sp-cricket',
    sport: 'Cricket Tournament',
    dates: 'February 2027 — Exact dates TBA',
    category: 'Cricket League',
    venue: 'SATI Cricket Pavilion (Subject to final fixtures)',
    isTba: true,
    detailsStatus: 'Dates TBA',
    description: 'Annual inter-department T-20 leather ball tournament. Fixture schedule, toss times, and pool assignments to be notified.'
  }
];

export const SATI_CAMPUS_LOCATIONS = [
  {
    name: 'Smart Classroom, Main Building',
    events: ['Inaugural Function', 'Valedictory Function'],
    landmark: '1st Floor, Administrative Block Central Corridor'
  },
  {
    name: 'Computer Center / Academic Classrooms',
    events: ['Paper Presentations (All Branches)', 'Coding Challenge — CODE CRACK'],
    landmark: 'Academic Block B, Ground & 1st Floor'
  },
  {
    name: '2nd Floor, Right Wing Corridor',
    events: ['Poster Presentation Showcase'],
    landmark: 'Main Engineering Building, Right Wing'
  },
  {
    name: 'Open Area, Main Building',
    events: ['Boat Racing & Robo Obstacle Challenge', 'Robo Rumble — Flux Club'],
    landmark: 'Central Outdoor Courtyard facing Library'
  },
  {
    name: 'Startup Lab / Incubation Room',
    events: ['Startup / Idea Generation Pitch'],
    landmark: 'Innovation Center, SATI Tech Park Wing'
  },
  {
    name: 'SATI Sports Complex & Stadium Ground',
    events: ['Volleyball', 'Kho-Kho', 'Athletics Meet', 'Cricket'],
    landmark: 'Western Campus Gate Entrance'
  }
];

export const GALLERY_ITEMS = [
  {
    id: 'g-0',
    title: 'Interstellar Landing at SATI Campus Courtyard',
    category: 'Cosmic Hub',
    imageUrl: '/assets/aistudio/UFO_flying_and_landing_313a22aa_dd605a55.mp4',
    isVideo: true,
    caption: 'Cinematic UFO landing sequence at the SATI main entrance courtyard with starry night skies.'
  },
  {
    id: 'g-1',
    title: 'Technovision Autonomous Robotics Arena',
    category: 'Technovision',
    imageUrl: '/src/assets/images/technovision_robotics_1793689164420.jpg',
    isVideo: false,
    caption: 'Student engineering teams fine-tuning bot electronics on the arena course.'
  },
  {
    id: 'g-2',
    title: 'Samrat Ashok Technological Institute Campus',
    category: 'Campus',
    imageUrl: '/src/assets/images/hero_sati_campus_1793689162957.jpg',
    isVideo: false,
    caption: 'SATI Vidisha campus alive with festive banners, pavilion stalls, and delegates.'
  },
  {
    id: 'g-3',
    title: 'Samrat Utsav Folk & Classical Dance Celebration',
    category: 'Samrat Utsav',
    imageUrl: '/src/assets/images/samrat_utsav_cultural_1793689164067.jpg',
    isVideo: false,
    caption: 'Vibrant stage lighting and rhythmic folk choreography at the annual cultural night.'
  },
  {
    id: 'g-4',
    title: 'Annual Sports Meet & Track Events',
    category: 'Sports',
    imageUrl: '/src/assets/images/sati_sports_ground_1793689164967.jpg',
    isVideo: false,
    caption: 'Athletic competitions and outdoor matches at the SATI sports stadium.'
  }
];
