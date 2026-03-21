"use client";

import React, { useState, useEffect } from "react";
import {
  Settings,
  Building,
  Save,
  HardDrive,
  CreditCard,
  Calendar,
  Mail,
  CheckCircle,
  XCircle,
  Edit3,
  X,
  Bell,
} from "lucide-react";

interface BusinessInfo {
  name: string;
  address: string;
  phone: string;
  email: string;
}

interface IntegrationItem {
  id: string;
  name: string;
  description: string;
  icon: React.ElementType;
  connected: boolean;
  color: string;
}

interface NotificationTemplate {
  id: string;
  name: string;
  trigger: string;
  subject: string;
  body: string;
}

const DEFAULT_TEMPLATES: NotificationTemplate[] = [
  {
    id: "tpl-case-status",
    name: "Case Status Change",
    trigger: "When a case status is updated",
    subject: "Case Update: {{service_name}}",
    body: "Your case for {{service_name}} has been updated to \"{{new_status}}\". Please log in to your portal at Clear Tax Solutions to view the details. If you have any questions, don't hesitate to reach out.",
  },
  {
    id: "tpl-doc-received",
    name: "Document Received",
    trigger: "When a client uploads a document",
    subject: "Document Received: {{file_name}}",
    body: "We have received your document \"{{file_name}}\". Our team will review it shortly. You'll be notified once the review is complete.",
  },
  {
    id: "tpl-invoice-created",
    name: "Invoice Created",
    trigger: "When a new invoice is sent to a client",
    subject: "New Invoice from Clear Tax Solutions",
    body: "A new invoice for ${{amount}} has been created for: {{description}}. The payment is due by {{due_date}}. Please log in to your portal to view the invoice and make a payment.",
  },
  {
    id: "tpl-payment-received",
    name: "Payment Received",
    trigger: "When a payment is confirmed",
    subject: "Payment Confirmation — Thank You!",
    body: "We have received your payment of ${{amount}} for {{description}}. Thank you for your prompt payment. A receipt has been added to your account.",
  },
];

