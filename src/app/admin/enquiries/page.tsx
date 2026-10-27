'use client';

import React, { useState } from 'react';
import { AdminHeader } from '@/components/admin/AdminHeader';
import {
  mockBulkEnquiries as initialBulk,
  mockOEMEnquiries as initialOEM,
  mockContactEnquiries as initialContact,
} from '@/data/mockEnquiries';
import { AnyEnquiry, EnquiryStatus } from '@/lib/types';
import { Badge } from '@/components/ui/Badge';
import { WhatsAppButton } from '@/components/products/WhatsAppButton';
import {
  Search,
} from 'lucide-react';

export default function AdminEnquiriesPage() {
  const [bulkList, setBulkList] = useState(initialBulk);
  const [oemList, setOemList] = useState(initialOEM);
  const [contactList, setContactList] = useState(initialContact);
  const [activeTab, setActiveTab] = useState<'all' | 'bulk' | 'oem' | 'general'>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedEnquiry, setSelectedEnquiry] = useState<AnyEnquiry | null>(null);

  const allEnquiries: AnyEnquiry[] = [...bulkList, ...oemList, ...contactList].sort(
    (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
  );

  const filteredEnquiries = allEnquiries.filter((item) => {
    if (activeTab !== 'all' && item.type !== activeTab) return false;
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      const matchName = item.fullName.toLowerCase().includes(q);
      const matchEmail = item.email.toLowerCase().includes(q);
      const matchCompany = 'companyName' in item && item.companyName.toLowerCase().includes(q);
      return matchName || matchEmail || matchCompany;
    }
    return true;
  });

  const updateStatus = (id: string, newStatus: EnquiryStatus) => {
    setBulkList((prev) =>
      prev.map((item) => (item.id === id ? { ...item, status: newStatus } : item))
    );
    setOemList((prev) =>
      prev.map((item) => (item.id === id ? { ...item, status: newStatus } : item))
    );
    setContactList((prev) =>
      prev.map((item) => (item.id === id ? { ...item, status: newStatus } : item))
    );

    if (selectedEnquiry && selectedEnquiry.id === id) {
      setSelectedEnquiry((prev) => (prev ? { ...prev, status: newStatus } : null));
    }
  };

  return (
    <div className="flex flex-col flex-1">
      <AdminHeader
        title="Enquiries & Leads Management"
        subtitle={`Tracking ${allEnquiries.length} total commercial quotes and custom engineering inquiries`}
      />

      <div className="p-6 sm:p-8 space-y-6 max-w-7xl">
        {/* Filter Toolbar */}
        <div className="bg-white rounded-2xl border border-slate-200/90 p-4 shadow-xs flex flex-col md:flex-row items-center justify-between gap-4">
          {/* Tabs */}
          <div className="flex items-center gap-1.5 overflow-x-auto w-full md:w-auto">
            <button
              onClick={() => setActiveTab('all')}
              className={`px-3.5 py-1.5 rounded-lg text-xs font-semibold cursor-pointer whitespace-nowrap transition-colors ${
                activeTab === 'all'
                  ? 'bg-[#292929] text-white'
                  : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
              }`}
            >
              All Inquiries ({allEnquiries.length})
            </button>
            <button
              onClick={() => setActiveTab('bulk')}
              className={`px-3.5 py-1.5 rounded-lg text-xs font-semibold cursor-pointer whitespace-nowrap transition-colors ${
                activeTab === 'bulk'
                  ? 'bg-[#E50914] text-white'
                  : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
              }`}
            >
              Bulk Orders ({bulkList.length})
            </button>
            <button
              onClick={() => setActiveTab('oem')}
              className={`px-3.5 py-1.5 rounded-lg text-xs font-semibold cursor-pointer whitespace-nowrap transition-colors ${
                activeTab === 'oem'
                  ? 'bg-[#E50914] text-white'
                  : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
              }`}
            >
              OEM Enquiries ({oemList.length})
            </button>
            <button
              onClick={() => setActiveTab('general')}
              className={`px-3.5 py-1.5 rounded-lg text-xs font-semibold cursor-pointer whitespace-nowrap transition-colors ${
                activeTab === 'general'
                  ? 'bg-[#292929] text-white'
                  : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
              }`}
            >
              Contact Us ({contactList.length})
            </button>
          </div>

          {/* Search Box */}
          <div className="relative w-full md:w-72">
            <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search by name, company, email..."
              className="w-full pl-9 pr-4 py-2 bg-slate-50 border border-slate-300 rounded-xl text-xs text-slate-900 focus:outline-none focus:ring-2 focus:ring-[#E50914] focus:bg-white"
            />
          </div>
        </div>

        {/* Enquiries Grid / Table */}
        <div className="bg-white rounded-2xl border border-slate-200/90 shadow-xs overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs border-collapse">
              <thead>
                <tr className="bg-slate-50 border-b border-slate-200 text-slate-500 font-bold uppercase tracking-wider">
                  <th className="py-3.5 px-4">Type</th>
                  <th className="py-3.5 px-4">Client / Company</th>
                  <th className="py-3.5 px-4">Scope / Product</th>
                  <th className="py-3.5 px-4">Contact Info</th>
                  <th className="py-3.5 px-4">Status</th>
                  <th className="py-3.5 px-4 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {filteredEnquiries.map((enq) => {
                  return (
                    <tr key={enq.id} className="hover:bg-slate-50/60 transition-colors">
                      {/* Type Badge */}
                      <td className="py-3.5 px-4">
                        {enq.type === 'bulk' && <Badge variant="default">Bulk Supply</Badge>}
                        {enq.type === 'oem' && <Badge variant="navy">OEM / R&D</Badge>}
                        {enq.type === 'general' && <Badge variant="secondary">Contact</Badge>}
                      </td>

                      {/* Client Name & Company */}
                      <td className="py-3.5 px-4">
                        <div className="font-bold text-slate-900">{enq.fullName}</div>
                        {'companyName' in enq && (
                          <div className="text-[11px] font-semibold text-[#E50914]">
                            {enq.companyName}
                          </div>
                        )}
                      </td>

                      {/* Scope / Requirement summary */}
                      <td className="py-3.5 px-4 max-w-xs">
                        {enq.type === 'bulk' && (
                          <div className="line-clamp-1 text-slate-700">
                            <strong>{enq.quantity} pcs</strong> of {enq.productName}
                          </div>
                        )}
                        {enq.type === 'oem' && (
                          <div className="line-clamp-1 text-slate-700">
                            <strong>{enq.targetProductCategory}</strong> ({enq.estimatedVolumePerMonth})
                          </div>
                        )}
                        {enq.type === 'general' && (
                          <div className="line-clamp-1 text-slate-700">
                            {enq.subject || enq.message}
                          </div>
                        )}
                        <div className="text-[10px] text-slate-400 mt-0.5">
                          {new Date(enq.createdAt).toLocaleDateString('en-IN', {
                            day: 'numeric',
                            month: 'short',
                            year: 'numeric',
                          })}
                        </div>
                      </td>

                      {/* Contact Channels */}
                      <td className="py-3.5 px-4 text-slate-600">
                        <div>{enq.mobile}</div>
                        <div className="text-[11px] text-slate-400">{enq.email}</div>
                      </td>

                      {/* Status Dropdown */}
                      <td className="py-3.5 px-4">
                        <select
                          value={enq.status}
                          onChange={(e) => updateStatus(enq.id, e.target.value as EnquiryStatus)}
                          className="px-2.5 py-1 rounded-md text-[11px] font-semibold bg-slate-100 border border-slate-300 text-slate-800 cursor-pointer focus:outline-none focus:ring-1 focus:ring-[#E50914]"
                        >
                          <option value="new">NEW</option>
                          <option value="in-progress">IN PROGRESS</option>
                          <option value="contacted">CONTACTED</option>
                          <option value="closed">CLOSED</option>
                        </select>
                      </td>

                      {/* Action buttons */}
                      <td className="py-3.5 px-4 text-right">
                        <div className="flex items-center justify-end gap-2">
                          <button
                            type="button"
                            onClick={() => setSelectedEnquiry(enq)}
                            className="px-3 py-1 bg-slate-100 hover:bg-slate-200 text-slate-800 rounded-lg text-xs font-semibold transition-colors"
                          >
                            Details
                          </button>

                          <WhatsAppButton
                            phoneNumber={enq.mobile}
                            customMessage={`Hello ${enq.fullName}, this is Powerteck Electronics regarding your inquiry.`}
                            size="sm"
                            label="WA"
                            className="text-xs px-2.5 py-1"
                          />
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>

          {filteredEnquiries.length === 0 && (
            <div className="p-8 text-center text-xs text-slate-500">
              No enquiries match the selected filter.
            </div>
          )}
        </div>

        {/* Details Modal / Drawer */}
        {selectedEnquiry && (
          <div className="fixed inset-0 z-50 bg-slate-950/60 backdrop-blur-xs flex items-center justify-center p-4">
            <div className="bg-white rounded-2xl max-w-xl w-full p-6 sm:p-8 space-y-5 shadow-2xl border border-slate-200">
              <div className="flex items-center justify-between border-b border-slate-100 pb-3">
                <div>
                  <div className="text-xs font-bold text-[#E50914] uppercase tracking-wider">
                    {selectedEnquiry.type.toUpperCase()} ENQUIRY RECORD
                  </div>
                  <h3 className="text-lg font-bold text-slate-900">{selectedEnquiry.fullName}</h3>
                </div>
                <button
                  type="button"
                  onClick={() => setSelectedEnquiry(null)}
                  className="text-slate-400 hover:text-slate-600 font-bold text-lg p-1"
                >
                  ✕
                </button>
              </div>

              <div className="space-y-3 text-xs text-slate-700">
                {'companyName' in selectedEnquiry && (
                  <div className="flex justify-between py-1 border-b border-slate-100">
                    <span className="font-semibold text-slate-500">Company / Organization:</span>
                    <span className="font-bold text-slate-900">{selectedEnquiry.companyName}</span>
                  </div>
                )}

                <div className="flex justify-between py-1 border-b border-slate-100">
                  <span className="font-semibold text-slate-500">Phone / WhatsApp:</span>
                  <span className="font-bold text-slate-900">{selectedEnquiry.mobile}</span>
                </div>

                <div className="flex justify-between py-1 border-b border-slate-100">
                  <span className="font-semibold text-slate-500">Email:</span>
                  <span className="font-bold text-slate-900">{selectedEnquiry.email}</span>
                </div>

                {'city' in selectedEnquiry && (
                  <div className="flex justify-between py-1 border-b border-slate-100">
                    <span className="font-semibold text-slate-500">Location:</span>
                    <span className="font-medium text-slate-900">
                      {selectedEnquiry.city}{' '}
                      {selectedEnquiry.state ? `, ${selectedEnquiry.state}` : ''}
                    </span>
                  </div>
                )}

                {'productName' in selectedEnquiry && (
                  <div className="flex justify-between py-1 border-b border-slate-100">
                    <span className="font-semibold text-slate-500">Target Product:</span>
                    <span className="font-bold text-slate-900">
                      {selectedEnquiry.productName} ({selectedEnquiry.quantity} pcs)
                    </span>
                  </div>
                )}

                {'targetProductCategory' in selectedEnquiry && (
                  <div className="flex justify-between py-1 border-b border-slate-100">
                    <span className="font-semibold text-slate-500">OEM Category & Volume:</span>
                    <span className="font-bold text-slate-900">
                      {selectedEnquiry.targetProductCategory} ({selectedEnquiry.estimatedVolumePerMonth})
                    </span>
                  </div>
                )}

                <div className="pt-2">
                  <span className="font-semibold text-slate-500 block mb-1">
                    Requirements / Technical Specs / Message:
                  </span>
                  <div className="p-3 rounded-lg bg-slate-50 border border-slate-200 text-slate-800 leading-relaxed">
                    {'requirements' in selectedEnquiry && selectedEnquiry.requirements}
                    {'technicalSpecsRequired' in selectedEnquiry && selectedEnquiry.technicalSpecsRequired}
                    {'message' in selectedEnquiry && selectedEnquiry.message}
                  </div>
                </div>
              </div>

              <div className="flex items-center justify-between pt-4 border-t border-slate-100">
                <WhatsAppButton
                  phoneNumber={selectedEnquiry.mobile}
                  label="Direct WhatsApp Response"
                  size="md"
                />

                <button
                  type="button"
                  onClick={() => setSelectedEnquiry(null)}
                  className="px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-800 rounded-lg text-xs font-semibold"
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
