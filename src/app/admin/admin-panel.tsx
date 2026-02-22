"use client";

/* eslint-disable @next/next/no-img-element */
import { useState, useRef, useEffect } from "react";
import Link from "next/link";
import {
  Plus,
  Pencil,
  Trash2,
  Save,
  X,
  GripVertical,
  ImageIcon,
  Type,
  ArrowLeft,
  Images,
  Upload,
  Lock,
  Eye,
  EyeOff,
} from "lucide-react";
import { useLanguage } from "@/lib/language-context";
import { LanguageSwitcher } from "@/components/language-switcher";
import type { Lang } from "@/lib/translations";
import {
  ADMIN_PASSWORD,
  AUTH_STORAGE_KEY,
  AUTH_DURATION_MS,
  LANG_LABELS,
  SUPPORTED_LANGS,
} from "@/lib/config";
import { sampleEvents, formatEventDate } from "@/lib/events";

const emptyLangField: Record<Lang, string> = { en: "", bg: "", tr: "" };

interface ContentBlock {
  type: "text" | "image" | "carousel";
  value: string;
  text: Record<Lang, string>;
  caption: Record<Lang, string>;
  images?: string[];
}

interface EventFormData {
  title: Record<Lang, string>;
  category: string;
  coverImage: string;
  summary: Record<Lang, string>;
  date: string;
  contentBlocks: ContentBlock[];
}

const emptyForm: EventFormData = {
  title: { en: "", bg: "", tr: "" },
  category: "",
  coverImage: "",
  summary: { en: "", bg: "", tr: "" },
  date: new Date().toISOString().split("T")[0],
  contentBlocks: [],
};

// Convert shared events to admin form data format
const initialEvents: (EventFormData & { id: string })[] = sampleEvents.map(
  (e) => ({
    id: e.id,
    title: { ...e.title },
    category: e.category.en,
    coverImage: e.coverImage,
    summary: { ...e.summary },
    date: e.date,
    contentBlocks: [],
  })
);

function fileToDataUrl(file: File): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(reader.result as string);
    reader.onerror = reject;
    reader.readAsDataURL(file);
  });
}

