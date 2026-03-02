// Checkout.tsx
"use client";

import React, { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { toast } from "react-toastify";
import { useLocation, useNavigate } from "react-router-dom";
import order from "@/assets/images/order.png";
import step2 from "@/assets/images/step2.png";
import step3 from "@/assets/images/step3.png";
import Checkoutsummary from "@/components/checkout/Checkoutsummary";
import Checkoutaddress from "@/components/checkout/Checkoutaddress";
import Checkoutpayment from "@/components/checkout/Checkoutpayment";
import Layout from "@/components/layout/Layout";
import { useCartStore } from '@/store/cartStore/cartStore';
import { useTranslation } from "react-i18next";
import axiosClient from "@/api/axiosClient";
import { useAddressStore } from '@/store/profile/indexStore';
import { Package, Home, ShoppingBag } from "lucide-react";
import BankTransferModal from "@/components/checkout/payment/BankTransferModal";
import { SaudiRiyalIcon } from "@/components/common/SaudiRiyalIcon";

const PENDING_PAYMENT_CART_SNAPSHOT_KEY = "pending_payment_cart_snapshot_v1";
const PENDING_PAYMENT_CART_META_KEY = "pending_payment_cart_meta_v1";
const PENDING_PAYMENT_CART_TTL_MS = 15 * 60 * 1000;
const PAYMENT_STATUS_RETRY_ATTEMPTS = 5;
const PAYMENT_STATUS_RETRY_INTERVAL_MS = 2000;
const MAX_ORDER_LOOKUP_PAGES = 3;

type PendingCartSnapshotItem = {
  id: number;
  quantity: number;
  isOption: boolean;
};

type PendingPaymentMeta = {
  createdAt: number;
  orderNumber: string | null;
  orderId: number | null;
  paymentMethodId: number | null;
  restoreAttempts: number;
};

type GatewayReturnContext = {
  hasGatewaySignal: boolean;
  statusHint: "success" | "failed" | "pending" | null;
  orderNumber: string | null;
  orderId: number | null;
};

const FINALIZED_PAYMENT_STATUSES = new Set([
  "paid",
  "captured",
  "authorized",
  "completed",
  "success",
  "succeeded",
  "settled",
]);
const FAILED_PAYMENT_STATUSES = new Set([
  "failed",
  "failure",
  "cancelled",
  "canceled",
  "declined",
  "expired",
  "voided",
  "error",
]);
const FINALIZED_ORDER_STATUSES = new Set(["completed"]);
const FAILED_ORDER_STATUSES = new Set(["cancelled", "canceled", "failed"]);
const EXTERNAL_PAYMENT_METHOD_IDS = new Set([1, 2, 3, 4, 5, 6, 7]);
const GATEWAY_QUERY_STATUS_KEYS = [
  "status",
  "payment_status",
  "paymentStatus",
  "result",
  "payment_result",
  "success",
  "is_success",
];
const GATEWAY_QUERY_ORDER_KEYS = [
  "order_number",
  "orderNumber",
  "merchant_reference_id",
  "merchant_reference",
  "reference",
  "reference_id",
  "invoice_id",
];
const GATEWAY_QUERY_ORDER_ID_KEYS = [
  "order_id",
  "orderId",
  "merchant_order_id",
  "payment_order_id",
];
const GATEWAY_QUERY_HINT_KEYS = [
  ...GATEWAY_QUERY_STATUS_KEYS,
  ...GATEWAY_QUERY_ORDER_KEYS,
  ...GATEWAY_QUERY_ORDER_ID_KEYS,
  "tap_id",
  "tap_order_id",
  "tabby_payment_id",
  "tabby_checkout_id",
  "payment_id",
  "checkout_id",
  "transaction_id",
  "redirect_status",
  "gateway",
];

const normalizeStatusValue = (value: unknown) =>
  String(value ?? "").toLowerCase().trim();

const parseNumericId = (value: unknown): number | null => {
  const parsed = Number(value);
  return Number.isFinite(parsed) && parsed > 0 ? parsed : null;
};

const isPaymentFinalized = (paymentStatus: string, orderStatus: string) =>
  FINALIZED_PAYMENT_STATUSES.has(paymentStatus) ||
  FINALIZED_ORDER_STATUSES.has(orderStatus);

const isPaymentFailed = (paymentStatus: string, orderStatus: string) =>
  FAILED_PAYMENT_STATUSES.has(paymentStatus) ||
  FAILED_ORDER_STATUSES.has(orderStatus);

const sleep = (ms: number) =>
  new Promise<void>((resolve) => {
    window.setTimeout(resolve, ms);
  });

const parseGatewayStatusHint = (value: unknown): GatewayReturnContext["statusHint"] => {
  const normalized = normalizeStatusValue(value);
  if (!normalized) return null;

  if (
    FINALIZED_PAYMENT_STATUSES.has(normalized) ||
    FINALIZED_ORDER_STATUSES.has(normalized) ||
    ["1", "true", "yes", "ok", "success", "succeeded", "paid", "approved"].includes(normalized)
  ) {
    return "success";
  }

  if (
    FAILED_PAYMENT_STATUSES.has(normalized) ||
    FAILED_ORDER_STATUSES.has(normalized) ||
    ["0", "false", "no", "failed", "failure", "declined", "cancelled", "canceled", "error"].includes(normalized)
  ) {
    return "failed";
  }

  if (["pending", "processing", "awaiting_payment", "awaiting_review", "in_progress", "created"].includes(normalized)) {
    return "pending";
  }

  return null;
};

const extractHashParams = (hash: string) => {
  if (!hash) return new URLSearchParams();
  const hashBody = hash.startsWith("#") ? hash.slice(1) : hash;
  const queryPart = hashBody.includes("?") ? hashBody.split("?")[1] : hashBody;
  if (!queryPart || !queryPart.includes("=")) return new URLSearchParams();
  return new URLSearchParams(queryPart);
};

const extractGatewayReturnContext = (
  pathname: string,
  search: string,
  hash: string
): GatewayReturnContext => {
  const searchParams = new URLSearchParams(search);
  const hashParams = extractHashParams(hash);

  const pickFromParams = (keys: string[], parser?: (value: string) => unknown): unknown => {
    for (const key of keys) {
      const direct = searchParams.get(key);
      if (direct !== null && String(direct).trim() !== "") {
        return parser ? parser(direct) : direct;
      }
      const inHash = hashParams.get(key);
      if (inHash !== null && String(inHash).trim() !== "") {
        return parser ? parser(inHash) : inHash;
      }
    }
    return null;
  };

  const statusHint =
    (() => {
      const fromParams = pickFromParams(GATEWAY_QUERY_STATUS_KEYS, (value) => parseGatewayStatusHint(value));
      if (fromParams) return fromParams as GatewayReturnContext["statusHint"];

      const path = pathname.toLowerCase();
      if (/(success|paid|succeeded|completed)/.test(path)) return "success";
      if (/(fail|failed|cancel|cancelled|canceled|declined|error)/.test(path)) return "failed";
      if (/(pending|processing|awaiting)/.test(path)) return "pending";
      return null;
    })();

  const orderNumberValue = pickFromParams(GATEWAY_QUERY_ORDER_KEYS);
  const orderIdValue = pickFromParams(GATEWAY_QUERY_ORDER_ID_KEYS, (value) => parseNumericId(value));

  const hasQueryGatewaySignal = GATEWAY_QUERY_HINT_KEYS.some(
    (key) => searchParams.has(key) || hashParams.has(key)
  );
  const hasPathGatewaySignal = /\/(checkout|payment|payments)\/(success|failed|fail|cancel|cancelled|canceled|callback|return|result|complete)/i.test(
    pathname
  );

  return {
    hasGatewaySignal: hasQueryGatewaySignal || hasPathGatewaySignal || Boolean(statusHint),
    statusHint: statusHint ?? null,
    orderNumber: orderNumberValue ? String(orderNumberValue).trim() : null,
    orderId: orderIdValue ? Number(orderIdValue) : null,
  };
};

const looksLikeRedirectField = (key: string) =>
  /(redirect|checkout|payment_?url|payment_?link|hosted_?url|web_?url|approval_?url|invoice_?url|pay_?url)/i.test(
    key
  );

const collectNestedRedirectCandidates = (
  value: unknown,
  depth = 0,
  acc: string[] = []
): string[] => {
  if (depth > 4 || value === null || value === undefined) return acc;

  if (typeof value === "string") {
    acc.push(value);
    return acc;
  }

  if (Array.isArray(value)) {
    value.forEach((item) => collectNestedRedirectCandidates(item, depth + 1, acc));
    return acc;
  }

  if (typeof value === "object") {
    Object.entries(value as Record<string, unknown>).forEach(([key, nestedValue]) => {
      if (looksLikeRedirectField(key)) {
        if (typeof nestedValue === "string") {
          acc.push(nestedValue);
        } else if (nestedValue && typeof nestedValue === "object") {
          const nestedUrl = (nestedValue as Record<string, unknown>)?.url;
          if (typeof nestedUrl === "string") {
            acc.push(nestedUrl);
          }
        }
      }
      collectNestedRedirectCandidates(nestedValue, depth + 1, acc);
    });
  }

  return acc;
};

const normalizeRedirectUrl = (candidate: unknown): string | null => {
  if (typeof candidate !== "string") return null;

  const raw = candidate.trim().replace(/&amp;/gi, "&").replace(/\\\//g, "/");
  if (!raw) return null;

  try {
    const parsed = (() => {
      if (/^https?:\/\//i.test(raw)) {
        return new URL(raw);
      }

      if (raw.startsWith("//")) {
        return new URL(`https:${raw}`);
      }

      const apiBaseUrl = import.meta.env.VITE_BASE_URL || window.location.origin;
      return new URL(raw, apiBaseUrl);
    })();

    if (parsed.protocol !== "http:" && parsed.protocol !== "https:") {
      return null;
    }

    return parsed.toString();
  } catch {
    return null;
  }
};

const extractRedirectUrlFromOrderResponse = (responseData: any, paymentData: any, orderData: any) => {
  const candidates = [
    paymentData?.redirect_url,
    paymentData?.redirectUrl,
    paymentData?.url,
    paymentData?.checkout_url,
    paymentData?.payment_url,
    paymentData?.payment_link,
    orderData?.redirect_url,
    orderData?.redirectUrl,
    orderData?.url,
    orderData?.checkout_url,
    orderData?.payment_url,
    orderData?.payment_link,
    responseData?.redirect_url,
    responseData?.redirectUrl,
    responseData?.url,
    responseData?.checkout_url,
    responseData?.payment_url,
    responseData?.payment_link,
    responseData?.data?.redirect_url,
    responseData?.data?.redirectUrl,
    responseData?.data?.url,
    responseData?.data?.checkout_url,
    responseData?.data?.payment_url,
    responseData?.data?.payment_link,
    ...collectNestedRedirectCandidates(paymentData),
    ...collectNestedRedirectCandidates(orderData),
    ...collectNestedRedirectCandidates(responseData),
  ];

  for (const candidate of candidates) {
    const normalized = normalizeRedirectUrl(candidate);
    if (normalized) return normalized;
  }

  return null;
};

const readPendingPaymentMetaFromStorage = (): PendingPaymentMeta | null => {
  const metaRaw = sessionStorage.getItem(PENDING_PAYMENT_CART_META_KEY);
  if (!metaRaw) return null;

  try {
    const parsed = JSON.parse(metaRaw);
    return {
      createdAt: Number(parsed?.createdAt || 0),
      orderNumber: parsed?.orderNumber ? String(parsed.orderNumber).trim() : null,
      orderId: parseNumericId(parsed?.orderId),
      paymentMethodId: parseNumericId(parsed?.paymentMethodId),
      restoreAttempts: Number(parsed?.restoreAttempts || 0),
    };
  } catch {
    return null;
  }
};

const hasActivePendingPaymentSnapshot = () => {
  const snapshotRaw = sessionStorage.getItem(PENDING_PAYMENT_CART_SNAPSHOT_KEY);
  const meta = readPendingPaymentMetaFromStorage();
  if (!snapshotRaw || !meta) return false;

  try {
    const snapshot = JSON.parse(snapshotRaw);

    if (!Array.isArray(snapshot) || snapshot.length === 0) return false;

    const createdAt = Number(meta.createdAt || 0);
    const isExpired = !createdAt || Date.now() - createdAt > PENDING_PAYMENT_CART_TTL_MS;
    const restoreAttempts = Number(meta.restoreAttempts || 0);
    const reachedMaxAttempts = restoreAttempts >= 3;

    return !isExpired && !reachedMaxAttempts;
  } catch {
    return false;
  }
};

export default function CheckoutPage() {
  const location = useLocation();
  const locationState = (location.state || {}) as { checkoutStep?: number };
  const requestedStep = Number.isInteger(locationState.checkoutStep)
    ? locationState.checkoutStep
    : 0;

  const [activeStep, setActiveStep] = useState(() => Math.max(0, Math.min(2, requestedStep)));
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [orderCompleted, setOrderCompleted] = useState(false);
  const [orderNumber, setOrderNumber] = useState<string | null>(null);
  const [orderId, setOrderId] = useState<number | null>(null); // لرفع إثبات الدفع
  const [uploadUrl, setUploadUrl] = useState<string | null>(null); // URL لرفع إثبات الدفع
  const [bankAccountDetails, setBankAccountDetails] = useState<any>(null); // بيانات الحساب البنكي
  const [showBankTransferModal, setShowBankTransferModal] = useState(false); // مودال التحويل البنكي
  const [isRestoringPendingCart, setIsRestoringPendingCart] = useState(false);
  const [isVerifyingGatewayReturn, setIsVerifyingGatewayReturn] = useState(false);
  const [isWaitingRestoreCheck, setIsWaitingRestoreCheck] = useState<boolean>(() => {
    try {
      return hasActivePendingPaymentSnapshot();
    } catch {
      return false;
    }
  });
  const [pendingRestoreTick, setPendingRestoreTick] = useState(0);
  const BANK_TRANSFER_ID = 8; // ID التحويل البنكي الحقيقي من الـ API
  const navigate = useNavigate();

  const { items, total, fetchCart, selectedPaymentId, clearCart } = useCartStore();



  const { t, i18n } = useTranslation();
  const isRTL = i18n.language === "ar";
  const currentLang = i18n.language;
  const [usePoints, setUsePoints] = useState(false);
  const [pointsDiscountAmount, setPointsDiscountAmount] = useState<number>(0);
  const {
    selectedAddressId,
    getSelectedAddress,
    addresses,
    deliveryMethod,
  } = useAddressStore();

  const clearPendingPaymentSnapshot = () => {
    sessionStorage.removeItem(PENDING_PAYMENT_CART_SNAPSHOT_KEY);
    sessionStorage.removeItem(PENDING_PAYMENT_CART_META_KEY);
  };

  const savePendingPaymentSnapshot = (
    orderNum: string | number | null,
    orderIdValue: number | null = null
  ) => {
    const snapshot = items
      .map((item: any) => {
        const optionId = Number(item?.product_option?.id ?? item?.product_option_id);
        const productId = Number(item?.product?.id ?? item?.product_id);
        const quantity = Math.max(1, Number(item?.quantity) || 1);

        if (Number.isFinite(optionId) && optionId > 0) {
          return { id: optionId, quantity, isOption: true };
        }

        if (Number.isFinite(productId) && productId > 0) {
          return { id: productId, quantity, isOption: false };
        }

        return null;
      })
      .filter((entry): entry is PendingCartSnapshotItem => entry !== null);

    if (snapshot.length === 0) return;

    const meta = {
      createdAt: Date.now(),
      orderNumber: orderNum ? String(orderNum) : null,
      orderId: parseNumericId(orderIdValue),
      paymentMethodId: Number(selectedPaymentId),
      restoreAttempts: 0,
    };

    sessionStorage.setItem(PENDING_PAYMENT_CART_SNAPSHOT_KEY, JSON.stringify(snapshot));
    sessionStorage.setItem(PENDING_PAYMENT_CART_META_KEY, JSON.stringify(meta));
  };

  const extractSingleOrderFromApiPayload = (payload: any) => {
    const candidates = [
      payload?.data?.order,
      payload?.data,
      payload?.order,
      payload,
    ];

    for (const candidate of candidates) {
      if (
        candidate &&
        !Array.isArray(candidate) &&
        typeof candidate === "object" &&
        (candidate.id || candidate.order_number || candidate.payment_status || candidate.status)
      ) {
        return candidate;
      }
    }

    return null;
  };

  const extractOrdersFromApiPayload = (payload: any): any[] => {
    if (Array.isArray(payload?.data)) return payload.data;
    if (Array.isArray(payload?.data?.data)) return payload.data.data;
    if (Array.isArray(payload?.orders)) return payload.orders;
    if (Array.isArray(payload)) return payload;
    return [];
  };

  const normalizeOrderReference = (value: unknown) => {
    const normalized = String(value ?? "").trim();
    return normalized.length > 0 ? normalized : null;
  };

  const resolveOrderPaymentState = (order: any) => {
    const paymentStatus = normalizeStatusValue(order?.payment_status);
    const orderStatus = normalizeStatusValue(order?.status);

    return {
      paymentStatus,
      orderStatus,
      isFinalized: isPaymentFinalized(paymentStatus, orderStatus),
      isFailed: isPaymentFailed(paymentStatus, orderStatus),
    };
  };

  const findOrderByReference = async (
    orderIdHint: number | null,
    orderNumberHint: string | null
  ) => {
    const parsedOrderId = parseNumericId(orderIdHint);
    if (parsedOrderId) {
      try {
        const response = await axiosClient.get(`/api/v1/orders/${parsedOrderId}`, {
          headers: { Accept: "application/json" },
        });
        const directOrder = extractSingleOrderFromApiPayload(response?.data);
        if (directOrder) return directOrder;
      } catch {
        // fallback to list endpoint
      }
    }

    const normalizedOrderNumber = normalizeOrderReference(orderNumberHint);
    if (!normalizedOrderNumber) return null;

    for (let page = 1; page <= MAX_ORDER_LOOKUP_PAGES; page += 1) {
      try {
        const response = await axiosClient.get("/api/v1/orders", {
          headers: { Accept: "application/json" },
          params: { page },
        });
        const orders = extractOrdersFromApiPayload(response?.data);

        if (!Array.isArray(orders) || orders.length === 0) {
          break;
        }

        const matched = orders.find(
          (order: any) =>
            normalizeOrderReference(order?.order_number) === normalizedOrderNumber
        );

        if (matched) return matched;

        const lastPage = Number(response?.data?.pagination?.last_page || 1);
        if (Number.isFinite(lastPage) && page >= lastPage) {
          break;
        }
      } catch {
        break;
      }
    }

    return null;
  };

  const verifyOrderPaymentWithRetry = async (
    orderIdHint: number | null,
    orderNumberHint: string | null,
    attempts = PAYMENT_STATUS_RETRY_ATTEMPTS
  ) => {
    const totalAttempts = Math.max(1, attempts);
    let latestOrder: any = null;

    for (let attempt = 0; attempt < totalAttempts; attempt += 1) {
      latestOrder = await findOrderByReference(orderIdHint, orderNumberHint);

      if (latestOrder) {
        const state = resolveOrderPaymentState(latestOrder);
        if (state.isFinalized || state.isFailed || attempt === totalAttempts - 1) {
          return {
            order: latestOrder,
            ...state,
          };
        }
      } else if (attempt === totalAttempts - 1) {
        return {
          order: null,
          paymentStatus: "",
          orderStatus: "",
          isFinalized: false,
          isFailed: false,
        };
      }

      await sleep(PAYMENT_STATUS_RETRY_INTERVAL_MS);
    }

    return {
      order: latestOrder,
      paymentStatus: "",
      orderStatus: "",
      isFinalized: false,
      isFailed: false,
    };
  };

  useEffect(() => {
    const handlePageShow = (event: PageTransitionEvent) => {
      const navigationEntries = window.performance?.getEntriesByType?.("navigation") as PerformanceNavigationTiming[];
      const isBackForwardNavigation =
        event.persisted || navigationEntries?.[0]?.type === "back_forward";

      if (isBackForwardNavigation) {
        if (hasActivePendingPaymentSnapshot()) {
          setIsWaitingRestoreCheck(true);
        }
        setPendingRestoreTick((prev) => prev + 1);
        fetchCart();
      }
    };

    window.addEventListener("pageshow", handlePageShow);
    return () => window.removeEventListener("pageshow", handlePageShow);
  }, [fetchCart]);

  const getPointsUsagePayload = () => {
    const normalizedPointsDiscount = Math.max(
      0,
      Math.floor(Number.isFinite(pointsDiscountAmount) ? pointsDiscountAmount : 0)
    );
    const shouldUsePoints = usePoints && normalizedPointsDiscount > 0;

    return {
      use_point: shouldUsePoints,
      points_discount: shouldUsePoints ? normalizedPointsDiscount : 0,
    };
  };

  useEffect(() => {
    fetchCart();
  }, [fetchCart, usePoints]);

  useEffect(() => {
    setActiveStep(Math.max(0, Math.min(2, requestedStep)));
  }, [requestedStep]);


  const steps = [
    {
      title: t("checkout.steps.orderSummary"),
      number: order,
      componunt: (
        <Checkoutsummary
          products={items}
          total={total}
          usePoints={usePoints}
          onUsePointsChange={setUsePoints}
          pointsDiscountAmount={pointsDiscountAmount}
          onPointsDiscountChange={setPointsDiscountAmount}
        />
      ),
    },
    {
      title: t("checkout.steps.address"),
      number: step2,
      componunt: <Checkoutaddress />,
    },
    {
      title: t("checkout.steps.payment"),
      number: step3,
      componunt: (
        <Checkoutpayment
          usePoints={usePoints}
          onUsePointsChange={setUsePoints}
          pointsDiscountAmount={pointsDiscountAmount}
          onPointsDiscountChange={setPointsDiscountAmount}
        />
      ),
    },
  ];
  const currentStep = steps[activeStep] ?? steps[0];

  const showCustomToast = (type: 'success' | 'error' | 'info', title: string, message?: React.ReactNode, duration: number = 8000) => {
    const ToastContent = () => (
      <div className={`flex flex-col ${isRTL ? 'text-right' : 'text-left'}`}>
        <div className="font-bold text-lg flex items-center gap-2">
          {type === 'success' && '✅'}
          {type === 'error' && '❌'}
          {type === 'info' && 'ℹ️'}
          {title}
        </div>
        {message && <div className="text-sm mt-1 text-gray-600">{message}</div>}
      </div>
    );

    const options = {
      position: "bottom-right" as const,
      autoClose: duration,
      hideProgressBar: false,
      closeOnClick: false,
      pauseOnHover: true,
      draggable: true,
      theme: "light" as const,
      className: type === 'success'
        ? "!rounded-lg !shadow-xl !border !border-green-200 !bg-gradient-to-r !from-green-50 !to-white"
        : type === 'error'
          ? "!rounded-lg !shadow-xl !border !border-red-200 !bg-gradient-to-r !from-red-50 !to-white"
          : "!rounded-lg !shadow-xl !border !border-blue-200 !bg-gradient-to-r !from-blue-50 !to-white",
      bodyClassName: "!p-4",
    };

    switch (type) {
      case 'success':
        toast.success(<ToastContent />, options);
        break;
      case 'error':
        toast.error(<ToastContent />, options);
        break;
      case 'info':
        toast.info(<ToastContent />, { ...options, autoClose: 5000 });
        break;
    }
  };

  useEffect(() => {
    const pendingMeta = readPendingPaymentMetaFromStorage();
    const returnContext = extractGatewayReturnContext(
      location.pathname,
      location.search,
      location.hash
    );
    const hasReferenceHint =
      Boolean(returnContext.orderId || returnContext.orderNumber) ||
      Boolean(pendingMeta?.orderId || pendingMeta?.orderNumber);

    if (!returnContext.hasGatewaySignal || !hasReferenceHint) return;

    let cancelled = false;

    const verifyGatewayReturn = async () => {
      setIsVerifyingGatewayReturn(true);
      setIsWaitingRestoreCheck(true);

      try {
        const orderIdHint = returnContext.orderId ?? pendingMeta?.orderId ?? null;
        const orderNumberHint =
          returnContext.orderNumber ?? pendingMeta?.orderNumber ?? null;

        const verification = await verifyOrderPaymentWithRetry(
          orderIdHint,
          orderNumberHint,
          returnContext.statusHint === "success"
            ? PAYMENT_STATUS_RETRY_ATTEMPTS + 1
            : PAYMENT_STATUS_RETRY_ATTEMPTS
        );

        if (cancelled) return;

        if (verification.order && verification.isFinalized) {
          const resolvedOrderNumber =
            normalizeOrderReference(verification.order?.order_number) ||
            normalizeOrderReference(orderNumberHint);
          const resolvedOrderId =
            parseNumericId(verification.order?.id) ?? parseNumericId(orderIdHint);

          if (resolvedOrderNumber) setOrderNumber(resolvedOrderNumber);
          if (resolvedOrderId) setOrderId(resolvedOrderId);

          clearPendingPaymentSnapshot();
          localStorage.removeItem("discount_code");
          setOrderCompleted(true);
          setIsWaitingRestoreCheck(false);

          if (clearCart) {
            try {
              await clearCart();
            } catch {
              // cart might already be empty after payment capture
            }
          }

          if (location.pathname !== `/${currentLang}/checkout` || location.search || location.hash) {
            navigate(`/${currentLang}/checkout`, { replace: true });
          }
          return;
        }

        if (verification.isFailed || returnContext.statusHint === "failed") {
          showCustomToast(
            "error",
            isRTL ? "فشل الدفع" : "Payment Failed",
            isRTL
              ? "لم يتم تأكيد الدفع من البوابة. رجّعنا السلة لتقدر تحاول مرة أخرى."
              : "Payment was not confirmed by the gateway. Your cart will be restored so you can retry."
          );
        } else if (returnContext.statusHint === "success" || returnContext.statusHint === "pending") {
          showCustomToast(
            "info",
            isRTL ? "جاري التحقق من الدفع" : "Verifying Payment",
            isRTL
              ? "رجعنا من بوابة الدفع لكن تأكيد العملية لسه ما وصلش. هنحاول استعادة السلة لو الدفع ما اتأكدش."
              : "You returned from the gateway, but payment confirmation has not arrived yet. We will restore your cart if payment is not confirmed."
          );
        }

        setPendingRestoreTick((prev) => prev + 1);
        if (location.pathname !== `/${currentLang}/checkout` || location.search || location.hash) {
          navigate(`/${currentLang}/checkout`, { replace: true });
        }
      } finally {
        if (!cancelled) {
          setIsVerifyingGatewayReturn(false);
        }
      }
    };

    verifyGatewayReturn();

    return () => {
      cancelled = true;
    };
  }, [
    location.pathname,
    location.search,
    location.hash,
    currentLang,
    isRTL,
    navigate,
    clearCart,
  ]);

  useEffect(() => {
    const restorePendingPaymentCart = async () => {
      if (isVerifyingGatewayReturn) return;
      if (items.length > 0) {
        setIsWaitingRestoreCheck(false);
        return;
      }
      if (isRestoringPendingCart) return;

      const snapshotRaw = sessionStorage.getItem(PENDING_PAYMENT_CART_SNAPSHOT_KEY);
      const meta = readPendingPaymentMetaFromStorage();

      if (!snapshotRaw || !meta) {
        setIsWaitingRestoreCheck(false);
        return;
      }

      let snapshot: PendingCartSnapshotItem[] = [];

      try {
        snapshot = JSON.parse(snapshotRaw);
      } catch {
        clearPendingPaymentSnapshot();
        setIsWaitingRestoreCheck(false);
        return;
      }

      const createdAt = Number(meta.createdAt || 0);
      const isExpired = !createdAt || Date.now() - createdAt > PENDING_PAYMENT_CART_TTL_MS;
      const restoreAttempts = Number(meta.restoreAttempts || 0);
      const reachedMaxAttempts = restoreAttempts >= 3;

      if (
        isExpired ||
        reachedMaxAttempts ||
        !Array.isArray(snapshot) ||
        snapshot.length === 0
      ) {
        clearPendingPaymentSnapshot();
        setIsWaitingRestoreCheck(false);
        return;
      }

      sessionStorage.setItem(
        PENDING_PAYMENT_CART_META_KEY,
        JSON.stringify({ ...meta, restoreAttempts: restoreAttempts + 1 })
      );

      setIsRestoringPendingCart(true);

      try {
        if (meta.orderNumber || meta.orderId) {
          const verification = await verifyOrderPaymentWithRetry(
            meta.orderId,
            meta.orderNumber,
            2
          );

          if (verification.isFinalized) {
            clearPendingPaymentSnapshot();
            setIsWaitingRestoreCheck(false);
            return;
          }
        }

        // دمج العناصر المتكررة لتقليل عدد الطلبات وتسريع الاسترجاع.
        const merged = new Map<string, PendingCartSnapshotItem>();
        snapshot.forEach((entry) => {
          const itemId = Number(entry?.id);
          const quantity = Math.max(1, Number(entry?.quantity) || 1);
          const isOption = Boolean(entry?.isOption);
          if (!Number.isFinite(itemId) || itemId <= 0) return;

          const key = `${isOption ? "option" : "product"}:${itemId}`;
          const prev = merged.get(key);
          if (prev) {
            prev.quantity += quantity;
          } else {
            merged.set(key, { id: itemId, isOption, quantity });
          }
        });

        await Promise.all(
          [...merged.values()].map((entry) => {
            const params = entry.isOption
              ? { product_option_id: entry.id, quantity: entry.quantity }
              : { product_id: entry.id, quantity: entry.quantity };

            return axiosClient.post("api/v1/cart", {}, {
              params,
              headers: {
                Accept: "application/json",
              },
            });
          })
        );

        await fetchCart();
        clearPendingPaymentSnapshot();

        showCustomToast(
          "info",
          isRTL ? "تمت استعادة السلة" : "Cart Restored",
          isRTL
            ? "رجعنا المنتجات للسلة بعد الرجوع من بوابة الدفع."
            : "Your cart items were restored after returning from the payment gateway."
        );
      } catch {
        console.error("Failed to restore pending payment cart");
        showCustomToast(
          "error",
          isRTL ? "تعذر استعادة السلة" : "Cart Restore Failed",
          isRTL
            ? "حصل خطأ أثناء محاولة استعادة المنتجات. أعد تحميل الصفحة وحاول مرة أخرى."
            : "An error occurred while restoring your cart. Please refresh and try again."
        );
      } finally {
        setIsRestoringPendingCart(false);
        setIsWaitingRestoreCheck(false);
      }
    };

    restorePendingPaymentCart();
  }, [
    items.length,
    isRestoringPendingCart,
    fetchCart,
    isRTL,
    pendingRestoreTick,
    isVerifyingGatewayReturn,
  ]);

  const handleCompleteOrder = async () => {
    setIsSubmitting(true);
    let loadingToastId: string | number | null = null;

    try {
      // التحقق من صحة البيانات
      if (!selectedPaymentId) {
        showCustomToast(
          'error',
          isRTL ? 'خطأ في الدفع' : 'Payment Error',
          isRTL ? 'الرجاء اختيار طريقة دفع' : 'Please select a payment method'
        );
        setIsSubmitting(false);
        return;
      }

      if (items.length === 0) {
        showCustomToast(
          'error',
          isRTL ? 'السلة فارغة' : 'Cart is Empty',
          isRTL ? 'الرجاء إضافة منتجات إلى السلة' : 'Please add products to your cart'
        );
        setIsSubmitting(false);
        return;
      }

      const currentDeliveryMethod = deliveryMethod || "delivery";

      if (currentDeliveryMethod === "delivery") {
        const selectedAddress = getSelectedAddress();
        if (!selectedAddressId || !selectedAddress) {
          showCustomToast(
            'error',
            isRTL ? 'عنوان مفقود' : 'Address Missing',
            isRTL ? 'الرجاء اختيار عنوان التوصيل' : 'Please select a delivery address'
          );
          setIsSubmitting(false);
          return;
        }
      }

      // ⭐ للتحويل البنكي: نفتح المودال أولاً بدون إنشاء الطلب
      if (Number(selectedPaymentId) === BANK_TRANSFER_ID) {
        setShowBankTransferModal(true);
        setIsSubmitting(false);
        return; // لا ننشئ الطلب الآن - سينشأ عند الضغط على "دفع الآن" في المودال
      }

      // إظهار toast للتحميل
      loadingToastId = toast.info(
        <div className={`flex items-center gap-3 ${isRTL ? 'flex-row-reverse' : ''}`}>
          <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
          <div className="flex flex-col">
            <span className="font-semibold">
              {isRTL ? 'جاري معالجة طلبك' : 'Processing your order'}
            </span>
            <span className="text-sm opacity-80">
              {isRTL ? 'يرجى الانتظار...' : 'Please wait...'}
            </span>
          </div>
        </div>,
        {
          position: "bottom-right",
          autoClose: false,
          hideProgressBar: false,
          closeOnClick: false,
          pauseOnHover: true,
          draggable: true,
          theme: "light",
          className: "!rounded-lg !shadow-xl !bg-gradient-to-r !from-[#F3AC5D] !to-[#211C4D] !text-white",
        }
      );

      // بناء بيانات الطلب مع إضافة use_points
      const pointsUsagePayload = getPointsUsagePayload();
      const orderRequestData = {
        ...(currentDeliveryMethod === "delivery" && { location_id: selectedAddressId }),
        payment_method_id: Number(selectedPaymentId),
        note: "",
        discount_code: localStorage.getItem('discount_code') || null,
        delivery_method: currentDeliveryMethod === "pickup" ? "store_pickup" : "home_delivery",
        ...pointsUsagePayload,
      };


      const isExternalGatewayMethod = EXTERNAL_PAYMENT_METHOD_IDS.has(Number(selectedPaymentId));
      if (isExternalGatewayMethod) {
        // نحفظ نسخة قبل إنشاء الطلب تحسبًا لحدوث مشكلة بالتحويل للبوابة.
        savePendingPaymentSnapshot(null, null);
        setIsWaitingRestoreCheck(true);
      }

      // إرسال الطلب
      const response = await axiosClient.post('/api/v1/orders', orderRequestData);

      // إغلاق toast التحميل
      if (loadingToastId !== null) {
        toast.dismiss(loadingToastId);
        loadingToastId = null;
      }

      // قراءة بيانات الطلب/الدفع بصيغة مرنة لأن شكل الـ API قد يختلف أحيانًا.
      const orderData = response.data.data?.order || response.data.data || response.data;
      const orderNum = normalizeOrderReference(
        orderData?.order_number || response.data.order_number || response.data.id
      );
      const orderIdFromResponse = parseNumericId(
        orderData?.id || response.data.data?.id || response.data.id || response.data.order_id
      );
      const paymentData = response.data?.payment || response.data?.data?.payment;
      setOrderNumber(orderNum);
      setOrderId(orderIdFromResponse);

      const redirectUrl = extractRedirectUrlFromOrderResponse(response.data, paymentData, orderData);
      const requiresRedirect =
        Boolean(paymentData?.requires_redirect) ||
        Boolean(paymentData?.requiresRedirect) ||
        Boolean(orderData?.requires_redirect) ||
        Boolean(orderData?.requiresRedirect) ||
        Boolean(response.data?.requires_redirect) ||
        Boolean(response.data?.requiresRedirect) ||
        Boolean(response.data?.data?.requires_redirect) ||
        Boolean(response.data?.data?.requiresRedirect);

      const paymentStatus = normalizeStatusValue(
        orderData?.payment_status || response.data?.data?.payment_status || response.data?.payment_status || paymentData?.status
      );
      const orderStatus = normalizeStatusValue(
        orderData?.status || response.data?.data?.status || response.data?.status
      );
      const isFinalizedPayment = isPaymentFinalized(paymentStatus, orderStatus);

      // External gateways should always persist order reference for post-return verification
      // حتى لو لم نحصل على redirect URL.
      if (isExternalGatewayMethod) {
        savePendingPaymentSnapshot(orderNum, orderIdFromResponse);
      }

      if (redirectUrl) {
        // حفظ رقم الطلب مع الـ snapshot لاستخدامه لو رجع المستخدم Back قبل الدفع.
        savePendingPaymentSnapshot(orderNum, orderIdFromResponse);
        window.location.assign(redirectUrl);
        return;
      }

      // حماية أساسية: أي بوابة دفع خارجية بدون redirect + بدون تأكيد دفع = لا نعتبر الطلب مكتمل.
      if ((requiresRedirect || isExternalGatewayMethod) && !isFinalizedPayment) {
        await fetchCart();
        setPendingRestoreTick((prev) => prev + 1);

        showCustomToast(
          'error',
          isRTL ? 'تعذر تحويلك لبوابة الدفع' : 'Payment Redirect Failed',
          isRTL
            ? 'تم إنشاء الطلب لكن لم يتم تأكيد الدفع. لن نعتبر الطلب مكتملًا حتى يتم الدفع.'
            : 'Order was created but payment was not confirmed. The order will not be marked completed until payment succeeds.'
        );
        return;
      }

      // التحقق إذا كانت طريقة الدفع هي التحويل البنكي أو تحتاج رفع إثبات دفع
      const requiresProofUpload = paymentData?.requires_proof_upload || false;

      if (Number(selectedPaymentId) === BANK_TRANSFER_ID || requiresProofUpload) {
        // حفظ بيانات التحويل البنكي من الـ API
        const apiUploadUrl = paymentData?.upload_url || null;
        const apiBankDetails = paymentData?.bank_account_details || null;


        setUploadUrl(apiUploadUrl);
        setBankAccountDetails(apiBankDetails);

        // فتح مودال رفع إثبات الدفع
        setShowBankTransferModal(true);
        return;
      }

      setOrderCompleted(true);
      clearPendingPaymentSnapshot();

      // تنظيف السلة
      if (clearCart) {
        clearCart();
      }

      localStorage.removeItem('discount_code');

      // عرض toast النجاح مع معلومات النقاط
      let successMessage: React.ReactNode = isRTL
        ? `تم إتمام الطلب رقم ${orderNum} بنجاح`
        : `Order #${orderNum} completed successfully - You can track your orders`;

      if (usePoints && response.data.data?.points_discount) {
        const pointsDiscount = response.data.data.points_discount;
        successMessage = (
          <div className="flex flex-col">
            <span>{isRTL ? `تم إتمام الطلب رقم ${orderNum} بنجاح` : `Order #${orderNum} completed successfully`}</span>
            <span className="flex items-center gap-1 mt-1">
              {isRTL
                ? `تم خصم ${pointsDiscount}`
                : `${pointsDiscount} deducted using points`}
              <SaudiRiyalIcon className="w-3 h-3" />
              {isRTL ? 'باستخدام النقاط' : ''}
            </span>
          </div>
        );
      }

      showCustomToast(
        'success',
        isRTL ? 'تم بنجاح!' : 'Order Successful!',
        successMessage
      );

    } catch (error: any) {
      if (loadingToastId !== null) {
        toast.dismiss(loadingToastId);
      }
      let errorTitle = isRTL ? 'فشل في الطلب' : 'Order Failed';
      let errorMessage = isRTL ? 'حدث خطأ أثناء معالجة الطلب' : 'An error occurred while processing your order';

      if (error.response?.data?.errors) {
        const serverErrors = error.response.data.errors;
        const allErrors = Object.values(serverErrors).flat().join(' - ');
        errorMessage = isRTL ? `أخطاء: ${allErrors}` : `Errors: ${allErrors}`;
      } else if (error.response?.data?.message) {
        errorMessage = error.response.data.message;
      }

      showCustomToast('error', errorTitle, errorMessage);

      console.error('Order submission failed');
    } finally {
      if (loadingToastId !== null) {
        toast.dismiss(loadingToastId);
      }
      setIsSubmitting(false);
    }
  };

  const handleNextOrComplete = async () => {
    if (activeStep === steps.length - 1) {
      await handleCompleteOrder();
    } else {
      setActiveStep(prev => Math.min(steps.length - 1, prev + 1));
    }
  };



  const handleUsePointsChange = (value: boolean) => {
    setUsePoints(value);
  };

  // Step validation logic
  const isStepValid = (): boolean => {
    switch (activeStep) {
      case 0: // Order Summary - must have items in cart
        return items.length > 0;
      case 1: // Address - must have address selected (unless pickup)
        const currentDelivery = deliveryMethod || "delivery";
        if (currentDelivery === "pickup") {
          return true; // No address needed for pickup
        }
        return selectedAddressId !== null && selectedAddressId !== undefined;
      case 2: // Payment - must have payment method selected
        return selectedPaymentId !== null && selectedPaymentId !== undefined;
      default:
        return true;
    }
  };

  // ثم استخدم handleUsePointsChange بدلاً من setUsePoints في steps
  const handleGoHome = () => {
    navigate(`/${currentLang}`);
  };

  const handleGoToOrders = () => {
    window.location.href = `/${currentLang}/myorder`;
  };

  // إذا تم إتمام الطلب، اعرض شاشة النجاح
  if (orderCompleted) {
    return (
      <Layout>
        <div className="min-h-screen mt-[60px] bg-gray-50" dir={isRTL ? "rtl" : "ltr"}>
          <div className="max-w-4xl mx-auto px-4 py-12">
            {/* Success Card */}
            <div className="bg-white rounded-2xl shadow-xl p-8 text-center">
              <div className="flex justify-center mb-6">
                <div className="w-24 h-24 bg-green-100 rounded-full flex items-center justify-center">
                  <div className="w-16 h-16 bg-green-200 rounded-full flex items-center justify-center">
                    <Package className="w-10 h-10 text-green-600" />
                  </div>
                </div>
              </div>

              <h1 className="text-3xl font-bold text-gray-900 mb-4">
                {isRTL ? '🎉 تم تأكيد طلبك!' : '🎉 Order Confirmed!'}
              </h1>

              <p className="text-lg text-gray-600 mb-2">
                {isRTL
                  ? `تم إتمام طلبك بنجاح`
                  : `Your order #${orderNumber} has been confirmed`
                }
              </p>

              {usePoints && (
                <div className="mt-4 p-3 bg-blue-50 rounded-lg border border-blue-200 inline-block">
                  <p className="text-blue-700 font-medium">
                    {isRTL ? '✅ تم استخدام النقاط في هذا الطلب' : '✅ Points were used in this order'}
                  </p>
                </div>
              )}

              {/* Buttons */}
              <div className="flex flex-col sm:flex-row gap-4 justify-center mt-10">
                <Button
                  onClick={handleGoHome}
                  variant="outline"
                  className="flex items-center justify-center gap-2 px-8 py-6 text-lg rounded-xl border-2 border-[#211C4D] text-[#211C4D] hover:bg-[#211C4D] hover:text-white"
                >
                  <Home className="w-5 h-5" />
                  {isRTL ? 'العودة للرئيسية' : 'Back to Home'}
                </Button>

                <Button
                  onClick={handleGoToOrders}
                  className="flex items-center justify-center gap-2 px-8 py-6 text-lg rounded-xl bg-[#F3AC5D] hover:bg-[#e69c4d] text-white"
                >
                  <ShoppingBag className="w-5 h-5" />
                  {isRTL ? 'عرض طلباتي' : 'View My Orders'}
                </Button>
              </div>
            </div>
          </div>
        </div>
      </Layout>
    );
  }

  const shouldShowRestoreLoader =
    (isWaitingRestoreCheck || isRestoringPendingCart || isVerifyingGatewayReturn) &&
    items.length === 0;

  if (shouldShowRestoreLoader) {
    return (
      <Layout>
        <div className="min-h-screen mt-[60px] bg-white flex items-center justify-center" dir={isRTL ? "rtl" : "ltr"}>
          <div className="flex flex-col items-center gap-4">
            <span className="animate-spin rounded-full h-10 w-10 border-b-2 border-[#211C4D]"></span>
            <p className="text-[#211C4D] font-medium text-base">
              {isVerifyingGatewayReturn
                ? (isRTL ? "جاري التحقق من حالة الدفع..." : "Verifying payment status...")
                : (isRTL ? "جاري استعادة السلة..." : "Restoring your cart...")}
            </p>
          </div>
        </div>
      </Layout>
    );
  }

  // صفحة الـ Checkout العادية
  return (
    <Layout>
      <div className="min-h-screen mt-[60px] bg-white" dir={isRTL ? "rtl" : "ltr"}>
        {/* Stepper */}
        <div className="bg-white flex items-center justify-center py-8">
          <div className="md:w-[600px] w-full px-4">
            <div className="flex items-center justify-around gap-8">
              {steps.map((step, index) => (
                <div key={index} className="flex items-center justify-center flex-col">
                  <div className="flex items-start gap-4">
                    <div className="flex flex-col items-center justify-center">
                      <div
                        className={`w-[37px] h-[37px] rounded-full flex items-center justify-center font-bold text-lg transition-all ${activeStep === index
                          ? "bg-orange-400 text-white"
                          : activeStep > index
                            ? "bg-green-500 text-white"
                            : "bg-[#AEAEAE] text-gray-600"
                          }`}
                      >
                        {activeStep > index ? "✓" : <img src={step.number} alt="" className="w-6 h-6" />}
                      </div>
                      <span
                        className={`mt-2 text-sm font-semibold text-center ${activeStep === index ? "text-orange-400" : "text-[#939393]"
                          }`}
                      >
                        {step.title}
                      </span>
                    </div>
                    {index < steps.length - 1 && (
                      <div className="md:w-[150px] w-[50px] h-[2px] mt-5 bg-gray-300" />
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="w-full mx-auto px-4 py-8">
          <div className="bg-white rounded-lg lg:p-8 min-h-96">
            {currentStep.componunt}
          </div>
        </div>

        {/* Navigation Buttons */}
        <div className="bg-white py-6">
          <div className="max-w-7xl mx-auto px-4 flex flex-wrap justify-around gap-4">
            <Button
              variant="outline"
              className="md:w-[400px] w-full h-[56px] bg-[#211C4D] rounded-[16px] flex items-center justify-center text-[24px] text-white hover:bg-[#2A2460] transition-colors"
              onClick={() => setActiveStep(prev => Math.max(0, prev - 1))}
              disabled={activeStep === 0 || isSubmitting}
            >
              {t("checkout.buttons.back")}
            </Button>
            <Button
              className="md:w-[400px] w-full h-[56px] bg-gradient-to-r from-[#F3AC5D] to-[#FF7B54] rounded-[16px] flex items-center justify-center text-[24px] text-white hover:from-[#FF7B54] hover:to-[#F3AC5D] transition-all shadow-lg hover:shadow-xl disabled:opacity-70 disabled:cursor-not-allowed"
              onClick={handleNextOrComplete}
              disabled={isSubmitting || !isStepValid()}
            >
              {isSubmitting ? (
                <span className="flex items-center gap-2">
                  <span className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></span>
                  {t("checkout.buttons.processing")}
                </span>
              ) : activeStep === steps.length - 1 ? (
                <span className="flex items-center gap-2">
                  <span className="text-xl">✓</span>
                  {t("checkout.buttons.completeOrder")}
                </span>
              ) : (
                <span className="flex items-center gap-2">
                  <span className="text-xl">→</span>
                  {t("checkout.buttons.next")}
                </span>
              )}
            </Button>
          </div>
        </div>
      </div>

      {/* Bank Transfer Payment Proof Modal */}
      <BankTransferModal
        isOpen={showBankTransferModal}
        onClose={() => {
          // ⭐ فقط نغلق المودال - لا ننشئ الطلب ولا نمسح السلة
          setShowBankTransferModal(false);
        }}
        totalAmount={total}
        orderId={orderId}
        uploadUrl={uploadUrl}
        onSubmit={async () => { }}
        onCreateOrder={async () => {
          // ⭐ إنشاء الطلب عند الضغط على "دفع الآن" في المودال
          try {
            const currentDeliveryMethod = deliveryMethod || "delivery";
            const pointsUsagePayload = getPointsUsagePayload();

            const orderRequestData = {
              ...(currentDeliveryMethod === "delivery" && { location_id: selectedAddressId }),
              payment_method_id: Number(selectedPaymentId),
              note: "",
              discount_code: localStorage.getItem('discount_code') || null,
              delivery_method: currentDeliveryMethod === "pickup" ? "store_pickup" : "home_delivery",
              ...pointsUsagePayload,
            };


            const response = await axiosClient.post('/api/v1/orders', orderRequestData);

            const orderData = response.data.data?.order || response.data.data || response.data;
            const orderNum = normalizeOrderReference(
              orderData?.order_number || response.data.order_number || response.data.id
            );
            const orderIdFromResponse = parseNumericId(
              orderData?.id || response.data.data?.id || response.data.id || response.data.order_id
            );
            const paymentData = response.data?.payment || response.data?.data?.payment;
            const apiUploadUrl = paymentData?.upload_url || null;

            const finalOrderId = orderIdFromResponse ?? orderNum;
            if (!finalOrderId) {
              return null;
            }

            setOrderNumber(orderNum);
            setOrderId(orderIdFromResponse);
            setUploadUrl(apiUploadUrl);

            return {
              orderId: finalOrderId,
              uploadUrl: apiUploadUrl
            };
          } catch (error: any) {
            console.error('Error creating order');
            const errorMessage = error.response?.data?.message ||
              (isRTL ? 'فشل في إنشاء الطلب' : 'Failed to create order');
            showCustomToast('error', isRTL ? 'خطأ' : 'Error', errorMessage);
            return null;
          }
        }}
        onUploadSuccess={() => {
          showCustomToast(
            'success',
            isRTL ? 'تم بنجاح!' : 'Success!',
            isRTL
              ? `تم رفع إثبات الدفع للطلب رقم ${orderNumber} بنجاح`
              : `Payment proof for order #${orderNumber} uploaded successfully`
          );
          setShowBankTransferModal(false);
          setOrderCompleted(true);
          clearPendingPaymentSnapshot();
          if (clearCart) {
            clearCart();
          }
          localStorage.removeItem('discount_code');
        }}
      />
    </Layout>
  );
}
