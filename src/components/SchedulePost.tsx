import React, { useState } from 'react';
import DatePicker from 'react-datepicker';
import { Calendar, Send } from 'lucide-react';
import type { SocialMediaConfig, MediaFile } from '../types';
import MediaUpload from './MediaUpload';
import "react-datepicker/dist/react-datepicker.css";

interface Props {
  platforms: SocialMediaConfig[];
  onSchedule: (data: {
    prompt: string;
    scheduledDate: Date;
    selectedPlatforms: string[];
    media: MediaFile[];
  }) => void;
}

export default function SchedulePost({ platforms, onSchedule }: Props) {
  const [prompt, setPrompt] = useState('');
  const [scheduledDate, setScheduledDate] = useState(new Date());
  const [selectedPlatforms, setSelectedPlatforms] = useState<string[]>([]);
  const [media, setMedia] = useState<MediaFile[]>([]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSchedule({
      prompt,
      scheduledDate,
      selectedPlatforms,
      media,
    });
    setPrompt('');
    setMedia([]);
  };

  return (
    <div className="bg-white rounded-lg shadow-lg p-6 mb-8">
      <h2 className="text-2xl font-bold text-gray-800 mb-6">Yeni Gönderi Planla</h2>
      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            İçerik Promptu
          </label>
          <textarea
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500 h-32"
            placeholder="ChatGPT için içerik promptunu girin..."
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Medya Ekle
          </label>
          <MediaUpload media={media} onChange={setMedia} />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Paylaşım Tarihi & Saati
          </label>
          <div className="relative">
            <DatePicker
              selected={scheduledDate}
              onChange={(date: Date) => setScheduledDate(date)}
              showTimeSelect
              dateFormat="MMMM d, yyyy h:mm aa"
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
            />
            <Calendar className="absolute right-3 top-2.5 h-5 w-5 text-gray-400" />
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Platformları Seç
          </label>
          <div className="space-y-2">
            {platforms.map((platform) => (
              <label key={platform.platform} className="flex items-center">
                <input
                  type="checkbox"
                  checked={selectedPlatforms.includes(platform.platform)}
                  onChange={(e) => {
                    if (e.target.checked) {
                      setSelectedPlatforms([...selectedPlatforms, platform.platform]);
                    } else {
                      setSelectedPlatforms(selectedPlatforms.filter(p => p !== platform.platform));
                    }
                  }}
                  disabled={!platform.enabled}
                  className="rounded border-gray-300 text-blue-600 focus:ring-blue-500 h-4 w-4"
                />
                <span className="ml-2 text-sm text-gray-700 capitalize">
                  {platform.platform}
                  {!platform.enabled && " (Önce API yapılandırması gerekli)"}
                </span>
              </label>
            ))}
          </div>
        </div>

        <div className="flex justify-end">
          <button
            type="submit"
            disabled={selectedPlatforms.length === 0}
            className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors disabled:bg-gray-400"
          >
            <Send className="w-4 h-4" />
            Gönderiyi Planla
          </button>
        </div>
      </form>
    </div>
  );
}