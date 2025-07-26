import React, { useState, useEffect } from 'react';
import { BookOpen, PlusCircle, Edit, Trash2 } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from './ui/dialog';
import { Label } from './ui/label';

const AdminCourses = () => {
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentCourse, setCurrentCourse] = useState(null);
  const [form, setForm] = useState({
    title: '',
    description: '',
    price: 0,
    discount_price: 0,
    instructor_name: '',
    start_date: '',
    end_date: '',
    image_url: ''
  });

  useEffect(() => {
    fetchCourses();
  }, []);

  const fetchCourses = async () => {
    try {
      const response = await fetch('http://localhost:5000/api/courses');
      const result = await response.json();
      if (result.success) {
        setCourses(result.courses);
      } else {
        setError(result.message);
      }
    } catch (err) {
      setError('Failed to fetch courses: ' + err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  const handleAddCourse = () => {
    setCurrentCourse(null);
    setForm({
      title: '',
      description: '',
      price: 0,
      discount_price: 0,
      instructor_name: '',
      start_date: '',
      end_date: '',
      image_url: ''
    });
    setIsModalOpen(true);
  };

  const handleEditCourse = (course) => {
    setCurrentCourse(course);
    setForm({
      title: course.title,
      description: course.description,
      price: course.price,
      discount_price: course.discount_price,
      instructor_name: course.instructor_name,
      start_date: course.start_date || '',
      end_date: course.end_date || '',
      image_url: course.image_url || ''
    });
    setIsModalOpen(true);
  };

  const handleSubmit = async () => {
    try {
      const method = currentCourse ? 'PUT' : 'POST';
      const url = currentCourse 
        ? `http://localhost:5000/api/courses/${currentCourse.id}` 
        : 'http://localhost:5000/api/courses';

      const response = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form)
      });
      const result = await response.json();
      if (result.success) {
        fetchCourses();
        setIsModalOpen(false);
      } else {
        setError(result.message);
      }
    } catch (err) {
      setError('Failed to save course: ' + err.message);
    }
  };

  const handleDeleteCourse = async (id) => {
    if (window.confirm('هل أنت متأكد أنك تريد حذف هذا المقرر؟')) {
      try {
        const response = await fetch(`http://localhost:5000/api/courses/${id}`, {
          method: 'DELETE'
        });
        const result = await response.json();
        if (result.success) {
          fetchCourses();
        } else {
          setError(result.message);
        }
      } catch (err) {
        setError('Failed to delete course: ' + err.message);
      }
    }
  };

  if (loading) {
    return <div className="arabic-text text-center text-lg font-semibold">جاري تحميل المقررات...</div>;
  }

  if (error) {
    return <div className="arabic-text text-center text-lg font-semibold text-red-600">خطأ: {error}</div>;
  }

  return (
    <div className="space-y-6 arabic-text">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold text-gray-900">إدارة المقررات</h1>
        <Button onClick={handleAddCourse} className="bg-green-600 hover:bg-green-700 text-white">
          <PlusCircle className="w-5 h-5 ml-2" /> إضافة مقرر جديد
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {courses.map((course) => (
          <Card key={course.id} className="card-hover">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-lg font-medium text-gray-900">
                {course.title}
              </CardTitle>
              <div className="flex space-x-2 rtl:space-x-reverse">
                <Button variant="ghost" size="sm" onClick={() => handleEditCourse(course)}>
                  <Edit className="w-4 h-4" />
                </Button>
                <Button variant="ghost" size="sm" onClick={() => handleDeleteCourse(course.id)}>
                  <Trash2 className="w-4 h-4 text-red-500" />
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600 text-sm mb-2">{course.description}</p>
              <p className="text-gray-700 font-semibold">المحاضر: {course.instructor_name}</p>
              <p className="text-gray-700">السعر: {course.price} جنيه</p>
              {course.discount_price > 0 && (
                <p className="text-gray-700">سعر الخصم: {course.discount_price} جنيه</p>
              )}
              <p className="text-gray-700">الفصول: {course.chapters_count}</p>
              <p className="text-gray-700">الدروس: {course.lessons_count}</p>
            </CardContent>
          </Card>
        ))}
      </div>

      <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
        <DialogContent className="sm:max-w-[600px]">
          <DialogHeader>
            <DialogTitle>{currentCourse ? 'تعديل مقرر' : 'إضافة مقرر جديد'}</DialogTitle>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="title" className="text-right">العنوان</Label>
              <Input id="title" name="title" value={form.title} onChange={handleInputChange} className="col-span-3" />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="description" className="text-right">الوصف</Label>
              <Input id="description" name="description" value={form.description} onChange={handleInputChange} className="col-span-3" />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="price" className="text-right">السعر</Label>
              <Input id="price" name="price" type="number" value={form.price} onChange={handleInputChange} className="col-span-3" />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="discount_price" className="text-right">سعر الخصم</Label>
              <Input id="discount_price" name="discount_price" type="number" value={form.discount_price} onChange={handleInputChange} className="col-span-3" />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="instructor_name" className="text-right">اسم المحاضر</Label>
              <Input id="instructor_name" name="instructor_name" value={form.instructor_name} onChange={handleInputChange} className="col-span-3" />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="start_date" className="text-right">تاريخ البدء</Label>
              <Input id="start_date" name="start_date" type="date" value={form.start_date} onChange={handleInputChange} className="col-span-3" />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="end_date" className="text-right">تاريخ الانتهاء</Label>
              <Input id="end_date" name="end_date" type="date" value={form.end_date} onChange={handleInputChange} className="col-span-3" />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="image_url" className="text-right">رابط الصورة</Label>
              <Input id="image_url" name="image_url" value={form.image_url} onChange={handleInputChange} className="col-span-3" />
            </div>
          </div>
          <DialogFooter>
            <Button onClick={() => setIsModalOpen(false)} variant="outline">إلغاء</Button>
            <Button onClick={handleSubmit} className="bg-primary hover:bg-primary-dark text-white">حفظ</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default AdminCourses;

