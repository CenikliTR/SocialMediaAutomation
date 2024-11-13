import React, { useCallback } from 'react';
import { Upload, X } from 'lucide-react';
import type { MediaFile } from '../types';

interface Props {
  media: MediaFile[];
  onChange: (media: MediaFile[]) => void;
}

export default function MediaUpload({ media, onChange }: Props) {
  const handleDrop = useCallback((e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    const files = Array.from(e.dataTransfer.files);
    handleFiles(files);
  }, []);

  const handleFileInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    handleFiles(files);
  };

  const handleFiles = (files: File[]) => {
    const newMedia = files.map(file => {
      const isVideo = file.type.startsWith('video/');
      return {
        file,
        preview: URL.createObjectURL(file),
        type: isVideo ? 'video' : 'image' as const
      };
    });
    onChange([...media, ...newMedia]);
  };

  const removeMedia = (index: number) => {
    const newMedia = [...media];
    URL.revokeObjectURL(newMedia[index].preview);
    newMedia.splice(index, 1);
    onChange(newMedia);
  };

  return (
    <div className="space-y-4">
      <div
        onDrop={handleDrop}
        onDragOver={(e) => e.preventDefault()}
        className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center hover:border-blue-500 transition-colors"
      >
        <input
          type="file"
          multiple
          accept="image/*,video/*"
          onChange={handleFileInput}
          className="hidden"
          id="media-upload"
        />
        <label
          htmlFor="media-upload"
          className="cursor-pointer flex flex-col items-center"
        >
          <Upload className="w-8 h-8 text-gray-400 mb-2" />
          <span className="text-sm text-gray-600">
            Sürükle & Bırak veya Tıkla
          </span>
          <span className="text-xs text-gray-500">
            Resim ve Video dosyaları
          </span>
        </label>
      </div>

      {media.length > 0 && (
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
          {media.map((file, index) => (
            <div key={index} className="relative group">
              {file.type === 'image' ? (
                <img
                  src={file.preview}
                  alt="Preview"
                  className="w-full h-32 object-cover rounded-lg"
                />
              ) : (
                <video
                  src={file.preview}
                  className="w-full h-32 object-cover rounded-lg"
                  controls
                />
              )}
              <button
                onClick={() => removeMedia(index)}
                className="absolute top-2 right-2 p-1 bg-red-500 text-white rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}