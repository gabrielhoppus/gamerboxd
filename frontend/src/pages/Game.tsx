import GameInfo from '../components/GameInfo';
import MakeReviewModal from '../components/MakeReviewModal';
import { useState } from "react";
import ReviewsModal from '../components/ReviewsModal';

export default function Game() {
  const [showReviews, setShowReviews] = useState<any>(false);
  const [showMakeReview, setShowMakeReview] = useState<any>(false);
  const [gameName, setGameName] = useState<string>('');
  const [gameId, setGameId] = useState<any>(null);

  return (
    <>
      <GameInfo MakeReviewToggle={setShowMakeReview} ShowReviewToggle={setShowReviews} setGameName={setGameName} setGameId={setGameId}/>
      <MakeReviewModal gameName={gameName} gameId={gameId} MakeReviewVisible={showMakeReview} onClose={() => setShowMakeReview(false)} />
      <ReviewsModal gameId={gameId} gameName={gameName} ShowReviewsVisible={showReviews} onClose={() => setShowReviews(false)} />
    </>
  )
}