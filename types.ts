import React from 'react';

export interface NavItem {
  label: string;
  id: string;
}

export interface Feature {
  title: string;
  description: string;
  icon: React.ReactNode;
}

export enum ChatRole {
  USER = 'user',
  MODEL = 'model'
}

export interface ChatMessage {
  role: ChatRole;
  text: string;
  groundingMetadata?: any;
}

// Project Management Types
export interface Task {
  id: string;
  title: string;
  assignee: string;
  status: 'todo' | 'in-progress' | 'done';
}

export interface Project {
  id: string;
  title: string;
  description: string;
  owner: string;
  team: string[];
  tasks: Task[];
  milestones: string[];
  files: string[];
}

// Funding Marketplace Types
export interface FundingRequest {
  id: string;
  projectId: string;
  projectTitle: string;
  description: string;
  amountNeeded: number;
  amountRaised: number;
  equityOffered: string; // e.g. "5%"
  roiExpectation: string;
  industry: string;
}

// Gamification Types
export interface Badge {
  id: string;
  name: string;
  icon: string;
  description: string;
  unlocked: boolean;
}

export interface UserProfile {
  name: string;
  role: string;
  eriScore: number;
  badges: Badge[];
  projectsCount: number;
  investmentsCount: number;
}
