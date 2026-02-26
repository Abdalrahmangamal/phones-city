import React, { useEffect } from 'react';

const TAMARA_WIDGET_SCRIPT_SRC = "https://cdn.tamara.co/widget/product-widget.min.js";
let tamaraScriptPromise: Promise<void> | null = null;

// Declare window interface to avoid TS errors
declare global {
    interface Window {
        TamaraProductWidget: any;
        tamaraAsyncCallback: any;
    }
}

interface TamaraWidgetProps {
    price: number;
    currency: string;
    lang: string;
}

const loadTamaraWidgetScript = (): Promise<void> => {
    if (typeof window === "undefined") {
        return Promise.resolve();
    }

    if (window.TamaraProductWidget) {
        return Promise.resolve();
    }

    if (tamaraScriptPromise) {
        return tamaraScriptPromise;
    }

    tamaraScriptPromise = new Promise<void>((resolve, reject) => {
        const existingScript = document.querySelector<HTMLScriptElement>(
            `script[src="${TAMARA_WIDGET_SCRIPT_SRC}"]`
        );

        if (existingScript && window.TamaraProductWidget) {
            resolve();
            return;
        }

        const script = existingScript ?? document.createElement("script");
        script.src = TAMARA_WIDGET_SCRIPT_SRC;
        script.async = true;

        const handleLoad = () => resolve();
        const handleError = () => {
            tamaraScriptPromise = null;
            reject(new Error("Failed to load Tamara widget script"));
        };

        script.addEventListener("load", handleLoad, { once: true });
        script.addEventListener("error", handleError, { once: true });

        if (!existingScript) {
            document.body.appendChild(script);
        }
    });

    return tamaraScriptPromise;
};

const TamaraWidget: React.FC<TamaraWidgetProps> = ({ price, currency, lang }) => {
    useEffect(() => {
        let cancelled = false;

        loadTamaraWidgetScript()
            .then(() => {
                if (cancelled || !window.TamaraProductWidget) {
                    return;
                }

                window.TamaraProductWidget.init({ lang });
                window.TamaraProductWidget.render();
            })
            .catch(() => {
                // Ignore script load errors to avoid breaking the product page UI.
            });

        return () => {
            cancelled = true;
        };
    }, [price, lang, currency]);

    return (
        <div
            className="tamara-product-widget"
            data-lang={lang}
            data-price={price}
            data-currency={currency}
            data-payment-type="installment"
            data-disable-installment="false"
            data-disable-paylater="true"
            data-installment-minimum-amount="99"
            data-installment-maximum-amount="3000"
        ></div>
    );
};

export default TamaraWidget;
