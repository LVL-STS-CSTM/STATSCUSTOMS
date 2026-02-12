
import React from 'react';
import { ICON_ASSETS } from '../constants/iconAssets';

interface IconProps {
  className?: string;
}

/**
 * @description A generic component for rendering image-based icons (PNG/JPG/etc)
 */
export const ImageIcon: React.FC<IconProps & { src: string, alt: string }> = ({ className = "w-6 h-6", src, alt }) => (
    <img 
        src={src} 
        alt={alt} 
        className={`${className} object-contain transition-all duration-300`} 
        onError={(e) => {
            // Fallback: hides broken icons if the image isn't found in public folder yet
            (e.target as HTMLImageElement).style.opacity = '0';
        }}
    />
);

// --- Image-based Social Icons (Wrappers for the Registry) ---

export const FacebookImgIcon: React.FC<IconProps> = (props) => (
    <ImageIcon {...props} src={ICON_ASSETS.social.facebook} alt="Facebook" />
);

export const InstagramImgIcon: React.FC<IconProps> = (props) => (
    <ImageIcon {...props} src={ICON_ASSETS.social.instagram} alt="Instagram" />
);

export const ThreadsImgIcon: React.FC<IconProps> = (props) => (
    <ImageIcon {...props} src={ICON_ASSETS.social.threads} alt="Threads" />
);

export const TiktokImgIcon: React.FC<IconProps> = (props) => (
    <ImageIcon {...props} src={ICON_ASSETS.social.tiktok} alt="Tiktok" />
);

export const LinkedinImgIcon: React.FC<IconProps> = (props) => (
    <ImageIcon {...props} src={ICON_ASSETS.social.linkedin} alt="LinkedIn" />
);

export const MailImgIcon: React.FC<IconProps> = (props) => (
    <ImageIcon {...props} src={ICON_ASSETS.social.mail} alt="Email" />
);

// --- SVG Social Icons (Simplified Glyphs) ---

export const FacebookIcon: React.FC<IconProps> = ({ className = "w-6 h-6" }) => (
  <svg
    className={className}
    viewBox="0 0 24 24"
    fill="currentColor"
    aria-hidden="true"
  >
    <path d="M13.5 9H16l.5-3h-3V4.75c0-.87.24-1.5 1.75-1.5H16V0h-2.25C10.57 0 9 1.57 9 3.75V6H6v3h3v15h4.5V9z" />
  </svg>
);

export const InstagramIcon: React.FC<IconProps> = ({ className = "w-6 h-6" }) => (
  <svg
    className={className}
    viewBox="0 0 24 24"
    fill="currentColor"
    aria-hidden="true"
  >
    <path d="M7 2C4.24 2 2 4.24 2 7v10c0 2.76 2.24 5 5 5h10c2.76 0 5-2.24 5-5V7c0-2.76-2.24-5-5-5H7zm10 2c1.66 0 3 1.34 3 3v10c0 1.66-1.34 3-3 3H7c-1.66 0-3-1.34-3-3V7c0-1.66 1.34-3 3-3h10zM12 7a5 5 0 100 10 5 5 0 000-10zm0 8a3 3 0 110-6 3 3 0 010 6zm4.5-8.75a1.25 1.25 0 100 2.5 1.25 1.25 0 000-2.5z" />
  </svg>
);

