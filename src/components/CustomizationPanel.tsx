'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { useCustomization } from '@/context/CustomizationContext';
import { HexColorPicker } from 'react-colorful';
import { useState } from 'react';
import { templatePresets } from '@/lib/templateCustomizations';
import { presetAnimations } from '@/lib/animations';

export default function CustomizationPanel() {
  const { state, updateCustomization, applyPreset, setTemplateSpecific } = useCustomization();
  const [activeColorPicker, setActiveColorPicker] = useState<'primary' | 'secondary' | 'accent' | null>(null);
  const [activeTab, setActiveTab] = useState<'style' | 'animation' | 'layout' | 'advanced'>('style');

  const tabs = [
    { id: 'style', label: 'Style', icon: '🎨' },
    { id: 'animation', label: 'Animation', icon: '✨' },
    { id: 'layout', label: 'Layout', icon: '📐' },
    { id: 'advanced', label: 'Advanced', icon: '⚙️' },
  ];

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 20 }}
      className="bg-white dark:bg-gray-800 rounded-lg shadow-xl overflow-hidden"
    >
      {/* Tabs */}
      <div className="border-b border-gray-200 dark:border-gray-700">
        <div className="flex p-2 gap-2">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              className={`flex-1 flex items-center justify-center gap-2 p-2 rounded-lg transition-colors ${
                activeTab === tab.id
                  ? 'bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400'
                  : 'text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700/50'
              }`}
            >
              <span>{tab.icon}</span>
              <span>{tab.label}</span>
            </button>
          ))}
        </div>
      </div>

      <div className="p-6 space-y-8">
        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 20 }}
            className="space-y-8"
          >
            {activeTab === 'style' && (
              <>
                {/* Template Presets */}
                <div>
                  <h3 className="text-sm font-medium text-gray-900 dark:text-white mb-4">
                    Template Presets
                  </h3>
                  <div className="grid grid-cols-2 gap-4">
                    {Object.entries(templatePresets).map(([template, presets]) =>
                      presets.map((preset) => (
                        <button
                          key={preset.name}
                          onClick={() => applyPreset(preset.name)}
                          className="p-4 rounded-lg border-2 border-gray-200 dark:border-gray-700 hover:border-blue-500 dark:hover:border-blue-500 transition-all space-y-2"
                        >
                          <div className="font-medium">{preset.name}</div>
                          <div className="text-sm text-gray-500 dark:text-gray-400">
                            {preset.description}
                          </div>
                        </button>
                      ))
                    )}
                  </div>
                </div>

                {/* Color Scheme */}
                <div>
                  <h3 className="text-sm font-medium text-gray-900 dark:text-white mb-4">
                    Color Scheme
                  </h3>
                  <div className="grid grid-cols-4 gap-2">
                    {['blue', 'purple', 'green', 'orange', 'pink', 'gradient', 'custom', 'minimal'].map(
                      (scheme) => (
                        <button
                          key={scheme}
                          onClick={() => updateCustomization('colorScheme', scheme)}
                          className={`w-full aspect-square rounded-lg ${
                            scheme === 'gradient'
                              ? 'bg-gradient-to-r from-blue-500 to-purple-500'
                              : scheme === 'minimal'
                              ? 'bg-gray-100 dark:bg-gray-700'
                              : `bg-${scheme}-500`
                          } ${
                            state.colorScheme === scheme
                              ? 'ring-2 ring-offset-2 ring-blue-500'
                              : ''
                          }`}
                        />
                      )
                    )}
                  </div>
                </div>
              </>
            )}

            {activeTab === 'animation' && (
              <>
                {/* Animation Style */}
                <div>
                  <h3 className="text-sm font-medium text-gray-900 dark:text-white mb-4">
                    Animation Style
                  </h3>
                  <div className="space-y-2">
                    {Object.keys(presetAnimations).map((style) => (
                      <button
                        key={style}
                        onClick={() => updateCustomization('animation', style)}
                        className={`block w-full text-left px-4 py-3 rounded-lg transition-colors ${
                          state.animation === style
                            ? 'bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400'
                            : 'text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700/50'
                        }`}
                      >
                        <span className="capitalize">{style}</span>
                      </button>
                    ))}
                  </div>
                </div>

                {/* Animation Speed */}
                <div>
                  <h3 className="text-sm font-medium text-gray-900 dark:text-white mb-4">
                    Animation Speed
                  </h3>
                  <input
                    type="range"
                    min="0.5"
                    max="2"
                    step="0.1"
                    value={state.templateSpecific?.animationSpeed ?? 1}
                    onChange={(e) =>
                      setTemplateSpecific('animationSpeed', parseFloat(e.target.value))
                    }
                    className="w-full"
                  />
                </div>
              </>
            )}

            {activeTab === 'layout' && (
              <>
                {/* Layout Style */}
                <div>
                  <h3 className="text-sm font-medium text-gray-900 dark:text-white mb-4">
                    Layout Style
                  </h3>
                  <div className="grid grid-cols-2 gap-4">
                    {['centered', 'wide', 'compact', 'asymmetric', 'grid'].map((layout) => (
                      <button
                        key={layout}
                        onClick={() => updateCustomization('layout', layout)}
                        className={`p-4 rounded-lg border-2 transition-all ${
                          state.layout === layout
                            ? 'border-blue-500 bg-blue-50 dark:bg-blue-900/20'
                            : 'border-gray-200 dark:border-gray-700 hover:border-blue-500 dark:hover:border-blue-500'
                        }`}
                      >
                        <span className="capitalize">{layout}</span>
                      </button>
                    ))}
                  </div>
                </div>

                {/* Content Density */}
                <div>
                  <h3 className="text-sm font-medium text-gray-900 dark:text-white mb-4">
                    Content Density
                  </h3>
                  <div className="space-y-2">
                    {['comfortable', 'compact', 'spacious'].map((density) => (
                      <button
                        key={density}
                        onClick={() => updateCustomization('contentDensity', density)}
                        className={`block w-full text-left px-4 py-3 rounded-lg transition-colors ${
                          state.contentDensity === density
                            ? 'bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400'
                            : 'text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700/50'
                        }`}
                      >
                        <span className="capitalize">{density}</span>
                      </button>
                    ))}
                  </div>
                </div>
              </>
            )}

            {activeTab === 'advanced' && (
              <>
                {/* Fine-tuning Controls */}
                <div>
                  <h3 className="text-sm font-medium text-gray-900 dark:text-white mb-4">
                    Fine-tuning
                  </h3>
                  <div className="space-y-6">
                    {/* Spacing */}
                    <div>
                      <label className="text-sm text-gray-700 dark:text-gray-300">
                        Section Spacing
                      </label>
                      <input
                        type="range"
                        min="0.5"
                        max="2"
                        step="0.1"
                        value={state.spacing.sections}
                        onChange={(e) =>
                          updateCustomization('spacing', {
                            ...state.spacing,
                            sections: parseFloat(e.target.value),
                          })
                        }
                        className="w-full"
                      />
                    </div>

                    {/* Border Radius */}
                    <div>
                      <label className="text-sm text-gray-700 dark:text-gray-300">
                        Border Radius
                      </label>
                      <input
                        type="range"
                        min="0"
                        max="2"
                        step="0.125"
                        value={state.borderRadius}
                        onChange={(e) =>
                          updateCustomization('borderRadius', parseFloat(e.target.value))
                        }
                        className="w-full"
                      />
                    </div>

                    {/* Shadow Intensity */}
                    <div>
                      <label className="text-sm text-gray-700 dark:text-gray-300">
                        Shadow Intensity
                      </label>
                      <input
                        type="range"
                        min="0"
                        max="3"
                        step="0.25"
                        value={state.shadowIntensity}
                        onChange={(e) =>
                          updateCustomization('shadowIntensity', parseFloat(e.target.value))
                        }
                        className="w-full"
                      />
                    </div>

                    {/* Template-specific Options */}
                    <div>
                      <label className="text-sm text-gray-700 dark:text-gray-300">
                        Custom Options
                      </label>
                      <div className="mt-2 space-y-2">
                        <div>
                          <label className="text-xs text-gray-500 dark:text-gray-400">
                            Hover Effect Intensity
                          </label>
                          <input
                            type="range"
                            min="0"
                            max="2"
                            step="0.1"
                            value={state.templateSpecific?.hoverIntensity ?? 1}
                            onChange={(e) =>
                              setTemplateSpecific('hoverIntensity', parseFloat(e.target.value))
                            }
                            className="w-full"
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </>
            )}
          </motion.div>
        </AnimatePresence>
      </div>
    </motion.div>
  );
}
