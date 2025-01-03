import { Icons } from "../../constants";
import { Recommendation } from "../api/types";
import { renderDecimal, renderTime } from "../api/utils";

const DifficultyBGColor: { [key: string]: string } = {
  ExpertPlus: "bg-diff-expertplus",
  Expert: "bg-diff-expert",
  Hard: "bg-diff-hard",
  Normal: "bg-diff-normal",
  Easy: "bg-diff-easy",
};

const DifficultyTextColor: { [key: string]: string } = {
  ExpertPlus: "text-diff-expertplus",
  Expert: "text-diff-expert",
  Hard: "text-diff-hard",
  Normal: "text-diff-normal",
  Easy: "text-diff-easy",
};

const RecommendationCard: React.FC<{ rec: Recommendation }> = ({ rec }) => {
  console.log(rec.currentMods);
  return (
    <div className="flex flex-row w-full bg-card-dark rounded-r-lg">
      <div
        className={`w-1 h-[100px] ${DifficultyBGColor[rec.difficultyName]}`}
      ></div>
      <img
        className="object-cover"
        src={rec.cover}
        alt="Map Cover"
        width={100}
        loading="lazy"
      />
      <div className="flex flex-1 flex-row items-center justify-between font-geist font-medium text-cbody text-tx-dark px-4 py-3 gap-x-8">
        <div className="flex-1 w-0">
          <p className="truncate w-full">
            {rec.name} - {rec.author}
          </p>
          <p className="truncate w-full">{rec.mapper}</p>
          <p className="truncate w-full">
            <span
              className={DifficultyTextColor[rec.difficultyName]}
              title="Map Type"
            >
              {rec.type}{" "}
            </span>
            {rec.status == "played" && (
              <>
                {renderDecimal(rec.currentAccuracy * 100)}
                <span className="text-tx-alt">% </span>
                {rec.currentMods && (
                  <>
                    <span className="text-tx-alt">(</span>
                    <span>{rec.currentMods}</span>
                    <span className="text-tx-alt">) </span>
                  </>
                )}
                <span className="text-ctri text-tx-alt">
                  {rec.timeAgo} - #{rec.rank}
                </span>
              </>
            )}
          </p>
        </div>
        <div className="flex flex-row gap-x-8">
          <div className="text-center">
            <p>Potential</p>
            <p>
              {renderDecimal(rec.predictedAccuracy * 100)}
              <span className="text-tx-alt">%</span>
              {rec.predictedMods && (
                <>
                  <span className="text-tx-alt"> (</span>
                  {rec.predictedMods}
                  <span className="text-tx-alt">)</span>
                </>
              )}
            </p>
            <p>
              {renderDecimal(rec.predictedPP)}
              <span className="text-tx-alt">pp </span>
              <span
                className="text-green"
                title="Total (Weighted) PP Added to Your Rank"
              >
                (+{renderDecimal(rec.weightedPPGain)})
              </span>
            </p>
          </div>
          <div>
            <div className="flex flex-row items-center justify-end gap-x-[2px]">
              <p>{renderDecimal(rec.starsMod)}</p>
              <img src={Icons.star} />
            </div>
            <div className="flex flex-row items-center justify-end gap-x-[2px]">
              <p>{renderTime(rec.duration)}</p>
              <img src={Icons.timer} />
            </div>
            <div className="flex flex-row items-center justify-end h-[26px] gap-x-1">
              <a
                href={`https://beatleader.xyz/leaderboard/global/${rec.leaderboardId}`}
                target="_blank"
                rel="noopener noreferrer"
              >
                <img src={Icons.leaderboard} />
              </a>
              <a
                href={`https://beatsaver.com/maps/${rec.songId}`}
                target="_blank"
                rel="noopener noreferrer"
              >
                <img src={Icons.beatsaver} />
              </a>
              <a
                href={`https://beatsaver.com/maps/${rec.songId}`}
                target="_blank"
                rel="noopener noreferrer"
              >
                <img src={Icons.download} />
              </a>
              <a>
                <img src={Icons.more} />
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RecommendationCard;