export const ThreadsIcon: React.FC<IconProps> = ({ className = "w-6 h-6" }) => (
  <svg
    className={className}
    viewBox="0 0 24 24"
    fill="currentColor"
    aria-hidden="true"
  >
    <path d="M12.0003 6.13604C8.75027 6.13604 6.13604 8.75027 6.13604 12C6.13604 15.2497 8.75027 17.8639 12.0003 17.8639C13.626 17.8639 15.097 17.2023 16.1627 16.1332L17.2829 17.2534C15.897 18.6393 14.0322 19.4678 12.0003 19.4678C7.86877 19.4678 4.53232 16.1313 4.53232 12C4.53232 7.86877 7.86877 4.53232 12.0003 4.53232C16.1319 4.53232 19.4683 7.86877 19.4683 12V13.6366C19.4683 14.5422 18.7369 15.2736 17.8314 15.2736C16.9258 15.2736 16.1944 14.5422 16.1944 13.6366V12C16.1944 9.67936 14.3209 7.80587 12.0003 7.80587C9.67969 7.80587 7.8062 9.67936 7.8062 12C7.8062 14.3207 9.67969 16.1942 12.0003 16.1942C13.2505 16.1942 14.3725 15.6322 15.1328 14.7397C15.5898 16.0395 16.8285 16.8775 18.1772 16.8775C19.9701 16.8775 21.4683 15.3794 21.4683 13.5865V12C21.4683 6.76569 17.2346 2.53204 12.0003 2.53204C6.76602 2.53204 2.53232 6.76569 2.53232 12C2.53232 17.2343 6.76602 21.468 12.0003 21.468C14.1205 21.468 16.0827 20.7675 17.6593 19.5878L16.5947 18.1587C15.3093 19.1171 13.7225 19.6641 12.0003 19.6641C7.76662 19.6641 4.33621 16.2337 4.33621 12C4.33621 7.76633 7.76662 4.33593 12.0003 4.33593C16.234 4.33593 19.6644 7.76633 19.6644 12V13.5865C19.6644 14.4079 18.9959 15.0764 18.1745 15.0764C17.3531 15.0764 16.6846 14.4079 16.6846 13.5865V12C16.6846 9.41477 14.5855 7.31566 12.0003 7.31566C9.41505 7.31566 7.31599 9.41477 7.31599 12C7.31599 14.5853 9.41505 16.6844 12.0003 16.6844C13.5772 16.6844 14.9813 15.9032 15.8277 14.717C15.8329 14.7101 15.838 14.7032 15.8431 14.6963C15.9392 14.5662 16.027 14.4307 16.1064 14.2907C16.1678 14.1824 16.2239 14.071 16.2745 13.957C16.3292 13.8335 16.3777 13.7077 16.4199 13.5798C16.4385 13.5234 16.4558 13.4665 16.4717 13.4091C16.5293 13.2014 16.5677 12.9868 16.5819 12.7667C16.5861 12.7013 16.5882 12.6354 16.5882 12.5691V12C16.5882 12 16.5882 12 16.5882 12ZM12.0003 9.29219C13.4952 9.29219 14.7079 10.5049 14.7079 12C14.7079 13.4951 13.4952 14.7078 12.0003 14.7078C10.5054 14.7078 9.29272 13.4951 9.29272 12C9.29272 10.5049 10.5054 9.29219 12.0003 9.29219Z" />
  </svg>
);

export const TiktokIcon: React.FC<IconProps> = ({ className = "w-6 h-6" }) => (
  <svg
    className={className}
    viewBox="0 0 24 24"
    fill="currentColor"
    aria-hidden="true"
  >
    <path d="M15 2h3a5 5 0 005 5v3a8 8 0 01-5-1.7V15a7 7 0 11-7-7v3a4 4 0 104 4V2z" />
  </svg>
);

export const LinkedinIcon: React.FC<IconProps> = ({ className = "w-6 h-6" }) => (
  <svg className={className} fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
    <path d="M18.336 18.339h-2.665v-4.177c0-0.996-0.017-2.278-1.387-2.278-1.389 0-1.601 1.086-1.601 2.206v4.249h-2.667v-8.59h2.559v1.174h0.036c0.356-0.675 1.227-1.387 2.526-1.387 2.703 0 3.203 1.779 3.203 4.092v4.711zM5.337 8.533c-0.855 0-1.548-0.694-1.548-1.548 0-0.855 0.693-1.548 1.548-1.548 0.856 0 1.549 0.694 1.549 1.548 0 0.855-0.693 1.548-1.549 1.548zM6.67 18.339h-2.667v-8.59h2.667v8.59z" />
  </svg>
);

export const MailIcon: React.FC<IconProps> = ({ className = "w-6 h-6" }) => (
  <svg className={className} fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24" aria-hidden="true">
    <path d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
  </svg>
);


// --- Misc Brand Icons ---

export const YouTubeIcon: React.FC<IconProps> = ({ className = "w-6 h-6" }) => (
    <svg className={className} fill="currentColor" viewBox="0 0 576 512">
        <path d="M549.655 124.083c-6.281-23.65-24.787-42.276-48.284-48.597C458.781 64 288 64 288 64S117.22 64 74.629 75.486c-23.497 6.322-42.003 24.947-48.284 48.597-11.412 42.867-11.412 132.305-11.412 132.305s0 89.438 11.412 132.305c6.281 23.65 24.787 42.276 48.284 48.597C117.22 448 288 448 288 448s170.78 0 213.371-11.486c23.497-6.322 42.003-24.947 48.284-48.597 11.412-42.867 11.412-132.305 11.412-132.305s0-89.438-11.412-132.305zM232.615 354.433V157.567L384.615 256l-152 98.433z" />
    </svg>
);

