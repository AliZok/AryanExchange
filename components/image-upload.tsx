'use client';

import { useState } from 'react';
import { supabase } from '../supabase';

interface ImageUploadProps {
  currentImage?: string;
  onImageUploaded: (url: string) => void;
  className?: string;
}

export default function ImageUpload({ currentImage, onImageUploaded, className = '' }: ImageUploadProps) {
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleImageUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    // Validate file type - accept all files but check if they're actually images
    if (!file.type.startsWith('image/') && !file.name.match(/\.(jpg|jpeg|png|gif|bmp|webp|svg|ico|tiff|tif|raw|cr2|nef|orf|sr2|dng|heic|heif|avif|jxl|psd|ai|eps|pdf)$/i)) {
      setError('فقط فایل‌های تصویری مجاز هستند');
      return;
    }

    // Validate file size (5MB max)
    if (file.size > 5 * 1024 * 1024) {
      setError('حجم فایل نباید بیشتر از 5 مگابایت باشد');
      return;
    }

    setUploading(true);
    setError(null);

    try {
      // Upload to Supabase storage using original filename
      const { error: uploadError, data: uploadData } = await supabase.storage
        .from('aryan-exchange')
        .upload(file.name, file, {
          cacheControl: '3600',
          upsert: false
        });

      if (uploadError) {
        throw uploadError;
      }

      // Get public URL
      const { data: urlData } = supabase.storage
        .from('aryan-exchange')
        .getPublicUrl(file.name);

      onImageUploaded(urlData.publicUrl);
    } catch (error: any) {
      console.error('Error uploading image:', error);
      setError('خطا در آپلود تصویر: ' + error.message);
    } finally {
      setUploading(false);
    }
  };

  return (
    <div className={`space-y-2 ${className}`}>
      <label className="block text-sm font-semibold text-gray-700">تصویر ارز</label>
      
      {/* Current Image Preview */}
      {currentImage && (
        <div className="mb-4">
          <p className="text-xs text-gray-500 mb-2">تصویر فعلی:</p>
          <img 
            src={currentImage} 
            alt="Current currency image" 
            className="w-24 h-24 rounded-lg object-cover border border-gray-200"
            onError={(e) => {
              e.currentTarget.style.display = 'none';
            }}
          />
        </div>
      )}

      {/* Upload Button */}
      <div className="flex items-center space-x-2 space-x-reverse">
        <label className="cursor-pointer bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg text-sm font-medium transition-all shadow-sm hover:shadow-md">
          {uploading ? 'در حال آپلود...' : 'انتخاب تصویر'}
          <input
            type="file"
            accept="*"
            onChange={handleImageUpload}
            disabled={uploading}
            className="hidden"
          />
        </label>
        
        {uploading && (
          <div className="flex items-center">
            <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-blue-600"></div>
            <span className="mr-2 text-sm text-gray-600">در حال آپلود...</span>
          </div>
        )}
      </div>

      {/* Error Message */}
      {error && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-3 py-2 rounded text-sm">
          {error}
        </div>
      )}

      {/* Help Text */}
      <p className="text-xs text-gray-500">
        All image formats accepted (max 5MB)
      </p>
    </div>
  );
}
