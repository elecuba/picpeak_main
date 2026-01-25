import React from 'react';
import { useTranslation } from 'react-i18next';
import { Globe } from 'lucide-react';

// SVG Flag Components
const GBFlag: React.FC<{ className?: string }> = ({ className = "w-5 h-5" }) => (
  <svg className={className} viewBox="0 0 640 480" xmlns="http://www.w3.org/2000/svg">
    <path fill="#012169" d="M0 0h640v480H0z"/>
    <path fill="#FFF" d="m75 0 244 181L562 0h78v62L400 241l240 178v61h-80L320 301 81 480H0v-60l239-178L0 64V0h75z"/>
    <path fill="#C8102E" d="m424 281 216 159v40L369 281h55zm-184 20 6 35L54 480H0l240-179zM640 0v3L391 191l2-44L590 0h50zM0 0l239 176h-60L0 42V0z"/>
    <path fill="#FFF" d="M241 0v480h160V0H241zM0 160v160h640V160H0z"/>
    <path fill="#C8102E" d="M0 193v96h640v-96H0zM273 0v480h96V0h-96z"/>
  </svg>
);

const DEFlag: React.FC<{ className?: string }> = ({ className = "w-5 h-5" }) => (
  <svg className={className} viewBox="0 0 640 480" xmlns="http://www.w3.org/2000/svg">
    <path fill="#000" d="M0 0h640v160H0z"/>
    <path fill="#D00" d="M0 160h640v160H0z"/>
    <path fill="#FFCE00" d="M0 320h640v160H0z"/>
  </svg>
);

const PTFlag: React.FC<{ className?: string }> = ({ className = "w-5 h-5" }) => (
  <svg className={className} viewBox="0 0 640 480" xmlns="http://www.w3.org/2000/svg">
    <rect width="640" height="480" fill="#009C3B" />
    <polygon points="320,80 560,240 320,400 80,240" fill="#FFCC29" />
    <circle cx="320" cy="240" r="100" fill="#002776" />
    <path d="M220 240a100 100 0 0 1 200 0" fill="none" stroke="#fff" strokeWidth="10" />
    <text x="320" y="250" textAnchor="middle" fontSize="20" fill="#fff" fontFamily="Arial, sans-serif">
      ORDEM E PROGRESSO
    </text>
  </svg>
);

const languages = [
  { code: 'pt', name: 'Português', Flag: PTFlag },
  { code: 'en', name: 'English', Flag: GBFlag },
  { code: 'de', name: 'Deutsch', Flag: DEFlag },
  // Added Portuguese
];

export const LanguageSelector: React.FC = () => {
  const { i18n } = useTranslation();
  const [isOpen, setIsOpen] = React.useState(false);

  const currentLanguage = languages.find(lang => lang.code === i18n.language) || languages[0];

const handleLanguageChange = (languageCode: string) => {
   // console.log('Mudando para:', languageCode);
    i18n.changeLanguage(languageCode).then(() => {
   // console.log('Idioma agora é:', i18n.language);
   // console.log('i18n resources:', i18n.options.resources);
    
    // Forçar reload da página para garantir re-render
    window.location.reload();
  });
  setIsOpen(false);
};

  return (
    <div className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2 px-3 py-2 text-sm font-medium text-neutral-700 bg-white border border-neutral-300 rounded-lg hover:bg-neutral-50 focus:outline-none focus:ring-2 focus:ring-primary-500"
      >
        <Globe className="w-4 h-4" />
        <currentLanguage.Flag className="w-5 h-5" />
        <span>{currentLanguage.name}</span>
      </button>

      {isOpen && (
        <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg border border-neutral-200 py-1 z-50">
          {languages.map((language) => (
            <button
              key={language.code}
              onClick={() => handleLanguageChange(language.code)}
              className={`w-full text-left px-4 py-2 text-sm hover:bg-neutral-50 flex items-center gap-3 ${
                language.code === i18n.language
                  ? 'text-primary-600 bg-primary-50'
                  : 'text-neutral-700'
              }`}
            >
              <language.Flag className="w-5 h-5" />
              <span>{language.name}</span>
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

LanguageSelector.displayName = 'LanguageSelector';