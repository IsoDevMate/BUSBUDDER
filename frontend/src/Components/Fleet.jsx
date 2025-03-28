import React, {useState} from 'react';
import styled from 'styled-components';
import { FaBus, FaWifi, FaSnowflake, FaTv, FaPlug, FaChair } from 'react-icons/fa';

const FleetContainer = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 2rem 1rem;
  background: #fff;
`;

const HeroSection = styled.section`
  background: 
    linear-gradient(rgba(76, 81, 191, 0.8), rgba(76, 81, 191, 0.8)),
    url('https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80');
  background-size: cover;
  background-position: center;
  height: 300px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  text-align: center;
  border-radius: 8px;
  margin-bottom: 3rem;
`;

const HeroTitle = styled.h1`
  font-size: 2.5rem;
  margin-bottom: 1rem;
  @media (max-width: 768px) {
    font-size: 2rem;
  }
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
`;

const FleetGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(350px, 1fr));
  gap: 2rem;
  margin-top: 2rem;

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }
`;

const BusCard = styled.div`
  background: white;
  border-radius: 8px;
  overflow: hidden;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  transition: all 0.3s ease;

  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 10px 15px rgba(76, 81, 191, 0.2);
  }
`;

const BusImage = styled.div`
  height: 200px;
  background: #eee;
  background-image: url(${props => props.img});
  background-size: cover;
  background-position: center;
`;

const BusInfo = styled.div`
  padding: 1.5rem;
`;

const BusTitle = styled.h3`
  color: #4c51bf;
  margin-top: 0;
  font-size: 1.5rem;
`;

const BusType = styled.span`
  display: inline-block;
  background: ${props => 
    props.type === 'Premium' ? '#f59e0b' : 
    props.type === 'Luxury' ? '#10b981' : '#4c51bf'};
  color: white;
  padding: 0.25rem 0.5rem;
  border-radius: 4px;
  font-size: 0.8rem;
  margin-bottom: 1rem;
`;

const BusSpecs = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 1rem;
  margin: 1rem 0;
`;

const SpecItem = styled.div`
  display: flex;
  align-items: center;
  font-size: 0.9rem;
  color: #555;

  svg {
    margin-right: 0.5rem;
    color: #4c51bf;
  }
`;

const BusDescription = styled.p`
  color: #666;
  line-height: 1.6;
`;

const FleetCategories = styled.div`
  display: flex;
  gap: 1rem;
  margin-bottom: 2rem;
  overflow-x: auto;
  padding-bottom: 0.5rem;

  @media (max-width: 768px) {
    flex-wrap: wrap;
  }
`;

const CategoryButton = styled.button`
  background: ${props => props.active ? '#4c51bf' : '#f8fafc'};
  color: ${props => props.active ? 'white' : '#4c51bf'};
  border: 1px solid #4c51bf;
  padding: 0.5rem 1rem;
  border-radius: 4px;
  cursor: pointer;
  transition: all 0.3s ease;
  white-space: nowrap;

  &:hover {
    background: ${props => props.active ? '#3a3f9e' : '#e2e8f0'};
  }
`;

const Fleet = () => {
  const [activeCategory, setActiveCategory] = useState('All');

  const fleetData = [
    {
      id: 1,
      name: "Amaam Standard",
      type: "Standard",
      img: "https://images.unsplash.com/photo-1570125909232-eb263c188f7e?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8OHx8YnVzfGVufDB8fDB8fHww",
      capacity: "45 seats",
      amenities: ["AC", "Reclining Seats", "USB Charging"],
      description: "Our most economical option with comfortable seating and essential amenities."
    },
    {
      id: 2,
      name: "Amaam Premium",
      type: "Premium",
      img: "https://images.unsplash.com/photo-1557223562-6c77ef16210f?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80",
      capacity: "36 seats",
      amenities: ["AC", "Extra Legroom", "WiFi", "USB Charging"],
      description: "Enhanced comfort with more space and connectivity features for longer journeys."
    },
    {
      id: 3,
      name: "Amaam Luxury",
      type: "Luxury",
      img: "https://images.unsplash.com/photo-1570125909517-53cb21c89ff2?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTR8fGJ1c3xlbnwwfHwwfHx8MA%3D%3D",
      capacity: "28 seats",
      amenities: ["AC", "WiFi", "Entertainment", "USB Charging", "Snack Service"],
      description: "Executive class travel with premium services and maximum comfort."
    }
  ];

  const categories = ['All', 'Standard', 'Premium', 'Luxury'];

  const filteredFleet = activeCategory === 'All' 
    ? fleetData 
    : fleetData.filter(bus => bus.type === activeCategory);

  const getAmenityIcon = (amenity) => {
    switch(amenity) {
      case 'AC': return <FaSnowflake />;
      case 'WiFi': return <FaWifi />;
      case 'Entertainment': return <FaTv />;
      case 'USB Charging': return <FaPlug />;
      case 'Reclining Seats':
      case 'Extra Legroom': return <FaChair />;
      default: return <FaBus />;
    }
  };

  return (
    <FleetContainer>
        <h2 style={{display:'flex', alignItems:"center", justifyContent:"center"}}>Our Fleet</h2>
      <HeroSection>
        <div>
          <HeroTitle>Our Modern Fleet</HeroTitle>
          <p>Travel in comfort with our state-of-the-art buses</p>
        </div>
      </HeroSection>

      <FleetCategories>
        {categories.map(category => (
          <CategoryButton
            key={category}
            active={activeCategory === category}
            onClick={() => setActiveCategory(category)}
          >
            {category}
          </CategoryButton>
        ))}
      </FleetCategories>

      <SectionTitle>Our Fleet</SectionTitle>
      <FleetGrid>
        {filteredFleet.map(bus => (
          <BusCard key={bus.id}>
            <BusImage img={bus.img} />
            <BusInfo>
              <BusTitle>{bus.name}</BusTitle>
              <BusType type={bus.type}>{bus.type}</BusType>
              
              <BusSpecs>
                <SpecItem>
                  <FaBus />
                  {bus.capacity}
                </SpecItem>
                {bus.amenities.map((amenity, index) => (
                  <SpecItem key={index}>
                    {getAmenityIcon(amenity)}
                    {amenity}
                  </SpecItem>
                ))}
              </BusSpecs>

              <BusDescription>{bus.description}</BusDescription>
            </BusInfo>
          </BusCard>
        ))}
      </FleetGrid>
    </FleetContainer>
  );
};

export default Fleet;