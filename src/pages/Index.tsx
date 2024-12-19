import React, { useState } from 'react';
import { pipeline } from '@huggingface/transformers';
import CommandInput from '../components/CommandInput';
import CodePreview from '../components/CodePreview';
import Header from '../components/Header';
import { toast } from 'sonner';
import { Card } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Loader2 } from 'lucide-react';

const Index = () => {
  const [isProcessing, setIsProcessing] = useState(false);
  const [generatedCode, setGeneratedCode] = useState('');

  const processCommand = async (command: string) => {
    setIsProcessing(true);
    try {
      const generator = await pipeline(
        'text-generation',
        'Xenova/distilgpt2',
        {
          revision: 'main'
        }
      );

      const result = await generator(command, {
        max_new_tokens: 100,
        top_k: 50,
        top_p: 0.95
      });

      let generatedText = '';
      if (Array.isArray(result) && result[0]) {
        generatedText = result[0].text || '';
      } else if ('text' in result) {
        generatedText = result.text || '';
      }
        
      setGeneratedCode(generatedText);
      toast.success('Code generated successfully!');
    } catch (error) {
      console.error('Error generating code:', error);
      
      if (error instanceof Error) {
        if (error.message.includes('401')) {
          toast.error('Authentication error. Trying with public model...');
        } else if (error.message.includes('Failed to fetch')) {
          toast.error('Network error. Please check your internet connection.');
        } else {
          toast.error(`Error: ${error.message}`);
        }
      } else {
        toast.error('An unexpected error occurred.');
      }
    } finally {
      setIsProcessing(false);
    }
  };

  const handleOpenSettings = () => {
    toast.info('Settings panel coming soon!');
  };

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Header onOpenSettings={handleOpenSettings} />
      
      <main className="flex-1 container py-8 px-4">
        <Tabs defaultValue="editor" className="w-full">
          <TabsList className="grid w-full grid-cols-2 mb-8">
            <TabsTrigger value="editor">Editor</TabsTrigger>
            <TabsTrigger value="preview">Preview</TabsTrigger>
          </TabsList>
          
          <TabsContent value="editor" className="space-y-6">
            <Card className="p-6">
              <h2 className="text-2xl font-semibold mb-4">Command Input</h2>
              <CommandInput onSubmit={processCommand} isProcessing={isProcessing} />
              {isProcessing && (
                <div className="flex items-center justify-center gap-2 mt-4 text-secondary">
                  <Loader2 className="h-4 w-4 animate-spin" />
                  <span>Processing your request...</span>
                </div>
              )}
            </Card>
          </TabsContent>
          
          <TabsContent value="preview" className="space-y-6">
            <Card className="p-6">
              <h2 className="text-2xl font-semibold mb-4">Generated Code</h2>
              <ScrollArea className="h-[500px] rounded-md border p-4">
                <CodePreview code={generatedCode} />
              </ScrollArea>
            </Card>
          </TabsContent>
        </Tabs>
      </main>
    </div>
  );
};

export default Index;