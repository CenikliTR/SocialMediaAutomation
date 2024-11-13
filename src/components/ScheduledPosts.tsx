import React from 'react';
import { format } from 'date-fns';
import { Clock, Check, X, Image, Video } from 'lucide-react';
import type { ScheduledPost } from '../types';

interface Props {
  posts: ScheduledPost[];
  onDelete: (id: string) => void;
}

export default function ScheduledPosts({ posts, onDelete }: Props) {
  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'published':
        return <Check className="w-5 h-5 text-green-500" />;
      case 'failed':
        return <X className="w-5 h-5 text-red-500" />;
      default:
        return <Clock className="w-5 h-5 text-yellow-500" />;
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-lg p-6">
      <h2 className="text-2xl font-bold text-gray-800 mb-6">Planlanmış Gönderiler</h2>
      
      {posts.length === 0 ? (
        <p className="text-gray-500 text-center py-8">Henüz planlanmış gönderi yok</p>
      ) : (
        <div className="space-y-4">
          {posts.map((post) => (
            <div
              key={post.id}
              className="border rounded-lg p-4 hover:shadow-md transition-shadow"
            >
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-2">
                    {getStatusIcon(post.status)}
                    <span className="text-sm font-medium capitalize text-gray-600">
                      {post.status}
                    </span>
                  </div>
                  <p className="text-gray-800 mb-2">{post.content}</p>
                  
                  {post.media && post.media.length > 0 && (
                    <div className="flex gap-2 mb-2">
                      {post.media.map((file, index) => (
                        <div key={index} className="flex items-center gap-1 text-sm text-gray-600">
                          {file.type === 'image' ? (
                            <Image className="w-4 h-4" />
                          ) : (
                            <Video className="w-4 h-4" />
                          )}
                          <span>{file.file.name}</span>
                        </div>
                      ))}
                    </div>
                  )}

                  <div className="flex flex-wrap gap-2 mb-2">
                    {post.platforms.map((platform) => (
                      <span
                        key={platform}
                        className="px-2 py-1 bg-blue-100 text-blue-800 rounded-full text-sm capitalize"
                      >
                        {platform}
                      </span>
                    ))}
                  </div>
                  <p className="text-sm text-gray-500">
                    Planlanan: {format(new Date(post.scheduledDate), 'PPpp')}
                  </p>
                </div>
                
                {post.status === 'pending' && (
                  <button
                    onClick={() => onDelete(post.id)}
                    className="text-red-600 hover:text-red-800 transition-colors"
                  >
                    <X className="w-5 h-5" />
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}