export const SITE_CONFIG = {
  studioName: "LAWISH FILMS",
  shortName: "LAWISH",
  tagline: "Fine Art & Cinematic Visual Storytelling",
  founder: "Elena Vance & Julian Thorne",
  location: "India",
  email: "atelier@luminastudios.com",
  phoneDisplay: "+1 (917) 555-0198",
  
  // WhatsApp Configuration - Single source of truth
  whatsapp: {
    number: "919895651374", 
    defaultMessage: "Hi Lawish Films, I would like to know more about your photography packages.",
    getLink(customMessage) {
      const msg = encodeURIComponent(customMessage || this.defaultMessage);
      return `https://wa.me/${this.number}?text=${msg}`;
    }
  },

  socials: {
    instagram: "https://www.instagram.com/lawishfilms?utm_source=ig_web_button_share_sheet&stkn=ZDNlZDc0MzIxNw==",
    vimeo: "https://vimeo.com",
    youtube: "https://youtube.com",
    pinterest: "https://pinterest.com"
  },

  stats: [
    { label: "Years of Mastery", value: "12+" },
    { label: "Weddings & Stories", value: "480+" },
    { label: "Global Destinations", value: "34" },
    { label: "Editorial Features", value: "45+" }
  ],

  press: [
    "VOGUE WEDDINGS",
    "HARPER'S BAZAAR",
    "ELLE BRIDE",
    "RANGEFINDER",
    "KINFLOK",
    "CERÉAL MAGAZINE"
  ]
};

export const openWhatsApp = (customMessage) => {
  const url = SITE_CONFIG.whatsapp.getLink(customMessage);
  window.open(url, "_blank", "noopener,noreferrer");
};
