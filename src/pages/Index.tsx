import React, { useState } from 'react';
import { pipeline, TextGenerationOutput } from '@huggingface/transformers';
import CommandInput from '../components/CommandInput';
import CodePreview from '../components/CodePreview';
import Header from '../components/Header';
import { toast } from 'sonner';

const Index = () => {
  const [isProcessing, setIsProcessing] = useState(false);
  const [generatedCode, setGeneratedCode] = useState('');

  const processCommand = async (command: string) => {
    setIsProcessing(true);
    try {
      // Initialize the model with specific configuration
      const generator = await pipeline(
        'text-generation',
        'Xenova/gpt2',
        {
          revision: 'main',
          minLength: 10,
          maxLength: 100,
          topK: 50,
          topP: 0.95,
          temperature: 0.7,
        }
      );

      // Generate code
      const result = await generator(command);

      // Extract the generated text
      let generatedText = '';
      if (Array.isArray(result)) {
        generatedText = result[0]?.text || '';
      } else {
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
    <div className="min-h-screen flex flex-col">
      <Header onOpenSettings={handleOpenSettings} />
      <main className="flex-1 container py-8 grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="space-y-4 animate-fade-up">
          <h2 className="text-2xl font-semibold">Command Input</h2>
          <CommandInput onSubmit={processCommand} isProcessing={isProcessing} />
          {isProcessing && (
            <div className="text-center text-secondary">
              Processing your request...
            </div>
          )}
        </div>
        <div className="space-y-4 animate-fade-up">
          <h2 className="text-2xl font-semibold">Generated Code</h2>
          <CodePreview code={generatedCode} />
        </div>
      </main>
    </div>
  );
};

export default Index;