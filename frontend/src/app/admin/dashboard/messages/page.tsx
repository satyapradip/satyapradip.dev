"use client";

import React, { useEffect, useState } from "react";
import { Mail, Trash2, CheckCircle2, AlertCircle, RefreshCw, Reply, Clock, Inbox } from "lucide-react";

interface MessageItem {
  id: string;
  name: string;
  email: string;
  message: string;
  read: boolean;
  createdAt: string;
}

export default function MessagesManagerPage() {
  const [messages, setMessages] = useState<MessageItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [statusMsg, setStatusMsg] = useState<{ type: "success" | "error"; text: string } | null>(null);

  const fetchMessages = async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/admin/messages");
      const data = await res.json();
      if (data.success) {
        setMessages(data.messages);
      }
    } catch (e) {
      console.error("Failed to load messages", e);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMessages();
  }, []);

  const toggleReadStatus = async (item: MessageItem) => {
    try {
      const res = await fetch("/api/admin/messages", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id: item.id, read: !item.read }),
      });
      const data = await res.json();
      if (data.success) {
        fetchMessages();
      }
    } catch (err) {
      console.error("Failed to update message status", err);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this message?")) return;
    try {
      const res = await fetch(`/api/admin/messages?id=${id}`, { method: "DELETE" });
      const data = await res.json();
      if (data.success) {
        setStatusMsg({ type: "success", text: "Message deleted successfully." });
        fetchMessages();
      }
    } catch (err) {
      setStatusMsg({ type: "error", text: "Failed to delete message." });
    }
  };

  const unreadCount = messages.filter((m) => !m.read).length;

  return (
    <div className="max-w-5xl mx-auto space-y-6">
      {/* Header */}
      <div className="bg-white p-6 border-4 border-[#18181B] shadow-[6px_6px_0px_0px_#18181B] flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center space-x-2 text-[#F26522] text-xs font-black uppercase tracking-wider mb-1">
            <Inbox size={16} />
            <span>Visitor Contact Submissions</span>
          </div>
          <h1 className="text-2xl font-black uppercase text-[#18181B] flex items-center space-x-3">
            <span>Messages Inbox</span>
            {unreadCount > 0 && (
              <span className="px-2.5 py-0.5 bg-[#F26522] text-white text-xs font-mono font-bold border border-[#18181B]">
                {unreadCount} UNREAD
              </span>
            )}
          </h1>
          <p className="text-xs text-zinc-600 font-medium mt-1">
            View, read, and reply to messages sent directly by visitors via your website contact form.
          </p>
        </div>

        <button
          onClick={fetchMessages}
          disabled={loading}
          className="p-3 bg-[#FAF6EE] border-2 border-[#18181B] shadow-[2px_2px_0px_0px_#18181B] hover:bg-[#F26522] hover:text-white transition-colors"
          title="Reload Messages"
        >
          <RefreshCw size={16} className={loading ? "animate-spin" : ""} />
        </button>
      </div>

      {/* Alert */}
      {statusMsg && (
        <div
          className={`p-4 border-4 border-[#18181B] shadow-[4px_4px_0px_0px_#18181B] flex items-center space-x-3 text-xs font-black ${
            statusMsg.type === "success" ? "bg-emerald-100 text-emerald-900" : "bg-rose-100 text-rose-900"
          }`}
        >
          {statusMsg.type === "success" ? <CheckCircle2 size={18} /> : <AlertCircle size={18} />}
          <span>{statusMsg.text}</span>
        </div>
      )}

      {/* Messages List */}
      <div className="space-y-4">
        {loading ? (
          <div className="p-12 bg-white border-4 border-[#18181B] text-center font-bold text-xs text-zinc-500">
            Loading visitor messages...
          </div>
        ) : messages.length === 0 ? (
          <div className="p-12 bg-white border-4 border-[#18181B] text-center space-y-2">
            <p className="font-black text-sm uppercase text-[#18181B]">Your Inbox is Empty</p>
            <p className="text-xs font-medium text-zinc-600">
              No contact submissions have been received yet. Test by submitting a message on the public site!
            </p>
          </div>
        ) : (
          messages.map((item) => (
            <div
              key={item.id}
              className={`bg-white border-4 border-[#18181B] shadow-[6px_6px_0px_0px_#18181B] p-6 space-y-4 transition-all ${
                !item.read ? "bg-[#FFFDF5] border-l-8 border-l-[#F26522]" : ""
              }`}
            >
              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2 border-b-2 border-[#18181B] pb-3">
                <div>
                  <div className="flex items-center space-x-2">
                    <span className="font-black text-base uppercase text-[#18181B]">{item.name}</span>
                    {!item.read && (
                      <span className="px-2 py-0.5 bg-[#F26522] text-white text-[10px] font-mono font-bold uppercase">
                        NEW
                      </span>
                    )}
                  </div>
                  <a href={`mailto:${item.email}`} className="text-xs font-bold text-[#F26522] hover:underline">
                    {item.email}
                  </a>
                </div>

                <div className="flex items-center space-x-2 text-zinc-500 text-[11px] font-mono font-bold">
                  <Clock size={14} />
                  <span>{new Date(item.createdAt).toLocaleString()}</span>
                </div>
              </div>

              {/* Message Body */}
              <p className="text-xs font-medium text-[#18181B] leading-relaxed whitespace-pre-wrap bg-[#FAF6EE] p-4 border-2 border-[#18181B]">
                {item.message}
              </p>

              {/* Footer Actions */}
              <div className="pt-2 flex items-center justify-between">
                <button
                  onClick={() => toggleReadStatus(item)}
                  className="text-xs font-bold text-zinc-600 hover:text-[#18181B] underline"
                >
                  {item.read ? "Mark as Unread" : "Mark as Read"}
                </button>

                <div className="flex items-center space-x-3">
                  <a
                    href={`mailto:${item.email}?subject=Re:%20Portfolio%20Inquiry%20-%20Satyapradip%20Das&body=Hi%20${encodeURIComponent(
                      item.name
                    )},%0A%0AThank%20you%20for%20reaching%20out!`}
                    target="_blank"
                    rel="noreferrer"
                    className="flex items-center space-x-1.5 px-4 py-2 bg-[#F26522] text-white font-black text-xs uppercase border-2 border-[#18181B] shadow-[2px_2px_0px_0px_#18181B] hover:bg-[#d95314]"
                  >
                    <Reply size={14} />
                    <span>Reply Email</span>
                  </a>

                  <button
                    onClick={() => handleDelete(item.id)}
                    className="p-2 bg-rose-100 text-rose-700 border-2 border-[#18181B] hover:bg-rose-600 hover:text-white transition-colors"
                    title="Delete message"
                  >
                    <Trash2 size={16} />
                  </button>
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
