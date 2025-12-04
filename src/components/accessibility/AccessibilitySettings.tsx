import { useState } from 'react';
import { Settings, Type, Eye, Zap, Volume2, Moon, Sun } from 'lucide-react';
import { Button } from '../ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../ui/card';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '../ui/dialog';
import { Switch } from '../ui/switch';
import { Label } from '../ui/label';
import { Slider } from '../ui/slider';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select';
import { toast } from 'sonner@2.0.3';

interface AccessibilitySettingsProps {
  onSettingsChange?: (settings: AccessibilityConfig) => void;
}

export interface AccessibilityConfig {
  fontSize: number;
  highContrast: boolean;
  reduceMotion: boolean;
  voiceGuidance: boolean;
  darkMode: boolean;
  colorBlindMode: 'none' | 'protanopia' | 'deuteranopia' | 'tritanopia';
}

export function AccessibilitySettings({ onSettingsChange }: AccessibilitySettingsProps) {
  const [settings, setSettings] = useState<AccessibilityConfig>({
    fontSize: 100,
    highContrast: false,
    reduceMotion: false,
    voiceGuidance: true,
    darkMode: false,
    colorBlindMode: 'none'
  });

  const updateSetting = <K extends keyof AccessibilityConfig>(
    key: K,
    value: AccessibilityConfig[K]
  ) => {
    const newSettings = { ...settings, [key]: value };
    setSettings(newSettings);
    onSettingsChange?.(newSettings);

    // Apply settings to document
    applySettings(key, value);
    
    toast.success(`${key.replace(/([A-Z])/g, ' $1').toLowerCase()} updated`);
  };

  const applySettings = (key: keyof AccessibilityConfig, value: any) => {
    const root = document.documentElement;

    switch (key) {
      case 'fontSize':
        root.style.fontSize = `${value}%`;
        break;
      case 'highContrast':
        if (value) {
          root.classList.add('high-contrast');
        } else {
          root.classList.remove('high-contrast');
        }
        break;
      case 'reduceMotion':
        if (value) {
          root.style.setProperty('--animation-duration', '0s');
        } else {
          root.style.removeProperty('--animation-duration');
        }
        break;
      case 'darkMode':
        if (value) {
          root.classList.add('dark');
        } else {
          root.classList.remove('dark');
        }
        break;
      case 'colorBlindMode':
        root.classList.remove('protanopia', 'deuteranopia', 'tritanopia');
        if (value !== 'none') {
          root.classList.add(value);
        }
        break;
    }
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline" size="sm">
          <Settings className="w-4 h-4 mr-2" />
          Accessibility
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Accessibility Settings</DialogTitle>
          <DialogDescription>
            Customize the app to match your accessibility needs
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-6 py-4">
          {/* Font Size */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-base">
                <Type className="w-5 h-5 text-[#5B7FDB]" />
                Text Size
              </CardTitle>
              <CardDescription>
                Adjust text size for better readability
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <div className="flex justify-between">
                  <Label>Size: {settings.fontSize}%</Label>
                </div>
                <Slider
                  value={[settings.fontSize]}
                  onValueChange={([value]) => updateSetting('fontSize', value)}
                  min={80}
                  max={150}
                  step={10}
                  className="w-full"
                />
                <div className="flex justify-between text-xs text-muted-foreground">
                  <span>Small</span>
                  <span>Normal</span>
                  <span>Large</span>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Visual Settings */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-base">
                <Eye className="w-5 h-5 text-[#FF69B4]" />
                Visual Settings
              </CardTitle>
              <CardDescription>
                Adjust visual appearance for comfort
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label>High Contrast Mode</Label>
                  <p className="text-sm text-muted-foreground">
                    Increase contrast for better visibility
                  </p>
                </div>
                <Switch
                  checked={settings.highContrast}
                  onCheckedChange={(checked) => updateSetting('highContrast', checked)}
                />
              </div>

              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label className="flex items-center gap-2">
                    <Sun className="w-4 h-4" />
                    <Moon className="w-4 h-4" />
                    Dark Mode
                  </Label>
                  <p className="text-sm text-muted-foreground">
                    Reduce eye strain in low light
                  </p>
                </div>
                <Switch
                  checked={settings.darkMode}
                  onCheckedChange={(checked) => updateSetting('darkMode', checked)}
                />
              </div>

              <div className="space-y-2">
                <Label>Color Blind Mode</Label>
                <Select
                  value={settings.colorBlindMode}
                  onValueChange={(value) => updateSetting('colorBlindMode', value as any)}
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="none">None</SelectItem>
                    <SelectItem value="protanopia">Protanopia (Red-Blind)</SelectItem>
                    <SelectItem value="deuteranopia">Deuteranopia (Green-Blind)</SelectItem>
                    <SelectItem value="tritanopia">Tritanopia (Blue-Blind)</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </CardContent>
          </Card>

          {/* Motion & Animation */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-base">
                <Zap className="w-5 h-5 text-[#5B7FDB]" />
                Motion Settings
              </CardTitle>
              <CardDescription>
                Control animations and transitions
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label>Reduce Motion</Label>
                  <p className="text-sm text-muted-foreground">
                    Minimize animations and transitions
                  </p>
                </div>
                <Switch
                  checked={settings.reduceMotion}
                  onCheckedChange={(checked) => updateSetting('reduceMotion', checked)}
                />
              </div>
            </CardContent>
          </Card>

          {/* Voice Settings */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-base">
                <Volume2 className="w-5 h-5 text-[#FF69B4]" />
                Voice Guidance
              </CardTitle>
              <CardDescription>
                Enable voice assistance and guidance
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label>Voice Guidance</Label>
                  <p className="text-sm text-muted-foreground">
                    Get spoken guidance through the app
                  </p>
                </div>
                <Switch
                  checked={settings.voiceGuidance}
                  onCheckedChange={(checked) => updateSetting('voiceGuidance', checked)}
                />
              </div>
            </CardContent>
          </Card>
        </div>
      </DialogContent>
    </Dialog>
  );
}
