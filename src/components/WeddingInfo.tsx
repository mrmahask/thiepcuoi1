import { MapPin, Calendar, Clock, Navigation, Check } from 'lucide-react';
import { WeddingEvent, Parents, DressCode } from '../types';

interface WeddingInfoProps {
  parents: Parents;
  events: WeddingEvent[];
  dressCode: DressCode;
}

export default function WeddingInfo({ parents, events, dressCode }: WeddingInfoProps) {
  return (
    <div className="space-y-16">
      {/* Parents Section */}
      <section className="text-center px-4">
        <div className="mx-auto max-w-xl rounded-2xl bg-stone-50 border border-amber-100 p-8 shadow-sm relative">
          <div className="absolute inset-4 rounded-xl border border-amber-200/20 pointer-events-none" />
          
          <h3 className="font-serif text-xl text-amber-700 tracking-widest uppercase mb-8">
            Gia Đình Hai Họ
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center relative">
            {/* Nhà Gái */}
            <div className="space-y-2">
              <span className="font-serif text-xs tracking-widest text-stone-400 uppercase">
                Nhà Gái
              </span>
              <p className="font-serif text-lg font-medium text-stone-800">
                Ông: {parents.bride.father}
              </p>
              <p className="font-serif text-lg font-medium text-stone-800">
                Bà: {parents.bride.mother}
              </p>
            </div>

            {/* Splitter character 囍 */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 hidden md:flex h-12 w-12 items-center justify-center rounded-full bg-white text-2xl text-amber-600 font-serif shadow-sm border border-amber-100">
              囍
            </div>
            
            {/* Mobile divider */}
            <div className="md:hidden flex items-center justify-center py-2 text-2xl text-amber-500 font-serif">
              囍
            </div>

            {/* Nhà Trai */}
            <div className="space-y-2">
              <span className="font-serif text-xs tracking-widest text-stone-400 uppercase">
                Nhà Trai
              </span>
              <p className="font-serif text-lg font-medium text-stone-800">
                Ông: {parents.groom.father}
              </p>
              <p className="font-serif text-lg font-medium text-stone-800">
                Bà: {parents.groom.mother}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Events Section */}
      <section className="px-4">
        <div className="text-center max-w-md mx-auto mb-10">
          <span className="font-serif text-xs tracking-widest text-amber-600 uppercase">
            Wedding Schedule
          </span>
          <h3 className="font-serif text-3xl font-light text-stone-800 mt-2">
            Sự Kiện Cưới
          </h3>
          <div className="mt-2 h-[1px] w-16 bg-amber-300 mx-auto" />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          {events.map((event, index) => (
            <div
              key={index}
              className="group relative flex flex-col justify-between rounded-2xl bg-white border border-stone-150 p-6 md:p-8 shadow-sm hover:shadow-md transition-all duration-300"
            >
              <div className="absolute top-0 left-0 right-0 h-[3px] bg-gradient-to-r from-amber-400 to-amber-600 rounded-t-2xl opacity-80" />

              <div>
                <span className="inline-block rounded-full bg-amber-50 px-3 py-1 text-xs font-serif text-amber-700 tracking-wider font-medium mb-4">
                  {event.title}
                </span>

                <h4 className="font-serif text-xl text-stone-800 font-medium mb-6">
                  {event.locationName}
                </h4>

                <div className="space-y-4 text-stone-600 text-sm">
                  <div className="flex items-center gap-3">
                    <Calendar className="h-4.5 w-4.5 text-amber-500 flex-shrink-0" />
                    <span>{event.date}</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <Clock className="h-4.5 w-4.5 text-amber-500 flex-shrink-0" />
                    <span>{event.time}</span>
                  </div>
                  <div className="flex items-start gap-3">
                    <MapPin className="h-4.5 w-4.5 text-amber-500 flex-shrink-0 mt-0.5" />
                    <span className="leading-relaxed">{event.address}</span>
                  </div>
                </div>
              </div>

              <div className="mt-8 pt-6 border-t border-stone-100">
                <a
                  href={event.mapLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center gap-2 w-full rounded-xl border border-amber-500/20 bg-stone-50 hover:bg-amber-50/50 py-3 text-sm font-medium text-amber-700 hover:text-amber-800 transition-all duration-300 hover:shadow-sm"
                >
                  <Navigation className="h-4 w-4" />
                  <span>Chỉ Đường {index === 0 ? 'Nhà Gái' : 'Nhà Trai'}</span>
                </a>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Dress Code Section */}
      <section className="text-center px-4">
        <div className="mx-auto max-w-2xl rounded-2xl bg-stone-50 border border-amber-100 p-8 shadow-sm">
          <span className="font-serif text-xs tracking-widest text-amber-600 uppercase">
            Dress Code
          </span>
          <h3 className="font-serif text-2xl font-light text-stone-800 mt-2 mb-4">
            Trang phục khuyến nghị
          </h3>
          
          <p className="text-stone-500 text-sm max-w-md mx-auto leading-relaxed mb-6">
            {dressCode.description}
          </p>

          {/* Color Palettes */}
          <div className="flex justify-center items-center gap-6 md:gap-8 flex-wrap mb-8">
            {dressCode.colors.map((color, index) => (
              <div key={index} className="flex flex-col items-center gap-2 group">
                <div
                  className="h-14 w-14 rounded-full shadow-md border-2 border-white transition-transform group-hover:scale-110 duration-300"
                  style={{ backgroundColor: color.hex }}
                />
                <span className="text-xs text-stone-500 font-sans font-medium">
                  {color.name}
                </span>
              </div>
            ))}
          </div>

          <div className="h-[1px] w-24 bg-amber-200/60 mx-auto my-6" />

          {/* Emotional Heartwarming Quote */}
          <p className="font-serif text-base italic text-amber-700 tracking-wide font-light max-w-lg mx-auto">
            "Sự hiện diện của bạn là món quà tuyệt vời nhất."
          </p>
        </div>
      </section>
    </div>
  );
}
