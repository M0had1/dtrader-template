import { getBrandUrl, getPlatformHostname } from '../brand';

export const redirectToLogin = (language?: string) => {
    const brandUrl = getBrandUrl();
    const platformHostname = getPlatformHostname();
    const lang_param = language ? `?lang=${encodeURIComponent(language)}` : '';
    const redirect_param = `${lang_param ? '&' : '?'}redirect=${encodeURIComponent(platformHostname)}`;

    window.location.href = `${brandUrl}/login${lang_param}${redirect_param}`;
};

export const redirectToSignUp = (language?: string) => {
    const brandUrl = getBrandUrl();
    const lang_param = language ? `?lang=${encodeURIComponent(language)}` : '';

    window.location.href = `${brandUrl}/signup${lang_param}`;
};
