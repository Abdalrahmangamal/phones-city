import React, { useEffect } from 'react';

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

const TamaraWidget: React.FC<TamaraWidgetProps> = ({ price, currency, lang }) => {
    useEffect(() => {
        // Check if script is loaded and available
        if (window.TamaraProductWidget) {
            // Re-initialize and render when props change
            window.TamaraProductWidget.init({ lang: lang });
            window.TamaraProductWidget.render();
        }
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
