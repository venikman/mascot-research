import { useState } from 'react'
import './App.css'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { MemeBrowser } from '@/components/mascot/MemeBrowser'
import { MascotPoser } from '@/components/mascot/MascotPoser'
import { MemeGenerator } from '@/components/mascot/MemeGenerator'
import { ResearchHub } from '@/components/mascot/ResearchHub'
import type { Meme, MemeTemplate } from '@/types'

function App() {
  const [selectedTemplate, setSelectedTemplate] = useState<MemeTemplate | undefined>(undefined)
  const [selectedPose, setSelectedPose] = useState<string>('neutral')
  const [activeTab, setActiveTab] = useState<string>('browser')

  const handleSelectMeme = (_meme: Meme, template: MemeTemplate) => {
    setSelectedTemplate(template)
    setActiveTab('generator')
  }

  const handleSelectPose = (pose: string) => {
    setSelectedPose(pose)
    setActiveTab('generator')
  }

  return (
    <div className="min-h-screen" style={{ backgroundColor: '#FFFFFF' }}>
      <header className="border-b" style={{ backgroundColor: '#FFFFFF', borderColor: '#E5E7EB' }}>
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold" style={{ color: '#111111' }}>
                <span style={{ color: '#FF6A00' }}>Δbit</span> Mascot App
              </h1>
              <p className="text-sm text-gray-600 mt-1">
                Learning-habit meme generator from systemsworld.club and system-school.ru
              </p>
            </div>
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-lg flex items-center justify-center text-2xl font-bold" style={{ backgroundColor: '#FF6A00', color: '#FFFFFF' }}>
                Δ
              </div>
            </div>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-6 py-6">
        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="grid w-full grid-cols-4 mb-6">
            <TabsTrigger value="browser">Meme Browser</TabsTrigger>
            <TabsTrigger value="poser">Mascot Poses</TabsTrigger>
            <TabsTrigger value="generator">Generator</TabsTrigger>
            <TabsTrigger value="research">Research Hub</TabsTrigger>
          </TabsList>

          <TabsContent value="browser">
            <MemeBrowser onSelectMeme={handleSelectMeme} />
          </TabsContent>

          <TabsContent value="poser">
            <MascotPoser selectedPose={selectedPose} onSelectPose={handleSelectPose} />
          </TabsContent>

          <TabsContent value="generator">
            <MemeGenerator initialTemplate={selectedTemplate} initialPose={selectedPose} />
          </TabsContent>

          <TabsContent value="research">
            <ResearchHub />
          </TabsContent>
        </Tabs>
      </main>

      <footer className="border-t mt-12" style={{ backgroundColor: '#F9FAFB', borderColor: '#E5E7EB' }}>
        <div className="container mx-auto px-6 py-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div>
              <h3 className="font-semibold mb-2" style={{ color: '#111111' }}>About</h3>
              <p className="text-sm text-gray-600">
                CHARACTER-MASCOT application for learning-habit memes using the Δbit mascot method.
              </p>
            </div>
            <div>
              <h3 className="font-semibold mb-2" style={{ color: '#111111' }}>Guardrails</h3>
              <ul className="text-sm text-gray-600 space-y-1">
                <li>✓ Only system acts</li>
                <li>✓ No outcome promises</li>
                <li>✓ Measurement external</li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold mb-2" style={{ color: '#111111' }}>Community</h3>
              <div className="space-y-1">
                <a href="https://systemsworld.club/" target="_blank" rel="noopener noreferrer" className="text-sm block hover:underline" style={{ color: '#3178C6' }}>
                  systemsworld.club
                </a>
                <a href="https://system-school.ru/" target="_blank" rel="noopener noreferrer" className="text-sm block hover:underline" style={{ color: '#3178C6' }}>
                  system-school.ru
                </a>
              </div>
            </div>
          </div>
          <div className="mt-6 pt-6 border-t text-center text-sm text-gray-500" style={{ borderColor: '#E5E7EB' }}>
            Built with React + TypeScript + fabric.js | Following spec.json Character Bible
          </div>
        </div>
      </footer>
    </div>
  )
}

export default App
