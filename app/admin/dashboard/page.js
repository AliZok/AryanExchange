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
    name_farsi: '',
    name_english: '',
    symbol: '',
    image: '',
    price: 0,
    unit_farsi: 'تومان',
    unit_english: 'Toman'
  });
  const [activeTab, setActiveTab] = useState('currencies');
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
      // Fetch currencies from API
      const currenciesResponse = await fetch('/api/currencies');
      if (currenciesResponse.ok) {
        const currenciesData = await currenciesResponse.json();
        setPrices(currenciesData || []);
      } else {
        console.error('Error fetching currencies from API');
      }

      // Fetch messages from Supabase (keeping this as is since we don't have messages API)
      const { data: messagesData, error: messagesError } = await supabase
        .from('messages')
        .select('*')
        .order('created_at', { ascending: false });

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
            price: price.price,
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
    if (!newCurrency.name_farsi || !newCurrency.name_english || !newCurrency.symbol) {
      alert('لطفاً نام فارسی، نام انگلیسی و نماد ارز را وارد کنید');
      return;
    }

    try {
      const response = await fetch('/api/currencies', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name_farsi: newCurrency.name_farsi,
          name_english: newCurrency.name_english,
          symbol: newCurrency.symbol,
          image: newCurrency.image,
          price: newCurrency.price,
          unit_farsi: newCurrency.unit_farsi,
          unit_english: newCurrency.unit_english
        }),
      });

      if (response.ok) {
        alert('ارز با موفقیت ایجاد شد');
        setNewCurrency({ name_farsi: '', name_english: '', symbol: '', image: '', price: 0, unit_farsi: 'تومان', unit_english: 'Toman' });
        setShowCreateForm(false);
        loadDashboardData();
      } else {
        const errorData = await response.json();
        alert('خطا در ایجاد ارز: ' + (errorData.error || 'خطای نامشخص'));
      }
    } catch (error) {
      console.error('Error creating currency:', error);
      alert('خطا در ایجاد ارز');
    }
  };

  const updateCurrency = async (id, updates) => {
    try {
      const response = await fetch('/api/currencies', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ id, ...updates }),
      });

      if (response.ok) {
        alert('ارز با موفقیت به‌روزرسانی شد');
        setEditingCurrency(null);
        loadDashboardData();
      } else {
        const errorData = await response.json();
        alert('خطا در به‌روزرسانی ارز: ' + (errorData.error || 'خطای نامشخص'));
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
      const response = await fetch(`/api/currencies?id=${id}`, {
        method: 'DELETE',
      });

      if (response.ok) {
        alert('ارز با موفقیت حذف شد');
        loadDashboardData();
      } else {
        const errorData = await response.json();
        alert('خطا در حذف ارز: ' + (errorData.error || 'خطای نامشخص'));
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

          {/* Tab Navigation */}
          <div className="bg-white rounded-xl shadow-lg border border-gray-200 mb-8">
            <div className="border-b border-gray-200">
              <nav className="flex space-x-8 px-6" aria-label="Tabs">
                <button
                  onClick={() => setActiveTab('currencies')}
                  className={`py-4 px-1 border-b-2 font-medium text-sm transition-colors ${
                    activeTab === 'currencies'
                      ? 'border-blue-500 text-blue-600'
                      : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                  }`}
                >
                  <div className="flex items-center space-x-2">
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    <span>مدیریت ارزها</span>
                  </div>
                </button>
                <button
                  onClick={() => setActiveTab('messages')}
                  className={`py-4 px-1 border-b-2 font-medium text-sm transition-colors ${
                    activeTab === 'messages'
                      ? 'border-blue-500 text-blue-600'
                      : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                  }`}
                >
                  <div className="flex items-center space-x-2">
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4" />
                    </svg>
                    <span>پیام‌های کاربران</span>
                    {messages.filter(m => m.status === 'unread').length > 0 && (
                      <span className="bg-red-500 text-white text-xs rounded-full px-2 py-0.5">
                        {messages.filter(m => m.status === 'unread').length}
                      </span>
                    )}
                  </div>
                </button>
              </nav>
            </div>
          </div>

          {/* Tab Content */}
          {activeTab === 'currencies' && (
            <div className="bg-white overflow-hidden shadow-lg rounded-xl border border-gray-200">
              <div className="bg-gradient-to-r from-blue-600 to-blue-700 px-6 py-4">
                <div className="flex items-center justify-between">
                  <h3 className="text-xl font-bold text-white flex items-center">
                    <div className="w-2 h-2 bg-white rounded-full mr-2"></div>
                    مدیریت ارزها
                  </h3>
                  <button
                    onClick={() => setShowCreateForm(!showCreateForm)}
                    className="bg-white text-blue-600 hover:bg-blue-50 px-4 py-2 rounded-md text-sm font-medium transition-colors shadow-sm"
                  >
                    {showCreateForm ? 'لغو' : '+ افزودن ارز جدید'}
                  </button>
                </div>
              </div>
              <div className="px-6 py-5">
                {/* Create New Currency Form */}
                {showCreateForm && (
                  <div className="mb-8 p-6 border-2 border-dashed border-blue-300 rounded-xl bg-gradient-to-br from-blue-50 to-indigo-50 shadow-sm">
                    <div className="flex items-center mb-6">
                      <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center text-white ml-3">
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                        </svg>
                      </div>
                      <h4 className="font-bold text-xl text-blue-900">ایجاد ارز جدید</h4>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="space-y-2">
                        <label className="block text-sm font-semibold text-gray-700">نام فارسی ارز</label>
                        <input
                          type="text"
                          value={newCurrency.name_farsi}
                          onChange={(e) => setNewCurrency({...newCurrency, name_farsi: e.target.value})}
                          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-900 transition-all"
                          placeholder="مثال: بیت‌کوین"
                        />
                      </div>
                      <div className="space-y-2">
                        <label className="block text-sm font-semibold text-gray-700">نام انگلیسی ارز</label>
                        <input
                          type="text"
                          value={newCurrency.name_english}
                          onChange={(e) => setNewCurrency({...newCurrency, name_english: e.target.value})}
                          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-900 transition-all"
                          placeholder="مثال: Bitcoin"
                        />
                      </div>
                      <div className="space-y-2">
                        <label className="block text-sm font-semibold text-gray-700">نماد ارز</label>
                        <input
                          type="text"
                          value={newCurrency.symbol}
                          onChange={(e) => setNewCurrency({...newCurrency, symbol: e.target.value})}
                          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-900 transition-all"
                          placeholder="مثال: BTC"
                        />
                      </div>
                      <div className="space-y-2">
                        <label className="block text-sm font-semibold text-gray-700">آدرس تصویر</label>
                        <input
                          type="text"
                          value={newCurrency.image}
                          onChange={(e) => setNewCurrency({...newCurrency, image: e.target.value})}
                          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-900 transition-all"
                          placeholder="https://example.com/image.png"
                        />
                      </div>
                      <div className="space-y-2">
                        <label className="block text-sm font-semibold text-gray-700">قیمت (تومان)</label>
                        <input
                          type="number"
                          value={newCurrency.price}
                          onChange={(e) => setNewCurrency({...newCurrency, price: parseFloat(e.target.value) || 0})}
                          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-900 transition-all"
                          step="0.01"
                        />
                      </div>
                      <div className="space-y-2">
                        <label className="block text-sm font-semibold text-gray-700">واحد فارسی</label>
                        <input
                          type="text"
                          value={newCurrency.unit_farsi}
                          onChange={(e) => setNewCurrency({...newCurrency, unit_farsi: e.target.value})}
                          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-900 transition-all"
                          placeholder="مثال: تومان"
                        />
                      </div>
                      <div className="space-y-2">
                        <label className="block text-sm font-semibold text-gray-700">واحد انگلیسی</label>
                        <input
                          type="text"
                          value={newCurrency.unit_english}
                          onChange={(e) => setNewCurrency({...newCurrency, unit_english: e.target.value})}
                          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-900 transition-all"
                          placeholder="مثال: Toman"
                        />
                      </div>
                    </div>
                    <div className="mt-8 flex justify-end space-x-6 space-x-reverse">
                      <button
                        onClick={() => {
                          setShowCreateForm(false);
                          setNewCurrency({ name_farsi: '', name_english: '', symbol: '', image: '', price: 0, unit_farsi: 'تومان', unit_english: 'Toman' });
                        }}
                        className="bg-gray-500 hover:bg-gray-600 text-white px-6 py-3 rounded-lg text-sm font-medium transition-all shadow-sm hover:shadow-md"
                      >
                        لغو
                      </button>
                      <button
                        onClick={createCurrency}
                        className="bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-lg text-sm font-medium transition-all shadow-sm hover:shadow-md"
                      >
                        ایجاد ارز
                      </button>
                    </div>
                  </div>
                )}

                {/* Currencies List */}
                <div className="space-y-6">
                  {prices.length === 0 ? (
                    <div className="text-center py-16 text-gray-500">
                      <svg className="w-20 h-20 mx-auto text-gray-300 mb-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                      <p className="text-xl font-medium text-gray-600 mb-2">ارزی یافت نشد</p>
                      <p className="text-gray-500">برای شروع، یک ارز جدید ایجاد کنید.</p>
                    </div>
                  ) : (
                    prices.map((currency) => (
                      <div key={currency.id} className="border border-gray-200 rounded-xl p-6 bg-white hover:shadow-lg transition-all duration-200 shadow-sm">
                        {editingCurrency === currency.id ? (
                          // Edit Mode
                          <div>
                            <div className="flex items-center justify-between mb-6">
                              <div className="flex items-center space-x-3 space-x-reverse">
                                <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center text-white">
                                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                                  </svg>
                                </div>
                                <h4 className="font-bold text-xl text-blue-600">ویرایش ارز</h4>
                              </div>
                              <button
                                onClick={() => setEditingCurrency(null)}
                                className="text-gray-400 hover:text-gray-600 transition-colors"
                              >
                                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                </svg>
                              </button>
                            </div>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                              <div className="space-y-2">
                                <label className="block text-sm font-semibold text-gray-700">نام فارسی ارز</label>
                                <input
                                  type="text"
                                  value={currency.name_farsi || ''}
                                  onChange={(e) => updatePrice(currency.id, 'name_farsi', e.target.value)}
                                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-900 transition-all"
                                />
                              </div>
                              <div className="space-y-2">
                                <label className="block text-sm font-semibold text-gray-700">نام انگلیسی ارز</label>
                                <input
                                  type="text"
                                  value={currency.name_english || ''}
                                  onChange={(e) => updatePrice(currency.id, 'name_english', e.target.value)}
                                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-900 transition-all"
                                />
                              </div>
                              <div className="space-y-2">
                                <label className="block text-sm font-semibold text-gray-700">نماد ارز</label>
                                <input
                                  type="text"
                                  value={currency.symbol}
                                  onChange={(e) => updatePrice(currency.id, 'symbol', e.target.value)}
                                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-900 transition-all"
                                />
                              </div>
                              <div className="space-y-2">
                                <label className="block text-sm font-semibold text-gray-700">آدرس تصویر</label>
                                <input
                                  type="text"
                                  value={currency.image || ''}
                                  onChange={(e) => updatePrice(currency.id, 'image', e.target.value)}
                                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-900 transition-all"
                                />
                              </div>
                              <div className="space-y-2">
                                <label className="block text-sm font-semibold text-gray-700">قیمت (تومان)</label>
                                <input
                                  type="number"
                                  value={currency.price || 0}
                                  onChange={(e) => updatePrice(currency.id, 'price', parseFloat(e.target.value))}
                                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-900 transition-all"
                                  step="0.01"
                                />
                              </div>
                              <div className="space-y-2">
                                <label className="block text-sm font-semibold text-gray-700">واحد فارسی</label>
                                <input
                                  type="text"
                                  value={currency.unit_farsi || ''}
                                  onChange={(e) => updatePrice(currency.id, 'unit_farsi', e.target.value)}
                                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-900 transition-all"
                                />
                              </div>
                              <div className="space-y-2">
                                <label className="block text-sm font-semibold text-gray-700">واحد انگلیسی</label>
                                <input
                                  type="text"
                                  value={currency.unit_english || ''}
                                  onChange={(e) => updatePrice(currency.id, 'unit_english', e.target.value)}
                                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-900 transition-all"
                                />
                              </div>
                            </div>
                            <div className="mt-8 flex justify-end space-x-6 space-x-reverse">
                              <button
                                onClick={() => setEditingCurrency(null)}
                                className="bg-gray-500 hover:bg-gray-600 text-white px-6 py-3 rounded-lg text-sm font-medium transition-all shadow-sm hover:shadow-md"
                              >
                                لغو
                              </button>
                              <button
                                onClick={() => updateCurrency(currency.id, {
                                  name_farsi: currency.name_farsi,
                                  name_english: currency.name_english,
                                  symbol: currency.symbol,
                                  image: currency.image,
                                  price: currency.price || 0,
                                  unit_farsi: currency.unit_farsi,
                                  unit_english: currency.unit_english
                                })}
                                className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg text-sm font-medium transition-all shadow-sm hover:shadow-md"
                              >
                                ذخیره تغییرات
                              </button>
                            </div>
                          </div>
                        ) : (
                          // View Mode
                          <div>
                            <div className="flex items-start justify-between mb-6">
                              <div className="flex items-center gap-2">
                                {currency.image ? (
                                  <img 
                                    src={currency.image} 
                                    alt={currency.name}
                                    className="w-16 h-16 rounded-xl object-cover shadow-sm"
                                    onError={(e) => {
                                      e.target.style.display = 'none';
                                      e.target.nextElementSibling.style.display = 'flex';
                                    }}
                                  />
                                ) : null}
                                <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-purple-600 rounded-xl flex items-center justify-center text-white font-bold text-xl shadow-sm" style={{display: currency.image ? 'none' : 'flex'}}>
                                  {(currency.name_farsi || currency.symbol || '؟')[0]}
                                </div>
                                <div>
                                  <h4 className="font-bold text-xl text-gray-900 mb-1">{currency.name_farsi || currency.name || currency.currency}</h4>
                                  <div className="flex items-center gap-2 text-sm text-gray-500">
                                    <span className="bg-gray-100 px-2 py-1 rounded-md font-medium">{currency.name_english}</span>
                                    <span className="bg-gray-100 px-2 py-1 rounded-md font-medium">{currency.symbol}</span>
                                  </div>
                                </div>
                              </div>
                              <div className="text-right">
                                <span className="text-xs text-gray-500 block mb-1">آخرین بروزرسانی</span>
                                <span className="text-sm text-gray-600">
                                  {new Date(currency.updated_at || currency.lastUpdate).toLocaleString('fa-IR')}
                                </span>
                              </div>
                            </div>
                            <div className="bg-gradient-to-r from-blue-50 to-indigo-50 p-4 rounded-xl border border-blue-100">
                              <p className="text-xs font-semibold text-blue-700 mb-2">قیمت فعلی</p>
                              <p className="text-2xl font-bold text-blue-600">
                                {(currency.price || 0).toLocaleString('fa-IR')} <span className="text-lg font-normal">{currency.unit_farsi || ''}</span>
                              </p>
                            </div>
                            <div className="flex justify-end gap-2 mt-6">
                              <button
                                onClick={() => setEditingCurrency(currency.id)}
                                className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-2.5 rounded-lg text-sm font-medium transition-all shadow-sm hover:shadow-md flex items-center space-x-2 space-x-reverse"
                              >
                                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                                </svg>
                                <span>ویرایش</span>
                              </button>
                              <button
                                onClick={() => deleteCurrency(currency.id)}
                                className="bg-red-600 hover:bg-red-700 text-white px-5 py-2.5 rounded-lg text-sm font-medium transition-all shadow-sm hover:shadow-md flex items-center space-x-2 space-x-reverse"
                              >
                                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                                </svg>
                                <span>حذف</span>
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
          )}

          {activeTab === 'messages' && (
            <div className="bg-white overflow-hidden shadow-lg rounded-xl border border-gray-200">
              <div className="bg-gradient-to-r from-green-600 to-green-700 px-6 py-4">
                <div className="flex items-center justify-between">
                  <h3 className="text-xl font-bold text-white flex items-center">
                    <div className="w-2 h-2 bg-white rounded-full mr-2"></div>
                    پیام‌های کاربران
                  </h3>
                  <div className="flex items-center space-x-2">
                    <span className="bg-white/20 text-white px-3 py-1 rounded-md text-sm">
                      {messages.filter(m => m.status === 'unread').length} خوانده نشده
                    </span>
                  </div>
                </div>
              </div>
              <div className="px-6 py-5">
                <div className="space-y-4 max-h-96 overflow-y-auto">
                  {messages.length === 0 ? (
                    <div className="text-center py-12 text-gray-500">
                      <svg className="w-16 h-16 mx-auto text-gray-300 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4" />
                      </svg>
                      <p className="text-lg">پیامی یافت نشد</p>
                    </div>
                  ) : (
                    messages.map((message) => (
                      <div key={message.id} className={`border rounded-lg p-5 transition-all hover:shadow-md ${
                        message.status === 'unread' ? 'bg-blue-50 border-blue-200' : 'bg-gray-50 border-gray-200'
                      }`}>
                        <div className="flex items-start justify-between mb-3">
                          <div className="flex-1">
                            <div className="flex items-center gap-2 mb-2">

                              <div>
                                <span className="font-semibold text-gray-900 text-lg">{message.name || 'نامشخص'}</span>
                                <div className="text-sm text-gray-500">{message.email || 'ایمیل ثبت نشده'}</div>
                              </div>
                            </div>
                          </div>
                          <div className="flex flex-col items-end space-y-2">
                            <span className={`px-3 py-1 text-xs rounded-full font-medium ${
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
                        <div className="bg-white p-4 rounded-lg border border-gray-100 mb-4">
                          <p className="text-gray-700 leading-relaxed">
                            {message.message || message.content}
                          </p>
                        </div>
                        <div className="flex gap-2">
                          {message.status === 'unread' && (
                            <button 
                              onClick={() => markMessageAsRead(message.id)}
                              className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md text-sm font-medium transition-colors shadow-sm"
                            >
                              علامت‌گذاری به عنوان خوانده شده
                            </button>
                          )}
                          <button 
                            onClick={() => deleteMessage(message.id)}
                            className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-md text-sm font-medium transition-colors shadow-sm"
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
          )}
        </div>
      </div>
    </div>
  );
}
