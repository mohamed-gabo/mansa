import React, { useState, useEffect } from 'react';
import { Users, PlusCircle, Edit, Trash2 } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from './ui/dialog';
import { Label } from './ui/label';

const AdminUsers = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentUser, setCurrentUser] = useState(null);
  const [form, setForm] = useState({
    username: '',
    email: '',
    full_name: '',
    phone: ''
  });

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      const response = await fetch('http://localhost:5000/api/users');
      const result = await response.json();
      if (result.success) {
        setUsers(result.users);
      } else {
        setError(result.message);
      }
    } catch (err) {
      setError('Failed to fetch users: ' + err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  const handleAddUser = () => {
    setCurrentUser(null);
    setForm({
      username: '',
      email: '',
      full_name: '',
      phone: ''
    });
    setIsModalOpen(true);
  };

  const handleEditUser = (user) => {
    setCurrentUser(user);
    setForm({
      username: user.username,
      email: user.email,
      full_name: user.full_name || '',
      phone: user.phone || ''
    });
    setIsModalOpen(true);
  };

  const handleSubmit = async () => {
    try {
      const method = currentUser ? 'PUT' : 'POST';
      const url = currentUser 
        ? `http://localhost:5000/api/users/${currentUser.id}` 
        : 'http://localhost:5000/api/users';

      const response = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form)
      });
      const result = await response.json();
      if (result.success) {
        fetchUsers();
        setIsModalOpen(false);
      } else {
        setError(result.message);
      }
    } catch (err) {
      setError('Failed to save user: ' + err.message);
    }
  };

  const handleDeleteUser = async (id) => {
    if (window.confirm('هل أنت متأكد أنك تريد حذف هذا المستخدم؟')) {
      try {
        const response = await fetch(`http://localhost:5000/api/users/${id}`, {
          method: 'DELETE'
        });
        const result = await response.json();
        if (result.success) {
          fetchUsers();
        } else {
          setError(result.message);
        }
      } catch (err) {
        setError('Failed to delete user: ' + err.message);
      }
    }
  };

  if (loading) {
    return <div className="arabic-text text-center text-lg font-semibold">جاري تحميل المستخدمين...</div>;
  }

  if (error) {
    return <div className="arabic-text text-center text-lg font-semibold text-red-600">خطأ: {error}</div>;
  }

  return (
    <div className="space-y-6 arabic-text">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold text-gray-900">إدارة المستخدمين</h1>
        <Button onClick={handleAddUser} className="bg-green-600 hover:bg-green-700 text-white">
          <PlusCircle className="w-5 h-5 ml-2" /> إضافة مستخدم جديد
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {users.map((user) => (
          <Card key={user.id} className="card-hover">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-lg font-medium text-gray-900">
                {user.full_name || user.username}
              </CardTitle>
              <div className="flex space-x-2 rtl:space-x-reverse">
                <Button variant="ghost" size="sm" onClick={() => handleEditUser(user)}>
                  <Edit className="w-4 h-4" />
                </Button>
                <Button variant="ghost" size="sm" onClick={() => handleDeleteUser(user.id)}>
                  <Trash2 className="w-4 h-4 text-red-500" />
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600 text-sm mb-1">البريد الإلكتروني: {user.email}</p>
              {user.phone && <p className="text-gray-600 text-sm">الهاتف: {user.phone}</p>}
            </CardContent>
          </Card>
        ))}
      </div>

      <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
        <DialogContent className="sm:max-w-[600px]">
          <DialogHeader>
            <DialogTitle>{currentUser ? 'تعديل مستخدم' : 'إضافة مستخدم جديد'}</DialogTitle>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="username" className="text-right">اسم المستخدم</Label>
              <Input id="username" name="username" value={form.username} onChange={handleInputChange} className="col-span-3" />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="email" className="text-right">البريد الإلكتروني</Label>
              <Input id="email" name="email" type="email" value={form.email} onChange={handleInputChange} className="col-span-3" />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="full_name" className="text-right">الاسم الكامل</Label>
              <Input id="full_name" name="full_name" value={form.full_name} onChange={handleInputChange} className="col-span-3" />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="phone" className="text-right">رقم الهاتف</Label>
              <Input id="phone" name="phone" value={form.phone} onChange={handleInputChange} className="col-span-3" />
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

export default AdminUsers;

