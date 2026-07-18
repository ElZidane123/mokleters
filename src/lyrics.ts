/* =============================================
   LYRICS DATA — per chant with timestamps (seconds)
   ============================================= */

export interface LyricLine {
  id: number
  text: string
  time: number
}

export interface ChantData {
  id: number
  title: string
  duration: string
  durationSec: number
  category: string
  tag: string
  popular: boolean
  img: string
  artist: string
  plays: string
  src: string
  lyrics: LyricLine[]
}

export const CHANTS: ChantData[] = [
  {
    id: 1, title: 'Kami Datang Lagi', duration: '2:30', durationSec: 150,
    category: 'Anthem Pembuka', tag: 'Pembuka', popular: true,
    img: '/anthem1.png', artist: 'Fans Mokleters', plays: '1.5Jt',
    src: '/src/assets/mp4/kami datang lagi.m4a.mp4',
    lyrics: [
      { id: 0, text: 'Kami datang lagi...', time: 0 },
      { id: 1, text: 'Dengan semangat membara', time: 12 },
      { id: 2, text: 'Mokleters selalu ada', time: 25 },
      { id: 3, text: 'Di setiap pertandingan', time: 38 },
      { id: 4, text: 'Kami datang lagi...', time: 52 },
      { id: 5, text: 'Suara kami menggelegar', time: 65 },
      { id: 6, text: 'Merah putih kebanggaan', time: 80 },
      { id: 7, text: 'Telkom Malang berjaya!', time: 95 },
      { id: 8, text: 'Heyyyy... kami datang!', time: 115 },
      { id: 9, text: 'Mokleters forever!', time: 132 },
    ],
  },
  {
    id: 2, title: 'SMK Telkom Malang Kami Datang', duration: '2:12', durationSec: 132,
    category: 'Anthem Pembuka', tag: 'Pembuka', popular: true,
    img: '/anthem2.png', artist: 'Paduan Suara Tribun Utara', plays: '892Rb',
    src: '/src/assets/mp4/smk telkom malang kami datang.m4a.mp4',
    lyrics: [
      { id: 0, text: 'SMK Telkom Malang...', time: 0 },
      { id: 1, text: 'Kami datang untukmu', time: 10 },
      { id: 2, text: 'Berjuang tanpa henti', time: 22 },
      { id: 3, text: 'Demi nama sekolah kita', time: 35 },
      { id: 4, text: 'Telkom Malang!', time: 48 },
      { id: 5, text: 'Kami pendukungmu sejati', time: 60 },
      { id: 6, text: 'Sampai akhir pertandingan', time: 72 },
      { id: 7, text: 'SMK Telkom Malang!', time: 88 },
      { id: 8, text: 'Kami datang... kami datang!', time: 105 },
      { id: 9, text: 'Berjaya untuk selamanya!', time: 120 },
    ],
  },
  {
    id: 3, title: 'Bukalah Matamu', duration: '3:05', durationSec: 185,
    category: 'Tempo Pertandingan', tag: 'Pertandingan', popular: false,
    img: '/anthem3.png', artist: 'Unit Perkusi', plays: '740Rb',
    src: '/src/assets/mp4/bukalah matamu.m4a.mp4',
    lyrics: [
      { id: 0, text: 'Bukalah matamu...', time: 0 },
      { id: 1, text: 'Lihat kami berdiri tegak', time: 15 },
      { id: 2, text: 'Demi Telkom Malang', time: 30 },
      { id: 3, text: 'Kami tak akan mundur', time: 45 },
      { id: 4, text: 'Bukalah matamu!', time: 60 },
      { id: 5, text: 'Dengar suara kami', time: 75 },
      { id: 6, text: 'Bergema di tribun ini', time: 90 },
      { id: 7, text: 'Untuk kemenangan kita!', time: 110 },
      { id: 8, text: 'Buka... buka matamu!', time: 130 },
      { id: 9, text: 'Mokleters pantang menyerah', time: 155 },
      { id: 10, text: 'Sampai akhir nanti...', time: 172 },
    ],
  },
  {
    id: 4, title: 'Mokleters Mokleters Wikusama', duration: '2:50', durationSec: 170,
    category: 'Chant Kebanggaan', tag: 'Kebanggaan', popular: true,
    img: '/anthem1.png', artist: 'Ensembel Vokal 2025', plays: '612Rb',
    src: '/src/assets/mp4/mokleters mokleters wikusama.m4a.mp4',
    lyrics: [
      { id: 0, text: 'Mokleters... Mokleters...', time: 0 },
      { id: 1, text: 'Wikusama kebanggaan kami', time: 14 },
      { id: 2, text: 'Bersatu padu satu jiwa', time: 28 },
      { id: 3, text: 'Mokleters Mokleters!', time: 42 },
      { id: 4, text: 'Wikusama... Wikusama...', time: 56 },
      { id: 5, text: 'Nama yang selalu kami jaga', time: 70 },
      { id: 6, text: 'Di setiap langkah perjuangan', time: 84 },
      { id: 7, text: 'Mokleters! Wikusama!', time: 100 },
      { id: 8, text: 'Satu hati, satu suara', time: 120 },
      { id: 9, text: 'Mokleters forever! Wikusama!', time: 145 },
      { id: 10, text: 'Heyyyy...!!!', time: 162 },
    ],
  },
  {
    id: 5, title: 'Kami Pendukung Telkom Malang', duration: '1:45', durationSec: 105,
    category: 'Tempo Pertandingan', tag: 'Pertandingan', popular: false,
    img: '/anthem2.png', artist: 'Ultras SMK Malang', plays: '541Rb',
    src: '/src/assets/mp4/kami pendukung telkom malang.m4a.mp4',
    lyrics: [
      { id: 0, text: 'Kami pendukung Telkom Malang', time: 0 },
      { id: 1, text: 'Setia sampai akhir hayat', time: 12 },
      { id: 2, text: 'Tak ada yang bisa hentikan kami', time: 24 },
      { id: 3, text: 'Telkom Malang! Telkom Malang!', time: 38 },
      { id: 4, text: 'Kami pendukung sejati', time: 52 },
      { id: 5, text: 'Di setiap medan pertandingan', time: 65 },
      { id: 6, text: 'Mokleters berdiri tegak!', time: 80 },
      { id: 7, text: 'Telkom Malang berjaya!!!', time: 95 },
    ],
  },
  {
    id: 6, title: 'Loyalitas Tanpa Batas', duration: '3:18', durationSec: 198,
    category: 'Anthem Pembuka', tag: 'Pembuka', popular: true,
    img: '/anthem3.png', artist: 'Fans Mokleters', plays: '498Rb',
    src: '/src/assets/mp4/LOYALITAS TANPA BATAS ANTHEM.m4a.mp4',
    lyrics: [
      { id: 0, text: 'Loyalitas... tanpa batas', time: 0 },
      { id: 1, text: 'Inilah janji kami padamu', time: 16 },
      { id: 2, text: 'Mokleters berdiri tegak', time: 32 },
      { id: 3, text: 'Sampai napas terakhir', time: 48 },
      { id: 4, text: 'Loyalitas tanpa batas!', time: 64 },
      { id: 5, text: 'Untuk SMK Telkom Malang', time: 80 },
      { id: 6, text: 'Kesetiaan kami abadi', time: 96 },
      { id: 7, text: 'Di tribun ini kami berdiri', time: 112 },
      { id: 8, text: 'Loyalitas... loyalitas...', time: 130 },
      { id: 9, text: 'Tak pernah kami ingkari', time: 148 },
      { id: 10, text: 'Mokleters! Loyalitas!', time: 168 },
      { id: 11, text: 'Tanpa batas... selamanya!', time: 185 },
    ],
  },
  {
    id: 7, title: 'Hey Forza Moklet', duration: '2:40', durationSec: 160,
    category: 'Tempo Pertandingan', tag: 'Pertandingan', popular: true,
    img: '/anthem1.png', artist: 'Paduan Suara Tribun Utara', plays: '432Rb',
    src: '/src/assets/mp4/hey forza moklet forza forza moklet.m4a.mp4',
    lyrics: [
      { id: 0, text: 'Hey! Forza Moklet!', time: 0 },
      { id: 1, text: 'Forza! Forza! Moklet!', time: 8 },
      { id: 2, text: 'Hey hey hey!', time: 18 },
      { id: 3, text: 'Forza Moklet! Forza!', time: 28 },
      { id: 4, text: 'Ayo maju terus!', time: 40 },
      { id: 5, text: 'Hey! Forza Moklet!', time: 55 },
      { id: 6, text: 'Jangan pernah menyerah!', time: 70 },
      { id: 7, text: 'Forza! Forza! Forza!', time: 85 },
      { id: 8, text: 'Hey Moklet berjaya!', time: 102 },
      { id: 9, text: 'Forza Moklet! Hey!', time: 120 },
      { id: 10, text: 'Mokleters! Forza!!!', time: 140 },
      { id: 11, text: 'Hey!!! Forza!!!', time: 152 },
    ],
  },
  {
    id: 8, title: 'Bret', duration: '1:55', durationSec: 115,
    category: 'Chant Kemenangan', tag: 'Kemenangan', popular: false,
    img: '/anthem2.png', artist: 'Unit Perkusi', plays: '387Rb',
    src: '/src/assets/mp4/bret.m4a.mp4',
    lyrics: [
      { id: 0, text: 'Bret... bret... bret...', time: 0 },
      { id: 1, text: 'Mokleters menang!', time: 12 },
      { id: 2, text: 'Bret! Bret! Bret!', time: 24 },
      { id: 3, text: 'Rayakan kemenangan ini!', time: 36 },
      { id: 4, text: 'Bret bret bret...', time: 50 },
      { id: 5, text: 'Telkom Malang jaya!', time: 65 },
      { id: 6, text: 'Bret!!! Menang!!!', time: 82 },
      { id: 7, text: 'Mokleters berjaya!!!', time: 100 },
    ],
  },
  {
    id: 9, title: 'Yeyeye Happy Yayaya', duration: '2:20', durationSec: 140,
    category: 'Chant Kemenangan', tag: 'Kemenangan', popular: false,
    img: '/anthem3.png', artist: 'Ensembel Vokal 2025', plays: '356Rb',
    src: '/src/assets/mp4/yeyeye happy yayaya.m4a.mp4',
    lyrics: [
      { id: 0, text: 'Yeyeye... happy yayaya...', time: 0 },
      { id: 1, text: 'Kita menang hari ini!', time: 14 },
      { id: 2, text: 'Yeyeye happy!', time: 28 },
      { id: 3, text: 'Rayakan bersama-sama', time: 42 },
      { id: 4, text: 'Yayaya... yeyeye...', time: 56 },
      { id: 5, text: 'Happy! Happy! Happy!', time: 70 },
      { id: 6, text: 'Mokleters menang lagi!', time: 85 },
      { id: 7, text: 'Yeyeye happy yayaya!', time: 100 },
      { id: 8, text: 'Selamat... selamat!', time: 118 },
      { id: 9, text: 'Yayaya!!! Menang!!!', time: 130 },
    ],
  },
  {
    id: 10, title: 'Warna Merah Kebanggaan Kami', duration: '3:10', durationSec: 190,
    category: 'Chant Kebanggaan', tag: 'Kebanggaan', popular: true,
    img: '/anthem1.png', artist: 'Fans Mokleters', plays: '324Rb',
    src: '/src/assets/mp4/warna merah kebanggan kami.m4a.mp4',
    lyrics: [
      { id: 0, text: 'Warna merah kebanggaan kami', time: 0 },
      { id: 1, text: 'Berkibar di setiap tribun', time: 16 },
      { id: 2, text: 'Merah... merah kebanggaan', time: 32 },
      { id: 3, text: 'SMK Telkom Malang!', time: 48 },
      { id: 4, text: 'Warna merah... darah kami', time: 64 },
      { id: 5, text: 'Jiwa raga untuk sekolah ini', time: 80 },
      { id: 6, text: 'Kebanggaan kami abadi', time: 98 },
      { id: 7, text: 'Merah putih selalu berjaya!', time: 116 },
      { id: 8, text: 'Warna merah... kebanggaan...', time: 136 },
      { id: 9, text: 'Mokleters di setiap saat', time: 156 },
      { id: 10, text: 'Merah!!! Kebanggaan kami!!!', time: 176 },
    ],
  },
  {
    id: 11, title: 'Hari Ini Ku Tinggalkan Pelajaran', duration: '2:55', durationSec: 175,
    category: 'Anthem Pembuka', tag: 'Pembuka', popular: false,
    img: '/anthem2.png', artist: 'Ultras SMK Malang', plays: '289Rb',
    src: '/src/assets/mp4/hari ini ku tinggalkan pelajaran.m4a.mp4',
    lyrics: [
      { id: 0, text: 'Hari ini ku tinggalkan pelajaran', time: 0 },
      { id: 1, text: 'Demi Mokleters kebanggaan', time: 16 },
      { id: 2, text: 'Tak ada yang lebih penting', time: 32 },
      { id: 3, text: 'Dari mendukung SMK kita!', time: 48 },
      { id: 4, text: 'Hari ini... hari ini...', time: 64 },
      { id: 5, text: 'Ku tinggalkan segalanya', time: 80 },
      { id: 6, text: 'Untuk berdiri di sini', time: 96 },
      { id: 7, text: 'Bersama Mokleters semua!', time: 112 },
      { id: 8, text: 'Hari ini ku di sini!', time: 130 },
      { id: 9, text: 'Tinggalkan pelajaran demi ini!', time: 148 },
      { id: 10, text: 'Mokleters! Telkom! Berjaya!', time: 165 },
    ],
  },
]
