// Content for the DT+C studio. Facts come from davidturkcreative.com and the Fold Party fact sheet.
const M = 'media/';
const clip = (src, label, sound = false) => ({ type: 'video', src: M + src + '.mp4', poster: M + src + '.jpg', label, sound });
const img = (src, label) => ({ type: 'image', src: M + src, label });
// a full film with sound, played through the Adobe player that davidturkcreative.com and davidturk.myportfolio.com use (ids come from those project pages)
const film = (id, label) => ({ type: 'film', id, label });

export const STUDIO = {
  name: 'DT+C',
  long: 'David Turk Creative',
  line: 'Content that moves at the speed of culture.',
  about: [
    'DT+C is David Turk Creative, a creative studio from Miami, founded by David Turk.',
    'Strategy, content, VFX and web under one roof, built to launch in weeks.',
    'The studio is AI-native: 3D pipelines, AI workflows, VFX, video generation and sound design work as one system.',
  ],
  services: ['Creative strategy', 'Research and discovery', 'AI production pipelines', 'Virtual cinematography in Unreal Engine 5', '3D animation and visualization', 'Videography and photography', 'Brand systems and messaging'],
  process: [['Discover', 'Learn the brand, the audience and the objectives.'], ['Design', 'Virtual environments, camera moves and concepts.'], ['Produce', '3D, AI workflows, VFX, video generation and sound design.'], ['Evolve', 'Use performance data to keep improving.']],
  clients: ['New Era Cap', 'Ford', 'SeaWorld', 'Miami Dolphins', 'Betterfly', 'Brugal Rum', 'Faena', "Barry's", 'Perez Art Museum Miami', 'Runway Health'],
  linkedin: 'https://www.linkedin.com/in/davidturk',
};

export const PROJECTS = [
  {
    id: 'new-era', title: 'New Era Cap', kind: 'Strategy, 3D animation, VFX',
    body: ['Four seasonal campaigns, each built as a complete 3D world, with no location shoots and no physical sets: Out of This World, Sprouted Collection, Elements and Holiday 2023.', 'For Elements, the hats were rebuilt with photogrammetry and dropped into earth, fire, air and water.'],
    media: [clip('new-era/new-era-elements', 'Elements'), clip('new-era/new-era-cosmic', 'Out of This World'), clip('new-era/new-era-sprouted', 'Sprouted'), clip('new-era/new-era-3d', 'Campaign film')],
    films: [film('As4kiA8hznE', 'Out of This World'), film('PQGxiJQ6LP7', 'Sprouted Collection'), film('KvhntQH45bM', 'Elements'), film('26uxjxDB4nN', 'Holiday 2023: on the web'), film('GJdyaYK2xtH', 'Sprouted: behind the scenes'), film('-Myo94ta7jf', 'Elements: breakdown'), film('MDkAp7Aqop9', 'Holiday 2023: Unreal Engine build')], watch: 'Watch the campaign films',
  },
  {
    id: 'seaworld', title: 'SeaWorld', kind: 'Strategy, content development',
    body: ['A deep-sea campaign built from the ground up in Unreal Engine 5: coral reefs, shipwrecks and bioluminescent zones.', 'A 30-second teaser cut like a theatrical trailer, hero key visuals, and every asset delivered wide, square and vertical. The whole campaign was produced in 30 days.'],
    media: [clip('seaworld/seaworld-hero', 'Teaser'), clip('seaworld/seaworld-reel', 'Worlds'), clip('seaworld/seaworld', 'Key visuals')],
    films: [film('2DbUfcpWWxs', 'Teaser trailer'), film('NDRF24q8Cyh', 'Worldbuilding in Unreal Engine'), film('HsD78mCvzPZ', 'Announcement page'), film('QfTHBMuFjht', 'In the news')], watch: 'Watch the teaser',
  },
  {
    id: 'betterfly', title: 'Betterfly', kind: 'VFX, fake out-of-home campaign',
    body: ['A campaign that announced a new era of benefits to HR teams around the world.', 'Banners draped over six world landmarks, all of it VFX, with no physical production. Delivered in four weeks, with a hero film, breakdown reels and social assets.'],
    media: [clip('betterfly/betterfly-fooh', 'Landmarks'), clip('betterfly/betterfly', 'Hero film')],
    films: [film('EQJMIa6UN2u', 'Campaign film'), film('JS56eQAAo9j', 'VFX breakdown 1'), film('3tyBTSsk2qd', 'VFX breakdown 2'), film('WFXwpiatrXV', 'VFX breakdown 3'), film('GdhsU2cpwGh', 'Social cut')], watch: 'Watch the campaign film',
  },
  {
    id: 'fold-party', title: 'Fold Party', kind: 'Game design, iOS app, brand',
    body: ["DT+C's own app: a party game arcade for two to four players on one phone, built around the hinge of iPhone Duo.", 'Every fold has its own games. Close it for Hot Potato, stand it like a tent for Blind Guess, open it like a laptop for Quiz Show, lay it flat for Table Hockey. Sixteen games at launch, a game-show host, and one scoreboard for the whole party.'],
    media: [clip('fold-party/reel', 'Reel', true), img('fold-party/01-shelf.webp', 'The shelf'), img('fold-party/03-quiz-show.webp', 'Quiz Show'), img('fold-party/05-table-hockey.webp', 'Table Hockey'), img('fold-party/07-pinball.webp', 'Pinball')],
  },
  {
    id: 'unplugged', title: 'Unplugged Sessions', kind: 'Live music, multi-camera direction',
    body: ['Stripped-back live sets where the artist, the band and the song are the whole event.', 'Directed with multiple cameras in real time, from wide stage frames to tight detail on hands and faces. Each session is cut to the rhythm of the song and graded warm, so it feels like being in the room.'],
    media: [clip('unplugged/unplugged', 'Preview')],
    films: [film('Pexs9H2brcJ', 'Session One'), film('6enmnpI-WUx', 'Session Two'), film('RgDvHPPd6Bd', 'Session Three')], watch: 'Watch the sessions',
  },
  {
    id: 'biscayne', title: 'Biscayne Coffee', kind: 'Video, 3D product design',
    body: ['The launch film for Biscayne Coffee, shot on the Canon C70 and finished in Premiere Pro and After Effects.', 'The coffee bags were textured in Substance Painter and rendered in Cinema 4D with Octane, so the product imagery and the film share one look.'],
    media: [clip('biscayne/biscayne', 'Preview')],
    films: [film('HNQhk4YtxBY', 'Launch film')], watch: 'Watch the launch film',
  },
  {
    id: 'barrys', title: "Barry's", kind: 'Social content, motion design',
    body: ['A repeatable system of animated graphics and motion templates that carries the intensity of the Red Room into the feed.', 'Looping pieces built to stop the scroll: bold type, high contrast, and a tempo that matches the brand.'],
    media: [clip('barrys/barrys', 'Loop'), clip('barrys/barrys-2', 'Motion system'), clip('barrys/barrys-4', 'Type'), clip('barrys/barrys-5', 'Promo'), clip('barrys/barrys-1', 'Graphics'), clip('barrys/barrys-3', 'Titles')],
  },
  {
    id: 'ford-panthers', title: 'Ford x Florida Panthers', kind: 'Brand film, cause campaign',
    body: ["Go Further: a brand film that turned Ford's platform into a hurricane relief drive for the Florida Keys.", 'Shot on site, from collection to convoy, with campaign stills and cuts for social. The cause stays at the center, so the film reads as real help.'],
    media: [clip('ford-panthers/panthers', 'Preview')],
    films: [film('7bxcHMYo5Xg', 'Go Further')], watch: 'Watch the brand film',
  },
];

