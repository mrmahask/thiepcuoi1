import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Heart, Calendar, Sparkles, MapPin, Gift, Clock } from 'lucide-react';

import { Parents, WeddingEvent, Photo, DressCode } from './types';
import Envelope from './components/Envelope';
import AudioPlayer from './components/AudioPlayer';
import Countdown from './components/Countdown';
import WeddingInfo from './components/WeddingInfo';
import PhotoAlbum from './components/PhotoAlbum';

// Import our beautiful generated wedding cover image
import weddingCover from './assets/images/wedding_cover_1782320952577.jpg';

export default function App() {
  const [isOpen, setIsOpen] = useState(false);
  const [guestName, setGuestName] = useState('Quý khách');
  const [isPlayingMusic, setIsPlayingMusic] = useState(false);
  const [currentUrl, setCurrentUrl] = useState('');

  // Extract guest name from URL parameter '?to=Name' or '?guest=Name'
  useEffect(() => {
    setCurrentUrl(window.location.href);
    const params = new URLSearchParams(window.location.search);
    const nameParam = params.get('to') || params.get('guest');
    if (nameParam) {
      setGuestName(nameParam);
    }
  }, []);

  const handleOpenInvitation = () => {
    setIsOpen(true);
    setIsPlayingMusic(true);
  };

  // Wedding details data
  const parents: Parents = {
    bride: {
      father: 'Nguyễn Văn A',
      mother: 'Trần Thị B',
    },
    groom: {
      father: 'Lê Văn C',
      mother: 'Phạm Thị D',
    },
  };

  const events: WeddingEvent[] = [
    {
      title: 'LỄ VU QUY (NHÀ GÁI)',
      date: 'Thứ Bảy, ngày 18 tháng 07 năm 2026',
      time: '11:00 AM',
      locationName: 'Tư Gia Nhà Gái',
      address: '123 Đường Nguyễn Trãi, Phường Bến Thành, Quận 1, TP. Hồ Chí Minh',
      mapLink: 'https://maps.google.com/?q=123+Nguyễn+Trãi,+Quận+1,+TP.HCM',
    },
    {
      title: 'LỄ THÀNH HÔN & TIỆC CƯỚI (NHÀ TRAI)',
      date: 'Chủ Nhật, ngày 19 tháng 07 năm 2026',
      time: '17:30 PM',
      locationName: 'Riverside Wedding & Event Palace',
      address: '360 Đường Bến Vân Đồn, Phường 1, Quận 4, TP. Hồ Chí Minh',
      mapLink: 'https://maps.google.com/?q=Riverside+Palace,+Bến+Vân+Đồn,+Quận+4,+TP.HCM',
    },
  ];

  const dressCode: DressCode = {
    themeName: 'Pastel Elegance',
    description: 'Để bức ảnh kỷ niệm thêm phần hài hòa và trọn vẹn, kính mong quý khách lựa chọn trang phục dự tiệc theo các gam màu gợi ý dưới đây:',
    colors: [
      { name: 'Trắng Kem', hex: '#F3EFE0' },
      { name: 'Hồng Blush', hex: '#E8C5C8' },
      { name: 'Vàng Cát', hex: '#D1B894' },
      { name: 'Xanh Sage', hex: '#A8B196' },
    ],
  };

  const photos: Photo[] = [
    {
      url: weddingCover,
      caption: 'Thanh xuân của chúng ta bắt đầu bằng lời hứa hẹn trăm năm.',
    },
    {
      url: 'https://images.unsplash.com/photo-1519741497674-611481863552?q=80&w=800&auto=format&fit=crop',
      caption: 'Nơi tình yêu bắt đầu bằng sự sẻ chia và gắn bó.',
    },
    {
      url: 'https://images.unsplash.com/photo-1511285560929-80b456fea0bc?q=80&w=800&auto=format&fit=crop',
      caption: 'Nắm tay nhau đi qua giông bão cuộc đời.',
    },
    {
      url: 'https://images.unsplash.com/photo-1532712938310-34cb3982ef74?q=80&w=800&auto=format&fit=crop',
      caption: 'Từng chi tiết nhỏ chuẩn bị cho khoảnh khắc thiêng liêng nhất.',
    },
    {
      url: 'https://images.unsplash.com/photo-1507504038482-7621c518ceab?q=80&w=800&auto=format&fit=crop',
      caption: 'Nguyện bên nhau đến đầu bạc răng long.',
    },
    {
      url: 'https://images.unsplash.com/photo-1583939003579-730e3918a45a?q=80&w=800&auto=format&fit=crop',
      caption: 'Cùng chung vui trong nụ cười trọn vẹn nhất.',
    },
  ];

  return (
    <div className="min-h-screen bg-stone-100 text-stone-800 font-sans selection:bg-amber-100 selection:text-amber-800">
      {/* Background soft ambient decoration */}
      <div className="fixed inset-0 pointer-events-none z-0">
        <div className="absolute top-10 left-10 w-96 h-96 bg-amber-50/40 rounded-full blur-3xl" />
        <div className="absolute bottom-10 right-10 w-96 h-96 bg-amber-100/20 rounded-full blur-3xl" />
      </div>

      <AnimatePresence>
        {!isOpen ? (
          <Envelope onOpen={handleOpenInvitation} guestName={guestName} />
        ) : (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1 }}
            className="relative z-10"
          >
            {/* Audio Floating Widget */}
            <AudioPlayer isPlayingMusic={isPlayingMusic} setIsPlayingMusic={setIsPlayingMusic} />

            {/* HEADER HERO BANNER */}
            <header className="relative flex min-h-screen flex-col items-center justify-center overflow-hidden px-4 py-12 text-center bg-stone-50">
              {/* Inner vintage border */}
              <div className="absolute inset-4 md:inset-8 rounded-2xl border border-amber-200/40 pointer-events-none" />
              <div className="absolute inset-5 md:inset-9 rounded-xl border border-dashed border-amber-200/10 pointer-events-none" />

              <div className="max-w-2xl mx-auto space-y-8 z-10">
                {/* Traditional Chinese Calligraphy / Song Hỷ symbol */}
                <motion.div
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.2, duration: 0.8 }}
                  className="font-serif text-amber-600 text-4xl"
                >
                  囍
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4, duration: 0.8 }}
                  className="space-y-2"
                >
                  <p className="font-serif text-xs uppercase tracking-[0.3em] text-amber-700">
                    Save the Date
                  </p>
                  <p className="font-mono text-xs text-stone-400 tracking-widest">
                    19 - 07 - 2026
                  </p>
                </motion.div>

                {/* IMAGE FRAME WITH "A ♥ B" */}
                <motion.div
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.6, duration: 1 }}
                  className="relative mx-auto w-72 sm:w-85 aspect-[3/4] overflow-hidden rounded-2xl border-4 border-white shadow-xl ring-1 ring-amber-200/40 group"
                >
                  {/* Image */}
                  <img
                    src={weddingCover}
                    alt="Duy Anh & Thanh Bình Wedding"
                    referrerPolicy="no-referrer"
                    className="h-full w-full object-cover transition-transform duration-1000 group-hover:scale-105"
                  />
                  {/* Golden subtle frame border */}
                  <div className="absolute inset-3 border border-amber-100/30 rounded-xl pointer-events-none" />

                  {/* Superimposed Floating "A ♥ B" block */}
                  <div className="absolute inset-0 bg-stone-900/10 flex flex-col items-center justify-center">
                    <motion.div
                      initial={{ scale: 0.9, opacity: 0 }}
                      animate={{ scale: 1, opacity: 1 }}
                      transition={{ delay: 1, duration: 1 }}
                      className="rounded-full bg-white/85 px-6 py-4 border border-amber-200 shadow-lg backdrop-blur-md"
                    >
                      <h1 className="font-serif text-3xl sm:text-4xl font-light tracking-wide text-stone-800 flex items-center gap-2">
                        <span>A</span>
                        <Heart className="h-5 w-5 text-red-500 fill-red-500 animate-pulse inline-block" />
                        <span>B</span>
                      </h1>
                    </motion.div>
                  </div>
                </motion.div>

                {/* THE INVITATION TEXT */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.8, duration: 1 }}
                  className="space-y-4 max-w-lg mx-auto"
                >
                  <div className="pt-2">
                    <span className="font-serif text-stone-400 text-sm italic">
                      Trân trọng kính mời:
                    </span>
                    <h2 className="font-serif text-3xl md:text-4xl text-amber-700 font-semibold mt-1 tracking-wide">
                      {guestName}
                    </h2>
                  </div>

                  <p className="font-serif text-stone-600 text-sm sm:text-base leading-relaxed px-4">
                    Đến dự buổi tiệc chung vui cùng gia đình chúng tôi tại lễ thành hôn kết duyên đôi lứa của Duy Anh &amp; Thanh Bình. Sự hiện diện quý báu của quý khách là niềm vinh hạnh lớn của đại gia đình hai họ!
                  </p>

                  <div className="flex items-center justify-center gap-1.5 text-stone-400 text-xs">
                    <Sparkles className="h-3.5 w-3.5 text-amber-400" />
                    <span>Lướt xuống để xem thêm thông tin sự kiện &amp; gửi lời chúc mừng</span>
                  </div>
                </motion.div>
              </div>
            </header>

            {/* COUNTDOWN SECTION */}
            <section className="bg-white py-12 border-t border-stone-150">
              <div className="max-w-2xl mx-auto text-center px-4">
                <span className="font-serif text-xs tracking-widest text-amber-700 uppercase">
                  Countdown to the Big Day
                </span>
                <h3 className="font-serif text-2xl font-light text-stone-800 mt-1 mb-4">
                  Cùng Đếm Ngược Thời Gian
                </h3>
                <div className="h-[1px] w-12 bg-amber-300 mx-auto mb-4" />
                <Countdown targetDate="2026-07-19T11:00:00" />
              </div>
            </section>

            {/* MAIN DETAILS (Gia Đình Hai Họ, Lễ Cưới, Dress Code) */}
            <main className="py-20 bg-stone-50 space-y-24 border-t border-stone-150 relative">
              <WeddingInfo parents={parents} events={events} dressCode={dressCode} />
            </main>

            {/* PHOTO ALBUM */}
            <section className="py-20 bg-white border-t border-stone-150">
              <PhotoAlbum photos={photos} />
            </section>

            {/* FOOTER THANK YOU */}
            <footer className="bg-stone-900 text-stone-300 py-20 px-4 text-center relative overflow-hidden border-t-2 border-amber-500/20">
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none opacity-[0.02] text-[40vw] text-white font-serif select-none">
                囍
              </div>

              <div className="max-w-md mx-auto space-y-6 z-10 relative">
                <span className="font-serif text-amber-500 text-3xl">囍</span>
                
                <h4 className="font-serif text-2xl text-amber-400 font-light tracking-widest">
                  THANK YOU
                </h4>

                <p className="font-serif text-lg text-white font-light max-w-sm mx-auto leading-relaxed">
                  Rất hân hạnh được đón tiếp và chung vui cùng quý khách.
                </p>

                <div className="h-[1px] w-16 bg-amber-500/30 mx-auto" />

                <p className="font-serif text-2xl text-amber-400 font-light mt-4 tracking-wider">
                  Duy Anh <span className="font-sans font-light text-xl">&amp;</span> Thanh Bình
                </p>

                <div className="mt-8 space-y-2">
                  <p className="font-mono text-[10px] text-stone-500 tracking-widest uppercase">
                    © 2026 Duy Anh &amp; Thanh Bình Wedding. All Rights Reserved.
                  </p>
                  <p className="font-sans text-[11px] text-stone-400">
                    Thiết kế bản quyền bởi <a href="http://facebook.com/hieeus.mahask" target="_blank" rel="noopener noreferrer" className="hover:text-amber-400 text-amber-500 font-medium underline transition-colors">MaHask</a>
                  </p>
                </div>
              </div>
            </footer>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
