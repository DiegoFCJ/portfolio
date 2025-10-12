import { LanguageCode } from '../models/language-code.type';

export interface PolicySection {
  title: string;
  paragraphs?: string[];
  list?: string[];
}

export interface ThirdPartyProvider {
  name: string;
  purpose: string;
  data: string;
  policyLabel: string;
  policyUrl: string;
}

export interface PolicyContactBlock {
  title: string;
  paragraphs: string[];
  emailLabel: string;
  email: string;
}

export interface PrivacyPolicyContent {
  pageTitle: string;
  lastUpdatedLabel: string;
  lastUpdatedDate: string;
  intro: string[];
  sections: PolicySection[];
  rightsTitle: string;
  rightsDescription: string;
  rightsList: string[];
  thirdPartyTitle: string;
  thirdPartyIntro: string[];
  thirdPartyProviders: ThirdPartyProvider[];
  contact: PolicyContactBlock;
}

export type PrivacyPolicyLangs = Partial<Record<LanguageCode, PrivacyPolicyContent>>;