export const RIG = {
  id: 'pc', title: 'The rig', kind: 'Where the renders happen',
  body: ['Two RTX 3090 cards behind glass. They drive the 3D, the VFX and the AI video work that the shelves are full of.', 'This room was built the same way: modelled and lit in Blender, baked with Cycles, then drawn live in your browser.'],
  media: [],
};

export const REEL = [clip('reel/reel', 'DT+C reel', true), ...PROJECTS.flatMap(p => p.media.filter(m => m.type === 'video').slice(0, 1).map(m => ({ ...m, label: p.title })))];
export const SERIES_2062 = { src: M + '2062/2062.mp4', poster: M + '2062/2062.jpg', title: '2062', line: 'An original sci-fi series from DT+C, made with AI video.' };
export const FOLD = {
  screens: ['01-shelf', '02-hot-potato', '03-quiz-show', '04-double-agent', '05-table-hockey', '06-war', '07-pinball', '08-whos-who', '09-party-circuit', '10-champion'].map(n => M + 'fold-party/' + n + '.webp'),
  names: ['The shelf', 'Hot Potato', 'Quiz Show', 'Double Agent', 'Table Hockey', 'WAR!', 'Pinball', "Who's Who", 'Party Circuit', 'Champion'],
  reel: clip('fold-party/reel', 'Reel', true), keyart: M + 'fold-party/key-art.jpg', logo: M + 'fold-party/logo-glow.png', icon: M + 'fold-party/icon-256.png',
  facts: ['A party game arcade for two to four players on one phone.', 'Built around the hinge of iPhone Duo. Every fold has its own games.', 'Sixteen games at launch on four aisles, with new packs added in updates.', 'No ads, no accounts, no data collected. Plays offline.'],
};
export const byId = id => id === 'pc' ? RIG : PROJECTS.find(p => p.id === id);
