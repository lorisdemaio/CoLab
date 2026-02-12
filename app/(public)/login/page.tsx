"use client"

import Link from "next/link";
import { useEffect, useActionState } from "react";
import { toast } from 'react-toastify'
import '../../styles/form.css';

// components
import Section from "@/components/section/section";
import SectionContainer from "@/components/section/section-container";

// types
import type { ActionReturnType } from "@/types/types";

import { login } from "../../actions/loginAction";

const initialState: ActionReturnType = null;

export default function Login() {

  const [state, action] = useActionState(login, initialState);

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
              Login
            </h1>

            <form action={action}>
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
                  You already have an account? <Link href="/register">register</Link>
                </p>
              </div>
              <button className="form-button" type="submit">
                Login
              </button>
            </form>
          </div>
        </SectionContainer>
      </Section>
    </>
  );
}
