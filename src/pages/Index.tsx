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
        'Xenova/distilgpt2'
      );

      const result = await generator(command, {
        max_new_tokens: 100,
        top_k: 50,
        top_p: 0.95,
        return_full_text: false
      });

      // Handle the result based on its type
      let generatedText = '';
      if (Array.isArray(result)) {
        generatedText = result[0]?.generated_text || '';
      } else {
        generatedText = result.generated_text || '';
      }
        
      setGeneratedCode(generatedText);
      toast.success('Code generated successfully!');
    } catch (error) {
      console.error('Error generating code:', error);
      
      if (error instanceof Error) {
        toast.error(`Error: ${error.message}`);
      } else {
        toast.error('An unexpected error occurred.');
      }
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-[#f8f9fa] to-[#e9ecef] dark:from-[#1a1b26] dark:to-[#24283b]">
      <Header onOpenSettings={() => toast.info('Settings panel coming soon!')} />
      
      <main className="flex-1 container py-8 px-4">
        <div className="max-w-6xl mx-auto">
          <h1 className="text-4xl font-bold mb-8 bg-gradient-to-r from-[#0066cc] to-[#10b981] bg-clip-text text-transparent">
            Offline AI Builder
          </h1>
          
          <Tabs defaultValue="editor" className="w-full">
            <TabsList className="grid w-full grid-cols-2 mb-8 bg-white/10 backdrop-blur-sm">
              <TabsTrigger 
                value="editor"
                className="data-[state=active]:bg-[#0066cc] data-[state=active]:text-white"
              >
                Editor
              </TabsTrigger>
              <TabsTrigger 
                value="preview"
                className="data-[state=active]:bg-[#10b981] data-[state=active]:text-white"
              >
                Preview
              </TabsTrigger>
            </TabsList>
            
            <TabsContent value="editor" className="space-y-6">
              <Card className="p-6 border-none bg-white/50 dark:bg-slate-900/50 backdrop-blur-sm">
                <h2 className="text-2xl font-semibold mb-4 text-[#1e293b] dark:text-white">
                  Command Input
                </h2>
                <CommandInput onSubmit={processCommand} isProcessing={isProcessing} />
                {isProcessing && (
                  <div className="flex items-center justify-center gap-2 mt-4 text-[#10b981]">
                    <Loader2 className="h-4 w-4 animate-spin" />
                    <span>Processing your request...</span>
                  </div>
                )}
              </Card>
            </TabsContent>
            
            <TabsContent value="preview" className="space-y-6">
              <Card className="p-6 border-none bg-white/50 dark:bg-slate-900/50 backdrop-blur-sm">
                <h2 className="text-2xl font-semibold mb-4 text-[#1e293b] dark:text-white">
                  Generated Code
                </h2>
                <ScrollArea className="h-[500px] rounded-md border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 p-4">
                  <CodePreview code={generatedCode} />
                </ScrollArea>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </main>
    </div>
  );
};

export default Index;