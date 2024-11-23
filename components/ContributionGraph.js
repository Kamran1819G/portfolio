"use client";

import React from "react";
import { useState, useEffect } from "react";
import GitHubCalendar from "react-github-calendar";
import { Tooltip as ReactTooltip } from "react-tooltip";

function getGitHubYears(joinYear) {
  if (!joinYear) return [];

  const currentYear = new Date().getFullYear();
  const duration = currentYear - joinYear + 1;
  const years = Array.from({ length: duration }, (_year, i) => currentYear - i);
  return years;
}

function ContributionGraph() {
  const [calendarYear, setCalendarYear] = useState(undefined);

  const GitHubColorScheme = {
    light: ["#F4FFE6", "#DEFFB2", "#D9FFA4", "#CEFE85", "#C9FD74"],
  };

  const today = new Date().getFullYear();
  const username = "Kamran1819G";
  const joinYear = 2022;
  const years = getGitHubYears(joinYear);

  const YearButton = ({ year, currentYear, onClick }) => (
    <button
      className={"px-4 py-3 rounded-md text-sm font-semibold "}
      style={
        year === currentYear ? { backgroundColor: "var(--primary-color)" } : {}
      }
      onClick={onClick}
    >
      {year}
    </button>
  );
  return (
    <>
      <div className="flex flex-col md:flex-row gap-5">
        <div className="bg-white p-8  rounded-xl shadow">
          <GitHubCalendar
            username={username}
            theme={GitHubColorScheme}
            colorScheme="light"
            fontSize={16}
            blockSize={20}
            blockRadius={5}
            year={calendarYear}
            renderBlock={(block, activity) =>
              React.cloneElement(block, {
                "data-tooltip-id": "react-tooltip",
                "data-tooltip-html": `${activity.count} activities on ${activity.date}`,
              })
            }
            labels={{
              totalCount: "{{count}} contributions in the last year",
            }}
          />
        </div>
        <ReactTooltip id="react-tooltip" />
        <div className="flex flex-row md:flex-col flex-wrap gap-2 mt-2 md:mt-0">
          {years.slice(0, 5).map((year) => (
            <YearButton
              key={year}
              year={year}
              currentYear={calendarYear ?? today}
              onClick={() =>
                setCalendarYear(year === calendarYear ? undefined : year)
              }
            />
          ))}
        </div>
      </div>
    </>
  );
}

export default ContributionGraph;
