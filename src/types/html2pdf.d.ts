declare module 'html2pdf.js' {
    interface Html2PdfOptions {
        margin?: number | number[];
        filename?: string;
        image?: { type?: string; quality?: number };
        html2canvas?: { scale?: number; useCORS?: boolean;[key: string]: any };
        jsPDF?: { unit?: string; format?: string; orientation?: string;[key: string]: any };
        [key: string]: any;
    }

    interface Html2PdfInstance {
        set(options: Html2PdfOptions): Html2PdfInstance;
        from(element: HTMLElement | string): Html2PdfInstance;
        toContainer(): Html2PdfInstance;
        toCanvas(): Html2PdfInstance;
        toImg(): Html2PdfInstance;
        toPdf(): Html2PdfInstance;
        save(): Promise<void>;
        output(type: 'blob'): Promise<Blob>;
        output(type: 'datauristring'): Promise<string>;
        output(type?: string): Promise<any>;
        then(callback: (value: any) => any): Promise<any>;
    }

    function html2pdf(): Html2PdfInstance;
    export default html2pdf;
}
