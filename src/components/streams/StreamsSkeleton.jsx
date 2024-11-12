import SuggestionsSkeletons from "@components/suggestions/SuggestionsSkeleton";
// import PostFormSkeleton from "@components/posts/post-form/PostFormSkeleton";
// import PostSkeleton from "@components/posts/post/PostSkeleton";

import "./streams.scss";

const StreamsSkeleton = () => {
  return (
    <div className="streams" data-testid="streams">
      <div className="streams-content">
        <div className="streams-post">
          <h3>post form</h3>
          {[1, 2, 3, 4, 5, 6].map((index) => (
            <div key={index}>postItmes</div>
          ))}
        </div>
        <div className="streams-suggestions">
          <SuggestionsSkeletons />
        </div>
      </div>
    </div>
  );
};

export default StreamsSkeleton;
