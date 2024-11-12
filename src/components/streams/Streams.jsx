import Suggestions from "@components/suggestions/Suggestions";
import "./streams.scss";

function Streams() {
  return (
    <div className="streams" data-testid="streams">
      <div className="streams-content">
        <div className="streams-post">post</div>
        <div style={{ marginBottom: "50px", height: "50px" }}></div>
        <div className="streams-suggestions">
          <Suggestions />
        </div>
      </div>
    </div>
  );
}

export default Streams;
