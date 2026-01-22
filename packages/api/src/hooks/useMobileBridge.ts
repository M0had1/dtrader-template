import { useCallback, useMemo } from 'react';

export const useMobileBridge = () => {
    // Check if app is loaded from mobile app via query parameter or sessionStorage
    // Store in sessionStorage to persist even if query params are removed from URL
    const isMobileApp = useMemo(() => {
        const STORAGE_KEY = 'is_mobile_app';

        // Check sessionStorage first (persists if URL params are removed)
        const storedValue = sessionStorage.getItem(STORAGE_KEY);
        if (storedValue === 'true') {
            return true;
        }

        // Check query parameter (on first load)
        const params = new URLSearchParams(window.location.search);
        const paramValue = params.get('is_mobile_app');
        const isMobile = paramValue === 'true';

        // Store in sessionStorage for future use
        if (isMobile) {
            sessionStorage.setItem(STORAGE_KEY, 'true');
        }

        return isMobile;
    }, []);

    // Bridge is available if query param indicates mobile app
    const isBridgeAvailable = isMobileApp;

    type EventName =
        | 'trading:config'
        | 'trading:ready'
        | 'trading:back'
        | 'trading:home'
        | 'trading:transfer'
        | 'trading:account_creation';

    type SendBridgeEventFn = {
        (event: EventName): Promise<boolean>;
        (event: EventName, data: TradingConfigData): Promise<boolean>;
        (event: EventName, fallback: () => void | Promise<void>): Promise<boolean>;
        (event: EventName, data: TradingConfigData, fallback: () => void | Promise<void>): Promise<boolean>;
    };

    const sendBridgeEvent = useCallback(
        async (
            event: EventName,
            dataOrFallback?: TradingConfigData | (() => void | Promise<void>),
            fallback?: () => void | Promise<void>
        ) => {
            // Determine if second parameter is data or fallback
            let data: TradingConfigData | undefined, actualFallback: (() => void | Promise<void>) | undefined;

            if (typeof dataOrFallback === 'function') {
                // Second parameter is fallback
                actualFallback = dataOrFallback;
            } else {
                // Second parameter is data
                data = dataOrFallback;
                actualFallback = fallback;
            }

            try {
                if (isBridgeAvailable && window.DerivAppChannel?.postMessage) {
                    const message: DerivAppChannelMessage = { event };
                    // Include data if provided (e.g., { lang: "EN", theme: "dark" })
                    if (data) {
                        message.data = data;
                    }
                    window.DerivAppChannel.postMessage(JSON.stringify(message));
                    return true; // Successfully sent via bridge
                } else if (actualFallback) {
                    await actualFallback();
                    return true; // Successfully executed fallback
                }
                return false; // No action taken
            } catch (error) {
                // eslint-disable-next-line no-console
                console.error('Failed to send bridge message:', error);
                // Execute fallback on error
                if (actualFallback) {
                    try {
                        await actualFallback();
                        return true; // Fallback executed successfully
                    } catch (fallbackError) {
                        // eslint-disable-next-line no-console
                        console.error('Fallback execution failed:', fallbackError);
                        return false;
                    }
                }
                return false;
            }
        },
        [isBridgeAvailable]
    ) as SendBridgeEventFn;

    return {
        sendBridgeEvent,
        isBridgeAvailable,
    };
};
