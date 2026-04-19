'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { supabase } from '../../../../supabase';

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
      // Simulate API calls - replace with actual data fetching
      const mockPrices = [
        { id: 1, currency: 'BTC', buyPrice: 45000, sellPrice: 44800, lastUpdate: '2024-01-15 10:30' },
        { id: 2, currency: 'ETH', buyPrice: 3200, sellPrice: 3180, lastUpdate: '2024-01-15 10:30' },
        { id: 3, currency: 'USDT', buyPrice: 1.02, sellPrice: 0.98, lastUpdate: '2024-01-15 10:30' },
      ];

      const mockMessages = [
        { id: 1, name: 'علی رضایی', email: 'ali@example.com', message: 'قیمت‌ها خیلی بالاست', date: '2024-01-15 09:15', status: 'unread' },
        { id: 2, name: 'مریم احمدی', email: 'maryam@example.com', message: 'چطور می‌توانم خرید کنم؟', date: '2024-01-15 08:45', status: 'read' },
        { id: 3, name: 'رضا محمدی', email: 'reza@example.com', message: 'سایت عالی دارید', date: '2024-01-14 18:20', status: 'read' },
      ];

      setPrices(mockPrices);
      setMessages(mockMessages);
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

  const savePrices = () => {
    // Implement API call to save prices
    alert('قیمت‌ها با موفقیت ذخیره شد');
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-xl">در حال بارگذاری...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Header */}
      <div className="bg-white shadow">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            <div className="flex items-center">
              <h1 className="text-xl font-semibold text-gray-900">پنل مدیریت آریان اکسچنج</h1>
            </div>
            <div className="flex items-center">
              <button
                onClick={handleLogout}
                className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-md text-sm font-medium"
              >
                خروج
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
        <div className="px-4 py-6 sm:px-0">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            
            {/* Prices Section */}
            <div className="bg-white overflow-hidden shadow rounded-lg">
              <div className="px-4 py-5 sm:p-6">
                <h3 className="text-lg leading-6 font-medium text-gray-900 mb-4">
                  مدیریت قیمت‌ها
                </h3>
                <div className="space-y-4">
                  {prices.map((price) => (
                    <div key={price.id} className="border rounded-lg p-4">
                      <div className="flex items-center justify-between mb-2">
                        <span className="font-medium">{price.currency}</span>
                        <span className="text-sm text-gray-500">{price.lastUpdate}</span>
                      </div>
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">
                            قیمت خرید
                          </label>
                          <input
                            type="number"
                            value={price.buyPrice}
                            onChange={(e) => updatePrice(price.id, 'buyPrice', parseFloat(e.target.value))}
                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">
                            قیمت فروش
                          </label>
                          <input
                            type="number"
                            value={price.sellPrice}
                            onChange={(e) => updatePrice(price.id, 'sellPrice', parseFloat(e.target.value))}
                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                          />
                        </div>
                      </div>
                    </div>
                  ))}
                  <button
                    onClick={savePrices}
                    className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-medium py-2 px-4 rounded-md"
                  >
                    ذخیره قیمت‌ها
                  </button>
                </div>
              </div>
            </div>

            {/* Messages Section */}
            <div className="bg-white overflow-hidden shadow rounded-lg">
              <div className="px-4 py-5 sm:p-6">
                <h3 className="text-lg leading-6 font-medium text-gray-900 mb-4">
                  پیام‌های کاربران
                </h3>
                <div className="space-y-4">
                  {messages.map((message) => (
                    <div key={message.id} className="border rounded-lg p-4">
                      <div className="flex items-center justify-between mb-2">
                        <div>
                          <span className="font-medium">{message.name}</span>
                          <span className="text-sm text-gray-500 ml-2">{message.email}</span>
                        </div>
                        <div className="flex items-center space-x-2">
                          <span className={`px-2 py-1 text-xs rounded-full ${
                            message.status === 'unread' 
                              ? 'bg-red-100 text-red-800' 
                              : 'bg-green-100 text-green-800'
                          }`}>
                            {message.status === 'unread' ? 'خوانده نشده' : 'خوانده شده'}
                          </span>
                          <span className="text-sm text-gray-500">{message.date}</span>
                        </div>
                      </div>
                      <p className="text-gray-700">{message.message}</p>
                      <div className="mt-3 flex space-x-2">
                        {message.status === 'unread' && (
                          <button className="text-sm bg-blue-600 hover:bg-blue-700 text-white px-3 py-1 rounded">
                            علامت‌گذاری به عنوان خوانده شده
                          </button>
                        )}
                        <button className="text-sm bg-red-600 hover:bg-red-700 text-white px-3 py-1 rounded">
                          حذف
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
