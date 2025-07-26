import React from 'react';
import { ArrowLeft, Play, Star, Users, BookOpen, Award } from 'lucide-react';
import { Button } from './ui/button';
import { Card, CardContent } from './ui/card';

const Hero = () => {
  return (
    <section className="hero-gradient min-h-screen flex items-center py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Content */}
          <div className="arabic-text fade-in">
            <div className="inline-flex items-center px-4 py-2 bg-primary/10 rounded-full text-primary text-sm font-medium mb-6">
              <Star className="w-4 h-4 ml-2" />
              منصة تعليمية متميزة
            </div>
            
            <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6 leading-tight">
              <span className="text-gradient">تعلم بذكاء</span>
              <br />
              وحقق أهدافك التعليمية
            </h1>
            
            <p className="text-xl text-gray-600 mb-8 leading-relaxed">
              منصة تعليمية شاملة توفر لك أفضل المقررات والدروس التفاعلية 
              مع متابعة مستمرة لتقدمك الأكاديمي وتحقيق النجاح المطلوب
            </p>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-6 mb-8">
              <div className="text-center">
                <div className="text-2xl font-bold text-primary">90%</div>
                <div className="text-sm text-gray-600">تحسن في الأداء</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-primary">100%</div>
                <div className="text-sm text-gray-600">ثقة ومتابعة</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-primary">500+</div>
                <div className="text-sm text-gray-600">طالب نشط</div>
              </div>
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4">
              <Button size="lg" className="btn-primary text-lg px-8 py-3">
                <BookOpen className="w-5 h-5 ml-2" />
                استعرض المقررات
                <ArrowLeft className="w-5 h-5 mr-2" />
              </Button>
              <Button variant="outline" size="lg" className="text-lg px-8 py-3">
                <Play className="w-5 h-5 ml-2" />
                شاهد العرض التوضيحي
              </Button>
            </div>
          </div>

          {/* Visual Content */}
          <div className="slide-in-right">
            <div className="relative">
              {/* Main Image Placeholder */}
              <div className="w-full h-96 bg-gradient-to-br from-primary/20 to-accent/20 rounded-2xl flex items-center justify-center floating-animation">
                <div className="text-center">
                  <BookOpen className="w-24 h-24 text-primary mx-auto mb-4" />
                  <h3 className="text-xl font-bold text-gray-800 arabic-text">
                    تجربة تعليمية متميزة
                  </h3>
                </div>
              </div>

              {/* Floating Cards */}
              <Card className="absolute -top-4 -right-4 w-48 card-hover">
                <CardContent className="p-4">
                  <div className="flex items-center space-x-3 rtl:space-x-reverse">
                    <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center">
                      <Users className="w-5 h-5 text-primary" />
                    </div>
                    <div className="arabic-text">
                      <div className="font-semibold text-gray-900">1000+</div>
                      <div className="text-sm text-gray-600">طالب مسجل</div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="absolute -bottom-4 -left-4 w-48 card-hover">
                <CardContent className="p-4">
                  <div className="flex items-center space-x-3 rtl:space-x-reverse">
                    <div className="w-10 h-10 bg-accent/10 rounded-lg flex items-center justify-center">
                      <Award className="w-5 h-5 text-accent" />
                    </div>
                    <div className="arabic-text">
                      <div className="font-semibold text-gray-900">50+</div>
                      <div className="text-sm text-gray-600">مقرر متاح</div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;

