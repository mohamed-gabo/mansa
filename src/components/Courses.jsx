import React from 'react';
import { Calendar, Users, BookOpen, Star, ArrowLeft } from 'lucide-react';
import { Card, CardContent, CardHeader } from './ui/card';
import { Button } from './ui/button';
import { Badge } from './ui/badge';

const Courses = () => {
  const courses = [
    {
      id: 1,
      title: 'كل مقررات المنصة',
      instructor: 'أحمد فاضل',
      price: 500,
      discountPrice: 250,
      chapters: 1,
      lessons: 17,
      startDate: '07/03/2025',
      endDate: '07/03/2026',
      image: '/api/placeholder/300/200',
      rating: 4.8,
      students: 150
    },
    {
      id: 2,
      title: 'كل مقررات المنصة',
      instructor: 'أحمد فاضل',
      price: 500,
      discountPrice: 250,
      chapters: 5,
      lessons: 15,
      startDate: '09/09/2024',
      endDate: '09/12/2026',
      image: '/api/placeholder/300/200',
      rating: 4.9,
      students: 200
    },
    {
      id: 3,
      title: 'كل مقررات المنصة',
      instructor: 'أحمد فاضل',
      price: 350,
      discountPrice: 250,
      chapters: 2,
      lessons: 2,
      startDate: '10/10/2024',
      endDate: '07/10/2025',
      image: '/api/placeholder/300/200',
      rating: 4.7,
      students: 120
    },
    {
      id: 4,
      title: 'كل مقررات المنصة',
      instructor: 'أحمد فاضل',
      price: 250,
      discountPrice: 200,
      chapters: 11,
      lessons: 34,
      startDate: '22/11/2024',
      endDate: '22/11/2025',
      image: '/api/placeholder/300/200',
      rating: 4.6,
      students: 180
    }
  ];

  return (
    <section id="courses" className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16 arabic-text">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            المقررات
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            اختر من مجموعة متنوعة من المقررات التعليمية المصممة خصيصاً لتحقيق أهدافك الأكاديمية
          </p>
        </div>

        {/* Courses Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-2 gap-8">
          {courses.map((course) => (
            <Card key={course.id} className="card-hover border-0 shadow-lg overflow-hidden">
              {/* Course Image */}
              <div className="relative h-48 bg-gradient-to-br from-primary/20 to-accent/20">
                <div className="absolute inset-0 flex items-center justify-center">
                  <BookOpen className="w-16 h-16 text-primary/60" />
                </div>
                
                {/* Price Badge */}
                <div className="absolute top-4 right-4">
                  <div className="bg-white rounded-lg px-3 py-2 shadow-md">
                    <div className="text-center arabic-text">
                      <div className="text-lg font-bold text-primary">
                        {course.discountPrice}
                      </div>
                      <div className="text-xs text-gray-500 line-through">
                        {course.price}
                      </div>
                      <div className="text-xs text-gray-600">جنية</div>
                    </div>
                  </div>
                </div>

                {/* Rating */}
                <div className="absolute top-4 left-4">
                  <div className="bg-white rounded-lg px-2 py-1 shadow-md flex items-center">
                    <Star className="w-4 h-4 text-yellow-400 fill-current" />
                    <span className="text-sm font-medium ml-1">{course.rating}</span>
                  </div>
                </div>
              </div>

              <CardHeader className="pb-4">
                <div className="arabic-text">
                  <h3 className="text-xl font-bold text-gray-900 mb-2">
                    {course.title}
                  </h3>
                  <p className="text-gray-600">
                    محاضر: {course.instructor}
                  </p>
                </div>
              </CardHeader>

              <CardContent className="pt-0">
                {/* Course Stats */}
                <div className="grid grid-cols-2 gap-4 mb-4">
                  <div className="flex items-center text-gray-600 arabic-text">
                    <BookOpen className="w-4 h-4 ml-2" />
                    <span className="text-sm">{course.chapters} الفصول</span>
                  </div>
                  <div className="flex items-center text-gray-600 arabic-text">
                    <Users className="w-4 h-4 ml-2" />
                    <span className="text-sm">{course.lessons} الدروس</span>
                  </div>
                </div>

                {/* Dates */}
                <div className="mb-4 arabic-text">
                  <div className="flex items-center text-gray-600 mb-1">
                    <Calendar className="w-4 h-4 ml-2" />
                    <span className="text-sm">من: {course.startDate}</span>
                  </div>
                  <div className="flex items-center text-gray-600">
                    <Calendar className="w-4 h-4 ml-2" />
                    <span className="text-sm">إلى: {course.endDate}</span>
                  </div>
                </div>

                {/* Students Count */}
                <div className="mb-6">
                  <Badge variant="secondary" className="arabic-text">
                    {course.students} طالب مسجل
                  </Badge>
                </div>

                {/* CTA Button */}
                <Button className="w-full btn-primary arabic-text">
                  <BookOpen className="w-4 h-4 ml-2" />
                  عرض تفاصيل المقرر
                  <ArrowLeft className="w-4 h-4 mr-2" />
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* View All Courses */}
        <div className="text-center mt-12">
          <Button variant="outline" size="lg" className="arabic-text">
            عرض جميع المقررات
            <ArrowLeft className="w-5 h-5 mr-2" />
          </Button>
        </div>
      </div>
    </section>
  );
};

export default Courses;