export default function AdminSettingsPage() {
  const [businessInfo, setBusinessInfo] = useState<BusinessInfo>({
    name: "Clear Tax Solutions",
    address: "123 Main Street, Your City, AZ 85000",
    phone: "(555) 000-0000",
    email: "info@cleartaxsolutions.com",
  });
  const [editingBusiness, setEditingBusiness] = useState(false);
  const [templates, setTemplates] = useState<NotificationTemplate[]>([]);
  const [editingTemplateId, setEditingTemplateId] = useState<string | null>(null);
  const [editTemplate, setEditTemplate] = useState<NotificationTemplate | null>(null);

  const integrations: IntegrationItem[] = [
    {
      id: "google-drive",
      name: "Google Workspace",
      description: "Connect Google Drive for document storage",
      icon: HardDrive,
      connected: false,
      color: "text-blue-600 bg-blue-50",
    },
    {
      id: "square",
      name: "Square Payments",
      description: "Connect Square for payment processing",
      icon: CreditCard,
      connected: false,
      color: "text-navy-600 bg-navy-50",
    },
    {
      id: "google-calendar",
      name: "Google Calendar",
      description: "Sync appointments and deadlines",
      icon: Calendar,
      connected: false,
      color: "text-teal-600 bg-teal-50",
    },
    {
      id: "email",
      name: "Email (EmailJS/Resend)",
      description: "Configure email notifications",
      icon: Mail,
      connected: false,
      color: "text-purple-600 bg-purple-50",
    },
  ];

  useEffect(() => {
    // Load business info
    const stored = localStorage.getItem("cts_business_info");
    if (stored) {
      setBusinessInfo(JSON.parse(stored));
    }

    // Load templates
    const storedTemplates = localStorage.getItem("cts_notification_templates");
    if (storedTemplates) {
      setTemplates(JSON.parse(storedTemplates));
    } else {
      setTemplates(DEFAULT_TEMPLATES);
      localStorage.setItem("cts_notification_templates", JSON.stringify(DEFAULT_TEMPLATES));
    }
  }, []);

  const handleSaveBusinessInfo = () => {
    localStorage.setItem("cts_business_info", JSON.stringify(businessInfo));
    setEditingBusiness(false);
  };

  const handleEditTemplate = (template: NotificationTemplate) => {
    setEditingTemplateId(template.id);
    setEditTemplate({ ...template });
  };

  const handleSaveTemplate = () => {
    if (!editTemplate) return;
    const updated = templates.map((t) => (t.id === editTemplate.id ? editTemplate : t));
    setTemplates(updated);
    localStorage.setItem("cts_notification_templates", JSON.stringify(updated));
    setEditingTemplateId(null);
    setEditTemplate(null);
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-navy-700">Settings</h1>
        <p className="text-gray-500 mt-1">Manage your business configuration</p>
      </div>

      {/* Business Info */}
      <div className="bg-white rounded-xl border border-gray-200 p-6">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-lg font-semibold text-navy-700 flex items-center gap-2">
            <Building className="w-5 h-5 text-teal-600" />
            Business Information
          </h2>
          {!editingBusiness ? (
            <button
              onClick={() => setEditingBusiness(true)}
              className="inline-flex items-center gap-1.5 px-4 py-2 border border-gray-200 text-gray-600 rounded-lg hover:bg-gray-50 transition text-sm font-medium"
            >
              <Edit3 className="w-4 h-4" /> Edit
            </button>
          ) : (
            <div className="flex gap-2">
              <button
                onClick={handleSaveBusinessInfo}
                className="inline-flex items-center gap-1.5 px-4 py-2 bg-teal-500 text-white rounded-lg hover:bg-teal-600 transition text-sm font-medium"
              >
                <Save className="w-4 h-4" /> Save
              </button>
              <button
                onClick={() => setEditingBusiness(false)}
                className="inline-flex items-center gap-1.5 px-4 py-2 border border-gray-200 text-gray-600 rounded-lg hover:bg-gray-50 transition text-sm font-medium"
              >
                <X className="w-4 h-4" /> Cancel
              </button>
            </div>
          )}
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="label-text">Business Name</label>
            {editingBusiness ? (
              <input
                type="text"
                value={businessInfo.name}
                onChange={(e) => setBusinessInfo({ ...businessInfo, name: e.target.value })}
                className="input-field"
              />
            ) : (
              <p className="text-gray-900 font-medium">{businessInfo.name}</p>
            )}
          </div>
          <div>
            <label className="label-text">Email</label>
            {editingBusiness ? (
              <input
                type="email"
                value={businessInfo.email}
                onChange={(e) => setBusinessInfo({ ...businessInfo, email: e.target.value })}
                className="input-field"
              />
            ) : (
              <p className="text-gray-900">{businessInfo.email}</p>
            )}
          </div>
          <div>
            <label className="label-text">Phone</label>
            {editingBusiness ? (
              <input
                type="tel"
                value={businessInfo.phone}
                onChange={(e) => setBusinessInfo({ ...businessInfo, phone: e.target.value })}
                className="input-field"
              />
            ) : (
              <p className="text-gray-900">{businessInfo.phone}</p>
            )}
          </div>
          <div>
            <label className="label-text">Address</label>
            {editingBusiness ? (
              <input
                type="text"
                value={businessInfo.address}
                onChange={(e) => setBusinessInfo({ ...businessInfo, address: e.target.value })}
                className="input-field"
              />
            ) : (
              <p className="text-gray-900">{businessInfo.address}</p>
            )}
          </div>
        </div>
      </div>

      {/* Integration Status */}
      <div>
        <h2 className="text-lg font-semibold text-navy-700 mb-4 flex items-center gap-2">
          <Settings className="w-5 h-5 text-teal-600" />
          Integration Status
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {integrations.map((integration) => {
            const Icon = integration.icon;
            return (
              <div key={integration.id} className="bg-white rounded-xl border border-gray-200 p-5">
                <div className="flex items-start gap-4">
                  <div className={`w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0 ${integration.color}`}>
                    <Icon className="w-6 h-6" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-1">
                      <h3 className="font-semibold text-gray-900">{integration.name}</h3>
                      {integration.connected ? (
                        <span className="inline-flex items-center gap-1 px-2 py-0.5 bg-emerald-100 text-emerald-700 text-xs rounded-full font-medium">
                          <CheckCircle className="w-3 h-3" /> Connected
                        </span>
                      ) : (
                        <span className="inline-flex items-center gap-1 px-2 py-0.5 bg-gray-100 text-gray-500 text-xs rounded-full font-medium">
                          <XCircle className="w-3 h-3" /> Not Connected
                        </span>
                      )}
                    </div>
                    <p className="text-sm text-gray-500 mb-3">{integration.description}</p>
                    <button
                      className={`px-4 py-2 rounded-lg text-sm font-medium transition ${
                        integration.connected
                          ? "border border-gray-200 text-gray-600 hover:bg-gray-50"
                          : "bg-navy-600 text-white hover:bg-navy-700"
                      }`}
                    >
                      {integration.connected ? "Manage Connection" : "Connect"}
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Notification Templates */}
      <div>
        <h2 className="text-lg font-semibold text-navy-700 mb-4 flex items-center gap-2">
          <Bell className="w-5 h-5 text-teal-600" />
          Notification Templates
        </h2>
        <div className="space-y-4">
          {templates.map((template) => (
            <div key={template.id} className="bg-white rounded-xl border border-gray-200 p-5">
              {editingTemplateId === template.id && editTemplate ? (
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <h3 className="font-semibold text-gray-900">{template.name}</h3>
                    <p className="text-xs text-gray-400">{template.trigger}</p>
                  </div>
                  <div>
                    <label className="label-text">Subject</label>
                    <input
                      type="text"
                      value={editTemplate.subject}
                      onChange={(e) => setEditTemplate({ ...editTemplate, subject: e.target.value })}
                      className="input-field"
                    />
                  </div>
                  <div>
                    <label className="label-text">Body</label>
                    <textarea
                      value={editTemplate.body}
                      onChange={(e) => setEditTemplate({ ...editTemplate, body: e.target.value })}
                      className="input-field"
                      rows={4}
                    />
                    <p className="text-xs text-gray-400 mt-1">
                      Available variables: {"{{service_name}}"}, {"{{new_status}}"}, {"{{file_name}}"}, {"{{amount}}"}, {"{{description}}"}, {"{{due_date}}"}
                    </p>
                  </div>
                  <div className="flex gap-2">
                    <button
                      onClick={handleSaveTemplate}
                      className="px-4 py-2 bg-teal-500 text-white rounded-lg hover:bg-teal-600 transition text-sm font-medium"
                    >
                      Save Template
                    </button>
                    <button
                      onClick={() => { setEditingTemplateId(null); setEditTemplate(null); }}
                      className="px-4 py-2 text-gray-600 text-sm font-medium hover:text-gray-800"
                    >
                      Cancel
                    </button>
                  </div>
                </div>
              ) : (
                <div className="flex items-start justify-between">
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-1">
                      <h3 className="font-semibold text-gray-900">{template.name}</h3>
                      <span className="text-xs text-gray-400 bg-gray-50 px-2 py-0.5 rounded">{template.trigger}</span>
                    </div>
                    <p className="text-sm text-gray-600 mb-1">
                      <span className="font-medium text-gray-500">Subject:</span> {template.subject}
                    </p>
                    <p className="text-sm text-gray-400 line-clamp-2">{template.body}</p>
                  </div>
                  <button
                    onClick={() => handleEditTemplate(template)}
                    className="p-2 rounded-lg hover:bg-gray-100 transition text-gray-400 hover:text-gray-600 flex-shrink-0 ml-4"
                  >
                    <Edit3 className="w-4 h-4" />
                  </button>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
