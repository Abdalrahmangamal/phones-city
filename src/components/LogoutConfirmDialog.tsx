import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogDescription,
    DialogFooter,
} from "@/components/ui/dialog";
import { LogOut } from "lucide-react";

interface LogoutConfirmDialogProps {
    open: boolean;
    onOpenChange: (open: boolean) => void;
    onConfirm: () => void;
    lang: string;
}

export default function LogoutConfirmDialog({
    open,
    onOpenChange,
    onConfirm,
    lang,
}: LogoutConfirmDialogProps) {
    const isAr = lang === "ar";

    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent
                showCloseButton={false}
                className="sm:max-w-[400px] p-0 overflow-hidden border-0 rounded-2xl shadow-2xl"
                dir={isAr ? "rtl" : "ltr"}
            >
                {/* Top accent bar */}
                <div className="h-1.5 w-full bg-gradient-to-r from-red-400 via-red-500 to-orange-400" />

                <div className="px-6 pt-6 pb-2 flex flex-col items-center text-center">
                    {/* Icon */}
                    <div className="w-16 h-16 rounded-full bg-red-50 flex items-center justify-center mb-4 ring-4 ring-red-100">
                        <LogOut className="h-7 w-7 text-red-500" />
                    </div>

                    <DialogHeader className="items-center">
                        <DialogTitle className="text-xl font-bold text-[#211C4D]">
                            {isAr ? "تسجيل الخروج" : "Log Out"}
                        </DialogTitle>
                        <DialogDescription className="text-gray-500 text-sm mt-2 leading-relaxed max-w-[280px]">
                            {isAr
                                ? "هل أنت متأكد أنك تريد تسجيل الخروج من حسابك؟"
                                : "Are you sure you want to log out of your account?"}
                        </DialogDescription>
                    </DialogHeader>
                </div>

                <DialogFooter className="px-6 pb-6 pt-2 flex-col gap-3 sm:flex-col">
                    <button
                        onClick={() => {
                            onConfirm();
                            onOpenChange(false);
                        }}
                        className="w-full h-12 rounded-xl bg-red-500 text-white font-semibold text-base hover:bg-red-600 active:scale-[0.98] transition-all duration-150 flex items-center justify-center gap-2 shadow-sm"
                    >
                        <LogOut className="h-5 w-5" />
                        {isAr ? "نعم، سجل خروج" : "Yes, Log Out"}
                    </button>
                    <button
                        onClick={() => onOpenChange(false)}
                        className="w-full h-12 rounded-xl bg-gray-100 text-[#211C4D] font-semibold text-base hover:bg-gray-200 active:scale-[0.98] transition-all duration-150"
                    >
                        {isAr ? "إلغاء" : "Cancel"}
                    </button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
}
