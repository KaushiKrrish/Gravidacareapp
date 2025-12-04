import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../ui/card';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Label } from '../ui/label';
import { Textarea } from '../ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select';
import { Badge } from '../ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../ui/tabs';
import { Sparkles, Copy, Download, Send, CheckCircle, AlertTriangle } from 'lucide-react';
import { toast } from 'sonner';
import { VoiceSearch } from '../accessibility/VoiceSearch';

interface Medication {
  name: string;
  dosage: string;
  frequency: string;
  duration: string;
  precautions: string;
}

interface AIScript {
  medications: Medication[];
  additionalNotes: string;
  warnings: string[];
}

export function MedicationSuggestion() {
  const [patientName, setPatientName] = useState('');
  const [trimester, setTrimester] = useState('');
  const [symptoms, setSymptoms] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);
  const [generatedScript, setGeneratedScript] = useState<AIScript | null>(null);

  const commonConditions = [
    { name: 'Morning Sickness', keywords: 'nausea, vomiting' },
    { name: 'Iron Deficiency', keywords: 'anemia, fatigue' },
    { name: 'Gestational Diabetes', keywords: 'high blood sugar' },
    { name: 'Hypertension', keywords: 'high blood pressure' },
    { name: 'Back Pain', keywords: 'lower back pain' },
    { name: 'Heartburn', keywords: 'acid reflux, indigestion' }
  ];

  const generateScript = () => {
    // Defensive check (shouldn't be called if button disabled, but double-check)
    if (!patientName.trim() || !trimester || !symptoms.trim()) {
      toast.error('Please fill patient name, trimester and symptoms before generating.');
      return;
    }

    setIsGenerating(true);

    // Simulate AI processing (replace with real API call)
    setTimeout(() => {
      const mockScript: AIScript = {
        medications: [
          {
            name: 'Prenatal Multivitamin',
            dosage: '1 tablet',
            frequency: 'Once daily',
            duration: 'Throughout pregnancy',
            precautions: 'Take with food to avoid nausea. Contains folic acid (400mcg), iron (27mg), and calcium.'
          },
          {
            name: 'Vitamin D3',
            dosage: '1000 IU',
            frequency: 'Once daily',
            duration: '3 months',
            precautions: 'Essential for bone health and immune function. Safe during pregnancy.'
          },
          {
            name: 'Omega-3 DHA',
            dosage: '200mg',
            frequency: 'Once daily with meals',
            duration: 'Throughout pregnancy',
            precautions: 'Supports fetal brain development. Use pregnancy-safe, mercury-free source.'
          }
        ],
        additionalNotes: 'Monitor blood pressure weekly. Schedule follow-up in 2 weeks. Recommend prenatal yoga for stress management. Ensure adequate hydration (8-10 glasses of water daily).',
        warnings: [
          'Avoid raw fish, unpasteurized dairy, and deli meats',
          'Limit caffeine intake to 200mg per day',
          'Report any severe headaches, visual changes, or sudden swelling immediately',
          'Continue current exercise routine with modifications as needed'
        ]
      };

      setGeneratedScript(mockScript);
      setIsGenerating(false);
      toast.success('AI prescription generated successfully!');
    }, 2000);
  };

  const copyToClipboard = async () => {
    if (!generatedScript) return;

    const scriptText = `
PRESCRIPTION - ${patientName}
Trimester: ${trimester}

MEDICATIONS:
${generatedScript.medications.map((med, i) => `
${i + 1}. ${med.name}
   - Dosage: ${med.dosage}
   - Frequency: ${med.frequency}
   - Duration: ${med.duration}
   - Precautions: ${med.precautions}
`).join('\n')}

ADDITIONAL NOTES:
${generatedScript.additionalNotes}

WARNINGS & PRECAUTIONS:
${generatedScript.warnings.map((w, i) => `${i + 1}. ${w}`).join('\n')}
    `.trim();

    const fallbackCopy = () => {
      const textArea = document.createElement('textarea');
      textArea.value = scriptText;
      textArea.style.position = 'fixed';
      textArea.style.left = '-999999px';
      textArea.style.top = '-999999px';
      document.body.appendChild(textArea);
      textArea.focus();
      textArea.select();

      try {
        const successful = document.execCommand('copy');
        document.body.removeChild(textArea);
        return successful;
      } catch (err) {
        document.body.removeChild(textArea);
        return false;
      }
    };

    try {
      if (navigator.clipboard && window.isSecureContext) {
        try {
          await navigator.clipboard.writeText(scriptText);
          toast.success('Prescription copied to clipboard!');
          return;
        } catch (clipboardError) {
          console.warn('Clipboard API failed, falling back to legacy method', clipboardError);
          if (fallbackCopy()) {
            toast.success('Prescription copied to clipboard!');
            return;
          }
        }
      } else {
        if (fallbackCopy()) {
          toast.success('Prescription copied to clipboard!');
          return;
        }
      }

      throw new Error('All copy methods failed');
    } catch (error) {
      console.error('Failed to copy to clipboard:', error);
      toast.error('Failed to copy prescription. Please select the text and copy manually.');
    }
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <div className="flex items-center gap-2">
            <Sparkles className="w-6 h-6 text-[#FF69B4]" />
            <div>
              <CardTitle>AI-Powered Medication Suggestion</CardTitle>
              <CardDescription>
                Generate personalized prescriptions based on patient symptoms and trimester
              </CardDescription>
            </div>
          </div>
        </CardHeader>

        <CardContent>
          <div className="space-y-4">
            {/* Patient name + Trimester row */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="patient-name">Patient Name</Label>

                {/* Plain input so typing works */}
                <Input
                  id="patient-name"
                  placeholder="Enter patient name"
                  value={patientName}
                  onChange={(e) => setPatientName(e.target.value)}
                />

                {/* Keep VoiceSearch as optional helper */}

              </div>

              <div className="space-y-2">
                <Label htmlFor="trimester">Trimester</Label>
                <Select value={trimester} onValueChange={setTrimester}>
                  <SelectTrigger id="trimester">
                    <SelectValue placeholder="Select trimester" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="1st">1st Trimester (1-12 weeks)</SelectItem>
                    <SelectItem value="2nd">2nd Trimester (13-26 weeks)</SelectItem>
                    <SelectItem value="3rd">3rd Trimester (27-40 weeks)</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            {/* Symptoms */}
            <div className="space-y-2">
              <Label htmlFor="symptoms">Symptoms & Conditions</Label>
              <Textarea
                id="symptoms"
                placeholder="Describe patient symptoms, conditions, and concerns..."
                value={symptoms}
                onChange={(e) => setSymptoms(e.target.value)}
                className="min-h-[120px]"
              />
            </div>

            {/* Quick add badges */}
            <div className="space-y-2">
              <Label>Quick Add Common Conditions</Label>
              <div className="flex flex-wrap gap-2">
                {commonConditions.map((condition, index) => (
                  <Badge
                    key={index}
                    variant="outline"
                    className="cursor-pointer hover:bg-[#E8EFFF] transition-colors"
                    onClick={() =>
                      setSymptoms(prev =>
                        prev && prev.trim() ? `${prev}, ${condition.keywords}` : condition.keywords
                      )
                    }
                  >
                    + {condition.name}
                  </Badge>
                ))}
              </div>
            </div>

            {/* Generate Button — note type="button" and trimmed validation */}
            <Button
              type="button"
              onClick={() => {
                console.log('Generate button clicked; patientName:', patientName, 'trimester:', trimester, 'symptoms:', symptoms);
                generateScript();
              }}
              disabled={!patientName.trim() || !trimester || !symptoms.trim() || isGenerating}
              className="w-full bg-[#FF69B4] hover:bg-[#E558A3]"
            >
              {isGenerating ? (
                <>
                  <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2" />
                  Generating AI Prescription...
                </>
              ) : (
                <>
                  <Sparkles className="w-4 h-4 mr-2" />
                  Generate AI Prescription
                </>
              )}
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Generated Script */}
      {generatedScript && (
        <Card className="border-2" style={{ borderColor: '#FF69B4' }}>
          <CardHeader>
            <div className="flex items-center justify-between">
              <div>
                <CardTitle className="flex items-center gap-2">
                  <CheckCircle className="w-5 h-5 text-green-500" />
                  AI-Generated Prescription
                </CardTitle>
                <CardDescription>
                  For {patientName} • {trimester} Trimester
                </CardDescription>
              </div>
              <div className="flex gap-2">
                <Button variant="outline" size="sm" onClick={copyToClipboard}>
                  <Copy className="w-4 h-4 mr-2" />
                  Copy
                </Button>
                <Button variant="outline" size="sm" onClick={() => toast('Download not implemented')}>
                  <Download className="w-4 h-4 mr-2" />
                  Download
                </Button>
                <Button size="sm" className="bg-[#5B7FDB]" onClick={() => toast('Send to patient not implemented')}>
                  <Send className="w-4 h-4 mr-2" />
                  Send to Patient
                </Button>
              </div>
            </div>
          </CardHeader>

          <CardContent>
            <Tabs defaultValue="medications">
              <TabsList>
                <TabsTrigger value="medications">Medications</TabsTrigger>
                <TabsTrigger value="notes">Additional Notes</TabsTrigger>
                <TabsTrigger value="warnings">Warnings</TabsTrigger>
              </TabsList>

              <TabsContent value="medications" className="space-y-4 mt-4">
                {generatedScript.medications.map((med, index) => (
                  <Card key={index} className="border-l-4" style={{ borderLeftColor: index % 2 === 0 ? '#5B7FDB' : '#FF69B4' }}>
                    <CardHeader className="pb-3">
                      <CardTitle className="text-base">{index + 1}. {med.name}</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-2">
                      <div className="grid grid-cols-2 gap-3 text-sm">
                        <div>
                          <span className="text-muted-foreground">Dosage:</span>
                          <p>{med.dosage}</p>
                        </div>
                        <div>
                          <span className="text-muted-foreground">Frequency:</span>
                          <p>{med.frequency}</p>
                        </div>
                        <div className="col-span-2">
                          <span className="text-muted-foreground">Duration:</span>
                          <p>{med.duration}</p>
                        </div>
                      </div>
                      <div className="mt-3 p-3 bg-[#E8EFFF] rounded-lg">
                        <p className="text-sm">
                          <span className="font-medium">Precautions: </span>
                          {med.precautions}
                        </p>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </TabsContent>

              <TabsContent value="notes" className="mt-4">
                <Card>
                  <CardContent className="pt-6">
                    <p className="whitespace-pre-wrap">{generatedScript.additionalNotes}</p>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="warnings" className="mt-4">
                <Card className="border-orange-200 bg-orange-50">
                  <CardContent className="pt-6 space-y-3">
                    {generatedScript.warnings.map((warning, index) => (
                      <div key={index} className="flex items-start gap-3 p-3 bg-white rounded-lg">
                        <AlertTriangle className="w-5 h-5 text-orange-500 flex-shrink-0 mt-0.5" />
                        <p className="text-sm">{warning}</p>
                      </div>
                    ))}
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>
      )}

      {/* Recent Prescriptions */}
      <Card>
        <CardHeader>
          <CardTitle>Recent AI Prescriptions</CardTitle>
          <CardDescription>Previously generated prescriptions</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {[
              { patient: 'Sarah Johnson', date: 'Oct 30, 2025', condition: 'Prenatal care', status: 'Sent' },
              { patient: 'Emily Chen', date: 'Oct 29, 2025', condition: 'Morning sickness', status: 'Sent' },
              { patient: 'Maria Garcia', date: 'Oct 28, 2025', condition: 'Iron deficiency', status: 'Draft' }
            ].map((prescription, index) => (
              <div
                key={index}
                className="flex items-center justify-between p-4 rounded-lg border hover:border-[#FF69B4] transition-colors cursor-pointer"
              >
                <div>
                  <h4>{prescription.patient}</h4>
                  <p className="text-sm text-muted-foreground">
                    {prescription.condition} • {prescription.date}
                  </p>
                </div>
                <div className="flex items-center gap-3">
                  <Badge variant={prescription.status === 'Sent' ? 'default' : 'secondary'}>
                    {prescription.status}
                  </Badge>
                  <Button variant="ghost" size="sm" onClick={() => toast('View not implemented')}>
                    <Eye className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* AI Insights */}
      <Card className="bg-gradient-to-br from-[#E8EFFF] to-[#FFE8F5]">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Sparkles className="w-5 h-5 text-[#5B7FDB]" />
            AI Insights & Recommendations
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          <div className="p-4 bg-white rounded-lg">
            <h4 className="mb-2" style={{ color: '#5B7FDB' }}>Trending Conditions This Week</h4>
            <p className="text-sm text-muted-foreground">
              Morning sickness cases up 15%. Consider recommending vitamin B6 supplementation and small frequent meals.
            </p>
          </div>
          <div className="p-4 bg-white rounded-lg">
            <h4 className="mb-2" style={{ color: '#FF69B4' }}>Medication Safety Alert</h4>
            <p className="text-sm text-muted-foreground">
              New guidelines for iron supplementation in 2nd trimester. Review current protocols for optimal dosing.
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

/* Local Eye SVG used in "Recent Prescriptions" */
function Eye({ className }: { className?: string }) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path>
      <circle cx="12" cy="12" r="3"></circle>
    </svg>
  );
}

export default MedicationSuggestion;

