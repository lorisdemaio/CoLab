"use client"

import Link from "next/link";
import { useEffect, useActionState } from "react";
import { toast } from "react-toastify";
import '../../styles/form.css';

// components
import Section from "@/components/section/section";
import SectionContainer from "@/components/section/section-container";

// types
import type { ActionReturnType } from "@/types/types";

import { register } from "../../actions/registerAction";

const initialState: ActionReturnType = null;

export default function RegisterForm() {

  const [state, action] = useActionState(register, initialState);
  
  useEffect(() => {
    if(!state) return;
    if(!state.success) toast.error(state.error);
  }, [state])
  
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
          <div className="auth-container">
            <h1 className="title" style={{ marginBlock: '2.5rem' }}>
              Register
            </h1>
            
            <form action={action}>
              <div className="form-row">
                <div className="form-col">
                  <label htmlFor="username">
                    Username
                  </label>
                  <input 
                    id="username"
                    type="text"
                    name="username"
                    placeholder="Username..."
                    autoComplete="username"
                    required
                  />
                </div>
                <div className="form-col">
                  <label htmlFor="email">
                    Email
                  </label>
                  <input 
                    id="email"
                    type="email"
                    name="email"
                    placeholder="Email..."
                    autoComplete="email"
                    required
                  />
                </div>
              </div>
              <div className="form-col">
                <label htmlFor="password">
                  Password
                </label>
                <input 
                  id="password"
                  type="password"
                  name="password"
                  placeholder="Password..."
                  required
                />
              </div>
              <div className="info-box">
                <p>
                  You already have an account? <Link href="/login">login</Link>
                </p>
              </div>
              <button className="form-button" type="submit">
                Register
              </button>
            </form>
          </div>
        </SectionContainer>
      </Section>
    </>
  );
}
