import React, { useState } from 'react';
import { pipeline } from '@huggingface/transformers';
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
      // Initialize the model
      const generator = await pipeline(
        'text-generation',
        'Xenova/gpt2', // Using a publicly available model
        { 
          device: 'cpu',
          quantized: false // Disable quantization for better browser compatibility
        }
      );

      // Generate code
      const result = await generator(command, {
        max_length: 100,
        num_return_sequences: 1,
        temperature: 0.7,
        do_sample: true
      });

      const generatedText = Array.isArray(result) 
        ? result[0].generated_text 
        : result.generated_text;
        
      setGeneratedCode(generatedText);
      toast.success('Code generated successfully!');
    } catch (error) {
      console.error('Error generating code:', error);
      toast.error('Failed to generate code. Please check console for details.');
      
      // More specific error messages based on the error type
      if (error instanceof Error) {
        if (error.message.includes('401')) {
          toast.error('Authentication error with the model. Using public model instead.');
        } else if (error.message.includes('Failed to fetch')) {
          toast.error('Network error. Please check your internet connection.');
        }
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