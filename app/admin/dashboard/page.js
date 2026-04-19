'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { supabase } from '../../../supabase.js';

export default function AdminDashboard() {
  const [prices, setPrices] = useState([]);
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState(null);
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
        .order('created_at', { ascending: false });

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
              <h1 className="text-xl font-bold text-gray-900">پنل مدیریت آریان اکسچنج</h1>
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
            
            {/* Prices Section */}
            <div className="bg-white overflow-hidden shadow-lg rounded-xl border border-gray-200">
              <div className="bg-gradient-to-r from-blue-600 to-blue-700 px-6 py-4">
                <h3 className="text-xl font-bold text-white flex items-center">
                  <div className="w-2 h-2 bg-white rounded-full mr-2"></div>
                  مدیریت قیمت‌ها
                </h3>
              </div>
              <div className="px-6 py-5">
                <div className="space-y-4">
                  {prices.map((price) => (
                    <div key={price.id} className="border rounded-lg p-4 bg-gray-50">
                      <div className="flex items-center justify-between mb-3">
                        <div>
                          <span className="font-bold text-lg text-gray-900">{price.name || price.currency}</span>
                          <span className="text-sm text-gray-500 mr-2">{price.symbol}</span>
                        </div>
                        <div className="flex items-center space-x-2">
                          <span className="text-sm text-gray-500">
                            آخرین به‌روزرسانی: {new Date(price.updated_at || price.lastUpdate).toLocaleString('fa-IR')}
                          </span>
                        </div>
                      </div>
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">
                            قیمت خرید (تومان)
                          </label>
                          <input
                            type="number"
                            value={price.buy_price || price.buyPrice || 0}
                            onChange={(e) => updatePrice(price.id, 'buy_price', parseFloat(e.target.value))}
                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                            step="0.01"
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">
                            قیمت فروش (تومان)
                          </label>
                          <input
                            type="number"
                            value={price.sell_price || price.sellPrice || 0}
                            onChange={(e) => updatePrice(price.id, 'sell_price', parseFloat(e.target.value))}
                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                            step="0.01"
                          />
                        </div>
                      </div>
                      <div className="mt-3 flex justify-end">
                        <button
                          onClick={() => savePrices()}
                          className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md text-sm font-medium transition-colors"
                        >
                          ذخیره تغییرات
                        </button>
                      </div>
                    </div>
                  ))}
                  <button
                    onClick={savePrices}
                    className="w-full bg-green-600 hover:bg-green-700 text-white font-medium py-3 px-4 rounded-md transition-colors"
                  >
                    ذخیره تمام قیمت‌ها
                  </button>
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
