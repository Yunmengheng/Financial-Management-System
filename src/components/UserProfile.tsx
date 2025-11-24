'use client';

import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Avatar, AvatarFallback } from './ui/avatar';
import { Badge } from './ui/badge';
import { User, Mail, Phone, MapPin, Shield, Bell } from 'lucide-react';
import { Switch } from './ui/switch';
import { toast } from 'sonner';

export function UserProfile() {
  const [profile, setProfile] = useState({
    name: 'John Doe',
    email: 'john.doe@financehub.com',
    phone: '+1 (555) 123-4567',
    location: 'New York, USA',
  });

  const [notifications, setNotifications] = useState({
    emailAlerts: true,
    budgetAlerts: true,
    monthlyReports: true,
  });

  const [isEditing, setIsEditing] = useState(false);
  const [editForm, setEditForm] = useState({ ...profile });

  const handleSave = () => {
    setProfile(editForm);
    setIsEditing(false);
    toast.success('Profile updated successfully');
  };

  const handleNotificationToggle = (key: keyof typeof notifications) => {
    setNotifications({ ...notifications, [key]: !notifications[key] });
    toast.success('Settings updated');
  };

  return (
    <div className="space-y-8">
      <div>
        <h1 className="mb-2">Profile</h1>
        <p className="text-muted-foreground">Manage your account and preferences</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Profile Card */}
        <Card className="border-0 shadow-lg lg:col-span-1">
          <CardContent className="pt-6">
            <div className="flex flex-col items-center text-center">
              <Avatar className="w-24 h-24 mb-4">
                <AvatarFallback className="bg-gradient-to-br from-violet-500 to-fuchsia-500 text-white">
                  {profile.name.split(' ').map(n => n[0]).join('')}
                </AvatarFallback>
              </Avatar>
              <h3 className="text-foreground mb-1">{profile.name}</h3>
              <p className="text-muted-foreground mb-3">{profile.email}</p>
              <Badge className="bg-gradient-to-r from-emerald-500 to-teal-500 text-white border-0">Active</Badge>
            </div>

            <div className="space-y-3 pt-6 mt-6 border-t border-border">
              <div className="flex items-center gap-3 text-muted-foreground">
                <Phone className="w-4 h-4" />
                <span>{profile.phone}</span>
              </div>
              <div className="flex items-center gap-3 text-muted-foreground">
                <MapPin className="w-4 h-4" />
                <span>{profile.location}</span>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Details Card */}
        <Card className="border-0 shadow-lg lg:col-span-2">
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle>Personal Information</CardTitle>
              {!isEditing ? (
                <Button onClick={() => setIsEditing(true)} className="rounded-xl">Edit</Button>
              ) : (
                <div className="flex gap-2">
                  <Button variant="outline" onClick={() => {
                    setEditForm({ ...profile });
                    setIsEditing(false);
                  }} className="rounded-xl">
                    Cancel
                  </Button>
                  <Button onClick={handleSave} className="bg-gradient-to-r from-violet-500 to-fuchsia-500 hover:from-violet-600 hover:to-fuchsia-600 text-white rounded-xl">
                    Save
                  </Button>
                </div>
              )}
            </div>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <Label htmlFor="name" className="flex items-center gap-2">
                  <User className="w-4 h-4" />
                  Full Name
                </Label>
                <Input
                  id="name"
                  value={isEditing ? editForm.name : profile.name}
                  onChange={(e) => setEditForm({ ...editForm, name: e.target.value })}
                  disabled={!isEditing}
                  className="rounded-xl"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="email" className="flex items-center gap-2">
                  <Mail className="w-4 h-4" />
                  Email
                </Label>
                <Input
                  id="email"
                  type="email"
                  value={isEditing ? editForm.email : profile.email}
                  onChange={(e) => setEditForm({ ...editForm, email: e.target.value })}
                  disabled={!isEditing}
                  className="rounded-xl"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="phone" className="flex items-center gap-2">
                  <Phone className="w-4 h-4" />
                  Phone
                </Label>
                <Input
                  id="phone"
                  value={isEditing ? editForm.phone : profile.phone}
                  onChange={(e) => setEditForm({ ...editForm, phone: e.target.value })}
                  disabled={!isEditing}
                  className="rounded-xl"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="location" className="flex items-center gap-2">
                  <MapPin className="w-4 h-4" />
                  Location
                </Label>
                <Input
                  id="location"
                  value={isEditing ? editForm.location : profile.location}
                  onChange={(e) => setEditForm({ ...editForm, location: e.target.value })}
                  disabled={!isEditing}
                  className="rounded-xl"
                />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Notifications */}
      <Card className="border-0 shadow-lg">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Bell className="w-5 h-5" />
            Notifications
          </CardTitle>
          <p className="text-muted-foreground">Manage your notification preferences</p>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between p-4 rounded-2xl bg-accent/50">
            <div>
              <p className="text-foreground">Email Alerts</p>
              <p className="text-muted-foreground">Receive notifications via email</p>
            </div>
            <Switch
              checked={notifications.emailAlerts}
              onCheckedChange={() => handleNotificationToggle('emailAlerts')}
            />
          </div>

          <div className="flex items-center justify-between p-4 rounded-2xl bg-accent/50">
            <div>
              <p className="text-foreground">Budget Alerts</p>
              <p className="text-muted-foreground">Get notified when approaching limits</p>
            </div>
            <Switch
              checked={notifications.budgetAlerts}
              onCheckedChange={() => handleNotificationToggle('budgetAlerts')}
            />
          </div>

          <div className="flex items-center justify-between p-4 rounded-2xl bg-accent/50">
            <div>
              <p className="text-foreground">Monthly Reports</p>
              <p className="text-muted-foreground">Receive monthly financial summaries</p>
            </div>
            <Switch
              checked={notifications.monthlyReports}
              onCheckedChange={() => handleNotificationToggle('monthlyReports')}
            />
          </div>
        </CardContent>
      </Card>

      {/* Security */}
      <Card className="border-0 shadow-lg">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Shield className="w-5 h-5" />
            Security
          </CardTitle>
          <p className="text-muted-foreground">Manage your security settings</p>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between p-4 rounded-2xl bg-accent/50">
            <div>
              <p className="text-foreground">Password</p>
              <p className="text-muted-foreground">Last changed 45 days ago</p>
            </div>
            <Button variant="outline" className="rounded-xl">Change</Button>
          </div>

          <div className="flex items-center justify-between p-4 rounded-2xl bg-accent/50">
            <div>
              <p className="text-foreground">Two-Factor Authentication</p>
              <p className="text-muted-foreground">Add extra security to your account</p>
            </div>
            <Button variant="outline" className="rounded-xl">Enable</Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
