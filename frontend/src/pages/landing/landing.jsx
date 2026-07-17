import React from 'react';
import Navbar from "../../components/landing/Navbar";
import Footer from "../../components/common/Footer"
import Features from "../../components/landing/Features"
import Hero from "../../components/landing/Hero"
import Roadmap from "../../components/landing/Roadmap"
import Working from "../../components/landing/Working"
import TrendingTechnology from "../../components/landing/TrendingTechnology"
import CommunityAssistant from '../../components/landing/CommunityAssistant';
import FAQ from '../../components/landing/FAQ';




function Landing() {
  return (
<>
  <Navbar />
  <Hero/>
  <Features/>
  <Roadmap/>
  <Working/>
  <TrendingTechnology />
  <CommunityAssistant/>
  <FAQ/>
  <Footer />
</>
);
}

export default Landing;