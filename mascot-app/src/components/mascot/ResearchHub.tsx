import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { Badge } from '@/components/ui/badge';
import { ExternalLink, BookOpen, Users } from 'lucide-react';
import { getMemesSync } from '@/data/loadMemes';
import type { Meme } from '@/types';

export function ResearchHub() {
  const memes = getMemesSync();
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

  const categories = Array.from(new Set(memes.map(m => m.category)));

  const getQuestionsForMeme = (meme: Meme): string[] => {
    const questions: Record<string, string[]> = {
      intrinsic_motivation: [
        "What external goal are you pursuing that could be reframed as intrinsic?",
        "How can you measure your progress internally rather than seeking external validation?",
        "What aspects of this work naturally interest you, independent of outcomes?"
      ],
      gradual_progress: [
        "What's the smallest meaningful step you can take today?",
        "How can you track micro-wins to maintain momentum?",
        "What would 'one brick today' look like in your current project?"
      ],
      error_reflection: [
        "What mistake have you made recently that could become a method?",
        "Which of your assumptions should you test rather than trust?",
        "How can you convert this error into a learning opportunity?"
      ],
      consistent_practice: [
        "What daily practice would compound into mastery over time?",
        "How can you make this practice so small it's impossible to skip?",
        "What's your current streak, and how can you extend it?"
      ],
      self_discipline: [
        "What system or template could reduce decision fatigue?",
        "How can you integrate learning rather than scatter attention?",
        "What self-check routine would keep you on track?"
      ],
      systematic_learning: [
        "How can you decompose this system into its core parts?",
        "What are the flows and interfaces between components?",
        "What patterns can you extract and apply elsewhere?"
      ]
    };
    return questions[meme.category] || [
      "How does this behavioral pattern apply to your current work?",
      "What would implementing this look like in your daily routine?",
      "How can you measure whether this pattern is working for you?"
    ];
  };

  const getResourcesForCategory = (category: string) => {
    return {
      intrinsic_motivation: {
        description: "Resources on building intrinsic motivation and self-directed learning",
        links: [
          { title: "Systems Thinking Community", url: "https://systemsworld.club/" },
          { title: "System School Learning Platform", url: "https://system-school.ru/" }
        ]
      },
      gradual_progress: {
        description: "Materials on incremental improvement and micro-habits",
        links: [
          { title: "Systems Thinking Community", url: "https://systemsworld.club/" },
          { title: "System School Learning Platform", url: "https://system-school.ru/" }
        ]
      },
      error_reflection: {
        description: "Resources on learning from mistakes and systematic debugging",
        links: [
          { title: "Systems Thinking Community", url: "https://systemsworld.club/" },
          { title: "System School Learning Platform", url: "https://system-school.ru/" }
        ]
      },
      consistent_practice: {
        description: "Materials on building sustainable practice habits",
        links: [
          { title: "Systems Thinking Community", url: "https://systemsworld.club/" },
          { title: "System School Learning Platform", url: "https://system-school.ru/" }
        ]
      },
      self_discipline: {
        description: "Resources on systematic self-management and discipline",
        links: [
          { title: "Systems Thinking Community", url: "https://systemsworld.club/" },
          { title: "System School Learning Platform", url: "https://system-school.ru/" }
        ]
      },
      systematic_learning: {
        description: "Materials on systems thinking and structured learning",
        links: [
          { title: "Systems Thinking Community", url: "https://systemsworld.club/" },
          { title: "System School Learning Platform", url: "https://system-school.ru/" }
        ]
      }
    }[category] || {
      description: "General learning resources",
      links: [
        { title: "Systems Thinking Community", url: "https://systemsworld.club/" },
        { title: "System School Learning Platform", url: "https://system-school.ru/" }
      ]
    };
  };

  const filteredMemes = selectedCategory 
    ? memes.filter(m => m.category === selectedCategory)
    : memes;

  return (
    <div className="container mx-auto p-6">
      <div className="mb-6">
        <h2 className="text-3xl font-bold mb-2" style={{ color: '#111111' }}>Research Hub</h2>
        <p className="text-gray-600">
          Question recommendations and research materials for learning-habit behavioral patterns
        </p>
      </div>

      <div className="mb-6">
        <h3 className="text-lg font-semibold mb-3">Filter by Category</h3>
        <div className="flex flex-wrap gap-2">
          <Badge
            variant={selectedCategory === null ? "default" : "outline"}
            className="cursor-pointer"
            onClick={() => setSelectedCategory(null)}
          >
            All Categories ({memes.length})
          </Badge>
          {categories.map(category => (
            <Badge
              key={category}
              variant={selectedCategory === category ? "default" : "outline"}
              className="cursor-pointer"
              onClick={() => setSelectedCategory(category)}
            >
              {category.replace(/_/g, ' ')} ({memes.filter(m => m.category === category).length})
            </Badge>
          ))}
        </div>
      </div>

      {selectedCategory && (
        <Card className="mb-6" style={{ borderColor: '#FF6A00' }}>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <BookOpen className="w-5 h-5" />
              {selectedCategory.replace(/_/g, ' ')} Resources
            </CardTitle>
            <CardDescription>
              {getResourcesForCategory(selectedCategory).description}
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              {getResourcesForCategory(selectedCategory).links.map((link, idx) => (
                <a
                  key={idx}
                  href={link.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 text-blue-600 hover:text-blue-800 hover:underline"
                >
                  <ExternalLink className="w-4 h-4" />
                  {link.title}
                </a>
              ))}
            </div>
          </CardContent>
        </Card>
      )}

      <div className="grid grid-cols-1 gap-4">
        {filteredMemes.map((meme) => {
          const questions = getQuestionsForMeme(meme);
          
          return (
            <Card key={meme.rank}>
              <CardHeader>
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <CardTitle className="text-xl mb-2">
                      {meme.rank}. {meme.title}
                    </CardTitle>
                    <CardDescription>{meme.description}</CardDescription>
                  </div>
                  <Badge style={{ backgroundColor: '#FF6A00' }}>
                    {meme.category.replace(/_/g, ' ')}
                  </Badge>
                </div>
              </CardHeader>
              <CardContent>
                <Accordion type="single" collapsible>
                  <AccordionItem value="questions">
                    <AccordionTrigger>
                      <span className="font-semibold">Reflection Questions</span>
                    </AccordionTrigger>
                    <AccordionContent>
                      <ul className="space-y-2">
                        {questions.map((question, idx) => (
                          <li key={idx} className="flex items-start gap-2">
                            <span className="text-orange-500 font-bold">•</span>
                            <span>{question}</span>
                          </li>
                        ))}
                      </ul>
                    </AccordionContent>
                  </AccordionItem>

                  <AccordionItem value="context">
                    <AccordionTrigger>
                      <span className="font-semibold">Behavioral Context</span>
                    </AccordionTrigger>
                    <AccordionContent>
                      <div className="space-y-2">
                        <p className="text-sm text-gray-700">
                          <span className="font-semibold">Pattern:</span> {meme.title}
                        </p>
                        <p className="text-sm text-gray-700">
                          <span className="font-semibold">Application contexts:</span> Working life, self-management, professional development
                        </p>
                        <p className="text-sm text-gray-700">
                          <span className="font-semibold">Target audience:</span> System engineers and adult learners
                        </p>
                        <div className="mt-3 p-3 bg-gray-50 rounded-lg">
                          <p className="text-sm font-semibold mb-1">Community Sources:</p>
                          <div className="flex flex-col gap-1">
                            <a
                              href="https://systemsworld.club/"
                              target="_blank"
                              rel="noopener noreferrer"
                              className="text-sm text-blue-600 hover:underline flex items-center gap-1"
                            >
                              <Users className="w-3 h-3" />
                              systemsworld.club
                            </a>
                            <a
                              href="https://system-school.ru/"
                              target="_blank"
                              rel="noopener noreferrer"
                              className="text-sm text-blue-600 hover:underline flex items-center gap-1"
                            >
                              <BookOpen className="w-3 h-3" />
                              system-school.ru
                            </a>
                          </div>
                        </div>
                      </div>
                    </AccordionContent>
                  </AccordionItem>

                  <AccordionItem value="metrics">
                    <AccordionTrigger>
                      <span className="font-semibold">Meme Metrics</span>
                    </AccordionTrigger>
                    <AccordionContent>
                      <div className="grid grid-cols-2 gap-3">
                        <div className="p-3 bg-blue-50 rounded-lg">
                          <p className="text-xs text-gray-600">Recognizability</p>
                          <p className="text-2xl font-bold" style={{ color: '#3178C6' }}>
                            {(meme.recognizability * 100).toFixed(0)}%
                          </p>
                        </div>
                        <div className="p-3 bg-orange-50 rounded-lg">
                          <p className="text-xs text-gray-600">Fidelity</p>
                          <p className="text-2xl font-bold" style={{ color: '#FF6A00' }}>
                            {(meme.fidelity * 100).toFixed(0)}%
                          </p>
                        </div>
                        <div className="p-3 bg-green-50 rounded-lg">
                          <p className="text-xs text-gray-600">Diversity</p>
                          <p className="text-2xl font-bold" style={{ color: '#10B981' }}>
                            {(meme.diversity * 100).toFixed(0)}%
                          </p>
                        </div>
                        <div className="p-3 bg-purple-50 rounded-lg">
                          <p className="text-xs text-gray-600">Affect</p>
                          <p className="text-2xl font-bold text-purple-600">
                            {(meme.affect * 100).toFixed(0)}%
                          </p>
                        </div>
                      </div>
                      <p className="mt-3 text-sm text-gray-600">
                        <span className="font-semibold">Popularity:</span> {meme.popularity} hits
                      </p>
                    </AccordionContent>
                  </AccordionItem>
                </Accordion>
              </CardContent>
            </Card>
          );
        })}
      </div>
    </div>
  );
}
