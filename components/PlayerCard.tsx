import React, { useContext } from "react";
import GlobalContext from "../context/GlobalContext";
import { getFlagWidth, renderDecimal } from "../api/utils";
import { Profile } from "../api/types";

const PlayerCard = () => {
  const { data } = useContext(GlobalContext);
  const profile = data?.profile;

  return (
    <>
      {profile && (
        <div className="flex flex-row justify-center items-center gap-x-8 font-geist font-medium text-cbody text-tx-light dark:text-tx-dark">
          <img
            src={profile.avatar}
            width={100}
            className="rounded-full border-8 border-tx-light dark:border-tx-dark"
          />
          <div className="flex flex-col justify-between h-full">
            <div className="flex flex-row gap-x-2 items-center">
              <a
                href={`https://beatleader.xyz/ranking/countries=${profile.country.toLowerCase()}`}
                target="_blank"
                rel="noopener noreferrer"
              >
                <img
                  src={`https://flagcdn.com/${profile.country.toLowerCase()}.svg`}
                  width={getFlagWidth(profile.country)}
                />
              </a>
              <a
                className="text-csub font-bold"
                href={`https://beatleader.xyz/u/${profile.id}`}
                target="_blank"
                rel="noopener noreferrer"
              >
                {profile.alias}
              </a>
            </div>
            <div className="flex flex-row min-w-[190px] gap-x-3 justify-between pointer-events-none">
              <div>
                {["Overall", "Median", "Best"].map((ticker) => (
                  <p className="mb-[-2px]">{ticker}:</p>
                ))}
              </div>
              <div>
                {[
                  ["rank", "pp"],
                  ["medianRank", "medianPP"],
                  ["bestRank", "bestPP"],
                ].map((row) => (
                  <p className="mb-[-2px]">
                    <span className="text-tx-alt">#</span>
                    {profile[row[0] as keyof Profile]} <span className="text-tx-alt">-</span>{" "}
                    {renderDecimal(profile[row[1] as keyof Profile] as number)}
                    <span className="text-tx-alt">pp</span>
                  </p>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default PlayerCard;