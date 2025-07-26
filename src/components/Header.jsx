import React, { useState } from 'react';
import { Menu, X, BookOpen, User, LogIn } from 'lucide-react';
import { Button } from './ui/button';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <header className="bg-white/95 backdrop-blur-sm border-b border-gray-200 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div className="flex items-center space-x-2 rtl:space-x-reverse">
            <div className="w-10 h-10 bg-primary rounded-lg flex items-center justify-center">
              <BookOpen className="w-6 h-6 text-white" />
            </div>
            <div className="arabic-text">
              <h1 className="text-xl font-bold text-gray-900">المنصة التعليمية</h1>
              <p className="text-xs text-gray-600">منصة تعليمية متكاملة</p>
            </div>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8 rtl:space-x-reverse arabic-text">
            <a href="#home" className="text-gray-700 hover:text-primary transition-colors">
              الرئيسية
            </a>
            <a href="#courses" className="text-gray-700 hover:text-primary transition-colors">
              المقررات
            </a>
            <a href="#about" className="text-gray-700 hover:text-primary transition-colors">
              حول المنصة
            </a>
            <a href="#contact" className="text-gray-700 hover:text-primary transition-colors">
              تواصل معنا
            </a>
          </nav>

          {/* Desktop Auth Buttons */}
          <div className="hidden md:flex items-center space-x-4 rtl:space-x-reverse">
            <Button variant="outline" size="sm" className="arabic-text">
              <User className="w-4 h-4 ml-2" />
              تسجيل الدخول
            </Button>
            <Button size="sm" className="btn-primary arabic-text">
              <LogIn className="w-4 h-4 ml-2" />
              إنشاء حساب
            </Button>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <Button
              variant="ghost"
              size="sm"
              onClick={toggleMenu}
              className="p-2"
            >
              {isMenuOpen ? (
                <X className="w-6 h-6" />
              ) : (
                <Menu className="w-6 h-6" />
              )}
            </Button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden">
            <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3 bg-white border-t border-gray-200">
              <nav className="flex flex-col space-y-2 arabic-text">
                <a
                  href="#home"
                  className="text-gray-700 hover:text-primary px-3 py-2 rounded-md text-sm font-medium transition-colors"
                  onClick={toggleMenu}
                >
                  الرئيسية
                </a>
                <a
                  href="#courses"
                  className="text-gray-700 hover:text-primary px-3 py-2 rounded-md text-sm font-medium transition-colors"
                  onClick={toggleMenu}
                >
                  المقررات
                </a>
                <a
                  href="#about"
                  className="text-gray-700 hover:text-primary px-3 py-2 rounded-md text-sm font-medium transition-colors"
                  onClick={toggleMenu}
                >
                  حول المنصة
                </a>
                <a
                  href="#contact"
                  className="text-gray-700 hover:text-primary px-3 py-2 rounded-md text-sm font-medium transition-colors"
                  onClick={toggleMenu}
                >
                  تواصل معنا
                </a>
              </nav>
              <div className="pt-4 pb-3 border-t border-gray-200">
                <div className="flex flex-col space-y-2">
                  <Button variant="outline" size="sm" className="arabic-text justify-center">
                    <User className="w-4 h-4 ml-2" />
                    تسجيل الدخول
                  </Button>
                  <Button size="sm" className="btn-primary arabic-text justify-center">
                    <LogIn className="w-4 h-4 ml-2" />
                    إنشاء حساب
                  </Button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;

