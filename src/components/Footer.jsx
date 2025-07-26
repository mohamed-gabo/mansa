import React from 'react';
import { BookOpen, Mail, Phone, MapPin, Facebook, Youtube, MessageCircle } from 'lucide-react';
import { Button } from './ui/button';

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="arabic-text">
            <div className="flex items-center space-x-2 rtl:space-x-reverse mb-6">
              <div className="w-10 h-10 bg-primary rounded-lg flex items-center justify-center">
                <BookOpen className="w-6 h-6 text-white" />
              </div>
              <div>
                <h3 className="text-xl font-bold">المنصة التعليمية</h3>
                <p className="text-sm text-gray-400">منصة تعليمية متكاملة</p>
              </div>
            </div>
            <p className="text-gray-400 leading-relaxed mb-6">
              منصة تعليمية شاملة تهدف إلى توفير أفضل تجربة تعليمية للطلاب 
              مع محتوى عالي الجودة ومتابعة مستمرة للتقدم الأكاديمي.
            </p>
            <div className="flex space-x-4 rtl:space-x-reverse">
              <Button variant="ghost" size="sm" className="p-2 hover:bg-primary/20">
                <Facebook className="w-5 h-5" />
              </Button>
              <Button variant="ghost" size="sm" className="p-2 hover:bg-primary/20">
                <Youtube className="w-5 h-5" />
              </Button>
              <Button variant="ghost" size="sm" className="p-2 hover:bg-primary/20">
                <MessageCircle className="w-5 h-5" />
              </Button>
            </div>
          </div>

          {/* Quick Links */}
          <div className="arabic-text">
            <h4 className="text-lg font-semibold mb-6">روابط سريعة</h4>
            <ul className="space-y-3">
              <li>
                <a href="#home" className="text-gray-400 hover:text-primary transition-colors">
                  الرئيسية
                </a>
              </li>
              <li>
                <a href="#courses" className="text-gray-400 hover:text-primary transition-colors">
                  المقررات
                </a>
              </li>
              <li>
                <a href="#about" className="text-gray-400 hover:text-primary transition-colors">
                  حول المنصة
                </a>
              </li>
              <li>
                <a href="#features" className="text-gray-400 hover:text-primary transition-colors">
                  الميزات
                </a>
              </li>
              <li>
                <a href="#contact" className="text-gray-400 hover:text-primary transition-colors">
                  تواصل معنا
                </a>
              </li>
            </ul>
          </div>

          {/* Services */}
          <div className="arabic-text">
            <h4 className="text-lg font-semibold mb-6">خدماتنا</h4>
            <ul className="space-y-3">
              <li>
                <a href="#" className="text-gray-400 hover:text-primary transition-colors">
                  دروس تفاعلية
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-400 hover:text-primary transition-colors">
                  اختبارات شاملة
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-400 hover:text-primary transition-colors">
                  مراجعات مكثفة
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-400 hover:text-primary transition-colors">
                  متابعة فردية
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-400 hover:text-primary transition-colors">
                  شهادات معتمدة
                </a>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div className="arabic-text">
            <h4 className="text-lg font-semibold mb-6">تواصل معنا</h4>
            <div className="space-y-4">
              <div className="flex items-center space-x-3 rtl:space-x-reverse">
                <Mail className="w-5 h-5 text-primary" />
                <span className="text-gray-400">info@educational-platform.com</span>
              </div>
              <div className="flex items-center space-x-3 rtl:space-x-reverse">
                <Phone className="w-5 h-5 text-primary" />
                <span className="text-gray-400">+20 123 456 7890</span>
              </div>
              <div className="flex items-center space-x-3 rtl:space-x-reverse">
                <MapPin className="w-5 h-5 text-primary" />
                <span className="text-gray-400">القاهرة، مصر</span>
              </div>
            </div>

            {/* Newsletter */}
            <div className="mt-8">
              <h5 className="font-semibold mb-3">اشترك في النشرة الإخبارية</h5>
              <div className="flex space-x-2 rtl:space-x-reverse">
                <input
                  type="email"
                  placeholder="البريد الإلكتروني"
                  className="flex-1 px-3 py-2 bg-gray-800 border border-gray-700 rounded-md text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-primary"
                />
                <Button size="sm" className="btn-primary">
                  اشتراك
                </Button>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-gray-800 mt-12 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center arabic-text">
            <p className="text-gray-400 text-sm">
              © 2024 المنصة التعليمية. جميع الحقوق محفوظة.
            </p>
            <div className="flex space-x-6 rtl:space-x-reverse mt-4 md:mt-0">
              <a href="#" className="text-gray-400 hover:text-primary text-sm transition-colors">
                سياسة الخصوصية
              </a>
              <a href="#" className="text-gray-400 hover:text-primary text-sm transition-colors">
                شروط الاستخدام
              </a>
              <a href="#" className="text-gray-400 hover:text-primary text-sm transition-colors">
                الدعم الفني
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

