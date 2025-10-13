import { getAllMemeInfo } from '@/lib/data';
import { MemeInfo } from '@/lib/types';

const ThematicAnalysis = () => (
  <div className="prose lg:prose-xl mb-12">
    <h2 className="text-3xl font-bold mb-4">Thematic Analysis</h2>
    <p>The top 20 memes cluster around several core behavioral themes that are highly relevant to system engineers and adult learners focused on self-management and building good habits.</p>

    <h3 className="text-2xl font-semibold mt-6 mb-2">Dominant Behavioral Themes:</h3>
    <ul className="list-disc pl-5">
      <li><strong>Incremental Progress (45%):</strong> Emphasizes gradual advancement, patience, and persistence.</li>
      <li><strong>Systematic Learning (30%):</strong> Advocates for a structured, disciplined approach to learning.</li>
      <li><strong>Self-Reflection & Metacognition (25%):</strong> Focuses on regular review and using errors as learning opportunities.</li>
      <li><strong>Persistence & Discipline (25%):</strong> Highlights consistent effort, self-control, and delayed gratification.</li>
      <li><strong>Analytical Thinking (10%):</strong> Encourages systems decomposition and critical examination of assumptions.</li>
    </ul>

    <h3 className="text-2xl font-semibold mt-6 mb-2">Cross-Cutting Insights:</h3>
    <ul className="list-disc pl-5">
      <li>The most popular meme focuses on shifting from external to internal motivation.</li>
      <li>All 20 memes favor sustainable, long-term practices over shortcuts.</li>
      <li>There's an emphasis on integrating learning with well-being, as seen in the digital minimalism meme.</li>
    </ul>
  </div>
);

const KeyTakeaways = () => (
    <div className="prose lg:prose-xl">
    <h2 className="text-3xl font-bold mb-4">Key Takeaways for Learners</h2>
    <p>The popularity of these memes provides valuable insights for anyone looking to improve their learning habits:</p>
    <ul className="list-disc pl-5">
        <li><strong>Practical Applicability:</strong> Focus on actionable behaviors you can adopt immediately.</li>
        <li><strong>Counter-Cultural Messaging:</strong> Embrace patience and persistence in an age of instant gratification.</li>
        <li><strong>Psychological Safety:</strong> Adopt patterns that are positive and carry zero risk of harm.</li>
        <li><strong>Reinforcement:</strong> Support core themes from different angles to strengthen your habits.</li>
    </ul>
  </div>
)

export default function ResearchHubPage() {
  const memes = getAllMemeInfo();

  return (
    <div className="container mx-auto p-8">
      <h1 className="text-4xl font-bold text-center mb-12">Research Hub</h1>

      <ThematicAnalysis />
      <KeyTakeaways />

      <div className="mt-12">
        <h2 className="text-3xl font-bold mb-6">Explore the 20 Learning-Habit Memes</h2>
        <div className="space-y-6">
          {memes.map(meme => (
            <div key={meme.id} className="p-6 border rounded-lg shadow-sm">
              <h3 className="text-2xl font-bold text-accentA mb-2">{meme.name}</h3>
              <p className="text-gray-600 mb-4"><strong>Popularity:</strong> {meme.popularity} hits</p>
              <p className="text-lg">{meme.description}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}