import React from 'react';
import { Check } from 'lucide-react';

export const WALLPAPERS = [
    {
        id: 'default',
        name: 'Windows 7 Default',
        style: {
            background: 'linear-gradient(135deg, #4a90d9 0%, #2b6eb5 50%, #1e5799 100%)'
        }
    },
    {
        id: 'nature',
        name: 'Nature Green',
        style: {
            backgroundImage: 'url("https://images.unsplash.com/photo-1472214103451-9374bd1c798e?ixlib=rb-4.0.3&auto=format&fit=crop&w=2000&q=80")',
            backgroundSize: 'cover',
            backgroundPosition: 'center'
        }
    },
    {
        id: 'night',
        name: 'Night City',
        style: {
            backgroundImage: 'url("https://images.unsplash.com/photo-1477959858617-67f85cf4f1df?ixlib=rb-4.0.3&auto=format&fit=crop&w=2000&q=80")',
            backgroundSize: 'cover',
            backgroundPosition: 'center'
        }
    },
    {
        id: 'dark',
        name: 'Dark Minimal',
        style: {
            background: 'linear-gradient(to bottom right, #1a1a1a, #2d2d2d)'
        }
    },
    {
        id: 'abstract',
        name: 'Purple Abstract',
        style: {
            background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)'
        }
    }
];

interface SettingsEditorProps {
    currentWallpaper: string;
    onWallpaperChange: (id: string) => void;
}

export function SettingsEditor({ currentWallpaper, onWallpaperChange }: SettingsEditorProps) {
    return (
        <div className="p-6 space-y-6 text-white h-full overflow-y-auto">
            <div>
                <h2 className="text-2xl font-bold mb-2">Personalization</h2>
                <p className="text-gray-400">Choose your desktop background</p>
            </div>

            <div className="grid grid-cols-2 lg:grid-cols-3 gap-4">
                {WALLPAPERS.map((wallpaper) => (
                    <button
                        key={wallpaper.id}
                        onClick={() => onWallpaperChange(wallpaper.id)}
                        className={`group relative aspect-video rounded-lg overflow-hidden border-2 transition-all ${currentWallpaper === wallpaper.id
                            ? 'border-cyan-500 shadow-[0_0_15px_rgba(6,182,212,0.5)]'
                            : 'border-transparent hover:border-white/20'
                            }`}
                    >
                        <div className="absolute inset-0" style={wallpaper.style} />

                        <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                            <span className="font-semibold">{wallpaper.name}</span>
                        </div>

                        {currentWallpaper === wallpaper.id && (
                            <div className="absolute top-2 right-2 bg-cyan-500 rounded-full p-1">
                                <Check size={12} className="text-white" />
                            </div>
                        )}

                        <div className="absolute bottom-0 left-0 right-0 bg-black/60 p-2 transform translate-y-full group-hover:translate-y-0 transition-transform">
                            <span className="text-xs">{wallpaper.name}</span>
                        </div>
                    </button>
                ))}
            </div>


            {/* Custom Wallpaper Section */}
            <div className="bg-white/10 p-4 rounded-lg space-y-3">
                <h3 className="font-semibold text-lg">Custom Wallpaper</h3>
                <div className="flex gap-2">
                    <input
                        type="text"
                        placeholder="Enter image URL..."
                        className="flex-1 bg-black/40 border border-white/20 rounded px-3 py-2 text-sm focus:border-cyan-500 outline-none"
                        onKeyDown={(e) => {
                            if (e.key === 'Enter') {
                                const target = e.target as HTMLInputElement;
                                if (target.value) onWallpaperChange(`custom:${target.value}`);
                            }
                        }}
                    />
                    <button
                        className="bg-cyan-600 hover:bg-cyan-500 text-white px-4 py-2 rounded text-sm font-medium transition-colors"
                        onClick={(e) => {
                            const input = e.currentTarget.previousElementSibling as HTMLInputElement;
                            if (input.value) onWallpaperChange(`custom:${input.value}`);
                        }}
                    >
                        Apply
                    </button>
                </div>
                <p className="text-xs text-gray-400">Paste an image link from the web to use it as your background.</p>
            </div>
        </div >
    );
}
