import React, { useState, useMemo } from 'react';
import { Search, GraduationCap } from 'lucide-react';
import { educationEmojis, type EmojiItem } from './data/educationEmojis';

function App() {
  const [searchTerm, setSearchTerm] = useState('');
  const [copiedEmoji, setCopiedEmoji] = useState<string | null>(null);

  const filteredEmojis = useMemo(() => {
    const lowercaseSearch = searchTerm.toLowerCase();
    return educationEmojis.filter(
      (emoji) =>
        emoji.name.toLowerCase().includes(lowercaseSearch) ||
        emoji.keywords.some((keyword) => keyword.toLowerCase().includes(lowercaseSearch))
    );
  }, [searchTerm]);

  const copyToClipboard = (emoji: string) => {
    navigator.clipboard.writeText(emoji);
    setCopiedEmoji(emoji);
    setTimeout(() => setCopiedEmoji(null), 1500);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="flex items-center justify-center gap-3 mb-4">
            <GraduationCap className="w-12 h-12 text-indigo-600" />
            <h1 className="text-4xl font-bold text-gray-800">EduMoji Generator</h1>
          </div>
          <p className="text-gray-600 text-lg">Find the perfect education-related emoji for your content</p>
        </div>

        {/* Search Bar */}
        <div className="max-w-xl mx-auto mb-12 relative">
          <div className="relative">
            <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <input
              type="text"
              placeholder="Search emojis by name or keyword..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-12 pr-4 py-3 rounded-lg border border-gray-200 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 outline-none transition-all"
            />
          </div>
        </div>

        {/* Emoji Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {filteredEmojis.map((emojiItem: EmojiItem, index: number) => (
            <div
              key={`${emojiItem.name}-${index}`}
              onClick={() => copyToClipboard(emojiItem.emoji)}
              className="bg-white rounded-lg p-4 shadow-sm hover:shadow-md transition-shadow cursor-pointer border border-gray-100 group"
            >
              <div className="text-center">
                <span className="text-4xl mb-2 block transition-transform group-hover:scale-110">
                  {emojiItem.emoji}
                </span>
                <h3 className="text-gray-800 font-medium">{emojiItem.name}</h3>
                <div className="mt-2 flex flex-wrap gap-1 justify-center">
                  {emojiItem.keywords.slice(0, 3).map((keyword, kidx) => (
                    <span
                      key={`${keyword}-${kidx}`}
                      className="text-xs bg-gray-100 text-gray-600 px-2 py-1 rounded-full"
                    >
                      {keyword}
                    </span>
                  ))}
                </div>
                {copiedEmoji === emojiItem.emoji && (
                  <div className="mt-2 text-sm text-green-600">Copied!</div>
                )}
              </div>
            </div>
          ))}
        </div>

        {filteredEmojis.length === 0 && (
          <div className="text-center text-gray-500 mt-8">
            No emojis found for "{searchTerm}"
          </div>
        )}
      </div>
    </div>
  );
}

export default App;