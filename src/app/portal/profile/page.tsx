"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/lib/auth-context";
import {
  User,
  Mail,
  Phone,
  Lock,
  Bell,
  Smartphone,
  Trash2,
  CheckCircle,
  AlertCircle,
  Calendar,
  Shield,
  Plus,
  X,
} from "lucide-react";

const ALL_SERVICES = [
  "Individual Tax Preparation",
  "Business Tax Preparation",
  "IRS Audit Representation",
  "Tax Debt Resolution",
  "Payroll Tax Services",
  "Tax Planning & Strategy",
  "Estate & Trust Tax",
];

export default function ProfilePage() {
  const { user, updateProfile, logout } = useAuth();
  const router = useRouter();

  const [firstName, setFirstName] = useState(user?.firstName || "");
  const [lastName, setLastName] = useState(user?.lastName || "");
  const [email, setEmail] = useState(user?.email || "");
  const [phone, setPhone] = useState(user?.phone || "");

  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmNewPassword, setConfirmNewPassword] = useState("");

  const [emailAlerts, setEmailAlerts] = useState(true);
  const [smsAlerts, setSmsAlerts] = useState(false);

  const [profileSaved, setProfileSaved] = useState(false);
  const [profileError, setProfileError] = useState("");
  const [passwordSaved, setPasswordSaved] = useState(false);
  const [passwordError, setPasswordError] = useState("");
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const [showAddService, setShowAddService] = useState(false);

  if (!user) return null;

  const handleSaveProfile = () => {
    setProfileError("");
    if (!firstName.trim() || !lastName.trim() || !email.trim()) {
      setProfileError("First name, last name, and email are required");
      return;
    }
    updateProfile({ firstName, lastName, email, phone });
    setProfileSaved(true);
    setTimeout(() => setProfileSaved(false), 3000);
  };

  const handleChangePassword = () => {
    setPasswordError("");
    if (!currentPassword) {
      setPasswordError("Please enter your current password");
      return;
    }
    // Verify current password
    const users = JSON.parse(localStorage.getItem("cts_users") || "[]");
    const currentUser = users.find((u: { id: string; password: string }) => u.id === user.id);
    if (!currentUser || currentUser.password !== currentPassword) {
      setPasswordError("Current password is incorrect");
      return;
    }
    if (newPassword.length < 6) {
      setPasswordError("New password must be at least 6 characters");
      return;
    }
    if (newPassword !== confirmNewPassword) {
      setPasswordError("New passwords do not match");
      return;
    }
    // Update password
    const idx = users.findIndex((u: { id: string }) => u.id === user.id);
    if (idx !== -1) {
      users[idx].password = newPassword;
      localStorage.setItem("cts_users", JSON.stringify(users));
    }
    setCurrentPassword("");
    setNewPassword("");
    setConfirmNewPassword("");
    setPasswordSaved(true);
    setTimeout(() => setPasswordSaved(false), 3000);
  };

  const handleAddService = (service: string) => {
    if (user.serviceNeeded.includes(service)) return;
    const newServices = [...user.serviceNeeded, service];
    updateProfile({ serviceNeeded: newServices });

    // Also create a case for the new service
    const cases = JSON.parse(localStorage.getItem("cts_cases") || "[]");
    cases.push({
      id: `case-${user.id}-${Date.now()}`,
      userId: user.id,
      serviceName: service,
      status: "New",
      createdAt: new Date().toISOString(),
      assignedAgent: "Joseph Gasana, EA",
      events: [
        {
          date: new Date().toISOString(),
          description: `Case created for ${service}`,
          type: "status",
        },
      ],
    });
    localStorage.setItem("cts_cases", JSON.stringify(cases));

    setShowAddService(false);
  };

  const handleDeleteAccount = () => {
    const users = JSON.parse(localStorage.getItem("cts_users") || "[]");
    const filtered = users.filter((u: { id: string }) => u.id !== user.id);
    localStorage.setItem("cts_users", JSON.stringify(filtered));

    // Clean up user data
    const keys = ["cts_cases", "cts_documents", "cts_messages", "cts_activity", "cts_invoices", "cts_payments"];
    keys.forEach((key) => {
      try {
        const data = JSON.parse(localStorage.getItem(key) || "[]");
        const filtered = data.filter((item: { userId: string }) => item.userId !== user.id);
        localStorage.setItem(key, JSON.stringify(filtered));
      } catch {
        // skip
      }
    });

    logout();
    router.push("/portal");
  };

  const availableServices = ALL_SERVICES.filter((s) => !user.serviceNeeded.includes(s));

  return (
    <div className="space-y-8 animate-fade-in max-w-3xl">
      <div>
        <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">Profile Settings</h1>
        <p className="text-gray-500 mt-1">Manage your account information and preferences</p>
      </div>

      {/* Account Info */}
      <div className="bg-white rounded-xl border border-gray-100 p-6">
        <div className="flex items-center gap-4 mb-6">
          <div className="w-16 h-16 rounded-full bg-navy-500 flex items-center justify-center text-white text-2xl font-bold">
            {user.firstName[0]}
            {user.lastName[0]}
          </div>
          <div>
            <h2 className="text-lg font-semibold text-gray-900">
              {user.firstName} {user.lastName}
            </h2>
            <p className="text-sm text-gray-500 flex items-center gap-1">
              <Calendar className="w-3.5 h-3.5" />
              Member since{" "}
              {new Date(user.createdAt).toLocaleDateString("en-US", {
                month: "long",
                year: "numeric",
              })}
            </p>
          </div>
        </div>

        <h3 className="font-semibold text-gray-900 mb-4 flex items-center gap-2">
          <User className="w-5 h-5 text-gray-400" /> Personal Information
        </h3>

        {profileError && (
          <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-lg flex items-center gap-2">
            <AlertCircle className="w-4 h-4 text-red-500" />
            <p className="text-sm text-red-700">{profileError}</p>
          </div>
        )}

        {profileSaved && (
          <div className="mb-4 p-3 bg-green-50 border border-green-200 rounded-lg flex items-center gap-2">
            <CheckCircle className="w-4 h-4 text-green-500" />
            <p className="text-sm text-green-700">Profile updated successfully!</p>
          </div>
        )}

        <div className="grid sm:grid-cols-2 gap-4">
          <div>
            <label className="label-text">First Name</label>
            <input
              type="text"
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
              className="input-field"
            />
          </div>
          <div>
            <label className="label-text">Last Name</label>
            <input
              type="text"
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
              className="input-field"
            />
          </div>
          <div>
            <label className="label-text flex items-center gap-1">
              <Mail className="w-3.5 h-3.5" /> Email
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="input-field"
            />
          </div>
          <div>
            <label className="label-text flex items-center gap-1">
              <Phone className="w-3.5 h-3.5" /> Phone
            </label>
            <input
              type="tel"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              className="input-field"
            />
          </div>
        </div>

        <button onClick={handleSaveProfile} className="btn-primary mt-4">
          Save Changes
        </button>
      </div>

      {/* Change Password */}
      <div className="bg-white rounded-xl border border-gray-100 p-6">
        <h3 className="font-semibold text-gray-900 mb-4 flex items-center gap-2">
          <Lock className="w-5 h-5 text-gray-400" /> Change Password
        </h3>

        {passwordError && (
          <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-lg flex items-center gap-2">
            <AlertCircle className="w-4 h-4 text-red-500" />
            <p className="text-sm text-red-700">{passwordError}</p>
          </div>
        )}

        {passwordSaved && (
          <div className="mb-4 p-3 bg-green-50 border border-green-200 rounded-lg flex items-center gap-2">
            <CheckCircle className="w-4 h-4 text-green-500" />
            <p className="text-sm text-green-700">Password changed successfully!</p>
          </div>
        )}

        <div className="space-y-4 max-w-md">
          <div>
            <label className="label-text">Current Password</label>
            <input
              type="password"
              value={currentPassword}
              onChange={(e) => setCurrentPassword(e.target.value)}
              className="input-field"
              placeholder="Enter current password"
            />
          </div>
          <div>
            <label className="label-text">New Password</label>
            <input
              type="password"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              className="input-field"
              placeholder="Min. 6 characters"
            />
          </div>
          <div>
            <label className="label-text">Confirm New Password</label>
            <input
              type="password"
              value={confirmNewPassword}
              onChange={(e) => setConfirmNewPassword(e.target.value)}
              className="input-field"
              placeholder="Repeat new password"
            />
          </div>
        </div>

        <button onClick={handleChangePassword} className="btn-primary mt-4">
          Update Password
        </button>
      </div>

      {/* Services */}
      <div className="bg-white rounded-xl border border-gray-100 p-6">
        <div className="flex items-center justify-between mb-4">
          <h3 className="font-semibold text-gray-900 flex items-center gap-2">
            <Shield className="w-5 h-5 text-gray-400" /> Selected Services
          </h3>
          {availableServices.length > 0 && (
            <button
              onClick={() => setShowAddService(!showAddService)}
              className="text-sm text-teal-600 hover:text-teal-700 font-medium flex items-center gap-1"
            >
              <Plus className="w-4 h-4" /> Add Service
            </button>
          )}
        </div>

        <div className="flex flex-wrap gap-2 mb-4">
          {user.serviceNeeded.map((service) => (
            <span
              key={service}
              className="inline-flex items-center gap-1 px-3 py-1.5 bg-teal-50 text-teal-700 rounded-full text-sm font-medium"
            >
              <CheckCircle className="w-3.5 h-3.5" />
              {service}
            </span>
          ))}
        </div>

        {showAddService && (
          <div className="border border-gray-200 rounded-lg p-4 mt-4">
            <div className="flex items-center justify-between mb-3">
              <p className="text-sm font-medium text-gray-700">Add a service:</p>
              <button onClick={() => setShowAddService(false)} className="text-gray-400 hover:text-gray-600">
                <X className="w-4 h-4" />
              </button>
            </div>
            <div className="flex flex-wrap gap-2">
              {availableServices.map((service) => (
                <button
                  key={service}
                  onClick={() => handleAddService(service)}
                  className="px-3 py-1.5 border border-gray-300 rounded-full text-sm text-gray-600 hover:bg-teal-50 hover:border-teal-300 hover:text-teal-700 transition-colors"
                >
                  + {service}
                </button>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Notification Preferences */}
      <div className="bg-white rounded-xl border border-gray-100 p-6">
        <h3 className="font-semibold text-gray-900 mb-4 flex items-center gap-2">
          <Bell className="w-5 h-5 text-gray-400" /> Notification Preferences
        </h3>

        <div className="space-y-4">
          <label className="flex items-center justify-between cursor-pointer">
            <div className="flex items-center gap-3">
              <Mail className="w-5 h-5 text-gray-400" />
              <div>
                <p className="font-medium text-gray-700">Email Alerts</p>
                <p className="text-sm text-gray-400">
                  Receive case updates, document requests, and messages via email
                </p>
              </div>
            </div>
            <button
              onClick={() => setEmailAlerts(!emailAlerts)}
              className={`relative w-12 h-6 rounded-full transition-colors ${
                emailAlerts ? "bg-teal-500" : "bg-gray-300"
              }`}
            >
              <div
                className={`absolute top-0.5 w-5 h-5 bg-white rounded-full shadow transition-transform ${
                  emailAlerts ? "translate-x-6" : "translate-x-0.5"
                }`}
              />
            </button>
          </label>

          <label className="flex items-center justify-between cursor-pointer">
            <div className="flex items-center gap-3">
              <Smartphone className="w-5 h-5 text-gray-400" />
              <div>
                <p className="font-medium text-gray-700">SMS Alerts</p>
                <p className="text-sm text-gray-400">
                  Get text notifications for urgent updates and deadlines
                </p>
              </div>
            </div>
            <button
              onClick={() => setSmsAlerts(!smsAlerts)}
              className={`relative w-12 h-6 rounded-full transition-colors ${
                smsAlerts ? "bg-teal-500" : "bg-gray-300"
              }`}
            >
              <div
                className={`absolute top-0.5 w-5 h-5 bg-white rounded-full shadow transition-transform ${
                  smsAlerts ? "translate-x-6" : "translate-x-0.5"
                }`}
              />
            </button>
          </label>
        </div>
      </div>

      {/* Danger Zone */}
      <div className="bg-white rounded-xl border border-red-200 p-6">
        <h3 className="font-semibold text-red-700 mb-2 flex items-center gap-2">
          <Trash2 className="w-5 h-5" /> Danger Zone
        </h3>
        <p className="text-sm text-gray-500 mb-4">
          Permanently delete your account and all associated data. This action cannot be undone.
        </p>
        {showDeleteConfirm ? (
          <div className="bg-red-50 border border-red-200 rounded-lg p-4">
            <p className="text-sm text-red-700 font-medium mb-3">
              Are you absolutely sure? All your data including cases, documents, and messages will be
              permanently deleted.
            </p>
            <div className="flex gap-3">
              <button
                onClick={handleDeleteAccount}
                className="px-4 py-2 bg-red-600 text-white rounded-lg text-sm font-semibold hover:bg-red-700 transition-colors"
              >
                Yes, Delete My Account
              </button>
              <button
                onClick={() => setShowDeleteConfirm(false)}
                className="px-4 py-2 bg-gray-100 text-gray-700 rounded-lg text-sm font-medium hover:bg-gray-200 transition-colors"
              >
                Cancel
              </button>
            </div>
          </div>
        ) : (
          <button
            onClick={() => setShowDeleteConfirm(true)}
            className="px-4 py-2 border border-red-300 text-red-600 rounded-lg text-sm font-semibold hover:bg-red-50 transition-colors"
          >
            Delete Account
          </button>
        )}
      </div>
    </div>
  );
}
