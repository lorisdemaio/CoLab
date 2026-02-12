import Link from "next/link";
import Image from "next/image";

// components
import Section from "@/components/section/section";
import SectionContainer from "@/components/section/section-container";
import Pillow from "@/components/pillow/pillow";

// lib
import { createSupabaseServerClient } from '@/lib/supabaseServerClient';

import mockup from '@/public/mockup.png';

export default async function Home() {

  const supabase = await createSupabaseServerClient();
  const { data: { user } } = await supabase.auth.getUser();

  return (
    <>
      <Section 
        id="hero" 
        type="full" 
        options={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center'
        }}
      >
        <SectionContainer justify="center" items="center">
          <h1 className="hero-title">
            A new way to <span className="accent-1">collaborate</span> with your <span className="accent-2">team</span>.
          </h1>
          <h2 className="hero-subtitle">
            Create your team, invite members and start collaborating
          </h2>
          <div className="hero-button-container">
            {
              user ? 
              (
                <Link className="hero-primary-button" href="/dashboard">
                  Dashboard
                </Link>
              ) : 
              (
                <Link className="hero-primary-button" href="/register">
                  Start now
                </Link>
              )
            }
            <Link className="hero-secondary-button" href="#about">
              More info
            </Link>
          </div>
        </SectionContainer>
      </Section>

      <Section 
        id="about" 
        type="fit" 
        options={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center'
        }}
      >
        <SectionContainer justify="center" items="start">
          <h2 className="title" style={{ marginBottom: "3rem" }}>
            About
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4 w-full" style={{ marginBottom: "5rem" }}>
            <Pillow 
                testo="Create and manage teams in seconds"
                icon={<i className="bi bi-file-earmark-plus"></i>}
              />
              <Pillow 
                testo="Join a team via invitation code"
                icon={<i className="bi bi-people"></i>}
              />
              <Pillow 
                testo="Assign and track prioritized tasks"
                icon={<i className="bi bi-file-bar-graph"></i>}
              />
              <Pillow 
                testo="Track active tasks"
                icon={<i className="bi bi-graph-up"></i>}
              />
          </div>
        </SectionContainer>
      </Section>

      <Section 
        type="fit" 
        options={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center'
        }}
      >
        <SectionContainer justify="center" items="start">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 lg:gap-4 w-full">
            <div className="flex flex-col justify-center items-start">
              <p className="description" style={{ marginTop: '1rem' }}>
                CoLab is a platform designed to simplify teamwork.
                It allows you to create teams, manage tasks and collaborate in an organized way, 
                all in a single intuitive interface.
                CoLab's goal is to reduce organizational complexity and improve productivity 
                by offering essential yet powerful tools for collaborative project management.
              </p>
              <Link className="hero-primary-button" href="/register" style={{ marginTop: "1.60rem" }}>
                Start now
              </Link>
            </div>

            <div className="flex flex-col justify-center items-center">
              <Image 
                className="hero-img"
                src={mockup}
                alt="mockup-about"
                width={300}
                decoding="async"
                loading="lazy"
              />
            </div>
          </div>
        </SectionContainer>
      </Section>

    </>
  );
}
