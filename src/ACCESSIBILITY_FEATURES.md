# Gravida Accessibility Features Documentation

## Overview
Gravida now includes comprehensive accessibility features designed specifically for pregnant women, ensuring an inclusive and user-friendly experience for all users.

## Features Added

### 1. **Voice-Enabled Search (VoiceSearch Component)**
Location: `/components/accessibility/VoiceSearch.tsx`

**Features:**
- Voice input for all search bars throughout the application
- Speech recognition with real-time transcription
- Fallback to traditional text input
- Visual feedback when listening (microphone icon changes)
- Browser compatibility detection
- Toast notifications for voice input status

**Implementation:**
- Integrated into Community page (search posts, topics, members)
- Integrated into Diet Planner (search meals, nutrients, foods)
- Integrated into Patient List (doctor portal - search patients)
- Integrated into Medication Suggestion (doctor portal - patient name input)

**Usage:**
```tsx
<VoiceSearch
  placeholder="Search..."
  onSearch={(query) => handleSearch(query)}
/>
```

### 2. **AI Chatbot Assistant (ChatbotAssistant Component)**
Location: `/components/accessibility/ChatbotAssistant.tsx`

**Features:**
- Floating chat button with gradient design
- Voice-enabled messaging (speak to chatbot)
- Text-to-speech responses (chatbot reads messages aloud)
- Context-aware guidance for app navigation
- Pregnancy information assistance
- Customizable voice settings (enable/disable)
- Chat history with timestamps
- Smooth animations and transitions

**Chatbot Capabilities:**
- Navigate app features (Emotion Tracker, Health Tracker, Diet Planner, Community)
- Answer pregnancy-related questions
- Explain app functionality
- Provide feature-specific guidance
- Set reminders assistance
- Accessibility settings help

**Implementation:**
- Available on User Dashboard
- Available on Doctor Dashboard
- Persistent across all tabs
- Non-intrusive floating button

### 3. **Accessibility Settings (AccessibilitySettings Component)**
Location: `/components/accessibility/AccessibilitySettings.tsx`

**Features:**
- **Text Size Adjustment:** 80% - 150% (increments of 10%)
- **High Contrast Mode:** Enhanced visibility for visual impairments
- **Dark Mode:** Reduce eye strain in low light conditions
- **Color Blind Modes:**
  - Protanopia (Red-Blind)
  - Deuteranopia (Green-Blind)
  - Tritanopia (Blue-Blind)
- **Reduce Motion:** Minimize animations for users sensitive to motion
- **Voice Guidance:** Toggle voice assistance throughout the app

**Implementation:**
- Accessible from header in User Dashboard
- Accessible from header in Doctor Dashboard
- Settings persist across sessions (applied to document root)
- Real-time preview of changes
- Toast notifications for setting changes

**Usage:**
```tsx
<AccessibilitySettings
  onSettingsChange={(settings) => handleSettingsUpdate(settings)}
/>
```

### 4. **Reminders System (Reminders Component)**
Location: `/components/accessibility/Reminders.tsx`

**Features:**
- **Three Reminder Types:**
  - 🩺 Checkups (prenatal appointments)
  - 💊 Medications (vitamins, prescriptions)
  - 📅 Appointments (ultrasounds, consultations)

- **Reminder Options:**
  - Custom title and description
  - Date and time selection
  - Frequency settings (Once, Daily, Weekly, Monthly)
  - Active/inactive toggle
  - Edit and delete functionality

- **Visual Design:**
  - Color-coded by type
  - Icon-based identification
  - Upcoming reminders preview (next 3)
  - Badge indicators for frequency
  - Responsive card layout

**Implementation:**
- Integrated into User Dashboard home tab
- Pre-populated with example reminders
- Dialog-based creation/editing
- Toast notifications for actions

**Default Reminders:**
1. Monthly Checkup (prenatal checkup)
2. Prenatal Vitamins (daily medication)
3. Ultrasound Appointment (20-week scan)

## Technical Implementation

### Browser Compatibility
- **Speech Recognition:** Chrome, Edge, Safari (with webkit prefix)
- **Speech Synthesis:** All modern browsers
- **Fallback Support:** Traditional text input when voice features unavailable

### Accessibility Standards
- WCAG 2.1 AA compliant
- Keyboard navigation support
- Screen reader compatible
- ARIA labels and roles
- Focus management
- High contrast support

### Performance
- Lazy loading of speech recognition
- Optimized re-renders
- Event cleanup on unmount
- Efficient state management

## User Benefits

### For Pregnant Women:
- **Hands-Free Operation:** Voice search when hands are occupied
- **Reduced Screen Time:** Voice guidance reduces need to read
- **Comfort:** Adjustable text size and contrast for comfort during pregnancy
- **Organization:** Reminders for critical health appointments
- **Support:** 24/7 chatbot assistance for questions

### For Doctors:
- **Efficiency:** Voice input for faster patient searches
- **Accessibility:** Same features available in doctor portal
- **Patient Care:** Better tracking through reminder systems

## Integration Points

### User Dashboard (`/components/user/UserDashboard.tsx`)
```tsx
import { AccessibilitySettings } from '../accessibility/AccessibilitySettings';
import { ChatbotAssistant } from '../accessibility/ChatbotAssistant';
import { Reminders } from '../accessibility/Reminders';

// In header
<AccessibilitySettings />

// In home tab
<Reminders />

// At bottom of component
<ChatbotAssistant />
```

### Doctor Dashboard (`/components/doctor/DoctorDashboard.tsx`)
```tsx
import { AccessibilitySettings } from '../accessibility/AccessibilitySettings';
import { ChatbotAssistant } from '../accessibility/ChatbotAssistant';

// In header
<AccessibilitySettings />

// At bottom of component
<ChatbotAssistant />
```

### Search Components
- Community: Voice search for posts
- Diet Planner: Voice search for foods
- Patient List: Voice search for patients
- Medication Suggestion: Voice input for patient names

## Future Enhancements

### Potential Additions:
1. **Multi-language Support:** Voice and text in multiple languages
2. **Advanced Reminders:** SMS/Email integration
3. **Smart Notifications:** Push notifications for reminders
4. **Voice Commands:** Global voice commands for navigation
5. **Reading Mode:** Full-page text-to-speech
6. **Gesture Controls:** Touch gestures for accessibility
7. **Emergency Alerts:** Quick access to emergency contacts

## Testing Recommendations

### Voice Features:
1. Test with microphone permissions allowed/denied
2. Test in different browsers (Chrome, Safari, Edge)
3. Test with background noise
4. Test voice commands in quiet environment

### Visual Features:
1. Test all color blind modes
2. Test with screen readers
3. Test keyboard-only navigation
4. Test high contrast mode
5. Test different text sizes

### Reminders:
1. Test creating all reminder types
2. Test editing existing reminders
3. Test deleting reminders
4. Test frequency options
5. Test past/future date handling

## Support Information

For issues or questions about accessibility features:
- Chatbot provides real-time assistance
- All features have toast notifications for feedback
- Error handling with user-friendly messages
- Graceful degradation when features unavailable

## Compliance

This implementation supports:
- Americans with Disabilities Act (ADA)
- Section 508 Standards
- WCAG 2.1 Level AA
- Pregnancy-specific accessibility considerations

---

**Last Updated:** November 9, 2025  
**Version:** 1.0.0  
**Maintained by:** Gravida Development Team
