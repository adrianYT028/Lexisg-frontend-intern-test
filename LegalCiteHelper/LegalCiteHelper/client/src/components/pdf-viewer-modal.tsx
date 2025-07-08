import { useEffect } from "react";
import { X, FileText, Download, Search } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";

interface Citation {
  text: string;
  source: string;
  paragraph: number;
  link: string;
}

interface PdfViewerModalProps {
  isOpen: boolean;
  onClose: () => void;
  citation: Citation | null;
}

export default function PdfViewerModal({ isOpen, onClose, citation }: PdfViewerModalProps) {
  useEffect(() => {
    if (isOpen) {
      document.body.classList.add('overflow-hidden');
    } else {
      document.body.classList.remove('overflow-hidden');
    }
    
    return () => {
      document.body.classList.remove('overflow-hidden');
    };
  }, [isOpen]);

  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };

    document.addEventListener('keydown', handleEscape);
    return () => document.removeEventListener('keydown', handleEscape);
  }, [isOpen, onClose]);

  const handleDownload = () => {
    if (citation?.link) {
      window.open(citation.link, '_blank');
    }
  };

  if (!isOpen || !citation) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-xl shadow-2xl max-w-4xl w-full max-h-[90vh] flex flex-col">
        {/* Modal Header */}
        <div className="flex items-center justify-between p-4 border-b border-gray-200">
          <div className="flex items-center space-x-3">
            <div className="w-8 h-8 bg-blue-100 rounded flex items-center justify-center">
              <FileText className="text-blue-600" size={16} />
            </div>
            <div>
              <h3 className="font-medium text-gray-900">
                {citation.source.replace('.pdf', '').replace(/_/g, ' ')}
              </h3>
              <p className="text-sm text-gray-500">
                Legal Document - Paragraph {citation.paragraph} highlighted
              </p>
            </div>
          </div>
          <Button
            variant="ghost"
            size="icon"
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600"
          >
            <X size={20} />
          </Button>
        </div>
        
        {/* PDF Viewer Area */}
        <div className="flex-1 overflow-hidden">
          <div className="h-full p-6 bg-gray-50">
            {/* Simulated PDF Content */}
            <div className="bg-white rounded-lg shadow-sm p-8 max-w-3xl mx-auto h-full overflow-y-auto">
              <div className="text-center mb-6">
                <h2 className="text-xl font-bold text-gray-900 mb-2">
                  {citation.source.replace('.pdf', '').replace(/_/g, ' ')}
                </h2>
                <p className="text-gray-600">Motor Vehicle Accident Claims Tribunal</p>
              </div>
              
              <div className="space-y-4 text-sm leading-relaxed">
                {/* Mock PDF paragraphs */}
                <div className="paragraph">
                  <p className="text-gray-700 mb-3">
                    <strong>1.</strong> This case involves a motor vehicle accident claim where the deceased was self-employed at the time of the incident. The tribunal must determine the appropriate compensation under Section 166 of the Motor Vehicles Act, 1988.
                  </p>
                </div>
                
                <div className="paragraph">
                  <p className="text-gray-700 mb-3">
                    <strong>2.</strong> The deceased was earning a substantial income from his self-employed business activities. The claimants have provided evidence of his annual earnings and business prospects.
                  </p>
                </div>
                
                <div className="paragraph">
                  <p className="text-gray-700 mb-3">
                    <strong>3.</strong> The learned counsel for the claimants argued that future prospects should be considered even in cases where the deceased was self-employed, contrary to the respondent's contention.
                  </p>
                </div>
                
                <div className="paragraph">
                  <p className="text-gray-700 mb-3">
                    <strong>4.</strong> The court examined various precedents and legal principles applicable to compensation calculations under the Motor Vehicles Act.
                  </p>
                </div>
                
                <div className="paragraph">
                  <p className="text-gray-700 mb-3">
                    <strong>5.</strong> Evidence was presented regarding the deceased's age, occupation, and earning capacity at the time of the accident.
                  </p>
                </div>
                
                <div className="paragraph">
                  <p className="text-gray-700 mb-3">
                    <strong>6.</strong> The tribunal considered the applicable legal framework and established jurisprudence in similar cases.
                  </p>
                </div>
                
                {/* Highlighted Paragraph */}
                <div className="paragraph bg-yellow-100 border-l-4 border-yellow-500 p-4 rounded-r-lg">
                  <p className="text-gray-800 mb-3">
                    <strong>7.</strong> Upon careful consideration of the evidence and legal precedents, this tribunal finds that{' '}
                    <mark className="bg-yellow-200 px-1 rounded">
                      {citation.text}
                    </mark>{' '}
                    This approach aligns with established jurisprudence in similar cases.
                  </p>
                </div>
                
                <div className="paragraph">
                  <p className="text-gray-700 mb-3">
                    <strong>8.</strong> The tribunal therefore directs that the compensation be calculated including the 10% addition for future prospects as outlined in the preceding paragraph.
                  </p>
                </div>
                
                <div className="paragraph">
                  <p className="text-gray-700 mb-3">
                    <strong>9.</strong> This judgment sets a precedent for similar cases involving self-employed individuals in motor vehicle accident claims.
                  </p>
                </div>
                
                <div className="paragraph">
                  <p className="text-gray-700 mb-3">
                    <strong>10.</strong> The award is hereby modified to include the additional 10% for future prospects, and the parties are directed to comply with this order.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        {/* Modal Footer */}
        <div className="flex items-center justify-between p-4 border-t border-gray-200 bg-gray-50">
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-2 text-sm text-gray-600">
              <Search size={16} />
              <span>Paragraph {citation.paragraph} highlighted</span>
            </div>
            <div className="flex items-center space-x-2 text-sm text-gray-600">
              <Download size={16} />
              <span>Original PDF available</span>
            </div>
          </div>
          <Button onClick={handleDownload} className="text-sm">
            <Download size={16} className="mr-2" />
            Download PDF
          </Button>
        </div>
      </div>
    </div>
  );
}
