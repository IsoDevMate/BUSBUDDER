import React from 'react';
import styled from 'styled-components';

const AboutContainer = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 2rem 1rem;
  background: #fff;
`;

const HeroSection = styled.section`
  background: linear-gradient(rgba(0, 0, 0, 0.6), rgba(0, 0, 0, 0.6)), 
    url('https://plus.unsplash.com/premium_photo-1676573201285-20af67891d0a?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Njl8fGJ1c3xlbnwwfHwwfHx8MA%3D%3D');
  background-size: cover;
  background-position: center;
  height: 400px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #4c51bf;
  text-align: center;
  margin-bottom: 3rem;
  border-radius: 8px;
`;

const HeroTitle = styled.h1`
  font-size: 3rem;
  margin-bottom: 1rem;
  color: white;
  @media (max-width: 768px) {
    font-size: 2.2rem;
  }
`;

const HeroSubtitle = styled.p`
  font-size: 1.5rem;
  max-width: 800px;
  margin: 0 auto;
  color: white;
  @media (max-width: 768px) {
    font-size: 1.1rem;
  }
`;

const Section = styled.section`
  margin-bottom: 3rem;
`;

const SectionTitle = styled.h2`
  font-size: 2rem;
  color: #4c51bf;
  margin-bottom: 1.5rem;
  position: relative;
  padding-bottom: 0.5rem;

  &::after {
    content: '';
    position: absolute;
    bottom: 0;
    left: 0;
    width: 100px;
    height: 4px;
    background-color: #4c51bf;
  }

  @media (max-width: 768px) {
    font-size: 1.5rem;
  }
`;

const SectionContent = styled.p`
  font-size: 1.1rem;
  line-height: 1.6;
  margin-bottom: 1.5rem;
  color: #555;
`;

const TeamGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
  gap: 2rem;
  margin-top: 2rem;
`;

const TeamMember = styled.div`
  background: white;
  border-radius: 8px;
  overflow: hidden;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  transition: all 0.3s ease;
  border: 1px solid #e2e8f0;

  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 10px 15px rgba(76, 81, 191, 0.2);
  }
`;

const MemberImage = styled.div`
  height: 200px;
  background: #eee;
  background-image: url(${props => props.imgUrl});
  background-size: cover;
  background-position: center;
`;

const MemberInfo = styled.div`
  padding: 1.5rem;
`;

const MemberName = styled.h3`
  margin: 0 0 0.5rem 0;
  color: #4c51bf;
`;

const MemberRole = styled.p`
  color: #718096;
  margin: 0 0 1rem 0;
`;

const StatsContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 1rem;
  text-align: center;
  margin: 3rem 0;

  @media (max-width: 768px) {
    grid-template-columns: repeat(2, 1fr);
  }
`;
const StatNumber = styled.div`
  font-size: 2.5rem;
  font-weight: bold;
  color: #4c51bf;
  margin-bottom: 0.5rem;
  transition: color 0.3s ease;
`;

const StatLabel = styled.div`
  font-size: 1rem;
  color: #718096;
  transition: color 0.3s ease;
`;

const StatItem = styled.div`
  padding: 1.5rem;
  background: #f8fafc;
  border-radius: 8px;
  border: 1px solid #e2e8f0;
  transition: all 0.3s ease;

  &:hover {
    background: #4c51bf;
    ${StatNumber}, ${StatLabel} {
      color: white;
    }
  }
`;



const ValueCard = styled.div`
  background: #f8fafc;
  padding: 1.5rem;
  border-radius: 8px;
  margin-bottom: 1rem;
  border-left: 4px solid #4c51bf;
`;

const ValueTitle = styled.h4`
  color: #4c51bf;
  margin-top: 0;
`;
const AboutUs = () => {
  const teamMembers = [
    { id: 1, name: 'Mohammed Al-Saadi', role: 'Founder & CEO', img: 'https://randomuser.me/api/portraits/men/32.jpg' },
    { id: 2, name: 'Fatima Al-Mansoori', role: 'Operations Manager', img: 'https://randomuser.me/api/portraits/women/44.jpg' },
    { id: 3, name: 'Khalid Al-Harthi', role: 'Technology Director', img: 'https://randomuser.me/api/portraits/men/75.jpg' },
    { id: 4, name: 'Aisha Al-Nuaimi', role: 'Customer Experience', img: 'https://randomuser.me/api/portraits/women/68.jpg' }
  ];

  const companyValues = [
    { title: "Safety First", description: "Our buses undergo rigorous maintenance checks and our drivers receive continuous training." },
    { title: "Customer Comfort", description: "From spacious seating to onboard amenities, we prioritize your comfort." },
    { title: "Reliable Service", description: "We maintain strict schedules and offer transparent communication." }
  ];

  return (
    <AboutContainer>
      {/* <HeroSection>
        <div>
          <HeroTitle>About Amaam Travels</HeroTitle>
          <HeroSubtitle>Your journey begins with us — Reliable, Comfortable, Affordable</HeroSubtitle>
        </div>
      </HeroSection> */}
     <h2 style={{display:"flex", justifyContent:"center"}}>About Us</h2>
      <Section>
        <SectionTitle>Our Story</SectionTitle>
        <SectionContent>
          Founded in 2015, Amaam Travels began with a simple mission: to make bus travel in the region more comfortable, reliable, and accessible to everyone. What started as a small fleet of 5 buses has grown into a trusted intercity service with over 200 buses nationwide.
        </SectionContent>
        <SectionContent>
          Our name "Amaam" means "forward" in Arabic, reflecting our commitment to progress while maintaining Arabian hospitality.
        </SectionContent>
      </Section>

      <StatsContainer>
        <StatItem>
          <StatNumber>200+</StatNumber>
          <StatLabel>Modern Buses</StatLabel>
        </StatItem>
        <StatItem>
          <StatNumber>50+</StatNumber>
          <StatLabel>Destinations</StatLabel>
        </StatItem>
        <StatItem>
          <StatNumber>1M+</StatNumber>
          <StatLabel>Happy Customers</StatLabel>
        </StatItem>
        <StatItem>
          <StatNumber>98%</StatNumber>
          <StatLabel>On-Time Rate</StatLabel>
        </StatItem>
      </StatsContainer>

      <Section>
        <SectionTitle>Our Values</SectionTitle>
        {companyValues.map((value, index) => (
          <ValueCard key={index}>
            <ValueTitle>{value.title}</ValueTitle>
            <p>{value.description}</p>
          </ValueCard>
        ))}
      </Section>

      <Section>
        <SectionTitle>Meet Our Team</SectionTitle>
        <TeamGrid>
          {teamMembers.map(member => (
            <TeamMember key={member.id}>
              <MemberImage imgUrl={member.img} />
              <MemberInfo>
                <MemberName>{member.name}</MemberName>
                <MemberRole>{member.role}</MemberRole>
              </MemberInfo>
            </TeamMember>
          ))}
        </TeamGrid>
      </Section>
    </AboutContainer>
  );
};

export default AboutUs;