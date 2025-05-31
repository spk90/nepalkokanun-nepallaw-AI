
import { Alert, AlertDescription } from "@/components/ui/alert";
import { AlertTriangle } from "lucide-react";

const LegalDisclaimer = () => {
  return (
    <div className="container mx-auto px-4 py-6">
      <Alert className="border-yellow-200 bg-yellow-50">
        <AlertTriangle className="h-4 w-4 text-yellow-600" />
        <AlertDescription className="text-yellow-800">
          <strong>Legal Disclaimer:</strong> This AI assistant provides general information about Nepali laws and constitution for educational purposes only. 
          It is not a substitute for professional legal advice. For specific legal matters, please consult with a qualified lawyer or legal professional. 
          The information provided may not reflect the most current legal developments.
          <br /><br />
          <strong>कानुनी अस्वीकरण:</strong> यो AI सहायकले नेपाली कानून र संविधानको बारेमा सामान्य जानकारी मात्र प्रदान गर्छ। यो व्यावसायिक कानुनी सल्लाहको विकल्प होइन। 
          विशिष्ट कानुनी मामिलाहरूको लागि योग्य वकिल वा कानुनी व्यावसायिकसँग सल्लाह लिनुहोस्।
        </AlertDescription>
      </Alert>
    </div>
  );
};

export default LegalDisclaimer;
