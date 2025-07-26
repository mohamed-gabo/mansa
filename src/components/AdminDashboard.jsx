import React, { useState, useEffect } from 'react';
import { 
  Users, 
  BookOpen, 
  Eye, 
  DollarSign, 
  TrendingUp, 
  Calendar,
  Star,
  FileText
} from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Badge } from './ui/badge';

const AdminDashboard = () => {
  const [statsData, setStatsData] = useState({});
  const [courseViewsData, setCourseViewsData] = useState({});
  const [recentActivity, setRecentActivity] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        const statsResponse = await fetch('http://localhost:5000/api/admin/dashboard/stats');
        const statsResult = await statsResponse.json();
        if (statsResult.success) {
          setStatsData(statsResult.stats);
          setCourseViewsData(statsResult.course_views);
        } else {
          setError(statsResult.message);
        }

        const activityResponse = await fetch('http://localhost:5000/api/admin/recent-activity');
        const activityResult = await activityResponse.json();
        if (activityResult.success) {
          setRecentActivity(activityResult.activities);
        } else {
          setError(activityResult.message);
        }
      } catch (err) {
        setError('Failed to fetch dashboard data: ' + err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchDashboardData();
  }, []);

  if (loading) {
    return <div className="arabic-text text-center text-lg font-semibold">جاري تحميل البيانات...</div>;
  }

  if (error) {
    return <div className="arabic-text text-center text-lg font-semibold text-red-600">خطأ: {error}</div>;
  }

  const stats = [
    {
      title: 'عدد زوار المنصة',
      value: statsData.visitors?.total || 0,
      change: `+${statsData.visitors?.change || 0}`,
      period: statsData.visitors?.period || 'آخر شهر',
      icon: Eye,
      color: 'text-blue-600 bg-blue-50'
    },
    {
      title: 'المحاضرين',
      value: statsData.instructors?.total || 0,
      change: `+${statsData.instructors?.change || 0}`,
      period: statsData.instructors?.period || 'آخر شهر',
      icon: Users,
      color: 'text-green-600 bg-green-50'
    },
    {
      title: 'الطلاب النشطين',
      value: statsData.active_students?.total || 0,
      change: `+${statsData.active_students?.change || 0}`,
      period: statsData.active_students?.period || 'آخر شهر',
      icon: Users,
      color: 'text-purple-600 bg-purple-50'
    },
    {
      title: 'الطلاب',
      value: statsData.total_students?.total || 0,
      change: `+${statsData.total_students?.change || 0}`,
      period: statsData.total_students?.period || 'آخر شهر',
      icon: Users,
      color: 'text-orange-600 bg-orange-50'
    },
    {
      title: 'جدولة المقررات',
      value: statsData.scheduled_courses?.total || 0,
      change: `+${statsData.scheduled_courses?.change || 0}`,
      period: statsData.scheduled_courses?.period || 'آخر شهر',
      icon: Calendar,
      color: 'text-indigo-600 bg-indigo-50'
    },
    {
      title: 'المقررات',
      value: statsData.courses?.total || 0,
      change: `+${statsData.courses?.change || 0}`,
      period: statsData.courses?.period || 'آخر شهر',
      icon: BookOpen,
      color: 'text-teal-600 bg-teal-50'
    },
    {
      title: 'التصنيفات',
      value: statsData.categories?.total || 0,
      change: `+${statsData.categories?.change || 0}`,
      period: statsData.categories?.period || 'آخر شهر',
      icon: FileText,
      color: 'text-pink-600 bg-pink-50'
    },
    {
      title: 'الفواتير المدفوعة',
      value: statsData.paid_invoices?.total || 0,
      change: `+${statsData.paid_invoices?.change || 0}`,
      period: statsData.paid_invoices?.period || 'آخر شهر',
      icon: DollarSign,
      color: 'text-green-600 bg-green-50'
    },
    {
      title: 'الفواتير',
      value: statsData.invoices?.total || 0,
      change: `+${statsData.invoices?.change || 0}`,
      period: statsData.invoices?.period || 'آخر شهر',
      icon: FileText,
      color: 'text-yellow-600 bg-yellow-50'
    },
    {
      title: 'اشتراكات المقررات',
      value: statsData.course_subscriptions?.total || 0,
      change: `+${statsData.course_subscriptions?.change || 0}`,
      period: statsData.course_subscriptions?.period || 'آخر شهر',
      icon: Star,
      color: 'text-red-600 bg-red-50'
    }
  ];

  const courseViews = [
    {
      title: 'مشاهدين للمقررات زوار',
      value: courseViewsData.course_viewers_visitors?.total || 0,
      change: `+${courseViewsData.course_viewers_visitors?.change || 0}`,
      period: courseViewsData.course_viewers_visitors?.period || 'آخر شهر'
    },
    {
      title: 'مشاهدين للمقررات زوار',
      value: courseViewsData.course_viewers_visitors_2?.total || 0,
      change: `+${courseViewsData.course_viewers_visitors_2?.change || 0}`,
      period: courseViewsData.course_viewers_visitors_2?.period || 'آخر شهر'
    },
    {
      title: 'مشاهدات المقررات',
      value: courseViewsData.course_views?.total || 0,
      change: `+${courseViewsData.course_views?.change || 0}`,
      period: courseViewsData.course_views?.period || 'آخر شهر'
    },
    {
      title: 'مشاهدات المقررات زوار',
      value: courseViewsData.course_views_visitors?.total || 0,
      change: `+${courseViewsData.course_views_visitors?.change || 0}`,
      period: courseViewsData.course_views_visitors?.period || 'آخر شهر'
    }
  ];

  return (
    <div className="space-y-6 arabic-text">
      {/* Header */}
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold text-gray-900">لوحة التحكم</h1>
        <Badge variant="secondary" className="text-sm">
          آخر تحديث: اليوم
        </Badge>
      </div>

      {/* Main Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 xl:grid-cols-5 gap-6">
        {stats.map((stat, index) => {
          const Icon = stat.icon;
          return (
            <Card key={index} className="card-hover">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium text-gray-600">
                  {stat.title}
                </CardTitle>
                <div className={`w-8 h-8 rounded-lg ${stat.color} flex items-center justify-center`}>
                  <Icon className="w-4 h-4" />
                </div>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-gray-900 mb-1">
                  {stat.value}
                </div>
                <div className="flex items-center text-xs text-gray-500">
                  <TrendingUp className="w-3 h-3 text-green-500 ml-1" />
                  <span className="text-green-500">{stat.change}</span>
                  <span className="mr-1">{stat.period}</span>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {/* Course Views Section */}
      <div>
        <h2 className="text-xl font-bold text-gray-900 mb-4">مشاهدات المقررات</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {courseViews.map((view, index) => (
            <Card key={index} className="card-hover">
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium text-gray-600">
                  {view.title}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-primary mb-1">
                  {view.value}
                </div>
                <div className="flex items-center text-xs text-gray-500">
                  <TrendingUp className="w-3 h-3 text-green-500 ml-1" />
                  <span className="text-green-500">{view.change}</span>
                  <span className="mr-1">{view.period}</span>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      {/* Quick Actions */}
      <div>
        <h2 className="text-xl font-bold text-gray-900 mb-4">إجراءات سريعة</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Card className="card-hover cursor-pointer">
            <CardContent className="p-6 text-center">
              <BookOpen className="w-12 h-12 text-primary mx-auto mb-4" />
              <h3 className="text-lg font-semibold text-gray-900 mb-2">إضافة مقرر جديد</h3>
              <p className="text-gray-600 text-sm">أنشئ مقرراً تعليمياً جديداً</p>
            </CardContent>
          </Card>

          <Card className="card-hover cursor-pointer">
            <CardContent className="p-6 text-center">
              <Users className="w-12 h-12 text-primary mx-auto mb-4" />
              <h3 className="text-lg font-semibold text-gray-900 mb-2">إدارة الطلاب</h3>
              <p className="text-gray-600 text-sm">عرض وإدارة حسابات الطلاب</p>
            </CardContent>
          </Card>

          <Card className="card-hover cursor-pointer">
            <CardContent className="p-6 text-center">
              <DollarSign className="w-12 h-12 text-primary mx-auto mb-4" />
              <h3 className="text-lg font-semibold text-gray-900 mb-2">تقارير المدفوعات</h3>
              <p className="text-gray-600 text-sm">عرض تقارير الإيرادات والمدفوعات</p>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Recent Activity */}
      <div>
        <h2 className="text-xl font-bold text-gray-900 mb-4">النشاط الأخير</h2>
        <Card>
          <CardContent className="p-6">
            <div className="space-y-4">
              {recentActivity.map((activity, index) => (
                <div key={index} className="flex items-center space-x-4 rtl:space-x-reverse">
                  <div className={`w-2 h-2 bg-${activity.color}-500 rounded-full`}></div>
                  <div className="flex-1">
                    <p className="text-sm text-gray-900">{activity.message}</p>
                    <p className="text-xs text-gray-500">{activity.time}</p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default AdminDashboard;