export const YelpIcon: React.FC<IconProps> = ({ className = "w-5 h-5" }) => (
    <svg className={className} fill="currentColor" viewBox="0 0 24 24">
        <path d="M11.39 2.1l-2.2 4.96-5.32.42c-.52.04-.73.7-.35 1.05l4.08 3.55-1.2 5.25c-.12.51.44.93.89.65l4.52-2.76 4.52 2.76c.45.28 1.01-.14.89-.65l-1.2-5.25 4.08-3.55c.38-.35.17-1.01-.35-1.05l-5.32-.42-2.2-4.96c-.24-.51-.94-.51-1.18 0z" />
    </svg>
);

export const TrustpilotIcon: React.FC<IconProps> = ({ className = "w-5 h-5" }) => (
    <svg className={className} fill="currentColor" viewBox="0 0 24 24">
        <path d="M22.45,8.28l-6.53-0.23L12.8,2.06c-0.3-0.6-1.3-0.6-1.6,0L8.08,8.05L1.55,8.28c-0.69,0.02-0.97,0.89-0.47,1.33 l5.04,4.1L4.29,20.1c-0.16,0.68,0.56,1.25,1.17,0.89L12,17.41l6.54,3.58c0.61,0.36,1.34-0.21,1.17-0.89l-1.83-6.38l5.04-4.1 C23.42,9.17,23.14,8.3,22.45,8.28z" />
    </svg>
);

export const GoogleGIcon: React.FC<IconProps> = ({ className = "w-5 h-5" }) => (
    <svg className={className} viewBox="0 0 24 24">
        <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4" />
        <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853" />
        <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l3.66-2.84z" fill="#FBBC05" />
        <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335" />
    </svg>
);

// --- UI / Action Icons (Consistent Stroke Style) ---

export const SearchIcon: React.FC<IconProps> = ({ className = "w-6 h-6" }) => (
    <svg className={className} fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24">
        <circle cx="11" cy="11" r="8" />
        <line x1="21" y1="21" x2="16.65" y2="16.65" />
    </svg>
);

export const UserIcon: React.FC<IconProps> = ({ className = "w-6 h-6" }) => (
    <svg className={className} fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24">
        <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
        <circle cx="12" cy="7" r="4" />
    </svg>
);

export const CartIcon: React.FC<IconProps> = ({ className = "w-6 h-6" }) => (
    <svg className={className} fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24">
        <circle cx="9" cy="21" r="1" />
        <circle cx="20" cy="21" r="1" />
        <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6" />
    </svg>
);

export const MenuIcon: React.FC<IconProps> = ({ className = "w-7 h-7" }) => (
    <svg className={className} fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24">
        <line x1="3" y1="12" x2="21" y2="12" />
        <line x1="3" y1="6" x2="21" y2="6" />
        <line x1="3" y1="18" x2="21" y2="18" />
    </svg>
);

export const CloseIcon: React.FC<IconProps> = ({ className = "w-6 h-6" }) => (
    <svg className={className} fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24">
        <line x1="18" y1="6" x2="6" y2="18" />
        <line x1="6" y1="6" x2="18" y2="18" />
    </svg>
);

export const PlusIcon: React.FC<IconProps> = ({ className = "w-6 h-6" }) => (
    <svg className={className} fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24">
        <line x1="12" y1="5" x2="12" y2="19" />
        <line x1="5" y1="12" x2="19" y2="12" />
    </svg>
);

export const MinusIcon: React.FC<IconProps> = ({ className = "w-6 h-6" }) => (
    <svg className={className} fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24">
        <line x1="5" y1="12" x2="19" y2="12" />
    </svg>
);

export const TrashIcon: React.FC<IconProps> = ({ className = "w-6 h-6" }) => (
    <svg className={className} fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24">
        <polyline points="3 6 5 6 21 6" />
        <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2" />
        <line x1="10" y1="11" x2="10" y2="17" />
        <line x1="14" y1="11" x2="14" y2="17" />
    </svg>
);

export const ChevronDownIcon: React.FC<IconProps> = ({ className = "w-5 h-5" }) => (
    <svg className={className} fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24">
        <polyline points="6 9 12 15 18 9" />
    </svg>
);

export const PhoneIcon: React.FC<IconProps> = ({ className = "w-6 h-6" }) => (
    <svg className={className} fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24">
        <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
    </svg>
);

export const LocationPinIcon: React.FC<IconProps> = ({ className = "w-6 h-6" }) => (
    <svg className={className} fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24">
        <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
        <circle cx="12" cy="10" r="3" />
    </svg>
);

