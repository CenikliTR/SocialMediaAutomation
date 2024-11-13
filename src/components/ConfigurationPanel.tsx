import React, { useState } from 'react';
import { Settings, Save } from 'lucide-react';
import type { SocialMediaConfig, ApiKeys } from '../types';

interface Props {
  config: SocialMediaConfig[];
  apiKeys: ApiKeys;
  onSave: (config: SocialMediaConfig[], apiKeys: ApiKeys) => void;
}

export default function ConfigurationPanel({ config, apiKeys, onSave }: Props) {
  const [configs, setConfigs] = useState<SocialMediaConfig[]>(config);
  const [keys, setKeys] = useState<ApiKeys>(apiKeys);

  const handleSave = () => {
    onSave(configs, keys);
  };

  const updateConfig = (index: number, updates: Partial<SocialMediaConfig>) => {
    const newConfigs = [...configs];
    newConfigs[index] = { ...newConfigs[index], ...updates };
    setConfigs(newConfigs);
  };

  return (
    <div className="bg-white rounded-lg shadow-lg p-6 mb-8">
      <div className="flex items-center gap-2 mb-6">
        <Settings className="w-6 h-6 text-blue-600" />
        <h2 className="text-2xl font-bold text-gray-800">API Yapılandırması</h2>
      </div>

      <div className="mb-6">
        <h3 className="text-lg font-semibold text-gray-700 mb-4">OpenAI Yapılandırması</h3>
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              API Anahtarı
            </label>
            <input
              type="password"
              value={keys.openaiKey}
              onChange={(e) => setKeys({ ...keys, openaiKey: e.target.value })}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
            />
          </div>
        </div>
      </div>

      <div className="space-y-8">
        {configs.map((platform, index) => (
          <div key={platform.platform} className="border-t pt-6">
            <h3 className="text-lg font-semibold text-gray-700 mb-4 capitalize">
              {platform.platform} Yapılandırması
            </h3>
            <div className="grid grid-cols-1 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  API Anahtarı
                </label>
                <input
                  type="password"
                  value={platform.apiKey}
                  onChange={(e) => updateConfig(index, { apiKey: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  API Gizli Anahtarı
                </label>
                <input
                  type="password"
                  value={platform.apiSecret}
                  onChange={(e) => updateConfig(index, { apiSecret: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Erişim Anahtarı
                </label>
                <input
                  type="password"
                  value={platform.accessToken}
                  onChange={(e) => updateConfig(index, { accessToken: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                />
              </div>
              <div className="flex items-center">
                <label className="flex items-center">
                  <input
                    type="checkbox"
                    checked={platform.enabled}
                    onChange={(e) => updateConfig(index, { enabled: e.target.checked })}
                    className="rounded border-gray-300 text-blue-600 focus:ring-blue-500 h-4 w-4"
                  />
                  <span className="ml-2 text-sm text-gray-700">{platform.platform} Etkinleştir</span>
                </label>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-8 flex justify-end">
        <button
          onClick={handleSave}
          className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
        >
          <Save className="w-4 h-4" />
          Yapılandırmayı Kaydet
        </button>
      </div>
    </div>
  );
}