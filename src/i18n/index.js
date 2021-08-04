import I18n, { getLanguages } from 'react-native-i18n';
import en from './locales/en';
import ar from './locales/ar';

I18n.fallbacks = true;
I18n.translations = {
    ar: ar,
    en: en
};

getLanguages()
    .then(lang => {
        console.log('get languages', lang);
    })
    .catch(er => {
        console.log('get languages error', er);
    })
// export function strings(name, params = {}) {
//     return I18n.t(name, params);
// };

export default I18n;