export const ClockIcon: React.FC<IconProps> = ({ className = "w-6 h-6" }) => (
    <svg className={className} fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24">
        <circle cx="12" cy="12" r="10" />
        <polyline points="12 6 12 12 16 14" />
    </svg>
);

export const SparklesIcon: React.FC<IconProps> = ({ className = "w-6 h-6" }) => (
    <svg className={className} fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24">
        <path d="M12 3v3m0 12v3M5.31 5.31l2.12 2.12m9.14 9.14l2.12 2.12M3 12h3m12 0h3M5.31 18.69l2.12-2.12m9.14-9.14l2.12-2.12" />
        <path d="M12 8a4 4 0 1 0 0 8 4 4 0 0 0 0-8z" />
    </svg>
);

export const SendIcon: React.FC<IconProps> = ({ className = "w-6 h-6" }) => (
    <svg className={className} fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24">
        <line x1="22" y1="2" x2="11" y2="13" />
        <polygon points="22 2 15 22 11 13 2 9 22 2" />
    </svg>
);

export const ChatIcon: React.FC<IconProps> = ({ className = "w-6 h-6" }) => (
    <svg className={className} fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24">
        <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
    </svg>
);

export const FilterIcon: React.FC<IconProps> = ({ className = "w-6 h-6" }) => (
    <svg className={className} fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24">
        <polygon points="22 3 2 3 10 12.46 10 19 14 21 14 12.46 22 3" />
    </svg>
);

export const StarIcon: React.FC<IconProps> = ({ className = "w-5 h-5" }) => (
    <svg className={className} fill="currentColor" viewBox="0 0 24 24">
        <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
    </svg>
);

export const QuoteIcon: React.FC<IconProps> = ({ className = "w-6 h-6" }) => (
    <svg className={className} fill="currentColor" viewBox="0 0 24 24">
        <path d="M6 17h3l2-4V7H5v6h3l-2 4zm8 0h3l2-4V7h-6v6h3l-2 4z" />
    </svg>
);

export const DragHandleIcon: React.FC<IconProps> = ({ className = "w-6 h-6" }) => (
    <svg className={className} fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24">
        <circle cx="9" cy="5" r="1" />
        <circle cx="9" cy="12" r="1" />
        <circle cx="9" cy="19" r="1" />
        <circle cx="15" cy="5" r="1" />
        <circle cx="15" cy="12" r="1" />
        <circle cx="15" cy="19" r="1" />
    </svg>
);

export const ViewGridSmallIcon: React.FC<IconProps> = ({ className = "w-5 h-5" }) => (
    <svg className={className} fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24">
        <rect x="3" y="3" width="7" height="7" />
        <rect x="14" y="3" width="7" height="7" />
        <rect x="14" y="14" width="7" height="7" />
        <rect x="3" y="14" width="7" height="7" />
    </svg>
);

export const ViewGridLargeIcon: React.FC<IconProps> = ({ className = "w-5 h-5" }) => (
    <svg className={className} fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24">
        <rect x="3" y="3" width="18" height="18" rx="2" />
    </svg>
);

// --- Strategic Service Icons (Custom Vector Artwork) ---

export const DesignIcon: React.FC<IconProps> = ({ className = "w-8 h-8" }) => (
    <svg className={className} fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24">
        <path d="M12 19l7-7 3 3-7 7-3-3z" />
        <path d="M18 13l-1.5-7.5L2 2l3.5 14.5L13 18l5-5z" />
        <path d="M2 2l7.586 7.586" />
        <circle cx="11" cy="11" r="2" />
    </svg>
);

export const ProductionIcon: React.FC<IconProps> = ({ className = "w-8 h-8" }) => (
    <svg className={className} fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24">
        <path d="M20 16V8a2 2 0 0 0-2-2H6a2 2 0 0 0-2 2v8" />
        <path d="M4 16c1.1 0 2 1.2 2 2.5S5.1 21 4 21" />
        <path d="M20 16c-1.1 0-2 1.2-2 2.5s.9 2.5 2 2.5" />
        <path d="M12 22v-6" />
        <path d="M8 12h8" />
        <path d="M10 8l2 2 2-2" />
    </svg>
);

export const LogisticsIcon: React.FC<IconProps> = ({ className = "w-8 h-8" }) => (
    <svg className={className} fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24">
        <rect x="1" y="3" width="15" height="13" />
        <polygon points="16 8 20 8 23 11 23 16 16 16 16 8" />
        <circle cx="5.5" cy="18.5" r="2.5" />
        <circle cx="18.5" cy="18.5" r="2.5" />
    </svg>
);

