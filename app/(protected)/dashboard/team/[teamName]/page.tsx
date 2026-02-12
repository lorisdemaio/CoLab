import Link from "next/link";

// components
import Section from "@/components/section/section";
import SectionContainer from "@/components/section/section-container";
import Settings from "./settings";
import ChangeNameTeamPopup from "./changeTeamNamePopup";
import CreateTaskPopup from "./createTaskPopup";
import TaskClient from "./taskClient";
import Modal from "@/components/modal/modal";

// lib
import { getTasks, getTeamMembers } from "@/lib/database";
import { createSupabaseServerClient } from "@/lib/supabaseServerClient";

/* --- --- --- --- --- --- */

type ParamsType = {
  params: { teamName: string; };
  searchParams: { t?: string; o?: string; };
}

/* --- --- --- --- --- --- */

export default async function Team({ params, searchParams }: ParamsType) {

  const supabase = await createSupabaseServerClient();
  const { data: { user } } = await supabase.auth.getUser();

  // get the URL param
  const { teamName } = await params;
  const { t: id, o } = await searchParams;

  // check team owner
  const teamOwner = o === user?.id ? true : false;

  // fetch tasks
  const [ tasks, teamMembers ] = await Promise.all([
    getTasks(id),
    getTeamMembers(id)
  ])

  const members = teamMembers.flatMap(m => m.utenti);
  
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
          <div className="flex items-center justify-between w-full relative" style={{ marginBlock: '2.5rem' }}>
            <div className="flex flex-row items-center gap-2">
              <div style={{ marginRight: '1.2rem' }}>
                <Link href="/dashboard" className="link">
                  <i className="bi bi-arrow-90deg-left"></i>
                </Link>
              </div>
              <div>
                <h1 className="title">
                  {decodeURIComponent(teamName)}
                </h1>
              </div>
              {
                teamOwner ? 
                (
                  <ChangeNameTeamPopup id={id} />
                ): null
              }
            </div>
            <div>              
              {/* Modal - Team Members */}
              <Modal title="Team Members">
                {
                  members.map((member, index) => (
                    <div key={index} className="team-member">
                      <span className="member">
                        {member.username}
                      </span>
                      {
                        member.id === o ? 
                        (
                          <span className="badge">
                            Owner
                          </span>
                        ) : null
                      }
                    </div>
                  ))
                }
              </Modal>

              {/* Team settings */}
              <Settings owner={teamOwner} id={id ?? null} />
            </div>
          </div>
          
          {/* TASK */}
          <TaskClient 
            userId={user?.id} 
            teamId={id} 
            initialTask={tasks} 
          />

        </SectionContainer>
        
        {/* Component for create tasks */}
        <CreateTaskPopup id={id} />

      </Section>
    </>
  );
}
