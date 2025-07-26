import React, { useState, useEffect } from 'react';
import { BookOpen, PlusCircle, Edit, Trash2, HelpCircle, CheckCircle } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from './ui/dialog';
import { Label } from './ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';

const AdminQuizzes = () => {
  const [quizzes, setQuizzes] = useState([]);
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isQuizModalOpen, setIsQuizModalOpen] = useState(false);
  const [isQuestionModalOpen, setIsQuestionModalOpen] = useState(false);
  const [currentQuiz, setCurrentQuiz] = useState(null);
  const [currentQuestion, setCurrentQuestion] = useState(null);
  const [quizForm, setQuizForm] = useState({
    title: '',
    description: '',
    course_id: '',
    duration_minutes: 0,
    total_marks: 0,
  });
  const [questionForm, setQuestionForm] = useState({
    question_text: '',
    question_type: 'multiple_choice',
    marks: 1,
    answers: [{ answer_text: '', is_correct: false }]
  });

  useEffect(() => {
    fetchQuizzes();
    fetchCourses();
  }, []);

  const fetchQuizzes = async () => {
    try {
      const response = await fetch('http://localhost:5001/api/quizzes');
      const result = await response.json();
      if (result.success) {
        setQuizzes(result.quizzes);
      } else {
        setError(result.message);
      }
    } catch (err) {
      setError('Failed to fetch quizzes: ' + err.message);
    } finally {
      setLoading(false);
    }
  };

  const fetchCourses = async () => {
    try {
      const response = await fetch('http://localhost:5001/api/courses');
      const result = await response.json();
      if (result.success) {
        setCourses(result.courses);
      } else {
        setError(result.message);
      }
    } catch (err) {
      setError('Failed to fetch courses: ' + err.message);
    }
  };

  const handleQuizInputChange = (e) => {
    const { name, value } = e.target;
    setQuizForm({ ...quizForm, [name]: value });
  };

  const handleQuestionInputChange = (e) => {
    const { name, value } = e.target;
    setQuestionForm({ ...questionForm, [name]: value });
  };

  const handleAnswerChange = (index, e) => {
    const { name, value, type, checked } = e.target;
    const newAnswers = [...questionForm.answers];
    newAnswers[index] = {
      ...newAnswers[index],
      [name]: type === 'checkbox' ? checked : value,
    };
    setQuestionForm({ ...questionForm, answers: newAnswers });
  };

  const addAnswerField = () => {
    setQuestionForm({ ...questionForm, answers: [...questionForm.answers, { answer_text: '', is_correct: false }] });
  };

  const removeAnswerField = (index) => {
    const newAnswers = questionForm.answers.filter((_, i) => i !== index);
    setQuestionForm({ ...questionForm, answers: newAnswers });
  };

  const handleAddQuiz = () => {
    setCurrentQuiz(null);
    setQuizForm({
      title: '',
      description: '',
      course_id: '',
      duration_minutes: 0,
      total_marks: 0,
    });
    setIsQuizModalOpen(true);
  };

  const handleEditQuiz = (quiz) => {
    setCurrentQuiz(quiz);
    setQuizForm({
      title: quiz.title,
      description: quiz.description,
      course_id: quiz.course_id,
      duration_minutes: quiz.duration_minutes,
      total_marks: quiz.total_marks,
    });
    setIsQuizModalOpen(true);
  };

  const handleQuizSubmit = async () => {
    try {
      const method = currentQuiz ? 'PUT' : 'POST';
      const url = currentQuiz 
        ? `http://localhost:5001/api/quizzes/${currentQuiz.id}` 
        : 'http://localhost:5001/api/quizzes';

      const response = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(quizForm)
      });
      const result = await response.json();
      if (result.success) {
        fetchQuizzes();
        setIsQuizModalOpen(false);
      } else {
        setError(result.message);
      }
    } catch (err) {
      setError('Failed to save quiz: ' + err.message);
    }
  };

  const handleDeleteQuiz = async (id) => {
    if (window.confirm('هل أنت متأكد أنك تريد حذف هذا الاختبار؟')) {
      try {
        const response = await fetch(`http://localhost:5001/api/quizzes/${id}`, {
          method: 'DELETE'
        });
        const result = await response.json();
        if (result.success) {
          fetchQuizzes();
        } else {
          setError(result.message);
        }
      } catch (err) {
        setError('Failed to delete quiz: ' + err.message);
      }
    }
  };

  const handleAddQuestion = (quiz) => {
    setCurrentQuiz(quiz);
    setCurrentQuestion(null);
    setQuestionForm({
      question_text: '',
      question_type: 'multiple_choice',
      marks: 1,
      answers: [{ answer_text: '', is_correct: false }]
    });
    setIsQuestionModalOpen(true);
  };

  const handleEditQuestion = async (quiz, question) => {
    setCurrentQuiz(quiz);
    setCurrentQuestion(question);
    try {
      const response = await fetch(`http://localhost:5001/api/questions/${question.id}/answers`);
      const result = await response.json();
      if (result.success) {
        setQuestionForm({
          question_text: question.question_text,
          question_type: question.question_type,
          marks: question.marks,
          answers: result.answers
        });
      } else {
        setError(result.message);
      }
    } catch (err) {
      setError('Failed to fetch answers: ' + err.message);
    }
    setIsQuestionModalOpen(true);
  };

  const handleQuestionSubmit = async () => {
    try {
      const method = currentQuestion ? 'PUT' : 'POST';
      const url = currentQuestion 
        ? `http://localhost:5001/api/questions/${currentQuestion.id}` 
        : `http://localhost:5001/api/quizzes/${currentQuiz.id}/questions`;

      const response = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          question_text: questionForm.question_text,
          question_type: questionForm.question_type,
          marks: questionForm.marks,
        })
      });
      const result = await response.json();
      if (result.success) {
        const questionId = currentQuestion ? currentQuestion.id : result.question.id;
        // Save answers
        for (const answer of questionForm.answers) {
          const answerMethod = answer.id ? 'PUT' : 'POST';
          const answerUrl = answer.id 
            ? `http://localhost:5001/api/answers/${answer.id}` 
            : `http://localhost:5001/api/questions/${questionId}/answers`;
          await fetch(answerUrl, {
            method: answerMethod,
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(answer)
          });
        }
        fetchQuizzes(); // Refresh quizzes to show updated question count
        setIsQuestionModalOpen(false);
      } else {
        setError(result.message);
      }
    } catch (err) {
      setError('Failed to save question: ' + err.message);
    }
  };

  const handleDeleteQuestion = async (questionId) => {
    if (window.confirm('هل أنت متأكد أنك تريد حذف هذا السؤال؟')) {
      try {
        const response = await fetch(`http://localhost:5001/api/questions/${questionId}`, {
          method: 'DELETE'
        });
        const result = await response.json();
        if (result.success) {
          fetchQuizzes();
        } else {
          setError(result.message);
        }
      } catch (err) {
        setError('Failed to delete question: ' + err.message);
      }
    }
  };

  if (loading) {
    return <div className="arabic-text text-center text-lg font-semibold">جاري تحميل الاختبارات...</div>;
  }

  if (error) {
    return <div className="arabic-text text-center text-lg font-semibold text-red-600">خطأ: {error}</div>;
  }

  return (
    <div className="space-y-6 arabic-text">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold text-gray-900">إدارة الاختبارات</h1>
        <Button onClick={handleAddQuiz} className="bg-green-600 hover:bg-green-700 text-white">
          <PlusCircle className="w-5 h-5 ml-2" /> إضافة اختبار جديد
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {quizzes.map((quiz) => (
          <Card key={quiz.id} className="card-hover">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-lg font-medium text-gray-900">
                {quiz.title}
              </CardTitle>
              <div className="flex space-x-2 rtl:space-x-reverse">
                <Button variant="ghost" size="sm" onClick={() => handleEditQuiz(quiz)}>
                  <Edit className="w-4 h-4" />
                </Button>
                <Button variant="ghost" size="sm" onClick={() => handleDeleteQuiz(quiz.id)}>
                  <Trash2 className="w-4 h-4 text-red-500" />
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600 text-sm mb-2">{quiz.description}</p>
              <p className="text-gray-700 font-semibold">المقرر: {courses.find(c => c.id === quiz.course_id)?.title || 'غير معروف'}</p>
              <p className="text-gray-700">المدة: {quiz.duration_minutes} دقيقة</p>
              <p className="text-gray-700">الدرجة الكلية: {quiz.total_marks}</p>
              <p className="text-gray-700">عدد الأسئلة: {quiz.questions ? quiz.questions.length : 0}</p>
              <div className="flex justify-end mt-4">
                <Button size="sm" onClick={() => handleAddQuestion(quiz)}>
                  <PlusCircle className="w-4 h-4 ml-1" /> إضافة سؤال
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Quiz Modal */}
      <Dialog open={isQuizModalOpen} onOpenChange={setIsQuizModalOpen}>
        <DialogContent className="sm:max-w-[600px]">
          <DialogHeader>
            <DialogTitle>{currentQuiz ? 'تعديل اختبار' : 'إضافة اختبار جديد'}</DialogTitle>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="quizTitle" className="text-right">العنوان</Label>
              <Input id="quizTitle" name="title" value={quizForm.title} onChange={handleQuizInputChange} className="col-span-3" />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="quizDescription" className="text-right">الوصف</Label>
              <Input id="quizDescription" name="description" value={quizForm.description} onChange={handleQuizInputChange} className="col-span-3" />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="course_id" className="text-right">المقرر</Label>
              <Select onValueChange={(value) => setQuizForm({ ...quizForm, course_id: parseInt(value) })} value={quizForm.course_id.toString()}>
                <SelectTrigger className="col-span-3">
                  <SelectValue placeholder="اختر مقرر" />
                </SelectTrigger>
                <SelectContent>
                  {courses.map(course => (
                    <SelectItem key={course.id} value={course.id.toString()}>{course.title}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="duration_minutes" className="text-right">المدة (بالدقائق)</Label>
              <Input id="duration_minutes" name="duration_minutes" type="number" value={quizForm.duration_minutes} onChange={handleQuizInputChange} className="col-span-3" />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="total_marks" className="text-right">الدرجة الكلية</Label>
              <Input id="total_marks" name="total_marks" type="number" value={quizForm.total_marks} onChange={handleQuizInputChange} className="col-span-3" />
            </div>
          </div>
          <DialogFooter>
            <Button onClick={() => setIsQuizModalOpen(false)} variant="outline">إلغاء</Button>
            <Button onClick={handleQuizSubmit} className="bg-primary hover:bg-primary-dark text-white">حفظ</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Question Modal */}
      <Dialog open={isQuestionModalOpen} onOpenChange={setIsQuestionModalOpen}>
        <DialogContent className="sm:max-w-[800px]">
          <DialogHeader>
            <DialogTitle>{currentQuestion ? 'تعديل سؤال' : 'إضافة سؤال جديد'}</DialogTitle>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="questionText" className="text-right">نص السؤال</Label>
              <Input id="questionText" name="question_text" value={questionForm.question_text} onChange={handleQuestionInputChange} className="col-span-3" />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="questionType" className="text-right">نوع السؤال</Label>
              <Select onValueChange={(value) => setQuestionForm({ ...questionForm, question_type: value })} value={questionForm.question_type}>
                <SelectTrigger className="col-span-3">
                  <SelectValue placeholder="اختر نوع السؤال" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="multiple_choice">اختيار من متعدد</SelectItem>
                  <SelectItem value="true_false">صح/خطأ</SelectItem>
                  <SelectItem value="essay">مقالي</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="marks" className="text-right">الدرجة</Label>
              <Input id="marks" name="marks" type="number" value={questionForm.marks} onChange={handleQuestionInputChange} className="col-span-3" />
            </div>

            {questionForm.question_type !== 'essay' && (
              <div className="col-span-4 space-y-2">
                <h3 className="text-lg font-semibold">الإجابات</h3>
                {questionForm.answers.map((answer, index) => (
                  <div key={index} className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor={`answerText-${index}`} className="text-right">إجابة {index + 1}</Label>
                    <Input
                      id={`answerText-${index}`}
                      name="answer_text"
                      value={answer.answer_text}
                      onChange={(e) => handleAnswerChange(index, e)}
                      className="col-span-2"
                    />
                    <input
                      type="checkbox"
                      name="is_correct"
                      checked={answer.is_correct}
                      onChange={(e) => handleAnswerChange(index, e)}
                      className="form-checkbox h-5 w-5 text-primary"
                    />
                    <Label htmlFor={`isCorrect-${index}`}>صحيحة</Label>
                    {questionForm.answers.length > 1 && (
                      <Button variant="ghost" size="sm" onClick={() => removeAnswerField(index)}>
                        <Trash2 className="w-4 h-4 text-red-500" />
                      </Button>
                    )}
                  </div>
                ))}
                <Button onClick={addAnswerField} variant="outline" className="mt-2">
                  <PlusCircle className="w-4 h-4 ml-1" /> إضافة إجابة
                </Button>
              </div>
            )}
          </div>
          <DialogFooter>
            <Button onClick={() => setIsQuestionModalOpen(false)} variant="outline">إلغاء</Button>
            <Button onClick={handleQuestionSubmit} className="bg-primary hover:bg-primary-dark text-white">حفظ</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default AdminQuizzes;

