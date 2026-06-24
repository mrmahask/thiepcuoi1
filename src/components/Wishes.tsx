import { useState, useEffect } from 'react';
import { Send, Users, CheckCircle, Share2, Clipboard, Sparkles, MessageSquare, Heart } from 'lucide-react';
import { Wish } from '../types';

interface WishesProps {
  currentUrl: string;
}

export default function Wishes({ currentUrl }: WishesProps) {
  const [wishes, setWishes] = useState<Wish[]>([]);
  const [formData, setFormData] = useState({
    name: '',
    message: '',
    attendance: 'yes' as 'yes' | 'no',
    guestsCount: 1,
  });
  const [isSubmitted, setIsSubmitted] = useState(false);
  
  // Custom link state
  const [inviteeName, setInviteeName] = useState('');
  const [generatedLink, setGeneratedLink] = useState('');
  const [copied, setCopied] = useState(false);

  // Load wishes
  useEffect(() => {
    const savedWishes = localStorage.getItem('wedding_wishes');
    if (savedWishes) {
      setWishes(JSON.parse(savedWishes));
    } else {
      // Prepopulate with elegant realistic sample wishes
      const defaultWishes: Wish[] = [
        {
          id: '1',
          name: 'Anh Tuấn & Chị Thảo',
          message: 'Chúc mừng hạnh phúc hai em! Trăm năm hạnh phúc, đầu bạc răng long nhé. Anh chị nhất định sẽ đến sớm chung vui!',
          attendance: 'yes',
          guestsCount: 2,
          timestamp: new Date(Date.now() - 3600000 * 4).toISOString(), // 4 hours ago
        },
        {
          id: '2',
          name: 'Gia đình Bạn Minh Anh',
          message: 'Chúc Duy Anh và Thanh Bình luôn luôn yêu thương gắn bó, cùng nhau xây dựng tổ ấm ngập tràn tiếng cười và hạnh phúc!',
          attendance: 'yes',
          guestsCount: 3,
          timestamp: new Date(Date.now() - 3600000 * 24).toISOString(), // 1 day ago
        },
        {
          id: '3',
          name: 'Bạn Hoàng Lan (Nhà Gái)',
          message: 'Tiếc quá đợt này tớ đang đi công tác nước ngoài không kịp về dự tiệc cưới của Bình. Từ xa chúc hai bạn vạn dặm bình an, hạnh phúc viên mãn nha!',
          attendance: 'no',
          guestsCount: 0,
          timestamp: new Date(Date.now() - 3600000 * 48).toISOString(), // 2 days ago
        }
      ];
      localStorage.setItem('wedding_wishes', JSON.stringify(defaultWishes));
      setWishes(defaultWishes);
    }
  }, []);

  const handleSubmitWish = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name.trim() || !formData.message.trim()) return;

    const newWish: Wish = {
      id: Date.now().toString(),
      name: formData.name,
      message: formData.message,
      attendance: formData.attendance,
      guestsCount: formData.attendance === 'yes' ? formData.guestsCount : 0,
      timestamp: new Date().toISOString(),
    };

    const updatedWishes = [newWish, ...wishes];
    setWishes(updatedWishes);
    localStorage.setItem('wedding_wishes', JSON.stringify(updatedWishes));
    
    // Reset form
    setFormData({
      name: '',
      message: '',
      attendance: 'yes',
      guestsCount: 1,
    });
    setIsSubmitted(true);
    setTimeout(() => setIsSubmitted(false), 4000);
  };

  const handleGenerateLink = () => {
    if (!inviteeName.trim()) return;
    const cleanUrl = currentUrl.split('?')[0];
    const newLink = `${cleanUrl}?to=${encodeURIComponent(inviteeName.trim())}`;
    setGeneratedLink(newLink);
    setCopied(false);
  };

  const handleCopyLink = () => {
    navigator.clipboard.writeText(generatedLink);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const formatDate = (isoStr: string) => {
    try {
      const date = new Date(isoStr);
      return `${date.getHours()}:${String(date.getMinutes()).padStart(2, '0')} ${date.getDate()}/${date.getMonth() + 1}`;
    } catch {
      return '';
    }
  };

  return (
    <div className="space-y-16 px-4 max-w-5xl mx-auto">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        {/* RSVP FORM */}
        <section className="lg:col-span-7 bg-white rounded-2xl border border-stone-150 p-6 md:p-8 shadow-sm">
          <div className="flex items-center gap-2 mb-6">
            <Heart className="h-5 w-5 text-amber-500 fill-amber-100" />
            <h3 className="font-serif text-2xl text-stone-800 font-light">
              Xác nhận tham dự & Gửi lời chúc
            </h3>
          </div>

          <form onSubmit={handleSubmitWish} className="space-y-5">
            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-stone-500 mb-2">
                Họ và Tên của Bạn
              </label>
              <input
                type="text"
                required
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                placeholder="Nhập tên của bạn hoặc gia đình..."
                className="w-full rounded-xl border border-stone-250 bg-stone-50 px-4 py-3 text-sm focus:border-amber-400 focus:bg-white focus:outline-none transition-all"
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-stone-500 mb-2">
                  Bạn có tham dự được không?
                </label>
                <div className="grid grid-cols-2 gap-2">
                  <button
                    type="button"
                    onClick={() => setFormData({ ...formData, attendance: 'yes' })}
                    className={`rounded-xl py-3 text-sm font-medium border transition-all ${
                      formData.attendance === 'yes'
                        ? 'border-amber-500 bg-amber-50 text-amber-800 font-semibold'
                        : 'border-stone-200 bg-stone-50 text-stone-600 hover:bg-stone-100'
                    }`}
                  >
                    Sẽ tham gia
                  </button>
                  <button
                    type="button"
                    onClick={() => setFormData({ ...formData, attendance: 'no' })}
                    className={`rounded-xl py-3 text-sm font-medium border transition-all ${
                      formData.attendance === 'no'
                        ? 'border-amber-500 bg-amber-50 text-amber-800 font-semibold'
                        : 'border-stone-200 bg-stone-50 text-stone-600 hover:bg-stone-100'
                    }`}
                  >
                    Tiếc quá, không thể bận
                  </button>
                </div>
              </div>

              {formData.attendance === 'yes' && (
                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wider text-stone-500 mb-2">
                    Số người tham dự
                  </label>
                  <div className="relative">
                    <Users className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-stone-400" />
                    <select
                      value={formData.guestsCount}
                      onChange={(e) => setFormData({ ...formData, guestsCount: Number(e.target.value) })}
                      className="w-full rounded-xl border border-stone-250 bg-stone-50 pl-10 pr-4 py-3 text-sm focus:border-amber-400 focus:bg-white focus:outline-none transition-all appearance-none cursor-pointer"
                    >
                      {[1, 2, 3, 4, 5, 6].map((num) => (
                        <option key={num} value={num}>
                          {num} người
                        </option>
                      ))}
                    </select>
                  </div>
                </div>
              )}
            </div>

            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-stone-500 mb-2">
                Lời chúc gửi tới cô dâu & chú rể
              </label>
              <textarea
                required
                rows={4}
                value={formData.message}
                onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                placeholder="Viết những lời yêu thương, gửi gắm chúc mừng hai bạn..."
                className="w-full rounded-xl border border-stone-250 bg-stone-50 px-4 py-3 text-sm focus:border-amber-400 focus:bg-white focus:outline-none transition-all resize-none"
              />
            </div>

            <button
              type="submit"
              className="flex items-center justify-center gap-2 w-full rounded-xl bg-stone-850 hover:bg-stone-900 py-3.5 text-white text-sm font-medium transition-all duration-300 hover:shadow-md"
            >
              <Send className="h-4 w-4" />
              <span>Gửi Lời Chúc Mừng</span>
            </button>

            {isSubmitted && (
              <div className="flex items-center gap-2 rounded-xl bg-emerald-50 px-4 py-3 text-emerald-800 text-sm animate-fade-in border border-emerald-100">
                <CheckCircle className="h-5 w-5 text-emerald-500 flex-shrink-0" />
                <span>Cảm ơn bạn rất nhiều! Lời chúc của bạn đã được gửi tới Duy Anh & Thanh Bình.</span>
              </div>
            )}
          </form>
        </section>

        {/* LINK GENERATOR FOR HOSTS */}
        <section className="lg:col-span-5 space-y-6">
          <div className="bg-gradient-to-br from-amber-50 to-stone-50 rounded-2xl border border-amber-100 p-6 shadow-sm">
            <div className="flex items-center gap-2 mb-4">
              <Sparkles className="h-4.5 w-4.5 text-amber-600" />
              <h4 className="font-serif text-lg text-stone-800 font-light">
                Tạo Link Gửi Lời Mời
              </h4>
            </div>
            
            <p className="text-xs text-stone-500 leading-relaxed mb-4">
              Nhập tên khách mời bên dưới để tạo một đường link thiệp cưới cá nhân hóa tuyệt đẹp. Tên của khách mời sẽ hiển thị trang trọng trên thiệp mời!
            </p>

            <div className="space-y-4">
              <input
                type="text"
                value={inviteeName}
                onChange={(e) => setInviteeName(e.target.value)}
                placeholder="Ví dụ: Anh Chị Sơn Thảo, Bạn Lan..."
                className="w-full rounded-xl border border-amber-200 bg-white px-3.5 py-2.5 text-xs focus:border-amber-400 focus:outline-none"
              />

              <button
                type="button"
                onClick={handleGenerateLink}
                className="flex items-center justify-center gap-2 w-full rounded-xl bg-amber-600 hover:bg-amber-700 py-2.5 text-white text-xs font-medium transition-all"
              >
                <Share2 className="h-3.5 w-3.5" />
                <span>Tạo Đường Dẫn Riêng</span>
              </button>

              {generatedLink && (
                <div className="space-y-2 pt-2 animate-fade-in">
                  <div className="rounded-xl border border-amber-200/50 bg-white p-3 text-[11px] font-mono break-all text-stone-600 max-h-20 overflow-y-auto">
                    {generatedLink}
                  </div>
                  <button
                    type="button"
                    onClick={handleCopyLink}
                    className={`flex items-center justify-center gap-2 w-full rounded-xl py-2.5 text-xs font-medium transition-all ${
                      copied
                        ? 'bg-emerald-50 text-emerald-800 border border-emerald-200'
                        : 'bg-stone-800 hover:bg-stone-900 text-white'
                    }`}
                  >
                    <Clipboard className="h-3.5 w-3.5" />
                    <span>{copied ? 'Đã sao chép thành công!' : 'Sao Chép Link'}</span>
                  </button>
                </div>
              )}
            </div>
          </div>
        </section>
      </div>

      {/* GUESTBOOK / WISHES FEED */}
      <section className="bg-stone-50 rounded-2xl border border-amber-100/50 p-6 md:p-8">
        <div className="flex items-center gap-2.5 mb-8">
          <MessageSquare className="h-5 w-5 text-amber-700" />
          <h3 className="font-serif text-2xl text-stone-800 font-light">
            Sổ Lưu Bút Đám Cưới
          </h3>
          <span className="rounded-full bg-amber-100 text-amber-800 text-xs px-2.5 py-0.5 font-mono">
            {wishes.length}
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {wishes.map((wish) => (
            <div
              key={wish.id}
              className="relative rounded-2xl bg-white border border-stone-150 p-5 shadow-inner transition-transform hover:scale-[1.01]"
            >
              <div className="flex justify-between items-start mb-3">
                <div>
                  <h4 className="font-serif text-base font-semibold text-stone-800">
                    {wish.name}
                  </h4>
                  <span className="text-[10px] text-stone-400 font-mono">
                    {formatDate(wish.timestamp)}
                  </span>
                </div>
                {wish.attendance === 'yes' ? (
                  <span className="inline-flex items-center gap-1 text-[10px] bg-emerald-50 text-emerald-800 rounded-full px-2 py-0.5 border border-emerald-100 font-sans font-medium">
                    Sẽ tham gia {wish.guestsCount > 1 ? `(${wish.guestsCount} người)` : ''}
                  </span>
                ) : (
                  <span className="inline-flex items-center gap-1 text-[10px] bg-stone-100 text-stone-500 rounded-full px-2 py-0.5 font-sans">
                    Tiếc quá, vắng mặt
                  </span>
                )}
              </div>
              <p className="text-stone-600 text-sm leading-relaxed whitespace-pre-wrap font-serif italic text-stone-700">
                "{wish.message}"
              </p>
              
              {/* Little corner romantic decoration */}
              <div className="absolute right-4 bottom-3 opacity-15 select-none font-serif text-xl text-amber-500">
                囍
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
