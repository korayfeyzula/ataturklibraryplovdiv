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
  ChevronUp,
  ChevronDown,
  ImageIcon,
  Type,
  ArrowLeft,
  Images,
  Upload,
  Lock,
  Eye,
  EyeOff,
  Loader2,
  Star,
  Languages,
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
import {
  useEvents,
  createEvent,
  updateEvent,
  deleteEvent,
  formatEventDate,
  type EventData,
  type ContentBlock,
} from "@/lib/events";
import { supabase, uploadImage } from "@/lib/supabase";
import { translateField } from "@/lib/translate";

const emptyLangField: Record<Lang, string> = { en: "", bg: "", tr: "" };

interface EventFormData {
  title: Record<Lang, string>;
  category: Record<Lang, string>;
  coverImage: string;
  summary: Record<Lang, string>;
  date: string;
  contentBlocks: ContentBlock[];
  isHighlighted: boolean;
}

const emptyForm: EventFormData = {
  title: { en: "", bg: "", tr: "" },
  category: { en: "", bg: "", tr: "" },
  coverImage: "",
  summary: { en: "", bg: "", tr: "" },
  date: new Date().toISOString().split("T")[0],
  contentBlocks: [],
  isHighlighted: false,
};

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

  const { events, loading, reload, setEvents } = useEvents();
  const [isEditing, setIsEditing] = useState(false);
  const [currentId, setCurrentId] = useState<string | null>(null);
  const [form, setForm] = useState<EventFormData>(emptyForm);
  const [editLang, setEditLang] = useState<Lang>("bg");
  const [saving, setSaving] = useState(false);
  const [translating, setTranslating] = useState(false);
  const [connectionStatus, setConnectionStatus] = useState<
    "checking" | "connected" | "error" | "local"
  >(supabase ? "checking" : "local");
  const coverInputRef = useRef<HTMLInputElement>(null);

  // Test Supabase connection on mount
  useEffect(() => {
    if (!supabase || !isAuthenticated) return;
    (async () => {
      try {
        const { error } = await supabase.from("events").select("id").limit(1);
        setConnectionStatus(error ? "error" : "connected");
      } catch {
        setConnectionStatus("error");
      }
    })();
  }, [isAuthenticated]);

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
      category: { en: "", bg: "", tr: "" },
      summary: { en: "", bg: "", tr: "" },
    });
    setCurrentId(null);
    setIsEditing(true);
  }

  function handleEdit(event: EventData) {
    setForm({
      title: { ...event.title },
      category: { ...event.category },
      coverImage: event.coverImage,
      summary: { ...event.summary },
      date: event.date,
      contentBlocks: event.contentBlocks.map((b) => ({
        ...b,
        images: b.images ? [...b.images] : undefined,
      })),
      isHighlighted: event.isHighlighted,
    });
    setCurrentId(event.id);
    setIsEditing(true);
  }

  async function handleDelete(id: string) {
    if (!confirm("Сигурни ли сте, че искате да изтриете това събитие?")) return;

    if (supabase) {
      await deleteEvent(id);
      await reload();
    } else {
      setEvents((prev) => prev.filter((e) => e.id !== id));
    }
  }

  async function handleSave() {
    setSaving(true);
    try {
      const payload = {
        title: form.title,
        category: form.category,
        date: form.date,
        summary: form.summary,
        coverImage: form.coverImage,
        contentBlocks: form.contentBlocks,
        isHighlighted: form.isHighlighted,
      };

      if (supabase) {
        if (currentId) {
          await updateEvent(currentId, payload);
        } else {
          await createEvent(payload);
        }
        await reload();
      } else {
        // Local state fallback
        if (currentId) {
          setEvents((prev) =>
            prev.map((e) =>
              e.id === currentId ? { ...payload, id: currentId } : e
            )
          );
        } else {
          setEvents((prev) => [
            ...prev,
            { ...payload, id: String(Date.now()) },
          ]);
        }
      }
      setIsEditing(false);
    } finally {
      setSaving(false);
    }
  }

  async function handleTranslateAll() {
    setTranslating(true);
    try {
      const [title, category, summary] = await Promise.all([
        translateField(form.title, true),
        translateField(form.category, true),
        translateField(form.summary, true),
      ]);

      const translatedBlocks = await Promise.all(
        form.contentBlocks.map(async (block) => {
          if (block.type === "text" && block.text.bg.trim()) {
            const text = await translateField(block.text, true);
            return { ...block, text };
          }
          if (
            (block.type === "image" || block.type === "carousel") &&
            block.caption.bg.trim()
          ) {
            const caption = await translateField(block.caption, true);
            return { ...block, caption };
          }
          return block;
        })
      );

      setForm((prev) => ({
        ...prev,
        title,
        category,
        summary,
        contentBlocks: translatedBlocks,
      }));
    } catch {
      // Partial translations remain in form state
    } finally {
      setTranslating(false);
    }
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

  function updateBlockLang(
    index: number,
    field: "text" | "caption",
    lang: Lang,
    value: string
  ) {
    setForm((prev) => {
      const blocks = [...prev.contentBlocks];
      blocks[index] = {
        ...blocks[index],
        [field]: { ...blocks[index][field], [lang]: value },
      };
      return { ...prev, contentBlocks: blocks };
    });
  }

  function moveBlock(index: number, direction: -1 | 1) {
    setForm((prev) => {
      const blocks = [...prev.contentBlocks];
      const newIndex = index + direction;
      if (newIndex < 0 || newIndex >= blocks.length) return prev;
      [blocks[index], blocks[newIndex]] = [blocks[newIndex], blocks[index]];
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
    const url = await uploadImage(file);
    setForm((prev) => ({ ...prev, coverImage: url }));
  }

  async function handleImageBlockUpload(
    e: React.ChangeEvent<HTMLInputElement>,
    blockIndex: number
  ) {
    const file = e.target.files?.[0];
    if (!file) return;
    const url = await uploadImage(file);
    updateBlock(blockIndex, "value", url);
  }

  async function handleCarouselUpload(
    e: React.ChangeEvent<HTMLInputElement>,
    blockIndex: number
  ) {
    const files = e.target.files;
    if (!files || files.length === 0) return;
    const newImages: string[] = [];
    for (let i = 0; i < files.length; i++) {
      newImages.push(await uploadImage(files[i]));
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

  function moveCarouselImage(
    blockIndex: number,
    imageIndex: number,
    direction: -1 | 1
  ) {
    setForm((prev) => {
      const blocks = [...prev.contentBlocks];
      const images = [...(blocks[blockIndex].images || [])];
      const newIndex = imageIndex + direction;
      if (newIndex < 0 || newIndex >= images.length) return prev;
      [images[imageIndex], images[newIndex]] = [
        images[newIndex],
        images[imageIndex],
      ];
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
            Администрация
          </h1>
          <p className="text-sm text-gray-500 text-center mb-6">
            Въведете парола за достъп
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
                placeholder="Парола"
                autoFocus
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
              >
                {showPassword ? (
                  <EyeOff className="w-5 h-5" />
                ) : (
                  <Eye className="w-5 h-5" />
                )}
              </button>
            </div>
            {passwordError && (
              <p className="text-red-500 text-sm mt-2">Грешна парола</p>
            )}
            <button
              type="submit"
              className="w-full mt-4 bg-primary text-white font-semibold py-3 rounded-lg hover:bg-primary-hover transition-colors"
            >
              Вход
            </button>
          </form>
          {!supabase && (
            <p className="text-xs text-amber-600 bg-amber-50 rounded-lg p-3 mt-4 text-center">
              Supabase not configured — changes are local only.
            </p>
          )}
        </div>
      </div>
    );
  }

  // ---------- Edit form ----------
  if (isEditing) {
    return (
      <div className="min-h-screen bg-gray-50 pt-24 pb-20">
        <div className="bg-white border-b border-gray-200 fixed top-20 left-0 right-0 z-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex justify-between items-center">
            <h1 className="text-xl font-bold text-gray-800">
              {currentId ? "Редактиране" : "Ново събитие"}
            </h1>
            <div className="flex gap-2">
              <button
                onClick={() => setIsEditing(false)}
                disabled={saving}
                className="inline-flex items-center gap-2 px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50"
              >
                <X className="w-4 h-4" /> Отказ
              </button>
              <button
                onClick={handleSave}
                disabled={saving}
                className="inline-flex items-center gap-2 px-4 py-2 text-sm font-medium text-white bg-primary rounded-md hover:bg-primary-hover disabled:opacity-60"
              >
                {saving ? (
                  <Loader2 className="w-4 h-4 animate-spin" />
                ) : (
                  <Save className="w-4 h-4" />
                )}
                {saving ? "Запазва се..." : "Запази"}
              </button>
            </div>
          </div>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-20">
          <div className="bg-white p-6 rounded-xl shadow-sm space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Заглавие
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
                Резюме
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
                  Категория
                </label>
                <input
                  type="text"
                  className="w-full rounded-md border border-gray-300 p-2 focus:border-red-500 focus:ring-1 focus:ring-red-500 outline-none"
                  value={form.category[editLang]}
                  onChange={(e) =>
                    setForm((prev) => ({
                      ...prev,
                      category: {
                        ...prev.category,
                        [editLang]: e.target.value,
                      },
                    }))
                  }
                  placeholder="напр. Култура, Театър, Образование"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Дата
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

            {/* Highlight toggle */}
            <label className="flex items-center gap-3 cursor-pointer">
              <input
                type="checkbox"
                checked={form.isHighlighted}
                onChange={(e) =>
                  setForm((prev) => ({
                    ...prev,
                    isHighlighted: e.target.checked,
                  }))
                }
                className="w-4 h-4 rounded border-gray-300 text-primary focus:ring-primary"
              />
              <Star
                className={`w-4 h-4 ${form.isHighlighted ? "text-amber-500 fill-amber-500" : "text-gray-400"}`}
              />
              <span className="text-sm font-medium text-gray-700">
                Покажи на началната страница
              </span>
            </label>

            {/* Cover Image */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Корична снимка
              </label>
              <div className="flex gap-2">
                <input
                  type="text"
                  className="flex-1 rounded-md border border-gray-300 p-2 focus:border-red-500 focus:ring-1 focus:ring-red-500 outline-none"
                  value={
                    form.coverImage.startsWith("data:")
                      ? ""
                      : form.coverImage
                  }
                  onChange={(e) =>
                    setForm((prev) => ({
                      ...prev,
                      coverImage: e.target.value,
                    }))
                  }
                  placeholder="Постави URL или качи..."
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
                  <Upload className="w-4 h-4" /> Качи
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
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-bold text-gray-900">
                  Съдържание
                </h3>
                <button
                  type="button"
                  onClick={handleTranslateAll}
                  disabled={translating || !form.title.bg.trim()}
                  className="inline-flex items-center gap-1.5 px-4 py-2 text-sm font-medium text-primary bg-red-50 border border-red-200 rounded-lg hover:bg-red-100 disabled:opacity-50 transition-colors"
                >
                  {translating ? (
                    <Loader2 className="w-4 h-4 animate-spin" />
                  ) : (
                    <Languages className="w-4 h-4" />
                  )}
                  {translating ? "Превежда се..." : "Преведи на EN/TR"}
                </button>
              </div>

              <div className="space-y-4 mb-6">
                {form.contentBlocks.map((block, idx) => (
                  <div
                    key={idx}
                    className="bg-gray-50 border border-gray-200 rounded-lg p-4 relative group"
                  >
                    <div className="absolute top-2 left-2 flex flex-col gap-0.5">
                      <button
                        type="button"
                        onClick={() => moveBlock(idx, -1)}
                        disabled={idx === 0}
                        className="p-0.5 text-gray-400 hover:text-gray-700 disabled:opacity-20 transition-colors"
                      >
                        <ChevronUp className="w-4 h-4" />
                      </button>
                      <button
                        type="button"
                        onClick={() => moveBlock(idx, 1)}
                        disabled={idx === form.contentBlocks.length - 1}
                        className="p-0.5 text-gray-400 hover:text-gray-700 disabled:opacity-20 transition-colors"
                      >
                        <ChevronDown className="w-4 h-4" />
                      </button>
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
                            updateBlockLang(
                              idx,
                              "text",
                              editLang,
                              e.target.value
                            )
                          }
                          placeholder="Въведете текст тук..."
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
                  <Type className="w-4 h-4" /> Текст
                </button>
                <button
                  type="button"
                  onClick={() => addBlock("image")}
                  className="inline-flex items-center gap-1 px-4 py-2 text-xs font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50"
                >
                  <ImageIcon className="w-4 h-4" /> Снимка
                </button>
                <button
                  type="button"
                  onClick={() => addBlock("carousel")}
                  className="inline-flex items-center gap-1 px-4 py-2 text-xs font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50"
                >
                  <Images className="w-4 h-4" /> Галерия
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // ---------- Event list ----------
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
              {connectionStatus === "connected" && (
                <span className="text-xs text-green-700 bg-green-50 px-2 py-0.5 rounded-full flex items-center gap-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-green-500" />
                  Connected
                </span>
              )}
              {connectionStatus === "error" && (
                <span className="text-xs text-red-600 bg-red-50 px-2 py-0.5 rounded-full">
                  Connection error
                </span>
              )}
              {connectionStatus === "local" && (
                <span className="text-xs text-amber-600 bg-amber-50 px-2 py-0.5 rounded-full">
                  Local mode
                </span>
              )}
              {connectionStatus === "checking" && (
                <span className="text-xs text-gray-500 bg-gray-50 px-2 py-0.5 rounded-full">
                  Checking...
                </span>
              )}
            </div>
            <h1 className="text-3xl font-bold text-gray-900">Администрация</h1>
          </div>
          <div className="flex items-center gap-4">
            <LanguageSwitcher />
            <button
              onClick={handleAddNew}
              className="inline-flex items-center gap-2 px-4 py-2 text-sm font-medium text-white bg-primary rounded-md hover:bg-primary-hover shadow-sm"
            >
              <Plus className="w-4 h-4" /> Ново събитие
            </button>
          </div>
        </div>

        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {Array.from({ length: 3 }).map((_, i) => (
              <div
                key={i}
                className="bg-white rounded-xl border border-gray-200 h-72 animate-pulse"
              />
            ))}
          </div>
        ) : events.length === 0 ? (
          <div className="bg-white rounded-xl border border-gray-200 px-6 py-16 text-center text-gray-500">
            Все още няма събития. Натиснете &quot;Ново събитие&quot; за да създадете.
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
                        {event.category[lang]}
                      </span>
                    </div>
                    <div className="absolute top-3 right-3 flex gap-1.5">
                      {event.isHighlighted && (
                        <span className="bg-amber-500 text-white p-1 rounded-md shadow-md">
                          <Star className="w-3 h-3 fill-white" />
                        </span>
                      )}
                      <span className="bg-primary text-white px-2.5 py-1 rounded-md text-xs font-bold shadow-md flex items-center gap-1.5">
                        {!isPast && (
                          <span className="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse" />
                        )}
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

// ---------- Sub-components ----------

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
  onUpdateLang: (
    index: number,
    field: "text" | "caption",
    lang: Lang,
    value: string
  ) => void;
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
          placeholder="Постави URL или качи..."
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
        onChange={(e) =>
          onUpdateLang(index, "caption", editLang, e.target.value)
        }
        placeholder="Описание — по избор"
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
  onUpdateLang: (
    index: number,
    field: "text" | "caption",
    lang: Lang,
    value: string
  ) => void;
  onUpload: (e: React.ChangeEvent<HTMLInputElement>, index: number) => void;
  onRemoveImage: (blockIndex: number, imageIndex: number) => void;
  onMoveImage: (
    blockIndex: number,
    imageIndex: number,
    direction: -1 | 1
  ) => void;
}) {
  const fileRef = useRef<HTMLInputElement>(null);
  const images = block.images || [];

  return (
    <div className="space-y-3">
      <input
        type="text"
        className="w-full rounded-md border border-gray-300 p-2 text-sm focus:border-red-500 focus:ring-1 focus:ring-red-500 outline-none"
        value={block.caption[editLang]}
        onChange={(e) =>
          onUpdateLang(index, "caption", editLang, e.target.value)
        }
        placeholder="Описание на галерията — по избор"
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
        <Upload className="w-4 h-4" /> Качи снимки
        {images.length > 0 && (
          <span className="text-gray-400 ml-1">({images.length} добавени)</span>
        )}
      </button>
    </div>
  );
}
