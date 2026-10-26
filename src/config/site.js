/**
 * Syncora studio configuration.
 *
 * Contact email used by every enquiry link and the contact form.
 */
export const CONTACT_EMAIL = 'syncora2415@gmail.com';

/**
 * Direct studio WhatsApp phone number (international format with country code).
 */
export const WHATSAPP_PHONE = '919310293478';

/**
 * Direct WhatsApp click-to-chat URL with default enquiry message.
 */
export const WHATSAPP_URL = `https://wa.me/${WHATSAPP_PHONE}?text=${encodeURIComponent(
  'Hi Syncora, I would like to discuss a web project.',
)}`;

/**
 * Syncora on Instagram.
 */
export const INSTAGRAM_HANDLE = '@syncora.26';
export const INSTAGRAM_URL = 'https://www.instagram.com/syncora.26/';

/**
 * The published URL of the live Atelier Noir website.
 *
 * IMPORTANT: this must be the confirmed public address, including https://.
 * Do not use a localhost/development URL here. Leave the value empty until the
 * live address is known — the portfolio UI will hide the live-site button
 * rather than linking somewhere unverified. The "Link pending" status in the
 * project details tells you when it still needs to be set.
 *
 * Confirmed published address: the Atelier Noir project's Vercel production
 * deployment (verified responding 200 with its sitemap and canonical tags on
 * this domain). The older freebuff.page deployment is kept as a fallback note
 * in the project's README.
 */
export const ATELIER_NOIR_URL = 'https://atelier-noir-ashy.vercel.app';

/**
 * The published URL of the live ClayKraft website (handmade clay toys shop).
 *
 * Same rule as above: a confirmed public https:// address only, never a
 * localhost development URL. The portfolio UI hides the live-site button when
 * this value is empty. Verified responding 200 with its shop page and title
 * tag on this domain.
 */
export const CLAYKRAFT_URL = 'https://claykraft.netlify.app';
