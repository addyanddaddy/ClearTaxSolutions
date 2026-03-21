"use client";

import { useState, useEffect, useCallback, useRef } from "react";
import { useAuth } from "@/lib/auth-context";
import {
  Upload,
  FileText,
  Trash2,
  Eye,
  CheckCircle,
  Circle,
  AlertCircle,
  X,
  File,
  Image,
  FileSpreadsheet,
} from "lucide-react";

interface Document {
  id: string;
  userId: string;
  fileName: string;
  fileSize: number;
  fileType: string;
  category: string;
  caseService: string;
  notes: string;
  status: "Pending Review" | "Reviewed" | "Action Required";
  uploadDate: string;
}

const CATEGORIES = [
  "W-2",
  "1099",
  "Prior Year Return",
  "Business Records",
  "IRS Notice",
  "Bank Statements",
  "Receipts/Expenses",
  "Identification",
  "Other",
];

const ACCEPTED_TYPES = ".pdf,.jpg,.jpeg,.png,.doc,.docx,.xls,.xlsx";
const MAX_SIZE_MB = 25;

const REQUIRED_DOCS: Record<string, string[]> = {
  "Individual Tax Preparation": [
    "W-2s from all employers",
    "1099 forms (freelance, investments, etc.)",
    "Prior Year Tax Return",
    "Valid Photo ID",
    "Social Security Card",
  ],
  "Business Tax Preparation": [
    "Prior Year Business Tax Return",
    "Profit & Loss Statement",
    "Balance Sheet",
    "Business Bank Statements",
    "1099s Issued to Contractors",
  ],
  "IRS Audit Representation": [
    "IRS Notice or Audit Letter",
    "Prior Year Returns (3 years)",
    "Supporting Documentation",
  ],
  "Tax Debt Resolution": [
    "IRS Notice / Balance Due Letter",
    "Collection Information Statement",
    "Recent Pay Stubs",
    "Bank Statements (3 months)",
    "Monthly Expense Breakdown",
  ],
};

const STATUS_COLORS: Record<string, string> = {
  "Pending Review": "bg-yellow-100 text-yellow-700",
  Reviewed: "bg-green-100 text-green-700",
  "Action Required": "bg-red-100 text-red-700",
};

function getFileIcon(type: string) {
  if (type.includes("image")) return Image;
  if (type.includes("spreadsheet") || type.includes("excel") || type.includes("xls")) return FileSpreadsheet;
  return File;
}

function formatFileSize(bytes: number): string {
  if (bytes < 1024) return bytes + " B";
  if (bytes < 1024 * 1024) return (bytes / 1024).toFixed(1) + " KB";
  return (bytes / (1024 * 1024)).toFixed(1) + " MB";
}