export function AdminPanel() {
  const { lang } = useLanguage();
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [authChecked, setAuthChecked] = useState(false);
  const [password, setPassword] = useState("");
  const [passwordError, setPasswordError] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  useEffect(() => {
    const stored = localStorage.getItem(AUTH_STORAGE_KEY);
    if (stored) {
      const timestamp = parseInt(stored, 10);
      if (Date.now() - timestamp < AUTH_DURATION_MS) {
        setIsAuthenticated(true);
      } else {
        localStorage.removeItem(AUTH_STORAGE_KEY);
      }
    }
    setAuthChecked(true);
  }, []);
  const [events, setEvents] =
    useState<(EventFormData & { id: string })[]>(initialEvents);
  const [isEditing, setIsEditing] = useState(false);
  const [currentId, setCurrentId] = useState<string | null>(null);
  const [form, setForm] = useState<EventFormData>(emptyForm);
  const [editLang, setEditLang] = useState<Lang>("en");
  const coverInputRef = useRef<HTMLInputElement>(null);

  function handleLogin(e: React.FormEvent) {
    e.preventDefault();
    if (password === ADMIN_PASSWORD) {
      localStorage.setItem(AUTH_STORAGE_KEY, String(Date.now()));
      setIsAuthenticated(true);
      setPasswordError(false);
    } else {
      setPasswordError(true);
    }
  }

  function handleAddNew() {
    setForm({
      ...emptyForm,
      title: { en: "", bg: "", tr: "" },
      summary: { en: "", bg: "", tr: "" },
    });
    setCurrentId(null);
    setIsEditing(true);
  }

  function handleEdit(event: (typeof events)[number]) {
    setForm({
      title: { ...event.title },
      category: event.category,
      coverImage: event.coverImage,
      summary: { ...event.summary },
      date: event.date,
      contentBlocks: event.contentBlocks.map((b) => ({
        ...b,
        images: b.images ? [...b.images] : undefined,
      })),
    });
    setCurrentId(event.id);
    setIsEditing(true);
  }

  function handleDelete(id: string) {
    if (confirm("Are you sure you want to delete this event?")) {
      setEvents((prev) => prev.filter((e) => e.id !== id));
    }
  }

  function handleSave() {
    if (currentId) {
      setEvents((prev) =>
        prev.map((e) => (e.id === currentId ? { ...form, id: currentId } : e))
      );
    } else {
      setEvents((prev) => [...prev, { ...form, id: String(Date.now()) }]);
    }
    setIsEditing(false);
  }

  function addBlock(type: "text" | "image" | "carousel") {
    setForm((prev) => ({
      ...prev,
      contentBlocks: [
        ...prev.contentBlocks,
        {
          type,
          value: "",
          text: { ...emptyLangField },
          caption: { ...emptyLangField },
          images: type === "carousel" ? [] : undefined,
        },
      ],
    }));
  }

  function updateBlock(index: number, field: string, value: string) {
    setForm((prev) => {
      const blocks = [...prev.contentBlocks];
      blocks[index] = { ...blocks[index], [field]: value };
      return { ...prev, contentBlocks: blocks };
    });
  }

  function updateBlockLang(index: number, field: "text" | "caption", lang: Lang, value: string) {
    setForm((prev) => {
      const blocks = [...prev.contentBlocks];
      blocks[index] = {
        ...blocks[index],
        [field]: { ...blocks[index][field], [lang]: value },
      };
      return { ...prev, contentBlocks: blocks };
    });
  }

  function removeBlock(index: number) {
    setForm((prev) => ({
      ...prev,
      contentBlocks: prev.contentBlocks.filter((_, i) => i !== index),
    }));
  }

  async function handleCoverUpload(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;
    const dataUrl = await fileToDataUrl(file);
    setForm((prev) => ({ ...prev, coverImage: dataUrl }));
  }

  async function handleImageBlockUpload(
    e: React.ChangeEvent<HTMLInputElement>,
    blockIndex: number
  ) {
    const file = e.target.files?.[0];
    if (!file) return;
    const dataUrl = await fileToDataUrl(file);
    updateBlock(blockIndex, "value", dataUrl);
  }

  async function handleCarouselUpload(
    e: React.ChangeEvent<HTMLInputElement>,
    blockIndex: number
  ) {
    const files = e.target.files;
    if (!files || files.length === 0) return;
    const newImages: string[] = [];
    for (let i = 0; i < files.length; i++) {
      newImages.push(await fileToDataUrl(files[i]));
    }
    setForm((prev) => {
      const blocks = [...prev.contentBlocks];
      const existing = blocks[blockIndex].images || [];
      blocks[blockIndex] = {
        ...blocks[blockIndex],
        images: [...existing, ...newImages],
      };
      return { ...prev, contentBlocks: blocks };
    });
  }

  function removeCarouselImage(blockIndex: number, imageIndex: number) {
    setForm((prev) => {
      const blocks = [...prev.contentBlocks];
      const images = [...(blocks[blockIndex].images || [])];
      images.splice(imageIndex, 1);
      blocks[blockIndex] = { ...blocks[blockIndex], images };
      return { ...prev, contentBlocks: blocks };
    });
  }

  function moveCarouselImage(blockIndex: number, imageIndex: number, direction: -1 | 1) {
    setForm((prev) => {
      const blocks = [...prev.contentBlocks];
      const images = [...(blocks[blockIndex].images || [])];
      const newIndex = imageIndex + direction;
      if (newIndex < 0 || newIndex >= images.length) return prev;
      [images[imageIndex], images[newIndex]] = [images[newIndex], images[imageIndex]];
      blocks[blockIndex] = { ...blocks[blockIndex], images };
      return { ...prev, contentBlocks: blocks };
    });
  }

  // Wait for auth check before rendering
  if (!authChecked) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="w-8 h-8 border-3 border-gray-200 border-t-primary rounded-full animate-spin" />
      </div>
    );
  }

  // Password gate
  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4">
        <div className="bg-white rounded-xl shadow-lg p-8 w-full max-w-sm">
          <div className="flex justify-center mb-6">
            <div className="w-14 h-14 bg-red-50 rounded-full flex items-center justify-center">
              <Lock className="w-7 h-7 text-primary" />
            </div>
          </div>
          <h1 className="text-2xl font-bold text-gray-900 text-center mb-2">
            Admin Access
          </h1>
          <p className="text-sm text-gray-500 text-center mb-6">
            Enter the password to continue
          </p>
          <form onSubmit={handleLogin}>
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                className={`w-full rounded-lg border p-3 pr-11 outline-none transition-colors ${
                  passwordError
                    ? "border-red-400 focus:border-red-500 focus:ring-1 focus:ring-red-500"
                    : "border-gray-300 focus:border-primary focus:ring-1 focus:ring-primary"
                }`}
                value={password}
                onChange={(e) => {
                  setPassword(e.target.value);
                  setPasswordError(false);
                }}
                placeholder="Password"
                autoFocus
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
              >
                {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
              </button>
            </div>
            {passwordError && (
              <p className="text-red-500 text-sm mt-2">Incorrect password</p>
            )}
            <button
              type="submit"
              className="w-full mt-4 bg-primary text-white font-semibold py-3 rounded-lg hover:bg-primary-hover transition-colors"
            >
              Log In
            </button>
          </form>
        </div>
      </div>
    );
  }

  if (isEditing) {
    return (
      <div className="min-h-screen bg-gray-50 pt-24 pb-20">
        <div className="bg-white border-b border-gray-200 fixed top-20 left-0 right-0 z-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex justify-between items-center">
            <h1 className="text-xl font-bold text-gray-800">
              {currentId ? "Edit Event" : "Add New Event"}
            </h1>
            <div className="flex gap-2">
              <button
                onClick={() => setIsEditing(false)}
                className="inline-flex items-center gap-2 px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50"
              >
                <X className="w-4 h-4" /> Cancel
              </button>
              <button
                onClick={handleSave}
                className="inline-flex items-center gap-2 px-4 py-2 text-sm font-medium text-white bg-primary rounded-md hover:bg-primary-hover"
              >
                <Save className="w-4 h-4" /> Save
              </button>
            </div>
          </div>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-20">
          <div className="bg-white p-6 rounded-xl shadow-sm space-y-6">
            {/* Language tabs */}
            <div className="flex gap-2 mb-4">
              {SUPPORTED_LANGS.map((l) => (
                <button
                  key={l}
                  onClick={() => setEditLang(l)}
                  className={`px-4 py-2 text-sm font-medium rounded-lg transition-colors ${
                    editLang === l
                      ? "bg-primary text-white"
                      : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                  }`}
                >
                  {LANG_LABELS[l]}
                </button>
              ))}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Title ({LANG_LABELS[editLang]})
              </label>
              <input
                type="text"
                className="w-full rounded-md border border-gray-300 p-2 focus:border-red-500 focus:ring-1 focus:ring-red-500 outline-none"
                value={form.title[editLang]}
                onChange={(e) =>
                  setForm((prev) => ({
                    ...prev,
                    title: { ...prev.title, [editLang]: e.target.value },
                  }))
                }
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Summary ({LANG_LABELS[editLang]})
              </label>
              <textarea
                className="w-full rounded-md border border-gray-300 p-2 h-24 focus:border-red-500 focus:ring-1 focus:ring-red-500 outline-none"
                value={form.summary[editLang]}
                onChange={(e) =>
                  setForm((prev) => ({
                    ...prev,
                    summary: { ...prev.summary, [editLang]: e.target.value },
                  }))
                }
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Category
                </label>
                <input
                  type="text"
                  className="w-full rounded-md border border-gray-300 p-2 focus:border-red-500 focus:ring-1 focus:ring-red-500 outline-none"
                  value={form.category}
                  onChange={(e) =>
                    setForm((prev) => ({ ...prev, category: e.target.value }))
                  }
                  placeholder="e.g. Cultural, Theater, Education"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Date
                </label>
                <input
                  type="date"
                  className="w-full rounded-md border border-gray-300 p-2 focus:border-red-500 focus:ring-1 focus:ring-red-500 outline-none"
                  value={form.date}
                  onChange={(e) =>
                    setForm((prev) => ({ ...prev, date: e.target.value }))
                  }
                />
              </div>
            </div>

            {/* Cover Image */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Cover Image
              </label>
              <div className="flex gap-2">
                <input
                  type="text"
                  className="flex-1 rounded-md border border-gray-300 p-2 focus:border-red-500 focus:ring-1 focus:ring-red-500 outline-none"
                  value={form.coverImage.startsWith("data:") ? "" : form.coverImage}
                  onChange={(e) =>
                    setForm((prev) => ({ ...prev, coverImage: e.target.value }))
                  }
                  placeholder="Paste URL or upload..."
                />
                <input
                  ref={coverInputRef}
                  type="file"
                  accept="image/*"
                  className="hidden"
                  onChange={handleCoverUpload}
                />
                <button
                  type="button"
                  onClick={() => coverInputRef.current?.click()}
                  className="inline-flex items-center gap-1.5 px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50"
                >
                  <Upload className="w-4 h-4" /> Upload
                </button>
              </div>
              {form.coverImage && (
                <img
                  src={form.coverImage}
                  alt="Preview"
                  className="h-32 rounded-lg mt-3 object-cover"
                />
              )}
            </div>

            {/* Content Blocks */}
            <div className="border-t pt-6">
              <h3 className="text-lg font-bold text-gray-900 mb-4">
                Content Builder
              </h3>

              <div className="space-y-4 mb-6">
                {form.contentBlocks.map((block, idx) => (
                  <div
                    key={idx}
                    className="bg-gray-50 border border-gray-200 rounded-lg p-4 relative group"
                  >
                    <div className="absolute top-2 left-2 text-gray-400">
                      <GripVertical className="w-5 h-5" />
                    </div>
                    <button
                      type="button"
                      onClick={() => removeBlock(idx)}
                      className="absolute top-2 right-2 p-1 hover:bg-red-100 text-red-600 rounded opacity-50 group-hover:opacity-100 transition-opacity"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>

                    <div className="pl-8">
                      <span className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-2 block">
                        {block.type} block
                      </span>

                      {block.type === "text" && (
                        <textarea
                          className="w-full rounded-md border border-gray-300 p-2 h-32 focus:border-red-500 focus:ring-1 focus:ring-red-500 outline-none"
                          value={block.text[editLang]}
                          onChange={(e) =>
                            updateBlockLang(idx, "text", editLang, e.target.value)
                          }
                          placeholder={`Type paragraph text here (${LANG_LABELS[editLang]})...`}
                        />
                      )}

                      {block.type === "image" && (
                        <ImageBlockEditor
                          block={block}
                          index={idx}
                          editLang={editLang}
                          onUpdate={updateBlock}
                          onUpdateLang={updateBlockLang}
                          onUpload={handleImageBlockUpload}
                        />
                      )}

                      {block.type === "carousel" && (
                        <CarouselBlockEditor
                          block={block}
                          index={idx}
                          editLang={editLang}
                          onUpdateLang={updateBlockLang}
                          onUpload={handleCarouselUpload}
                          onRemoveImage={removeCarouselImage}
                          onMoveImage={moveCarouselImage}
                        />
                      )}
                    </div>
                  </div>
                ))}
              </div>

              <div className="flex gap-2">
                <button
                  type="button"
                  onClick={() => addBlock("text")}
                  className="inline-flex items-center gap-1 px-4 py-2 text-xs font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50"
                >
                  <Type className="w-4 h-4" /> Add Text
                </button>
                <button
                  type="button"
                  onClick={() => addBlock("image")}
                  className="inline-flex items-center gap-1 px-4 py-2 text-xs font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50"
                >
                  <ImageIcon className="w-4 h-4" /> Add Image
                </button>
                <button
                  type="button"
                  onClick={() => addBlock("carousel")}
                  className="inline-flex items-center gap-1 px-4 py-2 text-xs font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50"
                >
                  <Images className="w-4 h-4" /> Add Carousel
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 pt-28 pb-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center mb-8">
          <div>
            <div className="flex items-center gap-3 mb-2">
              <Link
                href="/"
                className="text-sm text-primary hover:underline flex items-center gap-1"
              >
                <ArrowLeft className="w-3 h-3" /> Back to site
              </Link>
            </div>
            <h1 className="text-3xl font-bold text-gray-900">Admin Panel</h1>
          </div>
          <div className="flex items-center gap-4">
            <LanguageSwitcher />
            <button
              onClick={handleAddNew}
              className="inline-flex items-center gap-2 px-4 py-2 text-sm font-medium text-white bg-primary rounded-md hover:bg-primary-hover shadow-sm"
            >
              <Plus className="w-4 h-4" /> Add Event
            </button>
          </div>
        </div>

        {events.length === 0 ? (
          <div className="bg-white rounded-xl border border-gray-200 px-6 py-16 text-center text-gray-500">
            No events yet. Click &quot;Add Event&quot; to create one.
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {events.map((event) => {
              const isPast = new Date(event.date) < new Date();
              return (
                <div
                  key={event.id}
                  className="bg-white rounded-xl border border-gray-200 overflow-hidden shadow-sm hover:shadow-lg transition-all duration-300 group flex flex-col"
                >
                  <div className="relative h-48 overflow-hidden">
                    {event.coverImage ? (
                      <img
                        src={event.coverImage}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                        alt="Event cover"
                      />
                    ) : (
                      <div className="w-full h-full bg-gray-100 flex items-center justify-center">
                        <ImageIcon className="w-10 h-10 text-gray-300" />
                      </div>
                    )}
                    <div className="absolute top-3 left-3">
                      <span className="bg-white/95 backdrop-blur px-2.5 py-1 rounded-md text-xs font-bold text-primary uppercase tracking-wider">
                        {event.category}
                      </span>
                    </div>
                    <div className="absolute top-3 right-3">
                      <span className="bg-primary text-white px-2.5 py-1 rounded-md text-xs font-bold shadow-md flex items-center gap-1.5">
                        {!isPast && <span className="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse" />}
                        {formatEventDate(event.date, lang)}
                      </span>
                    </div>
                  </div>
                  <div className="p-5 flex flex-col flex-grow">
                    <h3 className="font-semibold text-gray-900 text-base leading-snug mb-1 group-hover:text-primary transition-colors">
                      {event.title[lang]}
                    </h3>
                    <p className="text-sm text-gray-500 line-clamp-2 mb-4 flex-grow">
                      {event.summary[lang]}
                    </p>
                    <div className="flex gap-2 pt-3 border-t border-gray-100">
                      <button
                        onClick={() => handleEdit(event)}
                        className="flex-1 inline-flex items-center justify-center gap-1.5 px-3 py-2 text-sm font-medium text-gray-700 bg-gray-50 border border-gray-200 rounded-lg hover:bg-gray-100 transition-colors"
                      >
                        <Pencil className="w-3.5 h-3.5" /> Edit
                      </button>
                      <button
                        onClick={() => handleDelete(event.id)}
                        className="inline-flex items-center justify-center gap-1.5 px-3 py-2 text-sm font-medium text-red-600 bg-red-50 border border-red-100 rounded-lg hover:bg-red-100 transition-colors"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}

function ImageBlockEditor({
  block,
  index,
  editLang,
  onUpdate,
  onUpdateLang,
  onUpload,
}: {
  block: ContentBlock;
  index: number;
  editLang: Lang;
  onUpdate: (index: number, field: string, value: string) => void;
  onUpdateLang: (index: number, field: "text" | "caption", lang: Lang, value: string) => void;
  onUpload: (e: React.ChangeEvent<HTMLInputElement>, index: number) => void;
}) {
  const fileRef = useRef<HTMLInputElement>(null);

  return (
    <div className="space-y-2">
      <div className="flex gap-2">
        <input
          type="text"
          className="flex-1 rounded-md border border-gray-300 p-2 focus:border-red-500 focus:ring-1 focus:ring-red-500 outline-none"
          value={block.value.startsWith("data:") ? "" : block.value}
          onChange={(e) => onUpdate(index, "value", e.target.value)}
          placeholder="Paste image URL or upload..."
        />
        <input
          ref={fileRef}
          type="file"
          accept="image/*"
          className="hidden"
          onChange={(e) => onUpload(e, index)}
        />
        <button
          type="button"
          onClick={() => fileRef.current?.click()}
          className="inline-flex items-center gap-1.5 px-3 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50"
        >
          <Upload className="w-4 h-4" />
        </button>
      </div>
      <input
        type="text"
        className="w-full rounded-md border border-gray-300 p-2 text-sm focus:border-red-500 focus:ring-1 focus:ring-red-500 outline-none"
        value={block.caption[editLang]}
        onChange={(e) => onUpdateLang(index, "caption", editLang, e.target.value)}
        placeholder={`Caption (${LANG_LABELS[editLang]}) — optional`}
      />
      {block.value && (
        <img
          src={block.value}
          className="h-24 rounded-lg object-cover mt-2"
          alt={block.caption[editLang] || "Content image"}
        />
      )}
    </div>
  );
}

function CarouselBlockEditor({
  block,
  index,
  editLang,
  onUpdateLang,
  onUpload,
  onRemoveImage,
  onMoveImage,
}: {
  block: ContentBlock;
  index: number;
  editLang: Lang;
  onUpdateLang: (index: number, field: "text" | "caption", lang: Lang, value: string) => void;
  onUpload: (e: React.ChangeEvent<HTMLInputElement>, index: number) => void;
  onRemoveImage: (blockIndex: number, imageIndex: number) => void;
  onMoveImage: (blockIndex: number, imageIndex: number, direction: -1 | 1) => void;
}) {
  const fileRef = useRef<HTMLInputElement>(null);
  const images = block.images || [];

  return (
    <div className="space-y-3">
      <input
        type="text"
        className="w-full rounded-md border border-gray-300 p-2 text-sm focus:border-red-500 focus:ring-1 focus:ring-red-500 outline-none"
        value={block.caption[editLang]}
        onChange={(e) => onUpdateLang(index, "caption", editLang, e.target.value)}
        placeholder={`Carousel caption (${LANG_LABELS[editLang]}) — optional`}
      />

      {images.length > 0 && (
        <div className="flex gap-3 flex-wrap">
          {images.map((img, imgIdx) => (
            <div key={imgIdx} className="relative group/img">
              <img
                src={img}
                className={`h-24 w-24 rounded-lg object-cover transition-all ${imgIdx === 0 ? "ring-2 ring-primary ring-offset-1" : ""}`}
                alt={`Carousel image ${imgIdx + 1}`}
              />
              {imgIdx === 0 && (
                <span className="absolute -top-2 left-1/2 -translate-x-1/2 bg-primary text-white text-[10px] font-bold px-1.5 py-0.5 rounded tracking-wide">
                  COVER
                </span>
              )}
              <div className="absolute bottom-0 left-0 right-0 flex justify-center gap-0.5 pb-0.5 opacity-0 group-hover/img:opacity-100 transition-opacity">
                {imgIdx > 0 && (
                  <button
                    type="button"
                    onClick={() => onMoveImage(index, imgIdx, -1)}
                    className="w-6 h-6 bg-black/60 text-white rounded flex items-center justify-center text-xs cursor-pointer hover:bg-black/80"
                  >
                    ←
                  </button>
                )}
                {imgIdx < images.length - 1 && (
                  <button
                    type="button"
                    onClick={() => onMoveImage(index, imgIdx, 1)}
                    className="w-6 h-6 bg-black/60 text-white rounded flex items-center justify-center text-xs cursor-pointer hover:bg-black/80"
                  >
                    →
                  </button>
                )}
              </div>
              <button
                type="button"
                onClick={() => onRemoveImage(index, imgIdx)}
                className="absolute -top-1.5 -right-1.5 w-5 h-5 bg-red-500 text-white rounded-full flex items-center justify-center text-xs cursor-pointer opacity-0 group-hover/img:opacity-100 transition-opacity hover:bg-red-600"
              >
                <X className="w-3 h-3" />
              </button>
            </div>
          ))}
        </div>
      )}

      <input
        ref={fileRef}
        type="file"
        accept="image/*"
        multiple
        className="hidden"
        onChange={(e) => onUpload(e, index)}
      />
      <button
        type="button"
        onClick={() => fileRef.current?.click()}
        className="inline-flex items-center gap-1.5 px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-dashed border-gray-300 rounded-lg hover:bg-gray-50 w-full justify-center cursor-pointer"
      >
        <Upload className="w-4 h-4" /> Upload Images
        {images.length > 0 && (
          <span className="text-gray-400 ml-1">({images.length} added)</span>
        )}
      </button>
    </div>
  );
}
