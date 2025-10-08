// src/components/layouts/InteractivePoll.tsx
import { useState } from 'react';
import './InteractivePoll.css';

interface PollOption {
  id: string;
  text: string;
  votes?: number;
}

interface InteractivePollProps {
  question: string;
  options: PollOption[];
  onVote?: (optionId: string) => void;
}

const InteractivePoll = ({ question, options, onVote }: InteractivePollProps) => {
  const [selectedOption, setSelectedOption] = useState<string>('');
  const [hasVoted, setHasVoted] = useState<boolean>(false);
  const [results, setResults] = useState<{ [key: string]: number }>({});

  const handleVote = (optionId: string) => {
    if (hasVoted) return;
    
    setSelectedOption(optionId);
    setHasVoted(true);
    
    const mockResults = generateMockResults(options);
    setResults(mockResults);
    
    if (onVote) onVote(optionId);
  };

  const generateMockResults = (options: PollOption[]): { [key: string]: number } => {
    const results: { [key: string]: number } = {};
    const totalVotes = Math.floor(Math.random() * 200) + 100;
    let remainingVotes = totalVotes;
    
    options.forEach((option, index) => {
      if (index === options.length - 1) {
        results[option.id] = remainingVotes;
      } else {
        const votes = Math.floor(Math.random() * (remainingVotes / 2)) + 1;
        results[option.id] = votes;
        remainingVotes -= votes;
      }
    });
    
    return results;
  };

  const getTotalVotes = (): number => Object.values(results).reduce((sum, votes) => sum + votes, 0);
  
  const getPercentage = (votes: number): number => {
    const total = getTotalVotes();
    return total > 0 ? Math.round((votes / total) * 100) : 0;
  };

  return (
    <div className="interactive-poll">
      <div className="poll-background-decoration"></div>
      
      <div className="poll-header">
        <div className="poll-icon-container">
          <div className="poll-icon">📊</div>
          <div className="poll-icon-glow"></div>
        </div>
        <h3 className="poll-title">
          <span className="poll-title-gradient">Interactive Poll</span>
          <div className="poll-title-underline"></div>
        </h3>
        <h4 className="poll-question">{question}</h4>
      </div>
      
      <div className="poll-options">
        {options.map((option, index) => {
          const votes = results[option.id] || 0;
          const percentage = getPercentage(votes);
          const isSelected = selectedOption === option.id;
          
          return (
            <div 
              key={option.id}
              className={`poll-option ${isSelected ? 'selected' : ''} ${hasVoted ? 'voted' : ''}`}
              onClick={() => handleVote(option.id)}
              style={{ '--option-delay': `${index * 0.1}s` } as React.CSSProperties}
            >
              <div className="option-number">{index + 1}</div>
              
              {hasVoted && (
                <div 
                  className={`result-bar ${isSelected ? 'selected-bar' : ''}`}
                  style={{ width: `${percentage}%` }}
                />
              )}
              
              <div className="option-content">
                <span className="option-text">{option.text}</span>
                {hasVoted && (
                  <span className="option-result">
                    <span className="percentage-text">{percentage}%</span>
                    <span className="votes-text">({votes} votes)</span>
                  </span>
                )}
              </div>
              
              <div className="option-shine"></div>
            </div>
          );
        })}
      </div>
    
    </div>
  );
};

export default InteractivePoll;