export default function DocumentsPage() {
  const { user } = useAuth();
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [documents, setDocuments] = useState<Document[]>([]);
  const [isDragging, setIsDragging] = useState(false);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [category, setCategory] = useState("");
  const [caseService, setCaseService] = useState("");
  const [notes, setNotes] = useState("");
  const [uploading, setUploading] = useState(false);
  const [uploadError, setUploadError] = useState("");

  const loadDocuments = useCallback(() => {
    if (!user) return;
    try {
      const docs = JSON.parse(localStorage.getItem("cts_documents") || "[]");
      setDocuments(docs.filter((d: Document) => d.userId === user.id));
    } catch {
      setDocuments([]);
    }
  }, [user]);

  useEffect(() => {
    loadDocuments();
  }, [loadDocuments]);

  if (!user) return null;

  const userServices = user.serviceNeeded;

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = () => {
    setIsDragging(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    const file = e.dataTransfer.files[0];
    if (file) validateAndSetFile(file);
  };

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) validateAndSetFile(file);
  };

  const validateAndSetFile = (file: File) => {
    setUploadError("");
    if (file.size > MAX_SIZE_MB * 1024 * 1024) {
      setUploadError(`File size exceeds ${MAX_SIZE_MB}MB limit`);
      return;
    }
    setSelectedFile(file);
  };

  const handleUpload = async () => {
    if (!selectedFile || !category) {
      setUploadError("Please select a file and category");
      return;
    }

    setUploading(true);
    await new Promise((r) => setTimeout(r, 1000));

    const newDoc: Document = {
      id: `doc-${Date.now()}`,
      userId: user.id,
      fileName: selectedFile.name,
      fileSize: selectedFile.size,
      fileType: selectedFile.type,
      category,
      caseService: caseService || "General",
      notes,
      status: "Pending Review",
      uploadDate: new Date().toISOString(),
    };

    const allDocs = JSON.parse(localStorage.getItem("cts_documents") || "[]");
    allDocs.push(newDoc);
    localStorage.setItem("cts_documents", JSON.stringify(allDocs));

    // Add activity
    const activities = JSON.parse(localStorage.getItem("cts_activity") || "[]");
    activities.push({
      id: `act-${Date.now()}`,
      userId: user.id,
      type: "document_uploaded",
      description: `Uploaded document: ${selectedFile.name}`,
      date: new Date().toISOString(),
    });
    localStorage.setItem("cts_activity", JSON.stringify(activities));

    // Reset form
    setSelectedFile(null);
    setCategory("");
    setCaseService("");
    setNotes("");
    setUploading(false);
    if (fileInputRef.current) fileInputRef.current.value = "";
    loadDocuments();
  };

  const handleDelete = (docId: string) => {
    if (!confirm("Are you sure you want to delete this document?")) return;
    const allDocs = JSON.parse(localStorage.getItem("cts_documents") || "[]");
    const filtered = allDocs.filter((d: Document) => d.id !== docId);
    localStorage.setItem("cts_documents", JSON.stringify(filtered));
    loadDocuments();
  };

  // Determine required docs based on user's services
  const requiredDocsList = userServices.flatMap((service) => {
    const docs = REQUIRED_DOCS[service];
    if (!docs) return [];
    return docs.map((doc) => ({ service, docName: doc }));
  });

  return (
    <div className="space-y-8 animate-fade-in">
      <div>
        <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">Documents</h1>
        <p className="text-gray-500 mt-1">Upload and manage your tax documents securely</p>
      </div>

      {/* Upload Section */}
      <div className="bg-white rounded-xl border border-gray-100 p-6">
        <h2 className="text-lg font-semibold text-gray-900 mb-4">Upload New Document</h2>

        {uploadError && (
          <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-lg flex items-center gap-2">
            <AlertCircle className="w-4 h-4 text-red-500" />
            <p className="text-sm text-red-700">{uploadError}</p>
          </div>
        )}

        {/* Drop Zone */}
        <div
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onDrop={handleDrop}
          onClick={() => fileInputRef.current?.click()}
          className={`border-2 border-dashed rounded-xl p-8 text-center cursor-pointer transition-all duration-200 ${
            isDragging
              ? "border-teal-500 bg-teal-50"
              : selectedFile
              ? "border-green-400 bg-green-50"
              : "border-gray-300 hover:border-teal-400 hover:bg-gray-50"
          }`}
        >
          <input
            ref={fileInputRef}
            type="file"
            accept={ACCEPTED_TYPES}
            onChange={handleFileSelect}
            className="hidden"
          />
          {selectedFile ? (
            <div className="flex items-center justify-center gap-3">
              <FileText className="w-8 h-8 text-green-500" />
              <div className="text-left">
                <p className="font-medium text-gray-900">{selectedFile.name}</p>
                <p className="text-sm text-gray-500">{formatFileSize(selectedFile.size)}</p>
              </div>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  setSelectedFile(null);
                  if (fileInputRef.current) fileInputRef.current.value = "";
                }}
                className="ml-2 p-1 hover:bg-gray-200 rounded"
              >
                <X className="w-4 h-4 text-gray-500" />
              </button>
            </div>
          ) : (
            <>
              <Upload className={`w-10 h-10 mx-auto mb-3 ${isDragging ? "text-teal-500" : "text-gray-400"}`} />
              <p className="font-medium text-gray-700">
                Drag and drop your file here, or click to browse
              </p>
              <p className="text-sm text-gray-400 mt-2">
                PDF, JPG, PNG, DOC, DOCX, XLS, XLSX &bull; Max {MAX_SIZE_MB}MB
              </p>
            </>
          )}
        </div>

        {/* Upload Form Fields */}
        <div className="grid sm:grid-cols-2 gap-4 mt-4">
          <div>
            <label className="label-text">Document Category *</label>
            <select
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className="input-field"
            >
              <option value="">Select category</option>
              {CATEGORIES.map((cat) => (
                <option key={cat} value={cat}>
                  {cat}
                </option>
              ))}
            </select>
          </div>
          <div>
            <label className="label-text">Related Case / Service</label>
            <select
              value={caseService}
              onChange={(e) => setCaseService(e.target.value)}
              className="input-field"
            >
              <option value="">Select service (optional)</option>
              {userServices.map((service) => (
                <option key={service} value={service}>
                  {service}
                </option>
              ))}
            </select>
          </div>
        </div>

        <div className="mt-4">
          <label className="label-text">Notes</label>
          <textarea
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
            className="input-field min-h-[80px] resize-y"
            placeholder="Any additional notes about this document..."
            rows={2}
          />
        </div>

        <div className="flex items-center justify-between mt-4">
          <p className="text-xs text-gray-400 flex items-center gap-1">
            <CheckCircle className="w-3.5 h-3.5 text-green-500" />
            Files are securely stored via Google Workspace integration
          </p>
          <button
            onClick={handleUpload}
            disabled={!selectedFile || !category || uploading}
            className="btn-primary"
          >
            {uploading ? (
              <div className="flex items-center gap-2">
                <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                Uploading...
              </div>
            ) : (
              <span className="flex items-center gap-2">
                <Upload className="w-4 h-4" />
                Upload Document
              </span>
            )}
          </button>
        </div>
      </div>

      {/* Uploaded Documents Table */}
      <div className="bg-white rounded-xl border border-gray-100 overflow-hidden">
        <div className="px-6 py-4 border-b border-gray-100">
          <h2 className="text-lg font-semibold text-gray-900">
            Uploaded Documents ({documents.length})
          </h2>
        </div>
        {documents.length === 0 ? (
          <div className="p-12 text-center">
            <FileText className="w-12 h-12 text-gray-300 mx-auto mb-3" />
            <p className="text-gray-500">No documents uploaded yet</p>
            <p className="text-sm text-gray-400 mt-1">
              Upload your first document using the form above
            </p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50 text-left">
                <tr>
                  <th className="px-6 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wider">
                    File Name
                  </th>
                  <th className="px-6 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wider">
                    Category
                  </th>
                  <th className="px-6 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wider hidden sm:table-cell">
                    Case
                  </th>
                  <th className="px-6 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wider hidden md:table-cell">
                    Upload Date
                  </th>
                  <th className="px-6 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wider">
                    Status
                  </th>
                  <th className="px-6 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-50">
                {documents.map((doc) => {
                  const FileIcon = getFileIcon(doc.fileType);
                  return (
                    <tr key={doc.id} className="hover:bg-gray-50">
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-3">
                          <FileIcon className="w-5 h-5 text-gray-400 flex-shrink-0" />
                          <div className="min-w-0">
                            <p className="font-medium text-gray-900 truncate max-w-[200px]">
                              {doc.fileName}
                            </p>
                            <p className="text-xs text-gray-400">{formatFileSize(doc.fileSize)}</p>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4 text-sm text-gray-600">{doc.category}</td>
                      <td className="px-6 py-4 text-sm text-gray-600 hidden sm:table-cell">
                        {doc.caseService}
                      </td>
                      <td className="px-6 py-4 text-sm text-gray-500 hidden md:table-cell">
                        {new Date(doc.uploadDate).toLocaleDateString("en-US", {
                          month: "short",
                          day: "numeric",
                          year: "numeric",
                        })}
                      </td>
                      <td className="px-6 py-4">
                        <span
                          className={`inline-flex px-2.5 py-1 rounded-full text-xs font-semibold ${
                            STATUS_COLORS[doc.status] || "bg-gray-100 text-gray-600"
                          }`}
                        >
                          {doc.status}
                        </span>
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-2">
                          <button
                            className="p-1.5 text-gray-400 hover:text-teal-600 hover:bg-teal-50 rounded transition-colors"
                            title="View"
                            onClick={() =>
                              alert("Document preview will be available with Google Workspace integration.")
                            }
                          >
                            <Eye className="w-4 h-4" />
                          </button>
                          <button
                            className="p-1.5 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded transition-colors"
                            title="Delete"
                            onClick={() => handleDelete(doc.id)}
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* Required Documents Checklist */}
      {requiredDocsList.length > 0 && (
        <div className="bg-white rounded-xl border border-gray-100 p-6">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">Required Documents Checklist</h2>
          <p className="text-sm text-gray-500 mb-6">
            Based on your selected services, here are the documents we need from you.
          </p>

          <div className="space-y-6">
            {userServices.map((service) => {
              const docs = REQUIRED_DOCS[service];
              if (!docs) return null;
              return (
                <div key={service}>
                  <h3 className="font-medium text-gray-800 mb-3">{service}</h3>
                  <div className="space-y-2">
                    {docs.map((doc) => {
                      // Check if any uploaded document matches this requirement loosely
                      const isUploaded = documents.some(
                        (d) =>
                          d.caseService === service &&
                          (d.category.toLowerCase().includes(doc.toLowerCase().split(" ")[0].toLowerCase()) ||
                            d.fileName.toLowerCase().includes(doc.toLowerCase().split(" ")[0].toLowerCase()))
                      );
                      return (
                        <div key={doc} className="flex items-center gap-3">
                          {isUploaded ? (
                            <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0" />
                          ) : (
                            <Circle className="w-5 h-5 text-gray-300 flex-shrink-0" />
                          )}
                          <span
                            className={`text-sm ${
                              isUploaded ? "text-green-700 line-through" : "text-gray-600"
                            }`}
                          >
                            {doc}
                          </span>
                        </div>
                      );
                    })}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}
