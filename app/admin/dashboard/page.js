'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { supabase } from '../../../supabase.js';

export default function AdminDashboard() {
  const [prices, setPrices] = useState([]);
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState(null);
  const [editingCurrency, setEditingCurrency] = useState(null);
  const [showCreateForm, setShowCreateForm] = useState(false);
  const [newCurrency, setNewCurrency] = useState({
    name: '',
    symbol: '',
    image: '',
    buy_price: 0,
    sell_price: 0
  });
  const router = useRouter();

  useEffect(() => {
    // Check authentication and admin role
    const checkAuth = async () => {
      try {
        // Get current user
        const { data: { user: currentUser }, error: userError } = await supabase.auth.getUser();
        
        if (userError || !currentUser) {
          router.push('/admin');
          return;
        }

        // Check if user has admin role
        const { data: profileData, error: profileError } = await supabase
          .from('profiles')
          .select('role')
          .eq('id', currentUser.id)
          .single();

        if (profileError || profileData.role !== 'is_admin') {
          await supabase.auth.signOut();
          router.push('/admin');
          return;
        }

        setUser(currentUser);
        loadDashboardData();
      } catch (error) {
        console.error('Authentication check failed:', error);
        router.push('/admin');
      }
    };

    checkAuth();
  }, [router]);

  const loadDashboardData = async () => {
    try {
      // Fetch currencies from Supabase
      const { data: currenciesData, error: currenciesError } = await supabase
        .from('currencies')
        .select('*')
        .order('updated_at', { ascending: false });

      // Fetch messages from Supabase
      const { data: messagesData, error: messagesError } = await supabase
        .from('messages')
        .select('*')
        .order('created_at', { ascending: false });

      if (currenciesError) {
        console.error('Error fetching currencies:', currenciesError);
      } else {
        setPrices(currenciesData || []);
      }

      if (messagesError) {
        console.error('Error fetching messages:', messagesError);
      } else {
        setMessages(messagesData || []);
      }
    } catch (error) {
      console.error('Error loading dashboard data:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = async () => {
    try {
      await supabase.auth.signOut();
      router.push('/admin');
    } catch (error) {
      console.error('Logout error:', error);
      router.push('/admin');
    }
  };

  const updatePrice = (id, field, value) => {
    setPrices(prices.map(price => 
      price.id === id ? { ...price, [field]: value } : price
    ));
  };

  const savePrices = async () => {
    try {
      // Update each currency in Supabase
      for (const price of prices) {
        const { error } = await supabase
          .from('currencies')
          .update({
            buy_price: price.buy_price || price.buyPrice,
            sell_price: price.sell_price || price.sellPrice,
            updated_at: new Date().toISOString()
          })
          .eq('id', price.id);

        if (error) {
          console.error('Error updating currency:', error);
          alert('خطا در ذخیره قیمت‌ها: ' + error.message);
          return;
        }
      }
      
      alert('قیمت‌ها با موفقیت ذخیره شد');
      loadDashboardData(); // Reload data to show updated timestamps
    } catch (error) {
      console.error('Error saving prices:', error);
      alert('خطا در ذخیره قیمت‌ها');
    }
  };

  const markMessageAsRead = async (messageId) => {
    try {
      const { error } = await supabase
        .from('messages')
        .update({ status: 'read' })
        .eq('id', messageId);

      if (error) {
        console.error('Error marking message as read:', error);
        alert('خطا در علامت‌گذاری پیام: ' + error.message);
      } else {
        loadDashboardData(); // Reload messages
      }
    } catch (error) {
      console.error('Error marking message as read:', error);
      alert('خطا در علامت‌گذاری پیام');
    }
  };

  const deleteMessage = async (messageId) => {
    if (!confirm('آیا از حذف این پیام مطمئن هستید؟')) {
      return;
    }

    try {
      const { error } = await supabase
        .from('messages')
        .delete()
        .eq('id', messageId);

      if (error) {
        console.error('Error deleting message:', error);
        alert('خطا در حذف پیام: ' + error.message);
      } else {
        loadDashboardData(); // Reload messages
      }
    } catch (error) {
      console.error('Error deleting message:', error);
      alert('خطا در حذف پیام');
    }
  };

  const createCurrency = async () => {
    if (!newCurrency.name || !newCurrency.symbol) {
      alert('لطفاً نام و نماد ارز را وارد کنید');
      return;
    }

    try {
      const { error } = await supabase
        .from('currencies')
        .insert({
          name: newCurrency.name,
          symbol: newCurrency.symbol,
          image: newCurrency.image,
          buy_price: newCurrency.buy_price,
          sell_price: newCurrency.sell_price,
          updated_at: new Date().toISOString()
        });

      if (error) {
        console.error('Error creating currency:', error);
        alert('خطا در ایجاد ارز: ' + error.message);
      } else {
        alert('ارز با موفقیت ایجاد شد');
        setNewCurrency({ name: '', symbol: '', image: '', buy_price: 0, sell_price: 0 });
        setShowCreateForm(false);
        loadDashboardData();
      }
    } catch (error) {
      console.error('Error creating currency:', error);
      alert('خطا در ایجاد ارز');
    }
  };

  const updateCurrency = async (id, updates) => {
    try {
      const { error } = await supabase
        .from('currencies')
        .update({
          ...updates,
          updated_at: new Date().toISOString()
        })
        .eq('id', id);

      if (error) {
        console.error('Error updating currency:', error);
        alert('خطا در به‌روزرسانی ارز: ' + error.message);
      } else {
        alert('ارز با موفقیت به‌روزرسانی شد');
        setEditingCurrency(null);
        loadDashboardData();
      }
    } catch (error) {
      console.error('Error updating currency:', error);
      alert('خطا در به‌روزرسانی ارز');
    }
  };

  const deleteCurrency = async (id) => {
    if (!confirm('آیا از حذف این ارز مطمئن هستید؟ این عملیات قابل بازگشت نیست.')) {
      return;
    }

    try {
      const { error } = await supabase
        .from('currencies')
        .delete()
        .eq('id', id);

      if (error) {
        console.error('Error deleting currency:', error);
        alert('خطا در حذف ارز: ' + error.message);
      } else {
        alert('ارز با موفقیت حذف شد');
        loadDashboardData();
      }
    } catch (error) {
      console.error('Error deleting currency:', error);
      alert('خطا در حذف ارز');
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-xl">در حال بارگذاری...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      {/* Header */}
      <div className="bg-white shadow-lg border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            <div className="flex items-center space-x-3">
              <div className="w-8 h-8 bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg"></div>
              <h1 className="text-xl font-bold text-gray-900">پنل مدیریت صرافی آرین</h1>
            </div>
            <div className="flex items-center space-x-4">
              <span className="text-sm text-gray-600">
                {user?.email}
              </span>
              <button
                onClick={handleLogout}
                className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-md text-sm font-medium transition-colors shadow-sm"
              >
                خروج
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto py-8 sm:px-6 lg:px-8">
        <div className="px-4 py-6 sm:px-0">
          {/* Dashboard Stats */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <div className="bg-white rounded-lg shadow-md p-6 border border-gray-200">
              <div className="flex items-center">
                <div className="p-3 bg-blue-100 rounded-lg">
                  <div className="w-6 h-6 bg-blue-600 rounded"></div>
                </div>
                <div className="mr-4">
                  <p className="text-sm font-medium text-gray-600">تعداد ارزها</p>
                  <p className="text-2xl font-bold text-gray-900">{prices.length}</p>
                </div>
              </div>
            </div>
            <div className="bg-white rounded-lg shadow-md p-6 border border-gray-200">
              <div className="flex items-center">
                <div className="p-3 bg-green-100 rounded-lg">
                  <div className="w-6 h-6 bg-green-600 rounded"></div>
                </div>
                <div className="mr-4">
                  <p className="text-sm font-medium text-gray-600">پیام‌های خوانده نشده</p>
                  <p className="text-2xl font-bold text-gray-900">
                    {messages.filter(m => m.status === 'unread').length}
                  </p>
                </div>
              </div>
            </div>
            <div className="bg-white rounded-lg shadow-md p-6 border border-gray-200">
              <div className="flex items-center">
                <div className="p-3 bg-purple-100 rounded-lg">
                  <div className="w-6 h-6 bg-purple-600 rounded"></div>
                </div>
                <div className="mr-4">
                  <p className="text-sm font-medium text-gray-600">کل پیام‌ها</p>
                  <p className="text-2xl font-bold text-gray-900">{messages.length}</p>
                </div>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            
            {/* Currencies Management Section */}
            <div className="bg-white overflow-hidden shadow-lg rounded-xl border border-gray-200">
              <div className="bg-gradient-to-r from-blue-600 to-blue-700 px-6 py-4">
                <div className="flex items-center justify-between">
                  <h3 className="text-xl font-bold text-white flex items-center">
                    <div className="w-2 h-2 bg-white rounded-full mr-2"></div>
                    مدیریت ارزها
                  </h3>
                  <button
                    onClick={() => setShowCreateForm(!showCreateForm)}
                    className="bg-white text-blue-600 hover:bg-blue-50 px-4 py-2 rounded-md text-sm font-medium transition-colors"
                  >
                    {showCreateForm ? 'لغو' : '+ افزودن ارز جدید'}
                  </button>
                </div>
              </div>
              <div className="px-6 py-5">
                {/* Create New Currency Form */}
                {showCreateForm && (
                  <div className="mb-6 p-4 border-2 border-dashed border-blue-300 rounded-lg bg-blue-50">
                    <h4 className="font-bold text-lg mb-4 text-blue-900">ایجاد ارز جدید</h4>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">نام ارز</label>
                        <input
                          type="text"
                          value={newCurrency.name}
                          onChange={(e) => setNewCurrency({...newCurrency, name: e.target.value})}
                          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                          placeholder="مثال: بیت‌کوین"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">نماد ارز</label>
                        <input
                          type="text"
                          value={newCurrency.symbol}
                          onChange={(e) => setNewCurrency({...newCurrency, symbol: e.target.value})}
                          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                          placeholder="مثال: BTC"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">آدرس تصویر</label>
                        <input
                          type="text"
                          value={newCurrency.image}
                          onChange={(e) => setNewCurrency({...newCurrency, image: e.target.value})}
                          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                          placeholder="https://example.com/image.png"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">قیمت خرید (تومان)</label>
                        <input
                          type="number"
                          value={newCurrency.buy_price}
                          onChange={(e) => setNewCurrency({...newCurrency, buy_price: parseFloat(e.target.value) || 0})}
                          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                          step="0.01"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">قیمت فروش (تومان)</label>
                        <input
                          type="number"
                          value={newCurrency.sell_price}
                          onChange={(e) => setNewCurrency({...newCurrency, sell_price: parseFloat(e.target.value) || 0})}
                          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                          step="0.01"
                        />
                      </div>
                    </div>
                    <div className="mt-4 flex justify-end space-x-2 space-x-reverse">
                      <button
                        onClick={() => {
                          setShowCreateForm(false);
                          setNewCurrency({ name: '', symbol: '', image: '', buy_price: 0, sell_price: 0 });
                        }}
                        className="bg-gray-500 hover:bg-gray-600 text-white px-4 py-2 rounded-md text-sm font-medium transition-colors"
                      >
                        لغو
                      </button>
                      <button
                        onClick={createCurrency}
                        className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-md text-sm font-medium transition-colors"
                      >
                        ایجاد ارز
                      </button>
                    </div>
                  </div>
                )}

                {/* Currencies List */}
                <div className="space-y-4">
                  {prices.length === 0 ? (
                    <div className="text-center py-8 text-gray-500">
                      ارزی یافت نشد. برای شروع، یک ارز جدید ایجاد کنید.
                    </div>
                  ) : (
                    prices.map((currency) => (
                      <div key={currency.id} className="border rounded-lg p-4 bg-gray-50 hover:bg-gray-100 transition-colors">
                        {editingCurrency === currency.id ? (
                          // Edit Mode
                          <div>
                            <div className="flex items-center justify-between mb-3">
                              <h4 className="font-bold text-lg text-blue-600">ویرایش ارز</h4>
                              <button
                                onClick={() => setEditingCurrency(null)}
                                className="text-gray-500 hover:text-gray-700"
                              >
                                ✕
                              </button>
                            </div>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                              <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">نام ارز</label>
                                <input
                                  type="text"
                                  value={currency.name}
                                  onChange={(e) => updatePrice(currency.id, 'name', e.target.value)}
                                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                />
                              </div>
                              <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">نماد ارز</label>
                                <input
                                  type="text"
                                  value={currency.symbol}
                                  onChange={(e) => updatePrice(currency.id, 'symbol', e.target.value)}
                                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                />
                              </div>
                              <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">آدرس تصویر</label>
                                <input
                                  type="text"
                                  value={currency.image || ''}
                                  onChange={(e) => updatePrice(currency.id, 'image', e.target.value)}
                                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                />
                              </div>
                              <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">قیمت خرید (تومان)</label>
                                <input
                                  type="number"
                                  value={currency.buy_price || currency.buyPrice || 0}
                                  onChange={(e) => updatePrice(currency.id, 'buy_price', parseFloat(e.target.value))}
                                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                  step="0.01"
                                />
                              </div>
                              <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">قیمت فروش (تومان)</label>
                                <input
                                  type="number"
                                  value={currency.sell_price || currency.sellPrice || 0}
                                  onChange={(e) => updatePrice(currency.id, 'sell_price', parseFloat(e.target.value))}
                                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                  step="0.01"
                                />
                              </div>
                            </div>
                            <div className="mt-4 flex justify-end space-x-2 space-x-reverse">
                              <button
                                onClick={() => setEditingCurrency(null)}
                                className="bg-gray-500 hover:bg-gray-600 text-white px-4 py-2 rounded-md text-sm font-medium transition-colors"
                              >
                                لغو
                              </button>
                              <button
                                onClick={() => updateCurrency(currency.id, {
                                  name: currency.name,
                                  symbol: currency.symbol,
                                  image: currency.image,
                                  buy_price: currency.buy_price || currency.buyPrice,
                                  sell_price: currency.sell_price || currency.sellPrice
                                })}
                                className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md text-sm font-medium transition-colors"
                              >
                                ذخیره تغییرات
                              </button>
                            </div>
                          </div>
                        ) : (
                          // View Mode
                          <div>
                            <div className="flex items-center justify-between mb-3">
                              <div className="flex items-center space-x-3 space-x-reverse">
                                {currency.image && (
                                  <img 
                                    src={currency.image} 
                                    alt={currency.name}
                                    className="w-10 h-10 rounded-full object-cover"
                                    onError={(e) => e.target.style.display = 'none'}
                                  />
                                )}
                                <div>
                                  <span className="font-bold text-lg text-gray-900">{currency.name || currency.currency}</span>
                                  <span className="text-sm text-gray-500 mr-2">{currency.symbol}</span>
                                </div>
                              </div>
                              <div className="flex items-center space-x-2">
                                <span className="text-sm text-gray-500">
                                  آخرین به‌روزرسانی: {new Date(currency.updated_at || currency.lastUpdate).toLocaleString('fa-IR')}
                                </span>
                              </div>
                            </div>
                            <div className="grid grid-cols-2 gap-4 mb-3">
                              <div className="bg-white p-3 rounded border">
                                <p className="text-xs text-gray-600 mb-1">قیمت خرید</p>
                                <p className="text-lg font-bold text-green-600">
                                  {(currency.buy_price || currency.buyPrice || 0).toLocaleString('fa-IR')} تومان
                                </p>
                              </div>
                              <div className="bg-white p-3 rounded border">
                                <p className="text-xs text-gray-600 mb-1">قیمت فروش</p>
                                <p className="text-lg font-bold text-red-600">
                                  {(currency.sell_price || currency.sellPrice || 0).toLocaleString('fa-IR')} تومان
                                </p>
                              </div>
                            </div>
                            <div className="flex justify-end space-x-2 space-x-reverse">
                              <button
                                onClick={() => setEditingCurrency(currency.id)}
                                className="bg-blue-600 hover:bg-blue-700 text-white px-3 py-1 rounded text-sm transition-colors"
                              >
                                ویرایش
                              </button>
                              <button
                                onClick={() => deleteCurrency(currency.id)}
                                className="bg-red-600 hover:bg-red-700 text-white px-3 py-1 rounded text-sm transition-colors"
                              >
                                حذف
                              </button>
                            </div>
                          </div>
                        )}
                      </div>
                    ))
                  )}
                </div>
              </div>
            </div>

            {/* Messages Section */}
            <div className="bg-white overflow-hidden shadow-lg rounded-xl border border-gray-200">
              <div className="bg-gradient-to-r from-green-600 to-green-700 px-6 py-4">
                <h3 className="text-xl font-bold text-white flex items-center">
                  <div className="w-2 h-2 bg-white rounded-full mr-2"></div>
                  پیام‌های کاربران
                </h3>
              </div>
              <div className="px-6 py-5">
                <div className="space-y-4 max-h-96 overflow-y-auto">
                  {messages.length === 0 ? (
                    <div className="text-center py-8 text-gray-500">
                      پیامی یافت نشد
                    </div>
                  ) : (
                    messages.map((message) => (
                      <div key={message.id} className={`border rounded-lg p-4 ${
                        message.status === 'unread' ? 'bg-blue-50 border-blue-200' : 'bg-gray-50'
                      }`}>
                        <div className="flex items-center justify-between mb-2">
                          <div>
                            <span className="font-medium text-gray-900">{message.name || 'نامشخص'}</span>
                            <span className="text-sm text-gray-500 mr-2">{message.email || 'ایمیل ثبت نشده'}</span>
                          </div>
                          <div className="flex items-center space-x-2">
                            <span className={`px-2 py-1 text-xs rounded-full ${
                              message.status === 'unread' 
                                ? 'bg-red-100 text-red-800' 
                                : 'bg-green-100 text-green-800'
                            }`}>
                              {message.status === 'unread' ? 'خوانده نشده' : 'خوانده شده'}
                            </span>
                            <span className="text-sm text-gray-500">
                              {new Date(message.created_at || message.date).toLocaleString('fa-IR')}
                            </span>
                          </div>
                        </div>
                        <p className="text-gray-700 mb-3 leading-relaxed">
                          {message.message || message.content}
                        </p>
                        <div className="flex space-x-2 space-x-reverse">
                          {message.status === 'unread' && (
                            <button 
                              onClick={() => markMessageAsRead(message.id)}
                              className="text-sm bg-blue-600 hover:bg-blue-700 text-white px-3 py-1 rounded transition-colors"
                            >
                              علامت‌گذاری به عنوان خوانده شده
                            </button>
                          )}
                          <button 
                            onClick={() => deleteMessage(message.id)}
                            className="text-sm bg-red-600 hover:bg-red-700 text-white px-3 py-1 rounded transition-colors"
                          >
                            حذف
                          </button>
                        </div>
                      </div>
                    ))
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
