import { useState } from 'react';
import { Bell, Plus, Trash2, Edit2, Clock, Pill, Calendar, Stethoscope } from 'lucide-react';
import { Button } from '../ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../ui/card';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '../ui/dialog';
import { Input } from '../ui/input';
import { Label } from '../ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select';
import { Badge } from '../ui/badge';
import { toast } from 'sonner@2.0.3';

interface Reminder {
  id: string;
  type: 'checkup' | 'medicine' | 'appointment';
  title: string;
  description: string;
  time: string;
  date: string;
  frequency: 'once' | 'daily' | 'weekly' | 'monthly';
  isActive: boolean;
}

interface RemindersProps {
  onReminderSet?: (reminder: Reminder) => void;
}

export function Reminders({ onReminderSet }: RemindersProps) {
  const [reminders, setReminders] = useState<Reminder[]>([
    {
      id: '1',
      type: 'checkup',
      title: 'Monthly Checkup',
      description: 'Regular prenatal checkup with Dr. Smith',
      time: '10:00',
      date: '2025-11-15',
      frequency: 'monthly',
      isActive: true
    },
    {
      id: '2',
      type: 'medicine',
      title: 'Prenatal Vitamins',
      description: 'Take daily prenatal vitamin supplement',
      time: '09:00',
      date: '2025-11-09',
      frequency: 'daily',
      isActive: true
    },
    {
      id: '3',
      type: 'appointment',
      title: 'Ultrasound Appointment',
      description: '20-week anatomy scan',
      time: '14:30',
      date: '2025-11-20',
      frequency: 'once',
      isActive: true
    }
  ]);

  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingReminder, setEditingReminder] = useState<Reminder | null>(null);
  const [formData, setFormData] = useState({
    type: 'checkup' as Reminder['type'],
    title: '',
    description: '',
    time: '09:00',
    date: new Date().toISOString().split('T')[0],
    frequency: 'once' as Reminder['frequency']
  });

  const getReminderIcon = (type: Reminder['type']) => {
    switch (type) {
      case 'checkup':
        return <Stethoscope className="w-5 h-5" />;
      case 'medicine':
        return <Pill className="w-5 h-5" />;
      case 'appointment':
        return <Calendar className="w-5 h-5" />;
    }
  };

  const getReminderColor = (type: Reminder['type']) => {
    switch (type) {
      case 'checkup':
        return 'bg-[#5B7FDB]';
      case 'medicine':
        return 'bg-[#FF69B4]';
      case 'appointment':
        return 'bg-[#87CEEB]';
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.title || !formData.date || !formData.time) {
      toast.error('Please fill in all required fields');
      return;
    }

    if (editingReminder) {
      // Update existing reminder
      const updatedReminders = reminders.map(r =>
        r.id === editingReminder.id
          ? { ...r, ...formData }
          : r
      );
      setReminders(updatedReminders);
      toast.success('Reminder updated successfully');
    } else {
      // Create new reminder
      const newReminder: Reminder = {
        id: Date.now().toString(),
        ...formData,
        isActive: true
      };
      setReminders([...reminders, newReminder]);
      onReminderSet?.(newReminder);
      toast.success('Reminder created successfully');
    }

    resetForm();
    setIsDialogOpen(false);
  };

  const resetForm = () => {
    setFormData({
      type: 'checkup',
      title: '',
      description: '',
      time: '09:00',
      date: new Date().toISOString().split('T')[0],
      frequency: 'once'
    });
    setEditingReminder(null);
  };

  const handleEdit = (reminder: Reminder) => {
    setEditingReminder(reminder);
    setFormData({
      type: reminder.type,
      title: reminder.title,
      description: reminder.description,
      time: reminder.time,
      date: reminder.date,
      frequency: reminder.frequency
    });
    setIsDialogOpen(true);
  };

  const handleDelete = (id: string) => {
    setReminders(reminders.filter(r => r.id !== id));
    toast.success('Reminder deleted');
  };

  const toggleReminder = (id: string) => {
    setReminders(reminders.map(r =>
      r.id === id ? { ...r, isActive: !r.isActive } : r
    ));
    const reminder = reminders.find(r => r.id === id);
    toast.success(reminder?.isActive ? 'Reminder disabled' : 'Reminder enabled');
  };

  const upcomingReminders = reminders
    .filter(r => r.isActive)
    .filter(r => new Date(r.date) >= new Date())
    .sort((a, b) => new Date(a.date + ' ' + a.time).getTime() - new Date(b.date + ' ' + b.time).getTime())
    .slice(0, 3);

  return (
    <Dialog open={isDialogOpen} onOpenChange={(open) => {
      setIsDialogOpen(open);
      if (!open) resetForm();
    }}>
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle className="flex items-center gap-2">
                <Bell className="w-5 h-5 text-[#5B7FDB]" />
                Reminders
              </CardTitle>
              <CardDescription>Manage your checkups, medications, and appointments</CardDescription>
            </div>
            <DialogTrigger asChild>
              <Button size="sm" className="bg-[#5B7FDB] hover:bg-[#4A6FCA]">
                <Plus className="w-4 h-4 mr-2" />
                Add Reminder
              </Button>
            </DialogTrigger>
          </div>
        </CardHeader>
        <CardContent>
          {upcomingReminders.length === 0 ? (
            <div className="text-center py-8 text-muted-foreground">
              <Bell className="w-12 h-12 mx-auto mb-3 opacity-30" />
              <p>No upcoming reminders</p>
              <p className="text-sm">Click "Add Reminder" to create one</p>
            </div>
          ) : (
            <div className="space-y-3">
              {upcomingReminders.map((reminder) => (
                <div
                  key={reminder.id}
                  className="flex items-start gap-3 p-3 rounded-lg border bg-card hover:bg-accent/50 transition-colors"
                >
                  <div className={`p-2 rounded-lg ${getReminderColor(reminder.type)} text-white`}>
                    {getReminderIcon(reminder.type)}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between gap-2">
                      <div className="flex-1">
                        <h4 className="font-medium">{reminder.title}</h4>
                        {reminder.description && (
                          <p className="text-sm text-muted-foreground">{reminder.description}</p>
                        )}
                        <div className="flex items-center gap-3 mt-2 text-xs text-muted-foreground">
                          <span className="flex items-center gap-1">
                            <Calendar className="w-3 h-3" />
                            {new Date(reminder.date).toLocaleDateString()}
                          </span>
                          <span className="flex items-center gap-1">
                            <Clock className="w-3 h-3" />
                            {reminder.time}
                          </span>
                          <Badge variant="outline" className="text-xs">
                            {reminder.frequency}
                          </Badge>
                        </div>
                      </div>
                      <div className="flex gap-1">
                        <Button
                          variant="ghost"
                          size="icon"
                          className="h-8 w-8"
                          onClick={() => handleEdit(reminder)}
                        >
                          <Edit2 className="w-3 h-3" />
                        </Button>
                        <Button
                          variant="ghost"
                          size="icon"
                          className="h-8 w-8 text-destructive"
                          onClick={() => handleDelete(reminder.id)}
                        >
                          <Trash2 className="w-3 h-3" />
                        </Button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}

          {reminders.length > 3 && (
            <Button variant="outline" className="w-full mt-4">
              View All Reminders ({reminders.length})
            </Button>
          )}
        </CardContent>
      </Card>

      <DialogContent>
        <DialogHeader>
          <DialogTitle>
            {editingReminder ? 'Edit Reminder' : 'Add New Reminder'}
          </DialogTitle>
          <DialogDescription>
            Set up reminders for checkups, medications, and appointments
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="type">Reminder Type</Label>
            <Select
              value={formData.type}
              onValueChange={(value) => setFormData({ ...formData, type: value as Reminder['type'] })}
            >
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="checkup">
                  <div className="flex items-center gap-2">
                    <Stethoscope className="w-4 h-4" />
                    Checkup
                  </div>
                </SelectItem>
                <SelectItem value="medicine">
                  <div className="flex items-center gap-2">
                    <Pill className="w-4 h-4" />
                    Medicine
                  </div>
                </SelectItem>
                <SelectItem value="appointment">
                  <div className="flex items-center gap-2">
                    <Calendar className="w-4 h-4" />
                    Appointment
                  </div>
                </SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="title">Title *</Label>
            <Input
              id="title"
              value={formData.title}
              onChange={(e) => setFormData({ ...formData, title: e.target.value })}
              placeholder="e.g., Monthly Checkup"
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="description">Description</Label>
            <Input
              id="description"
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              placeholder="Add details (optional)"
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="date">Date *</Label>
              <Input
                id="date"
                type="date"
                value={formData.date}
                onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="time">Time *</Label>
              <Input
                id="time"
                type="time"
                value={formData.time}
                onChange={(e) => setFormData({ ...formData, time: e.target.value })}
                required
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="frequency">Frequency</Label>
            <Select
              value={formData.frequency}
              onValueChange={(value) => setFormData({ ...formData, frequency: value as Reminder['frequency'] })}
            >
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="once">Once</SelectItem>
                <SelectItem value="daily">Daily</SelectItem>
                <SelectItem value="weekly">Weekly</SelectItem>
                <SelectItem value="monthly">Monthly</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="flex gap-2 pt-4">
            <Button
              type="button"
              variant="outline"
              className="flex-1"
              onClick={() => {
                resetForm();
                setIsDialogOpen(false);
              }}
            >
              Cancel
            </Button>
            <Button type="submit" className="flex-1 bg-[#5B7FDB] hover:bg-[#4A6FCA]">
              {editingReminder ? 'Update' : 'Create'} Reminder
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
