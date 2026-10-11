import { useBooking } from '../context/BookingContext';
import { firm, whatsappLink } from '../data/content';
import Icon from './Icon';

const seg =
  'flex min-h-12 items-center justify-center gap-1.5 rounded-full text-[15px] font-semibold transition-transform active:scale-[0.97]';

// Thumb-reach actions on phones: talk to a person or book, from any page.
export default function ActionDock() {
  const { openBooking } = useBooking();

  return (
    <div
      className="fixed inset-x-0 bottom-0 z-40 border-t border-[var(--color-line)] bg-[var(--color-glaze)]/95 px-3 pt-2.5 backdrop-blur-md supports-[backdrop-filter]:bg-[var(--color-glaze)]/85 lg:hidden"
      style={{ paddingBottom: 'max(0.625rem, env(safe-area-inset-bottom))' }}
    >
      <div className="mx-auto grid max-w-xl grid-cols-3 gap-2">
        <a href={firm.phoneHref} className={`${seg} bg-[var(--color-turq)] text-[var(--color-ink)]`}>
          <Icon name="phone" className="h-5 w-5" />
          Call
        </a>
        <a href={whatsappLink()} target="_blank" rel="noopener" className={`${seg} bg-[var(--color-ink)] text-white`}>
          <Icon name="whatsapp" className="h-5 w-5" />
          WhatsApp
        </a>
        <button type="button" onClick={() => openBooking(null)} className={`${seg} bg-[var(--color-cobalt)] text-white`}>
          <Icon name="calendar" className="h-5 w-5" />
          Book
        </button>
      </div>
    </div>
  );
}
