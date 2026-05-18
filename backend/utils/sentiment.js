// Simple sentiment analysis based on keywords
// This is a basic implementation - can be upgraded to use ML models

const positiveKeywords = [
  'excellent', 'great', 'amazing', 'wonderful', 'fantastic', 'brilliant', 'outstanding',
  'good', 'nice', 'love', 'best', 'perfect', 'awesome', 'impressed', 'helpful',
  'clear', 'engaging', 'interesting', 'knowledgeable', 'professional', 'inspiring',
  'well', 'easy', 'understood', 'recommend', 'valuable', 'quality'
];

const negativeKeywords = [
  'bad', 'terrible', 'awful', 'horrible', 'poor', 'worst', 'hate', 'dislike',
  'confusing', 'unclear', 'difficult', 'boring', 'useless', 'waste', 'disappointing',
  'rude', 'unprepared', 'disorganized', 'unfair', 'irrelevant', 'unhelpful',
  'lacking', 'ineffective', 'outdated', 'unprofessional', 'criticize'
];

export function analyzeSentiment(text) {
  if (!text) return 'neutral';

  const lowerText = text.toLowerCase();
  
  let positiveScore = 0;
  let negativeScore = 0;

  // Count positive and negative keywords
  positiveKeywords.forEach(keyword => {
    const count = (lowerText.match(new RegExp(keyword, 'g')) || []).length;
    positiveScore += count;
  });

  negativeKeywords.forEach(keyword => {
    const count = (lowerText.match(new RegExp(keyword, 'g')) || []).length;
    negativeScore += count;
  });

  // Determine sentiment
  if (positiveScore > negativeScore) {
    return 'positive';
  } else if (negativeScore > positiveScore) {
    return 'negative';
  } else {
    return 'neutral';
  }
}

// Get sentiment emoji for display
export function getSentimentEmoji(sentiment) {
  const emojis = {
    positive: '😊',
    negative: '😞',
    neutral: '😐'
  };
  return emojis[sentiment] || '😐';
}