export const BriefcaseIcon: React.FC<IconProps> = ({ className = "w-8 h-8" }) => (
    <svg className={className} fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24">
        <rect x="2" y="7" width="20" height="14" rx="2" ry="2" />
        <path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16" />
    </svg>
);

export const SustainabilityIcon: React.FC<IconProps> = ({ className = "w-8 h-8" }) => (
    <svg className={className} fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24">
        <path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z" />
        <path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z" />
    </svg>
);

export const SampleTestingIcon: React.FC<IconProps> = ({ className = "w-8 h-8" }) => (
    <svg className={className} fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24">
        <path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z" />
    </svg>
);

export const EyeIcon: React.FC<IconProps> = ({ className = "w-8 h-8" }) => (
    <svg className={className} fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24">
        <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
        <circle cx="12" cy="12" r="3" />
    </svg>
);

export const EyeOffIcon: React.FC<IconProps> = ({ className = "w-8 h-8" }) => (
    <svg className={className} fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24">
        <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24" />
        <line x1="1" y1="1" x2="23" y2="23" />
    </svg>
);

export const PackagingIcon: React.FC<IconProps> = ({ className = "w-8 h-8" }) => (
    <svg className={className} fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24">
        <polyline points="21 8 21 21 3 21 3 8" />
        <rect x="1" y="3" width="22" height="5" />
        <line x1="10" y1="12" x2="14" y2="12" />
    </svg>
);

export const PrintingIcon: React.FC<IconProps> = ({ className = "w-8 h-8" }) => (
    <svg className={className} fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24">
        <polyline points="6 9 6 2 18 2 18 9" />
        <path d="M6 18H4a2 2 0 0 1-2-2v-5a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v5a2 2 0 0 1-2 2h-2" />
        <rect x="6" y="14" width="12" height="8" />
    </svg>
);

export const TargetIcon: React.FC<IconProps> = ({ className = "w-8 h-8" }) => (
    <svg className={className} fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24">
        <circle cx="12" cy="12" r="10" />
        <circle cx="12" cy="12" r="6" />
        <circle cx="12" cy="12" r="2" />
    </svg>
);

// --- Rich Text Editor Specifics ---

export const BoldIcon: React.FC<IconProps> = ({ className = "w-5 h-5" }) => (
    <svg className={className} fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24">
        <path d="M6 4h8a4 4 0 0 1 4 4 4 4 0 0 1-4 4H6z" />
        <path d="M6 12h9a4 4 0 0 1 4 4 4 4 0 0 1-4 4H6z" />
    </svg>
);

export const ItalicIcon: React.FC<IconProps> = ({ className = "w-5 h-5" }) => (
    <svg className={className} fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24">
        <line x1="19" y1="4" x2="10" y2="4" />
        <line x1="14" y1="20" x2="5" y2="20" />
        <line x1="15" y1="4" x2="9" y2="20" />
    </svg>
);

export const UnderlineIcon: React.FC<IconProps> = ({ className = "w-5 h-5" }) => (
    <svg className={className} fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24">
        <path d="M6 3v7a6 6 0 0 0 6 6 6 6 0 0 0 6-6V3" />
        <line x1="4" y1="21" x2="20" y2="21" />
    </svg>
);

export const ListIcon: React.FC<IconProps> = ({ className = "w-5 h-5" }) => (
    <svg className={className} fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24">
        <line x1="8" y1="6" x2="21" y2="6" />
        <line x1="8" y1="12" x2="21" y2="12" />
        <line x1="8" y1="18" x2="21" y2="18" />
        <line x1="3" y1="6" x2="3.01" y2="6" />
        <line x1="3" y1="12" x2="3.01" y2="12" />
        <line x1="3" y1="18" x2="3.01" y2="18" />
    </svg>
);

export const LinkIcon: React.FC<IconProps> = ({ className = "w-5 h-5" }) => (
    <svg className={className} fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24">
        <path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71" />
        <path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71" />
    </svg>
);

// --- New Icons ---

export const RulerIcon: React.FC<IconProps> = ({ className = "w-6 h-6" }) => (
    <svg className={className} fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24">
        <path d="M2 12h20" />
        <path d="M2 12v6a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2v-6" />
        <path d="M2 12V6a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v6" />
        <path d="M6 12v4" />
        <path d="M10 12v2" />
        <path d="M14 12v4" />
        <path d="M18 12v2" />
    </svg>
);

export const ArrowLongRightIcon: React.FC<IconProps> = ({ className = "w-6 h-6" }) => (
    <svg className={className} fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24">
        <path d="M17.25 8.25L21 12m0 0l-3.75 3.75M21 12H3" />
    </svg>
);
