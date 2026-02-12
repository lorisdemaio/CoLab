// components
import Section from "@/components/section/section";
import SectionContainer from "@/components/section/section-container";
import TeamCard from "@/components/team-card/teamCard";
import CreateTeamPopup from "./createTeamPopup";
import JoinTeamPopup from "./joinTeamPopup";

// lib
import { getTeams } from "@/lib/database";

export default async function Dashboard() {

  // fetch teams
  const [ teams ] = await Promise.all([
    getTeams()
  ]);

  const _teams = teams.flatMap(p => p.teams);

  return (
    <>
      <Section 
        id="hero" 
        type="full" 
        options={{
          display: 'flex',
          justifyContent: 'start',
          alignItems: 'start'
        }}
      >
        <SectionContainer>
          {/* HEAD */}
          <div className="flex flex-row justify-between items-center">
            <div>
              <h1 className="title" style={{ marginBlock: '2.5rem' }}>
                Choose a team
              </h1>
            </div>
            <div className="flex flex-row items-center gap-4">
              <CreateTeamPopup />
              <JoinTeamPopup />
            </div>
          </div>

          {/* TEAMS */}
          <div className="grid-layout-4">
            {
              _teams.length > 0 ?
              (
                _teams.map((team) => (
                  <TeamCard
                    key={team.id}
                    title={team.nome}
                    link={`/dashboard/team/${team.nome}?t=${team.id}&o=${team.created_by}`}
                  />
                ))
              ) : 
              (
                <p className="description">
                  You have no team.
                  <br></br>
                  Create or join a team.
                </p>
              )
            }
          </div>
        </SectionContainer>
      </Section>
    </>
  );
}
