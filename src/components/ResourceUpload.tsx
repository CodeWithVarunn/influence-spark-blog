
import { useState, useRef } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useToast } from '@/hooks/use-toast';
import { Upload, Link, FileText, Trash2, Globe, Search } from 'lucide-react';

interface Resource {
  id: string;
  type: 'url' | 'pdf' | 'website';
  name: string;
  content?: string;
  status: 'pending' | 'processed' | 'error';
}

export const ResourceUpload = () => {
  const { toast } = useToast();
  const [resources, setResources] = useState<Resource[]>([]);
  const [websiteUrl, setWebsiteUrl] = useState('');
  const [websiteName, setWebsiteName] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleUrlSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!websiteUrl.trim()) return;

    const newResource: Resource = {
      id: Date.now().toString(),
      type: 'url',
      name: websiteUrl,
      status: 'pending'
    };

    setResources(prev => [...prev, newResource]);
    setIsProcessing(true);

    try {
      setTimeout(() => {
        setResources(prev => 
          prev.map(r => 
            r.id === newResource.id 
              ? { ...r, status: 'processed' as const, content: `Processed content from ${websiteUrl}` }
              : r
          )
        );
        setIsProcessing(false);
        toast({
          title: "Website processed successfully",
          description: "Content extracted and ready for idea generation",
        });
      }, 2000);

      setWebsiteUrl('');
    } catch (error) {
      setResources(prev => 
        prev.map(r => 
          r.id === newResource.id 
            ? { ...r, status: 'error' as const }
            : r
        )
      );
      setIsProcessing(false);
      toast({
        title: "Error processing website",
        description: "Please check the URL and try again",
        variant: "destructive",
      });
    }
  };

  const handleWebsiteNameSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!websiteName.trim()) return;

    const newResource: Resource = {
      id: Date.now().toString() + '_name',
      type: 'website',
      name: websiteName,
      status: 'pending'
    };

    setResources(prev => [...prev, newResource]);
    setIsProcessing(true);

    try {
      setTimeout(() => {
        setResources(prev => 
          prev.map(r => 
            r.id === newResource.id 
              ? { ...r, status: 'processed' as const, content: `Processed content from ${websiteName} website` }
              : r
          )
        );
        setIsProcessing(false);
        toast({
          title: "Website content processed",
          description: `Content from ${websiteName} is ready for idea generation`,
        });
      }, 2000);

      setWebsiteName('');
    } catch (error) {
      setResources(prev => 
        prev.map(r => 
          r.id === newResource.id 
            ? { ...r, status: 'error' as const }
            : r
        )
      );
      setIsProcessing(false);
      toast({
        title: "Error processing website",
        description: "Please try again",
        variant: "destructive",
      });
    }
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files) return;

    Array.from(files).forEach(file => {
      if (file.type === 'application/pdf') {
        const newResource: Resource = {
          id: Date.now().toString() + Math.random(),
          type: 'pdf',
          name: file.name,
          status: 'pending'
        };

        setResources(prev => [...prev, newResource]);

        setTimeout(() => {
          setResources(prev => 
            prev.map(r => 
              r.id === newResource.id 
                ? { ...r, status: 'processed' as const, content: `Processed content from ${file.name}` }
                : r
            )
          );
          toast({
            title: "PDF processed successfully",
            description: `${file.name} is ready for idea generation`,
          });
        }, 1500);
      } else {
        toast({
          title: "Invalid file type",
          description: "Please upload PDF files only",
          variant: "destructive",
        });
      }
    });

    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const removeResource = (id: string) => {
    setResources(prev => prev.filter(r => r.id !== id));
  };

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Website URL Upload */}
        <Card className="border-0 shadow-lg bg-gradient-to-br from-blue-50 to-white dark:from-blue-900/20 dark:to-gray-800">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-gray-900 dark:text-white">
              <Globe className="w-5 h-5 text-blue-600" />
              Add Website URL
            </CardTitle>
            <CardDescription className="text-gray-600 dark:text-gray-300">
              Enter a website URL to extract content for blog ideas
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleUrlSubmit} className="space-y-4">
              <div>
                <Label htmlFor="website-url">Website URL</Label>
                <Input
                  id="website-url"
                  type="url"
                  placeholder="https://example.com"
                  value={websiteUrl}
                  onChange={(e) => setWebsiteUrl(e.target.value)}
                  className="mt-1"
                />
              </div>
              <Button 
                type="submit" 
                disabled={isProcessing || !websiteUrl.trim()}
                className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white shadow-lg"
              >
                <Link className="w-4 h-4 mr-2" />
                {isProcessing ? 'Processing...' : 'Add Website'}
              </Button>
            </form>
          </CardContent>
        </Card>

        {/* Website Name Upload */}
        <Card className="border-0 shadow-lg bg-gradient-to-br from-purple-50 to-white dark:from-purple-900/20 dark:to-gray-800">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-gray-900 dark:text-white">
              <Search className="w-5 h-5 text-purple-600" />
              Enter Website Name
            </CardTitle>
            <CardDescription className="text-gray-600 dark:text-gray-300">
              Simply enter a website name to find and analyze content
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleWebsiteNameSubmit} className="space-y-4">
              <div>
                <Label htmlFor="website-name">Website Name</Label>
                <Input
                  id="website-name"
                  type="text"
                  placeholder="e.g., TechCrunch, Medium, Forbes"
                  value={websiteName}
                  onChange={(e) => setWebsiteName(e.target.value)}
                  className="mt-1"
                />
              </div>
              <Button 
                type="submit" 
                disabled={isProcessing || !websiteName.trim()}
                className="w-full bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white shadow-lg"
              >
                <Search className="w-4 h-4 mr-2" />
                {isProcessing ? 'Processing...' : 'Find Website'}
              </Button>
            </form>
          </CardContent>
        </Card>

        {/* PDF Upload */}
        <Card className="border-0 shadow-lg bg-gradient-to-br from-green-50 to-white dark:from-green-900/20 dark:to-gray-800">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-gray-900 dark:text-white">
              <FileText className="w-5 h-5 text-green-600" />
              Upload PDFs
            </CardTitle>
            <CardDescription className="text-gray-600 dark:text-gray-300">
              Upload PDF documents to extract insights and ideas
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div>
                <Label htmlFor="pdf-upload">PDF Files</Label>
                <Input
                  id="pdf-upload"
                  type="file"
                  accept=".pdf"
                  multiple
                  onChange={handleFileUpload}
                  ref={fileInputRef}
                  className="mt-1"
                />
              </div>
              <div className="text-sm text-gray-500 dark:text-gray-400">
                Supported format: PDF (Multiple files allowed)
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Resources List */}
      {resources.length > 0 && (
        <Card className="border-0 shadow-lg bg-white dark:bg-gray-800">
          <CardHeader>
            <CardTitle className="text-gray-900 dark:text-white">Uploaded Resources</CardTitle>
            <CardDescription className="text-gray-600 dark:text-gray-300">
              Manage your uploaded websites and PDFs
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {resources.map((resource) => (
                <div
                  key={resource.id}
                  className="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-700 rounded-xl border border-gray-100 dark:border-gray-600 hover:shadow-md transition-all"
                >
                  <div className="flex items-center gap-3">
                    {resource.type === 'url' ? (
                      <Globe className="w-5 h-5 text-blue-600" />
                    ) : resource.type === 'website' ? (
                      <Search className="w-5 h-5 text-purple-600" />
                    ) : (
                      <FileText className="w-5 h-5 text-green-600" />
                    )}
                    <div>
                      <p className="font-medium text-sm text-gray-900 dark:text-white">{resource.name}</p>
                      <p className="text-xs text-gray-500 dark:text-gray-400 capitalize">
                        {resource.status} • {resource.type === 'url' ? 'Website URL' : resource.type === 'website' ? 'Website Name' : 'PDF File'}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className={`px-3 py-1 rounded-full text-xs font-medium ${
                      resource.status === 'processed' 
                        ? 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400'
                        : resource.status === 'error'
                        ? 'bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400'
                        : 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-400'
                    }`}>
                      {resource.status}
                    </div>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => removeResource(resource.id)}
                      className="text-red-600 hover:text-red-700 hover:bg-red-50 dark:text-red-400 dark:hover:text-red-300 dark:hover:bg-red-900/20"
                    >
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
};
