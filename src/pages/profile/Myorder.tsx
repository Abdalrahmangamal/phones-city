import { useEffect, useState } from "react";
import Layout from "@/components/layout/layout";
import Sidebar from "@/components/layout/Sidebar";
import "@/style.css";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Sheet, SheetContent, SheetHeader, SheetTitle } from "@/components/ui/sheet";
import { useOrdersStore } from "@/store/profile/indexStore";
import { Package, Calendar, Eye, ChevronDown, ChevronUp, Phone, MapPin, CreditCard, X } from "lucide-react";
import React from "react";
import { useTranslation } from "react-i18next";
import { useLangSync } from "@/hooks/useLangSync";

// وظيفة مساعدة لتنسيق التاريخ
const formatDate = (dateString: string, locale: string) => {
  const date = new Date(dateString);
  return date.toLocaleDateString(locale === 'ar' ? 'ar-SA' : 'en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric'
  });
};

export default function Myorder() {
  const { t } = useTranslation();
  const { lang } = useLangSync();
  const { orders, loading, error, fetchOrders, getOrdersByStatus, cancelOrder } = useOrdersStore();
  const [activeTab, setActiveTab] = useState("total");
  const [expandedOrderId, setExpandedOrderId] = useState<number | null>(null);
  const [selectedOrder, setSelectedOrder] = useState<any | null>(null);
  const [isMobile, setIsMobile] = useState(false);

  // كشف حجم الشاشة
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  useEffect(() => {
    fetchOrders();
  }, [fetchOrders]);
  
  const getFilteredOrders = () => {
    if (activeTab === 'total') return orders;
    if (activeTab === 'Delivering') return getOrdersByStatus('Delivery is in progress');
    if (activeTab === 'completed') return getOrdersByStatus('completed');
    if (activeTab === 'Cancelled') return getOrdersByStatus('cancelled');
    return orders;
  };
  
  const filteredOrders = getFilteredOrders();
  
  const orderCounts = {
    total: orders.length,
    Delivering: getOrdersByStatus('Delivery is in progress').length,
    completed: getOrdersByStatus('completed').length,
    Cancelled: getOrdersByStatus('cancelled').length,
  };
  
  const toggleOrderDetails = (order: any) => {
    if (isMobile) {
      setSelectedOrder(order);
    } else {
      setExpandedOrderId(expandedOrderId === order.id ? null : order.id);
    }
  };
  
  const handleCancelOrder = async (orderId: number) => {
    if (window.confirm(t("Are you sure you want to cancel this order?"))) {
      await cancelOrder(orderId);
    }
  };

  // وظيفة مساعدة لترجمة حالة الطلب
  const getStatusText = (status: string) => {
    const statusMap: Record<string, { text: string; color: string; bgColor: string }> = {
      'pending': { text: t('Pending'), color: '#F3AC5D', bgColor: '#FFF9F0' },
      'Delivery is in progress': { text: t('InProgress'), color: '#4A90E2', bgColor: '#EFF6FF' },
      'completed': { text: t('Completed'), color: '#34A853', bgColor: '#F0FFF4' },
      'cancelled': { text: t('Cancelled'), color: '#E50000', bgColor: '#FFF0F0' },
      'processing': { text: t('Processing'), color: '#9B51E0', bgColor: '#F9F5FF' },
    };
    
    return statusMap[status] || { text: status, color: '#211C4D', bgColor: '#F5F5F5' };
  };

  // مكون التفاصيل المشترك
  const OrderDetailsContent = ({ order }: { order: any }) => (
    <div className="p-6" dir="rtl">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* معلومات الشحن */}
        <div className="bg-white p-5 rounded-xl border border-gray-200">
          <div className="flex items-center gap-2 mb-4">
            <MapPin className="w-5 h-5 text-[#211C4D]" />
            <h4 className="text-sm font-semibold text-gray-700">{t('ShippingInfo')}</h4>
          </div>
          <div className="space-y-3">
            <div>
              <p className="text-xs text-gray-500 mb-1">{t('Name')}</p>
              <p className="text-sm font-medium">{order.location.first_name} {order.location.last_name}</p>
            </div>
            <div>
              <p className="text-xs text-gray-500 mb-1">{t('Address')}</p>
              <p className="text-sm font-medium">{order.location.street_address}</p>
              <p className="text-sm text-gray-600">{order.location.city.name_ar}</p>
            </div>
            <div>
              <p className="text-xs text-gray-500 mb-1">{t('Phone')}</p>
              <p className="text-sm font-medium flex items-center gap-1">
                <Phone className="w-4 h-4" />
                {order.location.phone}
              </p>
            </div>
            {order.notes && (
              <div>
                <p className="text-xs text-gray-500 mb-1">{t('Notes')}</p>
                <p className="text-sm text-gray-600 bg-yellow-50 p-3 rounded-lg">{order.notes}</p>
              </div>
            )}
          </div>
        </div>
        
        {/* المنتجات + الفاتورة */}
        <div className="lg:col-span-2 bg-white p-5 rounded-xl border border-gray-200">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2">
              <Package className="w-5 h-5 text-[#211C4D]" />
              <h4 className="text-sm font-semibold text-gray-700">
                {t('Products')} ({order.items.length})
              </h4>
            </div>
            <div className="text-sm">
              <span className="text-gray-500">{t('DeliveryMethod')}:</span>{' '}
              <span className="font-medium">
                {order.delivery_method === 'home_delivery' ? t('HomeDelivery') : t('StorePickup')}
              </span>
            </div>
          </div>

          <div className="overflow-x-auto mb-6">
            <table className="w-full">
              <thead className="bg-gray-50">
                <tr>
                  <th className="py-3 px-4 text-right text-xs font-semibold text-gray-600">{t('Product')}</th>
                  <th className="py-3 px-4 text-right text-xs font-semibold text-gray-600">{t('Option')}</th>
                  <th className="py-3 px-4 text-right text-xs font-semibold text-gray-600">{t('Price')}</th>
                  <th className="py-3 px-4 text-right text-xs font-semibold text-gray-600">{t('Quantity')}</th>
                  <th className="py-3 px-4 text-right text-xs font-semibold text-gray-600">{t('FinalTotal')}</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {order.items.map((item: any) => (
                  <tr key={item.id} className="hover:bg-gray-50">
                    <td className="py-4 px-4">
                      <div className="flex items-center gap-3">
                        {item.product?.main_image ? (
                          <img 
                            src={item.product.main_image} 
                            alt={item.product.name_ar} 
                            className="w-12 h-12 object-contain rounded border" 
                          />
                        ) : (
                          <div className="w-12 h-12 bg-gray-100 rounded border flex items-center justify-center">
                            <Package className="w-6 h-6 text-gray-400" />
                          </div>
                        )}
                        <div className="text-right">
                          <p className="text-sm font-medium text-[#211C4D]">{item.product?.name_ar || item.product?.name}</p>
                          <p className="text-xs text-gray-500">#{item.product?.slug}</p>
                        </div>
                      </div>
                    </td>
                    <td className="py-4 px-4 text-center">
                      {item.product_option ? (
                        <span className="text-xs bg-gray-100 px-3 py-1 rounded">{item.product_option.value_ar}</span>
                      ) : (
                        <span className="text-xs text-gray-400">-</span>
                      )}
                    </td>
                    <td className="py-4 px-4 text-sm">{item.price.toFixed(2)} {t('SAR')}</td>
                    <td className="py-4 px-4 text-sm text-center">{item.quantity}</td>
                    <td className="py-4 px-4 text-sm font-bold text-[#211C4D]">{item.total.toFixed(2)} {t('SAR')}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* ملخص الفاتورة */}
          <div className="pt-6 border-t border-gray-200">
            <div className="flex justify-between items-start">
              <div className="flex items-center gap-3">
                <CreditCard className="w-5 h-5 text-[#211C4D]" />
                <div>
                  <p className="text-sm font-semibold">{t('PaymentMethod')}</p>
                  <p className="text-sm text-gray-600">{order.payment_method.name_ar}</p>
                </div>
              </div>
              <div className="text-right space-y-2">
                <div className="flex justify-between gap-8">
                  <span className="text-gray-500">{t('Subtotal')}</span>
                  <span>{order.subtotal.toFixed(2)} {t('SAR')}</span>
                </div>
                {order.shipping > 0 && (
                  <div className="flex justify-between gap-8">
                    <span className="text-gray-500">{t('Shipping')}</span>
                    <span>{order.shipping.toFixed(2)} {t('SAR')}</span>
                  </div>
                )}
                {order.tax > 0 && (
                  <div className="flex justify-between gap-8">
                    <span className="text-gray-500">{t('Tax')}</span>
                    <span>{order.tax.toFixed(2)} {t('SAR')}</span>
                  </div>
                )}
                {order.discount > 0 && (
                  <div className="flex justify-between gap-8">
                    <span className="text-gray-500">{t('Discount')}</span>
                    <span className="text-green-600">-{order.discount.toFixed(2)} {t('SAR')}</span>
                  </div>
                )}
                <div className="pt-3 border-t border-gray-200 flex justify-between gap-8">
                  <span className="font-semibold">{t('FinalTotal')}</span>
                  <span className="text-lg font-bold text-[#211C4D]">{order.total.toFixed(2)} {t('SAR')}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {/* أزرار الإجراءات */}
      {/* <div className="mt-6 pt-6 border-t border-gray-200 flex flex-wrap gap-3 justify-end">
        {order.invoice?.invoice_pdf_path && (
          <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors text-sm font-medium flex items-center gap-2">
            <span>{t('DownloadInvoice')}</span>
          </button>
        )}
        
        {order.status === 'Delivery is in progress' && (
          <button className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors text-sm font-medium">
            {t('TrackShipment')}
          </button>
        )}
        
        {order.status === 'completed' && (
          <button className="px-4 py-2 bg-[#211C4D] text-white rounded-lg hover:bg-[#211C4D]/90 transition-colors text-sm font-medium">
            {t('ReorderProducts')}
          </button>
        )}
        
        {order.status !== 'cancelled' && order.status !== 'completed' && (
          <button 
            onClick={() => handleCancelOrder(order.id)}
            className="px-4 py-2 border border-red-300 text-red-600 rounded-lg hover:bg-red-50 transition-colors text-sm font-medium"
          >
            {t('CancelOrder')}
          </button>
        )}
        
        <button className="px-4 py-2 border border-gray-300 text-gray-600 rounded-lg hover:bg-gray-50 transition-colors text-sm font-medium">
          {t('ContactSupport')}
        </button>
      </div> */}
    </div>
  );

  if (loading) {
    return (
      <Layout>
        <div className="flex justify-center items-center h-64">
          <div className="flex flex-col items-center gap-3">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#211C4D]"></div>
            <p className="text-[#211C4D]">{t('LoadingOrders')}</p>
          </div>
        </div>
      </Layout>
    );
  }
  
  if (error) {
    return (
      <Layout>
        <div className="flex justify-center items-center h-64">
          <div className="bg-red-50 border border-red-200 rounded-xl p-6 max-w-md">
            <p className="text-red-600 font-medium">{error}</p>
            <button onClick={fetchOrders} className="mt-4 px-4 py-2 bg-[#211C4D] text-white rounded-lg hover:bg-[#211C4D]/90 text-sm font-medium">
              {t('Reload')}
            </button>
          </div>
        </div>
      </Layout>
    );
  }
  
  return (
    <Layout>
      <div className="flex flex-col md:flex-row justify-center gap-[30px] mt-[80px] px-4 md:px-6">
        <Sidebar />
        <div className="md:w-[883px] w-full">
          <div className="w-full p-5 bg-gradient-to-r from-[#F8FAFC] to-[#85afe6] border border-gray-100 flex items-center justify-between rounded-2xl shadow-sm">
            <div>
              <h1 className="text-[#211C4D] text-[22px] font-bold">{t('MyOrders')}</h1>
              
            </div>
            <div className="flex items-center gap-2">
              <div className="text-right">
                <p className="text-[#211C4D] text-lg font-bold">{t('Orders')}:{orders.length} </p>
                <p className="text-gray-500 text-xs">{t('TotalOrders')}</p>
              </div>
              <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center">
                <Package className="w-5 h-5 text-[#211C4D]" />
              </div>
            </div>
          </div>
          
          <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full mt-[40px]">
            <div className="border-b border-gray-200">
              <TabsList className="flex flex-wrap md:flex-row items-center justify-start gap-2 w-full bg-transparent rounded-none px-2 md:px-5 py-2 overflow-x-auto">
                <TabsTrigger value="total" className="transition-all duration-300 ease-in-out !shadow-none text-[15px] md:text-[16px] font-[500] rounded-lg px-4 py-2 md:px-5 md:py-3 data-[state=active]:text-white data-[state=active]:bg-[#211C4D] text-[#211C4D99] hover:text-[#211C4D] hover:bg-gray-100">
                  <span className="flex items-center gap-2 whitespace-nowrap">
                    {t('AllOrders')}
                    <span className="px-2 py-0.5 rounded-full text-xs font-semibold bg-gray-200 data-[state=active]:bg-white/20 data-[state=active]:text-white text-[#211C4D]">
                      {orderCounts.total}
                    </span>
                  </span>
                </TabsTrigger>

                <TabsTrigger value="Delivering" className="transition-all duration-300 ease-in-out !shadow-none text-[15px] md:text-[16px] font-[500] rounded-lg px-4 py-2 md:px-5 md:py-3 data-[state=active]:text-white data-[state=active]:bg-[#211C4D] text-[#211C4D99] hover:text-[#211C4D] hover:bg-gray-100">
                  <span className="flex items-center gap-2 whitespace-nowrap">
                    {t('DeliveringOrders')}
                    <span className="px-2 py-0.5 rounded-full text-xs font-semibold bg-gray-200 data-[state=active]:bg-white/20 data-[state=active]:text-white text-[#211C4D]">
                      {orderCounts.Delivering}
                    </span>
                  </span>
                </TabsTrigger>

                <TabsTrigger value="completed" className="transition-all duration-300 ease-in-out !shadow-none text-[15px] md:text-[16px] font-[500] rounded-lg px-4 py-2 md:px-5 md:py-3 data-[state=active]:text-white data-[state=active]:bg-[#211C4D] text-[#211C4D99] hover:text-[#211C4D] hover:bg-gray-100">
                  <span className="flex items-center gap-2 whitespace-nowrap">
                    {t('CompletedOrders')}
                    <span className="px-2 py-0.5 rounded-full text-xs font-semibold bg-gray-200 data-[state=active]:bg-white/20 data-[state=active]:text-white text-[#211C4D]">
                      {orderCounts.completed}
                    </span>
                  </span>
                </TabsTrigger>

                <TabsTrigger value="Cancelled" className="transition-all duration-300 ease-in-out !shadow-none text-[15px] md:text-[16px] font-[500] rounded-lg px-4 py-2 md:px-5 md:py-3 data-[state=active]:text-white data-[state=active]:bg-[#211C4D] text-[#211C4D99] hover:text-[#211C4D] hover:bg-gray-100">
                  <span className="flex items-center gap-2 whitespace-nowrap">
                    {t('CancelledOrders')}
                    <span className="px-2 py-0.5 rounded-full text-xs font-semibold bg-gray-200 data-[state=active]:bg-white/20 data-[state=active]:text-white text-[#211C4D]">
                      {orderCounts.Cancelled}
                    </span>
                  </span>
                </TabsTrigger>
              </TabsList>
            </div>

            <TabsContent value={activeTab} className="mt-6">
              {filteredOrders.length === 0 ? (
                <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-12 text-center">
                  <div className="w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Package className="w-10 h-10 text-gray-400" />
                  </div>
                  <h3 className="text-[#211C4D] font-semibold text-xl mb-2">{t('NoOrders')}</h3>
                  <p className="text-gray-500 mb-6">
                    {activeTab === 'total' ? t('NoOrdersDescription') : t('NoOrdersFiltered')}
                  </p>
                  <button className="px-6 py-3 bg-[#211C4D] text-white rounded-lg hover:bg-[#211C4D]/90 font-medium">
                    {t('BrowseProducts')}
                  </button>
                </div>
              ) : (
                <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden" dir="rtl">
                  <div className="overflow-x-auto">
                    <table className="w-full">
                      <thead className="bg-gray-50">
                        <tr>
                          <th className="py-4 px-4 text-right min-w-[140px]">
                            <span className="text-[#211C4D] text-sm font-semibold">{t('OrderNumber')}</span>
                          </th>
                          <th className="py-4 px-4 text-right min-w-[250px]">
                            <span className="text-[#211C4D] text-sm font-semibold">
                              {t('Products')} ({filteredOrders.reduce((sum, order) => sum + order.items.length, 0)})
                            </span>
                          </th>
                          <th className="py-4 px-4 text-right min-w-[100px]">
                            <span className="text-[#211C4D] text-sm font-semibold">{t('OrderDate')}</span>
                          </th>
                          <th className="py-4 px-4 text-right min-w-[120px]">
                            <span className="text-[#211C4D] text-sm font-semibold">{t('TotalAmount')}</span>
                          </th>
                          <th className="py-4 px-4 text-right min-w-[120px]">
                            <span className="text-[#211C4D] text-sm font-semibold">{t('OrderStatus')}</span>
                          </th>
                          <th className="py-4 px-4 text-right min-w-[100px]">
                            <span className="text-[#211C4D] text-sm font-semibold">{t('Actions')}</span>
                          </th>
                        </tr>
                      </thead>

                      <tbody className="divide-y divide-gray-100">
                        {filteredOrders.map((order) => (
                          <React.Fragment key={order.id}>
                            <tr className="hover:bg-gray-50 transition-colors duration-200">
                              <td className="py-4 px-4">
                                <div className="flex items-center gap-3">
                                  <div className="bg-[#211C4D]/10 p-2 rounded-lg">
                                    <Package className="w-4 h-4 text-[#211C4D]" />
                                  </div>
                                  <div className="text-right">
                                    <p className="text-[#211C4D] font-semibold text-sm">#{order.order_number}</p>
                                    <p className="text-gray-500 text-xs mt-1">{order.items.length} {t('Product')}</p>
                                  </div>
                                </div>
                              </td>

                              <td className="py-4 px-4">
                                <div className="flex items-center gap-3">
                                  {order.items.slice(0, 2).map((item: any, index: number) => (
                                    <div key={index} className="flex items-center gap-2">
                                      {item.product?.main_image ? (
                                        <img src={item.product.main_image} alt={item.product.name_ar} className="w-10 h-10 object-contain rounded border border-gray-200" />
                                      ) : (
                                        <div className="w-10 h-10 bg-gray-100 rounded border border-gray-200 flex items-center justify-center">
                                          <Package className="w-4 h-4 text-gray-400" />
                                        </div>
                                      )}
                                      {index === 0 && order.items.length > 2 && (
                                        <span className="text-xs text-gray-500 bg-gray-100 px-2 py-1 rounded">+{order.items.length - 2}</span>
                                      )}
                                    </div>
                                  ))}
                                </div>
                              </td>

                              <td className="py-4 px-4">
                                <div className="flex items-center gap-2">
                                  <Calendar className="w-4 h-4 text-gray-400" />
                                  <span className="text-[#211C4D] font-medium text-[12px]">{formatDate(order.created_at, lang)}</span>
                                </div>
                              </td>

                              <td className="py-4 px-4">
                                <span className="text-[#211C4D] font-bold text-sm">{order.total.toFixed(2)} {t('SAR')}</span>
                              </td>

                              <td className="py-4 px-4">
                                <span 
                                  className="px-3 py-1.5 rounded-full text-xs font-semibold inline-flex items-center gap-1.5 whitespace-nowrap"
                                  style={{ color: getStatusText(order.status).color, backgroundColor: getStatusText(order.status).bgColor }}
                                >
                                  <span className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: getStatusText(order.status).color }} />
                                  {getStatusText(order.status).text}
                                </span>
                              </td>

                              <td className="py-4 px-4">
                                <button 
                                  onClick={(e) => {
                                    e.stopPropagation();
                                    toggleOrderDetails(order);
                                  }}
                                  className="p-2 text-gray-600 hover:text-[#211C4D] hover:bg-gray-100 rounded-lg transition-colors"
                                  title={expandedOrderId === order.id ? t('HideDetails') : t('ViewDetails')}
                                >
                                  {isMobile ? (
                                    <Eye className="w-5 h-5" />
                                  ) : expandedOrderId === order.id ? (
                                    <ChevronUp className="w-5 h-5" />
                                  ) : (
                                    <ChevronDown className="w-5 h-5" />
                                  )}
                                </button>
                              </td>
                            </tr>

                            {!isMobile && expandedOrderId === order.id && (
                              <tr>
                                <td colSpan={6} className="bg-gray-50 p-0">
                                  <OrderDetailsContent order={order} />
                                </td>
                              </tr>
                            )}
                          </React.Fragment>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              )}
            </TabsContent>
          </Tabs>
        </div>
      </div>

      {/* Sheet للموبايل */}
      {isMobile && selectedOrder && (
        <Sheet open={!!selectedOrder} onOpenChange={(open) => !open && setSelectedOrder(null)}>
          <SheetContent side="bottom" className="h-[90vh] overflow-y-auto rounded-t-3xl">
            <SheetHeader className="text-right border-b pb-4 sticky top-0 bg-white z-10">
              <SheetTitle className="flex items-center justify-between pr-4">
                <span>{t('OrderDetails')} #{selectedOrder.order_number}</span>
                <button onClick={() => setSelectedOrder(null)} className="p-2">
                  <X className="w-6 h-6" />
                </button>
              </SheetTitle>
            </SheetHeader>
            <OrderDetailsContent order={selectedOrder} />
          </SheetContent>
        </Sheet>
      )}
    </Layout>
  );
}