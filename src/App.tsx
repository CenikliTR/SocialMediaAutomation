import React, { useState, useEffect } from 'react';
import { Toaster, toast } from 'react-hot-toast';
import ConfigurationPanel from './components/ConfigurationPanel';
import SchedulePost from './components/SchedulePost';
import ScheduledPosts from './components/ScheduledPosts';
import { Brain } from 'lucide-react';
import type { SocialMediaConfig, ScheduledPost, ApiKeys, MediaFile } from './types';

const INITIAL_CONFIG: SocialMediaConfig[] = [
  { platform: 'linkedin', apiKey: '', apiSecret: '', accessToken: '', enabled: false },
  { platform: 'instagram', apiKey: '', apiSecret: '', accessToken: '', enabled: false },
  { platform: 'facebook', apiKey: '', apiSecret: '', accessToken: '', enabled: false },
  { platform: 'twitter', apiKey: '', apiSecret: '', accessToken: '', enabled: false },
];

const INITIAL_API_KEYS: ApiKeys = {
  openaiKey: '',
};

function App() {
  const [config, setConfig] = useState<SocialMediaConfig[]>(INITIAL_CONFIG);
  const [apiKeys, setApiKeys] = useState<ApiKeys>(INITIAL_API_KEYS);
  const [posts, setPosts] = useState<ScheduledPost[]>([]);

  useEffect(() => {
    const savedConfig = localStorage.getItem('socialMediaConfig');
    const savedApiKeys = localStorage.getItem('apiKeys');
    const savedPosts = localStorage.getItem('scheduledPosts');

    if (savedConfig) setConfig(JSON.parse(savedConfig));
    if (savedApiKeys) setApiKeys(JSON.parse(savedApiKeys));
    if (savedPosts) setPosts(JSON.parse(savedPosts));
  }, []);

  const handleConfigSave = (newConfig: SocialMediaConfig[], newApiKeys: ApiKeys) => {
    setConfig(newConfig);
    setApiKeys(newApiKeys);
    localStorage.setItem('socialMediaConfig', JSON.stringify(newConfig));
    localStorage.setItem('apiKeys', JSON.stringify(newApiKeys));
    toast.success('Yapılandırma başarıyla kaydedildi');
  };

  const handleSchedulePost = async (data: {
    prompt: string;
    scheduledDate: Date;
    selectedPlatforms: string[];
    media: MediaFile[];
  }) => {
    const newPost: ScheduledPost = {
      id: Date.now().toString(),
      content: data.prompt,
      platforms: data.selectedPlatforms,
      scheduledDate: data.scheduledDate,
      status: 'pending',
      prompt: data.prompt,
      media: data.media,
    };

    setPosts([...posts, newPost]);
    localStorage.setItem('scheduledPosts', JSON.stringify([...posts, newPost]));
    toast.success('Gönderi başarıyla planlandı');
  };

  const handleDeletePost = (id: string) => {
    const newPosts = posts.filter(post => post.id !== id);
    setPosts(newPosts);
    localStorage.setItem('scheduledPosts', JSON.stringify(newPosts));
    toast.success('Gönderi başarıyla silindi');
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Toaster position="top-right" />
      
      <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center gap-2">
            <Brain className="w-8 h-8 text-blue-600" />
            <h1 className="text-2xl font-bold text-gray-900">
              Yapay Zeka Sosyal Medya Otomasyonu
            </h1>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div>
            <ConfigurationPanel
              config={config}
              apiKeys={apiKeys}
              onSave={handleConfigSave}
            />
            <SchedulePost
              platforms={config}
              onSchedule={handleSchedulePost}
            />
          </div>
          <div>
            <ScheduledPosts
              posts={posts}
              onDelete={handleDeletePost}
            />
          </div>
        </div>
      </main>
    </div>
  );
}

export default App;