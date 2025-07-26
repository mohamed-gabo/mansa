import React from 'react';
import { 
  BookOpen, 
  Video, 
  FileText, 
  Trophy, 
  MessageCircle, 
  BarChart3,
  Clock,
  Shield
} from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';

const Features = () => {
  const features = [
    {
      icon: BookOpen,
      title: 'جودة المحتوى',
      description: 'محتوى تعليمي عالي الجودة مُعد بعناية من قبل خبراء في المجال',
      color: 'text-blue-600 bg-blue-50'
    },
    {
      icon: Video,
      title: 'دروس تفاعلية',
      description: 'فيديوهات تعليمية تفاعلية مع إمكانية التحكم في سرعة التشغيل',
      color: 'text-green-600 bg-green-50'
    },
    {
      icon: Trophy,
      title: 'اختبارات متنوعة',
      description: 'اختبارات شاملة لقياس مستوى الفهم والتقدم الأكاديمي',
      color: 'text-yellow-600 bg-yellow-50'
    },
    {
      icon: FileText,
      title: 'ملخصات دورية',
      description: 'ملخصات منظمة وشاملة لجميع الدروس والمواضيع المهمة',
      color: 'text-purple-600 bg-purple-50'
    },
    {
      icon: MessageCircle,
      title: 'مسابقات تحفيزية',
      description: 'مسابقات ممتعة لتحفيز الطلاب وزيادة الدافعية للتعلم',
      color: 'text-pink-600 bg-pink-50'
    },
    {
      icon: BarChart3,
      title: 'تتبع التقدم',
      description: 'نظام متقدم لتتبع التقدم الأكاديمي وتحليل الأداء',
      color: 'text-indigo-600 bg-indigo-50'
    },
    {
      icon: Clock,
      title: 'مراجعات ليلة الامتحان',
      description: 'مراجعات مكثفة ومركزة قبل الامتحانات مباشرة',
      color: 'text-red-600 bg-red-50'
    },
    {
      icon: Shield,
      title: 'بيئة آمنة',
      description: 'منصة آمنة ومحمية لضمان خصوصية وأمان بيانات الطلاب',
      color: 'text-teal-600 bg-teal-50'
    }
  ];

  return (
    <section id="features" className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16 arabic-text">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            نتميز في...
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            نقدم لك مجموعة شاملة من الميزات التي تضمن تجربة تعليمية متميزة وفعالة
          </p>
        </div>

        {/* Features Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((feature, index) => {
            const IconComponent = feature.icon;
            return (
              <Card 
                key={index} 
                className="card-hover border-0 shadow-sm bg-white"
              >
                <CardHeader className="text-center pb-4">
                  <div className={`w-16 h-16 rounded-2xl ${feature.color} flex items-center justify-center mx-auto mb-4`}>
                    <IconComponent className="w-8 h-8" />
                  </div>
                  <CardTitle className="text-lg font-bold text-gray-900 arabic-text">
                    {feature.title}
                  </CardTitle>
                </CardHeader>
                <CardContent className="pt-0">
                  <p className="text-gray-600 text-center arabic-text leading-relaxed">
                    {feature.description}
                  </p>
                </CardContent>
              </Card>
            );
          })}
        </div>

        {/* Bottom CTA */}
        <div className="text-center mt-16">
          <div className="inline-flex items-center px-6 py-3 bg-primary/10 rounded-full text-primary font-medium arabic-text">
            <Trophy className="w-5 h-5 ml-2" />
            وأيضاً المزيد من الميزات المتقدمة
          </div>
        </div>
      </div>
    </section>
  );
};

export default Features;

